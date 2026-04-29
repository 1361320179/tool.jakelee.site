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
      cssAnimationsCta: {
        title: "CSS animation snippets",
        body:
          "Loading spinners, button hovers, and text motion — preview, tweak, and copy HTML/CSS.",
        linkLabel: "Browse CSS animations",
      },
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
      "image-converter": {
        name: "Image converter",
        description:
          "Convert PNG, JPG, WebP, GIF, and SVG in batches locally in your browser, including ZIP import and ZIP download.",
        tags: ["Image", "Batch"],
        ogSubtitle: "Local image format conversion with ZIP batch workflow.",
      },
      "css-animations": {
        name: "CSS animation snippets",
        description:
          "Loading spinners, button hovers, and text motion — preview, tweak speed/color/size, and copy HTML/CSS in your browser.",
        tags: ["CSS", "Animation", "UI"],
        ogSubtitle: "Copy-paste CSS loaders, hover buttons, and text effects.",
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
      "image-converter": {
        cardTitle: "Image converter",
        dropzoneTitle: "Drop images or ZIP files here",
        dropzoneBody:
          "Supported formats: PNG, JPG, WebP, GIF, SVG. You can also upload a ZIP containing images.",
        pickFiles: "Choose files",
        labelFormat: "Target format",
        labelQuality: "Quality",
        labelScale: "Resolution scale",
        summaryFiles: "Files",
        summarySize: "Total size",
        summaryDone: "Converted",
        emptyQueue: "No files yet. Add images or a ZIP package to begin.",
        statusPending: "Pending",
        statusConverting: "Converting...",
        statusDone: "Done",
        convertAll: "Convert all",
        downloadZip: "Download ZIP",
        clear: "Clear list",
        errInvalidZip: "Unable to read this ZIP file.",
        errTooManyFiles: "Too many files. Maximum allowed: {max}.",
        errTooLargeTotal: "Total size is too large. Limit: {max}.",
        errConvertFailed: "Conversion failed for this file.",
        errZipBuild: "Failed to build output ZIP.",
        noticeNoSupportedFiles: "No supported image files were found.",
        noticeZipNoImages: "ZIP file contains no supported images.",
        disclaimerGif:
          "Animated GIF inputs are converted from the first frame only. GIF output uses 256-color quantization.",
        disclaimerSvg:
          "Raster to SVG exports an embedded bitmap SVG wrapper, not vector tracing.",
      },
    },
    metadata: {
      titleTemplate: "%s · Tools | Jake Lee",
      defaultDescription:
        "A tools subsite of jakelee.site — practical browser-based utilities.",
    },
    cssAnimations: {
      metadata: {
        titleTemplate: "%s · CSS animations | Jake Lee",
        hubTitle: "CSS animations",
        hubDescription:
          "Browse loading spinners, button hover effects, and text motion snippets. Copy HTML and CSS, tweak speed, color, and size — all in your browser.",
      },
      hub: {
        eyebrow: "Copy-paste motion snippets",
        sub: "Each preset has its own page with live preview, code, and controls.",
        browseCategories: "Browse categories",
      },
      categories: {
        loaders: {
          title: "CSS loading animations",
          description:
            "Lightweight loaders and spinners for dashboards, buttons, and skeleton states.",
          open: "Open collection",
        },
        "hover-buttons": {
          title: "Button hover effects",
          description:
            "Micro-interactions for links and buttons using transitions and shadows.",
          open: "Open collection",
        },
        text: {
          title: "CSS text animations",
          description:
            "Headline treatments: shimmer, typing masks, and playful letter motion.",
          open: "Open collection",
        },
      },
      ui: {
        copy: "Copy",
        copyHtml: "Copy HTML",
        copyCss: "Copy CSS",
        reset: "Reset",
        previewAria: "Live preview",
        htmlLabel: "HTML",
        cssLabel: "CSS",
        paramSpeed: "Speed",
        paramColor: "Color",
        paramSize: "Size",
        copyOk: "Copied",
        copyFail: "Copy failed",
        relatedHeading: "More in this category",
        controlsTitle: "Parameters",
      },
      items: {
        "loaders/dot-pulse": {
          title: "Dot pulse loading animation",
          description:
            "Three pulsing dots in pure CSS — great for inline loading states and compact UI.",
          ogSubtitle: "CSS loading animation · dot pulse",
          breadcrumb: "Dot pulse",
        },
        "loaders/dual-ring": {
          title: "Dual ring spinner",
          description:
            "Two counter-rotating rings for a crisp, modern CSS loading animation.",
          ogSubtitle: "CSS loading animation · dual ring",
          breadcrumb: "Dual ring",
        },
        "loaders/bars": {
          title: "Stretching bars loader",
          description:
            "Vertical bars that stretch in sequence — a classic CSS loading animation pattern.",
          ogSubtitle: "CSS loading animation · bars",
          breadcrumb: "Bars",
        },
        "hover-buttons/underline-grow": {
          title: "Underline grow on hover",
          description:
            "A left-to-right underline that expands when users hover or focus the button.",
          ogSubtitle: "Button hover effect · underline",
          breadcrumb: "Underline grow",
        },
        "hover-buttons/lift-shadow": {
          title: "Lift and shadow hover",
          description:
            "Subtle lift with a soft shadow ramp — polished button hover effect in CSS.",
          ogSubtitle: "Button hover effect · lift shadow",
          breadcrumb: "Lift shadow",
        },
        "hover-buttons/glow-outline": {
          title: "Glow outline hover",
          description:
            "Expanding glow ring on hover for call-to-action buttons without extra assets.",
          ogSubtitle: "Button hover effect · glow",
          breadcrumb: "Glow outline",
        },
        "text/gradient-shimmer": {
          title: "Gradient shimmer text",
          description:
            "Animated gradient clip on headline text — high-impact CSS text animation for marketing.",
          ogSubtitle: "CSS text animation · shimmer",
          breadcrumb: "Gradient shimmer",
        },
        "text/typing-clip": {
          title: "Typing clip text animation",
          description:
            "A stepped width reveal with a blinking caret — pure CSS text animation.",
          ogSubtitle: "CSS text animation · typing",
          breadcrumb: "Typing clip",
        },
        "text/bounce-letters": {
          title: "Bouncing letters",
          description:
            "Staggered vertical bounce on each character for playful CSS text animation.",
          ogSubtitle: "CSS text animation · bounce",
          breadcrumb: "Bounce letters",
        },
      },
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
      cssAnimationsCta: {
        title: "CSS 动画片段合集",
        body: "加载动画、按钮悬停与文字动效——可预览、调参并复制 HTML/CSS。",
        linkLabel: "浏览 CSS 动画",
      },
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
      "image-converter": {
        name: "图片格式转换",
        description:
          "在浏览器本地批量转换 PNG、JPG、WebP、GIF、SVG，支持 ZIP 导入与 ZIP 下载。",
        tags: ["图片", "批量"],
        ogSubtitle: "本地图片格式互转与 ZIP 批量处理。",
      },
      "css-animations": {
        name: "CSS 动画片段",
        description:
          "加载动画、按钮悬停与文字动效——在浏览器内预览、调节速度/颜色/尺寸并复制 HTML/CSS。",
        tags: ["CSS", "动画", "界面"],
        ogSubtitle: "可复制的 CSS 加载、悬停与文字动效合集。",
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
      "image-converter": {
        cardTitle: "图片格式转换",
        dropzoneTitle: "拖拽图片或 ZIP 文件到这里",
        dropzoneBody:
          "支持 PNG、JPG、WebP、GIF、SVG，也可上传包含图片的 ZIP 压缩包。",
        pickFiles: "选择文件",
        labelFormat: "目标格式",
        labelQuality: "质量",
        labelScale: "分辨率倍率",
        summaryFiles: "文件数",
        summarySize: "总大小",
        summaryDone: "已转换",
        emptyQueue: "当前还没有文件，请先添加图片或 ZIP 压缩包。",
        statusPending: "待转换",
        statusConverting: "转换中...",
        statusDone: "完成",
        convertAll: "全部转换",
        downloadZip: "下载 ZIP",
        clear: "清空列表",
        errInvalidZip: "无法读取该 ZIP 文件。",
        errTooManyFiles: "文件数量过多，最多允许 {max} 个。",
        errTooLargeTotal: "文件总大小过大，限制为 {max}。",
        errConvertFailed: "该文件转换失败。",
        errZipBuild: "打包输出 ZIP 失败。",
        noticeNoSupportedFiles: "未检测到可处理的图片文件。",
        noticeZipNoImages: "ZIP 中未找到可处理的图片。",
        disclaimerGif: "动画 GIF 输入仅转换第一帧，GIF 输出会进行 256 色量化。",
        disclaimerSvg: "位图转 SVG 为内嵌位图包装，不是矢量描摹。",
      },
    },
    metadata: {
      titleTemplate: "%s · 工具 | Jake Lee",
      defaultDescription: "jakelee.site 子网站（实用在线小工具）",
    },
    cssAnimations: {
      metadata: {
        titleTemplate: "%s · CSS 动画 | Jake Lee",
        hubTitle: "CSS 动画合集",
        hubDescription:
          "收录加载动画、按钮悬停动效与文字动效。可实时预览、复制 HTML/CSS，并调节速度、颜色与尺寸，全部在浏览器本地完成。",
      },
      hub: {
        eyebrow: "可复制的动效片段",
        sub: "每个预设独立成页，含演示、源码与参数调节。",
        browseCategories: "按分类浏览",
      },
      categories: {
        loaders: {
          title: "CSS 加载动画",
          description: "轻量加载器与转圈动画，适合仪表盘、按钮与骨架屏。",
          open: "进入合集",
        },
        "hover-buttons": {
          title: "按钮悬停动效",
          description: "用过渡与阴影实现的链接与按钮微交互。",
          open: "进入合集",
        },
        text: {
          title: "CSS 文字动画",
          description: "标题动效：流光渐变、打字遮罩与字母跳动等。",
          open: "进入合集",
        },
      },
      ui: {
        copy: "复制",
        copyHtml: "复制 HTML",
        copyCss: "复制 CSS",
        reset: "重置",
        previewAria: "实时预览",
        htmlLabel: "HTML",
        cssLabel: "CSS",
        paramSpeed: "速度",
        paramColor: "颜色",
        paramSize: "尺寸",
        copyOk: "已复制",
        copyFail: "复制失败",
        relatedHeading: "同分类更多",
        controlsTitle: "参数",
      },
      items: {
        "loaders/dot-pulse": {
          title: "圆点脉冲加载动画",
          description:
            "三枚圆点呼吸式缩放与透明变化，适合内联加载与紧凑界面。",
          ogSubtitle: "CSS 加载动画 · 圆点脉冲",
          breadcrumb: "圆点脉冲",
        },
        "loaders/dual-ring": {
          title: "双环旋转加载器",
          description: "内外双环反向旋转，简洁现代的纯 CSS 加载动画。",
          ogSubtitle: "CSS 加载动画 · 双环",
          breadcrumb: "双环",
        },
        "loaders/bars": {
          title: "竖条拉伸加载动画",
          description: "竖条依次拉伸的经典加载条效果，纯 CSS 实现。",
          ogSubtitle: "CSS 加载动画 · 竖条",
          breadcrumb: "竖条",
        },
        "hover-buttons/underline-grow": {
          title: "下划线生长悬停",
          description: "悬停或键盘聚焦时，从左向右展开的下划线按钮动效。",
          ogSubtitle: "按钮悬停 · 下划线",
          breadcrumb: "下划线生长",
        },
        "hover-buttons/lift-shadow": {
          title: "上浮与阴影悬停",
          description: "轻微上移并增强阴影，适合主按钮的悬停反馈。",
          ogSubtitle: "按钮悬停 · 上浮阴影",
          breadcrumb: "上浮阴影",
        },
        "hover-buttons/glow-outline": {
          title: "外发光描边悬停",
          description: "悬停时扩散光晕，适合强调型 CTA，无需额外图片。",
          ogSubtitle: "按钮悬停 · 发光",
          breadcrumb: "外发光",
        },
        "text/gradient-shimmer": {
          title: "渐变流光文字",
          description: "标题文字上的流动渐变高光，适合落地页与营销横幅。",
          ogSubtitle: "CSS 文字动画 · 流光",
          breadcrumb: "渐变流光",
        },
        "text/typing-clip": {
          title: "打字机遮罩文字动画",
          description: "分步展开宽度配合闪烁光标，纯 CSS 文字动画。",
          ogSubtitle: "CSS 文字动画 · 打字",
          breadcrumb: "打字遮罩",
        },
        "text/bounce-letters": {
          title: "字母弹跳动画",
          description: "逐字错开的上下弹跳，活泼的标题文字动效。",
          ogSubtitle: "CSS 文字动画 · 弹跳",
          breadcrumb: "字母弹跳",
        },
      },
    },
  },
};

export async function getDictionary(
  locale: SiteLocale,
): Promise<ToolsSiteDictionary> {
  return dictionaries[locale];
}
