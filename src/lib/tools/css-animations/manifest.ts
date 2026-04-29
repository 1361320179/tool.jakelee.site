import type { AnimationDefinition, MotionVars } from "./types";
import { motionDurationSec, motionSizePx } from "./vars";

function s(rootClass: string) {
  return `.ca-scope.${rootClass}`;
}

const loaders: AnimationDefinition[] = [
  {
    slug: "dot-pulse",
    category: "loaders",
    supportedParams: ["speed", "color", "size"],
    rootClass: "ca-dot-pulse",
    getHtml: () =>
      `<div class="ca-scope ca-dot-pulse">\n  <span></span><span></span><span></span>\n</div>`,
    getCss: (vars: MotionVars) => {
      const d = motionDurationSec(vars, 1.1);
      const dot = motionSizePx(vars, 12);
      const gap = Math.round(dot * 0.4);
      return [
        `${s("ca-dot-pulse")} {`,
        `  display: inline-flex;`,
        `  align-items: center;`,
        `  gap: ${gap}px;`,
        `}`,
        `${s("ca-dot-pulse")} span {`,
        `  width: ${dot}px;`,
        `  height: ${dot}px;`,
        `  border-radius: 50%;`,
        `  background: ${vars.color};`,
        `  animation: ca-dot-pulse-kf ${d} ease-in-out infinite;`,
        `}`,
        `${s("ca-dot-pulse")} span:nth-child(2) { animation-delay: 0.12s; }`,
        `${s("ca-dot-pulse")} span:nth-child(3) { animation-delay: 0.24s; }`,
        `@keyframes ca-dot-pulse-kf {`,
        `  0%, 80%, 100% { transform: scale(0.55); opacity: 0.35; }`,
        `  40% { transform: scale(1); opacity: 1; }`,
        `}`,
      ].join("\n");
    },
  },
  {
    slug: "dual-ring",
    category: "loaders",
    supportedParams: ["speed", "color", "size"],
    rootClass: "ca-dual-ring",
    getHtml: () =>
      `<div class="ca-scope ca-dual-ring">\n  <span class="ca-dual-ring__a"></span>\n  <span class="ca-dual-ring__b"></span>\n</div>`,
    getCss: (vars: MotionVars) => {
      const d = motionDurationSec(vars, 1.4);
      const outer = motionSizePx(vars, 44);
      const border = Math.max(2, Math.round(outer * 0.08));
      return [
        `${s("ca-dual-ring")} {`,
        `  position: relative;`,
        `  display: inline-block;`,
        `  width: ${outer}px;`,
        `  height: ${outer}px;`,
        `}`,
        `${s("ca-dual-ring")} span {`,
        `  position: absolute;`,
        `  inset: 0;`,
        `  border-radius: 50%;`,
        `  border: ${border}px solid transparent;`,
        `  border-top-color: ${vars.color};`,
        `  border-right-color: ${vars.color};`,
        `  animation: ca-dual-ring-spin ${d} linear infinite;`,
        `}`,
        `${s("ca-dual-ring")} .ca-dual-ring__b {`,
        `  inset: ${Math.round(outer * 0.12)}px;`,
        `  border-top-color: color-mix(in srgb, ${vars.color} 55%, transparent);`,
        `  border-right-color: color-mix(in srgb, ${vars.color} 35%, transparent);`,
        `  animation-direction: reverse;`,
        `  animation-duration: ${motionDurationSec(vars, 1.9)};`,
        `}`,
        `@keyframes ca-dual-ring-spin {`,
        `  to { transform: rotate(360deg); }`,
        `}`,
      ].join("\n");
    },
  },
  {
    slug: "bars",
    category: "loaders",
    supportedParams: ["speed", "color", "size"],
    rootClass: "ca-bars",
    getHtml: () =>
      `<div class="ca-scope ca-bars">\n  <span></span><span></span><span></span>\n</div>`,
    getCss: (vars: MotionVars) => {
      const d = motionDurationSec(vars, 1);
      const w = motionSizePx(vars, 6);
      const h = motionSizePx(vars, 36);
      const gap = Math.round(w * 0.5);
      return [
        `${s("ca-bars")} {`,
        `  display: inline-flex;`,
        `  align-items: flex-end;`,
        `  gap: ${gap}px;`,
        `  height: ${h}px;`,
        `}`,
        `${s("ca-bars")} span {`,
        `  display: block;`,
        `  width: ${w}px;`,
        `  height: 100%;`,
        `  background: ${vars.color};`,
        `  border-radius: 2px;`,
        `  transform-origin: bottom center;`,
        `  animation: ca-bars-stretch ${d} ease-in-out infinite;`,
        `}`,
        `${s("ca-bars")} span:nth-child(2) { animation-delay: 0.12s; }`,
        `${s("ca-bars")} span:nth-child(3) { animation-delay: 0.24s; }`,
        `@keyframes ca-bars-stretch {`,
        `  0%, 40%, 100% { transform: scaleY(0.35); }`,
        `  20% { transform: scaleY(1); }`,
        `}`,
      ].join("\n");
    },
  },
  {
    slug: "orbit-dots",
    category: "loaders",
    supportedParams: ["speed", "color", "size"],
    rootClass: "ca-orbit-dots",
    getHtml: () =>
      `<div class="ca-scope ca-orbit-dots">\n  <span class="ca-orbit-dots__center"></span>\n  <span class="ca-orbit-dots__ring ca-orbit-dots__ring--a"></span>\n  <span class="ca-orbit-dots__ring ca-orbit-dots__ring--b"></span>\n</div>`,
    getCss: (vars: MotionVars) => {
      const d = motionDurationSec(vars, 1.4);
      const box = motionSizePx(vars, 50);
      const center = Math.max(6, Math.round(box * 0.24));
      const dot = Math.max(5, Math.round(box * 0.17));
      return [
        `${s("ca-orbit-dots")} {`,
        `  position: relative;`,
        `  width: ${box}px;`,
        `  height: ${box}px;`,
        `  display: inline-grid;`,
        `  place-items: center;`,
        `}`,
        `${s("ca-orbit-dots")} .ca-orbit-dots__center {`,
        `  width: ${center}px;`,
        `  height: ${center}px;`,
        `  border-radius: 50%;`,
        `  background: color-mix(in srgb, ${vars.color} 75%, white);`,
        `  box-shadow: 0 0 ${Math.round(box * 0.22)}px color-mix(in srgb, ${vars.color} 38%, transparent);`,
        `}`,
        `${s("ca-orbit-dots")} .ca-orbit-dots__ring {`,
        `  position: absolute;`,
        `  inset: 0;`,
        `  border-radius: 50%;`,
        `  border: 1px dashed color-mix(in srgb, ${vars.color} 35%, transparent);`,
        `  animation: ca-orbit-dots-spin ${d} linear infinite;`,
        `}`,
        `${s("ca-orbit-dots")} .ca-orbit-dots__ring::after {`,
        `  content: "";`,
        `  position: absolute;`,
        `  top: -${Math.round(dot * 0.18)}px;`,
        `  left: 50%;`,
        `  width: ${dot}px;`,
        `  height: ${dot}px;`,
        `  border-radius: 50%;`,
        `  transform: translateX(-50%);`,
        `  background: ${vars.color};`,
        `}`,
        `${s("ca-orbit-dots")} .ca-orbit-dots__ring--b {`,
        `  inset: ${Math.round(box * 0.16)}px;`,
        `  animation-duration: ${motionDurationSec(vars, 1)};`,
        `  animation-direction: reverse;`,
        `}`,
        `${s("ca-orbit-dots")} .ca-orbit-dots__ring--b::after {`,
        `  background: color-mix(in srgb, ${vars.color} 70%, white);`,
        `}`,
        `@keyframes ca-orbit-dots-spin {`,
        `  to { transform: rotate(360deg); }`,
        `}`,
      ].join("\n");
    },
  },
  {
    slug: "ripple-ring",
    category: "loaders",
    supportedParams: ["speed", "color", "size"],
    rootClass: "ca-ripple-ring",
    getHtml: () =>
      `<div class="ca-scope ca-ripple-ring">\n  <span></span><span></span><span></span>\n</div>`,
    getCss: (vars: MotionVars) => {
      const d = motionDurationSec(vars, 1.8);
      const box = motionSizePx(vars, 52);
      const stroke = Math.max(2, Math.round(box * 0.06));
      return [
        `${s("ca-ripple-ring")} {`,
        `  position: relative;`,
        `  display: inline-block;`,
        `  width: ${box}px;`,
        `  height: ${box}px;`,
        `}`,
        `${s("ca-ripple-ring")} span {`,
        `  position: absolute;`,
        `  inset: 0;`,
        `  border-radius: 50%;`,
        `  border: ${stroke}px solid color-mix(in srgb, ${vars.color} 72%, transparent);`,
        `  animation: ca-ripple-ring-kf ${d} cubic-bezier(0.2, 0.68, 0.18, 1) infinite;`,
        `}`,
        `${s("ca-ripple-ring")} span:nth-child(2) { animation-delay: ${motionDurationSec(vars, 0.28)}; }`,
        `${s("ca-ripple-ring")} span:nth-child(3) { animation-delay: ${motionDurationSec(vars, 0.56)}; }`,
        `@keyframes ca-ripple-ring-kf {`,
        `  0% { transform: scale(0.34); opacity: 0.9; }`,
        `  70% { opacity: 0.22; }`,
        `  100% { transform: scale(1); opacity: 0; }`,
        `}`,
      ].join("\n");
    },
  },
];

