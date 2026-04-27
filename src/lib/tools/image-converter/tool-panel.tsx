"use client";

import * as React from "react";
import JSZip from "jszip";
import { Select } from "@base-ui/react/select";
import { Check, ChevronDown, Download, ImagePlus, RefreshCw, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocaleContext } from "@/components/i18n/locale-context";
import {
  convertImageFile,
  inferImageKind,
  isSupportedImageFile,
  type OutputFormat,
  supportedOutputFormats,
} from "./convert";

const MAX_FILES = 50;
const MAX_TOTAL_BYTES = 200 * 1024 * 1024;

type QueueItem = {
  id: string;
  source: File;
  status: "pending" | "converting" | "done" | "error";
  error?: string;
  output?: {
    blob: Blob;
    filename: string;
  };
};

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function makeQueueItem(file: File): QueueItem {
  return {
    id: `${file.name}-${file.size}-${crypto.randomUUID()}`,
    source: file,
    status: "pending",
  };
}

function isZipFile(file: File): boolean {
  return file.type === "application/zip" || file.name.toLowerCase().endsWith(".zip");
}

function normalizeZipEntryName(entryName: string): string {
  const trimmed = entryName.replace(/\\/g, "/").replace(/\/+$/, "");
  const parts = trimmed.split("/");
  const base = parts[parts.length - 1] ?? "";
  return base.trim();
}

