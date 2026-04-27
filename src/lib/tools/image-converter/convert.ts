import { GIFEncoder, applyPalette, quantize } from "gifenc";

export const supportedOutputFormats = [
  "png",
  "jpg",
  "webp",
  "gif",
  "svg",
] as const;

export type OutputFormat = (typeof supportedOutputFormats)[number];

export const supportedInputExtensions = [
  "png",
  "jpg",
  "jpeg",
  "webp",
  "gif",
  "svg",
] as const;

const inputMimeToKind: Record<string, OutputFormat | "jpeg"> = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/svg+xml": "svg",
};

const outputMimeByKind: Record<OutputFormat, string> = {
  png: "image/png",
  jpg: "image/jpeg",
  webp: "image/webp",
  gif: "image/gif",
  svg: "image/svg+xml",
};

type ConvertImageOptions = {
  quality?: number;
  outputScale?: number;
};

export type ConvertedImage = {
  blob: Blob;
  filename: string;
  width: number;
  height: number;
};

function clampQuality(value: number | undefined): number {
  if (!Number.isFinite(value)) return 0.95;
  return Math.min(1, Math.max(0.1, value ?? 0.95));
}

function clampScale(value: number | undefined): number {
  if (!Number.isFinite(value)) return 1;
  return Math.min(4, Math.max(1, value ?? 1));
}

function stripFileExtension(filename: string): string {
  const dotIndex = filename.lastIndexOf(".");
  if (dotIndex <= 0) return filename;
  return filename.slice(0, dotIndex);
}

function outputExtension(kind: OutputFormat): string {
  if (kind === "jpg") return "jpg";
  return kind;
}

function canvasToBlob(
  canvas: HTMLCanvasElement,
  type: string,
  quality?: number,
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error("Failed to encode image."));
        return;
      }
      resolve(blob);
    }, type, quality);
  });
}

function makeCanvas(width: number, height: number): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(width));
  canvas.height = Math.max(1, Math.round(height));
  return canvas;
}

function parseSvgDimensions(source: string): { width: number; height: number } | null {
  const parser = new DOMParser();
  const doc = parser.parseFromString(source, "image/svg+xml");
  const svg = doc.documentElement;
  if (!svg || svg.tagName.toLowerCase() !== "svg") return null;

  const widthAttr = svg.getAttribute("width");
  const heightAttr = svg.getAttribute("height");
  const viewBox = svg.getAttribute("viewBox");

  const width = widthAttr ? Number.parseFloat(widthAttr) : Number.NaN;
  const height = heightAttr ? Number.parseFloat(heightAttr) : Number.NaN;

  if (Number.isFinite(width) && Number.isFinite(height) && width > 0 && height > 0) {
    return { width, height };
  }

  if (viewBox) {
    const parts = viewBox.split(/[\s,]+/).map((v) => Number.parseFloat(v));
    if (parts.length === 4 && Number.isFinite(parts[2]) && Number.isFinite(parts[3])) {
      if (parts[2] > 0 && parts[3] > 0) {
        return { width: parts[2], height: parts[3] };
      }
    }
  }

  return null;
}