const hoverButtons: AnimationDefinition[] = [
  {
    slug: "underline-grow",
    category: "hover-buttons",
    supportedParams: ["speed", "color", "size"],
    rootClass: "ca-underline",
    getHtml: () =>
      `<button class="ca-scope ca-underline" type="button">\n  Hover me\n</button>`,
    getCss: (vars: MotionVars) => {
      const d = motionDurationSec(vars, 0.35);
      const fs = motionSizePx(vars, 16);
      const padY = Math.round(fs * 0.45);
      const padX = Math.round(fs * 0.9);
      return [
        `${s("ca-underline")} {`,
        `  position: relative;`,
        `  cursor: pointer;`,
        `  border: none;`,
        `  background: transparent;`,
        `  color: ${vars.color};`,
        `  font-size: ${fs}px;`,
        `  font-weight: 600;`,
        `  padding: ${padY}px ${padX}px;`,
        `}`,
        `${s("ca-underline")}::after {`,
        `  content: "";`,
        `  position: absolute;`,
        `  left: 0;`,
        `  bottom: ${Math.round(fs * 0.15)}px;`,
        `  width: 100%;`,
        `  height: ${Math.max(2, Math.round(fs * 0.1))}px;`,
        `  background: ${vars.color};`,
        `  transform: scaleX(0);`,
        `  transform-origin: left center;`,
        `  transition: transform ${d} ease;`,
        `}`,
        `${s("ca-underline")}:hover::after,`,
        `${s("ca-underline")}:focus-visible::after {`,
        `  transform: scaleX(1);`,
        `}`,
      ].join("\n");
    },
  },
  {
    slug: "lift-shadow",
    category: "hover-buttons",
    supportedParams: ["speed", "color", "size"],
    rootClass: "ca-lift",
    getHtml: () =>
      `<button class="ca-scope ca-lift" type="button">\n  Hover me\n</button>`,
    getCss: (vars: MotionVars) => {
      const d = motionDurationSec(vars, 0.28);
      const fs = motionSizePx(vars, 16);
      const padY = Math.round(fs * 0.5);
      const padX = Math.round(fs * 1.1);
      const r = Math.round(fs * 0.35);
      return [
        `${s("ca-lift")} {`,
        `  cursor: pointer;`,
        `  border: 1px solid color-mix(in srgb, ${vars.color} 45%, transparent);`,
        `  background: color-mix(in srgb, ${vars.color} 12%, transparent);`,
        `  color: ${vars.color};`,
        `  font-size: ${fs}px;`,
        `  font-weight: 600;`,
        `  padding: ${padY}px ${padX}px;`,
        `  border-radius: ${r}px;`,
        `  box-shadow: 0 2px 0 color-mix(in srgb, ${vars.color} 25%, transparent);`,
        `  transition:`,
        `    transform ${d} ease,`,
        `    box-shadow ${d} ease,`,
        `    border-color ${d} ease;`,
        `}`,
        `${s("ca-lift")}:hover,`,
        `${s("ca-lift")}:focus-visible {`,
        `  transform: translateY(-${Math.max(3, Math.round(fs * 0.2))}px);`,
        `  box-shadow:`,
        `    0 ${Math.round(fs * 0.45)}px ${Math.round(fs * 0.7)}px color-mix(in srgb, ${vars.color} 35%, transparent);`,
        `  border-color: color-mix(in srgb, ${vars.color} 70%, transparent);`,
        `}`,
      ].join("\n");
    },
  },
  {
    slug: "glow-outline",
    category: "hover-buttons",
    supportedParams: ["speed", "color", "size"],
    rootClass: "ca-glow",
    getHtml: () =>
      `<button class="ca-scope ca-glow" type="button">\n  Hover me\n</button>`,
    getCss: (vars: MotionVars) => {
      const d = motionDurationSec(vars, 0.45);
      const fs = motionSizePx(vars, 16);
      const padY = Math.round(fs * 0.5);
      const padX = Math.round(fs * 1.1);
      const r = Math.round(fs * 0.45);
      return [
        `${s("ca-glow")} {`,
        `  cursor: pointer;`,
        `  border: 2px solid ${vars.color};`,
        `  background: transparent;`,
        `  color: ${vars.color};`,
        `  font-size: ${fs}px;`,
        `  font-weight: 600;`,
        `  padding: ${padY}px ${padX}px;`,
        `  border-radius: ${r}px;`,
        `  box-shadow: 0 0 0 0 color-mix(in srgb, ${vars.color} 45%, transparent);`,
        `  transition: box-shadow ${d} ease, transform ${d} ease;`,
        `}`,
        `${s("ca-glow")}:hover,`,
        `${s("ca-glow")}:focus-visible {`,
        `  box-shadow:`,
        `    0 0 0 ${Math.round(fs * 0.35)}px color-mix(in srgb, ${vars.color} 25%, transparent),`,
        `    0 0 ${Math.round(fs * 1.2)}px color-mix(in srgb, ${vars.color} 55%, transparent);`,
        `  transform: scale(1.02);`,
        `}`,
      ].join("\n");
    },
  },
  {
    slug: "fill-sweep",
    category: "hover-buttons",
    supportedParams: ["speed", "color", "size"],
    rootClass: "ca-fill-sweep",
    getHtml: () =>
      `<button class="ca-scope ca-fill-sweep" type="button">\n  <span>Explore now</span>\n</button>`,
    getCss: (vars: MotionVars) => {
      const d = motionDurationSec(vars, 0.34);
      const fs = motionSizePx(vars, 16);
      const py = Math.round(fs * 0.5);
      const px = Math.round(fs * 1.15);
      return [
        `${s("ca-fill-sweep")} {`,
        `  position: relative;`,
        `  overflow: hidden;`,
        `  cursor: pointer;`,
        `  border: 1px solid color-mix(in srgb, ${vars.color} 64%, transparent);`,
        `  border-radius: ${Math.round(fs * 0.45)}px;`,
        `  background: transparent;`,
        `  color: ${vars.color};`,
        `  font-size: ${fs}px;`,
        `  font-weight: 600;`,
        `  padding: ${py}px ${px}px;`,
        `  transition: color ${d} ease, border-color ${d} ease;`,
        `}`,
        `${s("ca-fill-sweep")}::before {`,
        `  content: "";`,
        `  position: absolute;`,
        `  inset: 0;`,
        `  background: linear-gradient(`,
        `    120deg,`,
        `    color-mix(in srgb, ${vars.color} 88%, #ffffff),`,
        `    ${vars.color}`,
        `  );`,
        `  transform: translateX(-104%);`,
        `  transition: transform ${d} ease;`,
        `  z-index: 0;`,
        `}`,
        `${s("ca-fill-sweep")} > * { position: relative; z-index: 1; }`,
        `${s("ca-fill-sweep")}:hover,`,
        `${s("ca-fill-sweep")}:focus-visible {`,
        `  color: color-mix(in srgb, ${vars.color} 18%, black);`,
        `  border-color: ${vars.color};`,
        `}`,
        `${s("ca-fill-sweep")}:hover::before,`,
        `${s("ca-fill-sweep")}:focus-visible::before {`,
        `  transform: translateX(0);`,
        `}`,
      ].join("\n");
    },
  },
  {
    slug: "icon-slide",
    category: "hover-buttons",
    supportedParams: ["speed", "color", "size"],
    rootClass: "ca-icon-slide",
    getHtml: () =>
      `<button class="ca-scope ca-icon-slide" type="button">\n  <span>Read more</span>\n  <span aria-hidden="true" class="ca-icon-slide__icon">→</span>\n</button>`,
    getCss: (vars: MotionVars) => {
      const d = motionDurationSec(vars, 0.28);
      const fs = motionSizePx(vars, 16);
      return [
        `${s("ca-icon-slide")} {`,
        `  display: inline-flex;`,
        `  align-items: center;`,
        `  gap: ${Math.max(6, Math.round(fs * 0.35))}px;`,
        `  cursor: pointer;`,
        `  border: none;`,
        `  border-radius: ${Math.round(fs * 0.5)}px;`,
        `  background: color-mix(in srgb, ${vars.color} 14%, transparent);`,
        `  color: ${vars.color};`,
        `  font-size: ${fs}px;`,
        `  font-weight: 600;`,
        `  padding: ${Math.round(fs * 0.5)}px ${Math.round(fs * 1.05)}px;`,
        `  transition: transform ${d} ease, background ${d} ease, box-shadow ${d} ease;`,
        `}`,
        `${s("ca-icon-slide")} .ca-icon-slide__icon {`,
        `  display: inline-block;`,
        `  transition: transform ${d} ease;`,
        `}`,
        `${s("ca-icon-slide")}:hover,`,
        `${s("ca-icon-slide")}:focus-visible {`,
        `  transform: translateY(-${Math.max(2, Math.round(fs * 0.12))}px);`,
        `  background: color-mix(in srgb, ${vars.color} 22%, transparent);`,
        `  box-shadow: 0 ${Math.round(fs * 0.45)}px ${Math.round(fs * 0.75)}px color-mix(in srgb, ${vars.color} 24%, transparent);`,
        `}`,
        `${s("ca-icon-slide")}:hover .ca-icon-slide__icon,`,
        `${s("ca-icon-slide")}:focus-visible .ca-icon-slide__icon {`,
        `  transform: translateX(${Math.max(4, Math.round(fs * 0.25))}px);`,
        `}`,
      ].join("\n");
    },
  },
];

