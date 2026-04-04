# 架构设计

> 项目: PromptsHub
> 更新时间: 2026-04-05

## 分层架构

```
┌─────────────────────────────────────────┐
│         Presentation Layer              │  ← 展示层
│    (Components + Routes)                │
├─────────────────────────────────────────┤
│         Business Logic Layer            │  ← 业务逻辑层
│    (Hooks + Stores + Validations)       │
├─────────────────────────────────────────┤
│         Data Access Layer               │  ← 数据访问层
│    (API Client + External Services)     │
└─────────────────────────────────────────┘
```

### 依赖规则

- ✅ 展示层 → 业务逻辑层 + 数据访问层
- ✅ 业务逻辑层 → 数据访问层
- ❌ 禁止反向依赖

## 目录职责

### `src/components/` - 组件层

- `ui/`: shadcn/ui 基础组件（无业务逻辑）
- `prompts/`: Prompts 业务组件
- 允许：引用 hooks、stores、types
- 禁止：直接调用 API（使用 hooks）

### `src/hooks/` - 自定义 Hooks

- 封装可复用的 React 逻辑
- 命名：`use[Feature].ts`
- 允许：引用 lib、stores、types
- 禁止：包含 UI 渲染逻辑

### `src/stores/` - 状态管理

- Zustand stores
- 仅管理客户端 UI 状态
- 服务端数据用 TanStack Query

### `src/lib/` - 工具库

- API 客户端、工具函数、Zod 验证

### `src/routes/` - 路由

- React Router 路由定义
- 按需加载组件

## 数据流

```
用户操作 → React Hook Form 验证 → Zod 校验
    ↓
API 调用 (TanStack Query)
    ↓
Zustand 更新（如需客户端状态）
    ↓
组件重新渲染
```

## 架构检查

```bash
bash scripts/lint-arch.sh
```
