let allTextList;
let mdlList = [];
let railList = [];
let ambList = [];
let mdlHeaderList = ["index", "モデル名", "flg", "flg", "架線柱"];
let railHeaderList = [
    "index", "prevRailIndex", "BlockNo", 
    "pos_x", "pos_y", "pos_z", 
    "dir_x", "dir_y", "dir_z",
    "モデル", "架線柱", "per",
    "flg", "flg", "flg", "flg",
    "rail_data",
    "next_rail", "next_no", "prev_rail", "prev_no"
];
let railHeaderColorList = [
    "", "#E7B5E8", "#E7D5E8",
    "#B7D5E8", "#B7D5E8", "#B7D5E8",
    "#99F5FF", "#99F5FF", "#99F5FF",
    "#C9F58F", "#99F58F", "#C9A1AE",
    "#78F2D3", "#78F2D3", "#78F2D3", "#78F2D3",
    "",
    "#FBF585", "#FBF585", "#F593E3", "#F593E3"
];
let maxRailData = -1;

let ambHeaderList = [
    "index", "rail", "length",
    "amd_data",
    "モデル", "親index",
    "pos_x", "pos_y", "pos_z", 
    "dir_x", "dir_y", "dir_z",
    "joint_dir_x", "joint_dir_y", "joint_dir_z",
    "per", "kasenchu_per"
];
let ambHeaderColorList = [
    "", "", "",
    "",
    "#C9F58F", "",
    "#B7D5E8", "#B7D5E8", "#B7D5E8",
    "#99F5FF", "#99F5FF", "#99F5FF",
    "#99F58F", "#99F58F", "#99F58F",
    "#C9A1AE", "#F593E3"
];

window.addEventListener('load', () => {
    let file = document.getElementById("file");
    file.addEventListener("change", () => {
        const reader = new FileReader();
        let [inputFile] = document.getElementById("file").files;

        reader.addEventListener("load", () => {
            allTextList = reader.result.split("\n").map(m => m.trim());
            try {
                if (!readStageData()) {
                    file.value = "";
                }
            } catch (error) {
                let errorDiv = document.getElementById("errorDiv");
                errorDiv.innerHTML = error;
            }
        }, false);

        if (inputFile) {
            reader.readAsText(inputFile);
        }
    });
});

