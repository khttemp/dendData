let allTextList;
let searchTextList = [
    ["Story:", "storyTableBody", "ステージ名"],
	["Track:", "trackTableBody", "台車モデル"],
	["Dir:", "dirTableBody", "基本の向き"],
	["COMIC_DATA", "comicDataTableBody", "参照するcomicscript"],
	["COMIC_IMAGE", "comicImageTableBody", "参照する画像"],
	["COMIC_SE", "comicSETableBody", "参照するSE"],
	["RailPos:", "railPosTableBody", "デフォルトのレール位置"],
	["FreeRun:", "freeRunTableBody", "試運転のレール位置"],
	["VSPos:", "vsPosTableBody", "対戦のレール位置"],
	["FadeImage:", "fadeImageTableBody", "読み込み中の画像"],
	["StageRes:", "stageResTableBody", "路線別画像データ"],
	["SetTexInfo:", "setTexInfo", "画像設定情報"],
	["STCnt:", "stCntTableBody", "駅名情報"],
	["CPU:", "cpuTableBody", "ＣＰＵ切り替え"],
	["ComicScript:", "comicScriptTableBody", "comicscriptリスト"],
	["RainChecker:", "rainCheckerTableBody", "雨イベントリスト"],
	["DosanInfo:", "dosanInfoTableBody", "土讃線スペシャルリスト"],
	["MdlCnt:", "mdlCntTableBody", "モデルリスト"],
	["RailCnt:", "railCntTableBody", "レールデータ"],
	["RailPri:", "railPriTableBody", "優先レール設定"],
	["BtlPri:", "btlPriTableBody", "バトル用の優先レール設定"],
	["NoDriftRail:", "NoDriftRailTableBody", "ドリフト除外"],
	["AmbCnt:", "ambCntTableBody", "AMBデータ"],
];
var progressStatus = 0;

let modelList = [];

