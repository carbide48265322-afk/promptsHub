#!/bin/bash
# 可观测性组件

set -e

echo "📊 可观测性报告..."
echo "================================"

mkdir -p .agent-logs

if [ -d "src" ]; then
  TS_FILES=$(find src/ -name "*.ts" -o -name "*.tsx" 2>/dev/null | wc -l || echo "0")
  echo "  TypeScript 文件: $TS_FILES"
else
  echo "  源代码目录: 不存在"
fi

if git rev-parse --git-dir > /dev/null 2>&1; then
  COMMITS=$(git rev-list --all --count 2>/dev/null || echo "0")
  echo "  总提交数: $COMMITS"
fi

echo -e "\n✅ 报告完成"
