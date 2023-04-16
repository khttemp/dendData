import sys
import json
import codecs

import Cmd
import SSCmd

f = codecs.open("cmd.json", "r", "utf-8", "strict")
cmdJson = json.load(f)
f.close()

cmdJson = Cmd.callCmd("LS", cmdJson)
cmdJson = Cmd.callCmd("BS", cmdJson)
cmdJson = Cmd.callCmd("CS", cmdJson)
cmdJson = Cmd.callCmd("RS", cmdJson)
cmdJson = SSCmd.callSSCmd(cmdJson)

lines = json.dumps(cmdJson, indent=4, ensure_ascii=False)
f = codecs.open("result.json", "w", "utf-8", "strict")
f.write(lines)
f.close()