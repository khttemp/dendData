import os
import codecs
import struct
import sys
import traceback
import configparser

config = configparser.ConfigParser()
config.read("config.ini")

sys.path.append(config.get("PROGRAM_PATH", "path"))
from cmdList import cmdList
from railEditor.dendDecrypt.LSdecrypt import RailDecrypt as LSRailDecrypt
from railEditor.dendDecrypt.BSdecrypt import RailDecrypt as BSRailDecrypt
from railEditor.dendDecrypt.CSdecrypt import RailDecrypt as CSRailDecrypt
from railEditor.dendDecrypt.RSdecrypt import RailDecrypt as RSRailDecrypt

binPath = config.get("BIN_PATH", "path")

def decryptScript(scriptPath, w):
    try:
        try:
            f = open(scriptPath, "rb")
            line = f.read()
            f.close()
        except FileNotFoundError:
            errorMsg = "指定されたファイルが見つかりません。終了します。"
            sys.exit()

        size = len(line)
        index = 16
        header = line[0:index]
        if header != b'DEND_COMICSCRIPT':
            raise Exception
        index += 1

        # ReadComicImg
        w.write("imgList")
        imgCnt = line[index]
        index += 1
        for i in range(imgCnt):
            b = line[index]
            index += 1
            text = line[index:index+b].decode()
            w.write("\t{0}".format(text))
            index += b
        w.write("\n")

        # ReadComicSize
        b = line[index]
        index += 1
        for i in range(b):
            index += 1
            for j in range(4):
                text = line[index:index+4]
                f = struct.unpack("<f", text)[0]
                index += 4
        
        # ReadSE
        w.write("seList")
        secnt = line[index]
        index += 1
        for i in range(secnt):
            b = line[index]
            index += 1
            text = line[index:index+b].decode()
            w.write("\t{0}".format(text))
            index += b
            index += 1
        w.write("\n")

        # ReadBGM
        w.write("bgmList")
        bgmcnt = line[index]
        index += 1
        for i in range(bgmcnt):
            b = line[index]
            index += 1
            text = line[index:index+b].decode()
            w.write("\t{0}".format(text))
            index += b
            index += 1
            index += 4
            index += 4
        w.write("\n")

        # ReadComicData
        index += 1
        num = struct.unpack("<H", line[index:index+2])[0]
        index += 2

        for i in range(num):
            if index >= size:
                sys.exit()

            num2 = struct.unpack("<H", line[index:index+2])[0]
            index += 2

            if num2 < 0 or num2 >= len(cmdList)-1:
                errorMsg = "定義されてないコマンド番号です({0})。読込を終了します。".format(num2)
                w = open("error.log", "w")
                w.write(errorMsg)
                w.close()
                sys.exit()

            w.write("{0}".format(cmdList[num2]))
                
            b = line[index]
            index += 1
            if b >= 16:
                print("script Error!")
                b = 16
            
            array = []
            for j in range(b):
                f = struct.unpack("<f", line[index:index+4])[0]
                f = round(f, 5)
                array.append(f)
                w.write("\t{0}".format(f))
                index += 4
            w.write("\n")

        if index < size:
            sys.exit()
        
    except Exception:
        w = open("error.log", "w")
        w.write(traceback.format_exc())
        w.close()
        sys.exit()

def makeScript(script, game, newScript):
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

    newPath = os.path.join(os.getcwd(), newScript)
    w = codecs.open(newPath, "w", "utf-8", "ignore")
    print(newScript)
    for script in decryptFile.comicScriptList:
        scriptNum = script[0]
        scriptType = script[1]
        waitRail = script[2]
        w.write("comicTitle\t{0}\t{1}\t{2}\n".format(scriptNum, scriptType, waitRail))
        
        comicScriptFolder = "{0}/{1}/script".format(binPath, game)
        scriptPath = os.path.join(comicScriptFolder, "comic{0:03d}.bin".format(scriptNum))
        print(scriptPath)
        decryptScript(scriptPath, w)

    w.close()

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
        makeScript(os.path.join("{0}/{1}/RAIL/".format(binPath, game), file), game, "{0}_comic.txt".format(fileName))
