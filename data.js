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

window.onload = function() {
    readTextFile("./data.txt");
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
            "attLittle":attLittles,
            "attBig":attBigs
        });
    }
    console.log(data);
}