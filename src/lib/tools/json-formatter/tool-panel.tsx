"use client";

import * as React from "react";
import { Braces, Copy, Minimize2, Trash2 } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLocaleContext } from "@/components/i18n/locale-context";
import { copyToClipboard } from "@/lib/shared/clipboard";

function parseJson(text: string): unknown {
  return JSON.parse(text);
}

export default function JsonFormatterToolPanel() {
  const { dictionary: d } = useLocaleContext();
  const ui = d.toolUi["json-formatter"];
  const inputSchema = React.useMemo(
    () => z.string().max(512_000, ui.errTooLong),
    [ui.errTooLong],
  );

  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [copyHint, setCopyHint] = React.useState<string | null>(null);

  const runFormat = (pretty: boolean) => {
    setError(null);
    setCopyHint(null);
    const trimmed = input.trim();
    if (!trimmed) {
      setOutput("");
      return;
    }
    const parsed = inputSchema.safeParse(input);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? ui.errParse);
      return;
    }
    try {
      const value = parseJson(trimmed);
      setOutput(
        pretty
          ? `${JSON.stringify(value, null, 2)}\n`
          : `${JSON.stringify(value)}\n`,
      );
    } catch {
      setError(ui.errParse);
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
        <CardTitle className="flex items-center gap-2">
          <Braces className="size-5 shrink-0 opacity-80" aria-hidden />
          {ui.cardTitle}
        </CardTitle>
        {error ? (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        ) : null}
        {copyHint ? (
          <p className="text-xs text-muted-foreground">{copyHint}</p>
        ) : null}
      </CardHeader>
      <CardContent className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="json-formatter-input">{ui.labelInput}</Label>
          <Textarea
            id="json-formatter-input"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setError(null);
            }}
            placeholder={ui.placeholderInput}
            className="min-h-[14rem] font-mono text-sm"
            spellCheck={false}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="json-formatter-output">{ui.labelOutput}</Label>
          <Textarea
            id="json-formatter-output"
            readOnly
            value={output}
            placeholder={ui.placeholderOutput}
            className="min-h-[14rem] font-mono text-sm"
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2">
        <Button type="button" onClick={() => runFormat(true)}>
          {ui.format}
        </Button>
        <Button type="button" variant="secondary" onClick={() => runFormat(false)}>
          <Minimize2 className="size-4" />
          {ui.minify}
        </Button>
        <Button
          type="button"
          variant="ghost"
          disabled={!output}
          onClick={() => void copy(output.trimEnd())}
        >
          <Copy className="size-4" />
          {ui.copy}
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() => {
            setInput("");
            setOutput("");
            setError(null);
            setCopyHint(null);
          }}
        >
          <Trash2 className="size-4" />
          {ui.clear}
        </Button>
      </CardFooter>
    </Card>
  );
}
