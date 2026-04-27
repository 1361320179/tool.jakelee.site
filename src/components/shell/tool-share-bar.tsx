"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Link2, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { useLocaleContext } from "@/components/i18n/locale-context";
import type { ToolPageSummary } from "@/lib/tools/types";
import { copyToClipboard } from "@/lib/shared/clipboard";
import {
  buildShareTargets,
  orderShareTargetsForLocale,
} from "@/lib/shared/build-share-targets";
function canonicalOriginFromConfig() {
  return new URL(siteConfig.url).origin;
}

function resolvePageUrl(pathname: string, origin: string) {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${origin.replace(/\/+$/, "")}${path}`;
}

export function ToolShareBar({
  tool,
}: {
  tool: Pick<ToolPageSummary, "name" | "description">;
}) {
  const pathname = usePathname();
  const { locale, dictionary } = useLocaleContext();
  const share = dictionary.toolPage.share;

  const origin = React.useSyncExternalStore(
    () => () => {},
    () =>
      typeof window !== "undefined"
        ? window.location.origin
        : canonicalOriginFromConfig(),
    canonicalOriginFromConfig,
  );

  const pageUrl = React.useMemo(
    () => resolvePageUrl(pathname, origin),
    [pathname, origin],
  );

  const targets = React.useMemo(
    () =>
      orderShareTargetsForLocale(
        buildShareTargets({
          pageUrl,
          title: tool.name,
          summary: tool.description,
        }),
        locale,
      ),
    [pageUrl, tool.name, tool.description, locale],
  );

  const [copyHint, setCopyHint] = React.useState<string | null>(null);
  const copyTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isExpanded, setIsExpanded] = React.useState(false);

  React.useEffect(() => {
    return () => {
      if (copyTimer.current) clearTimeout(copyTimer.current);
    };
  }, []);

  const onCopyLink = async () => {
    if (copyTimer.current) clearTimeout(copyTimer.current);
    setCopyHint(null);
    const ok = await copyToClipboard(pageUrl);
    setCopyHint(ok ? share.copyOk : share.copyFail);
    copyTimer.current = setTimeout(() => setCopyHint(null), 2500);
  };

  const canNativeShare =
    typeof navigator !== "undefined" &&
    typeof navigator.share === "function";

  const onNativeShare = async () => {
    try {
      await navigator.share({
        title: tool.name,
        text: tool.description,
        url: pageUrl,
      });
    } catch (e) {
      if (e instanceof DOMException && e.name === "AbortError") return;
    }
  };

  return (
    <div className="space-y-3 pt-1">
      <div className="flex flex-wrap items-center gap-3">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setIsExpanded((prev) => !prev)}
          aria-expanded={isExpanded}
          aria-controls="tool-share-menu"
        >
          <Share2 className="size-3.5" aria-hidden />
          {share.sectionTitle}
        </Button>
        <span className="text-xs text-muted-foreground" aria-live="polite">
          {copyHint}
        </span>
      </div>
      {isExpanded && (
        <div
          id="tool-share-menu"
          className="flex flex-wrap gap-2 animate-in fade-in slide-in-from-top-1"
          role="group"
          aria-label={share.sectionTitle}
        >
          <Button type="button" variant="outline" size="sm" onClick={onCopyLink}>
            <Link2 className="size-3.5" aria-hidden />
            {share.copyLink}
          </Button>
          {canNativeShare ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onNativeShare}
            >
              {share.systemShare}
            </Button>
          ) : null}
          {targets.map((t) => (
            <Button
              key={t.id}
              variant="outline"
              size="sm"
              nativeButton={false}
              render={
                <a href={t.href} target="_blank" rel="noopener noreferrer" />
              }
            >
              {share.platforms[t.id]}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
