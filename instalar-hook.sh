#!/bin/bash

HOOK_SRC="git-hooks/pre-commit"
HOOK_DEST=".git/hooks/pre-commit"

if [ ! -f "$HOOK_SRC" ]; then
  echo "❌ El hook personalizado no existe: $HOOK_SRC"
  exit 1
fi

cp "$HOOK_SRC" "$HOOK_DEST"
chmod +x "$HOOK_DEST"

echo "✅ Hook 'pre-commit' instalado correctamente en: $HOOK_DEST"