window.addEventListener('load', () => {
    initTable();

    let file = document.getElementById("file");
    file.addEventListener("change", () => {
        const reader = new FileReader();
        let [inputFile] = document.getElementById("file").files;

        reader.addEventListener("load", async () => {
            let tableDiv = document.getElementById("tableDiv");
            tableDiv.style.display = "none";
            allTextList = reader.result.split("\n").map(m => m.trim());
            try {
                if (!readStageData()) {
                    file.value = "";
                }
            } catch (error) {
                let errorDiv = document.getElementById("errorDiv");
                let stackList = error.stack.split("\n");
                let errorLine = stackList[1];
                let errorNum = errorLine.substring(errorLine.indexOf("viewer.js"), errorLine.length - 1);
                errorDiv.innerHTML = `${errorNum}：${error}`;
                let tableDiv = document.getElementById("tableDiv");
                tableDiv.style.display = "inline";
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
function initTable() {
    let tableDiv = document.getElementById("tableDiv");
    tableDiv.innerHTML = "";
    for (let i = 0; i < searchTextList.length; i++) {
        let div = document.createElement("div");
        tableDiv.appendChild(div);
        let titleDiv = document.createElement("div");
        div.appendChild(titleDiv);
        let table = document.createElement("table");
        div.appendChild(table);
        table.border = "1";
        table.id = searchTextList[i][1];
    }
    let errorDiv = document.getElementById("errorDiv");
    errorDiv.innerHTML = "";
}
function getProgressPer(start, end, count) {
    let diff = end - start;
    return diff / count;
}
async function setProgress(value) {
    let loader = document.getElementById("progress");
    loader.style.width = `${value * 100}%`;
    await sleep(1);
}
async function sleep(miliseconds) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, miliseconds)
    });
}
function readTbl(str) {
    let newArray = [];
    if (str.length > 1 && str.indexOf("//") != 0) {
        let array = str.split("\t").filter(e=>e);
        for (let i = 0; i < array.length; i++) {
            let element = array[i];
            if (element.indexOf("//") == 0) {
                continue;
            }
            newArray.push(element);
        }
    }
    return newArray;
}
async function readStageData() {
    try {
        initTable();

        for (let i = 0; i < searchTextList.length; i++) {
            await setProgress(i / searchTextList.length);
            let tableBody = document.getElementById(searchTextList[i][1]);
            let div = tableBody.parentNode.getElementsByTagName("div")[0];
            div.innerHTML = `<h3 style="margin-bottom:0px;">${searchTextList[i][2]}（${searchTextList[i][0]}）</h3>`;

            let index = findText(searchTextList[i][0]);
            if (index == -1) {
                // Track: 存在しない場合
                if (i == 1) {
                    setTrack(tableBody, 1, false);
                    continue;
                }
                // Dir: 存在しない場合
                else if (i == 2) {
                    setDir(tableBody, 1, false);
                    continue;
                }
                // BtlPri: 存在しない場合
                else if (i == 20) {
                    setBtlPri(tableBody, []);
                    continue;
                }
                // NoDriftRail: 存在しない場合
                else if (i == 21) {
                    setNoDriftRail(tableBody, []);
                    continue;
                }
                else {
                    let errorDiv = document.getElementById("errorDiv");
                    errorDiv.innerHTML = `${searchTextList[i][0]}を探せません`;
                    return false;
                }
            }
            
            // Story:
            if (i == 0) {
                let array = readTbl(allTextList[index]);
                let story = array[1];
                setStory(tableBody, story);
            }
            // Track:
            else if (i == 1) {
                let array = readTbl(allTextList[index]);
                let num = Number(array[1]);
                setTrack(tableBody, num);
            }
            // Dir:
            else if (i == 2) {
                let array = readTbl(allTextList[index]);
                let num = Number(array[1]);
                setDir(tableBody, num);
            }
            // COMIC_DATA
            else if (i == 3) {
                let array = readTbl(allTextList[index]);
                let cnt = Number(array[1]);
                let realCount = 0;
                let comicDataList = [];
                if (cnt > 0) {
                    for (let c = 0; ; c++) {
                        let dataArray = readTbl(allTextList[index + 1 + c]);
                        if (dataArray.length > 0) {
                            comicDataList.push(dataArray[0]);
                            realCount++;
                        }
                        if (realCount >= cnt) {
                            break;
                        }
                    }
                }
                countCheck("COMIC_DATA", comicDataList, cnt);
                setComicData(tableBody, "comic_bin", comicDataList);
            }
            // COMIC_IMAGE
            else if (i == 4) {
                let array = readTbl(allTextList[index]);
                let cnt = Number(array[1]);
                let realCount = 0;
                let comicDataList = [];
                if (cnt > 0) {
                    for (let c = 0; ; c++) {
                        let dataArray = readTbl(allTextList[index + 1 + c]);
                        if (dataArray.length > 0) {
                            comicDataList.push(dataArray[0]);
                            realCount++;
                        }
                        if (realCount >= cnt) {
                            break;
                        }
                    }
                }
                countCheck("COMIC_IMAGE", comicDataList, cnt);
                setComicData(tableBody, "comic_img", comicDataList);
            }
            // COMIC_SE
            else if (i == 5) {
                let array = readTbl(allTextList[index]);
                let cnt = Number(array[1]);
                let realCount = 0;
                let comicDataList = [];
                if (cnt > 0) {
                    for (let c = 0; ; c++) {
                        let dataArray = readTbl(allTextList[index + 1 + c]);
                        if (dataArray.length > 0) {
                            comicDataList.push(dataArray[0]);
                            realCount++;
                        }
                        if (realCount >= cnt) {
                            break;
                        }
                    }
                }
                countCheck("COMIC_SE", comicDataList, cnt);
                setComicData(tableBody, "comic_se", comicDataList);
            }
            // RailPos:
            else if (i == 6) {
                let array = readTbl(allTextList[index]);
                let cnt = Number(array[1]);
                let realCount = 0;
                let railDataList = [];
                if (cnt > 0) {
                    for (let c = 0; ; c++) {
                        let railArray = readTbl(allTextList[index + 1 + c]);
                        if (railArray.length > 0) {
                            railDataList.push(railArray);
                            realCount++;
                        }
                        if (realCount >= cnt) {
                            break;
                        }
                    }
                }
                countCheck("RailPos:", railDataList, cnt);
                setRailData(tableBody, "レール位置", railDataList);
            }
            // FreeRun:
            else if (i == 7) {
                let cnt = 1
                let realCount = 0;
                let railDataList = [];
                if (cnt > 0) {
                    for (let c = 0; ; c++) {
                        let railArray = readTbl(allTextList[index + 1 + c]);
                        if (railArray.length > 0) {
                            railDataList.push(railArray);
                            realCount++;
                        }
                        if (realCount >= cnt) {
                            break;
                        }
                    }
                }
                countCheck("FreeRun:", railDataList, cnt);
                setRailData(tableBody, "試運転のレール位置", railDataList);
            }
            // VSPos:
            else if (i == 8) {
                let array = readTbl(allTextList[index]);
                let cnt = Number(array[1]);
                let realCount = 0;
                let railDataList = [];
                if (cnt > 0) {
                    for (let c = 0; ; c++) {
                        let railArray = readTbl(allTextList[index + 1 + c]);
                        if (railArray.length > 0) {
                            railDataList.push(railArray);
                            realCount++;
                        }
                        if (realCount >= cnt) {
                            break;
                        }
                    }
                }
                countCheck("VSPos:", railDataList, cnt);
                setRailData(tableBody, "対戦のレール位置", railDataList);
            }
            // FadeImage:
            else if (i == 9) {
                let array = readTbl(allTextList[index]);
                let cnt = Number(array[1]);
                let realCount = 0;
                let imageList = [];
                if (cnt > 0) {
                    for (let c = 0; ; c++) {
                        let imageArray = readTbl(allTextList[index + 1 + c]);
                        if (imageArray.length > 0) {
                            imageList.push(imageArray);
                            realCount++;
                        }
                        if (realCount >= cnt) {
                            break;
                        }
                    }
                }
                countCheck("FadeImage:", imageList, cnt);
                setFadeImage(tableBody, imageList);
            }
            // StageRes:
            else if (i == 10) {
                let array = readTbl(allTextList[index]);
                let cnt = Number(array[1]);
                let realCount = 0;
                let imageList = [];
                if (cnt > 0) {
                    for (let c = 0; ; c++) {
                        let imageArray = readTbl(allTextList[index + 1 + c]);
                        if (imageArray.length > 0) {
                            imageList.push(imageArray);
                            realCount++;
                        }
                        if (realCount >= cnt) {
                            break;
                        }
                    }
                }
                countCheck("StageRes:", imageList, cnt);
                setStageRes(tableBody, imageList);
            }
            // SetTexInfo:
            else if (i == 11) {
                let array = readTbl(allTextList[index]);
                let cnt = Number(array[1]);
                let realCount = 0;
                let texInfoList = [];
                if (cnt > 0) {
                    for (let c = 0; ; c++) {
                        let texInfoArray = readTbl(allTextList[index + 1 + c]);
                        if (texInfoArray.length > 0) {
                            texInfoList.push(texInfoArray);
                            realCount++;
                        }
                        if (realCount >= cnt) {
                            break;
                        }
                    }
                }
                countCheck("SetTexInfo:", texInfoList, cnt);
                setTexInfo(tableBody, texInfoList);
            }
            // STCnt:
            else if (i == 12) {
                let array = readTbl(allTextList[index]);
                let cnt = Number(array[1]);
                let realCount = 0;
                let stationList = [];
                if (cnt > 0) {
                    for (let c = 0; ; c++) {
                        let stationArray = readTbl(allTextList[index + 1 + c]);
                        if (stationArray.length > 0) {
                            stationArray.splice(0, 1)
                            stationList.push(stationArray);
                            realCount++;
                        }
                        if (realCount >= cnt) {
                            break;
                        }
                    }
                }
                countCheck("STCnt:", stationList, cnt);
                setStation(tableBody, stationList);
            }
            // CPU:
            else if (i == 13) {
                let array = readTbl(allTextList[index]);
                let cnt = Number(array[1]);
                let realCount = 0;
                let cpuList = [];
                if (cnt > 0) {
                    for (let c = 0; ; c++) {
                        let cpuArray = readTbl(allTextList[index + 1 + c]);
                        if (cpuArray.length > 0) {
                            cpuList.push(cpuArray);
                            realCount++;
                        }
                        if (realCount >= cnt) {
                            break;
                        }
                    }
                }
                countCheck("CPU:", cpuList, cnt);
                setCPU(tableBody, cpuList);
            }
            // ComicScript:
            else if (i == 14) {
                let array = readTbl(allTextList[index]);
                let cnt = Number(array[1]);
                let realCount = 0;
                let comicScriptList = [];
                if (cnt > 0) {
                    for (let c = 0; ; c++) {
                        let comicScriptArray = readTbl(allTextList[index + 1 + c]);
                        if (comicScriptArray.length > 0) {
                            comicScriptList.push(comicScriptArray);
                            realCount++;
                        }
                        if (realCount >= cnt) {
                            break;
                        }
                    }
                }
                countCheck("ComicScript:", comicScriptList, cnt);
                setComicScript(tableBody, comicScriptList);
            }
            // RainChecker:
            else if (i == 15) {
                let array = readTbl(allTextList[index]);
                let cnt = Number(array[1]);
                let realCount = 0;
                let rainCheckerList = [];
                if (cnt > 0) {
                    for (let c = 0; ; c++) {
                        let rainCheckerArray = readTbl(allTextList[index + 1 + c]);
                        if (rainCheckerArray.length > 0) {
                            rainCheckerList.push(rainCheckerArray);
                            realCount++;
                        }
                        if (realCount >= cnt) {
                            break;
                        }
                    }
                }
                countCheck("RainChecker:", rainCheckerList, cnt);
                setRainChecker(tableBody, rainCheckerList);
            }
            // DosanInfo:
            else if (i == 16) {
                let array = readTbl(allTextList[index]);
                let cnt = Number(array[1]);
                let realCount = 0;
                let dosanInfoList = [];
                if (cnt > 0) {
                    for (let c = 0; ; c++) {
                        let dosanInfoArray = readTbl(allTextList[index + 1 + c]);
                        if (dosanInfoArray.length > 0) {
                            dosanInfoList.push(dosanInfoArray);
                            realCount++;
                        }
                        if (realCount >= cnt) {
                            break;
                        }
                    }
                }
                countCheck("DosanInfo:", dosanInfoList, cnt);
                setDosanInfo(tableBody, dosanInfoList);
            }
            // MdlCnt:
            else if (i == 17) {
                let array = readTbl(allTextList[index]);
                let cnt = Number(array[1]);
                let realCount = 0;
                modelList = [];
                if (cnt > 0) {
                    for (let c = 0; ; c++) {
                        let modelArray = readTbl(allTextList[index + 1 + c]);
                        if (modelArray.length > 0) {
                            modelList.push(modelArray);
                            realCount++;
                        }
                        if (realCount >= cnt) {
                            break;
                        }
                    }
                }
                countCheck("MdlCnt:", modelList, cnt);
                await setMdlCnt(i, tableBody, modelList);
            }
            // RailCnt:
            else if (i == 18) {
                let array = readTbl(allTextList[index]);
                let cnt = Number(array[1]);
                let realCount = 0;
                let railList = [];
                if (cnt > 0) {
                    for (let c = 0; ; c++) {
                        let railArray = readTbl(allTextList[index + 1 + c]);
                        if (railArray.length > 0) {
                            railList.push(railArray);
                            realCount++;
                        }
                        if (realCount >= cnt) {
                            break;
                        }
                    }
                }
                countCheck("RailCnt:", railList, cnt);
                await setRailCnt(i, tableBody, railList);
            }
            // RailPri:
            else if (i == 19) {
                let array = readTbl(allTextList[index]);
                let cnt = Number(array[1]);
                let realCount = 0;
                let railPriList = [];
                if (cnt > 0) {
                    for (let c = 0; ; c++) {
                        let railPriArray = readTbl(allTextList[index + 1 + c]);
                        if (railPriArray.length > 0) {
                            railPriList.push(railPriArray);
                            realCount++;
                        }
                        if (realCount >= cnt) {
                            break;
                        }
                    }
                }
                countCheck("RailPri:", railPriList, cnt);
                setRailPri(tableBody, railPriList);
            }
            // BtlPri:
            else if (i == 20) {
                let array = readTbl(allTextList[index]);
                let cnt = Number(array[1]);
                let realCount = 0;
                let btlPriList = [];
                if (cnt > 0) {
                    for (let c = 0; ; c++) {
                        let btlPriArray = readTbl(allTextList[index + 1 + c]);
                        if (btlPriArray.length > 0) {
                            btlPriList.push(btlPriArray);
                            realCount++;
                        }
                        if (realCount >= cnt) {
                            break;
                        }
                    }
                }
                countCheck("BtlPri:", btlPriList, cnt);
                setBtlPri(tableBody, btlPriList);
            }
            // NoDriftRail:
            else if (i == 21) {
                let array = readTbl(allTextList[index]);
                let cnt = Number(array[1]);
                let realCount = 0;
                let noDriftRailList = [];
                if (cnt > 0) {
                    for (let c = 0; ; c++) {
                        let noDriftRailArray = readTbl(allTextList[index + 1 + c]);
                        if (noDriftRailArray.length > 0) {
                            noDriftRailList.push(noDriftRailArray);
                            realCount++;
                        }
                        if (realCount >= cnt) {
                            break;
                        }
                    }
                }
                countCheck("NoDriftRail:", noDriftRailList, cnt);
                setNoDriftRail(tableBody, noDriftRailList);
            }
            // AmbCnt:
            else if (i == 22) {
                let array = readTbl(allTextList[index]);
                let cnt = Number(array[1]);
                let realCount = 0;
                let ambList = [];
                if (cnt > 0) {
                    for (let c = 0; ; c++) {
                        let ambArray = readTbl(allTextList[index + 1 + c]);
                        if (ambArray.length > 0) {
                            ambList.push(ambArray);
                            realCount++;
                        }
                        if (realCount >= cnt) {
                            break;
                        }
                    }
                }
                countCheck("ambCnt:", ambList, cnt);
                await setAmbCnt(i, tableBody, ambList);
            }
        }
        setProgress(1);
    } catch (error) {
        let errorDiv = document.getElementById("errorDiv");
        let stackList = error.stack.split("\n");
        let errorLine = stackList[1];
        let errorNum = errorLine.substring(errorLine.indexOf("viewer.js"), errorLine.length - 1);
        errorDiv.innerHTML = `${errorNum}：${error}`;
    } finally {
        let tableDiv = document.getElementById("tableDiv");
        tableDiv.style.display = "inline";
    }
}

function countCheck(name, list, cnt) {
    if (list.length != cnt) {
        throw new Error(`【${name}】読み込んだデータと設定数が不一致です`);
    }
}

function setStory(tableBody, story) {
    let tbody = document.createElement("tbody");
    tableBody.appendChild(tbody);
    let headTr = document.createElement("tr");
    tbody.appendChild(headTr);
    let th = document.createElement("th");
    th.innerHTML = "ステージ";
    headTr.appendChild(th);

    let tr = document.createElement("tr");
    tbody.appendChild(tr);
    let td = document.createElement("td");
    tr.appendChild(td);
    td.innerHTML = story;
}
function setTrack(tableBody, num, flag=true) {
    let tbody = document.createElement("tbody");
    tableBody.appendChild(tbody);
    let headTr = document.createElement("tr");
    tbody.appendChild(headTr);
    let th = document.createElement("th");
    th.innerHTML = "台車";
    headTr.appendChild(th);

    let tr = document.createElement("tr");
    tbody.appendChild(tr);
    let td = document.createElement("td");
    tr.appendChild(td);
    let resultStr = "標準軌";
    if (num > 0) {
        resultStr = "狭軌";
    }

    if (!flag) {
        resultStr += "（デフォルト）";
    }
    td.innerHTML = resultStr;
}
function setDir(tableBody, dir, flag=true) {
    let tbody = document.createElement("tbody");
    tableBody.appendChild(tbody);
    let headTr = document.createElement("tr");
    tbody.appendChild(headTr);
    let th = document.createElement("th");
    th.innerHTML = "向き";
    headTr.appendChild(th);

    let tr = document.createElement("tr");
    tbody.appendChild(tr);
    let td = document.createElement("td");
    tr.appendChild(td);

    let resultStr = dir;
    if (!flag) {
        resultStr += "（デフォルト）";
    }
    td.innerHTML = resultStr;
}
function setComicData(tableBody, title, comicDataList) {
    let tbody = document.createElement("tbody");
    tableBody.appendChild(tbody);
    let headTr = document.createElement("tr");
    tbody.appendChild(headTr);
    let th = document.createElement("th");
    th.innerHTML = `読み込む ${title}`;
    headTr.appendChild(th);

    for (let i = 0; i < comicDataList.length; i++) {
        let tr = document.createElement("tr");
        tbody.appendChild(tr);
        let td = document.createElement("td");
        tr.appendChild(td);
        td.innerHTML = comicDataList[i];
    }
}
function setRailData(tableBody, title, railDataList) {
    let tbody = document.createElement("tbody");
    tableBody.appendChild(tbody);
    let headTr = document.createElement("tr");
    tbody.appendChild(headTr);
    let th = document.createElement("th");
    th.innerHTML = `${title}`;
    th.colSpan = 3;
    headTr.appendChild(th);

    for (let i = 0; i < railDataList.length; i++) {
        let tr = document.createElement("tr");
        tbody.appendChild(tr);
        for (let j = 0; j < railDataList[i].length; j++) {
            if (j >= 3) {
                break;
            }
            let td = document.createElement("td");
            tr.appendChild(td);
            td.style.width = "50px";
            td.innerHTML = railDataList[i][j];
        }
    }
}
function setFadeImage(tableBody, fadeImageList) {
    let thTitle = ["denファイル", "imgファイル"];

    let tbody = document.createElement("tbody");
    tableBody.appendChild(tbody);
    let headTr = document.createElement("tr");
    tbody.appendChild(headTr);

    for (let i = 0; i < thTitle.length; i++) {
        let th = document.createElement("th");
        th.innerHTML = thTitle[i];
        headTr.appendChild(th);
    }

    for (let i = 0; i < fadeImageList.length; i++) {
        let tr = document.createElement("tr");
        tbody.appendChild(tr);
        for (let j = 0; j < fadeImageList[i].length; j++) {
            if (j >= 2) {
                break;
            }
            let td = document.createElement("td");
            tr.appendChild(td);
            td.innerHTML = fadeImageList[i][j];
        }
    }
}
function setStageRes(tableBody, stageResList) {
    let thTitle = ["index", "denファイル", "imgファイル"];

    let tbody = document.createElement("tbody");
    tableBody.appendChild(tbody);
    let headTr = document.createElement("tr");
    tbody.appendChild(headTr);

    for (let i = 0; i < thTitle.length; i++) {
        let th = document.createElement("th");
        th.innerHTML = thTitle[i];
        headTr.appendChild(th);
    }

    for (let i = 0; i < stageResList.length; i++) {
        let tr = document.createElement("tr");
        tbody.appendChild(tr);
        for (let j = 0; j < stageResList[i].length; j++) {
            if (j >= 3) {
                break;
            }
            let td = document.createElement("td");
            tr.appendChild(td);
            if (j == 0) {
                td.innerHTML = i;
            } else {
                td.innerHTML = stageResList[i][j];
            }
        }
    }
}
function setTexInfo(tableBody, texInfoList) {
    let thTitle = [
        "index",
        "amb番号",
        "amb_child番号",
        "路線別画像データ番号",
        "tex_type",
        "change_index",
        "mat_index",
        "f1",
        "f2"
    ];
    let typeDict = {
        0: "駅表 表",
        1: "駅表 裏",
        2: "ローカルY軸反転",
        10: "時刻表示案内",
        11: "阪急LED",
        20: "ホーム",
        30: "テクスチャー変更",
        31: "UV変更",
        32: "メッシュの表示切替"
    }

    let tbody = document.createElement("tbody");
    tableBody.appendChild(tbody);
    let headTr = document.createElement("tr");
    tbody.appendChild(headTr);

    for (let i = 0; i < thTitle.length; i++) {
        let th = document.createElement("th");
        th.innerHTML = thTitle[i];
        headTr.appendChild(th);
    }

    for (let i = 0; i < texInfoList.length; i++) {
        let tr = document.createElement("tr");
        tbody.appendChild(tr);
        for (let j = 0; j < texInfoList[i].length; j++) {
            if (j >= 9) {
                break;
            }
            let td = document.createElement("td");
            tr.appendChild(td);
            if (j == 0) {
                td.innerHTML = i;
            } 
            else if (j == 4) {
                td.innerHTML = typeDict[Number(texInfoList[i][j])];
            }
            else {
                td.innerHTML = texInfoList[i][j];
            }
        }
    }
}
function setStation(tableBody, stationList) {
    let thTitle = ["stIndex", "レール", "オフセット", "駅名", "ふりがな", "英語"];

    let tbody = document.createElement("tbody");
    tableBody.appendChild(tbody);
    let headTr = document.createElement("tr");
    tbody.appendChild(headTr);

    for (let i = 0; i < thTitle.length; i++) {
        let th = document.createElement("th");
        th.innerHTML = thTitle[i];
        headTr.appendChild(th);
    }

    for (let i = 0; i < stationList.length; i++) {
        let tr = document.createElement("tr");
        tbody.appendChild(tr);
        for (let j = 0; j < stationList[i].length; j++) {
            if (j >= 6) {
                break;
            }
            let td = document.createElement("td");
            tr.appendChild(td);
            td.innerHTML = stationList[i][j];
        }
    }
}
function setCPU(tableBody, cpuList) {
    let thTitle = [
        "index",
        "レール",
        "train_no",
        "run_type",
        "min_len",
        "max_len",
        "max_speed",
        "min_speed",
        "p1"
    ];

    let tbody = document.createElement("tbody");
    tableBody.appendChild(tbody);
    let headTr = document.createElement("tr");
    tbody.appendChild(headTr);

    for (let i = 0; i < thTitle.length; i++) {
        let th = document.createElement("th");
        th.innerHTML = thTitle[i];
        headTr.appendChild(th);
    }

    for (let i = 0; i < cpuList.length; i++) {
        let tr = document.createElement("tr");
        tbody.appendChild(tr);
        for (let j = 0; j < cpuList[i].length; j++) {
            if (j >= 9) {
                break;
            }
            let td = document.createElement("td");
            tr.appendChild(td);
            if (j == 0) {
                td.innerHTML = i;
            } else {
                td.innerHTML = cpuList[i][j];
            }
        }
    }
}
function setComicScript(tableBody, comicScriptList) {
    let thTitle = [
        "index",
        "comic_bin",
        "event_type",
        "レール",
        "オフセット"
    ];

    let eventTypeList = [
        "Player",
		"CPU",
		"Fast",
		"Goal",
		"GoalEvent",
		"FreeRunFastEvent",
		"BtlFastEvent"
    ];

    let tbody = document.createElement("tbody");
    tableBody.appendChild(tbody);
    let headTr = document.createElement("tr");
    tbody.appendChild(headTr);

    for (let i = 0; i < thTitle.length; i++) {
        let th = document.createElement("th");
        th.innerHTML = thTitle[i];
        headTr.appendChild(th);
    }

    for (let i = 0; i < comicScriptList.length; i++) {
        let tr = document.createElement("tr");
        tbody.appendChild(tr);
        for (let j = 0; j < comicScriptList[i].length; j++) {
            if (j >= 5) {
                break;
            }
            let td = document.createElement("td");
            tr.appendChild(td);
            if (j == 0) {
                td.innerHTML = i;
            } 
            else if (j == 2) {
                td.innerHTML = eventTypeList[Number(comicScriptList[i][j])];
            }
            else {
                td.innerHTML = comicScriptList[i][j];
            }
        }
    }
}
function setRainChecker(tableBody, rainCheckerList) {
    let thTitle = [
        "index",
        "event_no",
        "event_type",
        "レール",
        "オフセット",
        "param"
    ];

    let eventTypeDict = {
        0: "雨停止",
		1: "雨開始",
		2: "ワイパー開始",
		3: "ワイパー停止",
		4: "音だけ停止",
		5: "音だけ開始",
		10: "地下突入",
		11: "地下から出現",
		100: "CityPos",
		101: "CityScale",
		102: "MountPos"
    }

    let tbody = document.createElement("tbody");
    tableBody.appendChild(tbody);
    let headTr = document.createElement("tr");
    tbody.appendChild(headTr);

    for (let i = 0; i < thTitle.length; i++) {
        let th = document.createElement("th");
        th.innerHTML = thTitle[i];
        headTr.appendChild(th);
    }

    for (let i = 0; i < rainCheckerList.length; i++) {
        let tr = document.createElement("tr");
        tbody.appendChild(tr);
        for (let j = 0; j < rainCheckerList[i].length; j++) {
            if (rainCheckerList[i][j].indexOf("//") == 0) {
                break;
            }
            let td = document.createElement("td");
            tr.appendChild(td);
            if (j == 0) {
                td.innerHTML = i;
            }
            else if (j == 2) {
                td.innerHTML = eventTypeDict[Number(rainCheckerList[i][j])];
            }
            else {
                td.innerHTML = rainCheckerList[i][j];
            }
        }
    }
}
function setDosanInfo(tableBody, dosanInfoList) {
    let thTitle = [
        "index",
        "event_no",
        "event_type",
        "レール",
        "オフセット",
        "param"
    ];

    let eventTypeDict = {
		10: "TrainJump"
    }

    let tbody = document.createElement("tbody");
    tableBody.appendChild(tbody);
    let headTr = document.createElement("tr");
    tbody.appendChild(headTr);

    for (let i = 0; i < thTitle.length; i++) {
        let th = document.createElement("th");
        th.innerHTML = thTitle[i];
        headTr.appendChild(th);
    }

    for (let i = 0; i < dosanInfoList.length; i++) {
        let tr = document.createElement("tr");
        tbody.appendChild(tr);
        for (let j = 0; j < dosanInfoList[i].length; j++) {
            if (dosanInfoList[i][j].indexOf("//") == 0) {
                break;
            }
            let td = document.createElement("td");
            tr.appendChild(td);
            if (j == 0) {
                td.innerHTML = i;
            }
            else if (j == 2) {
                td.innerHTML = eventTypeDict[Number(dosanInfoList[i][j])];
            }
            else {
                td.innerHTML = dosanInfoList[i][j];
            }
        }
    }
}
async function setMdlCnt(index, tableBody, modelList) {
    let thTitle = [
        "index",
        "モデル名",
        "flg",
        "flg",
        "架線柱"
    ];

    let tbody = document.createElement("tbody");
    tableBody.appendChild(tbody);
    let headTr = document.createElement("tr");
    tbody.appendChild(headTr);

    for (let i = 0; i < thTitle.length; i++) {
        let th = document.createElement("th");
        th.innerHTML = thTitle[i];
        headTr.appendChild(th);
    }

    let start = index / searchTextList.length;
    let end = (index + 1) / searchTextList.length;
    let diff = getProgressPer(
        start,
        end,
        modelList.length
    );

    for (let i = 0; i < modelList.length; i++) {
        if (i % 20 == 0) {
            await setProgress(start + i * diff);
        }
        let tr = document.createElement("tr");
        tbody.appendChild(tr);
        for (let j = 0; j < modelList[i].length; j++) {
            if (j >= 5) {
                break;
            }
            let td = document.createElement("td");
            tr.appendChild(td);
            if (j == 0) {
                td.innerHTML = i;
            }
            else if (j == 2 || j == 3) {
                td.innerHTML = toHex(modelList[i][j], "char");
            }
            else if (j == 4) {
                let idx = Number(modelList[i][j]);
                if (idx >= 0 && idx < modelList.length) {
                    td.innerHTML = modelList[idx][1];
                    td.title = modelList[i][j];
                } else {
                    td.innerHTML = modelList[i][j];
                }
            }
            else {
                td.innerHTML = modelList[i][j];
            }
        }
    }
}
async function setRailCnt(index, tableBody, railList) {
    let thTitle = [
        "index", "prevRailIndex", "BlockNo", 
        "pos_x", "pos_y", "pos_z", 
        "dir_x", "dir_y", "dir_z",
        "モデル", "架線柱", "per",
        "flg", "flg", "flg", "flg",
        "rail_data",
        "next_rail", "next_no", "prev_rail", "prev_no"
    ];

    let tbody = document.createElement("tbody");
    tableBody.appendChild(tbody);
    let headTr = document.createElement("tr");
    tbody.appendChild(headTr);

    for (let i = 0; i < thTitle.length; i++) {
        let th = document.createElement("th");
        th.innerHTML = thTitle[i];
        headTr.appendChild(th);
    }

    let railHeaderColorList = [
        "", "#E7B5E8", "#E7D5E8",
        "#B7D5E8", "#B7D5E8", "#B7D5E8",
        "#99F5FF", "#99F5FF", "#99F5FF",
        "#C9F58F", "#99F58F", "#C9A1AE",
        "#78F2D3", "#78F2D3", "#78F2D3", "#78F2D3",
        "",
        "#FBF585", "#FBF585", "#F593E3", "#F593E3"
    ];

    let start = index / searchTextList.length;
    let end = (index + 1) / searchTextList.length;
    let diff = getProgressPer(
        start,
        end,
        railList.length
    );

    let railDataCnt = 0;
    for (let i = 0; i < railList.length; i++) {
        if (i % 20 == 0) {
            await setProgress(start + i * diff);
        }
        railDataCnt = 0;
        let tr = document.createElement("tr");
        tbody.appendChild(tr);
        for (let j = 0; j < railList[i].length; j++) {
            if (railDataCnt > 0) {
                if (j > 16 + 4 * railDataCnt) {
                    break;
                }
            }
            let td = document.createElement("td");
            tr.appendChild(td);
            // index
            switch (j) {
                // index
                case 0:
                    td.innerHTML = i;
                    break;
                case 9:
                case 10:
                    let idx = Number(railList[i][j]);
                    if (idx >= 0 && idx < modelList.length) {
                        td.innerHTML = modelList[idx][1];
                        td.title = railList[i][j];
                    } else {
                        if (j == 10) {
                            if (idx == 255 || idx == -1) {
                                let modelIdx = railList[i][j - 1];
                                let baseIdx = Number(modelList[modelIdx][4]);
                                if (baseIdx >= 0 && baseIdx < 254) {
                                    td.innerHTML = modelList[baseIdx][1];
                                    td.style.backgroundColor = "gold";
                                    td.title = railList[i][j];
                                } else {
                                    td.innerHTML = railList[i][j];
                                    td.style.backgroundColor = "lightgray";
                                }
                            } else {
                                td.innerHTML = railList[i][j];
                                td.style.backgroundColor = "lightgray";
                            }
                        } else {
                            td.innerHTML = railList[i][j];
                        }
                    }
                    break;
                case 12:
                case 13:
                case 14:
                case 15:
                    td.innerHTML = toHex(railList[i][j], "char");
                    break;
                default:
                    if (j == 16) {
                        railDataCnt = Number(railList[i][j]);
                    }
                    td.innerHTML = railList[i][j];
                    break;
            }

            if (j == 1) {
                prevRail = Number(railList[i][j]);
                if (prevRail != -1 && prevRail != 0) {
                    currentRailDataCnt = Number(railList[i][16]);
                    prevRailDataCnt = Number(railList[prevRail][16]);
                    if (currentRailDataCnt != prevRailDataCnt) {
                        if (currentRailDataCnt == 2) {
                            currentRailLeftPrevRailNo = Number(railList[i][19]);
                            currentRailRightPrevRailNo = Number(railList[i][23]);
                            if (currentRailLeftPrevRailNo == prevRail || currentRailRightPrevRailNo == prevRail) {
                                if (currentRailLeftPrevRailNo == prevRail) {
                                    baseX = Number(railList[i][3]);
                                    if (baseX != 6.5) {
                                        throw new Error(`レール No.${i}のX移動数値(${baseX})が異常です`);
                                    }
                                } else if (currentRailRightPrevRailNo == prevRail) {
                                    baseX = Number(railList[i][3]);
                                    if (baseX != -6.5) {
                                        throw new Error(`レール No.${i}のX移動数値(${baseX})が異常です`);
                                    }
                                }
                            }
                        }
                        else if (currentRailDataCnt == 1) {
                            currentRailPrevRailNo = Number(railList[i][19]);
                            if (currentRailPrevRailNo == prevRail) {
                                prevRailNextLeftRailNo = Number(railList[prevRail][17]);
                                prevRailNextRightRailNo = Number(railList[prevRail][21]);
                                if (prevRailNextLeftRailNo == i || prevRailNextRightRailNo == i) {
                                    if (prevRailNextLeftRailNo == i) {
                                        baseX = Number(railList[i][3]);
                                        if (baseX != -6.5) {
                                            if (baseX == 6.5) {
                                                console.log(`レール No.${prevRail}のNextを自動補正しました`);
                                            } else {
                                                throw new Error(`レール No.${i}のX移動数値(${baseX})が異常です`);
                                            }
                                        }
                                    } else if (prevRailNextRightRailNo == i) {
                                        baseX = Number(railList[i][3]);
                                        if (baseX != 6.5) {
                                            if (baseX == -6.5) {
                                                console.log(`レール No.${prevRail}のNextを自動補正しました`);
                                            } else {
                                                throw new Error(`レール No.${i}のX移動数値(${baseX})が異常です`);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            if (j > 16) {
                let idx = (j - 17) % 4 + 17;
                td.style.backgroundColor = railHeaderColorList[idx];
            } else {
                if (["lightgray", "gold"].indexOf(td.style.backgroundColor) == -1) {
                    td.style.backgroundColor = railHeaderColorList[j];
                }
            }
            td.style.minWidth = "80px";
        }
    }
}
function setRailPri(tableBody, railPriList) {
    let thTitle = [
        "rail_index",
        "pri_rail_index"
    ];

    let tbody = document.createElement("tbody");
    tableBody.appendChild(tbody);
    let headTr = document.createElement("tr");
    tbody.appendChild(headTr);

    for (let i = 0; i < thTitle.length; i++) {
        let th = document.createElement("th");
        th.innerHTML = thTitle[i];
        headTr.appendChild(th);
    }

    for (let i = 0; i < railPriList.length; i++) {
        let tr = document.createElement("tr");
        tbody.appendChild(tr);
        for (let j = 0; j < railPriList[i].length; j++) {
            if (j >= 2) {
                break;
            }
            let td = document.createElement("td");
            tr.appendChild(td);
            td.innerHTML = railPriList[i][j];
        }
    }
}
function setBtlPri(tableBody, btlPriList) {
    let thTitle = [
        "rail_index",
        "pri_rail_index"
    ];

    let tbody = document.createElement("tbody");
    tableBody.appendChild(tbody);
    let headTr = document.createElement("tr");
    tbody.appendChild(headTr);

    for (let i = 0; i < thTitle.length; i++) {
        let th = document.createElement("th");
        th.innerHTML = thTitle[i];
        headTr.appendChild(th);
    }

    for (let i = 0; i < btlPriList.length; i++) {
        let tr = document.createElement("tr");
        tbody.appendChild(tr);
        for (let j = 0; j < btlPriList[i].length; j++) {
            if (j >= 2) {
                break;
            }
            let td = document.createElement("td");
            tr.appendChild(td);
            td.innerHTML = btlPriList[i][j];
        }
    }
}
function setNoDriftRail(tableBody, noDriftRailList) {
    let thTitle = [
        "rail_index",
        "pri_rail_index"
    ];

    let tbody = document.createElement("tbody");
    tableBody.appendChild(tbody);
    let headTr = document.createElement("tr");
    tbody.appendChild(headTr);

    for (let i = 0; i < thTitle.length; i++) {
        let th = document.createElement("th");
        th.innerHTML = thTitle[i];
        headTr.appendChild(th);
    }

    for (let i = 0; i < noDriftRailList.length; i++) {
        let tr = document.createElement("tr");
        tbody.appendChild(tr);
        for (let j = 0; j < noDriftRailList[i].length; j++) {
            if (j >= 2) {
                break;
            }
            let td = document.createElement("td");
            tr.appendChild(td);
            td.innerHTML = noDriftRailList[i][j];
        }
    }
}
async function setAmbCnt(index, tableBody, ambList) {
    let thTitle = [
        "index", "rail", "length",
        "amd_data",
        "モデル", "親index",
        "pos_x", "pos_y", "pos_z", 
        "dir_x", "dir_y", "dir_z",
        "joint_dir_x", "joint_dir_y", "joint_dir_z",
        "per", "kasenchu_per"
    ];

    let tbody = document.createElement("tbody");
    tableBody.appendChild(tbody);
    let headTr = document.createElement("tr");
    tbody.appendChild(headTr);

    for (let i = 0; i < thTitle.length; i++) {
        let th = document.createElement("th");
        th.innerHTML = thTitle[i];
        headTr.appendChild(th);
    }

    let ambHeaderColorList = [
        "", "", "",
        "",
        "#C9F58F", "",
        "#B7D5E8", "#B7D5E8", "#B7D5E8",
        "#99F5FF", "#99F5FF", "#99F5FF",
        "#99F58F", "#99F58F", "#99F58F",
        "#C9A1AE", "#F593E3"
    ];

    let start = index / searchTextList.length;
    let end = (index + 1) / searchTextList.length;
    let diff = getProgressPer(
        start,
        end,
        ambList.length
    );

    let ambDataCnt = 0
    for (let i = 0; i < ambList.length; i++) {
        if (i % 20 == 0) {
            await setProgress(start + i * diff);
        }
        ambDataCnt = 0;
        let tr = document.createElement("tr");
        tbody.appendChild(tr);
        for (let j = 0; j < ambList[i].length; j++) {
            if (ambDataCnt > 0) {
                if (j > 4 + 13 * ambDataCnt) {
                    break;
                }
            }
            if (j > 4 && j % 13 == 4) {
                tr = document.createElement("tr");
                tbody.appendChild(tr);
                for (let k = 0; k < 4; k++) {
                    let newTd = document.createElement("td");
                    newTd.style.borderWidth = "0px";
                    tr.appendChild(newTd);
                }
            }
            let td = document.createElement("td");
            tr.appendChild(td);
            if (j == 0) {
                td.innerHTML = i;
            } else {
                if (j == 3) {
                    ambDataCnt = Number(ambList[i][j]);
                    td.innerHTML = ambList[i][j];
                } else if (j % 13 == 4) {
                    let idx = Number(ambList[i][j]);
                    if (idx >= 0 && idx < modelList.length) {
                        td.innerHTML = modelList[idx][1];
                        td.title = ambList[i][j];
                    } else {
                        td.innerHTML = ambList[i][j];
                    }
                } else {
                    td.innerHTML = ambList[i][j];
                }
            }
            if (j >= 17) {
                let idx = (j - 4) % 13 + 4;
                td.style.backgroundColor = ambHeaderColorList[idx];
            } else {
                td.style.backgroundColor = ambHeaderColorList[j];
            }   
        }
    }
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