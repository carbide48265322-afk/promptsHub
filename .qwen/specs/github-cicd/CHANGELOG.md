# CHANGELOG: github-cicd

## 第 1 轮：初始开发

### 新增
- `.github/workflows/ci.yml` - GitHub Actions CI 工作流
  - 触发条件：Push 到 main 分支
  - 运行环境：Ubuntu + Node.js 20
  - 步骤：Checkout → Node.js → pnpm → Lint → Type Check → Build → Test → E2E
  - 缓存：pnpm store 依赖缓存

### Diff Summary
- +1 文件
- +59 行 YAML 配置

## 第 2 轮：Review 修复

### 修复
- `.github/workflows/ci.yml` - 移除静默失败标记
  - 移除 Lint、Type Check、Test 的 `|| true`
  - 添加测试步骤条件检查（文件存在时才运行）

### Diff Summary
- 修改 4 行
- 添加 2 行条件判断
