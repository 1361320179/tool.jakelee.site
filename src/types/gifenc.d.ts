declare module "gifenc" {
  type RgbaPixels = Uint8Array | Uint8ClampedArray;
  type Palette = number[][];

  export function quantize(
    data: RgbaPixels,
    maxColors: number,
    options?: Record<string, unknown>,
  ): Palette;

  export function applyPalette(
    data: RgbaPixels,
    palette: Palette,
    format?: string,
  ): Uint8Array;

  export function GIFEncoder(options?: Record<string, unknown>): {
    writeFrame(
      index: Uint8Array,
      width: number,
      height: number,
      options?: {
        palette?: Palette;
      },
    ): void;
    finish(): void;
    bytes(): Uint8Array;
  };
}

