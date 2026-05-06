"use client";

import * as React from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLocaleContext } from "@/components/i18n/locale-context";

export default function TextCounterPanel() {
  const { dictionary: d } = useLocaleContext();
  const ui = d.toolUi["text-counter"];

  const [text, setText] = React.useState("");

  const chars = text.length;
  const charsNoSpaces = text.replace(/\s/g, "").length;
  const latinWords = text.match(/[A-Za-z0-9]+(?:[-'][A-Za-z0-9]+)*/g)?.length ?? 0;
  const cjkChars = text.match(/[\u3400-\u9fff]/g)?.length ?? 0;
  const words = latinWords + cjkChars;
  const lines = text === "" ? 0 : text.split(/\r\n|\r|\n/).length;
  const readingTime = words === 0 ? "0m" : `${Math.max(1, Math.ceil(words / 200))}m`;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{ui.cardTitle}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
          <div className="flex flex-col items-center justify-center rounded-md border p-4">
            <span className="text-2xl font-bold">{chars}</span>
            <span className="text-xs text-muted-foreground text-center">{ui.statChars}</span>
          </div>
          <div className="flex flex-col items-center justify-center rounded-md border p-4">
            <span className="text-2xl font-bold">{charsNoSpaces}</span>
            <span className="text-xs text-muted-foreground text-center">{ui.statCharsNoSpaces}</span>
          </div>
          <div className="flex flex-col items-center justify-center rounded-md border p-4">
            <span className="text-2xl font-bold">{words}</span>
            <span className="text-xs text-muted-foreground text-center">{ui.statWords}</span>
          </div>
          <div className="flex flex-col items-center justify-center rounded-md border p-4">
            <span className="text-2xl font-bold">{lines}</span>
            <span className="text-xs text-muted-foreground text-center">{ui.statLines}</span>
          </div>
          <div className="flex flex-col items-center justify-center rounded-md border p-4">
            <span className="text-2xl font-bold">{readingTime}</span>
            <span className="text-xs text-muted-foreground text-center">{ui.statReadingTime}</span>
          </div>
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
      <CardFooter>
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
