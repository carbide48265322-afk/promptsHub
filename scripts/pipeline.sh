#!/bin/bash
# Pipeline 编排脚本
# Spec → Plan → Code → QA 流水线

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo "🚀 Pipeline 编排启动..."
echo "================================"

SPEC_NAME=$1
if [ -z "$SPEC_NAME" ]; then
  echo -e "${RED}❌ 用法: bash scripts/pipeline.sh <spec-name>${NC}"
  exit 1
fi

SPEC_DIR=".qwen/specs/$SPEC_NAME"

if [ ! -f "$SPEC_DIR/spec.md" ]; then
  echo -e "${RED}❌ 规格文档不存在: $SPEC_DIR/spec.md${NC}"
  exit 1
fi

echo -e "${BLUE}[1/4] 规格审查...${NC}"
echo -e "  ${GREEN}✅ 规格文档存在${NC}"

echo -e "${BLUE}[2/4] 计划审查...${NC}"
if [ -f "$SPEC_DIR/plan.md" ]; then
  echo -e "  ${GREEN}✅ 实现计划存在${NC}"
else
  echo -e "  ${RED}❌ 实现计划缺失${NC}"
  exit 1
fi

echo -e "${BLUE}[3/4] 代码生成...${NC}"
if [ -f "$SPEC_DIR/tasks.md" ]; then
  echo -e "  ${GREEN}✅ 任务清单存在${NC}"
else
  echo -e "  ${RED}❌ 任务清单缺失${NC}"
  exit 1
fi

echo -e "${BLUE}[4/4] 质量保证...${NC}"
if bash scripts/verify.sh; then
  echo -e "  ${GREEN}✅ 质量门禁通过${NC}"
else
  echo -e "  ${RED}❌ 质量门禁未通过${NC}"
  exit 1
fi

echo -e "${GREEN}✅ Pipeline 完成！${NC}"