const textAnimations: AnimationDefinition[] = [
  {
    slug: "gradient-shimmer",
    category: "text",
    supportedParams: ["speed", "color", "size"],
    rootClass: "ca-shimmer",
    getHtml: () =>
      `<p class="ca-scope ca-shimmer">\n  <span class="ca-shimmer__text">Shimmer headline</span>\n</p>`,
    getCss: (vars: MotionVars) => {
      const d = motionDurationSec(vars, 2.5);
      const fs = motionSizePx(vars, 28);
      const mix = `color-mix(in srgb, ${vars.color} 55%, white)`;
      return [
        `${s("ca-shimmer")} {`,
        `  margin: 0;`,
        `}`,
        `${s("ca-shimmer")} .ca-shimmer__text {`,
        `  display: inline-block;`,
        `  font-size: ${fs}px;`,
        `  font-weight: 700;`,
        `  letter-spacing: -0.02em;`,
        `  background: linear-gradient(`,
        `    110deg,`,
        `    ${vars.color} 0%,`,
        `    ${mix} 45%,`,
        `    ${vars.color} 90%`,
        `  );`,
        `  background-size: 200% auto;`,
        `  background-clip: text;`,
        `-webkit-background-clip: text;`,
        `  color: transparent;`,
        `-webkit-text-fill-color: transparent;`,
        `  animation: ca-shimmer-move ${d} linear infinite;`,
        `}`,
        `@keyframes ca-shimmer-move {`,
        `  to { background-position: 200% center; }`,
        `}`,
      ].join("\n");
    },
  },
  {
    slug: "typing-clip",
    category: "text",
    supportedParams: ["speed", "color", "size"],
    rootClass: "ca-typing",
    getHtml: () =>
      `<p class="ca-scope ca-typing">CSS typing clip</p>`,
    getCss: (vars: MotionVars) => {
      const d = motionDurationSec(vars, 2.8);
      const fs = motionSizePx(vars, 22);
      const ch = 15;
      return [
        `${s("ca-typing")} {`,
        `  margin: 0;`,
        `  font-size: ${fs}px;`,
        `  font-weight: 600;`,
        `  color: ${vars.color};`,
        `  overflow: hidden;`,
        `  white-space: nowrap;`,
        `  border-right: ${Math.max(2, Math.round(fs * 0.08))}px solid ${vars.color};`,
        `  width: 0;`,
        `  max-width: ${ch}ch;`,
        `  animation:`,
        `    ca-typing-steps ${d} steps(${ch}, end) infinite,`,
        `    ca-typing-blink 0.7s step-end infinite;`,
        `}`,
        `@keyframes ca-typing-steps {`,
        `  from { width: 0; }`,
        `  to { width: ${ch}ch; }`,
        `}`,
        `@keyframes ca-typing-blink {`,
        `  50% { border-color: transparent; }`,
        `}`,
      ].join("\n");
    },
  },
  {
    slug: "bounce-letters",
    category: "text",
    supportedParams: ["speed", "color", "size"],
    rootClass: "ca-bounce",
    getHtml: () =>
      `<p class="ca-scope ca-bounce" aria-label="Bounce">\n` +
      `  <span>B</span><span>o</span><span>u</span><span>n</span><span>c</span><span>e</span>\n` +
      `</p>`,
    getCss: (vars: MotionVars) => {
      const d = motionDurationSec(vars, 0.9);
      const fs = motionSizePx(vars, 26);
      const lift = Math.round(fs * 0.35);
      return [
        `${s("ca-bounce")} {`,
        `  margin: 0;`,
        `  display: flex;`,
        `  gap: ${Math.round(fs * 0.08)}px;`,
        `  font-weight: 700;`,
        `  color: ${vars.color};`,
        `}`,
        `${s("ca-bounce")} span {`,
        `  display: inline-block;`,
        `  font-size: ${fs}px;`,
        `  animation: ca-bounce-letter ${d} ease-in-out infinite;`,
        `}`,
        `${s("ca-bounce")} span:nth-child(1) { animation-delay: 0s; }`,
        `${s("ca-bounce")} span:nth-child(2) { animation-delay: 0.08s; }`,
        `${s("ca-bounce")} span:nth-child(3) { animation-delay: 0.16s; }`,
        `${s("ca-bounce")} span:nth-child(4) { animation-delay: 0.24s; }`,
        `${s("ca-bounce")} span:nth-child(5) { animation-delay: 0.32s; }`,
        `${s("ca-bounce")} span:nth-child(6) { animation-delay: 0.4s; }`,
        `@keyframes ca-bounce-letter {`,
        `  0%, 100% { transform: translateY(0); }`,
        `  30% { transform: translateY(-${lift}px); }`,
        `}`,
      ].join("\n");
    },
  },
  {
    slug: "wave-rise",
    category: "text",
    supportedParams: ["speed", "color", "size"],
    rootClass: "ca-wave-rise",
    getHtml: () =>
      `<p class="ca-scope ca-wave-rise" aria-label="Wave rise text">\n  <span>W</span><span>a</span><span>v</span><span>e</span><span>R</span><span>i</span><span>s</span><span>e</span>\n</p>`,
    getCss: (vars: MotionVars) => {
      const d = motionDurationSec(vars, 1.4);
      const fs = motionSizePx(vars, 27);
      const lift = Math.max(4, Math.round(fs * 0.25));
      return [
        `${s("ca-wave-rise")} {`,
        `  margin: 0;`,
        `  display: inline-flex;`,
        `  gap: ${Math.round(fs * 0.06)}px;`,
        `  color: ${vars.color};`,
        `  font-weight: 700;`,
        `}`,
        `${s("ca-wave-rise")} span {`,
        `  display: inline-block;`,
        `  font-size: ${fs}px;`,
        `  animation: ca-wave-rise-kf ${d} ease-in-out infinite;`,
        `}`,
        `${s("ca-wave-rise")} span:nth-child(1) { animation-delay: 0s; }`,
        `${s("ca-wave-rise")} span:nth-child(2) { animation-delay: 0.08s; }`,
        `${s("ca-wave-rise")} span:nth-child(3) { animation-delay: 0.16s; }`,
        `${s("ca-wave-rise")} span:nth-child(4) { animation-delay: 0.24s; }`,
        `${s("ca-wave-rise")} span:nth-child(5) { animation-delay: 0.32s; }`,
        `${s("ca-wave-rise")} span:nth-child(6) { animation-delay: 0.4s; }`,
        `${s("ca-wave-rise")} span:nth-child(7) { animation-delay: 0.48s; }`,
        `${s("ca-wave-rise")} span:nth-child(8) { animation-delay: 0.56s; }`,
        `@keyframes ca-wave-rise-kf {`,
        `  0%, 100% { transform: translateY(0); opacity: 0.75; }`,
        `  50% { transform: translateY(-${lift}px); opacity: 1; }`,
        `}`,
      ].join("\n");
    },
  },
  {
    slug: "neon-pulse",
    category: "text",
    supportedParams: ["speed", "color", "size"],
    rootClass: "ca-neon-pulse",
    getHtml: () =>
      `<p class="ca-scope ca-neon-pulse">Neon pulse headline</p>`,
    getCss: (vars: MotionVars) => {
      const d = motionDurationSec(vars, 1.8);
      const fs = motionSizePx(vars, 30);
      return [
        `${s("ca-neon-pulse")} {`,
        `  margin: 0;`,
        `  font-size: ${fs}px;`,
        `  font-weight: 700;`,
        `  letter-spacing: -0.02em;`,
        `  color: color-mix(in srgb, ${vars.color} 86%, white);`,
        `  text-shadow:`,
        `    0 0 ${Math.round(fs * 0.2)}px color-mix(in srgb, ${vars.color} 46%, transparent),`,
        `    0 0 ${Math.round(fs * 0.65)}px color-mix(in srgb, ${vars.color} 26%, transparent);`,
        `  animation: ca-neon-pulse-kf ${d} ease-in-out infinite;`,
        `}`,
        `@keyframes ca-neon-pulse-kf {`,
        `  0%, 100% {`,
        `    text-shadow:`,
        `      0 0 ${Math.round(fs * 0.18)}px color-mix(in srgb, ${vars.color} 42%, transparent),`,
        `      0 0 ${Math.round(fs * 0.58)}px color-mix(in srgb, ${vars.color} 24%, transparent);`,
        `  }`,
        `  50% {`,
        `    text-shadow:`,
        `      0 0 ${Math.round(fs * 0.28)}px color-mix(in srgb, ${vars.color} 62%, transparent),`,
        `      0 0 ${Math.round(fs * 0.95)}px color-mix(in srgb, ${vars.color} 45%, transparent);`,
        `  }`,
        `}`,
      ].join("\n");
    },
  },
];

