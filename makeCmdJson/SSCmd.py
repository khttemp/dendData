import os
import codecs
import sys
import configparser

config = configparser.ConfigParser()
config.read("config.ini")

sys.path.append(config.get("PROGRAM_PATH", "path"))

from program.cmdList import cmdList
from program.comicscript.importPy.decrypt import ComicDecrypt

initStartVer = 129

binPath = config.get("BIN_PATH", "path")

def search(scriptFolder, findNum):
    global initStartVer

    startVer = initStartVer
    findFile = "COMIC{0}.bin".format(findNum)
    while True:
        if startVer == 99:
            break
        folder = "{0}/SS/ver{1}".format(binPath, startVer)
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

fileList = [
    "{0}/SS/hx200/stagedata.txt".format(binPath),
    "{0}/SS/e233/stagedata.txt".format(binPath),
    "{0}/SS/tq5050/stagedata.txt".format(binPath),
    "{0}/SS/tq5000/stagedata.txt".format(binPath),
    "{0}/SS/tq300/stagedata.txt".format(binPath),
    "{0}/SS/tq8500/stagedata.txt".format(binPath),
    "{0}/SS/tq8500＿last/stagedata.txt".format(binPath)
]

def callSSCmd(cmdJson):
    for file in fileList:
        path = os.path.join(os.getcwd(), file)
        scriptFolder = "comic_" + file.split("/")[3].replace("＿", "_")
        scriptMap = getSSScript(path)
        
        for script in scriptMap:
            path = search(scriptFolder, script[0])
            decryptFile = ComicDecrypt(path, cmdList)
            if not decryptFile.open():
                print(decryptFile.printError())
                sys.exit()

            for comicData in decryptFile.comicDataList:
                d = cmdJson[comicData[0]]
                if "SS_comic" not in d:
                    d["SS_comic"] = []
                cmdbin = "COMIC{0}.BIN".format(script[0])
                if cmdbin not in d["SS_comic"]:
                    d["SS_comic"].append(cmdbin)
    
    for ver in range(initStartVer, 99, -1):
        commonPath = "{0}/SS/ver{1}/comic_cmn".format(binPath, ver)
        if not os.path.exists(commonPath):
            continue

        for file in os.listdir(commonPath):
            path = os.path.join(commonPath, file.upper())
            
            decryptFile = ComicDecrypt(path, cmdList)
            if not decryptFile.open():
                print(decryptFile.printError())
                sys.exit()

            for comicData in decryptFile.comicDataList:
                d = cmdJson[comicData[0]]
                if "SS_comic" not in d or file.upper() not in d["SS_comic"]:
                    if "SS_cmn" not in d:
                        d["SS_cmn"] = []
                    if file.upper() not in d["SS_cmn"]:
                        d["SS_cmn"].append(file.upper())

    return cmdJson
