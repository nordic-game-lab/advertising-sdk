#!/bin/bash
# SPDX-FileCopyrightText: Andrew Ball <andrew@aball.dev>
# SPDX-License-Identifier: MPL-2.0
set -o pipefail

echo "Installing dependencies"
npm i
echo "Linting code"
npm run lint
echo "Running builder"
npx ngl-build build web

echo "Adding license to final code"
sed -i "1i/**\n*@license MPL 2.0\n*This Code Form is subject to the terms of the Mozilla Public\n*License, v. 2.0. If a copy of the MPL was not distributed with this\n*file, You can obtain one at https://mozilla.org/MPL/2.0/.\n*/" dist/ads.min.js