const cards: AnimationDefinition[] = [
  {
    slug: "glass-panel",
    category: "cards",
    supportedParams: ["speed", "color", "size"],
    rootClass: "ca-glass-panel",
    getHtml: () =>
      `<article class="ca-scope ca-glass-panel">\n  <h3>Design update</h3>\n  <p>Elegant UI card with smooth hover sheen.</p>\n</article>`,
    getCss: (vars: MotionVars) => {
      const fs = motionSizePx(vars, 16);
      const padY = Math.round(fs * 1.2);
      const padX = Math.round(fs * 1.35);
      const radius = Math.round(fs * 0.9);
      const d = motionDurationSec(vars, 0.45);
      const w = motionSizePx(vars, 320);
      return [
        `${s("ca-glass-panel")} {`,
        `  position: relative;`,
        `  overflow: hidden;`,
        `  width: min(${w}px, 92vw);`,
        `  padding: ${padY}px ${padX}px;`,
        `  border-radius: ${radius}px;`,
        `  border: 1px solid color-mix(in srgb, ${vars.color} 42%, transparent);`,
        `  background: linear-gradient(`,
        `    145deg,`,
        `    color-mix(in srgb, ${vars.color} 16%, white) 0%,`,
        `    color-mix(in srgb, ${vars.color} 8%, transparent) 65%`,
        `  );`,
        `  backdrop-filter: blur(8px);`,
        `  box-shadow: 0 8px 30px color-mix(in srgb, ${vars.color} 18%, transparent);`,
        `  transition: transform ${d} ease, box-shadow ${d} ease, border-color ${d} ease;`,
        `}`,
        `${s("ca-glass-panel")} h3 {`,
        `  margin: 0 0 ${Math.round(fs * 0.45)}px;`,
        `  font-size: ${Math.round(fs * 1.25)}px;`,
        `  line-height: 1.2;`,
        `  color: color-mix(in srgb, ${vars.color} 80%, white);`,
        `}`,
        `${s("ca-glass-panel")} p {`,
        `  margin: 0;`,
        `  color: color-mix(in srgb, ${vars.color} 58%, white);`,
        `  font-size: ${Math.round(fs * 0.96)}px;`,
        `  line-height: 1.5;`,
        `}`,
        `${s("ca-glass-panel")}::before {`,
        `  content: "";`,
        `  position: absolute;`,
        `  inset: -120% 28% 45% -38%;`,
        `  background: linear-gradient(`,
        `    120deg,`,
        `    transparent 30%,`,
        `    color-mix(in srgb, ${vars.color} 48%, white) 50%,`,
        `    transparent 70%`,
        `  );`,
        `  opacity: 0.26;`,
        `  transform: translateX(-28%) rotate(10deg);`,
        `  transition: transform ${motionDurationSec(vars, 0.9)} ease;`,
        `  pointer-events: none;`,
        `}`,
        `${s("ca-glass-panel")}:hover,`,
        `${s("ca-glass-panel")}:focus-within {`,
        `  transform: translateY(-${Math.max(5, Math.round(fs * 0.26))}px);`,
        `  border-color: color-mix(in srgb, ${vars.color} 72%, transparent);`,
        `  box-shadow: 0 ${Math.round(fs * 0.95)}px ${Math.round(fs * 2)}px color-mix(in srgb, ${vars.color} 32%, transparent);`,
        `}`,
        `${s("ca-glass-panel")}:hover::before,`,
        `${s("ca-glass-panel")}:focus-within::before {`,
        `  transform: translateX(35%) rotate(10deg);`,
        `}`,
      ].join("\n");
    },
  },
  {
    slug: "gradient-border",
    category: "cards",
    supportedParams: ["speed", "color", "size"],
    rootClass: "ca-gradient-border",
    getHtml: () =>
      `<article class="ca-scope ca-gradient-border">\n  <h3>Pro features</h3>\n  <p>Animated border highlight for premium content cards.</p>\n</article>`,
    getCss: (vars: MotionVars) => {
      const fs = motionSizePx(vars, 16);
      const padY = Math.round(fs * 1.2);
      const padX = Math.round(fs * 1.3);
      const radius = Math.round(fs * 0.9);
      const ring = Math.max(2, Math.round(fs * 0.16));
      const d = motionDurationSec(vars, 3.2);
      return [
        `${s("ca-gradient-border")} {`,
        `  position: relative;`,
        `  overflow: hidden;`,
        `  width: min(${motionSizePx(vars, 320)}px, 92vw);`,
        `  padding: ${padY}px ${padX}px;`,
        `  border-radius: ${radius}px;`,
        `  background: color-mix(in srgb, ${vars.color} 10%, #0b1020);`,
        `  box-shadow: 0 10px 24px color-mix(in srgb, ${vars.color} 22%, transparent);`,
        `  transition: transform ${motionDurationSec(vars, 0.35)} ease, box-shadow ${motionDurationSec(vars, 0.35)} ease;`,
        `}`,
        `${s("ca-gradient-border")}::before {`,
        `  content: "";`,
        `  position: absolute;`,
        `  inset: 0;`,
        `  border-radius: inherit;`,
        `  padding: ${ring}px;`,
        `  background: conic-gradient(`,
        `    from 0deg,`,
        `    ${vars.color},`,
        `    color-mix(in srgb, ${vars.color} 45%, #a855f7),`,
        `    color-mix(in srgb, ${vars.color} 65%, #22d3ee),`,
        `    ${vars.color}`,
        `  );`,
        `  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);`,
        `  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);`,
        `  mask-composite: exclude;`,
        `  -webkit-mask-composite: xor;`,
        `  animation: ca-gradient-border-spin ${d} linear infinite;`,
        `  pointer-events: none;`,
        `}`,
        `${s("ca-gradient-border")} h3 {`,
        `  margin: 0 0 ${Math.round(fs * 0.45)}px;`,
        `  font-size: ${Math.round(fs * 1.25)}px;`,
        `  line-height: 1.2;`,
        `  color: color-mix(in srgb, ${vars.color} 85%, white);`,
        `}`,
        `${s("ca-gradient-border")} p {`,
        `  margin: 0;`,
        `  color: color-mix(in srgb, ${vars.color} 54%, white);`,
        `  font-size: ${Math.round(fs * 0.95)}px;`,
        `  line-height: 1.5;`,
        `}`,
        `${s("ca-gradient-border")}:hover,`,
        `${s("ca-gradient-border")}:focus-within {`,
        `  transform: translateY(-${Math.max(4, Math.round(fs * 0.22))}px);`,
        `  box-shadow: 0 ${Math.round(fs * 1.05)}px ${Math.round(fs * 2.2)}px color-mix(in srgb, ${vars.color} 36%, transparent);`,
        `}`,
        `@keyframes ca-gradient-border-spin {`,
        `  to { transform: rotate(360deg); }`,
        `}`,
      ].join("\n");
    },
  },
  {
    slug: "tilt-glow",
    category: "cards",
    supportedParams: ["speed", "color", "size"],
    rootClass: "ca-tilt-glow",
    getHtml: () =>
      `<article class="ca-scope ca-tilt-glow">\n  <h3>Weekly insights</h3>\n  <p>Soft tilt and glow make key updates feel interactive and premium.</p>\n</article>`,
    getCss: (vars: MotionVars) => {
      const fs = motionSizePx(vars, 16);
      const padY = Math.round(fs * 1.2);
      const padX = Math.round(fs * 1.35);
      const d = motionDurationSec(vars, 0.36);
      return [
        `${s("ca-tilt-glow")} {`,
        `  position: relative;`,
        `  overflow: hidden;`,
        `  width: min(${motionSizePx(vars, 320)}px, 92vw);`,
        `  padding: ${padY}px ${padX}px;`,
        `  border-radius: ${Math.round(fs * 0.9)}px;`,
        `  border: 1px solid color-mix(in srgb, ${vars.color} 38%, transparent);`,
        `  background: linear-gradient(`,
        `    165deg,`,
        `    color-mix(in srgb, ${vars.color} 14%, #ffffff) 0%,`,
        `    color-mix(in srgb, ${vars.color} 8%, transparent) 70%`,
        `  );`,
        `  box-shadow: 0 10px 24px color-mix(in srgb, ${vars.color} 16%, transparent);`,
        `  transition: transform ${d} ease, box-shadow ${d} ease, border-color ${d} ease;`,
        `  transform-origin: center bottom;`,
        `}`,
        `${s("ca-tilt-glow")}::after {`,
        `  content: "";`,
        `  position: absolute;`,
        `  width: ${Math.round(fs * 8)}px;`,
        `  height: ${Math.round(fs * 8)}px;`,
        `  right: -${Math.round(fs * 3.5)}px;`,
        `  top: -${Math.round(fs * 3)}px;`,
        `  border-radius: 50%;`,
        `  background: radial-gradient(circle, color-mix(in srgb, ${vars.color} 45%, white), transparent 70%);`,
        `  opacity: 0.55;`,
        `  transition: transform ${motionDurationSec(vars, 0.55)} ease, opacity ${d} ease;`,
        `  pointer-events: none;`,
        `}`,
        `${s("ca-tilt-glow")} h3 {`,
        `  margin: 0 0 ${Math.round(fs * 0.45)}px;`,
        `  font-size: ${Math.round(fs * 1.22)}px;`,
        `  color: color-mix(in srgb, ${vars.color} 82%, white);`,
        `}`,
        `${s("ca-tilt-glow")} p {`,
        `  margin: 0;`,
        `  font-size: ${Math.round(fs * 0.95)}px;`,
        `  line-height: 1.5;`,
        `  color: color-mix(in srgb, ${vars.color} 56%, white);`,
        `}`,
        `${s("ca-tilt-glow")}:hover,`,
        `${s("ca-tilt-glow")}:focus-within {`,
        `  transform: perspective(600px) rotateX(4deg) translateY(-${Math.max(4, Math.round(fs * 0.22))}px);`,
        `  border-color: color-mix(in srgb, ${vars.color} 70%, transparent);`,
        `  box-shadow: 0 ${Math.round(fs * 1.05)}px ${Math.round(fs * 2)}px color-mix(in srgb, ${vars.color} 32%, transparent);`,
        `}`,
        `${s("ca-tilt-glow")}:hover::after,`,
        `${s("ca-tilt-glow")}:focus-within::after {`,
        `  transform: translate(-${Math.round(fs * 1.6)}px, ${Math.round(fs * 1.5)}px) scale(1.08);`,
        `  opacity: 0.8;`,
        `}`,
      ].join("\n");
    },
  },
  {
    slug: "accent-strip",
    category: "cards",
    supportedParams: ["speed", "color", "size"],
    rootClass: "ca-accent-strip",
    getHtml: () =>
      `<article class="ca-scope ca-accent-strip">\n  <h3>New launch checklist</h3>\n  <p>Animated top accent line gives dashboard cards a clean active state.</p>\n</article>`,
    getCss: (vars: MotionVars) => {
      const fs = motionSizePx(vars, 16);
      const d = motionDurationSec(vars, 0.32);
      return [
        `${s("ca-accent-strip")} {`,
        `  position: relative;`,
        `  overflow: hidden;`,
        `  width: min(${motionSizePx(vars, 320)}px, 92vw);`,
        `  padding: ${Math.round(fs * 1.2)}px ${Math.round(fs * 1.32)}px;`,
        `  border-radius: ${Math.round(fs * 0.88)}px;`,
        `  border: 1px solid color-mix(in srgb, ${vars.color} 28%, transparent);`,
        `  background: color-mix(in srgb, ${vars.color} 8%, #0b1020);`,
        `  transition: transform ${d} ease, border-color ${d} ease, box-shadow ${d} ease;`,
        `}`,
        `${s("ca-accent-strip")}::before {`,
        `  content: "";`,
        `  position: absolute;`,
        `  top: 0;`,
        `  left: -36%;`,
        `  width: 36%;`,
        `  height: ${Math.max(3, Math.round(fs * 0.16))}px;`,
        `  border-radius: 99px;`,
        `  background: linear-gradient(90deg, transparent, ${vars.color}, transparent);`,
        `  transition: left ${motionDurationSec(vars, 0.5)} ease;`,
        `}`,
        `${s("ca-accent-strip")} h3 {`,
        `  margin: 0 0 ${Math.round(fs * 0.42)}px;`,
        `  font-size: ${Math.round(fs * 1.2)}px;`,
        `  color: color-mix(in srgb, ${vars.color} 84%, white);`,
        `}`,
        `${s("ca-accent-strip")} p {`,
        `  margin: 0;`,
        `  font-size: ${Math.round(fs * 0.95)}px;`,
        `  line-height: 1.45;`,
        `  color: color-mix(in srgb, ${vars.color} 56%, white);`,
        `}`,
        `${s("ca-accent-strip")}:hover,`,
        `${s("ca-accent-strip")}:focus-within {`,
        `  transform: translateY(-${Math.max(3, Math.round(fs * 0.18))}px);`,
        `  border-color: color-mix(in srgb, ${vars.color} 58%, transparent);`,
        `  box-shadow: 0 ${Math.round(fs * 0.95)}px ${Math.round(fs * 1.8)}px color-mix(in srgb, ${vars.color} 26%, transparent);`,
        `}`,
        `${s("ca-accent-strip")}:hover::before,`,
        `${s("ca-accent-strip")}:focus-within::before {`,
        `  left: 100%;`,
        `}`,
      ].join("\n");
    },
  },
];

