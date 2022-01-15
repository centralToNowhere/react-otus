#!/usr/bin/env bash

git checkout gh-pages-lesson6 \
&& git merge lesson9 --no-edit \
&& rm -rf docs/* \
&& npm run check \
&& npm run build \
&& mv dist/* docs \
&& cp docs/index.html docs/404.html \
&& git add . \
&& git commit -m "updated github pages" --no-verify \
&& git push origin gh-pages-lesson6 --no-verify \
&& git checkout lesson9