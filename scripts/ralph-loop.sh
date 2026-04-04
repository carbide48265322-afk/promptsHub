#!/bin/bash
# Ralph 循环脚本
# 自动迭代修复代码问题，直到质量门禁通过

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

MAX_ITERATIONS=${1:-5}
ITERATION=1

echo "🔄 Ralph 循环启动..."
echo "最大迭代次数: $MAX_ITERATIONS"
echo "================================"

while [ $ITERATION -le $MAX_ITERATIONS ]; do
  echo -e "${BLUE}━━ 迭代 #$ITERATION ━━${NC}"
  
  if bash scripts/verify.sh; then
    echo -e "${GREEN}✅ 质量门禁通过！${NC}"
    exit 0
  fi
  
  echo -e "${YELLOW}⚠️  迭代 #$ITERATION 未通过${NC}"
  ITERATION=$((ITERATION + 1))
  
  if [ $ITERATION -le $MAX_ITERATIONS ]; then
    echo "按回车继续，或 Ctrl+C 退出..."
    read -r
  fi
done

echo -e "${RED}❌ 达到最大迭代次数，请手动修复${NC}"
exit 1
