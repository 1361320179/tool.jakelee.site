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
      "qrcode-generator": {
        name: "QR code generator",
        description: "Generate QR codes from text or URLs locally in your browser. Download as image.",
        tags: ["QR", "Generator"],
        ogSubtitle: "Local QR code generator from text or URL.",
      },
      "color-converter": {
        name: "Color converter",
        description: "Convert colors between HEX, RGB, and HSL formats in real-time.",
        tags: ["Color", "Design"],
        ogSubtitle: "Real-time HEX, RGB, and HSL color converter.",
      },
      "text-counter": {
        name: "Text counter",
        description: "Count characters, words, and lines in your text. Estimates reading time.",
        tags: ["Text", "Utility"],
        ogSubtitle: "Local word, character, and line counter.",
      },
      "unit-converter": {
        name: "Unit converter",
        description: "Convert length, weight, temperature, and area units instantly.",
        tags: ["Unit", "Utility"],
        ogSubtitle: "Instant length, weight, temperature, and area converter.",
      },
      "case-converter": {
        name: "Case converter",
        description: "Convert text to uppercase, lowercase, title case, sentence case, or camelCase.",
        tags: ["Text", "Utility"],
        ogSubtitle: "Convert text case to upper, lower, title, sentence, or camel.",
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
      "qrcode-generator": {
        cardTitle: "QR code generator",
        labelInput: "Text or URL",
        placeholderInput: "Enter text or URL to generate QR code",
        generate: "Generate QR code",
        download: "Download QR Code",
        clear: "Clear",
        emptyPreview: "Enter text, then click Generate to create a QR code.",
        generatedFrom: "Generated from",
        errEmpty: "Please enter some text.",
      },
      "color-converter": {
        cardTitle: "Color converter",
        labelColor: "Pick a color",
        labelHex: "HEX",
        labelRgb: "RGB",
        labelHsl: "HSL",
        copy: "Copy",
        copyHintOk: "Copied",
        copyHintFail: "Copy failed",
      },
      "text-counter": {
        cardTitle: "Text counter",
        labelInput: "Text",
        placeholderInput: "Type or paste your text here...",
        statChars: "Characters",
        statCharsNoSpaces: "Characters (no spaces)",
        statWords: "Words",
        statLines: "Lines",
        statReadingTime: "Reading time",
        clear: "Clear text",
      },
      "unit-converter": {
        cardTitle: "Unit converter",
        labelCategory: "Category",
        labelFrom: "From",
        labelTo: "To",
        swap: "Swap units",
        categories: {
          length: "Length",
          weight: "Weight",
          temperature: "Temperature",
          area: "Area",
        },
        units: {
          m: "Meters",
          km: "Kilometers",
          cm: "Centimeters",
          mm: "Millimeters",
          in: "Inches",
          ft: "Feet",
          yd: "Yards",
          mi: "Miles",
          kg: "Kilograms",
          g: "Grams",
          mg: "Milligrams",
          lb: "Pounds",
          oz: "Ounces",
          c: "Celsius",
          f: "Fahrenheit",
          k: "Kelvin",
          sqm: "Square meters",
          sqkm: "Square kilometers",
          sqcm: "Square centimeters",
          sqmm: "Square millimeters",
          ha: "Hectares",
          ac: "Acres",
          sqin: "Square inches",
          sqft: "Square feet",
          sqyd: "Square yards",
          sqmi: "Square miles",
        },
      },
      "case-converter": {
        cardTitle: "Case converter",
        labelInput: "Text",
        placeholderInput: "Type or paste your text here...",
        btnUpper: "UPPERCASE",
        btnLower: "lowercase",
        btnTitle: "Title Case",
        btnSentence: "Sentence case",
        btnCamel: "camelCase",
        copy: "Copy",
        clear: "Clear",
        copyHintOk: "Copied",
        copyHintFail: "Copy failed",
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
        cards: {
          title: "Card hover effects",
          description:
            "Elegant card interactions with subtle depth, glow, and gradient accents.",
          open: "Open collection",
        },
        inputs: {
          title: "Input focus animations",
          description:
            "Polished input interactions for focus, labels, and underline feedback.",
          open: "Open collection",
        },
        "reveal-masks": {
          title: "Reveal mask animations",
          description:
            "Creative wipe and mask reveals for hero headlines and storytelling sections.",
          open: "Open collection",
        },
        "ambient-backgrounds": {
          title: "Ambient background motion",
          description:
            "Subtle atmospheric background loops that add depth without distracting content.",
          open: "Open collection",
        },
        "scroll-cues": {
          title: "Scroll cue animations",
          description:
            "Guide users through long pages with elegant directional and progress cues.",
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
        "loaders/orbit-dots": {
          title: "Orbit dots loader",
          description:
            "Nested orbit rings with rotating dots and a bright center for modern loading states.",
          ogSubtitle: "CSS loading animation · orbit dots",
          breadcrumb: "Orbit dots",
        },
        "loaders/ripple-ring": {
          title: "Ripple ring loader",
          description:
            "Concentric rings expand and fade like ripples, ideal for calm waiting feedback.",
          ogSubtitle: "CSS loading animation · ripple ring",
          breadcrumb: "Ripple ring",
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
        "hover-buttons/fill-sweep": {
          title: "Fill sweep hover button",
          description:
            "Gradient fill sweeps across the button on hover for clear, satisfying feedback.",
          ogSubtitle: "Button hover effect · fill sweep",
          breadcrumb: "Fill sweep",
        },
        "hover-buttons/icon-slide": {
          title: "Icon slide hover button",
          description:
            "Button icon glides forward on hover while the surface lifts slightly for momentum.",
          ogSubtitle: "Button hover effect · icon slide",
          breadcrumb: "Icon slide",
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
        "text/wave-rise": {
          title: "Wave rise text animation",
          description:
            "Characters move upward in a smooth wave sequence for energetic hero headlines.",
          ogSubtitle: "CSS text animation · wave rise",
          breadcrumb: "Wave rise",
        },
        "text/neon-pulse": {
          title: "Neon pulse headline",
          description:
            "Glowing headline text gently pulses in intensity to highlight key marketing copy.",
          ogSubtitle: "CSS text animation · neon pulse",
          breadcrumb: "Neon pulse",
        },
        "cards/glass-panel": {
          title: "Glassmorphism card hover",
          description:
            "Frosted-glass card with soft glow and sheen sweep for modern UI surfaces.",
          ogSubtitle: "Card hover effect · glass panel",
          breadcrumb: "Glass panel",
        },
        "cards/gradient-border": {
          title: "Animated gradient border card",
          description:
            "Premium card style with a rotating gradient border ring and subtle lift.",
          ogSubtitle: "Card hover effect · gradient border",
          breadcrumb: "Gradient border",
        },
        "cards/tilt-glow": {
          title: "Tilt glow card hover",
          description:
            "Card tilts subtly with a moving glow orb to add depth and premium interaction feel.",
          ogSubtitle: "Card hover effect · tilt glow",
          breadcrumb: "Tilt glow",
        },
        "cards/accent-strip": {
          title: "Accent strip card hover",
          description:
            "Top accent line sweeps across the card on hover for clean dashboard-style emphasis.",
          ogSubtitle: "Card hover effect · accent strip",
          breadcrumb: "Accent strip",
        },
        "inputs/float-label": {
          title: "Floating label input",
          description:
            "Material-inspired input where the label floats and scales on focus or value.",
          ogSubtitle: "Input animation · floating label",
          breadcrumb: "Float label",
        },
        "inputs/focus-expand": {
          title: "Expanding focus underline input",
          description:
            "Input underline grows from center to edges on focus for clear interaction feedback.",
          ogSubtitle: "Input animation · focus expand",
          breadcrumb: "Focus expand",
        },
        "inputs/glow-focus-ring": {
          title: "Glow focus ring input",
          description:
            "Input border and glow intensify on focus, making active form fields instantly clear.",
          ogSubtitle: "Input animation · glow focus ring",
          breadcrumb: "Glow focus ring",
        },
        "inputs/underline-slide": {
          title: "Underline slide input",
          description:
            "A bright underline slides in from the left on focus for crisp, minimal form feedback.",
          ogSubtitle: "Input animation · underline slide",
          breadcrumb: "Underline slide",
        },
        "reveal-masks/curtain-split": {
          title: "Curtain split reveal",
          description:
            "Twin mask panels slide apart like stage curtains to reveal highlighted content.",
          ogSubtitle: "Reveal mask animation · curtain split",
          breadcrumb: "Curtain split",
        },
        "reveal-masks/spotlight-reveal": {
          title: "Spotlight reveal",
          description:
            "A moving spotlight gradually exposes text for dramatic but readable hero moments.",
          ogSubtitle: "Reveal mask animation · spotlight",
          breadcrumb: "Spotlight reveal",
        },
        "reveal-masks/diagonal-wipe": {
          title: "Diagonal wipe reveal",
          description:
            "Angled sweep mask creates a modern editorial transition for section headers.",
          ogSubtitle: "Reveal mask animation · diagonal wipe",
          breadcrumb: "Diagonal wipe",
        },
        "reveal-masks/noise-fade-in": {
          title: "Noise fade reveal",
          description:
            "Grainy mask dissolves away to reveal content with a cinematic texture.",
          ogSubtitle: "Reveal mask animation · noise fade",
          breadcrumb: "Noise fade in",
        },
        "ambient-backgrounds/mesh-drift": {
          title: "Mesh drift background",
          description:
            "Gradient mesh blobs drift slowly to add premium depth in hero sections.",
          ogSubtitle: "Ambient background animation · mesh drift",
          breadcrumb: "Mesh drift",
        },
        "ambient-backgrounds/aurora-wave": {
          title: "Aurora wave background",
          description:
            "Soft aurora ribbons sway across the surface for atmospheric product pages.",
          ogSubtitle: "Ambient background animation · aurora wave",
          breadcrumb: "Aurora wave",
        },
        "ambient-backgrounds/grain-flow": {
          title: "Grain flow texture",
          description:
            "Low-contrast animated grain adds tactile motion without overpowering UI content.",
          ogSubtitle: "Ambient background animation · grain flow",
          breadcrumb: "Grain flow",
        },
        "ambient-backgrounds/orbital-glow": {
          title: "Orbital glow background",
          description:
            "Multiple glowing orbs orbit softly to create a futuristic yet calm backdrop.",
          ogSubtitle: "Ambient background animation · orbital glow",
          breadcrumb: "Orbital glow",
        },
        "scroll-cues/mouse-scroll-loop": {
          title: "Mouse scroll loop cue",
          description:
            "Animated mouse wheel loop clearly hints that users can scroll for more content.",
          ogSubtitle: "Scroll cue animation · mouse loop",
          breadcrumb: "Mouse scroll loop",
        },
        "scroll-cues/section-progress-rail": {
          title: "Section progress rail",
          description:
            "Stacked progress dots animate in sequence to imply movement through sections.",
          ogSubtitle: "Scroll cue animation · progress rail",
          breadcrumb: "Progress rail",
        },
        "scroll-cues/sticky-arrow-pulse": {
          title: "Sticky arrow pulse",
          description:
            "A pulsing downward arrow draws attention to the next section without being noisy.",
          ogSubtitle: "Scroll cue animation · sticky arrow",
          breadcrumb: "Sticky arrow",
        },
        "scroll-cues/peek-next-card": {
          title: "Peek next card cue",
          description:
            "A partially visible next card subtly previews upcoming content blocks.",
          ogSubtitle: "Scroll cue animation · next card peek",
          breadcrumb: "Peek next card",
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
      "qrcode-generator": {
        name: "二维码生成器",
        description: "在浏览器本地将文本或链接生成二维码，并支持下载图片。",
        tags: ["二维码", "生成器"],
        ogSubtitle: "本地文本与链接二维码生成器。",
      },
      "color-converter": {
        name: "颜色转换器",
        description: "实时在 HEX、RGB 和 HSL 颜色格式之间进行转换。",
        tags: ["颜色", "设计"],
        ogSubtitle: "实时 HEX、RGB 和 HSL 颜色转换。",
      },
      "text-counter": {
        name: "字数统计",
        description: "统计文本的字符数、单词数、行数，并预估阅读时间。",
        tags: ["文本", "实用"],
        ogSubtitle: "本地字数、字符数与行数统计。",
      },
      "unit-converter": {
        name: "单位换算",
        description: "快速进行长度、重量、温度和面积单位的换算。",
        tags: ["单位", "实用"],
        ogSubtitle: "快速长度、重量、温度与面积换算。",
      },
      "case-converter": {
        name: "大小写转换",
        description: "将文本转换为大写、小写、首字母大写、句首大写或驼峰式。",
        tags: ["文本", "实用"],
        ogSubtitle: "文本大小写、首字母大写与驼峰式转换。",
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
      "qrcode-generator": {
        cardTitle: "二维码生成器",
        labelInput: "文本或链接",
        placeholderInput: "输入文本或链接以生成二维码",
        generate: "生成二维码",
        download: "下载二维码",
        clear: "清空",
        emptyPreview: "输入文本后点击生成，二维码会显示在这里。",
        generatedFrom: "生成内容",
        errEmpty: "请输入一些文本。",
      },
      "color-converter": {
        cardTitle: "颜色转换器",
        labelColor: "选择颜色",
        labelHex: "HEX",
        labelRgb: "RGB",
        labelHsl: "HSL",
        copy: "复制",
        copyHintOk: "已复制",
        copyHintFail: "复制失败",
      },
      "text-counter": {
        cardTitle: "字数统计",
        labelInput: "文本",
        placeholderInput: "在此输入或粘贴文本...",
        statChars: "字符数",
        statCharsNoSpaces: "字符数 (不含空格)",
        statWords: "单词数",
        statLines: "行数",
        statReadingTime: "阅读时间",
        clear: "清空文本",
      },
      "unit-converter": {
        cardTitle: "单位换算",
        labelCategory: "类别",
        labelFrom: "从",
        labelTo: "到",
        swap: "交换单位",
        categories: {
          length: "长度",
          weight: "重量",
          temperature: "温度",
          area: "面积",
        },
        units: {
          m: "米",
          km: "千米",
          cm: "厘米",
          mm: "毫米",
          in: "英寸",
          ft: "英尺",
          yd: "码",
          mi: "英里",
          kg: "千克",
          g: "克",
          mg: "毫克",
          lb: "磅",
          oz: "盎司",
          c: "摄氏度",
          f: "华氏度",
          k: "开尔文",
          sqm: "平方米",
          sqkm: "平方千米",
          sqcm: "平方厘米",
          sqmm: "平方毫米",
          ha: "公顷",
          ac: "英亩",
          sqin: "平方英寸",
          sqft: "平方英尺",
          sqyd: "平方码",
          sqmi: "平方英里",
        },
      },
      "case-converter": {
        cardTitle: "大小写转换",
        labelInput: "文本",
        placeholderInput: "在此输入或粘贴文本...",
        btnUpper: "全部大写",
        btnLower: "全部小写",
        btnTitle: "首字母大写",
        btnSentence: "句首大写",
        btnCamel: "驼峰式",
        copy: "复制",
        clear: "清空",
        copyHintOk: "已复制",
        copyHintFail: "复制失败",
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
        cards: {
          title: "卡片悬停动效",
          description: "强调层次与质感的卡片微交互，适合内容卡和商品卡。",
          open: "进入合集",
        },
        inputs: {
          title: "输入框聚焦动画",
          description: "输入框焦点反馈、标签过渡与下划线强化等细节动效。",
          open: "进入合集",
        },
        "reveal-masks": {
          title: "遮罩揭示动效",
          description: "通过擦除、聚光与幕布揭示，让标题和核心内容更有记忆点。",
          open: "进入合集",
        },
        "ambient-backgrounds": {
          title: "氛围背景动效",
          description: "低干扰、高质感的背景动态层，适合 Hero 与品牌场景。",
          open: "进入合集",
        },
        "scroll-cues": {
          title: "滚动引导动效",
          description: "用轻量视觉提示引导用户继续向下浏览长页面内容。",
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
        "loaders/orbit-dots": {
          title: "轨道圆点加载动画",
          description: "双层轨道圆点围绕中心旋转，节奏平稳，适合现代化加载反馈。",
          ogSubtitle: "CSS 加载动画 · 轨道圆点",
          breadcrumb: "轨道圆点",
        },
        "loaders/ripple-ring": {
          title: "涟漪圆环加载动画",
          description: "同心圆环向外扩散并渐隐，视觉柔和，适合等待态提示。",
          ogSubtitle: "CSS 加载动画 · 涟漪圆环",
          breadcrumb: "涟漪圆环",
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
        "hover-buttons/fill-sweep": {
          title: "渐变填充扫过悬停",
          description: "悬停时渐变色从左向右扫过按钮，反馈明确且观感高级。",
          ogSubtitle: "按钮悬停 · 填充扫过",
          breadcrumb: "填充扫过",
        },
        "hover-buttons/icon-slide": {
          title: "图标滑移动效按钮",
          description: "悬停时图标向前滑动并伴随轻微上浮，动势自然不突兀。",
          ogSubtitle: "按钮悬停 · 图标滑移",
          breadcrumb: "图标滑移",
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
        "text/wave-rise": {
          title: "波浪上浮文字动画",
          description: "字符按顺序上浮形成波浪节奏，适合强调标题与主视觉文案。",
          ogSubtitle: "CSS 文字动画 · 波浪上浮",
          breadcrumb: "波浪上浮",
        },
        "text/neon-pulse": {
          title: "霓虹脉冲标题文字",
          description: "文字发光强度缓慢呼吸变化，适合突出重点宣传语。",
          ogSubtitle: "CSS 文字动画 · 霓虹脉冲",
          breadcrumb: "霓虹脉冲",
        },
        "cards/glass-panel": {
          title: "玻璃拟态卡片悬停",
          description: "毛玻璃卡片在悬停时出现柔和光晕与扫光，质感细腻。",
          ogSubtitle: "卡片悬停动效 · 玻璃面板",
          breadcrumb: "玻璃面板",
        },
        "cards/gradient-border": {
          title: "渐变流光边框卡片",
          description: "卡片边框缓慢旋转的渐变流光，适合强调重点内容。",
          ogSubtitle: "卡片悬停动效 · 渐变边框",
          breadcrumb: "渐变边框",
        },
        "cards/tilt-glow": {
          title: "倾斜发光卡片悬停",
          description: "悬停时卡片轻微倾斜并伴随光晕位移，层次感更强。",
          ogSubtitle: "卡片悬停动效 · 倾斜发光",
          breadcrumb: "倾斜发光",
        },
        "cards/accent-strip": {
          title: "强调条扫光卡片",
          description: "顶部强调线在悬停时扫过，风格克制，适合看板与数据卡片。",
          ogSubtitle: "卡片悬停动效 · 强调条",
          breadcrumb: "强调条",
        },
        "inputs/float-label": {
          title: "浮动标签输入框",
          description: "聚焦或有值时标签平滑上移缩小，表单层次更清晰。",
          ogSubtitle: "输入框动画 · 浮动标签",
          breadcrumb: "浮动标签",
        },
        "inputs/focus-expand": {
          title: "聚焦扩展下划线输入框",
          description: "聚焦时下划线从中心向两端展开，交互反馈明确自然。",
          ogSubtitle: "输入框动画 · 扩展下划线",
          breadcrumb: "聚焦扩展",
        },
        "inputs/glow-focus-ring": {
          title: "发光聚焦边框输入框",
          description: "聚焦时边框与外发光同步增强，当前输入焦点更醒目。",
          ogSubtitle: "输入框动画 · 发光边框",
          breadcrumb: "发光边框",
        },
        "inputs/underline-slide": {
          title: "滑入下划线输入框",
          description: "聚焦时高亮下划线由左向右滑入，反馈清晰利落。",
          ogSubtitle: "输入框动画 · 滑入下划线",
          breadcrumb: "滑入下划线",
        },
        "reveal-masks/curtain-split": {
          title: "幕布分离揭示动效",
          description: "两侧遮罩像幕布一样向外展开，突出主标题或重点信息。",
          ogSubtitle: "遮罩揭示动画 · 幕布分离",
          breadcrumb: "幕布分离",
        },
        "reveal-masks/spotlight-reveal": {
          title: "聚光揭示动效",
          description: "聚光区域横向移动逐步显露文字，视觉戏剧性强且可读。",
          ogSubtitle: "遮罩揭示动画 · 聚光揭示",
          breadcrumb: "聚光揭示",
        },
        "reveal-masks/diagonal-wipe": {
          title: "斜向擦除揭示动效",
          description: "斜切扫光式遮罩掠过内容，适合专题页分段转场。",
          ogSubtitle: "遮罩揭示动画 · 斜向擦除",
          breadcrumb: "斜向擦除",
        },
        "reveal-masks/noise-fade-in": {
          title: "颗粒渐隐揭示动效",
          description: "颗粒遮罩逐渐淡出，形成电影感的内容显现效果。",
          ogSubtitle: "遮罩揭示动画 · 颗粒渐隐",
          breadcrumb: "颗粒渐隐",
        },
        "ambient-backgrounds/mesh-drift": {
          title: "渐变网格漂移动效",
          description: "渐变网格缓慢漂移，适合高级感产品页背景氛围。",
          ogSubtitle: "氛围背景动画 · 网格漂移",
          breadcrumb: "网格漂移",
        },
        "ambient-backgrounds/aurora-wave": {
          title: "极光波带背景动效",
          description: "柔和极光色带横向流动，增强页面空间感与品牌感。",
          ogSubtitle: "氛围背景动画 · 极光波带",
          breadcrumb: "极光波带",
        },
        "ambient-backgrounds/grain-flow": {
          title: "颗粒流动纹理动效",
          description: "低对比颗粒纹理轻微流动，细节丰富但不抢内容注意力。",
          ogSubtitle: "氛围背景动画 · 颗粒流动",
          breadcrumb: "颗粒流动",
        },
        "ambient-backgrounds/orbital-glow": {
          title: "轨道光团背景动效",
          description: "多光团缓慢轨道运动，营造未来感且克制的背景层。",
          ogSubtitle: "氛围背景动画 · 轨道光团",
          breadcrumb: "轨道光团",
        },
        "scroll-cues/mouse-scroll-loop": {
          title: "鼠标滚轮循环提示",
          description: "滚轮动画持续循环，明确提示用户可继续向下浏览。",
          ogSubtitle: "滚动引导动画 · 鼠标滚轮",
          breadcrumb: "滚轮提示",
        },
        "scroll-cues/section-progress-rail": {
          title: "分段进度轨道提示",
          description: "纵向圆点按节奏点亮，传达页面分段与阅读进度感。",
          ogSubtitle: "滚动引导动画 · 分段轨道",
          breadcrumb: "分段轨道",
        },
        "scroll-cues/sticky-arrow-pulse": {
          title: "吸附箭头脉冲提示",
          description: "下箭头轻脉冲并上下浮动，引导用户关注下一屏内容。",
          ogSubtitle: "滚动引导动画 · 脉冲箭头",
          breadcrumb: "脉冲箭头",
        },
        "scroll-cues/peek-next-card": {
          title: "下一卡片预窥提示",
          description: "下方卡片局部露出并轻微上浮，暗示后续内容结构。",
          ogSubtitle: "滚动引导动画 · 卡片预窥",
          breadcrumb: "卡片预窥",
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
