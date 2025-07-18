import struct
from PIL import Image, ImageDraw, ImageFont
import sys

allHexTextList = []

f = open("KeyCodeTable.inc", encoding="cp932")
lines = f.readlines()
f.close()

for idx, line in enumerate(lines):
    if line.find("//") == 0 or "//" in line:
        continue
    arr = line.strip().split("\t")
    textIndex = int(arr[0].strip(","), 16)
    if textIndex != 0xFFFF:
        allHexTextList.append(idx)

def setName(string, length, flag=True):
    strArray = bytearray()
    if flag:
        for n in string:
            strArray.append(ord(n))
    else:
        for n in string:
            strArray.insert(0, ord(n))

    for _ in range(length - len(string)):
        strArray.append(0)
    return strArray

def readText(txtLocation):
    txtList = []
    f = open(txtLocation, "r", encoding="cp932")
    lines = f.readlines()
    f.close()
    for line in lines:
        for n in line:
            if n not in txtList:
                txtList.append(n)
    return txtList

def convertFontSheetData(lines):
    bitIndex = 0
    bitString = ""
    for line in lines:
        bitString = "{:08b}".format(line) + bitString

    y2 = bitString[bitIndex:bitIndex+11]
    bitIndex += 11

    x2 = bitString[bitIndex:bitIndex+11]
    bitIndex += 11

    y1 = bitString[bitIndex:bitIndex+11]
    bitIndex += 11
    
    x1 = bitString[bitIndex:bitIndex+11]
    bitIndex += 11

    right = bitString[bitIndex:bitIndex+6]
    bitIndex += 6

    left = bitString[bitIndex:bitIndex+6]
    bitIndex += 6

    sheetNo = bitString[bitIndex:bitIndex+8]
    bitIndex += 8
    
    fontSheetData = [
        int(sheetNo, 2),
        int(left, 2),
        int(right, 2),
        int(x1, 2),
        int(y1, 2),
        int(x2, 2),
        int(y2, 2)
    ]
    return fontSheetData

def convertStructData(fontSheetData):
    newBitString = ""
    for i in range(7):
        data = fontSheetData[6-i]
        if i in [0, 1, 2, 3]:
            newBitString += "{:011b}".format(data)
        elif i in [4, 5]:
            newBitString += "{:06b}".format(data)
        else:
            newBitString += "{:08b}".format(data)

    newBitArray = bytearray()
    idx = 64
    for i in range(8):
        newBitArray.append(int(newBitString[idx-8:idx], 2))
        idx -= 8
    return newBitArray

args = sys.argv
if len(args) != 5:
    print("createSff.py [fontSize] [sheetSize] [txtFile] [fontLocation]")
    print("使うフォントは、truetypeフォントの、等幅フォントを使うこと")
    sys.exit()

fontSize = int(args[1])
sheetSize = int(args[2])
txtLocation = args[3]
fontLocation = args[4]
fontFileName = "FONT_4TH"

w = open(fontFileName + ".SFF", "wb")
byteArr = setName("SFF", 4, False)
byteArr.extend(fontSize.to_bytes(1, "little"))
byteArr.append(0)
sheetMaxIndex = 5
byteArr.extend([0, 0])
fontMaxIndex = 6

readTextTable = readText(txtLocation)
cnt = 0
inputTextTable = []
for idx, hexText in enumerate(allHexTextList):
    if hexText <= 0xDF:
        text = struct.pack(">B", hexText).decode("cp932")
    else:
        text = struct.pack(">H", hexText).decode("cp932")
    if text in readTextTable:
        byteArr.extend(struct.pack("<h", cnt))
        inputTextTable.append(text)
        cnt += 1
    else:
        byteArr.extend(struct.pack("<h", -1))

fontMax = cnt
hFontMax = struct.pack("<h", fontMax)
byteArr[fontMaxIndex] = hFontMax[0]
byteArr[fontMaxIndex+1] = hFontMax[1]

fontSheetDataList = []
sheetNo = 0
initPosX = 2
initPosY = 1
posX = initPosX
posY = initPosY
maxPosY = 0
offsetX = 1
offsetY = 1
testCropFlag = False

font = ImageFont.truetype(fontLocation, size=fontSize)
img = Image.new("RGBA", (sheetSize, sheetSize), (0, 0, 0, 0))
draw = ImageDraw.Draw(img)
for text in inputTextTable:
    bbox = draw.multiline_textbbox([posX, posY], text, font=font)

    if bbox[2] + offsetX >= sheetSize:
        posX = initPosX
        posY = maxPosY + 3
        bbox = draw.multiline_textbbox([posX, posY], text, font=font)

    if bbox[3] + offsetY >= sheetSize:
        img.save("{0}_{1:02d}.png".format(fontFileName, sheetNo))
        sheetNo += 1
        posX = initPosX
        posY = initPosY
        maxPosY = 0
        img = Image.new("RGBA", (sheetSize, sheetSize), (0, 0, 0, 0))
        draw = ImageDraw.Draw(img)
        bbox = draw.multiline_textbbox([posX, posY], text, font=font)

    draw.text(
        (posX, posY),
        text,
        font = font,
        fill = 'white',
        stroke_width=1,
        stroke_fill='black')

    fontSheetDataList.append([
        sheetNo,
        0,
        0,
        bbox[0] - offsetX,
        posY - offsetY,
        bbox[2] + offsetX,
        bbox[3] + offsetY
    ])

    posX = (bbox[2] + 3)
    if bbox[3] > maxPosY:
        maxPosY = bbox[3]

img.save("{0}_{1:02d}.png".format(fontFileName, sheetNo))
byteArr[sheetMaxIndex] = sheetNo + 1

for i in range(sheetNo + 1):
    byteArr.extend(setName("{0}_{1:02d}".format(fontFileName, i), 32))

for idx, fontSheetData in enumerate(fontSheetDataList):
    byteArr.extend(convertStructData(fontSheetData))
    if testCropFlag:
        img = Image.open("{0}_{1:02d}.png".format(fontFileName, fontSheetData[0]))
        img_crop = img.crop((fontSheetData[3], fontSheetData[4], fontSheetData[5], fontSheetData[6]))
        img_crop.save("{0:04d}.png".format(idx))

w.write(byteArr)
w.close()
