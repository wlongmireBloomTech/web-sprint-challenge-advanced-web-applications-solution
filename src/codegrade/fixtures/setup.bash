#!/bin/bash
set -euo pipefail
shopt -s extglob

rm -rf "$STUDENT/src/codegrade" || true
mkdir "$STUDENT/src/codegrade"
mv "$FIXTURES/package.json" "$STUDENT"
mv "$FIXTURES/tests.test.js" "$STUDENT/src/codegrade"
mv "$FIXTURES/{jest.config.js, package.json}" "$STUDENT"