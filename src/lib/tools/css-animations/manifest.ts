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
];

export const animations: AnimationDefinition[] = [
  ...loaders,
  ...hoverButtons,
  ...textAnimations,
  ...cards,
  ...inputs,
];