async function decodeWithImageElement(
  file: File,
): Promise<{ image: HTMLImageElement; width: number; height: number }> {
  const url = URL.createObjectURL(file);
  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Unable to decode image: ${file.name}`));
      img.src = url;
    });

    let width = image.naturalWidth;
    let height = image.naturalHeight;
    if ((width <= 0 || height <= 0) && file.type === "image/svg+xml") {
      const svgText = await file.text();
      const parsed = parseSvgDimensions(svgText);
      if (parsed) {
        width = parsed.width;
        height = parsed.height;
      }
    }

    if (width <= 0 || height <= 0) {
      throw new Error(`Invalid image dimensions: ${file.name}`);
    }

    return { image, width, height };
  } finally {
    URL.revokeObjectURL(url);
  }
}

async function decodeToCanvas(file: File): Promise<HTMLCanvasElement> {
  const decoded = await decodeWithImageElement(file);
  const canvas = makeCanvas(decoded.width, decoded.height);
  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Canvas 2D context unavailable.");
  }
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.drawImage(decoded.image, 0, 0, canvas.width, canvas.height);
  return canvas;
}

function scaleCanvas(source: HTMLCanvasElement, outputScale: number): HTMLCanvasElement {
  if (outputScale === 1) return source;
  const canvas = makeCanvas(source.width * outputScale, source.height * outputScale);
  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Canvas 2D context unavailable.");
  }
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.drawImage(source, 0, 0, canvas.width, canvas.height);
  return canvas;
}

function toBase64(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary);
}

async function encodeSvgWrapper(canvas: HTMLCanvasElement): Promise<Blob> {
  const pngBlob = await canvasToBlob(canvas, "image/png");
  const bytes = new Uint8Array(await pngBlob.arrayBuffer());
  const dataUrl = `data:image/png;base64,${toBase64(bytes)}`;
  const svgText = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${canvas.width}" height="${canvas.height}" viewBox="0 0 ${canvas.width} ${canvas.height}">`,
    `<image href="${dataUrl}" width="${canvas.width}" height="${canvas.height}" />`,
    "</svg>",
  ].join("");
  return new Blob([svgText], { type: "image/svg+xml;charset=utf-8" });
}

function encodeGif(canvas: HTMLCanvasElement): Blob {
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) {
    throw new Error("Canvas 2D context unavailable.");
  }
  const { data, width, height } = context.getImageData(0, 0, canvas.width, canvas.height);
  const palette = quantize(data, 256);
  const index = applyPalette(data, palette);
  const encoder = GIFEncoder();
  encoder.writeFrame(index, width, height, { palette });
  encoder.finish();
  const safeBytes = Uint8Array.from(encoder.bytes());
  return new Blob([safeBytes], { type: "image/gif" });
}

async function encodeCanvas(
  canvas: HTMLCanvasElement,
  format: OutputFormat,
  quality: number,
): Promise<Blob> {
  if (format === "svg") {
    return encodeSvgWrapper(canvas);
  }
  if (format === "gif") {
    return encodeGif(canvas);
  }
  const mime = outputMimeByKind[format];
  const withQuality = format === "jpg" || format === "webp";
  return canvasToBlob(canvas, mime, withQuality ? quality : undefined);
}

export function inferImageKind(filename: string, mime: string): OutputFormat | null {
  const byMime = inputMimeToKind[mime.toLowerCase()];
  if (byMime) return byMime === "jpeg" ? "jpg" : byMime;

  const extension = filename.split(".").pop()?.toLowerCase() ?? "";
  if (!extension) return null;
  if (extension === "jpeg") return "jpg";
  return supportedInputExtensions.includes(extension as (typeof supportedInputExtensions)[number])
    ? (extension as OutputFormat)
    : null;
}

export function isSupportedImageFile(file: File): boolean {
  return inferImageKind(file.name, file.type) !== null;
}

export async function convertImageFile(
  file: File,
  targetFormat: OutputFormat,
  options: ConvertImageOptions = {},
): Promise<ConvertedImage> {
  const sourceKind = inferImageKind(file.name, file.type);
  if (!sourceKind) {
    throw new Error(`Unsupported image: ${file.name}`);
  }

  const quality = clampQuality(options.quality);
  const outputScale = clampScale(options.outputScale);
  const decodedCanvas = await decodeToCanvas(file);
  const outputCanvas = scaleCanvas(decodedCanvas, outputScale);
  const blob = await encodeCanvas(outputCanvas, targetFormat, quality);

  return {
    blob,
    filename: `${stripFileExtension(file.name)}.${outputExtension(targetFormat)}`,
    width: outputCanvas.width,
    height: outputCanvas.height,
  };
}