export default function ImageConverterToolPanel() {
  const { dictionary: d } = useLocaleContext();
  const ui = d.toolUi["image-converter"];

  const [targetFormat, setTargetFormat] = React.useState<OutputFormat>("webp");
  const [quality, setQuality] = React.useState(95);
  const [outputScale, setOutputScale] = React.useState(1);
  const [items, setItems] = React.useState<QueueItem[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [notice, setNotice] = React.useState<string | null>(null);
  const [isConverting, setIsConverting] = React.useState(false);
  const [isPackaging, setIsPackaging] = React.useState(false);
  const [isDragging, setIsDragging] = React.useState(false);

  const totalBytes = React.useMemo(
    () => items.reduce((sum, item) => sum + item.source.size, 0),
    [items],
  );
  const doneCount = React.useMemo(
    () => items.filter((item) => item.status === "done").length,
    [items],
  );

  const showQuality = targetFormat === "jpg" || targetFormat === "webp";

  const appendFiles = React.useCallback(
    async (rawFiles: File[]) => {
      setError(null);
      setNotice(null);

      const unpacked: File[] = [];
      for (const rawFile of rawFiles) {
        if (!isZipFile(rawFile)) {
          if (isSupportedImageFile(rawFile)) {
            unpacked.push(rawFile);
          }
          continue;
        }

        try {
          const zip = await JSZip.loadAsync(await rawFile.arrayBuffer());
          const entries = Object.values(zip.files);
          let extracted = 0;
          for (const entry of entries) {
            if (entry.dir) continue;
            const normalized = normalizeZipEntryName(entry.name);
            if (!normalized) continue;
            const kind = inferImageKind(normalized, "");
            if (!kind) continue;

            const blob = await entry.async("blob");
            const file = new File([blob], normalized, {
              type: blob.type || `image/${kind === "jpg" ? "jpeg" : kind}`,
              lastModified: Date.now(),
            });
            unpacked.push(file);
            extracted += 1;
          }
          if (extracted === 0) {
            setNotice(ui.noticeZipNoImages);
          }
        } catch {
          setError(ui.errInvalidZip);
        }
      }

      if (unpacked.length === 0) {
        setNotice(ui.noticeNoSupportedFiles);
        return;
      }

      let limitError: string | null = null;
      setItems((prev) => {
        const currentBytes = prev.reduce((sum, item) => sum + item.source.size, 0);
        const next: QueueItem[] = [...prev];
        let byteBudget = currentBytes;
        for (const file of unpacked) {
          if (next.length >= MAX_FILES) {
            limitError = ui.errTooManyFiles.replace("{max}", String(MAX_FILES));
            break;
          }
          if (byteBudget + file.size > MAX_TOTAL_BYTES) {
            limitError = ui.errTooLargeTotal.replace("{max}", formatBytes(MAX_TOTAL_BYTES));
            break;
          }
          next.push(makeQueueItem(file));
          byteBudget += file.size;
        }
        return next;
      });
      if (limitError) {
        setError(limitError);
      }
    },
    [ui],
  );

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const list = event.target.files;
    if (!list || list.length === 0) return;
    const files = Array.from(list);
    await appendFiles(files);
    event.target.value = "";
  };

  const onDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const files = Array.from(event.dataTransfer.files ?? []);
    await appendFiles(files);
  };

  const runConvertAll = async () => {
    if (items.length === 0) return;

    setError(null);
    setNotice(null);
    setIsConverting(true);

    for (const item of items) {
      setItems((prev) =>
        prev.map((candidate) =>
          candidate.id === item.id
            ? { ...candidate, status: "converting", error: undefined }
            : candidate,
        ),
      );

      try {
        const converted = await convertImageFile(item.source, targetFormat, {
          quality: quality / 100,
          outputScale,
        });
        setItems((prev) =>
          prev.map((candidate) =>
            candidate.id === item.id
              ? {
                  ...candidate,
                  status: "done",
                  output: { blob: converted.blob, filename: converted.filename },
                }
              : candidate,
          ),
        );
      } catch {
        setItems((prev) =>
          prev.map((candidate) =>
            candidate.id === item.id
              ? { ...candidate, status: "error", error: ui.errConvertFailed }
              : candidate,
          ),
        );
      }
    }

    setIsConverting(false);
  };

  const downloadZip = async () => {
    const completed = items.filter((item) => item.status === "done" && item.output);
    if (completed.length === 0) return;

    setError(null);
    setNotice(null);
    setIsPackaging(true);
    try {
      const zip = new JSZip();
      for (const [index, item] of completed.entries()) {
        const output = item.output;
        if (!output) continue;
        const duplicateSafeName = zip.file(output.filename)
          ? `${index + 1}-${output.filename}`
          : output.filename;
        zip.file(duplicateSafeName, output.blob);
      }
      const blob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `converted-${targetFormat}.zip`;
      anchor.click();
      URL.revokeObjectURL(url);
    } catch {
      setError(ui.errZipBuild);
    } finally {
      setIsPackaging(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{ui.cardTitle}</CardTitle>
        {error ? (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        ) : null}
        {notice ? <p className="text-xs text-muted-foreground">{notice}</p> : null}
      </CardHeader>
      <CardContent className="space-y-6">
        <div
          className={`rounded-3xl border border-dashed p-6 transition-colors ${
            isDragging
              ? "border-primary bg-primary/5"
              : "border-border/70 bg-muted/20 hover:bg-muted/35"
          }`}
          onDragEnter={(event) => {
            event.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={(event) => {
            event.preventDefault();
            setIsDragging(false);
          }}
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => void onDrop(event)}
        >
          <div className="flex flex-col items-start gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium">{ui.dropzoneTitle}</p>
              <p className="text-xs text-muted-foreground">{ui.dropzoneBody}</p>
            </div>
            <Label className="cursor-pointer">
              <Input
                className="hidden"
                type="file"
                multiple
                accept=".png,.jpg,.jpeg,.webp,.gif,.svg,.zip"
                onChange={(event) => void onFileChange(event)}
              />
              <span className="inline-flex h-10 items-center gap-2 rounded-2xl border border-border/70 bg-background px-4 text-sm font-medium">
                <ImagePlus className="size-4" />
                {ui.pickFiles}
              </span>
            </Label>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2 min-w-0">
            <Label htmlFor="image-target-format">{ui.labelFormat}</Label>
            <div className="relative">
              <Select.Root
                value={targetFormat}
                onValueChange={(val) => {
                  if (val) setTargetFormat(val as OutputFormat);
                }}
                modal={false}
              >
                <Select.Trigger
                  id="image-target-format"
                  className="flex h-11 w-full min-w-0 items-center justify-between rounded-full border border-input bg-input/70 px-4 py-2 text-left text-base shadow-[inset_0_1px_0_hsl(0_0%_100%/0.16)] outline-none transition-[border-color,box-shadow,background-color] focus-visible:border-ring focus-visible:ring-4 focus-visible:ring-ring/18 data-[popup-open]:border-ring data-[popup-open]:ring-4 data-[popup-open]:ring-ring/18 md:text-sm dark:bg-input/80"
                >
                  <Select.Value />
                  <Select.Icon>
                    <ChevronDown className="size-4 opacity-50" aria-hidden />
                  </Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                  <Select.Positioner sideOffset={6} className="z-50 outline-none" alignItemWithTrigger={false}>
                    <Select.Popup className="max-h-96 w-[var(--anchor-width)] overflow-y-auto rounded-2xl border border-border/80 bg-popover p-1.5 text-popover-foreground shadow-xl outline-none origin-[var(--transform-origin)] transition-[transform,opacity,filter] duration-200 starting:scale-95 starting:opacity-0 starting:blur-sm">
                      {supportedOutputFormats.map((format) => (
                        <Select.Item
                          key={format}
                          value={format}
                          className="relative flex w-full cursor-pointer select-none items-center rounded-xl py-2.5 pl-9 pr-3 text-sm font-medium outline-none transition-colors hover:bg-accent/70 hover:text-accent-foreground data-[highlighted]:bg-accent/70 data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                        >
                          <Select.ItemIndicator className="absolute left-2 flex size-5 items-center justify-center text-primary">
                            <Check className="size-4" strokeWidth={3} />
                          </Select.ItemIndicator>
                          <Select.ItemText>{format.toUpperCase()}</Select.ItemText>
                        </Select.Item>
                      ))}
                    </Select.Popup>
                  </Select.Positioner>
                </Select.Portal>
              </Select.Root>
            </div>
          </div>
          <div className="space-y-2 min-w-0">
            <Label htmlFor="image-quality">
              {ui.labelQuality}: {quality}%
            </Label>
            <Input
              id="image-quality"
              type="range"
              min={60}
              max={100}
              step={1}
              value={quality}
              disabled={!showQuality}
              onChange={(event) => setQuality(Number(event.target.value))}
            />
          </div>
          <div className="space-y-2 min-w-0">
            <Label htmlFor="image-scale">
              {ui.labelScale}: {outputScale.toFixed(1)}x
            </Label>
            <Input
              id="image-scale"
              type="range"
              min={1}
              max={3}
              step={0.5}
              value={outputScale}
              onChange={(event) => setOutputScale(Number(event.target.value))}
            />
          </div>
        </div>

        <div className="rounded-3xl border border-border/70 bg-muted/20 p-4">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
            <span>
              {ui.summaryFiles}: {items.length} / {MAX_FILES}
            </span>
            <span>
              {ui.summarySize}: {formatBytes(totalBytes)} / {formatBytes(MAX_TOTAL_BYTES)}
            </span>
            <span>
              {ui.summaryDone}: {doneCount}
            </span>
          </div>
          <div className="mt-3 max-h-80 space-y-2 overflow-auto">
            {items.length === 0 ? (
              <p className="text-sm text-muted-foreground">{ui.emptyQueue}</p>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-border/60 bg-background/80 px-3 py-2 text-sm"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium">{item.source.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {formatBytes(item.source.size)}
                    </p>
                  </div>
                  <div className="shrink-0 text-xs">
                    {item.status === "pending" ? ui.statusPending : null}
                    {item.status === "converting" ? ui.statusConverting : null}
                    {item.status === "done" ? ui.statusDone : null}
                    {item.status === "error" ? (
                      <span className="text-destructive">
                        {item.error ?? ui.errConvertFailed}
                      </span>
                    ) : null}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="space-y-1 text-xs text-muted-foreground">
          <p>{ui.disclaimerGif}</p>
          <p>{ui.disclaimerSvg}</p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2">
        <Button type="button" disabled={isConverting || items.length === 0} onClick={() => void runConvertAll()}>
          <RefreshCw className={`size-4 ${isConverting ? "animate-spin" : ""}`} />
          {ui.convertAll}
        </Button>
        <Button
          type="button"
          variant="secondary"
          disabled={isPackaging || doneCount === 0}
          onClick={() => void downloadZip()}
        >
          <Download className="size-4" />
          {ui.downloadZip}
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() => {
            setItems([]);
            setError(null);
            setNotice(null);
          }}
        >
          <Trash2 className="size-4" />
          {ui.clear}
        </Button>
      </CardFooter>
    </Card>
  );
}

