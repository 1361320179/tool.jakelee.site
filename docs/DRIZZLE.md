# 数据库与 Drizzle（按需启用）

本仓库的 [package.json](../package.json) 已包含 `drizzle-orm`、`drizzle-kit` 与 `postgres`，**默认不启用**数据库。仅当某个在线小工具需要持久化（账号、使用记录、服务端存储等）时，再接入。

## 何时接入

- 需要跨会话/跨用户存储数据
- 已有 `DATABASE_URL`（如 Neon、Supabase Pooler 等）可用

## 建议步骤

1. 在仓库根目录参考主站 [jakelee.site](https://github.com) 的 `drizzle.config.ts` 与 `src/db/`，或新建：
   - `drizzle.config.ts` 指向 `DATABASE_URL`
   - `src/db/index.ts` 中创建 `drizzle()` 连接
   - `src/db/schema/*.ts` 中定义表
2. 执行 `npm run db:generate` 生成迁移，`npm run db:migrate` 在目标环境应用。
3. 在 [src/lib/env.ts](../src/lib/env.ts) 中**已有**的 `DATABASE_URL` 上添加服务端校验，勿把数据库 URL 暴露到 `NEXT_PUBLIC_*`。
4. 在 Server Action、Route Handler 或 Server Component 中通过 `import { db } from "@/db"` 使用；勿在纯客户端工具逻辑中直接连接数据库。

## 与工具模块的关系

- 单工具需要 DB 时，在该工具目录中增加 `actions.ts`（Server Actions）或 `server/*.ts`（只服务端引用 `db`），通过 Zod 在边界校验输入，避免在 `lib/tools/<slug>/` 的客户端组件里 `import` 数据库。
