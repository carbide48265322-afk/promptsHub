#!/bin/bash
# 代码库熵管理/清理脚本

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo "🧹 代码库清理启动..."
echo "================================"

echo -e "${BLUE}[1/4] 查找待处理事项...${NC}"
TODO_COUNT=$(grep -r "TODO\|FIXME\|HACK" src/ --include="*.ts" --include="*.tsx" 2>/dev/null | wc -l || echo "0")
[ "$TODO_COUNT" -gt 0 ] && echo "  ⚠️  发现 $TODO_COUNT 个待处理事项" || echo "  ✅ 无待处理事项"

echo -e "${BLUE}[2/4] 查找大型文件（>500 行）...${NC}"
find src/ -type f \( -name "*.ts" -o -name "*.tsx" \) 2>/dev/null | xargs wc -l 2>/dev/null | sort -rn | head -5 || echo "  无源文件"

echo -e "${BLUE}[3/4] 查找空目录...${NC}"
find src/ -type d -empty 2>/dev/null | wc -l | xargs -I{} echo "  发现 {} 个空目录"

echo -e "${BLUE}[4/4] 检查未使用依赖...${NC}"
echo "  提示: 运行 pnpm deps:check 或 npx depcheck 检查"

echo -e "${GREEN}✅ 清理检查完成${NC}"
