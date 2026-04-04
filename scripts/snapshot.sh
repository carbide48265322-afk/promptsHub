#!/bin/bash
# 文件快照工具

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

SNAPSHOT_DIR=".snapshots"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)

COMMAND=$1
NAME=$2

case $COMMAND in
  save)
    [ -z "$NAME" ] && NAME="snapshot-$TIMESTAMP"
    SNAPSHOT_PATH="$SNAPSHOT_DIR/$NAME"
    mkdir -p "$SNAPSHOT_PATH"
    
    find src/ -type f \( -name "*.ts" -o -name "*.tsx" \) 2>/dev/null | \
      while read file; do
        md5sum "$file" >> "$SNAPSHOT_PATH/files.md5" 2>/dev/null || true
      done
    
    TOTAL_FILES=$(find src/ -type f \( -name "*.ts" -o -name "*.tsx" \) 2>/dev/null | wc -l || echo "0")
    TOTAL_LINES=$(find src/ -type f \( -name "*.ts" -o -name "*.tsx" \) -exec cat {} + 2>/dev/null | wc -l || echo "0")
    
    cat > "$SNAPSHOT_PATH/info.txt" << EOF
快照名称: $NAME
时间: $TIMESTAMP
文件数: $TOTAL_FILES
代码行数: $TOTAL_LINES
EOF
    
    echo -e "${GREEN}✅ 快照已保存: $NAME${NC}"
    ;;
    
  list)
    echo "📋 可用快照:"
    for snapshot in "$SNAPSHOT_DIR"/*/; do
      [ -f "$snapshot/info.txt" ] && cat "$snapshot/info.txt" && echo "---"
    done
    ;;
    
  diff)
    [ -z "$NAME" ] && echo "请指定快照名称" && exit 1
    echo "🔍 对比快照: $NAME"
    echo "提示: 使用 git diff 查看详细差异"
    ;;
    
  *)
    echo "用法: bash scripts/snapshot.sh <save|list|diff> [name]"
    ;;
esac