const inputs: AnimationDefinition[] = [
  {
    slug: "float-label",
    category: "inputs",
    supportedParams: ["speed", "color", "size"],
    rootClass: "ca-float-label",
    getHtml: () =>
      `<label class="ca-scope ca-float-label">\n  <input type="text" placeholder=" " />\n  <span>Email address</span>\n</label>`,
    getCss: (vars: MotionVars) => {
      const fs = motionSizePx(vars, 16);
      const h = motionSizePx(vars, 56);
      const px = Math.round(fs * 0.95);
      const d = motionDurationSec(vars, 0.24);
      return [
        `${s("ca-float-label")} {`,
        `  position: relative;`,
        `  display: inline-flex;`,
        `  width: min(${motionSizePx(vars, 320)}px, 92vw);`,
        `  height: ${h}px;`,
        `}`,
        `${s("ca-float-label")} input {`,
        `  width: 100%;`,
        `  height: 100%;`,
        `  border: 1px solid color-mix(in srgb, ${vars.color} 45%, transparent);`,
        `  border-radius: ${Math.round(fs * 0.55)}px;`,
        `  background: color-mix(in srgb, ${vars.color} 8%, transparent);`,
        `  color: color-mix(in srgb, ${vars.color} 92%, white);`,
        `  font-size: ${fs}px;`,
        `  padding: ${Math.round(fs * 1.1)}px ${px}px ${Math.round(fs * 0.45)}px;`,
        `  outline: none;`,
        `  transition: border-color ${d} ease, box-shadow ${d} ease, background ${d} ease;`,
        `}`,
        `${s("ca-float-label")} span {`,
        `  position: absolute;`,
        `  left: ${px}px;`,
        `  top: 50%;`,
        `  transform: translateY(-50%);`,
        `  color: color-mix(in srgb, ${vars.color} 62%, white);`,
        `  font-size: ${fs}px;`,
        `  pointer-events: none;`,
        `  transition: transform ${d} ease, top ${d} ease, font-size ${d} ease, color ${d} ease;`,
        `}`,
        `${s("ca-float-label")} input:focus,`,
        `${s("ca-float-label")} input:not(:placeholder-shown) {`,
        `  border-color: color-mix(in srgb, ${vars.color} 82%, transparent);`,
        `  background: color-mix(in srgb, ${vars.color} 12%, transparent);`,
        `  box-shadow: 0 0 0 3px color-mix(in srgb, ${vars.color} 24%, transparent);`,
        `}`,
        `${s("ca-float-label")} input:focus + span,`,
        `${s("ca-float-label")} input:not(:placeholder-shown) + span {`,
        `  top: ${Math.round(fs * 0.58)}px;`,
        `  transform: translateY(0);`,
        `  font-size: ${Math.round(fs * 0.74)}px;`,
        `  color: color-mix(in srgb, ${vars.color} 90%, white);`,
        `}`,
      ].join("\n");
    },
  },
  {
    slug: "focus-expand",
    category: "inputs",
    supportedParams: ["speed", "color", "size"],
    rootClass: "ca-focus-expand",
    getHtml: () =>
      `<label class="ca-scope ca-focus-expand">\n  <span>Search</span>\n  <input type="text" placeholder="Type keywords..." />\n</label>`,
    getCss: (vars: MotionVars) => {
      const fs = motionSizePx(vars, 16);
      const d = motionDurationSec(vars, 0.32);
      return [
        `${s("ca-focus-expand")} {`,
        `  position: relative;`,
        `  display: inline-flex;`,
        `  flex-direction: column;`,
        `  gap: ${Math.max(6, Math.round(fs * 0.32))}px;`,
        `  width: min(${motionSizePx(vars, 320)}px, 92vw);`,
        `}`,
        `${s("ca-focus-expand")} span {`,
        `  font-size: ${Math.round(fs * 0.86)}px;`,
        `  color: color-mix(in srgb, ${vars.color} 70%, white);`,
        `  font-weight: 500;`,
        `}`,
        `${s("ca-focus-expand")} input {`,
        `  border: none;`,
        `  border-bottom: 1px solid color-mix(in srgb, ${vars.color} 42%, transparent);`,
        `  background: transparent;`,
        `  color: color-mix(in srgb, ${vars.color} 92%, white);`,
        `  font-size: ${fs}px;`,
        `  padding: ${Math.round(fs * 0.32)}px 0 ${Math.round(fs * 0.5)}px;`,
        `  outline: none;`,
        `}`,
        `${s("ca-focus-expand")}::after {`,
        `  content: "";`,
        `  position: absolute;`,
        `  left: 50%;`,
        `  bottom: 0;`,
        `  width: 0;`,
        `  height: ${Math.max(2, Math.round(fs * 0.1))}px;`,
        `  background: linear-gradient(`,
        `    90deg,`,
        `    color-mix(in srgb, ${vars.color} 75%, #22d3ee),`,
        `    ${vars.color}`,
        `  );`,
        `  border-radius: 99px;`,
        `  transform: translateX(-50%);`,
        `  transition: width ${d} ease;`,
        `}`,
        `${s("ca-focus-expand")}:focus-within::after {`,
        `  width: 100%;`,
        `}`,
      ].join("\n");
    },
  },
  {
    slug: "glow-focus-ring",
    category: "inputs",
    supportedParams: ["speed", "color", "size"],
    rootClass: "ca-glow-focus-ring",
    getHtml: () =>
      `<label class="ca-scope ca-glow-focus-ring">\n  <span>Username</span>\n  <input type="text" placeholder="jakelee" />\n</label>`,
    getCss: (vars: MotionVars) => {
      const fs = motionSizePx(vars, 16);
      const d = motionDurationSec(vars, 0.24);
      const h = motionSizePx(vars, 54);
      return [
        `${s("ca-glow-focus-ring")} {`,
        `  display: inline-flex;`,
        `  flex-direction: column;`,
        `  gap: ${Math.max(6, Math.round(fs * 0.34))}px;`,
        `  width: min(${motionSizePx(vars, 320)}px, 92vw);`,
        `}`,
        `${s("ca-glow-focus-ring")} span {`,
        `  font-size: ${Math.round(fs * 0.84)}px;`,
        `  font-weight: 500;`,
        `  color: color-mix(in srgb, ${vars.color} 68%, white);`,
        `}`,
        `${s("ca-glow-focus-ring")} input {`,
        `  height: ${h}px;`,
        `  border: 1px solid color-mix(in srgb, ${vars.color} 38%, transparent);`,
        `  border-radius: ${Math.round(fs * 0.55)}px;`,
        `  background: color-mix(in srgb, ${vars.color} 8%, transparent);`,
        `  color: color-mix(in srgb, ${vars.color} 90%, white);`,
        `  font-size: ${fs}px;`,
        `  padding: 0 ${Math.round(fs * 0.9)}px;`,
        `  outline: none;`,
        `  transition: border-color ${d} ease, box-shadow ${d} ease, background ${d} ease;`,
        `}`,
        `${s("ca-glow-focus-ring")} input:focus {`,
        `  border-color: color-mix(in srgb, ${vars.color} 82%, transparent);`,
        `  background: color-mix(in srgb, ${vars.color} 14%, transparent);`,
        `  box-shadow:`,
        `    0 0 0 3px color-mix(in srgb, ${vars.color} 24%, transparent),`,
        `    0 0 ${Math.round(fs * 0.95)}px color-mix(in srgb, ${vars.color} 32%, transparent);`,
        `}`,
      ].join("\n");
    },
  },
  {
    slug: "underline-slide",
    category: "inputs",
    supportedParams: ["speed", "color", "size"],
    rootClass: "ca-underline-slide",
    getHtml: () =>
      `<label class="ca-scope ca-underline-slide">\n  <span>Project name</span>\n  <input type="text" placeholder="Spring campaign" />\n</label>`,
    getCss: (vars: MotionVars) => {
      const fs = motionSizePx(vars, 16);
      const d = motionDurationSec(vars, 0.3);
      return [
        `${s("ca-underline-slide")} {`,
        `  position: relative;`,
        `  display: inline-flex;`,
        `  flex-direction: column;`,
        `  gap: ${Math.max(6, Math.round(fs * 0.32))}px;`,
        `  width: min(${motionSizePx(vars, 320)}px, 92vw);`,
        `}`,
        `${s("ca-underline-slide")} span {`,
        `  font-size: ${Math.round(fs * 0.84)}px;`,
        `  color: color-mix(in srgb, ${vars.color} 66%, white);`,
        `}`,
        `${s("ca-underline-slide")} input {`,
        `  border: none;`,
        `  border-bottom: 1px solid color-mix(in srgb, ${vars.color} 38%, transparent);`,
        `  background: transparent;`,
        `  color: color-mix(in srgb, ${vars.color} 90%, white);`,
        `  font-size: ${fs}px;`,
        `  padding: ${Math.round(fs * 0.35)}px 0 ${Math.round(fs * 0.55)}px;`,
        `  outline: none;`,
        `}`,
        `${s("ca-underline-slide")}::after {`,
        `  content: "";`,
        `  position: absolute;`,
        `  bottom: 0;`,
        `  left: 0;`,
        `  width: 100%;`,
        `  height: ${Math.max(2, Math.round(fs * 0.11))}px;`,
        `  border-radius: 99px;`,
        `  background: linear-gradient(`,
        `    90deg,`,
        `    color-mix(in srgb, ${vars.color} 72%, #22d3ee),`,
        `    ${vars.color}`,
        `  );`,
        `  transform: scaleX(0);`,
        `  transform-origin: left center;`,
        `  transition: transform ${d} ease;`,
        `}`,
        `${s("ca-underline-slide")}:focus-within::after {`,
        `  transform: scaleX(1);`,
        `}`,
      ].join("\n");
    },
  },
];

