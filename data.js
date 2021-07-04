function readTextFile(file){
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function (){
        if (rawFile.readyState === 4){
            if (rawFile.status === 200 || rawFile.status == 0){
                var allText = rawFile.responseText;
            }
        }
    };
    rawFile.send(null);
}

window.onload = function() {
    readTextFile("./data.txt");
    let rows = allText.split("\n");
    console.log(rows[0]);
    let count = 1;
    let mdlCnt = rows[0];
    let data = [];
    for (i = 0; i < mdlCnt; i++) {
        let name = rows[count];
        count++;
        let notchs = rows[count];
        count++;
        let notchLittles = rows[count];
        count++;
        let notchBigs = rows[count];
        count++;

        let attNames = rows[count];
        count++
        let attLittles = rows[count];
        count++;
        let attBigs = rows[count];
        data.push({
            "name":name,
            "notch":notch,
            "notchLittle":notchLittles,
            "notchBig":notchBigs,
            "attName":attNames,
            "attLittle":attLittles,
            "attBig":attBigs
        });
        console.log(data);
    }
}