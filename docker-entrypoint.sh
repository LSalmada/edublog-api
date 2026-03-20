#!/bin/sh
set -e
node ./node_modules/.bin/typeorm migration:run -d build/lib/typeorm/typeorm.js
node build/lib/typeorm/seed.js
exec node build/server.js
