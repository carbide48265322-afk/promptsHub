# 技术栈规范

> 项目: PromptsHub (React 前端)
> 更新时间: 2026-04-05

## 核心技术栈

| 类别 | 技术 | 版本 | 说明 |
|------|------|------|------|
| 构建工具 | Vite | 6+ | 极速开发体验 |
| 框架 | React | 19 | 最新版本 |
| 语言 | TypeScript | 5+ | 严格模式 |
| 包管理器 | pnpm | 最新 | 快速、节省磁盘 |

## UI 与样式

| 类别 | 技术 | 说明 |
|------|------|------|
| CSS 框架 | Tailwind CSS | 原子化 CSS |
| 组件库 | shadcn/ui | 可组合组件，基于 Radix UI |
| 图标 | Lucide React | SVG 图标，Tree-shakable |
| 动画 | Framer Motion | 声明式动画库 |

## 状态与数据

| 类别 | 技术 | 说明 |
|------|------|------|
| 客户端状态 | Zustand | 轻量级状态管理 |
| 服务端状态 | TanStack Query v5 | 数据获取、缓存 |
| 表单 | React Hook Form + Zod | 高性能表单验证 |
| HTTP | Fetch / Axios | 数据请求 |

## 工具链

| 用途 | 技术 | 说明 |
|------|------|------|
| 路由 | React Router v7 | 官方推荐路由 |
| 日期 | date-fns | 轻量级日期工具 |
| 代码检查 | ESLint + Prettier | 代码规范 |
| 单元测试 | Vitest + Testing Library | 快速测试框架 |
| E2E 测试 | Playwright | 端到端测试 |

## 项目结构

```
promptsHub/
├── src/
│   ├── components/       # UI 组件
│   │   ├── ui/          # shadcn/ui 基础组件
│   │   └── prompts/     # Prompts 业务组件
│   ├── lib/             # 工具库
│   ├── hooks/           # 自定义 Hooks
│   ├── stores/          # Zustand stores
│   ├── types/           # TypeScript 类型
│   ├── routes/          # React Router 路由
│   └── config/          # 配置文件
├── public/              # 静态资源
├── scripts/             # Harness 脚本
├── docs/                # 文档
└── .qwen/               # Harness 配置
```
