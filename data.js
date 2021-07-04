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
                }
            }
        } else {
            for (let j = 0; j < 4; j++) {
                let td = document.createElement("td");
                tr.appendChild(td);
                if (j == 0) {
                    td.innerHTML = data["attName"][i-1];
                } else if (j == 1) {
                    td.innerHTML = data["att"][i-1];
                } else if (j == 2) {
                    td.innerHTML = data["attLittle"][i-1];
                } else if (j == 3) {
                    td.innerHTML = data["attBig"][i-1];
                }
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
    for (let i = 0; i < data.length; i++) {
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

        let trainTable = document.createElement("table");
        trainTable.setAttribute("border", "1");
        trainDiv.appendChild(trainTable);

        let trainNameTr = document.createElement("tr");
        trainTable.appendChild(trainNameTr);
        let trainNameTd = document.createElement("td");
        trainNameTr.appendChild(trainNameTd);
        trainNameTd.setAttribute("colspan", 4);
        trainNameTd.innerHTML = "<h3>" + trainData["name"] + "</h3>";
        trainNameTd.style.textAlign = "center";

        let attNameTr = document.createElement("tr");
        trainTable.appendChild(attNameTr);
        for (let j = 0; j < trainData["att"].length + 1; j++) {
            let td = document.createElement("td");
            attNameTr.appendChild(td);
            if (j != 0) {
                td.innerHTML = trainData["attName"][j-1];
            }
        }

        createAttTd(trainTable, ["数値", "バイナリテキスト", "16進数"], trainData);
        trainDiv.innerHTML += "<br>";
    }
}