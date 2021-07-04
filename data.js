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
        if (i == 0) {
            td.innerHTML = title
        } else {
            td.innerHTML = data[i-1];
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
    for (let i = 0; i < data.length; i++) {
        let notchTable = document.createElement("table");
        notchTable.setAttribute("border", "1");
        notchDiv.appendChild(notchTable);
        let nameTr = document.createElement("tr");
        notchTable.appendChild(nameTr);
        let nameTd = document.createElement("td");
        nameTr.appendChild(nameTd);
        let trainData = data[i];
        nameTd.setAttribute("colspan", trainData["notch"].length);
        nameTd.innerHTML = "<h1>" + trainData["name"] + "</h1>";

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
    }
}