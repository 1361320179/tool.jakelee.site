"use client";

import * as React from "react";
import { ArrowLeftRight, Copy, Trash2 } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLocaleContext } from "@/components/i18n/locale-context";
import { copyToClipboard } from "@/lib/shared/clipboard";

export default function Base64ToolPanel() {
  const { dictionary: d } = useLocaleContext();
  const ui = d.toolUi.base64;
  const base64TextSchema = React.useMemo(
    () => z.string().max(512_000, ui.errTooLong),
    [ui.errTooLong],
  );

  const [raw, setRaw] = React.useState("");
  const [encoded, setEncoded] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [copyHint, setCopyHint] = React.useState<string | null>(null);

  const encodeText = (value: string) => {
    const parsed = base64TextSchema.safeParse(value);
    if (!parsed.success) {
      return { error: parsed.error.issues[0]?.message ?? ui.errInvalid };
    }
    try {
      return { value: btoa(unescape(encodeURIComponent(parsed.data))) };
    } catch {
      return { error: ui.errEncode };
    }
  };

  const decodeText = (value: string) => {
    const parsed = base64TextSchema.safeParse(value);
    if (!parsed.success) {
      return { error: parsed.error.issues[0]?.message ?? ui.errInvalid };
    }
    try {
      return {
        value: decodeURIComponent(escape(atob(parsed.data.trim()))),
      };
    } catch {
      return { error: ui.errDecode };
    }
  };

  const onEncode = () => {
    setError(null);
    const r = encodeText(raw);
    if ("error" in r) {
      setError(r.error ?? ui.errEncode);
      return;
    }
    setEncoded(r.value);
  };

  const onDecode = () => {
    setError(null);
    const r = decodeText(encoded);
    if ("error" in r) {
      setError(r.error ?? ui.errDecode);
      return;
    }
    setRaw(r.value);
  };

  const onSwap = () => {
    setError(null);
    const t = raw;
    setRaw(encoded);
    setEncoded(t);
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
          <Label htmlFor="raw-text">{ui.labelPlain}</Label>
          <Textarea
            id="raw-text"
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
            placeholder={ui.placeholderPlain}
            className="min-h-[10rem] font-mono text-sm"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="b64-text">{ui.labelB64}</Label>
          <Textarea
            id="b64-text"
            value={encoded}
            onChange={(e) => setEncoded(e.target.value)}
            placeholder={ui.placeholderB64}
            className="min-h-[10rem] font-mono text-sm"
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2">
        <Button type="button" onClick={onEncode}>
          {ui.encode}
        </Button>
        <Button type="button" variant="secondary" onClick={onDecode}>
          {ui.decode}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={onSwap}
          aria-label={ui.swap}
        >
          <ArrowLeftRight className="size-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() => void copy(raw || encoded)}
        >
          <Copy className="size-4" />
          {ui.copy}
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() => {
            setRaw("");
            setEncoded("");
            setError(null);
          }}
        >
          <Trash2 className="size-4" />
          {ui.clear}
        </Button>
      </CardFooter>
    </Card>
  );
}
