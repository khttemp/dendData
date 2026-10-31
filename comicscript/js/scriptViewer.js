const trainIndexList = {
    "LS":[
        "H2000",
        "H8200",
        "H2300",
        "JR223",
        "21000R",
        "K800",
        "H7000",
        "DEKI",
        "TAKUMI",
        "K80",
        "S300"
    ],
    "BS":[
        "H2000",
        "K8000",
        "H8200",
        "UV21000",
        "H8008",
        "K2199",
        "K21XX",
        "H7001",
        "K800",
        "JR223"
    ],
    "CS":[
        "H2000",
        "H2800",
        "H8200",
        "HS9000",
        "KQ21XX",
        "JR2000",
        "Rapit",
        "Old_H2000",
        "Old_H8200",
        "Arban21000R",
        "K800",
        "H7001",
        "K8000",
        "H8000",
        "KQ2199",
        "JR223",
        "H2300",
        "AE86",
        "Deki3",
        "K80",
        "S300",
        "Yokohama",
        "S500"
    ],
    "RS":[
        "H2000",
        "Pano",
        "H8200",
        "Mu2000",
        "T50000",
        "T200",
        "DRC",
        "X200",
        "H4050",
        "H7011",
        "E233",
        "H2800",
        "HS9000",
        "KQ21XX",
        "JR2000",
        "Rapit",
        "Arban21000R",
        "K800",
        "H7001",
        "K8000",
        "H8000",
        "KQ2199",
        "JR223",
        "H2300",
        "AE86",
        "Deki3",
        "K80",
        "Yuri",
        "S300"
    ],
    "SS":[
        "H2000",
        "X200",
        "H4050",
        "H7011",
        "E233",
        "H8200",
        "TQ5050",
        "TQ5000",
        "TQ9001",
        "TQ300",
        "TQ8500",
        "Pano",
        "Mu2000",
        "T50000",
        "T200",
        "DRC",
        "H2800",
        "H9000",
        "KQ21XX",
        "JR2000",
        "Rapit",
        "K8000",
        "Arban21000R",
        "H8008",
        "KQ2199",
        "H2300",
        "JR223",
        "K800",
        "H7001",
        "K80",
        "Yuri",
        "AE86",
        "Deki",
        "MIZ1000",
        "KB1300",
    ]
};

function readComicScript(arrayBuffer) {
    document.getElementById("errorDiv").textContent = "";

    try {
        const scriptInfoList = convertBinaryToText(arrayBuffer);
        createTable(scriptInfoList);
        makeTooptip();
    } catch (error) {
        writeError("コミックスクリプト読込中エラー！");
        throw error;
    }
}

function convertBinaryToText(arrayBuffer) {
    const series = document.querySelector('input[name="series"]:checked').value;
    const trainList = trainIndexList[series];

    const scriptInfoList = []
    const headerInfoList = {};
    const viewBuffer = new DataView(arrayBuffer);

    let index = 0;
    const headerBinary = new Uint8Array(viewBuffer.buffer, index, 16)
    const header = new TextDecoder().decode(headerBinary);
    if (header != "DEND_COMICSCRIPT") {
        writeError("コミックスクリプトファイルではありません");
        throw new Error("コミックスクリプトファイルではありません");
    }
    index += 16
    index += 1;

    headerInfoList["headerImgList"] = [];
    const imgCnt = viewBuffer.getUint8(index);
    index += 1;
    for (let i = 0; i < imgCnt; i++) {
        const imgLen = viewBuffer.getUint8(index);
        index += 1;
        const imgNameBinary = new Uint8Array(viewBuffer.buffer, index, imgLen);
        const imgName = new TextDecoder().decode(imgNameBinary);
        headerInfoList["headerImgList"].push(imgName);
        index += imgLen;
    }

    headerInfoList["imgList"] = [];
    const imgSizeCnt = viewBuffer.getUint8(index);
    index += 1;
    for (let i = 0; i < imgSizeCnt; i++) {
        const imgIndex = viewBuffer.getUint8(index);
        const imgName = headerInfoList["headerImgList"][imgIndex];
        headerInfoList["imgList"].push(imgName);
        index += 1;
        index += 4*4;
    }

    headerInfoList["seList"] = [];
    const seCnt = viewBuffer.getUint8(index);
    index += 1;
    for (let i = 0; i < seCnt; i++) {
        const seLen = viewBuffer.getUint8(index);
        index += 1;
        const seNameBinary = new Uint8Array(viewBuffer.buffer, index, seLen);
        const seName = new TextDecoder().decode(seNameBinary);
        headerInfoList["seList"].push(seName);
        index += seLen;
        index += 1;
    }

    headerInfoList["bgmList"] = [];
    const bgmCnt = viewBuffer.getUint8(index);
    index += 1;
    for (let i = 0; i < bgmCnt; i++) {
        const bgmLen = viewBuffer.getUint8(index);
        index += 1;
        const bgmNameBinary = new Uint8Array(viewBuffer.buffer, index, bgmLen);
        const bgmName = new TextDecoder().decode(bgmNameBinary);
        headerInfoList["bgmList"].push(bgmName);
        index += bgmLen;
        index += 1 + 4 + 4;
    }
    index += 1;

    const comicDataCnt = viewBuffer.getUint16(index, true);
    index += 2;

    const cmdKeys = Object.keys(CMD);
    for (let i = 0; i < comicDataCnt; i++) {
        const cmdList = [];
        const cmdNum = viewBuffer.getUint16(index, true);
        cmdList.push(cmdKeys[cmdNum]);
        index += 2;

        const paramNum = viewBuffer.getUint8(index);
        index += 1;

        for (let j = 0; j < paramNum; j++) {
            const param = viewBuffer.getFloat32(index, true);
            const roundParam = Math.round((param * 10000)) / 10000;
            cmdList.push(roundParam);
            index += 4;
        }

        const cmdInfoList = [];
        for (let j = 0; j < cmdList.length; j++) {
            cmdInfoList.push({
                "info":cmdList[j],
                "numberMeaning":setNumerMeaning(series, trainList, headerInfoList, cmdList, cmdList[0], j)
            });
        }
        scriptInfoList.push(cmdInfoList)
    }
    return scriptInfoList;
}