const revealMasks: AnimationDefinition[] = [
  {
    slug: "curtain-split",
    category: "reveal-masks",
    supportedParams: ["speed", "color", "size"],
    rootClass: "ca-curtain-split",
    getHtml: () =>
      `<div class="ca-scope ca-curtain-split">\n  <p>Design System Preview</p>\n</div>`,
    getCss: (vars: MotionVars) => {
      const fs = motionSizePx(vars, 20);
      const d = motionDurationSec(vars, 1.15);
      return [
        `${s("ca-curtain-split")} {`,
        `  position: relative;`,
        `  overflow: hidden;`,
        `  width: min(${motionSizePx(vars, 340)}px, 92vw);`,
        `  padding: ${Math.round(fs * 1.2)}px ${Math.round(fs * 1.35)}px;`,
        `  border-radius: ${Math.round(fs * 0.55)}px;`,
        `  background: color-mix(in srgb, ${vars.color} 10%, #111827);`,
        `  border: 1px solid color-mix(in srgb, ${vars.color} 35%, transparent);`,
        `}`,
        `${s("ca-curtain-split")} p {`,
        `  margin: 0;`,
        `  font-size: ${fs}px;`,
        `  font-weight: 700;`,
        `  letter-spacing: 0.01em;`,
        `  color: color-mix(in srgb, ${vars.color} 85%, white);`,
        `}`,
        `${s("ca-curtain-split")}::before,`,
        `${s("ca-curtain-split")}::after {`,
        `  content: "";`,
        `  position: absolute;`,
        `  top: 0;`,
        `  width: 52%;`,
        `  height: 100%;`,
        `  background: linear-gradient(120deg, color-mix(in srgb, ${vars.color} 72%, #0f172a), color-mix(in srgb, ${vars.color} 32%, transparent));`,
        `  animation: ca-curtain-split-kf ${d} cubic-bezier(0.2, 0.7, 0.1, 1) infinite alternate;`,
        `}`,
        `${s("ca-curtain-split")}::before { left: 0; transform-origin: left center; }`,
        `${s("ca-curtain-split")}::after { right: 0; transform-origin: right center; animation-delay: ${motionDurationSec(vars, 0.08)}; }`,
        `@keyframes ca-curtain-split-kf {`,
        `  0%, 16% { transform: translateX(0); }`,
        `  72%, 100% { transform: translateX(-96%); }`,
        `}`,
      ].join("\n");
    },
  },
  {
    slug: "spotlight-reveal",
    category: "reveal-masks",
    supportedParams: ["speed", "color", "size"],
    rootClass: "ca-spotlight-reveal",
    getHtml: () =>
      `<div class="ca-scope ca-spotlight-reveal">\n  <p>Spotlight Reveal</p>\n</div>`,
    getCss: (vars: MotionVars) => {
      const fs = motionSizePx(vars, 21);
      const d = motionDurationSec(vars, 2.2);
      return [
        `${s("ca-spotlight-reveal")} {`,
        `  position: relative;`,
        `  overflow: hidden;`,
        `  width: min(${motionSizePx(vars, 340)}px, 92vw);`,
        `  padding: ${Math.round(fs * 1.2)}px ${Math.round(fs * 1.35)}px;`,
        `  border-radius: ${Math.round(fs * 0.6)}px;`,
        `  background: color-mix(in srgb, ${vars.color} 8%, #0b1020);`,
        `  border: 1px solid color-mix(in srgb, ${vars.color} 30%, transparent);`,
        `}`,
        `${s("ca-spotlight-reveal")} p {`,
        `  margin: 0;`,
        `  font-size: ${fs}px;`,
        `  font-weight: 700;`,
        `  color: color-mix(in srgb, ${vars.color} 25%, white);`,
        `  filter: brightness(0.75);`,
        `}`,
        `${s("ca-spotlight-reveal")}::after {`,
        `  content: "";`,
        `  position: absolute;`,
        `  inset: -40% auto auto -24%;`,
        `  width: ${Math.round(fs * 6)}px;`,
        `  height: ${Math.round(fs * 6)}px;`,
        `  border-radius: 50%;`,
        `  background: radial-gradient(circle, color-mix(in srgb, ${vars.color} 75%, white), transparent 65%);`,
        `  mix-blend-mode: screen;`,
        `  animation: ca-spotlight-reveal-kf ${d} ease-in-out infinite;`,
        `}`,
        `${s("ca-spotlight-reveal")}::before {`,
        `  content: "";`,
        `  position: absolute;`,
        `  inset: 0;`,
        `  background: radial-gradient(circle at var(--x, 20%) 40%, transparent 0 15%, color-mix(in srgb, black 68%, transparent) 45%);`,
        `  animation: ca-spotlight-mask-kf ${d} ease-in-out infinite;`,
        `}`,
        `@keyframes ca-spotlight-reveal-kf {`,
        `  0%, 100% { transform: translate(0, 12%); }`,
        `  50% { transform: translate(330%, 35%); }`,
        `}`,
        `@keyframes ca-spotlight-mask-kf {`,
        `  0%, 100% { --x: 18%; }`,
        `  50% { --x: 78%; }`,
        `}`,
      ].join("\n");
    },
  },
  {
    slug: "diagonal-wipe",
    category: "reveal-masks",
    supportedParams: ["speed", "color", "size"],
    rootClass: "ca-diagonal-wipe",
    getHtml: () =>
      `<div class="ca-scope ca-diagonal-wipe">\n  <p>Quarterly Report</p>\n</div>`,
    getCss: (vars: MotionVars) => {
      const fs = motionSizePx(vars, 20);
      const d = motionDurationSec(vars, 1.35);
      return [
        `${s("ca-diagonal-wipe")} {`,
        `  position: relative;`,
        `  overflow: hidden;`,
        `  width: min(${motionSizePx(vars, 340)}px, 92vw);`,
        `  padding: ${Math.round(fs * 1.15)}px ${Math.round(fs * 1.35)}px;`,
        `  border-radius: ${Math.round(fs * 0.55)}px;`,
        `  border: 1px solid color-mix(in srgb, ${vars.color} 34%, transparent);`,
        `  background: color-mix(in srgb, ${vars.color} 10%, #0f172a);`,
        `}`,
        `${s("ca-diagonal-wipe")} p { margin: 0; font-size: ${fs}px; font-weight: 700; color: color-mix(in srgb, ${vars.color} 86%, white); }`,
        `${s("ca-diagonal-wipe")}::after {`,
        `  content: "";`,
        `  position: absolute;`,
        `  inset: -80% -20%;`,
        `  transform: rotate(-16deg) translateX(-96%);`,
        `  background: linear-gradient(90deg, transparent 20%, color-mix(in srgb, ${vars.color} 62%, #0ea5e9), transparent 80%);`,
        `  animation: ca-diagonal-wipe-kf ${d} ease-in-out infinite;`,
        `}`,
        `@keyframes ca-diagonal-wipe-kf {`,
        `  0%, 22% { transform: rotate(-16deg) translateX(-96%); opacity: 0.85; }`,
        `  70%, 100% { transform: rotate(-16deg) translateX(96%); opacity: 0; }`,
        `}`,
      ].join("\n");
    },
  },
  {
    slug: "noise-fade-in",
    category: "reveal-masks",
    supportedParams: ["speed", "color", "size"],
    rootClass: "ca-noise-fade",
    getHtml: () =>
      `<div class="ca-scope ca-noise-fade">\n  <p>Noise Fade Reveal</p>\n</div>`,
    getCss: (vars: MotionVars) => {
      const fs = motionSizePx(vars, 20);
      const d = motionDurationSec(vars, 1.8);
      return [
        `${s("ca-noise-fade")} {`,
        `  position: relative;`,
        `  overflow: hidden;`,
        `  width: min(${motionSizePx(vars, 340)}px, 92vw);`,
        `  padding: ${Math.round(fs * 1.2)}px ${Math.round(fs * 1.35)}px;`,
        `  border-radius: ${Math.round(fs * 0.55)}px;`,
        `  border: 1px solid color-mix(in srgb, ${vars.color} 30%, transparent);`,
        `  background: color-mix(in srgb, ${vars.color} 10%, #0b1222);`,
        `}`,
        `${s("ca-noise-fade")} p { margin: 0; font-size: ${fs}px; font-weight: 700; color: color-mix(in srgb, ${vars.color} 84%, white); }`,
        `${s("ca-noise-fade")}::before {`,
        `  content: "";`,
        `  position: absolute;`,
        `  inset: 0;`,
        `  background-image: radial-gradient(color-mix(in srgb, ${vars.color} 65%, white) 0.8px, transparent 0.8px);`,
        `  background-size: 4px 4px;`,
        `  opacity: 0.6;`,
        `  animation: ca-noise-fade-kf ${d} ease-in-out infinite alternate;`,
        `}`,
        `@keyframes ca-noise-fade-kf {`,
        `  0% { opacity: 0.62; filter: blur(0); }`,
        `  100% { opacity: 0; filter: blur(2px); }`,
        `}`,
      ].join("\n");
    },
  },
];

