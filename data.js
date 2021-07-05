var allText;

function readTextFile(file){
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function (){
        if (rawFile.readyState === 4){
            if (rawFile.status === 200 || rawFile.status == 0){
                allText = rawFile.responseText;
            }
        }
    };
    rawFile.send(null);
}

function createTd(table, title, data) {
    let tr = document.createElement("tr");
    table.appendChild(tr);
    for (let i = 0; i < data.length + 1; i++) {
        let td = document.createElement("td");
        tr.appendChild(td);
        if (title == "バイナリテキスト" || title == "16進数") {
            tr.className = "binary";
        }
        if (i == 0) {
            td.innerHTML = title
        } else {
            if (title == "数値") {
                td.innerHTML = Number(data[i-1]).toFixed(1);
            } else if (title == "加速力の倍率") {
                td.innerHTML = Number(data[i-1]).toFixed(3);
            } else {
                td.innerHTML = data[i-1];
            }
        }
    }
}

function createAttTd(table, titleArray, data) {
    for (let i = 0; i < data["att"].length+1; i++) {
        let tr = document.createElement("tr");
        table.appendChild(tr);
        if (i == 0) {
            for (let j = 0; j < titleArray.length + 1; j++) {
                let td = document.createElement("td");
                tr.appendChild(td);
                if (j != 0) {
                    td.innerHTML = titleArray[j-1];
                    if (titleArray[j-1] != "数値") {
                        td.className = "binary";
                    }
                }
            }
        } else {
            for (let j = 0; j < 4; j++) {
                let td = document.createElement("td");
                tr.appendChild(td);
                if (j == 0) {
                    td.innerHTML = data["attName"][i-1];
                } else if (j == 1) {
                    td.innerHTML = Number(data["att"][i-1]).toFixed(4);
                } else if (j == 2) {
                    td.innerHTML = data["attLittle"][i-1];
                    td.className = "binary";
                } else if (j == 3) {
                    td.innerHTML = data["attBig"][i-1];
                    td.className = "binary";
                }
            }
        }
    }
}

function showBinary(value) {
    let binary = document.getElementsByClassName("binary");
    let trainName = document.getElementsByClassName("trainName");
    let checkbox = value;
    if (checkbox.checked) {
        for (let i = 0; i < binary.length; i++) {
            binary[i].style.display = "none";
        }
        for (let i = 0; i < trainName.length; i++) {
            trainName[i].setAttribute("colspan", 2);
        }
    } else {
        for (let i = 0; i < binary.length; i++) {
            binary[i].style.display = "";
        }
        for (let i = 0; i < trainName.length; i++) {
            trainName[i].setAttribute("colspan", 4);
        }
    }
}

function showTrain() {
    let checkDiv = document.getElementById("trainCheck");
    let checkboxList = checkDiv.getElementsByTagName("input");
    let notchDiv = document.getElementById("notch");
    let notchTable = notchDiv.getElementsByTagName("table");
    let trainDiv = document.getElementById("train");
    let trainTable = trainDiv.getElementsByTagName("table");
    let count = 0;
    for (let i = 0; i < notchTable.length; i++) {
        let table = notchTable[i];
        table.style.display = "none";
    }
    for (let i = 0; i < trainTable.length; i++) {
        let table = trainTable[i];
        table.style.display = "none";
    }

    for (let i = 0; i < checkboxList.length; i++) {
        if (checkboxList[i].type == "checkbox") {
            let checkbox = checkboxList[i];
            if (checkbox.checked) {
                notchTable[count].style.display = "";
                trainTable[count].style.display = "";
            }
            count++;
        }
    }
}

function allCheck(value) {
    let checkDiv = document.getElementById("trainCheck");
    let checkboxList = checkDiv.getElementsByTagName("input");
    let allCheck = document.getElementById("allCheck");
    //チェックを外す
    if (value == 0) {
        for (let i = 0; i < checkboxList.length; i++) {
            if (checkboxList[i].type == "checkbox") {
                let checkbox = checkboxList[i];
                checkbox.checked = false;
            }
        }
        allCheck.setAttribute("onclick", "allCheck(1)");
        allCheck.value = "車両表示のチェックを全部選択"
    }
    //チェックする
    else if (value == 1) {
        for (let i = 0; i < checkboxList.length; i++) {
            if (checkboxList[i].type == "checkbox") {
                let checkbox = checkboxList[i];
                checkbox.checked = true;
            }
        }
        allCheck.setAttribute("onclick", "allCheck(0)");
        allCheck.value = "車両表示のチェックを全部解除"
    }
    showTrain();
}

