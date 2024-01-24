import os
import sys
import configparser
import glob
import codecs

config = configparser.ConfigParser()
config.read("config.ini")

sys.path.append(config.get("PROGRAM_PATH", "path"))

binRootPath = config.get("BIN_ROOT_PATH", "path")

from cmdList import cmdList
from mdlBin.importPy.decrypt import MdlBinDecrypt

folderList = [
    "PATCH_4TH_7",
    "PATCH_4TH_6",
    "PATCH_4TH_5",
    "PATCH_D1",
    "PATCH_4TH_4"
    "PATCH_2014GW",
    "PATCH_4TH_3",
    "PATCH_4TH_2",
    "PATCH_4TH_1",
    "PATCH_4TH_0",
    "DEND_RS_DATA",
    "CSTORS007",
    "CSTORS006",
    "CSTORS005",
    "CSTORS004",
    "CSTORS003",
    "CSTORS002",
    "CSTORS001",
    "CSTORS000",
    "CSTORS_DATA"
]

findFileList = []

for folder in folderList:
    path = "{1}/{0}/*.bin".format(folder, binRootPath)
    fileList = glob.glob(path)
    for file in fileList:
        filename = os.path.basename(file)
        if filename not in findFileList:
            findFileList.append(filename)
            decryptFile = MdlBinDecrypt(file, cmdList)
            if decryptFile.open():
                print(file)
                textName = "{0}.txt".format(os.path.splitext(filename)[0])
                w = codecs.open(textName, "w", "utf-8", "strict")

                imgSizeList = decryptFile.imgSizeList
                imgList = decryptFile.imgList
                w.write("imgList")
                if len(imgSizeList) > 0:
                    w.write("\t")
                    w.write("\t".join(str(imgList[n[0]]["imgName"]) for n in imgSizeList))
                w.write("\n")
                
                smfList = decryptFile.smfList
                w.write("smfList")
                if len(smfList) > 0:
                    w.write("\t")
                    w.write("\t".join(str(n) for n in smfList))
                w.write("\n")
                
                wavList = decryptFile.wavList
                w.write("wavList")
                if len(wavList) > 0:
                    w.write("\t")
                    w.write("\t".join(str(n[0]) for n in wavList))
                w.write("\n")

                num = 0
                sectionNum = 0
                for scriptDataInfoList in decryptFile.scriptDataAllInfoList:
                    listNum = 0
                    for scriptDataInfo in scriptDataInfoList:
                        w.write("-\t---#{0}, {1}#---\t{2}\n".format(num, listNum, ",".join(str(n) for n in scriptDataInfo[0])))
                        for scriptData in scriptDataInfo[1:]:
                            w.write("{0}\t{1}\t".format(scriptData[0], cmdList[scriptData[1]]))
                            paramCnt = scriptData[2]
                            paramList = []
                            for i in range(paramCnt):
                                paramList.append(scriptData[4 + i])
                            w.write("\t".join(str(n) for n in paramList))
                            w.write("\n")
                        listNum += 1
                    num += 1
                w.close()