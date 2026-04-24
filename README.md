# tool.jakelee.site

[Jake Lee](https://jakelee.site) 主站同品牌的 **在线小工具** 子站：多工具聚合、在浏览器端优先处理数据，设计与主站共享同一套设计令牌与工程习惯，并支持 **英文 / 中文** 双语言。

## 技术栈

- **框架**：Next.js 16（App Router）、React 19、TypeScript
- **样式**：Tailwind CSS 4、shadcn（Base UI）、`tw-animate-css`（动效以 CSS 为主）
- **校验 / 环境**：Zod、[@t3-oss/env-nextjs](https://env.t3.gg/)
- **国际化**：`en` / `zh`，与主站类似的路由形态（`/[lang]/...`）与 [Proxy](https://nextjs.org/docs/messages/middleware-to-proxy) 重定向
- **可选**：Drizzle ORM、Supabase 客户端（见下方「数据库」）
- **分享图**：`@vercel/og`（`app/api/og`）

## 本地开发

```bash
npm install
npm run dev
```

浏览器访问 [http://localhost:3000](http://localhost:3000)（将按 `Accept-Language` 重定向到 `/en` 或 `/zh`）。

常用命令：

| 命令                                             | 说明                            |
| ------------------------------------------------ | ------------------------------- |
| `npm run dev`                                    | 开发服务                        |
| `npm run build`                                  | 生产构建                        |
| `npm run start`                                  | 启动生产构建产物                |
| `npm run lint`                                   | ESLint                          |
| `npm run db:generate` / `db:migrate` / `db:push` | Drizzle（仅在接入数据库后使用） |

## 环境变量

复制 [`.env.example`](./.env.example) 为 `.env.local` 并按需填写。生产环境请在托管平台（如 Vercel）中配置，**勿**将密钥提交到仓库。

- `NEXT_PUBLIC_SITE_URL`：规范站点与 SEO（`metadataBase`、sitemap 等）的 **https** 根地址
- 社交链接、数据库、Supabase 等见 `.env.example` 注释
- 数据库相关仅在某工具需要持久化时启用，详见 [docs/DRIZZLE.md](./docs/DRIZZLE.md)

## 仓库结构（摘录）

| 路径                    | 说明                                                                               |
| ----------------------- | ---------------------------------------------------------------------------------- |
| `src/app/[lang]/`       | 多语言根路由、营销首页、各工具页（`tools/[slug]`）                                 |
| `src/i18n/`             | `locales`、双语文案（`dictionaries`）、服务端 `getLocaleDictionary`                |
| `src/lib/tools/`        | 工具注册表 `registry`、分块 `panels`、各工具子目录与 Zod/交互                      |
| `src/components/shell/` | 营销区、工具壳、列表等                                                             |
| `src/proxy.ts`          | Next.js 16 的 Proxy（原 `middleware`）：无 `locale` 前缀时重定向到 `/{locale}/...` |
| `public/`               | 静态资源（如 `favicon.svg`）                                                       |

## 如何新增一个工具

1. 在 `src/lib/tools/` 下新增目录，实现 `tool-panel`（Client 与边界校验等）。
2. 在 [`src/lib/tools/panels.ts`](./src/lib/tools/panels.ts) 中增加 `import()` 项。
3. 在 [`src/components/shell/dynamic-tool-panel.tsx`](./src/components/shell/dynamic-tool-panel.tsx) 中为同一 `slug` 增加对应的 `dynamic()`（与上一步保持一一对应）。
4. 在 [`src/lib/tools/registry.ts`](./src/lib/tools/registry.ts) 的 `staticTools` 中增加 `slug` 与 `icon`。
5. 在 `src/i18n/types.ts` 与 `src/i18n/dictionaries.ts` 的 `tools` / `toolUi` 中补全 **en + zh** 文案。

新增完成后跑一次 `npm run build` 确认类型与分块无报错。

## 与主站的关系

设计、组件习惯与主站 [jakelee.site](https://jakelee.site) 对齐；子站可独立部署，通过顶栏/页脚链回主站对应语言路径（`https://jakelee.site/en`、`https://jakelee.site/zh` 等）。
