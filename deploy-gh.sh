#!/usr/bin/env bash

&& git checkout gh-pages-lesson6 \
&& git merge lesson6 --no-edit \
&& npm run build \
&& mv dist/* ./ \
&& git add . \
&& git commit -m "updated github pages" \
&& git push origin gh-pages-lesson6 \
