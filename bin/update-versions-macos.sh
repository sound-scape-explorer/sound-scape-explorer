#!/bin/bash

sed -i '' -e "s/VERSION = \(.\)*/VERSION = '$NEXT_VERSION';/" front/src/version.ts
sed -i '' -e "s/VERSION = \(.\)*/VERSION = '$NEXT_VERSION';/" audio/src/version.ts
sed -i '' -e "s/VERSION = \(.\)*/VERSION = '$NEXT_VERSION';/" visualisation/src/version.ts
sed -i '' -e 's/version = \(.\)*/version = \"'"$NEXT_VERSION"'\",/' processing/pyproject.toml
