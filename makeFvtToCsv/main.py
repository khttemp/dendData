import os
import struct
import glob
import sys
import configparser

config = configparser.ConfigParser()
config.read("config.ini")

binPath = config.get("BIN_PATH", "path")

sys.path.append(config.get("PROGRAM_PATH", "path"))
from encodingClass import SJISEncodingObject

encObj = SJISEncodingObject()
gameList = [
    "LS",
    "BS",
    "CS",
    "RS",
]

def readFvt(file, game):
    f = open(file, "rb")
    byteArr = bytearray(f.read())
    f.close()

    fvtInfoList = []

    if game == "LS":
        header = "DEND_FVT"
    elif game == "BS":
        header = "D2_FVT"
    elif game == "CS":
        header = "D3_FVT"
    elif game == "RS":
        header = "D4_FVT"

    index = len(header)
    readHeader = encObj.convertString(byteArr[0:index])
    if readHeader != header:
        print("err!")
        return

    fvtNum = int(os.path.splitext(os.path.basename(file))[0])
    fvtInfoList.append(fvtNum)
    faceNum = struct.unpack("<h", byteArr[index:index+2])[0]
    fvtInfoList.append(faceNum)
    index += 2
    if game != "LS":
        faceW = struct.unpack("<h", byteArr[index:index+2])[0]
        fvtInfoList.append(faceW)
        index += 2
        faceH = struct.unpack("<h", byteArr[index:index+2])[0]
        fvtInfoList.append(faceH)
        index += 2
        faceX = struct.unpack("<h", byteArr[index:index+2])[0]
        fvtInfoList.append(faceX)
        index += 2
        faceY = struct.unpack("<h", byteArr[index:index+2])[0]
        fvtInfoList.append(faceY)
        index += 2
    effect = byteArr[index]
    fvtInfoList.append(effect)
    index += 1
    voice = struct.unpack("<h", byteArr[index:index+2])[0]
    fvtInfoList.append(voice)
    index += 2
    scriptLen = struct.unpack("<h", byteArr[index:index+2])[0]
    index += 2
    script = encObj.convertString(byteArr[index:index + scriptLen])
    fvtInfoList.append(script)

    return fvtInfoList

def makeCsv(fileList, csvFile, game):
    w = open(csvFile, "w", encoding="cp932")
    if game == "LS":
        headerInfo = ["fvtNum", "face", "effect", "voice", "script"]
    else:
        headerInfo = ["fvtNum", "face", "face_w", "face_h", "face_x", "face_y", "effect", "voice", "script"]
    w.write("{0}\n".format(",".join(headerInfo)))
    for file in fileList:
        fvtInfoList = readFvt(file, game)
        w.write("{0}\n".format(",".join(map(str, fvtInfoList))))
    w.close()

for game in gameList:
    gamePath = "{0}/{1}/fvt/".format(binPath, game)
    csvFile = "{0}.csv".format(game)
    makeCsv(glob.glob(gamePath + "*.FVT"), csvFile, game)
