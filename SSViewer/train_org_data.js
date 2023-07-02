let allTextList;
let notchList = [];
let railList = [];
let ambList = [];
let commonLabel = ["名称", "性能", "備考"];
let notchLabelInfoList = [
    "maxSpeed",
    "tlk",
    "sound",
    "add"
];
let perfLabelInfoList = [
    "None_Tlk",
    "Add_Best",
    "UpHill",
    "DownHill",
    "Weight",
    "CompPower",
    "First_Breake",
    "Second_Breake",
    "SpBreake",
    "D_Speed",
    "One_Speed",
    "OutParam",
    "D_Add",
    "D_Add2",
    "D_AddFrame",
    "Carbe",
    "Jump",
    "ChangeFrame",
    "OutRun_Top",
    "OutRun_Other",
    "OutRun_Frame",
    "OutRun_Speed",
    "OutRun_JumpFrame",
    "OutRun_Jump_Hight",
    "LightningFullNotch_Per",
    "LightningFullNotch_Speed",
    "LightningFullNotch_Frame",
    "D_Add_OneWheele",
    "D_Add_MaxOneWheele",
    "D_Add_OneWheeleTime",
]
let carbLabelInfoList = [
    "TrackOutPer",
    "TrackKntPer",
    "Breake_Out_Pow",
    "MaxOutParam",
]
let carbLabelTranslateList = [
    "脱線設定の係数",
    "カントの係数",
    "ブレーキ入れ時の<br>脱線値のたまり具合",
    "１フレームの最大脱線値"
]
let otherLabelInfoList = [
    "HurikoCnt",
    "HurikoAngle",
    "TrackCnt",
    "-",
    "TrackName",
    "TrackMdlName",
    "LowTrackMdlName",
]
let hurikoLabelInfoList = [
    "HurikoPow"
]
let oneWheelLabelInfoList = [
    "OneWheelPow",
    "OneWheelTime",
    "OneWheelAfterTime"
]
let rainLabelInfoList = [
    "RainAdd",
    "RainBreake",
    "RainHill",
    "RainDown"
]

