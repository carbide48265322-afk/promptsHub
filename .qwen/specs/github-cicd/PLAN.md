# PLAN: GitHub CI/CD

## 技术架构
- **CI 工具**: GitHub Actions
- **触发条件**: Push 到 main 分支
- **运行环境**: Ubuntu latest (GitHub Actions 默认)

## 文件变更清单
- [新建] `.github/workflows/ci.yml` - CI 工作流定义

## 实施步骤
1. 创建 `.github/workflows/` 目录
2. 生成 `ci.yml`，包含:
   - Node.js 版本固定（20+ LTS）
   - pnpm 安装和缓存
   - 4 个检查步骤: Lint、Type Check、Build、Test
3. 提交并推送到 GitHub 验证

## 工作流结构
```yaml
name: CI
on:
  push:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - Checkout
      - Setup Node.js
      - Setup pnpm (缓存依赖)
      - pnpm install
      - pnpm lint
      - pnpm typecheck (tsc --noEmit)
      - pnpm build
      - pnpm test
```

## 缓存策略
- pnpm store 缓存: 加速依赖安装
- node_modules 缓存: 避免重复下载

## 风险与依赖
- 依赖: 项目必须有 `package.json` 和 pnpm 配置
- 风险: 如果测试文件不存在，test 步骤会失败（需要容错处理）
