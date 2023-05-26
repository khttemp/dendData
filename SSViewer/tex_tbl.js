let allTextList;
let texTblFileList = [
    "body_color.txt",
    "mat_tbl.txt",
    "tex_tbl.txt"
];
let matTblHeader = [
    "name",
    "ShaderType",
    "LuxBlendMode",
    "LuxCullingMode",
    "tex",
    "emi_tex",
    "norm_tex",
    "AlphaCut",
    "Smooth",
    "Norm",
    "Color_r",
    "Color_g",
    "Color_b",
    "Color_a",
    "EmiColor_r",
    "EmiColor_g",
    "EmiColor_b",
    "SpeColor_r",
    "SpeColor_g",
    "SpeColor_b"
];
let shaderTypeList = [
    "Lux",
    "Standard",
    "UnlitTex",
    "InLight",
    "StencilTransparent",
    "TrainWndDist_withBlue",
    "TrainInStencil",
    "Toon"
];
let luxBlendModeList = [
    "Opaque",
    "Cutout",
    "Fade",
    "Transparent",
    "OpaqueCutout",
    "OpaqueFade",
    "OpaqueTransparent",
    "Opaque2010",
    "OpaqueStencil",
    "FadeOver",
    "OpaqueOverColor"
];
let luxCullingModeList = [
    "Off",
    "Front",
    "Back"
];
let texTblHeader = [
    "tex名称",
    "FilterMode",
    "TextureWrapMode",
    "参照denファイル",
];
let filterModeList = [
    "Point",
	"Bilinear",
	"Trilinear"
];
let textureWrapModeList = [
    "Repeat",
    "Clamp",
    "Mirror",
    "MirrorOnce"
];

function uploadFile(inputElement) {
    document.getElementById("bodyColorTableDiv").innerHTML = "";
    document.getElementById("matTblTableDiv").innerHTML = "";
    document.getElementById("texTblTableDiv").innerHTML = "";
    // ファイルリストを取得
    let fileList = inputElement.files;
    // ファイルの数を取得
    let fileCount = fileList.length;
    // 選択されたファイルの数だけ処理する
    for (let i = 0; i < fileCount; i++) {
        // ファイルを取得
        let file = fileList[i];
        let name = file.name;

        if (texTblFileList.indexOf(name) == -1) {
            document.getElementById("errorDiv").innerHTML = `txt_tblファイルではありません(${name})`;
            return;
        }

        let allTextList = "";
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            try {
                allTextList = reader.result.split("\n").map(m => m.trim());
                if (name == "body_color.txt") {
                    readBodyColor(allTextList);
                } else if (name == "mat_tbl.txt") {
                    readMatTbl(allTextList);
                } else if (name == "tex_tbl.txt") {
                    readTexTbl(allTextList);
                }
                document.getElementById("focusLink").style.display = "inline";
            } catch (error) {
                let errorDiv = document.getElementById("errorDiv");
                errorDiv.innerHTML = error;
                return;
            }
        }, false);

        reader.readAsText(file);
    }
}

function findText(t, allTextList) {
    let count = 0;
    for (const text of allTextList) {
        if (text.includes(t)) {
            return count;
        }
        count++;
    }
    return -1;
}

function readBodyColor(allTextList) {
    let tableDiv = document.getElementById("bodyColorTableDiv");

    let flag = true;
    let table = document.createElement("table");
    table.border = "1";
    tableDiv.appendChild(table);
    let matNameCnt = 0;
    let colorCnt = 0;
    let cnt = 0;
    let cCnt = 0;
    allTextList.forEach((textList) => {
        if (textList != "") {
            if (flag) {
                flag = false;
                cnt = 0;
                cCnt = 0;
                let headTr = document.createElement("tr");
                table.appendChild(headTr);
                let dataTr = document.createElement("tr");
                table.appendChild(dataTr);
                let textLineList = textList.split("\t");
                for (let i = 0; i < textLineList.length; i++) {
                    if (i <= 2) {
                        let headTh = document.createElement("th");
                        headTr.appendChild(headTh);
                        if (i == 0) {
                            headTh.innerHTML = "車両名";
                        } else if (i == 1) {
                            headTh.innerHTML = "Mat名数";
                            matNameCnt = Number(textLineList[i]);
                        } else if (i == 2) {
                            headTh.innerHTML = "カラー組の数<br>[tex, emi_tex]";
                            headTh.style.minWidth = "130px";
                            colorCnt = Number(textLineList[i]);
                        }
                    } else {
                        let headTh = document.createElement("th");
                        headTr.appendChild(headTh);
                        if (i % 2 == 1) {
                            headTh.innerHTML = `tex(${Math.ceil((cCnt + 1)/2)})`;
                        } else {
                            headTh.innerHTML = `emi_tex(${Math.floor((cCnt + 1)/2)})`;
                        }
                        cCnt += 1;
                    }
                    let dataTd = document.createElement("td");
                    dataTr.appendChild(dataTd);
                    dataTd.innerHTML = textLineList[i];
                    dataTd.style.backgroundColor = "#CCCCCC";
                }
                if (cCnt < colorCnt) {
                    let diff = colorCnt - cCnt;
                    for (let i = 0; i < diff; i++) {
                        let headTh = document.createElement("th");
                        headTr.appendChild(headTh);
                        if (cCnt % 2 == 0) {
                            headTh.innerHTML = `tex(${Math.ceil((cCnt + 1)/2)})`;
                        } else {
                            headTh.innerHTML = `emi_tex(${Math.floor((cCnt + 1)/2)})`;
                        }
                        let dataTd = document.createElement("td");
                        dataTr.appendChild(dataTd);
                        dataTd.style.backgroundColor = "#CCCCCC";
                        cCnt += 1;
                    }
                }
            } else {
                let dataTr = document.createElement("tr");
                table.appendChild(dataTr);
                let textLineList = textList.split("\t");
                for (let i = 0; i < 2; i++) {
                    let dataTd = document.createElement("td");
                    dataTr.appendChild(dataTd);
                    if (i == 1) {
                        dataTd.innerHTML = `No.${cnt + 1}`;
                        dataTd.style.backgroundColor = "#EEEE00";
                    }
                }
                for (let i = 0; i < colorCnt + 1; i++) {
                    let dataTd = document.createElement("td");
                    dataTr.appendChild(dataTd);
                    if (i >= textLineList.length) {
                        let msg = "テキスチャーの数が設定したカラー組の数より少ないです"
                        document.getElementById("errorDiv").innerHTML = msg;
                        throw new Error(msg);
                    }
                    dataTd.innerHTML = textLineList[i];
                }
                cnt++;
                if (cnt >= matNameCnt) {
                    flag = true;
                }
            }
        }
    });
}