function findText(t) {
    let count = 0;
    for (const text of allTextList) {
        if (text.includes(t)) {
            return count;
        }
        count++;
    }
    return -1;
}
function readStageData() {
    mdlList = [];
    railList = [];
    ambList = [];
    let errorDiv = document.getElementById("errorDiv");
    errorDiv.innerHTML = "";
    let dataTableBody = document.getElementById("dataTableBody");
    dataTableBody.innerHTML = "";

    //MdlCnt
    let index = findText("MdlCnt:");
    if (index == -1) {
        errorDiv.innerHTML = "MdlCnt:を探せません";
        return false;
    }
    let mdlText = allTextList[index];
    let mdlAllCnt = Number(mdlText.split("\t")[1]);
    if (isNaN(mdlAllCnt)) {
        errorDiv.innerHTML = "MdlCntの数字が不正です";
        return false;
    }
    let mdlCnt = 0;
    index++;
    while (mdlCnt < mdlAllCnt) {
        let mdlInfoText = allTextList[index];
        if (mdlInfoText == "" || mdlInfoText.indexOf("//") == 0) {
            index++;
            continue;
        }

        let mdlInfoList = mdlInfoText.split("\t");
        if (mdlInfoList.length < 5) {
            errorDiv.innerHTML = "モデルデータの" + (mdlCnt + 1) + "行目を読み込めません";
            return false;
        }
        mdlList.push(mdlInfoList.slice(0, 5));
        mdlCnt++;
        index++;
    }

    //RailCnt
    index = findText("RailCnt:");
    if (index == -1) {
        errorDiv.innerHTML = "RailCnt:を探せません";
        return false;
    }
    let railText = allTextList[index];
    let railAllCnt = Number(railText.split("\t")[1]);
    if (isNaN(railAllCnt)) {
        errorDiv.innerHTML = "RailCntの数字が不正です";
        return false;
    }
    let railCnt = 0;
    index++;
    while (railCnt < railAllCnt) {
        let railInfoText = allTextList[index];
        if (railInfoText == "" || railInfoText.indexOf("//") == 0) {
            index++;
            continue;
        }

        let railInfoList = railInfoText.split("\t");
        if (railInfoList.length < 17) {
            errorDiv.innerHTML = "レールデータの" + (railCnt + 1) + "行目を読み込めません";
            return false;
        }
        let railDataNum = Number(railInfoList[16]);
        let readEndIndex = 17 + railDataNum * 4;
        if (railInfoList.length < readEndIndex) {
            errorDiv.innerHTML = "レールデータの" + (railCnt + 1) + "行目を読み込めません";
            return false;
        }

        if (maxRailData < railDataNum) {
            maxRailData = railDataNum;
        }

        railList.push(railInfoList.slice(0, readEndIndex));
        railCnt++;
        index++;
    }

    //AmbCnt
    index = findText("AmbCnt:");
    if (index == -1) {
        errorDiv.innerHTML = "AmbCnt:を探せません";
        return false;
    }
    let ambText = allTextList[index];
    let ambAllCnt = Number(ambText.split("\t")[1]);
    if (isNaN(ambAllCnt)) {
        errorDiv.innerHTML = "AmbCntの数字が不正です";
        return false;
    }
    let ambCnt = 0;
    index++;
    while (ambCnt < ambAllCnt) {
        if (index >= allTextList.length) {
            errorDiv.innerHTML = "テキストの終端に到達しました。設定したAmbCntが実のデータより大きいです";
            return false;
        }
        let ambInfoText = allTextList[index];
        if (ambInfoText == "" || ambInfoText.indexOf("//") == 0) {
            index++;
            continue;
        }

        let ambInfoList = ambInfoText.split("\t");
        if (ambInfoList.length < 4) {
            errorDiv.innerHTML = "AMBデータの" + (ambCnt + 1) + "行目を読み込めません";
            return false;
        }
        let ambDataNum = Number(ambInfoList[3]);
        let readEndIndex = 4 + ambDataNum * 13;
        if (ambInfoList.length < readEndIndex) {
            errorDiv.innerHTML = "AMBデータの" + (ambCnt + 1) + "行目を読み込めません";
            return false;
        }

        ambList.push(ambInfoList.slice(0, readEndIndex));
        ambCnt++;
        index++;
    }

    let selectDiv = document.getElementById("selectDiv");
    let select = selectDiv.getElementsByTagName("select")[0];
    select.disabled = false;
    select.addEventListener("change", () => {
        selectList(select.selectedIndex);
    }, false);

    select.selectedIndex = 0;
    selectList(0);
    return true;
}

function toHex(number, mode) {
    let compNum = 0;
    let zeroFill = "";
    let sliceNum = 0;
    if (mode == "char") {
        compNum = 256;
        zeroFill = "00";
        sliceNum = -2;
    }

    if (number < 0) {
        number += compNum;
    }
    return "0x" + (zeroFill + number.toString(16).toUpperCase()).slice(sliceNum);
}

function changeIndexAndName() {
    let select = selectDiv.getElementsByTagName("select")[0];
    selectList(select.selectedIndex, false);
}

