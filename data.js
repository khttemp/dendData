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
        if (title != "数値") {
            tr.className = "binary";
        }
        if (i == 0) {
            td.innerHTML = title
        } else {
            td.innerHTML = data[i-1];
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
            binary[i].style.display = "";
        }
        for (let i = 0; i < trainName.length; i++) {
            trainName[i].setAttribute("colspan", 4);
        }
    } else {
        for (let i = 0; i < binary.length; i++) {
            binary[i].style.display = "none";
        }
        for (let i = 0; i < trainName.length; i++) {
            trainName[i].setAttribute("colspan", 2);
        }
    }
}

function showTrain() {
    let checkDiv = document.getElementById("check");
    let checkboxList = checkDiv.getElementsByTagName("input");
    let notchDiv = document.getElementById("notch");
    let notchTable = notchDiv.getElementsByTagName("table");
    let trainDiv = document.getElementById("train");
    let trainTable = trainDiv.getElementsByTagName("table");
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
                notchTable[i].style.display = "";
                trainTable[i].style.display = "";
            }
        }
    }
}

window.onload = function() {
    readTextFile("./LSdata.txt");
    let rows = allText.split("\r\n");
    let count = 1;
    let mdlCnt = rows[0];
    let data = [];
    for (i = 0; i < mdlCnt; i++) {
        let name = rows[count];
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

        let attNames = rows[count].split("\t");
        count++
        let atts = rows[count].split("\t");
        count++;
        let attLittles = rows[count].split("\t");
        count++;
        let attBigs = rows[count].split("\t");
        count++;
        data.push({
            "name":name,
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
    let notchDiv = document.getElementById("notch");
    let trainDiv = document.getElementById("train");
    let checkDiv = document.getElementById("check");
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
        nameTd.setAttribute("colspan", trainData["notch"].length+1);
        nameTd.innerHTML = "<h3>" + trainData["name"] + "</h3>";
        nameTd.style.textAlign = "center";

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
        let checkbox = `<input type="checkbox" value="[` + trainData["name"] + `]を表示" onchange='showTrain()'>`;
        label.innerHTML = checkbox;
    }
}