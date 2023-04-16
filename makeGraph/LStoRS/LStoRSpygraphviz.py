import pygraphviz as pgv

import os
import sys
import configparser

config = configparser.ConfigParser()
config.read("config.ini")

sys.path.append(config.get("PROGRAM_PATH", "path"))
from cmdList import cmdList
from railEditor.dendDecrypt.LSdecrypt import RailDecrypt as LSRailDecrypt
from railEditor.dendDecrypt.BSdecrypt import RailDecrypt as BSRailDecrypt
from railEditor.dendDecrypt.CSdecrypt import RailDecrypt as CSRailDecrypt
from railEditor.dendDecrypt.RSdecrypt import RailDecrypt as RSRailDecrypt
from comicscript.importPy.decrypt import ComicDecrypt

binPath = config.get("BIN_PATH", "path")

def getGotoScriptList(script, comicDataList):
    gotoScriptList = []

    for comicData in comicDataList:
        cmdName = comicData[0]
        if cmdName == "GOTO_SCRIPT":
            f = round(comicData[2], 5)
            if [script[0], int(f)] not in gotoScriptList:
                gotoScriptList.append([script[0], int(f)])
    
    return gotoScriptList

def makeScript(script, game, newPdf):
    path = os.path.join(os.getcwd(), script)
    decryptFile = None
    if game == "LS":
        decryptFile = LSRailDecrypt(path, False, False)
    elif game == "BS":
        decryptFile = BSRailDecrypt(path, False, False)
    elif game == "CS":
        decryptFile = CSRailDecrypt(path, False, False)
    elif game == "RS":
        decryptFile = RSRailDecrypt(path, False, False)
    
    if not decryptFile.open():
        decryptFile.printError()
        sys.exit()
    
    scriptMap = decryptFile.comicScriptList

    numMap = [script[0] for script in scriptMap]
    pathMap = []
    idx = -1
    for script in scriptMap:
        idx += 1
        if script[2] == -1 and idx != 0:
            continue
        pathMap.append(script[0])
    
    A = pgv.AGraph(directed=True, strict=True, rankdir="LR")
    if len(numMap) > 0:
        A.add_nodes_from(numMap)
    if len(pathMap) > 0:
        A.add_path(pathMap)

    for script in scriptMap:
        del decryptFile
        path = "{0}/{1}/script/comic{2:03d}.bin".format(binPath, game, script[0])
        print(path)
        decryptFile = ComicDecrypt(path, cmdList)
        if not decryptFile.open():
            print(decryptFile.printError())
            sys.exit()
        gotoScriptList = getGotoScriptList(script, decryptFile.comicDataList)
        for gotoScript in gotoScriptList:
            A.add_edge(gotoScript[0], gotoScript[1], color="red")

    drawPath = os.path.join(os.getcwd(), newPdf)
    A.draw("{0}".format(drawPath), prog="neato")
    del A

gameList = [
    "LS",
    "BS",
    "CS",
    "RS",
]

for game in gameList:
    gamePath = "{0}/{1}/RAIL".format(binPath, game)
    for file in os.listdir(gamePath):
        fileName = os.path.splitext(os.path.basename(file))[0]
        makeScript(os.path.join("{0}/{1}/RAIL/".format(binPath, game), file), game, "{0}.pdf".format(fileName))
