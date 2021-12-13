#!/usr/bin/env bash

git checkout gh-pages-lesson6 \
&& git merge lesson6 --no-edit \
&& rm -rf docs/* \
&& npm run check \
&& npm run build \
&& mv dist/* docs \
&& git add . \
&& git commit -m "updated github pages" --no-verify \
&& git push origin gh-pages-lesson6 --no-verify \
&& git checkout lesson6