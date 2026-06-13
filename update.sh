#!/bin/sh

CUR=$(pwd)

CURRENT=$(cd "$(dirname $0)" || exit;pwd)
echo "${CURRENT}"

cd "${CURRENT}" || exit

if ! (git pull --prune); then
  cd "${CUR}" || exit
  exit 1
fi
echo ""
pwd

if ! (pnx pnpm@latest self-update && rm -rf node_modules pnpm-lock.yaml && pnpm up && pnpm audit --fix override && pnpm up && pnpm lint-fix && pnpm build); then
  cd "${CUR}" || exit
  exit 1
fi

if ! (git commit -am "Bumps node modules" && git push); then
  cd "${CUR}" || exit
  exit 1
fi

cd "${CUR}" || exit
