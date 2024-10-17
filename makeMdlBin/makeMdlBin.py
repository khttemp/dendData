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
    "LS",
    "BS",
    "CS",
    "RS"
]

findFileList = []

for folder in folderList:
    path = "{1}/{0}/bin/*.bin".format(folder, binRootPath)
    fileList = glob.glob(path)
    for file in fileList:
        filename = os.path.basename(file)

        decryptFile = MdlBinDecrypt(file, cmdList)
        if decryptFile.open():
            textName = "../comicscript/mdlBin/{1}/{0}.txt".format(os.path.splitext(filename)[0], folder)
            print(os.path.abspath(textName))
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
