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

initStartVer = 129
binPath = config.get("BIN_PATH", "path")

def search(scriptFolder, findFile):
    global initStartVer

    startVer = initStartVer
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

def makeScript(script, comicScriptFolder, newScript):
    path = os.path.join(os.getcwd(), script)
    f = codecs.open(path, "r", "utf-8", "ignore")
    lines = f.readlines()
    f.close()

    scriptCnt = 0

    newPath = os.path.join(os.getcwd(), newScript)
    w = codecs.open(newPath, "w", "utf-8", "ignore")
    print(newScript)
    readFlag = False
    for line in lines:
        line = line.strip()
        arr = line.split("\t")
        if "ComicScript" in line:
            scriptCnt = int(arr[1])
            readFlag = True
            continue
        else:
            if not readFlag:
                continue

        if len(arr) < 5:
            continue

        scriptCnt -= 1
        scriptNum = arr[1]
        scriptType = arr[2]
        waitRail = arr[3]
        w.write("comicTitle\t{0}\t{1}\t{2}\n".format(scriptNum, scriptType, waitRail))
        
        scriptPath = search(comicScriptFolder, "comic{0}.bin".format(scriptNum))
        print(scriptPath)
        decryptScript(scriptPath, w)

        if scriptCnt <= 0:
            break

    w.close()


makeScript("{0}/hx200/stagedata.txt".format(binPath), "comic_hx200", "hx200(ver129)_comic.txt")
makeScript("{0}/e233/stagedata.txt".format(binPath), "comic_e233", "e233(ver129)_comic.txt")
makeScript("{0}/tq5050/stagedata.txt".format(binPath), "comic_tq5050", "tq5050(ver129)_comic.txt")
makeScript("{0}/tq5000/stagedata.txt".format(binPath), "comic_tq5000", "tq5000(ver129)_comic.txt")
makeScript("{0}/tq300/stagedata.txt".format(binPath), "comic_tq300", "tq300(ver129)_comic.txt")
makeScript("{0}/tq8500/stagedata.txt".format(binPath), "comic_tq8500", "tq8500(ver129)_comic.txt")
makeScript("{0}/tq8500_last/stagedata.txt".format(binPath), "comic_tq8500_last", "tq8500＿last(ver129)_comic.txt")
