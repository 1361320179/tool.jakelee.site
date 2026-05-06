"use client";

import * as React from "react";
import { Download, QrCode, Trash2 } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLocaleContext } from "@/components/i18n/locale-context";

export default function QrCodeGeneratorPanel() {
  const { dictionary: d } = useLocaleContext();
  const ui = d.toolUi["qrcode-generator"];

  const [input, setInput] = React.useState("");
  const [qrValue, setQrValue] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const svgRef = React.useRef<SVGSVGElement>(null);

  const generateQrCode = () => {
    const nextValue = input.trim();
    if (!nextValue) {
      setError(ui.errEmpty);
      setQrValue("");
      return;
    }
    setError(null);
    setQrValue(nextValue);
  };

  const downloadQrCode = () => {
    if (!svgRef.current) return;
    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = "qrcode.png";
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
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
      </CardHeader>
      <CardContent className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="qr-input">{ui.labelInput}</Label>
          <Textarea
            id="qr-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={ui.placeholderInput}
            className="min-h-[10rem]"
          />
        </div>
        <div className="flex flex-col items-center justify-center space-y-4 rounded-md border p-6">
          {qrValue ? (
            <>
              <div className="rounded-md bg-white p-4 shadow-sm">
              <QRCodeSVG
                value={qrValue}
                size={200}
                bgColor="#ffffff"
                fgColor="#000000"
                level="M"
                includeMargin={false}
                ref={svgRef}
              />
              </div>
              <p className="max-w-full truncate text-xs text-muted-foreground">
                {ui.generatedFrom}: {qrValue}
              </p>
            </>
          ) : (
            <div className="flex flex-col items-center gap-3 text-center text-muted-foreground">
              <QrCode className="size-12" />
              <p className="text-sm">{ui.emptyPreview}</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2">
        <Button type="button" onClick={generateQrCode}>
          <QrCode className="mr-2 size-4" />
          {ui.generate}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={downloadQrCode}
          disabled={!qrValue}
        >
          <Download className="mr-2 size-4" />
          {ui.download}
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() => {
            setInput("");
            setQrValue("");
            setError(null);
          }}
        >
          <Trash2 className="mr-2 size-4" />
          {ui.clear}
        </Button>
      </CardFooter>
    </Card>
  );
}