window.addEventListener('load', () => {
    let file = document.getElementById("file");
    file.addEventListener("change", () => {
        const reader = new FileReader();
        let [inputFile] = document.getElementById("file").files;

        reader.addEventListener("load", () => {
            allTextList = reader.result.split("\n").map(m => m.trim());
            try {
                if (!readTrainData()) {
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
function initTable() {
    let idList = [
        "notchTableBody",
        "perfTableBody",
        "rainTableBody",
        "carbTableBody",
        "oneWheelTableBody",
        "otherTableBody",
        "hurikoTableBody"
    ];

    idList.forEach((id) => {
        let tableBody = document.getElementById(id);
        tableBody.innerHTML = "";

        let div = tableBody.parentNode.getElementsByTagName("div")[0];
        div.innerHTML = "";
    });
}
function readTrainData() {
    notchList = [];
    let errorDiv = document.getElementById("errorDiv");
    errorDiv.innerHTML = "";
    initTable();

    //notch
    if (!addTrainElement("Cnt:", "notchTableBody", "ノッチデータ", notchLabelInfoList, true, false, true)){
        return false;
    }
    //perf
    if (!addTrainElement("TlkData:", "perfTableBody", "性能データ", perfLabelInfoList, false, true, true)){
        return false;
    }
    //carb
    if (!addTrainElement("CarbData:", "carbTableBody", "カーブデータ", carbLabelInfoList, false, false, true)){
        return false;
    }
    //other
    if (!addTrainElement("OtherData:", "otherTableBody", "otherデータ", otherLabelInfoList, false, false, true)){
        return false;
    }
    // huriko
    if (!addTrainElement("HurikoData:", "hurikoTableBody", "振り子データ", hurikoLabelInfoList, false, false, false)){
        return false;
    }
    //oneWheel
    if (!addTrainElement("OneWheelPow:", "oneWheelTableBody", "片輪走行データ", oneWheelLabelInfoList, false, false, false)){
        return false;
    }
    // rainData
    if (!addTrainElement("RainData:", "rainTableBody", "Rainデータ", rainLabelInfoList, false, false, true)){
        return false;
    }
    return true;
}

function addTrainElement(
    findTextName,
    insertTableName,
    insertTableLabelName,
    labelInfoList,
    isNotchData = false,
    isPerfData = false,
    isRequired = false
) {
    let notchCnt = 0;
    let index = findText(findTextName);
    //必須データで探せない場合
    if (isRequired && index == -1) {
        errorDiv.innerHTML = `${findTextName}を探せません`;
        return false;
    }
    //任意データで探せない場合
    else if (!isRequired && index == -1) {
        return true;
    }
    //ノッチデータの場合、数まで取得
    if (isNotchData) {
        let notchText = allTextList[index];
        notchCnt = Number(notchText.split("\t")[1]);
        if (isNaN(notchCnt)) {
            errorDiv.innerHTML = `ノッチのCntの数字が不正です<br>エラーが出るデータ：【${notchText.split("\t")}】`;
            return false;
        }
    }
    index += 1

    //テーブルの名前を付ける
    let table = document.getElementById(insertTableName);
    let div = table.parentNode.getElementsByTagName("div")[0];
    div.innerHTML = `<h3>${insertTableLabelName}</h3>`
    
    //テーブルヘッダー
    let thead = document.createElement("thead");
    table.appendChild(thead);
    let theadTr = document.createElement("tr");
    thead.appendChild(theadTr);
    //テーブルヘッダー（ノッチデータ）
    if (isNotchData) {
        for (let j = 0; j < notchCnt + 2; j++) {
            let th = document.createElement("th");
            theadTr.appendChild(th);
            if (j == 0) {
                continue;
            }
            th.innerHTML = `${j - 1}ノッチ`;
        }
    }
    //テーブルヘッダー（その他）
    else {
        for (let i = 0; i < commonLabel.length; i++) {
            let th = document.createElement("th");
            theadTr.appendChild(th);
            th.innerHTML = commonLabel[i];
        }
    }

    //テーブル中身
    let tbody = document.createElement("tbody");
    table.appendChild(tbody);
    //テーブル中身（ノッチデータ）
    if (isNotchData) {
        for (let i = 0; i < labelInfoList.length; i++) {
            let notchText = allTextList[index];
            if (notchText == "" || notchText.indexOf("//") == 0) {
                errorDiv.innerHTML = `ノッチデータの ${i + 1}行目が空データです。<br>エラーが出るデータ：【${notchText.split("\t")}】`;
                return false;
            }

            let notchInfoList = notchText.split("\t");
            if (notchInfoList.length < notchCnt) {
                errorDiv.innerHTML = `ノッチデータの ${i + 1}行目を読み込めません。<br>エラーが出るデータ：【${notchText.split("\t")}】`;
                return false;
            }
            let tr = document.createElement("tr");
            tbody.appendChild(tr);

            let td = document.createElement("td");
            tr.appendChild(td);
            td.innerHTML = labelInfoList[i];

            for (let j = 0; j < notchCnt + 1; j++) {
                let td = document.createElement("td");
                tr.appendChild(td);
                if (i == 0 || i == 1) {
                    if (j == 0) {
                        td.innerHTML = "0";
                    } else {
                        td.innerHTML = notchInfoList[j - 1];
                        if (isNaN(notchInfoList[j - 1])) {
                            errorDiv.innerHTML = `数字で読み込めない文字が含まれています<br>エラーが出るデータ：【${notchText.split("\t")}】`;
                            return false;
                        }
                    }
                } else {
                    if (j == 0) {
                        td.innerHTML = notchInfoList[j];
                        if (isNaN(notchInfoList[j])) {
                            errorDiv.innerHTML = `数字で読み込めない文字が含まれています<br>エラーが出るデータ：【${notchText.split("\t")}】`;
                            return false;
                        }
                    } else {
                        td.innerHTML = notchInfoList[j - 1];
                        if (isNaN(notchInfoList[j - 1])) {
                            errorDiv.innerHTML = `数字で読み込めない文字が含まれています<br>エラーが出るデータ：【${notchText.split("\t")}】`;
                            return false;
                        }
                    }
                }
            }
            index++;
        }
    }
    //テーブル中身（その他）
    else {
        let dataText = allTextList[index];
        if (dataText == "" || dataText.indexOf("//") == 0) {
            errorDiv.innerHTML = `${insertTableLabelName}が空データです。`;
            return false;
        }
        
        //テーブル中身（その他の中で性能データ）
        if (isPerfData) {
            let perfInfoList = dataText.split("\t");
            if (perfInfoList.length < labelInfoList.length - 3) {
                errorDiv.innerHTML = `${insertTableLabelName}を読み込めません<br>エラーが出るデータ：【${dataText.split("\t")}】`;
                return false;
            }
            for (let i = 0; i < labelInfoList.length; i++) {
                let tr = document.createElement("tr");
                tbody.appendChild(tr);
                for (let j = 0; j < commonLabel.length; j++) {
                    let td = document.createElement("td");
                    tr.appendChild(td);
                    switch (j) {
                        case 0:
                            td.innerHTML = labelInfoList[i];
                            break;
                        case 1:
                            if (i == labelInfoList.length - 3) {
                                if (perfInfoList.length > i) {
                                    td.innerHTML = perfInfoList[i];
                                    if (isNaN(perfInfoList[i])) {
                                        errorDiv.innerHTML = `数字で読み込めない文字が含まれています<br>エラーが出るデータ：【${dataText.split("\t")}】`;
                                        return false;
                                    }
                                } else {
                                    td.innerHTML = (Number(perfInfoList[12]) * 0.8).toPrecision(5);
                                }
                            }
                            else if (i == labelInfoList.length - 2) {
                                if (perfInfoList.length > i) {
                                    td.innerHTML = perfInfoList[i];
                                    if (isNaN(perfInfoList[i])) {
                                        errorDiv.innerHTML = `数字で読み込めない文字が含まれています<br>エラーが出るデータ：【${dataText.split("\t")}】`;
                                        return false;
                                    }
                                } else {
                                    td.innerHTML = (Number(perfInfoList[13]) * 0.8).toPrecision(5);
                                }
                            }
                            else if (i == labelInfoList.length - 1) {
                                if (perfInfoList.length > i) {
                                    td.innerHTML = perfInfoList[i];
                                    if (isNaN(perfInfoList[i])) {
                                        errorDiv.innerHTML = `数字で読み込めない文字が含まれています<br>エラーが出るデータ：【${dataText.split("\t")}】`;
                                        return false;
                                    }
                                } else {
                                    td.innerHTML = 0.5;
                                }
                            }
                            else {
                                td.innerHTML = perfInfoList[i];
                                if (isNaN(perfInfoList[i])) {
                                    errorDiv.innerHTML = `数字で読み込めない文字が含まれています<br>エラーが出るデータ：【${dataText.split("\t")}】`;
                                    return false;
                                }
                            }
                            break;
                        case 2:
                            if (i == labelInfoList.length - 3) {
                                if (perfInfoList.length <= i) {
                                    td.innerHTML = "[D_Add * 0.8] 適用";
                                }
                            }
                            else if (i == labelInfoList.length - 2) {
                                if (perfInfoList.length <= i) {
                                    td.innerHTML = "[D_Add2 * 0.8] 適用";
                                }
                            }
                            else if (i == labelInfoList.length - 1) {
                                if (perfInfoList.length <= i) {
                                    td.innerHTML = "固定値0.5 適用";
                                }
                            }
                            break;
                    }
                }
            }
        }
        //テーブル中身（性能データではない、その他）
        else {
            let dataInfoList = dataText.split("\t");
            if (dataInfoList.length < labelInfoList.length) {
                errorDiv.innerHTML = `${insertTableLabelName}を読み込めません`;
                return false;
            }

            for (let i = 0; i < labelInfoList.length; i++) {
                let tr = document.createElement("tr");
                tbody.appendChild(tr);
                for (let j = 0; j < commonLabel.length; j++) {
                    let td = document.createElement("td");
                    tr.appendChild(td);
                    switch (j) {
                        case 0:
                            td.innerHTML = labelInfoList[i];
                            break;
                        case 1:
                            td.innerHTML = dataInfoList[i];
                            break;
                    }
                }
            }
        }
    }
    return true;
}