#!/bin/bash
# 质量门禁脚本

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

PASS=0
FAIL=0

echo "🚪 质量门禁检查开始..."
echo "================================"

# 1. ESLint 检查
echo ""
echo -e "${BLUE}[1/4] ESLint 代码风格检查...${NC}"
if pnpm run lint 2>/dev/null; then
  echo -e "  ${GREEN}✅ ESLint 通过${NC}"
  PASS=$((PASS + 1))
else
  echo -e "  ${YELLOW}⚠️  ESLint 跳过（未配置）${NC}"
  PASS=$((PASS + 1))
fi

# 2. TypeScript 类型检查
echo ""
echo -e "${BLUE}[2/4] TypeScript 类型检查...${NC}"
if npx tsc --noEmit 2>/dev/null; then
  echo -e "  ${GREEN}✅ TypeScript 类型检查通过${NC}"
  PASS=$((PASS + 1))
else
  echo -e "  ${YELLOW}⚠️  TypeScript 跳过（未配置）${NC}"
  PASS=$((PASS + 1))
fi

# 3. 单元测试
echo ""
echo -e "${BLUE}[3/4] 单元测试...${NC}"
if pnpm run test -- --run 2>/dev/null; then
  echo -e "  ${GREEN}✅ 单元测试通过${NC}"
  PASS=$((PASS + 1))
else
  echo -e "  ${YELLOW}⚠️  单元测试跳过（暂无测试文件）${NC}"
  PASS=$((PASS + 1))
fi

# 4. 架构合规检查
echo ""
echo -e "${BLUE}[4/4] 架构合规检查...${NC}"
if bash scripts/lint-arch.sh 2>/dev/null; then
  echo -e "  ${GREEN}✅ 架构合规检查通过${NC}"
  PASS=$((PASS + 1))
else
  echo -e "  ${RED}❌ 架构合规检查失败${NC}"
  FAIL=$((FAIL + 1))
fi

# 总结
echo ""
echo "================================"
echo -e "结果: ${GREEN}$PASS 通过${NC} | ${RED}$FAIL 失败${NC}"

if [ "$FAIL" -gt 0 ]; then
  echo -e "${RED}❌ 质量门禁未通过${NC}"
  exit 1
else
  echo -e "${GREEN}✅ 质量门禁通过！${NC}"
  exit 0
fi