function init(value, flag) {
    readTextFile(value);
    let rows = allText.split("\r\n");
    let count = 1;
    let mdlCnt = rows[0];
    let data = [];
    for (i = 0; i < mdlCnt; i++) {
        let names = rows[count].split("\t");
        let name = names[0];
        let sound = names[1];
        count++;
        let notchs = rows[count].split("\t");
        count++;
        let notchLittles = rows[count].split("\t");
        count++;
        let notchBigs = rows[count].split("\t");
        count++;
        let tlks = rows[count].split("\t");
        count++;
        let tlkLittles = rows[count].split("\t");
        count++;
        let tlkBigs = rows[count].split("\t");
        count++;

        let soundNum;
        let add;
        let addLittles;
        let addBigs;

        if (flag) {
            soundNum = rows[count].split("\t");
            count++;
            add = rows[count].split("\t");
            count++;
            addLittles = rows[count].split("\t");
            count++;
            addBigs = rows[count].split("\t");
            count++;
        }

        let attNames = rows[count].split("\t");
        count++
        let atts = rows[count].split("\t");
        count++;
        let attLittles = rows[count].split("\t");
        count++;
        let attBigs = rows[count].split("\t");
        count++;
        if (flag) {
            data.push({
                "name":name,
                "sound":sound,
                "notch":notchs,
                "notchLittle":notchLittles,
                "notchBig":notchBigs,
                "tlk":tlks,
                "tlkLittle":tlkLittles,
                "tlkBig":tlkBigs,
                "soundNum":soundNum,
                "add":add,
                "addLittle":addLittles,
                "addBig":addBigs,
                "attName":attNames,
                "att":atts,
                "attLittle":attLittles,
                "attBig":attBigs
            });
        } else {
            data.push({
                "name":name,
                "sound":sound,
                "notch":notchs,
                "notchLittle":notchLittles,
                "notchBig":notchBigs,
                "tlk":tlks,
                "tlkLittle":tlkLittles,
                "tlkBig":tlkBigs,
                "attName":attNames,
                "att":atts,
                "attLittle":attLittles,
                "attBig":attBigs
            });
        }
    }
    let notchDiv = document.getElementById("notch");
    let trainDiv = document.getElementById("train");
    let checkDiv = document.getElementById("trainCheck");
    for (let i = 0; i < data.length; i++) {
        //ノッチ
        let notchTable = document.createElement("table");
        notchTable.setAttribute("border", "1");
        notchDiv.appendChild(notchTable);
        let nameTr = document.createElement("tr");
        notchTable.appendChild(nameTr);
        let nameTd = document.createElement("td");
        nameTr.appendChild(nameTd);
        let trainData = data[i];
        nameTd.setAttribute("colspan", trainData["notch"].length);
        nameTd.innerHTML = "<h3>" + trainData["name"] + "</h3>";
        nameTd.style.textAlign = "center";
        let soundTd = document.createElement("td");
        nameTr.appendChild(soundTd);
        soundTd.innerHTML = trainData["sound"];
        soundTd.style.textAlign = "center";

        let notchNameTr = document.createElement("tr");
        notchTable.appendChild(notchNameTr);
        for (let j = 0; j < trainData["notch"].length + 1; j++) {
            let td = document.createElement("td");
            notchNameTr.appendChild(td);
            if (j != 0) {
                td.innerHTML = j + "ノッチ";
            }
        }
        createTd(notchTable, "数値", trainData["notch"]);
        createTd(notchTable, "バイナリテキスト", trainData["notchLittle"]);
        createTd(notchTable, "16進数", trainData["notchBig"]);
        createTd(notchTable, "tlk", trainData["tlk"]);
        createTd(notchTable, "バイナリテキスト", trainData["tlkLittle"]);
        createTd(notchTable, "16進数", trainData["tlk"]);
        if (flag) {
            createTd(notchTable, "モーター音の番号", trainData["soundNum"]);
            createTd(notchTable, "加速力の倍率", trainData["add"]);
            createTd(notchTable, "バイナリテキスト", trainData["addLittle"]);
            createTd(notchTable, "16進数", trainData["addBig"]);
        }
        notchDiv.innerHTML += "<br>";

        //車両
        let trainTable = document.createElement("table");
        trainTable.setAttribute("border", "1");
        trainDiv.appendChild(trainTable);

        let trainNameTr = document.createElement("tr");
        trainTable.appendChild(trainNameTr);
        let trainNameTd = document.createElement("td");
        trainNameTr.appendChild(trainNameTd);
        trainNameTd.setAttribute("colspan", 4);
        trainNameTd.className = "trainName";
        trainNameTd.innerHTML = "<h3>" + trainData["name"] + "</h3>";
        trainNameTd.style.textAlign = "center";

        createAttTd(trainTable, ["数値", "バイナリテキスト", "16進数"], trainData);
        trainDiv.innerHTML += "<br>";

        //チェックボックス
        let label = document.createElement("label");
        checkDiv.appendChild(label);
        let checkbox = `<input type="checkbox" onchange='showTrain()' checked>` + trainData["name"] + `を表示<br>`;
        label.innerHTML = checkbox;
    }

    let allCheckButton = document.getElementById("allCheck");
    allCheckButton.setAttribute("onclick", "allCheck(0)");
}

function dataChange(value) {
    let select = value;
    document.getElementById("notch").innerHTML = "";
    document.getElementById("train").innerHTML = "";
    document.getElementById("trainCheck").innerHTML = "";
    let flag = true;
    if (select.value == "./LSdata.txt" || select.value == "./BSdata.txt") {
        flag = false;
    }
    init(select.value, flag);
    document.getElementById("binaryChkbox").checked = false;
}

window.onload = function() {
    init("./LSdata.txt", false);
}