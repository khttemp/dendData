import sys
import json
import codecs

import Cmd
import SSCmd

f = codecs.open("cmd.json", "r", "utf-8", "strict")
cmdJson = json.load(f)
f.close()

keys = list(cmdJson.keys())

newJson = {}
for key in keys:
    newJson[key] = {
        "num": cmdJson[key]["num"],
        "description": cmdJson[key]["description"]
    }

newJson = Cmd.callCmd("LS", newJson)
newJson = Cmd.callCmd("BS", newJson)
newJson = Cmd.callCmd("CS", newJson)
newJson = Cmd.callCmd("RS", newJson)
newJson = SSCmd.callSSCmd(newJson)

lines = json.dumps(newJson, indent=4, ensure_ascii=False)
f = codecs.open("result.json", "w", "utf-8", "strict")
f.write(lines)
f.close()