function setNumerMeaning(series, trainList, headerInfoList, cmdList, cmd, idx) {
    let index = Number(cmdList[idx]);
    if (cmd == "CHK_TRAIN_TYPE" && idx == 2) {
        return `【${series}】${trainList[index]}`;
    } else if (cmd == "PlayComicBGM" && idx == 1) {
        return headerInfoList["bgmList"][index];
    } else if (cmd == "SetComic" && idx == 2) {
        return headerInfoList["imgList"][index];
    } else if (cmd == "PlayComicSE" && idx == 1) {
        return headerInfoList["seList"][index];
    } else if (cmd == "SET_MIKOSHI" && idx == 1) {
        return headerInfoList["imgList"][index];
    } else if (cmd == "BODY_AUDIO_PLAY" && idx == 2) {
        return headerInfoList["seList"][index];
    }
    return "";
}

function createTable(scriptInfoList) {
    const tableDataId = "scriptTableData";
    const dataRows = scriptInfoList.map(scriptInfo => {
        const dataRow = scriptInfo.map((cmd, index) =>
            index == 0 ?
            safeHtml`
                <td class="scriptList cmd-name cmd-property">${cmd.info}</td>
            ` :
            `${cmd.numberMeaning}` != "" ?
                safeHtml`
                    <td class="scriptList cmd-param cmd-property" data-title="${cmd.numberMeaning}">
                        ${cmd.info}
                    </td>
                ` :
                safeHtml`
                    <td class="scriptList">${cmd.info}</td>
                `
        );
        return safeHtml`<tr>${dataRow}</tr>`.toString();
    }).join("");

    document.getElementById(tableDataId).innerHTML = dataRows;
}

function makeTooptip() {
    const cmdNameItems = document.querySelectorAll(".cmd-name");
    const cmdParamItems = document.querySelectorAll(".cmd-param");
    const tooltip = document.getElementById('custom-tooltip');

    cmdNameItems.forEach(item => {
        item.addEventListener('mouseenter', (event) => {
            const description = CMD[event.target.textContent].description.replaceAll("<br>", "\n");
            tooltip.textContent = description;
            tooltip.classList.add("active");
        });

        item.addEventListener('mousemove', (event) => {
            const offsetX = 20;
            const offsetY = 20;

            tooltip.style.left = `${event.pageX + offsetX}px`;
            tooltip.style.top = `${event.pageY + offsetY}px`;
        });

        item.addEventListener('mouseleave', () => {
            tooltip.textContent = "";
            tooltip.classList.remove("active");
        });
    });

    cmdParamItems.forEach(item => {
        item.addEventListener('mouseenter', (event) => {
            const title = event.target.dataset.title;
            tooltip.textContent = title;
            tooltip.classList.add("active");
        });

        item.addEventListener('mousemove', (event) => {
            const offsetX = 20;
            const offsetY = 20;

            tooltip.style.left = `${event.pageX + offsetX}px`;
            tooltip.style.top = `${event.pageY + offsetY}px`;
        });

        item.addEventListener('mouseleave', () => {
            tooltip.textContent = "";
            tooltip.classList.remove("active");
        });
    });
}

function writeError(error) {
    document.getElementById("errorDiv").textContent += error;
    document.getElementById("errorDiv").textContent += "\n";
}

function init() {
    document.getElementById("radioSS").checked = true;
}

init();

document.getElementById("fileUploadBtn").addEventListener("click", () => {
    document.getElementById("file").click();
});

document.getElementById("file").addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) return;

    document.getElementById("fileName").textContent = file.name;

    const reader = new FileReader();
    reader.onload = (e) => {
        const arrayBuffer = e.target.result;

        try {
            readComicScript(arrayBuffer)
        } catch (error) {
            writeError(error.stack);
        }
    };

    reader.readAsArrayBuffer(file);
    event.target.value = "";
});