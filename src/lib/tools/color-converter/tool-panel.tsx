"use client";

import * as React from "react";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useLocaleContext } from "@/components/i18n/locale-context";
import { copyToClipboard } from "@/lib/shared/clipboard";

const normalizeHex = (hex: string) => {
  const value = hex.trim();
  const shortMatch = /^#?([a-f\d])([a-f\d])([a-f\d])$/i.exec(value);
  if (shortMatch) {
    return `#${shortMatch[1]}${shortMatch[1]}${shortMatch[2]}${shortMatch[2]}${shortMatch[3]}${shortMatch[3]}`.toUpperCase();
  }
  const longMatch = /^#?([a-f\d]{6})$/i.exec(value);
  return longMatch ? `#${longMatch[1]}`.toUpperCase() : null;
};

const hexToRgb = (hex: string) => {
  const normalized = normalizeHex(hex);
  if (!normalized) return null;
  const result = /^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(normalized);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

const rgbToHex = (r: number, g: number, b: number) => {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
};

const parseRgb = (value: string) => {
  const match = value
    .trim()
    .match(/^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$|^(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})$/i);
  if (!match) return null;
  const [, r1, g1, b1, r2, g2, b2] = match;
  const rgb = {
    r: Number(r1 ?? r2),
    g: Number(g1 ?? g2),
    b: Number(b1 ?? b2),
  };
  return [rgb.r, rgb.g, rgb.b].every((part) => part >= 0 && part <= 255)
    ? rgb
    : null;
};

const parseHsl = (value: string) => {
  const match = value
    .trim()
    .match(/^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$|^(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%$/i);
  if (!match) return null;
  const [, h1, s1, l1, h2, s2, l2] = match;
  const hsl = {
    h: Number(h1 ?? h2),
    s: Number(s1 ?? s2),
    l: Number(l1 ?? l2),
  };
  return hsl.h <= 360 && hsl.s <= 100 && hsl.l <= 100 ? hsl : null;
};

const rgbToHsl = (r: number, g: number, b: number) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
};

const hslToRgb = (h: number, s: number, l: number) => {
  let r, g, b;
  h /= 360;
  s /= 100;
  l /= 100;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
};

export default function ColorConverterPanel() {
  const { dictionary: d } = useLocaleContext();
  const ui = d.toolUi["color-converter"];

  const [hex, setHex] = React.useState("#3B82F6");
  const [rgb, setRgb] = React.useState("rgb(59, 130, 246)");
  const [hsl, setHsl] = React.useState("hsl(217, 90%, 60%)");
  const [copyHint, setCopyHint] = React.useState<string | null>(null);
  const pickerHex = normalizeHex(hex) ?? "#000000";

  const updateColorsFromHex = (newHex: string) => {
    const normalized = normalizeHex(newHex);
    if (!normalized) {
      setHex(newHex);
      return;
    }
    setHex(normalized);
    const rgbVal = hexToRgb(normalized);
    if (rgbVal) {
      setRgb(`rgb(${rgbVal.r}, ${rgbVal.g}, ${rgbVal.b})`);
      const hslVal = rgbToHsl(rgbVal.r, rgbVal.g, rgbVal.b);
      setHsl(`hsl(${hslVal.h}, ${hslVal.s}%, ${hslVal.l}%)`);
    }
  };

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setHex(val);
    if (normalizeHex(val)) {
      updateColorsFromHex(val);
    }
  };

  const handleRgbChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setRgb(val);
    const parsed = parseRgb(val);
    if (parsed) {
      const newHex = rgbToHex(parsed.r, parsed.g, parsed.b);
      setHex(newHex);
      const hslVal = rgbToHsl(parsed.r, parsed.g, parsed.b);
      setHsl(`hsl(${hslVal.h}, ${hslVal.s}%, ${hslVal.l}%)`);
    }
  };

  const handleHslChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setHsl(val);
    const parsed = parseHsl(val);
    if (parsed) {
      const rgbVal = hslToRgb(parsed.h, parsed.s, parsed.l);
      setRgb(`rgb(${rgbVal.r}, ${rgbVal.g}, ${rgbVal.b})`);
      setHex(rgbToHex(rgbVal.r, rgbVal.g, rgbVal.b));
    }
  };

  const copy = async (text: string) => {
    setCopyHint(null);
    const ok = await copyToClipboard(text);
    setCopyHint(ok ? ui.copyHintOk : ui.copyHintFail);
    window.setTimeout(() => setCopyHint(null), 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{ui.cardTitle}</CardTitle>
        {copyHint ? (
          <p className="text-xs text-muted-foreground">{copyHint}</p>
        ) : null}
      </CardHeader>
      <CardContent className="grid gap-6 md:grid-cols-2">
        <div className="flex flex-col items-center justify-center space-y-4 rounded-md border p-6">
          <Label htmlFor="color-picker">{ui.labelColor}</Label>
          <div className="relative h-32 w-full overflow-hidden rounded-md border">
            <input
              id="color-picker"
              type="color"
              value={pickerHex}
              onChange={(e) => updateColorsFromHex(e.target.value)}
              className="absolute -inset-10 h-[200%] w-[200%] cursor-pointer opacity-0"
            />
            <div
              className="pointer-events-none h-full w-full"
              style={{ backgroundColor: pickerHex }}
            />
          </div>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="hex-input">{ui.labelHex}</Label>
            <div className="flex gap-2">
              <Input
                id="hex-input"
                value={hex}
                onChange={handleHexChange}
                className="font-mono"
              />
              <Button type="button" variant="outline" size="icon" onClick={() => copy(hex)}>
                <Copy className="size-4" />
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="rgb-input">{ui.labelRgb}</Label>
            <div className="flex gap-2">
              <Input
                id="rgb-input"
                value={rgb}
                onChange={handleRgbChange}
                className="font-mono"
              />
              <Button type="button" variant="outline" size="icon" onClick={() => copy(rgb)}>
                <Copy className="size-4" />
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="hsl-input">{ui.labelHsl}</Label>
            <div className="flex gap-2">
              <Input
                id="hsl-input"
                value={hsl}
                onChange={handleHslChange}
                className="font-mono"
              />
              <Button type="button" variant="outline" size="icon" onClick={() => copy(hsl)}>
                <Copy className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
