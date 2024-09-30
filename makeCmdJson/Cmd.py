import os
import sys
import configparser

config = configparser.ConfigParser()
config.read("config.ini")

sys.path.append(config.get("PROGRAM_PATH", "path"))

from program.cmdList import cmdList
from program.railEditor.dendDecrypt.LSdecrypt import RailDecrypt as LSRailDecrypt
from program.railEditor.dendDecrypt.BSdecrypt import RailDecrypt as BSRailDecrypt
from program.railEditor.dendDecrypt.CSdecrypt import RailDecrypt as CSRailDecrypt
from program.railEditor.dendDecrypt.RSdecrypt import RailDecrypt as RSRailDecrypt
from program.comicscript.importPy.decrypt import ComicDecrypt
from program.mdlBin.importPy.decrypt import MdlBinDecrypt

binPath = config.get("BIN_PATH", "path")

def callCmd(game, cmdJson):
    decryptFile = None

    railPath = "{0}/{1}/RAIL".format(binPath, game)
    for file in os.listdir(railPath):
        if "RAIL" not in file:
            continue
        print("Reading... " + file)
        base, ext = os.path.splitext(file)
        if ext.lower() != ".bin":
            continue
        if game == "LS":
            decryptFile = LSRailDecrypt(os.path.join(railPath, file))
        elif game == "BS":
            decryptFile = BSRailDecrypt(os.path.join(railPath, file))
        elif game == "CS":
            decryptFile = CSRailDecrypt(os.path.join(railPath, file))
        elif game == "RS":
            decryptFile = RSRailDecrypt(os.path.join(railPath, file))
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

    comicPath = "{0}/{1}/script".format(binPath, game)
    for file in os.listdir(comicPath):
        decryptFile = ComicDecrypt(os.path.join(comicPath, file), cmdList)
        if not decryptFile.open():
            print(decryptFile.printError())
            sys.exit()

        print("Reading Comic... " + file)
        for comicData in decryptFile.comicDataList:
            d = cmdJson[comicData[0]]
            if "{0}_comic".format(game) not in d:
                d["{0}_comic".format(game)] = []
            if file not in d["{0}_comic".format(game)]:
                d["{0}_comic".format(game)].append(file)

    mdlBinPath = "{0}/{1}/bin".format(binPath, game)
    for file in os.listdir(mdlBinPath):
        del decryptFile
        decryptFile = MdlBinDecrypt(os.path.join(mdlBinPath, file), cmdList)
        if not decryptFile.open():
            print(decryptFile.printError())
            sys.exit()

        print("Reading Bin... " + file)
        for scriptDataInfoList in decryptFile.scriptDataAllInfoList:
            for scriptDataInfo in scriptDataInfoList:
                if len(scriptDataInfo) > 1:
                    for scriptData in scriptDataInfo[1:]:
                        comicNum = scriptData[1]
                        comicData = cmdList[comicNum]
                        d = cmdJson[comicData]
                        if "{0}_bin".format(game) not in d:
                            d["{0}_bin".format(game)] = []
                        if file not in d["{0}_bin".format(game)]:
                            d["{0}_bin".format(game)].append(file)
    
    return cmdJson
