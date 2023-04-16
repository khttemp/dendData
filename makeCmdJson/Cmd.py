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
from mdlBin.importPy.decrypt import MdlBinDecrypt

binPath = config.get("BIN_PATH", "path")

def callCmd(game, cmdJson):
    decryptFile = None

    railPath = "{0}/{1}/RAIL".format(binPath, game)
    for file in os.listdir(railPath):
        if "RAIL" not in file:
            continue
        base, ext = os.path.splitext(file)
        if ext.lower() != ".bin":
            continue
        if game == "LS":
            decryptFile = LSRailDecrypt(os.path.join(railPath, file), False, False)
        elif game == "BS":
            decryptFile = BSRailDecrypt(os.path.join(railPath, file), False, False)
        elif game == "CS":
            decryptFile = CSRailDecrypt(os.path.join(railPath, file), False, False)
        elif game == "RS":
            decryptFile = RSRailDecrypt(os.path.join(railPath, file), False, False)
        if not decryptFile.open():
            print(decryptFile.printError())
            sys.exit()
        scriptMap = decryptFile.comicScriptList
        
        for script in scriptMap:
            path = "{0}/{1}/script/COMIC{2:03d}.BIN".format(binPath, game, script[0])
            comicFile = ComicDecrypt(path, cmdList)
            if not comicFile.open():
                print(comicFile.printError())
                sys.exit()

            for comicData in comicFile.comicDataList:
                d = cmdJson[comicData[0]]
                if "{0}_comic".format(game) not in d:
                    d["{0}_comic".format(game)] = []
                cmdbin = "COMIC{0:03d}.BIN".format(script[0])
                if cmdbin not in d["{0}_comic".format(game)]:
                    d["{0}_comic".format(game)].append(cmdbin)

    if game == "LS":
        path = "{0}/{1}/script/OP.BIN".format(binPath, game)
        decryptFile = ComicDecrypt(path, cmdList)
        if not decryptFile.open():
            print(decryptFile.printError())
            sys.exit()

        for comicData in decryptFile.comicDataList:
            d = cmdJson[comicData[0]]
            if "LS_comic" not in d:
                d["LS_comic"] = []
            cmdbin = "OP.BIN".format(script[0])
            if cmdbin not in d["LS_comic"]:
                d["LS_comic"].append(cmdbin)

    mdlBinPath = "{0}/{1}/bin".format(binPath, game)
    for file in os.listdir(mdlBinPath):
        del decryptFile
        decryptFile = MdlBinDecrypt(os.path.join(mdlBinPath, file), cmdList)
        if not decryptFile.open():
            print(decryptFile.printError())
            sys.exit()

        for scriptDataInfoList in decryptFile.scriptDataAllInfoList:
            for scriptDataInfo in scriptDataInfoList:
                if len(scriptDataInfo) > 1:
                    comicNum = scriptDataInfo[1][1]
                    comicData = cmdList[comicNum]
                    d = cmdJson[comicData]
                    if "{0}_bin".format(game) not in d:
                        d["{0}_bin".format(game)] = []
                    if file not in d["{0}_bin".format(game)]:
                        d["{0}_bin".format(game)].append(file)
    
    return cmdJson