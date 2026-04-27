import "server-only";

import type { SiteLocale } from "@/i18n/config";
import type { ToolsSiteDictionary } from "@/i18n/types";

const dictionaries: Record<SiteLocale, ToolsSiteDictionary> = {
  en: {
    site: {
      title: "Jake Lee · Practical online tools",
      description:
        "A tools subsite of jakelee.site — practical, browser-based utilities for everyday tasks. Everything runs locally in your browser; your content is never uploaded.",
      shortName: "Tools",
      mainSiteLink: "jakelee.site",
    },
    nav: {
      tools: "Tools",
      mainSite: "Main site",
      languageSwitcher: "Language",
      ariaMain: "Main",
    },
    footer: {
      rights: "All rights reserved.",
    },
    home: {
      eyebrow: "Practical online tools",
      heroBody:
        "All tools run in your browser — nothing is uploaded, so your data stays on your device.",
      allTools: "All tools",
    },
    toolPage: {
      breadcrumbTools: "Tools",
      backToMain: "Back to jakelee.site",
      share: {
        sectionTitle: "Share this tool",
        copyLink: "Copy link",
        systemShare: "Share…",
        copyOk: "Link copied",
        copyFail: "Copy failed",
        platforms: {
          x: "Share on X",
          facebook: "Share on Facebook",
          linkedin: "Share on LinkedIn",
          reddit: "Share on Reddit",
          telegram: "Share on Telegram",
          whatsapp: "Share on WhatsApp",
          weibo: "Share on Weibo",
        },
      },
    },
    notFound: {
      title: "Page not found",
      description: "The link may be broken or this tool is not available yet.",
      backHome: "Back to tools home",
    },
    theme: {
      switchToLight: "Switch to light mode",
      switchToDark: "Switch to dark mode",
    },
    tools: {
      base64: {
        name: "Base64 encode / decode",
        description:
          "Convert text and Base64 locally in your browser — nothing is uploaded.",
        tags: ["Encoding", "Text"],
        ogSubtitle: "Local Base64 encoding and decoding.",
      },
      uuid: {
        name: "UUID generator",
        description: "Generate random v4 UUIDs in batch with one-click copy.",
        tags: ["ID", "Dev"],
        ogSubtitle: "Cryptographically random UUID v4 generator.",
      },
      "json-formatter": {
        name: "JSON formatter",
        description:
          "Validate, prettify, or minify JSON locally in your browser — nothing is uploaded.",
        tags: ["JSON", "Dev"],
        ogSubtitle: "Local JSON prettify and minify.",
      },
    },
    toolUi: {
      base64: {
        cardTitle: "Plain text and Base64",
        labelPlain: "Plain text",
        labelB64: "Base64",
        placeholderPlain: "Type or paste text to encode",
        placeholderB64: "Or paste Base64 to decode",
        encode: "Encode →",
        decode: "← Decode",
        swap: "Swap sides",
        copy: "Copy",
        clear: "Clear",
        copyHintOk: "Copied",
        copyHintFail: "Copy failed",
        errTooLong: "Text is too long (max 512KB).",
        errEncode: "Could not encode. Check your characters.",
        errDecode: "Could not decode. Paste valid Base64.",
        errInvalid: "Invalid input.",
      },
      uuid: {
        cardTitle: "Random UUID (v4)",
        labelCount: "Count",
        regen: "Regenerate",
        copyAll: "Copy all",
        copyHintOk: "Copied all",
        copyHintFail: "Copy failed",
        errInt: "Must be a whole number.",
        errMin: "At least 1.",
        errMax: "At most 200 at once.",
        errInvalid: "Invalid count.",
        listAria: "Generated UUIDs",
      },
      "json-formatter": {
        cardTitle: "JSON formatter",
        labelInput: "Input",
        labelOutput: "Output",
        placeholderInput: "Paste JSON here, then choose Format or Minify",
        placeholderOutput: "Formatted JSON appears here",
        format: "Format",
        minify: "Minify",
        copy: "Copy output",
        clear: "Clear",
        copyHintOk: "Copied",
        copyHintFail: "Copy failed",
        errTooLong: "Input is too long (max 512KB).",
        errParse: "Invalid JSON. Check brackets, commas, and quotes.",
      },
    },
    metadata: {
      titleTemplate: "%s · Tools | Jake Lee",
      defaultDescription:
        "A tools subsite of jakelee.site — practical browser-based utilities.",
    },
  },
  zh: {
    site: {
      title: "Jake Lee · 在线小工具",
      description: "jakelee.site 子网站（实用在线小工具）",
      shortName: "工具",
      mainSiteLink: "jakelee.site",
    },
    nav: {
      tools: "工具",
      mainSite: "主站",
      languageSwitcher: "语言",
      ariaMain: "主导航",
    },
    footer: {
      rights: "保留所有权利。",
    },
    home: {
      eyebrow: "在线小工具",
      heroBody:
        "所有工具都在浏览器本地完成处理，不上传您的任何内容，保障您的隐私安全。",
      allTools: "全部工具",
    },
    toolPage: {
      breadcrumbTools: "工具",
      backToMain: "返回 jakelee.site",
      share: {
        sectionTitle: "分享此工具",
        copyLink: "复制链接",
        systemShare: "系统分享…",
        copyOk: "链接已复制",
        copyFail: "复制失败",
        platforms: {
          x: "分享到 X",
          facebook: "分享到 Facebook",
          linkedin: "分享到 LinkedIn",
          reddit: "分享到 Reddit",
          telegram: "分享到 Telegram",
          whatsapp: "分享到 WhatsApp",
          weibo: "分享到微博",
        },
      },
    },
    notFound: {
      title: "页面不存在",
      description: "链接可能已失效，或工具尚未发布。",
      backHome: "返回工具首页",
    },
    theme: {
      switchToLight: "切换到浅色模式",
      switchToDark: "切换到暗色模式",
    },
    tools: {
      base64: {
        name: "Base64 编解码",
        description: "在浏览器本地将文本与 Base64 互转，不上传服务器。",
        tags: ["编码", "文本"],
        ogSubtitle: "本地 Base64 编码与解码。",
      },
      uuid: {
        name: "UUID 生成",
        description: "批量生成 v4 随机 UUID，可一键复制。",
        tags: ["ID", "开发"],
        ogSubtitle: "安全随机 UUID v4 生成器。",
      },
      "json-formatter": {
        name: "JSON 格式化",
        description: "在浏览器本地校验、美化或压缩 JSON，不上传服务器。",
        tags: ["JSON", "开发"],
        ogSubtitle: "本地 JSON 美化与压缩。",
      },
    },
    toolUi: {
      base64: {
        cardTitle: "原文与 Base64",
        labelPlain: "原文",
        labelB64: "Base64",
        placeholderPlain: "在此输入要编码的文本",
        placeholderB64: "或在此粘贴要解码的 Base64",
        encode: "编码 →",
        decode: "← 解码",
        swap: "交换两侧内容",
        copy: "复制当前",
        clear: "清空",
        copyHintOk: "已复制",
        copyHintFail: "复制失败",
        errTooLong: "文本过长，请控制在 512KB 以内。",
        errEncode: "编码失败，请检查字符。",
        errDecode: "解码失败，请确认是合法 Base64。",
        errInvalid: "输入无效。",
      },
      uuid: {
        cardTitle: "随机 UUID (v4)",
        labelCount: "数量",
        regen: "重新生成",
        copyAll: "复制全部",
        copyHintOk: "已复制全部",
        copyHintFail: "复制失败",
        errInt: "须为整数。",
        errMin: "至少生成 1 个。",
        errMax: "单次最多 200 个。",
        errInvalid: "数量无效。",
        listAria: "已生成的 UUID",
      },
      "json-formatter": {
        cardTitle: "JSON 格式化",
        labelInput: "输入",
        labelOutput: "输出",
        placeholderInput: "在此粘贴 JSON，然后点击「格式化」或「压缩」",
        placeholderOutput: "格式化后的 JSON 将显示在此",
        format: "格式化",
        minify: "压缩",
        copy: "复制输出",
        clear: "清空",
        copyHintOk: "已复制",
        copyHintFail: "复制失败",
        errTooLong: "输入过长，请控制在 512KB 以内。",
        errParse: "JSON 无效，请检查括号、逗号与引号。",
      },
    },
    metadata: {
      titleTemplate: "%s · 工具 | Jake Lee",
      defaultDescription: "jakelee.site 子网站（实用在线小工具）",
    },
  },
};

export async function getDictionary(
  locale: SiteLocale,
): Promise<ToolsSiteDictionary> {
  return dictionaries[locale];
}
