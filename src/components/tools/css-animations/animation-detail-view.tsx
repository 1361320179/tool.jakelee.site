"use client";

import * as React from "react";
import Link from "next/link";
import { Copy } from "lucide-react";
import { useLocaleContext } from "@/components/i18n/locale-context";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { getLocalizedPath } from "@/i18n/config";
import type {
  AnimationCategory,
  MotionVars,
} from "@/lib/tools/css-animations/types";
import { defaultMotionVars } from "@/lib/tools/css-animations/types";
import { copyToClipboard } from "@/lib/shared/clipboard";
import { cssAnimationsDetailPath } from "@/lib/tools/css-animations/paths";
import {
  getAnimationByCategoryAndSlug,
  itemDictKey,
  listAnimationsInCategory,
} from "@/lib/tools/css-animations/queries";

const HEX = /^#[0-9a-fA-F]{6}$/;

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export function AnimationDetailView({
  category,
  slug,
  title,
  description,
}: {
  category: AnimationCategory;
  slug: string;
  title: string;
  description: string;
}) {
  const { locale, dictionary } = useLocaleContext();
  const ui = dictionary.cssAnimations.ui;
  const definition = React.useMemo(
    () => getAnimationByCategoryAndSlug(category, slug),
    [category, slug],
  );
  const [vars, setVars] = React.useState<MotionVars>({ ...defaultMotionVars });
  const [hint, setHint] = React.useState<string | null>(null);

  if (!definition) return null;

  const css = definition.getCss(vars);
  const html = definition.getHtml();

  const copy = async (text: string) => {
    const ok = await copyToClipboard(text);
    setHint(ok ? ui.copyOk : ui.copyFail);
    window.setTimeout(() => setHint(null), 2000);
  };

  const setColor = (raw: string) => {
    const v = raw.startsWith("#") ? raw : `#${raw}`;
    if (HEX.test(v)) setVars((prev) => ({ ...prev, color: v }));
  };

  const others = listAnimationsInCategory(definition.category).filter(
    (a) => a.slug !== definition.slug,
  );

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
          {title}
        </h1>
        <p className="max-w-2xl text-muted-foreground">{description}</p>
        {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
      </header>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,320px)] lg:items-start">
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">{ui.previewAria}</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="surface-panel flex min-h-[220px] items-center justify-center rounded-2xl border border-border/60 bg-muted/20 p-10"
                aria-label={ui.previewAria}
              >
                <style dangerouslySetInnerHTML={{ __html: css }} />
                <div dangerouslySetInnerHTML={{ __html: html }} />
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base">{ui.htmlLabel}</CardTitle>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => copy(html)}
                >
                  <Copy className="size-3.5" aria-hidden />
                  {ui.copyHtml}
                </Button>
              </CardHeader>
              <CardContent>
                <pre className="max-h-64 overflow-auto rounded-xl border border-border/60 bg-muted/30 p-3 text-xs leading-relaxed">
                  <code>{html}</code>
                </pre>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base">{ui.cssLabel}</CardTitle>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => copy(css)}
                >
                  <Copy className="size-3.5" aria-hidden />
                  {ui.copyCss}
                </Button>
              </CardHeader>
              <CardContent>
                <pre className="max-h-64 overflow-auto rounded-xl border border-border/60 bg-muted/30 p-3 text-xs leading-relaxed">
                  <code>{css}</code>
                </pre>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="lg:sticky lg:top-24">
          <CardHeader>
            <CardTitle className="text-base">{ui.controlsTitle}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {definition.supportedParams.includes("speed") ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <Label htmlFor="ca-speed">{ui.paramSpeed}</Label>
                  <span className="text-xs text-muted-foreground">
                    {vars.speed.toFixed(2)}×
                  </span>
                </div>
                <input
                  id="ca-speed"
                  type="range"
                  min={0.5}
                  max={2}
                  step={0.05}
                  value={vars.speed}
                  onChange={(e) =>
                    setVars((p) => ({
                      ...p,
                      speed: clamp(Number(e.target.value), 0.5, 2),
                    }))
                  }
                  className="w-full accent-primary"
                />
              </div>
            ) : null}

            {definition.supportedParams.includes("color") ? (
              <div className="space-y-2">
                <Label htmlFor="ca-color">{ui.paramColor}</Label>
                <div className="flex items-center gap-3">
                  <input
                    id="ca-color"
                    type="color"
                    value={
                      HEX.test(vars.color)
                        ? vars.color
                        : defaultMotionVars.color
                    }
                    onChange={(e) => setColor(e.target.value)}
                    className="size-10 cursor-pointer rounded-md border border-border bg-background p-0.5"
                  />
                  <input
                    type="text"
                    value={vars.color}
                    onChange={(e) => setColor(e.target.value)}
                    spellCheck={false}
                    maxLength={7}
                    className="flex-1 rounded-md border border-border bg-background px-2 py-1.5 font-mono text-sm"
                    aria-label={ui.paramColor}
                  />
                </div>
              </div>
            ) : null}

            {definition.supportedParams.includes("size") ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <Label htmlFor="ca-size">{ui.paramSize}</Label>
                  <span className="text-xs text-muted-foreground">
                    {vars.size.toFixed(2)}×
                  </span>
                </div>
                <input
                  id="ca-size"
                  type="range"
                  min={0.5}
                  max={2}
                  step={0.05}
                  value={vars.size}
                  onChange={(e) =>
                    setVars((p) => ({
                      ...p,
                      size: clamp(Number(e.target.value), 0.5, 2),
                    }))
                  }
                  className="w-full accent-primary"
                />
              </div>
            ) : null}

            <Button
              type="button"
              variant="secondary"
              className="w-full"
              onClick={() => setVars({ ...defaultMotionVars })}
            >
              {ui.reset}
            </Button>
          </CardContent>
        </Card>
      </div>

      {others.length > 0 ? (
        <section className="space-y-3">
          <h2 className="font-heading text-lg font-semibold">
            {ui.relatedHeading}
          </h2>
          <ul className="flex flex-wrap gap-2">
            {others.map((a) => {
              const key = itemDictKey(a.category, a.slug);
              const meta = dictionary.cssAnimations.items[key];
              const label = meta?.breadcrumb ?? a.slug;
              return (
                <li key={a.slug}>
                  <Link
                    href={getLocalizedPath(
                      locale,
                      cssAnimationsDetailPath(a.category, a.slug),
                    )}
                    className={cn(
                      buttonVariants({ variant: "outline", size: "sm" }),
                    )}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
