import pygraphviz as pgv

import os
import codecs
import sys
import configparser

config = configparser.ConfigParser()
config.read("config.ini")

sys.path.append(config.get("PROGRAM_PATH", "path"))

from cmdList import cmdList
from comicscript.importPy.decrypt import ComicDecrypt

decryptFile = None
initStartVer = 129
binPath = config.get("BIN_PATH", "path")

def search(scriptFolder, findNum):
    global initStartVer

    startVer = initStartVer
    findFile = "COMIC{0}.bin".format(findNum)
    while True:
        if startVer == 99:
            break
        folder = "{0}/ver{1}".format(binPath, startVer)
        path = os.path.join(os.getcwd(), folder, scriptFolder, findFile)
        if os.path.exists(path):
            return path

        path2 = os.path.join(os.getcwd(), folder, "comic_cmn", findFile)
        if os.path.exists(path2):
            return path2
        
        startVer -= 1

def getSSScript(path):
    f = codecs.open(path, "r", "utf-8-sig", "strict")
    lines = f.readlines()
    f.close()

    scriptCnt = 0
    readFlag = False
    scriptMap = []

    for line in lines:
        line = line.strip()
        arr = line.split("\t")
        if "ComicScript:" in line:
            scriptCnt = int(arr[1])
            readFlag = True
            continue
        else:
            if not readFlag:
                continue

        if len(arr) < 5:
            continue
        
        scriptCnt -= 1
        scriptNum = int(arr[1])
        scriptType = int(arr[2])
        waitRail = int(arr[3])

        scriptMap.append([scriptNum, scriptType, waitRail])

        if scriptCnt <= 0:
            break
        
    return scriptMap

def getGotoScriptList(script, comicDataList):
    gotoScriptList = []

    for comicData in comicDataList:
        cmdName = comicData[0]
        if cmdName == "GOTO_SCRIPT":
            f = round(comicData[2], 5)
            if [script[0], int(f)] not in gotoScriptList:
                gotoScriptList.append([script[0], int(f)])
    
    return gotoScriptList

fileList = [
    "{0}/hx200/stagedata.txt".format(binPath),
    "{0}/e233/stagedata.txt".format(binPath),
    "{0}/tq5050/stagedata.txt".format(binPath),
    "{0}/tq5000/stagedata.txt".format(binPath),
    "{0}/tq300/stagedata.txt".format(binPath),
    "{0}/tq8500/stagedata.txt".format(binPath),
    "{0}/tq8500＿last/stagedata.txt".format(binPath)
]

for file in fileList:
    startVer = 129
    path = os.path.join(os.getcwd(), file)
    scriptFolder = "comic_" + file.split("/")[4].replace("＿", "_")
    base, ext = os.path.splitext(os.path.basename(path))
    A = pgv.AGraph(directed=True, strict=True, rankdir="LR")
    
    scriptMap = getSSScript(path)

    numMap = [script[0] for script in scriptMap]
    pathMap = []
    idx = -1
    for script in scriptMap:
        idx += 1
        if script[2] == -1 and idx != 0:
            continue
        pathMap.append(script[0])
    A.add_nodes_from(numMap)
    A.add_path(pathMap)
    
    for script in scriptMap:
        del decryptFile
        path = search(scriptFolder, str(script[0]))
        print(path)
        decryptFile = ComicDecrypt(path, cmdList)
        if not decryptFile.open():
            print(decryptFile.printError())
            sys.exit()
        gotoScriptList = getGotoScriptList(script, decryptFile.comicDataList)
        for gotoScript in gotoScriptList:
            A.add_edge(gotoScript[0], gotoScript[1], color="red")

    drawPath = os.path.join(os.getcwd(), file.split("/")[4])
    A.draw("{0}(ver129).pdf".format(drawPath), prog="neato")
    del A
