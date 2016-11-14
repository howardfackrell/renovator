#! /bin/bash
./target/universal/stage/bin/renovator -Dhttp.port=$PORT -Dplay.evolutions.db.default.autoApply=true
