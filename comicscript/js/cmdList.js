const originCmdInfoList = [];

function makeCmdInfoList() {
    const cmdKeys = Object.keys(CMD);
    cmdKeys.forEach((cmdKey) => {
        const cmdObj = CMD[cmdKey];

        let cmdSeries = "comic";
        if (cmdObj["description"] == NOT_DEFINED) {
            cmdSeries = "notDefined";
        }
        if (cmdObj["description"].indexOf("【モデルバイナリ】") != -1) {
            cmdSeries = "model";
        }

        const cmdUsedList = [];
        if (cmdObj["LS_comic"] != undefined || cmdObj["LS_bin"] != undefined) {
            cmdUsedList.push("LS");
        } else {
            cmdUsedList.push("");
        }
        if (cmdObj["BS_comic"] != undefined || cmdObj["BS_bin"] != undefined) {
            cmdUsedList.push("BS");
        } else {
            cmdUsedList.push("");
        }
        if (cmdObj["CS_comic"] != undefined || cmdObj["CS_bin"] != undefined) {
            cmdUsedList.push("CS");
        } else {
            cmdUsedList.push("");
        }
        if (cmdObj["RS_comic"] != undefined || cmdObj["RS_bin"] != undefined) {
            cmdUsedList.push("RS");
        } else {
            cmdUsedList.push("");
        }
        if (cmdObj["SS_comic"] != undefined || cmdObj["SS_cmn"] != undefined) {
            cmdUsedList.push("SS");
        } else {
            cmdUsedList.push("");
        }

        const cmdUsableList = [];
        const lsMatch = /^【.*LS.*】/
        const bsMatch = /^【.*BS.*】/
        const csMatch = /^【.*CS.*】/
        const rsMatch = /^【.*RS.*】/
        const ssMatch = /^【.*SS.*】/
        if (lsMatch.test(cmdObj["description"])) {
            cmdUsableList.push("LS");
        }
        if (bsMatch.test(cmdObj["description"])) {
            cmdUsableList.push("BS");
        }
        if (csMatch.test(cmdObj["description"])) {
            cmdUsableList.push("CS");
        }
        if (rsMatch.test(cmdObj["description"])) {
            cmdUsableList.push("RS");
        }
        if (ssMatch.test(cmdObj["description"])) {
            cmdUsableList.push("SS");
        }

        const cmdInfo = {
            "num": cmdObj["num"],
            "name": cmdKey,
            "description": cmdObj["description"].split("<br>"),
            "cmdUsedList": cmdUsedList,
            "cmdUsableList": cmdUsableList,
            "cmdSeries": cmdSeries
        };

        originCmdInfoList.push(cmdInfo);
    });
}

function createTable(cmdInfoList) {
    const tableDataId = "cmdTableData";
    const dataRows = cmdInfoList.map(cmdInfo =>
        `
        <tr>
            <td>${cmdInfo.num}</td>
            <td>${cmdInfo.name}</td>
            <td>${cmdInfo.description.map(desc => `<div>${desc}</div>`).join("")}</td>
            ${cmdInfo.cmdUsedList.map(cmdUsed => `<td>${cmdUsed}</td>`).join("")}
        </tr>
        `
    ).join("");

    document.getElementById(tableDataId).innerHTML = dataRows;
}

function filterCmdTable() {
    const modelCheckCheck = document.getElementById("modelCheck").checked;
    const notDefinedCheck = document.getElementById("notDefined").checked;
    const allNotUsedCheck = document.getElementById("allNotUsed").checked;
    const lsCheck = document.getElementById("LSCheck").checked;
    const bsCheck = document.getElementById("BSCheck").checked;
    const csCheck = document.getElementById("CSCheck").checked;
    const rsCheck = document.getElementById("RSCheck").checked;
    const ssCheck = document.getElementById("SSCheck").checked;
    const cmdName = document.getElementById("cmdName").value.trim();

    const filteredCmdInfoList = originCmdInfoList.filter(cmdInfo => {
        if (!modelCheckCheck && !allNotUsedCheck && !notDefinedCheck &&
            !lsCheck && bsCheck && !csCheck && !rsCheck && !ssCheck &&
            !cmdName) {
            return true;
        }

        let modelCheckFlag = true;
        if (modelCheckCheck) {
            if (cmdInfo.cmdSeries == "model") {
                modelCheckFlag = false;
            }
        }
        let notDefinedFlag = true;
        if (notDefinedCheck) {
            if (cmdInfo.cmdSeries == "notDefined") {
                notDefinedFlag = false;
            }
        }
        let allNotUsedFlag = true;
        if (allNotUsedCheck) {
            if (cmdInfo.cmdUsedList.join("") == "") {
                allNotUsedFlag = false;
            }
        }
        let lsFlag = true;
        if (lsCheck) {
            if (cmdInfo.cmdUsableList.indexOf("LS") == -1) {
                lsFlag = false;
            }
        }
        let bsFlag = true;
        if (bsCheck) {
            if (cmdInfo.cmdUsableList.indexOf("BS") == -1) {
                bsFlag = false;
            }
        }
        let csFlag = true;
        if (csCheck) {
            if (cmdInfo.cmdUsableList.indexOf("CS") == -1) {
                csFlag = false;
            }
        }
        let rsFlag = true;
        if (rsCheck) {
            if (cmdInfo.cmdUsableList.indexOf("RS") == -1) {
                rsFlag = false;
            }
        }
        let ssFlag = true;
        if (ssCheck) {
            if (cmdInfo.cmdUsableList.indexOf("SS") == -1) {
                ssFlag = false;
            }
        }
        let cmdNameFlag = true;
        if (cmdName) {
            if (cmdInfo.name.toUpperCase().indexOf(cmdName.toUpperCase()) == -1) {
                cmdNameFlag = false;
            }
        }

        if (modelCheckFlag &&
            notDefinedFlag &&
            allNotUsedFlag &&
            lsFlag &&
            bsFlag &&
            csFlag &&
            rsFlag &&
            ssFlag &&
            cmdNameFlag) {
            return true;
        }
    });

    return filteredCmdInfoList;
}

function applyFilter() {
    const filteredCmdInfoList = filterCmdTable();
    createTable(filteredCmdInfoList);

    document.getElementById("cmdCountDiv").innerHTML = `${filteredCmdInfoList.length}件発見`
}

function init() {
    // init checkbox
    document.getElementById("modelCheck").checked = true;
    document.getElementById("notDefined").checked = true;
    document.getElementById("allNotUsed").checked = false;

    makeCmdInfoList();
    applyFilter();

    // checkbox
    document.getElementById("modelCheck").addEventListener("change", applyFilter);
    document.getElementById("notDefined").addEventListener("change", applyFilter);
    document.getElementById("allNotUsed").addEventListener("change", applyFilter);
    document.getElementById("LSCheck").addEventListener("change", applyFilter);
    document.getElementById("BSCheck").addEventListener("change", applyFilter);
    document.getElementById("CSCheck").addEventListener("change", applyFilter);
    document.getElementById("RSCheck").addEventListener("change", applyFilter);
    document.getElementById("SSCheck").addEventListener("change", applyFilter);
    // input
    document.getElementById("cmdName").addEventListener("keyup", applyFilter);
}

init();