function readMatTbl(allTextList) {
    let tableDiv = document.getElementById("matTblTableDiv");
    let cnt = 0;
    let index = findText("Count:", allTextList);
    cnt = Number(allTextList[index].split("\t")[1]);
    let cntDiv = document.createElement("div");
    tableDiv.appendChild(cntDiv);
    cntDiv.innerHTML = `Mat数：${cnt}`;
    
    let table = document.createElement("table");
    table.border = "1";
    tableDiv.appendChild(table);

    index += 1
    let headTr = document.createElement("tr");
    table.appendChild(headTr);
    for (let i = 0; i < matTblHeader.length; i++) {
        let headTh = document.createElement("th");
        headTr.appendChild(headTh);
        headTh.innerHTML = matTblHeader[i];
    }

    for (let i = 0; i < cnt; i++) {
        if (index + i >= allTextList.length) {
            let msg = "mat_tblのリストが、設定数より少ないです";
            throw new Error(msg);
        }
        let dataTr = document.createElement("tr");
        table.appendChild(dataTr);
        let textLineList = allTextList[index + i].split("\t");
        for (let j = 0; j < matTblHeader.length; j++) {
            let dataTd = document.createElement("td");
            dataTr.appendChild(dataTd);
            if (j >= textLineList.length) {
                let msg = "mat_tblの要素が少ないです";
                throw new Error(msg);
            }
            if (j == 1) {
                if (0 <= Number(textLineList[j]) && Number(textLineList[j]) < shaderTypeList.length) {
                    dataTd.innerHTML = shaderTypeList[textLineList[j]];
                } else {
                    dataTd.innerHTML = textLineList[j];
                }
            } else if (j == 2) {
                if (0 <= Number(textLineList[j]) && Number(textLineList[j]) < luxBlendModeList.length) {
                    dataTd.innerHTML = luxBlendModeList[textLineList[j]];
                } else {
                    dataTd.innerHTML = textLineList[j];
                }
            } else if (j == 3) {
                if (0 <= Number(textLineList[j]) && Number(textLineList[j]) < luxCullingModeList.length) {
                    dataTd.innerHTML = luxCullingModeList[textLineList[j]];
                } else {
                    dataTd.innerHTML = textLineList[j];
                }
            } else {
                dataTd.innerHTML = textLineList[j];
            }   
        }
    }
}

function readTexTbl(allTextList) {
    let tableDiv = document.getElementById("texTblTableDiv");
    let cnt = 0;
    let index = findText("Count:", allTextList);
    cnt = Number(allTextList[index].split("\t")[1]);
    let cntDiv = document.createElement("div");
    tableDiv.appendChild(cntDiv);
    cntDiv.innerHTML = `Tex数：${cnt}`;
    
    let table = document.createElement("table");
    table.border = "1";
    tableDiv.appendChild(table);

    index += 1
    let headTr = document.createElement("tr");
    table.appendChild(headTr);
    for (let i = 0; i < texTblHeader.length; i++) {
        let headTh = document.createElement("th");
        headTr.appendChild(headTh);
        headTh.innerHTML = texTblHeader[i];
    }

    for (let i = 0; i < cnt; i++) {
        if (index + i >= allTextList.length) {
            let msg = "tex_tblのリストが、設定数より少ないです";
            throw new Error(msg);
        }
        let dataTr = document.createElement("tr");
        table.appendChild(dataTr);
        let textLineList = allTextList[index + i].split("\t");
        for (let j = 0; j < texTblHeader.length; j++) {
            let dataTd = document.createElement("td");
            dataTr.appendChild(dataTd);
            if (j >= textLineList.length) {
                let msg = "tex_tblの要素が少ないです";
                throw new Error(msg);
            }
            if (j == 1) {
                if (0 <= Number(textLineList[j]) && Number(textLineList[j]) < filterModeList.length) {
                    dataTd.innerHTML = filterModeList[textLineList[j]];
                } else {
                    dataTd.innerHTML = textLineList[j];
                }
            } else if (j == 2) {
                if (0 <= Number(textLineList[j]) && Number(textLineList[j]) < textureWrapModeList.length) {
                    dataTd.innerHTML = textureWrapModeList[textLineList[j]];
                } else {
                    dataTd.innerHTML = textLineList[j];
                }
            } else {
                dataTd.innerHTML = textLineList[j];
            }   
        }
    }
}

function scrollView(id) {
    document.getElementById(id).scrollIntoView();
}