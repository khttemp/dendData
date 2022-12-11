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

function createTd(table, data) {
    let tr = document.createElement("tr");
    table.appendChild(tr);
    for (let i = 0; i < data.length; i++) {
        let td = document.createElement("td");
        tr.appendChild(td);
        td.innerHTML = data[i];
        if (i == 0) {
            let imageTd = document.createElement("td");
            tr.appendChild(imageTd);
            let name = data[i].split(".smf")[0];
            imageTd.innerHTML = "<a href='./image/" + name + ".png' target='_blank' rel='noopener noreferrer'><img src='./image/" + name + ".png' width='200'></a>";
        }
        if (i == 2 && data[i] == "なし") {
            let tds = tr.getElementsByTagName("td");
            tds[1].innerHTML = "";
        }
    }
}

function init(value) {
    readTextFile(value);
    let rows = allText.split("\n");
    let modelTable = document.getElementById("modelTable");
    for (let i = 0; i < rows.length; i++) {
        let data = rows[i].split("\t");
        createTd(modelTable, data);
    }
}

window.onload = function() {
    init("./model.txt");
}