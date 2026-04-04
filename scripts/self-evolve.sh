#!/bin/bash
# Harness 自我进化脚本

echo "🧬 Harness 自我进化分析..."
echo "================================"

if git rev-parse --git-dir > /dev/null 2>&1; then
  COMMITS=$(git log --oneline -5 2>/dev/null | wc -l || echo "0")
  echo "  最近提交数: $COMMITS"
fi

mkdir -p .qwen/evolution
echo "✅ 分析完成"