function selectList(idx, flag = true) {
    if (flag) {
        let checkboxDiv = document.getElementById("checkboxDiv");
        checkboxDiv.innerHTML = "";
    }
    let dataTableBody = document.getElementById("dataTableBody");
    dataTableBody.innerHTML = "";
    if (idx == 0) {
        if (flag) {
            //checkboxDiv
            let kasenchuCheckbox = document.createElement("input");
            kasenchuCheckbox.type = "checkbox";
            kasenchuCheckbox.id = "kasenchu";
            kasenchuCheckbox.name = "kasenchu";
            kasenchuCheckbox.addEventListener("change", changeIndexAndName);
            checkboxDiv.appendChild(kasenchuCheckbox);

            let kasenchuLabel = document.createElement("label");
            kasenchuLabel.htmlFor = "kasenchu"
            kasenchuLabel.innerHTML = "架線柱index -> 架線柱名称に変える";
            checkboxDiv.appendChild(kasenchuLabel);
        }
        //dataTableBody
        let tr = document.createElement("tr");
        dataTableBody.appendChild(tr);
        for (let i = 0; i < mdlHeaderList.length; i++) {
            let th = document.createElement("th");
            tr.appendChild(th);
            th.innerHTML = mdlHeaderList[i];
        }

        mdlList.forEach((list, index) => {
            let tr = document.createElement("tr");
            dataTableBody.appendChild(tr);
            list.forEach((element, idx) => {
                let td = document.createElement("td");
                tr.appendChild(td);
                switch (idx) {
                    case 0:
                        td.innerHTML = index;
                        break;
                    case 1:
                        td.innerHTML = element;
                        break;
                    case 2:
                    case 3:
                        td.innerHTML = toHex(Number(element), "char");
                        break;
                    case 4:
                        let kasenchu = document.getElementById("kasenchu");
                        if (kasenchu.checked) {
                            if (Number(element) >= 0 && Number(element) < mdlList.length) {
                                element = mdlList[element][1]
                            }
                        }
                        td.innerHTML = element;
                        break;
                    default:
                        break;
                }
            });
        });
    } else if (idx == 1) {
        if (flag) {
            //checkboxDiv
            let mdlNoCheckbox = document.createElement("input");
            mdlNoCheckbox.type = "checkbox";
            mdlNoCheckbox.id = "mdlNo";
            mdlNoCheckbox.name = "mdlNo";
            mdlNoCheckbox.addEventListener("change", changeIndexAndName);
            checkboxDiv.appendChild(mdlNoCheckbox);

            let mdlNoLabel = document.createElement("label");
            mdlNoLabel.htmlFor = "mdlNo"
            mdlNoLabel.innerHTML = "モデルindex -> モデル名称に変える";
            checkboxDiv.appendChild(mdlNoLabel);

            let br = document.createElement("br");
            checkboxDiv.appendChild(br);

            let kasenchuCheckbox = document.createElement("input");
            kasenchuCheckbox.type = "checkbox";
            kasenchuCheckbox.id = "kasenchu";
            kasenchuCheckbox.name = "kasenchu";
            kasenchuCheckbox.addEventListener("change", changeIndexAndName);
            checkboxDiv.appendChild(kasenchuCheckbox);

            let kasenchuLabel = document.createElement("label");
            kasenchuLabel.htmlFor = "kasenchu"
            kasenchuLabel.innerHTML = "架線柱index -> 架線柱名称に変える";
            checkboxDiv.appendChild(kasenchuLabel);
        }
        //dataTableBody
        let tr = document.createElement("tr");
        dataTableBody.appendChild(tr);

        let copyRailHeaderList = JSON.parse(JSON.stringify(railHeaderList));
        let copyRailHeaderColorList = JSON.parse(JSON.stringify(railHeaderColorList));
        if (maxRailData > 1) {
            for (let i = 0; i < maxRailData - 1; i++) {
                copyRailHeaderList = copyRailHeaderList.concat(["next_rail", "next_no", "prev_rail", "prev_no"]);
                copyRailHeaderColorList = copyRailHeaderColorList.concat(railHeaderColorList.slice(-4));
            }
        }
        for (let i = 0; i < copyRailHeaderList.length; i++) {
            let th = document.createElement("th");
            tr.appendChild(th);
            th.innerHTML = copyRailHeaderList[i];
        }

        railList.forEach((list, index) => {
            let tr = document.createElement("tr");
            dataTableBody.appendChild(tr);
            let disableRail = false;
            if (Number(list[15]) >= 128) {
                disableRail = true;
            }
            list.forEach((element, idx) => {
                let td = document.createElement("td");
                if (!disableRail) {
                    td.style.backgroundColor = copyRailHeaderColorList[idx];
                } else {
                    td.style.backgroundColor = "#E3E1DF";
                }
                tr.appendChild(td);
                switch (idx) {
                    case 0:
                        td.innerHTML = index;
                        break;
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                    case 11:
                    case 16:
                        td.innerHTML = element;
                        break;
                    case 9:
                        let mdlNo = document.getElementById("mdlNo");
                        if (mdlNo.checked) {
                            if (Number(element) >= 0 && Number(element) < mdlList.length) {
                                element = mdlList[element][1]
                            }
                        }
                        td.innerHTML = element;
                        break;
                    case 10:
                        let kasenchu = document.getElementById("kasenchu");
                        if (kasenchu.checked) {
                            if (Number(element) >= 0 && Number(element) < mdlList.length) {
                                element = mdlList[element][1]
                            }
                        }
                        td.innerHTML = element;
                        break;
                    case 12:
                    case 13:
                    case 14:
                    case 15:
                        td.innerHTML = toHex(Number(element), "char");
                        break;
                    default:
                        if (idx % 4 == 3) {
                            let prevRailIndex = Number(list[1]);
                            let prev_rail = Number(list[idx]);
                            if (prevRailIndex != prev_rail && !disableRail) {
                                td.style.backgroundColor = "#FE9A3E";
                            }
                        }
                        if (idx % 4 == 1 || idx % 4 == 3) {
                            if (Number(list[idx]) >= railList.length) {
                                td.style.backgroundColor = "red";
                            }
                        }
                        td.innerHTML = element;
                        break;
                }
            });
        });
    } else if (idx == 2) {
        if (flag) {
            //checkboxDiv
            let mdlNoCheckbox = document.createElement("input");
            mdlNoCheckbox.type = "checkbox";
            mdlNoCheckbox.id = "mdlNo";
            mdlNoCheckbox.name = "mdlNo";
            mdlNoCheckbox.addEventListener("change", changeIndexAndName);
            checkboxDiv.appendChild(mdlNoCheckbox);

            let mdlNoLabel = document.createElement("label");
            mdlNoLabel.htmlFor = "mdlNo"
            mdlNoLabel.innerHTML = "モデルindex -> モデル名称に変える";
            checkboxDiv.appendChild(mdlNoLabel);

            let br = document.createElement("br");
            checkboxDiv.appendChild(br);
        }
        //dataTableBody
        let tr = document.createElement("tr");
        dataTableBody.appendChild(tr);

        for (let i = 0; i < ambHeaderList.length; i++) {
            let th = document.createElement("th");
            tr.appendChild(th);
            th.innerHTML = ambHeaderList[i];
        }
        ambList.forEach((list, index) => {
            let tr = document.createElement("tr");
            dataTableBody.appendChild(tr);
            list.forEach((element, idx) => {
                if (idx > 4 && idx % 13 == 4) {
                    tr = document.createElement("tr");
                    dataTableBody.appendChild(tr);
                    for (let i = 0; i < 4; i++) {
                        let td = document.createElement("td");
                        tr.appendChild(td);
                    }
                }
                let td = document.createElement("td");
                td.style.backgroundColor = ambHeaderColorList[(idx - 4) % 13 + 4];
                tr.appendChild(td);
                switch (idx) {
                    case 0:
                        td.innerHTML = index;
                        break;
                    default:
                        if (idx % 13 == 4) {
                            let mdlNo = document.getElementById("mdlNo");
                            if (mdlNo.checked) {
                                if (Number(element) >= 0 && Number(element) < mdlList.length) {
                                    element = mdlList[element][1]
                                }
                            }
                        }
                        td.innerHTML = element;
                        break;
                }
            });
        });
    } else {
        return;
    }
}