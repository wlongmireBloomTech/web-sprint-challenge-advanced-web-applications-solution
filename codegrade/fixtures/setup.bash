#!/bin/bash
set -euo pipefail
shopt -s extglob

rm -rf "$STUDENT/src/codegrade" || true
mkdir -p "$STUDENT/src/codegrade"
mv "$FIXTURES/setupTests.js" "$STUDENT/src";
mv "$FIXTURES/codegrade_mvp.test.js" "$STUDENT/src/codegrade"
mv "$FIXTURES/jest.config.js" "$STUDENT"