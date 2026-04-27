/** Platform ids used by share UI and i18n keys. */
export type SharePlatformId =
  | "x"
  | "facebook"
  | "linkedin"
  | "reddit"
  | "telegram"
  | "whatsapp"
  | "weibo";

export type ShareTarget = { id: SharePlatformId; href: string };

const TWEET_TEXT_MAX = 220;

function truncateUtf16(value: string, max: number): string {
  if (value.length <= max) return value;
  if (max <= 1) return "…";
  return `${value.slice(0, max - 1)}…`;
}

/**
 * Builds official web share URLs (query params are encoded per platform).
 * X/Twitter `text` is truncated so the composed intent URL stays practical.
 */
export function buildShareTargets(input: {
  pageUrl: string;
  title: string;
  summary: string;
}): ShareTarget[] {
  const { pageUrl, title, summary } = input;
  const encPageUrl = encodeURIComponent(pageUrl);
  const encTitle = encodeURIComponent(title);

  const bodyForTweet = summary.trim()
    ? `${title}\n\n${summary.trim()}`
    : title;
  const tweetText = truncateUtf16(bodyForTweet, TWEET_TEXT_MAX);
  const encTweetText = encodeURIComponent(tweetText);

  const whatsappText = `${title}\n${pageUrl}`;
  const encWhatsappText = encodeURIComponent(whatsappText);

  const telegramText = summary.trim()
    ? `${title}\n\n${summary.trim()}`
    : title;
  const encTelegramText = encodeURIComponent(telegramText);

  return [
    {
      id: "x",
      href: `https://twitter.com/intent/tweet?text=${encTweetText}&url=${encPageUrl}`,
    },
    {
      id: "facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encPageUrl}`,
    },
    {
      id: "linkedin",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encPageUrl}`,
    },
    {
      id: "reddit",
      href: `https://www.reddit.com/submit?url=${encPageUrl}&title=${encTitle}`,
    },
    {
      id: "telegram",
      href: `https://t.me/share/url?url=${encPageUrl}&text=${encTelegramText}`,
    },
    {
      id: "whatsapp",
      href: `https://wa.me/?text=${encWhatsappText}`,
    },
    {
      id: "weibo",
      href: `https://service.weibo.com/share/share.php?url=${encPageUrl}&title=${encTitle}`,
    },
  ];
}

/** Puts Weibo first for zh locale; keeps stable order otherwise. */
export function orderShareTargetsForLocale(
  targets: ShareTarget[],
  locale: string,
): ShareTarget[] {
  if (locale !== "zh") return targets;
  const weibo = targets.filter((t) => t.id === "weibo");
  const rest = targets.filter((t) => t.id !== "weibo");
  return [...weibo, ...rest];
}
