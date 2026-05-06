"use client";

import * as React from "react";
import { Copy, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLocaleContext } from "@/components/i18n/locale-context";
import { copyToClipboard } from "@/lib/shared/clipboard";

export default function CaseConverterPanel() {
  const { dictionary: d } = useLocaleContext();
  const ui = d.toolUi["case-converter"];

  const [text, setText] = React.useState("");
  const [copyHint, setCopyHint] = React.useState<string | null>(null);

  const toUpper = () => setText(text.toUpperCase());
  const toLower = () => setText(text.toLowerCase());
  
  const toTitleCase = () => {
    setText(
      text
        .toLowerCase()
        .replace(/[-_]+/g, " ")
        .replace(/\S+/g, (word) => word.charAt(0).toUpperCase() + word.slice(1)),
    );
  };

  const toSentenceCase = () => {
    setText(
      text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (match) => match.toUpperCase())
    );
  };

  const toCamelCase = () => {
    setText(
      text
        .toLowerCase()
        .trim()
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr: string) => chr.toUpperCase()),
    );
  };

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
        {copyHint ? (
          <p className="text-xs text-muted-foreground">{copyHint}</p>
        ) : null}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="outline" onClick={toUpper} disabled={!text}>
            {ui.btnUpper}
          </Button>
          <Button type="button" variant="outline" onClick={toLower} disabled={!text}>
            {ui.btnLower}
          </Button>
          <Button type="button" variant="outline" onClick={toTitleCase} disabled={!text}>
            {ui.btnTitle}
          </Button>
          <Button type="button" variant="outline" onClick={toSentenceCase} disabled={!text}>
            {ui.btnSentence}
          </Button>
          <Button type="button" variant="outline" onClick={toCamelCase} disabled={!text}>
            {ui.btnCamel}
          </Button>
        </div>
        <div className="space-y-2">
          <Label htmlFor="text-input">{ui.labelInput}</Label>
          <Textarea
            id="text-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={ui.placeholderInput}
            className="min-h-[15rem]"
          />
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button
          type="button"
          onClick={copy}
          disabled={!text}
        >
          <Copy className="mr-2 size-4" />
          {ui.copy}
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() => setText("")}
          disabled={!text}
        >
          <Trash2 className="mr-2 size-4" />
          {ui.clear}
        </Button>
      </CardFooter>
    </Card>
  );
}