const ambientBackgrounds: AnimationDefinition[] = [
  {
    slug: "mesh-drift",
    category: "ambient-backgrounds",
    supportedParams: ["speed", "color", "size"],
    rootClass: "ca-mesh-drift",
    getHtml: () =>
      `<div class="ca-scope ca-mesh-drift">\n  <p>Mesh Drift Background</p>\n</div>`,
    getCss: (vars: MotionVars) => {
      const h = motionSizePx(vars, 170);
      const d = motionDurationSec(vars, 9);
      return [
        `${s("ca-mesh-drift")} {`,
        `  position: relative;`,
        `  overflow: hidden;`,
        `  width: min(${motionSizePx(vars, 360)}px, 94vw);`,
        `  height: ${h}px;`,
        `  border-radius: ${Math.round(h * 0.14)}px;`,
        `  border: 1px solid color-mix(in srgb, ${vars.color} 30%, transparent);`,
        `  background: radial-gradient(circle at 20% 20%, color-mix(in srgb, ${vars.color} 38%, #22d3ee), transparent 42%), radial-gradient(circle at 80% 70%, color-mix(in srgb, ${vars.color} 34%, #a855f7), transparent 45%), #0b1220;`,
        `  animation: ca-mesh-drift-kf ${d} ease-in-out infinite alternate;`,
        `}`,
        `${s("ca-mesh-drift")} p { position: absolute; left: 16px; bottom: 14px; margin: 0; font-size: ${Math.max(14, Math.round(h * 0.11))}px; color: color-mix(in srgb, ${vars.color} 82%, white); font-weight: 600; }`,
        `@keyframes ca-mesh-drift-kf {`,
        `  0% { background-position: 0% 0%, 0% 0%, 0 0; }`,
        `  100% { background-position: 12% 8%, -10% -12%, 0 0; }`,
        `}`,
      ].join("\n");
    },
  },
  {
    slug: "aurora-wave",
    category: "ambient-backgrounds",
    supportedParams: ["speed", "color", "size"],
    rootClass: "ca-aurora-wave",
    getHtml: () =>
      `<div class="ca-scope ca-aurora-wave">\n  <p>Aurora Wave</p>\n</div>`,
    getCss: (vars: MotionVars) => {
      const h = motionSizePx(vars, 170);
      const d = motionDurationSec(vars, 7.6);
      return [
        `${s("ca-aurora-wave")} {`,
        `  position: relative;`,
        `  overflow: hidden;`,
        `  width: min(${motionSizePx(vars, 360)}px, 94vw);`,
        `  height: ${h}px;`,
        `  border-radius: ${Math.round(h * 0.14)}px;`,
        `  border: 1px solid color-mix(in srgb, ${vars.color} 28%, transparent);`,
        `  background: #091022;`,
        `}`,
        `${s("ca-aurora-wave")}::before {`,
        `  content: "";`,
        `  position: absolute;`,
        `  inset: -20% -30%;`,
        `  background: linear-gradient(115deg, color-mix(in srgb, ${vars.color} 30%, #22d3ee), color-mix(in srgb, ${vars.color} 34%, #a855f7), color-mix(in srgb, ${vars.color} 28%, #34d399));`,
        `  filter: blur(${Math.round(h * 0.16)}px);`,
        `  opacity: 0.58;`,
        `  animation: ca-aurora-wave-kf ${d} ease-in-out infinite alternate;`,
        `}`,
        `${s("ca-aurora-wave")} p { position: absolute; left: 16px; bottom: 14px; margin: 0; font-size: ${Math.max(14, Math.round(h * 0.11))}px; color: color-mix(in srgb, ${vars.color} 84%, white); font-weight: 600; }`,
        `@keyframes ca-aurora-wave-kf {`,
        `  0% { transform: rotate(-4deg) translateX(-8%); }`,
        `  100% { transform: rotate(4deg) translateX(8%); }`,
        `}`,
      ].join("\n");
    },
  },
  {
    slug: "grain-flow",
    category: "ambient-backgrounds",
    supportedParams: ["speed", "color", "size"],
    rootClass: "ca-grain-flow",
    getHtml: () =>
      `<div class="ca-scope ca-grain-flow">\n  <p>Grain Flow</p>\n</div>`,
    getCss: (vars: MotionVars) => {
      const h = motionSizePx(vars, 170);
      const d = motionDurationSec(vars, 5.8);
      return [
        `${s("ca-grain-flow")} {`,
        `  position: relative;`,
        `  overflow: hidden;`,
        `  width: min(${motionSizePx(vars, 360)}px, 94vw);`,
        `  height: ${h}px;`,
        `  border-radius: ${Math.round(h * 0.14)}px;`,
        `  border: 1px solid color-mix(in srgb, ${vars.color} 26%, transparent);`,
        `  background: linear-gradient(150deg, color-mix(in srgb, ${vars.color} 16%, #111827), #0b1220 65%);`,
        `}`,
        `${s("ca-grain-flow")}::before {`,
        `  content: "";`,
        `  position: absolute;`,
        `  inset: -40%;`,
        `  background-image: radial-gradient(color-mix(in srgb, ${vars.color} 44%, white) 0.8px, transparent 0.8px);`,
        `  background-size: 5px 5px;`,
        `  opacity: 0.23;`,
        `  animation: ca-grain-flow-kf ${d} linear infinite;`,
        `}`,
        `${s("ca-grain-flow")} p { position: absolute; left: 16px; bottom: 14px; margin: 0; font-size: ${Math.max(14, Math.round(h * 0.11))}px; color: color-mix(in srgb, ${vars.color} 84%, white); font-weight: 600; }`,
        `@keyframes ca-grain-flow-kf {`,
        `  0% { transform: translate(0, 0); }`,
        `  100% { transform: translate(-10%, -8%); }`,
        `}`,
      ].join("\n");
    },
  },
  {
    slug: "orbital-glow",
    category: "ambient-backgrounds",
    supportedParams: ["speed", "color", "size"],
    rootClass: "ca-orbital-glow",
    getHtml: () =>
      `<div class="ca-scope ca-orbital-glow">\n  <p>Orbital Glow</p>\n</div>`,
    getCss: (vars: MotionVars) => {
      const h = motionSizePx(vars, 170);
      const d = motionDurationSec(vars, 8.4);
      return [
        `${s("ca-orbital-glow")} {`,
        `  position: relative;`,
        `  overflow: hidden;`,
        `  width: min(${motionSizePx(vars, 360)}px, 94vw);`,
        `  height: ${h}px;`,
        `  border-radius: ${Math.round(h * 0.14)}px;`,
        `  border: 1px solid color-mix(in srgb, ${vars.color} 28%, transparent);`,
        `  background: #0a1020;`,
        `}`,
        `${s("ca-orbital-glow")}::before,`,
        `${s("ca-orbital-glow")}::after {`,
        `  content: "";`,
        `  position: absolute;`,
        `  width: ${Math.round(h * 0.72)}px;`,
        `  height: ${Math.round(h * 0.72)}px;`,
        `  border-radius: 50%;`,
        `  background: radial-gradient(circle, color-mix(in srgb, ${vars.color} 56%, white), transparent 66%);`,
        `  filter: blur(${Math.round(h * 0.08)}px);`,
        `  opacity: 0.72;`,
        `}`,
        `${s("ca-orbital-glow")}::before { animation: ca-orbital-glow-a ${d} ease-in-out infinite; }`,
        `${s("ca-orbital-glow")}::after { animation: ca-orbital-glow-b ${d} ease-in-out infinite; }`,
        `${s("ca-orbital-glow")} p { position: absolute; left: 16px; bottom: 14px; margin: 0; font-size: ${Math.max(14, Math.round(h * 0.11))}px; color: color-mix(in srgb, ${vars.color} 84%, white); font-weight: 600; }`,
        `@keyframes ca-orbital-glow-a {`,
        `  0% { transform: translate(-25%, -25%); }`,
        `  50% { transform: translate(180%, 30%); }`,
        `  100% { transform: translate(20%, 130%); }`,
        `}`,
        `@keyframes ca-orbital-glow-b {`,
        `  0% { transform: translate(170%, 110%); }`,
        `  50% { transform: translate(-10%, 20%); }`,
        `  100% { transform: translate(120%, -25%); }`,
        `}`,
      ].join("\n");
    },
  },
];

