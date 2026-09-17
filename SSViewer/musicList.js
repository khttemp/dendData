let allTextList;
let musicTableHeaderList = [
    "ステージ名",
    "BGMのindex",
    "保存されたBGM情報"
]

let musicNameList = [
    ["HX200", 0],
    ["E233", 0],
    ["E233", 1],
    ["TQ5050", 0],
    ["TQ5050", 1],
    ["TQ5000", 0],
    ["TQ5000", 1],
    ["TQ5000", 2],
    ["TQ300", 0],
    ["TQ300", 1],
    ["TQ300", 2],
    ["TQ8500", 0],
    ["TQ8500", 1],
    ["TQ8500Last", 0],
]

function uploadFile(inputElement) {
    document.getElementById("errorDiv").innerHTML = "";
    document.getElementById("musicListDataDiv").innerHTML = "";

    const reader = new FileReader();
    let [inputFile] = inputElement.files;

    reader.addEventListener("load", () => {
        try {
            let allBinaryList = new Uint8Array(reader.result);
            convertBinaryToText(allBinaryList, inputFile.name)
        } catch (error) {
            let errorDiv = document.getElementById("errorDiv");
            errorDiv.innerHTML = error;
            return;
        }
    }, false);

    if (inputFile) {
        reader.readAsArrayBuffer(inputFile);
    }
}

function convertBinaryToText(allBinaryList, filename){
    function getInt(inputBinary, index) {
        let binary = inputBinary.slice(index, index + 4);
        let intArray = new Int32Array(binary.buffer);
        return intArray[0];
    }
    let index = 4;

    let table = document.createElement("table");
    table.border = "1";
    document.getElementById("musicListDataDiv").appendChild(table);
    
    let headTr = document.createElement("tr");
    table.appendChild(headTr);
    for (let i = 0; i < musicTableHeaderList.length; i++) {
        let headTh = document.createElement("th");
        headTh.innerHTML = musicTableHeaderList[i];
        headTr.appendChild(headTh);
    }

    let saveMusicCount = getInt(allBinaryList, index);
    index += 4
    for (let i = 0; i < saveMusicCount; i++) {
        let dataTr = document.createElement("tr");
        table.appendChild(dataTr);

        let musicNameInfo;
        if (i < musicNameList.length) {
            musicNameInfo = musicNameList[i];
        } else {
            musicNameInfo = ["MODによるステージ", "-"];
        }
        for (let j = 0; j < musicNameInfo.length; j++) {
            let dataTd = document.createElement("td");
            dataTd.innerHTML = musicNameInfo[j];
            dataTr.appendChild(dataTd);
            if (j == 1) {
                dataTd.style.textAlign = "right";
                dataTd.style.paddingRight = "5px";
            }
        }

        let musicIndexTd = document.createElement("td");
        dataTr.appendChild(musicIndexTd);
        let saveMusicIndex = getInt(allBinaryList, index);
        if (saveMusicIndex < 0 || saveMusicIndex >= 10000) {
            musicIndexTd.innerHTML = "デフォルトのBGM";
        } else {
            musicIndexTd.innerHTML = "music_listの" + saveMusicIndex + "番目(index単位)";
            if (saveMusicIndex > 66) {
                musicIndexTd.innerHTML += "<br>（MODによって追加された枠の可能性あり）"
            }
        }
        musicIndexTd.style.textAlign = "center";
        index += 4
    }
}