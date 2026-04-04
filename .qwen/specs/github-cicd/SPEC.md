# SPEC: GitHub CI/CD

## 用户故事
- 作为项目维护者，我希望代码推送到主分支时自动运行全部检查（Lint、Type Check、Build、测试），以便确保代码质量
- 作为开发者，我希望 CI 失败时收到通知，以便及时修复问题

## 验收标准
- [ ] 创建 `.github/workflows/ci.yml` 文件
- [ ] Push 到 main/master 分支时自动触发
- [ ] 运行 ESLint 代码检查
- [ ] 运行 TypeScript 类型检查
- [ ] 运行 Vite 构建（pnpm build）
- [ ] 运行单元测试（pnpm test）
- [ ] 运行 E2E 测试（Playwright）
- [ ] CI 失败时输出清晰的错误信息

## 边界情况
- pnpm 版本兼容性问题
- Node.js 版本不匹配
- 依赖安装失败（网络问题）
- 缓存失效导致构建变慢

## 非功能性需求
- 性能: 构建时间控制在 5 分钟内（利用缓存优化）
- 安全: 不暴露敏感信息（密钥、Token）
- 可靠性: 失败后支持重新运行
