"use client";

import * as React from "react";
import { Copy, RefreshCw } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocaleContext } from "@/components/i18n/locale-context";
import { copyToClipboard } from "@/lib/shared/clipboard";

function generateUuids(n: number): string[] {
  return Array.from({ length: n }, () => crypto.randomUUID());
}

export default function UuidToolPanel() {
  const { dictionary: d } = useLocaleContext();
  const ui = d.toolUi.uuid;
  const countSchema = React.useMemo(
    () =>
      z
        .number()
        .int(ui.errInt)
        .min(1, ui.errMin)
        .max(200, ui.errMax),
    [ui.errInt, ui.errMin, ui.errMax],
  );

  const [countInput, setCountInput] = React.useState("8");
  const [lines, setLines] = React.useState<string[]>(() => generateUuids(8));
  const [error, setError] = React.useState<string | null>(null);
  const [copyHint, setCopyHint] = React.useState<string | null>(null);

  const regen = (rawCount: string) => {
    setError(null);
    const n = Number.parseInt(rawCount, 10);
    const parsed = countSchema.safeParse(Number.isNaN(n) ? NaN : n);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? ui.errInvalid);
      return;
    }
    setLines(generateUuids(parsed.data));
  };

  const text = lines.join("\n");

  const copy = async () => {
    setCopyHint(null);
    const ok = await copyToClipboard(text);
    setCopyHint(ok ? ui.copyHintOk : ui.copyHintFail);
    window.setTimeout(() => setCopyHint(null), 2000);
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
        {copyHint ? (
          <p className="text-xs text-muted-foreground">{copyHint}</p>
        ) : null}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex max-w-sm flex-col gap-2 sm:flex-row sm:items-end">
          <div className="min-w-0 flex-1 space-y-2">
            <Label htmlFor="uuid-count">{ui.labelCount}</Label>
            <Input
              id="uuid-count"
              type="number"
              min={1}
              max={200}
              value={countInput}
              onChange={(e) => setCountInput(e.target.value)}
              onBlur={() => regen(countInput)}
            />
          </div>
          <Button
            type="button"
            className="w-full sm:w-auto"
            onClick={() => regen(countInput)}
          >
            <RefreshCw className="size-4" />
            {ui.regen}
          </Button>
        </div>
        <div className="rounded-3xl border border-border/70 bg-muted/30 p-4">
          <pre
            className="max-h-[24rem] overflow-auto font-mono text-sm leading-relaxed break-all whitespace-pre-wrap"
            aria-label={ui.listAria}
          >
            {text}
          </pre>
        </div>
      </CardContent>
      <CardFooter>
        <Button type="button" variant="default" onClick={() => void copy()}>
          <Copy className="size-4" />
          {ui.copyAll}
        </Button>
      </CardFooter>
    </Card>
  );
}
