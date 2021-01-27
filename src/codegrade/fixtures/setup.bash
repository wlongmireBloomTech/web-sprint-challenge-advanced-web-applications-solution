#!/bin/bash
set -euo pipefail
shopt -s extglob

rm -rf "$STUDENT/src/codegrade" || true
mkdir "$STUDENT/src/codegrade"
mv "$FIXTURES/setupTests.js" "$STUDENT/src";
mv "$FIXTURES/tests.test.js" "$STUDENT/src/codegrade"
mv "$FIXTURES/{jest.config.js, package.json}" "$STUDENT"