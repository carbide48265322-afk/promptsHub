#!/bin/bash
# 架构合规检查脚本

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

ERRORS=0
WARNINGS=0

echo "🏗️  开始架构合规检查..."
echo "================================"

# 检查 1: 禁止使用 any
echo ""
echo "📋 检查 1: TypeScript any 检查..."
any_count=$(grep -r ": any" src/ --include="*.ts" --include="*.tsx" 2>/dev/null | wc -l || echo "0")
if [ "$any_count" -gt 0 ]; then
  echo -e "  ${RED}❌ 发现 $any_count 处使用 any 类型${NC}"
  grep -r ": any" src/ --include="*.ts" --include="*.tsx" 2>/dev/null | head -5 || true
  ERRORS=$((ERRORS + 1))
else
  echo -e "  ${GREEN}✅ 未发现 any 类型使用${NC}"
fi

# 检查 2: Hooks 不应包含 UI 渲染逻辑
echo ""
echo "📋 检查 2: Hooks 纯净性..."
if [ -d "src/hooks" ]; then
  hooks_with_jsx=$(grep -l "return.*<" src/hooks --include="*.ts" --include="*.tsx" 2>/dev/null | wc -l || echo "0")
  if [ "$hooks_with_jsx" -gt 0 ]; then
    echo -e "  ${RED}❌ Hooks 包含 JSX 渲染逻辑${NC}"
    ERRORS=$((ERRORS + 1))
  else
    echo -e "  ${GREEN}✅ Hooks 未包含 UI 渲染逻辑${NC}"
  fi
else
  echo -e "  ${GREEN}✅ 无 hooks 目录，跳过${NC}"
fi

# 检查 3: lib 不应引用 UI 组件
echo ""
echo "📋 检查 3: 数据访问层隔离..."
if [ -d "src/lib" ]; then
  lib_imports_ui=$(grep -r "from.*components" src/lib --include="*.ts" 2>/dev/null | wc -l || echo "0")
  if [ "$lib_imports_ui" -gt 0 ]; then
    echo -e "  ${RED}❌ lib/ 引用了 components/${NC}"
    ERRORS=$((ERRORS + 1))
  else
    echo -e "  ${GREEN}✅ lib/ 未引用 UI 组件${NC}"
  fi
else
  echo -e "  ${GREEN}✅ 无 lib 目录，跳过${NC}"
fi

# 总结
echo ""
echo "================================"
if [ "$ERRORS" -gt 0 ]; then
  echo -e "${RED}❌ 架构检查失败: $ERRORS 个错误${NC}"
  exit 1
else
  echo -e "${GREEN}✅ 架构检查通过${NC}"
  exit 0
fi