const scrollCues: AnimationDefinition[] = [
  {
    slug: "mouse-scroll-loop",
    category: "scroll-cues",
    supportedParams: ["speed", "color", "size"],
    rootClass: "ca-mouse-scroll",
    getHtml: () =>
      `<div class="ca-scope ca-mouse-scroll">\n  <span class="ca-mouse-scroll__mouse"><span class="ca-mouse-scroll__wheel"></span></span>\n  <p>Scroll to explore</p>\n</div>`,
    getCss: (vars: MotionVars) => {
      const d = motionDurationSec(vars, 1.5);
      const h = motionSizePx(vars, 50);
      const w = Math.round(h * 0.62);
      return [
        `${s("ca-mouse-scroll")} { display: inline-flex; flex-direction: column; align-items: center; gap: 10px; }`,
        `${s("ca-mouse-scroll")} .ca-mouse-scroll__mouse { width: ${w}px; height: ${h}px; border-radius: 999px; border: 2px solid color-mix(in srgb, ${vars.color} 72%, transparent); display: grid; place-items: start center; padding-top: ${Math.round(h * 0.16)}px; }`,
        `${s("ca-mouse-scroll")} .ca-mouse-scroll__wheel { width: ${Math.max(4, Math.round(w * 0.18))}px; height: ${Math.max(8, Math.round(h * 0.24))}px; border-radius: 99px; background: ${vars.color}; animation: ca-mouse-scroll-kf ${d} ease-in-out infinite; }`,
        `${s("ca-mouse-scroll")} p { margin: 0; font-size: ${Math.max(12, Math.round(h * 0.28))}px; color: color-mix(in srgb, ${vars.color} 80%, white); }`,
        `@keyframes ca-mouse-scroll-kf {`,
        `  0% { transform: translateY(0); opacity: 0.95; }`,
        `  70% { transform: translateY(${Math.round(h * 0.36)}px); opacity: 0; }`,
        `  100% { transform: translateY(0); opacity: 0; }`,
        `}`,
      ].join("\n");
    },
  },
  {
    slug: "section-progress-rail",
    category: "scroll-cues",
    supportedParams: ["speed", "color", "size"],
    rootClass: "ca-progress-rail",
    getHtml: () =>
      `<div class="ca-scope ca-progress-rail">\n  <span></span><span></span><span></span><span></span>\n</div>`,
    getCss: (vars: MotionVars) => {
      const d = motionDurationSec(vars, 1.6);
      const dot = motionSizePx(vars, 12);
      return [
        `${s("ca-progress-rail")} { display: inline-flex; flex-direction: column; gap: ${Math.max(6, Math.round(dot * 0.4))}px; }`,
        `${s("ca-progress-rail")} span { width: ${dot}px; height: ${dot}px; border-radius: 50%; background: color-mix(in srgb, ${vars.color} 26%, transparent); animation: ca-progress-rail-kf ${d} ease-in-out infinite; }`,
        `${s("ca-progress-rail")} span:nth-child(2) { animation-delay: 0.14s; }`,
        `${s("ca-progress-rail")} span:nth-child(3) { animation-delay: 0.28s; }`,
        `${s("ca-progress-rail")} span:nth-child(4) { animation-delay: 0.42s; }`,
        `@keyframes ca-progress-rail-kf {`,
        `  0%, 100% { transform: scale(0.88); background: color-mix(in srgb, ${vars.color} 24%, transparent); }`,
        `  45% { transform: scale(1.08); background: ${vars.color}; }`,
        `}`,
      ].join("\n");
    },
  },
  {
    slug: "sticky-arrow-pulse",
    category: "scroll-cues",
    supportedParams: ["speed", "color", "size"],
    rootClass: "ca-sticky-arrow",
    getHtml: () =>
      `<div class="ca-scope ca-sticky-arrow">\n  <span>↓</span>\n</div>`,
    getCss: (vars: MotionVars) => {
      const box = motionSizePx(vars, 46);
      const d = motionDurationSec(vars, 1.25);
      return [
        `${s("ca-sticky-arrow")} { width: ${box}px; height: ${box}px; border-radius: 50%; border: 1px solid color-mix(in srgb, ${vars.color} 38%, transparent); background: color-mix(in srgb, ${vars.color} 12%, transparent); display: inline-grid; place-items: center; box-shadow: 0 0 0 0 color-mix(in srgb, ${vars.color} 0%, transparent); animation: ca-sticky-arrow-ring ${d} ease-in-out infinite; }`,
        `${s("ca-sticky-arrow")} span { color: color-mix(in srgb, ${vars.color} 88%, white); font-size: ${Math.max(18, Math.round(box * 0.45))}px; animation: ca-sticky-arrow-bob ${d} ease-in-out infinite; }`,
        `@keyframes ca-sticky-arrow-bob { 0%, 100% { transform: translateY(-1px); } 50% { transform: translateY(4px); } }`,
        `@keyframes ca-sticky-arrow-ring { 0%,100% { box-shadow: 0 0 0 0 color-mix(in srgb, ${vars.color} 0%, transparent); } 50% { box-shadow: 0 0 0 7px color-mix(in srgb, ${vars.color} 22%, transparent); } }`,
      ].join("\n");
    },
  },
  {
    slug: "peek-next-card",
    category: "scroll-cues",
    supportedParams: ["speed", "color", "size"],
    rootClass: "ca-peek-next",
    getHtml: () =>
      `<div class="ca-scope ca-peek-next">\n  <article>Current section</article>\n  <article class="ca-peek-next__next">Next section</article>\n</div>`,
    getCss: (vars: MotionVars) => {
      const d = motionDurationSec(vars, 1.9);
      const fs = motionSizePx(vars, 14);
      const w = motionSizePx(vars, 280);
      return [
        `${s("ca-peek-next")} { position: relative; width: min(${w}px, 90vw); height: ${Math.round(fs * 8)}px; }`,
        `${s("ca-peek-next")} article { position: absolute; inset: 0; margin: 0; border-radius: ${Math.round(fs * 0.7)}px; border: 1px solid color-mix(in srgb, ${vars.color} 34%, transparent); background: color-mix(in srgb, ${vars.color} 10%, #0f172a); color: color-mix(in srgb, ${vars.color} 82%, white); display: grid; place-items: center; font-size: ${fs}px; font-weight: 600; }`,
        `${s("ca-peek-next")} .ca-peek-next__next { transform: translateY(82%); opacity: 0.7; animation: ca-peek-next-kf ${d} ease-in-out infinite; }`,
        `@keyframes ca-peek-next-kf {`,
        `  0%, 100% { transform: translateY(82%); opacity: 0.72; }`,
        `  50% { transform: translateY(62%); opacity: 1; }`,
        `}`,
      ].join("\n");
    },
  },
];

export const animations: AnimationDefinition[] = [
  ...loaders,
  ...hoverButtons,
  ...textAnimations,
  ...cards,
  ...inputs,
  ...revealMasks,
  ...ambientBackgrounds,
  ...scrollCues,
];
