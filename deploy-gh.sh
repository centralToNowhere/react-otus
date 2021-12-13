#!/usr/bin/env bash

git checkout gh-pages-lesson6 \
&& git merge lesson6 --no-edit \
&& npm run check \
&& npm run build \
&& rm -rf docs/* \
&& mv dist/* docs \
&& git add . \
&& git commit -m "updated github pages" --no-verify \
&& git push origin gh-pages-lesson6 --no-verify \
&& git checkout lesson6