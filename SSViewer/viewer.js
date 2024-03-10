let allTextList;
let searchTextList = [
    ["Story:", "storyTableBody", "ステージ名"],
	["Track:", "trackTableBody", "台車モデル"],
	["Dir:", "dirTableBody", "基本の向き"],
	["COMIC_DATA", "comicDataTableBody", "参照するcomicscript"],
	["COMIC_IMAGE", "comicImageTableBody", "参照する画像"],
	["COMIC_SE", "comicSETableBody", "参照するSE"],
	["RailPos:", "railPosTableBody", "デフォルトのレール位置"],
	["FreeRun:", "freeRunTableBody", "試運転のレール位置"],
	["VSPos:", "vsPosTableBody", "対戦のレール位置"],
	["FadeImage:", "fadeImageTableBody", "読み込み中の画像"],
	["StageRes:", "stageResTableBody", "路線別画像データ"],
	["SetTexInfo:", "setTexInfo", "画像設定情報"],
	["STCnt:", "stCntTableBody", "駅名情報"],
	["CPU:", "cpuTableBody", "ＣＰＵ切り替え"],
	["ComicScript:", "comicScriptTableBody", "comicscriptリスト"],
	["RainChecker:", "rainCheckerTableBody", "雨イベントリスト"],
	["DosanInfo:", "dosanInfoTableBody", "土讃線スペシャルリスト"],
	["MdlCnt:", "mdlCntTableBody", "モデルリスト"],
	["RailCnt:", "railCntTableBody", "レールデータ"],
	["RailPri:", "railPriTableBody", "優先レール設定"],
	["BtlPri:", "btlPriTableBody", "バトル用の優先レール設定"],
	["NoDriftRail:", "NoDriftRailTableBody", "ドリフト除外"],
	["AmbCnt:", "ambCntTableBody", "AMBデータ"],
];
let railModelList = {
    "1Rail_50_Only": 1,
    "1Rail_Den_100": 1,
    "1Rail_Den_100_Konkuri": 1,
    "1Rail_Den_100_Under": 1,
    "1Rail_Den_100W": 1,
    "1Rail_Den_25": 1,
    "1Rail_Den_25_Konkuri": 1,
    "1Rail_Den_25_Under": 1,
    "1Rail_Den_25W": 1,
    "1Rail_Den_50": 1,
    "1Rail_Den_50_Konkuri": 1,
    "1Rail_Den_50_Under": 1,
    "1Rail_Den_50W": 1,
    "1Rail_HQ_50Only": 1,
    "1Rail_HQ_Konkuri100": 1,
    "1Rail_HQ_Konkuri25": 1,
    "1Rail_HQ_Konkuri50": 1,
    "1Rail_Kin_100": 1,
    "1Rail_Kin_25": 1,
    "1Rail_Kin_50": 1,
    "1Rail_Konkuri100": 1,
    "1rail_mina_under_l": 1,
    "1rail_mina_under_r": 1,
    "1Rail_Takara100Only": 1,
    "1Rail_Takara25Only": 1,
    "1Rail_Takara50Only": 1,
    "1rail_tq_12_5": 1,
    "1Rail_TQ_Under": 1,
    "1Rail_TQ_Under_25": 1,
    "1Rail_TQ_Under2": 1,
    "1Rail_TQ_Under3": 1,
    "1Rail_TQ_Under4": 1,
    "1Rail_TQ_Under4_50": 1,
    "1Rail_TQ_Under5": 1,
    "1Rail_TQ_Under5_50": 1,
    "2Rail_Bridge50_Miman": 2,
    "2Rail_Den_100": 2,
    "2Rail_Den_100_Konkuri": 2,
    "2Rail_Den_100_Under": 2,
    "2Rail_Den_100_Under2": 2,
    "2Rail_Den_100_Under3": 2,
    "2Rail_Den_100_Under4": 2,
    "2Rail_Den_100_Under5": 2,
    "2Rail_Den_100_Under6": 2,
    "2Rail_Den_100_Under7": 2,
    "2Rail_Den_100_Wall": 2,
    "2Rail_Den_25": 2,
    "2Rail_Den_25_H": 2,
    "2Rail_Den_25_H2": 2,
    "2Rail_Den_25_Konkuri": 2,
    "2Rail_Den_50": 2,
    "2Rail_Den_50_Only": 2,
    "2Rail_Den_50_Wall": 2,
    "2Rail_DenBridge138": 2,
    "2Rail_HQ50_Only": 2,
    "2Rail_Kin_100": 2,
    "2Rail_Kin_100_Wall": 2,
    "2Rail_Kin_25": 2,
    "2Rail_Kin_25_H": 2,
    "2Rail_Kin_50": 2,
    "2Rail_Kin_50_Wall": 2,
    "2Rail_Mina_100_Under": 2,
    "2Rail_Mina_100_UnderJari": 2,
    "2Rail_Mina_Under": 2,
    "2Rail_Takara100Only": 2,
    "2Rail_Takara25Only": 2,
    "2Rail_Takara50Only": 2,
    "2Rail_TakaraWall100": 2,
    "2Rail_TakaraWall50": 2,
    "2Rail_TQ_100_Bridge": 2,
    "2Rail100Only": 2,
    "2Rail25Only": 2,
    "OP1Rail": 1,
    "OP2Rail": 2,
}
let railCntToName = {
    1: "単線",
    2: "複線"
}
let railModelKeyList = Object.keys(railModelList);
let railModelNameList = [];
for (let railKey of railModelKeyList) {
    railModelNameList.push(railKey.toLowerCase());
}

let ambModelOriginList = [
    "1Rail_HQ_Konkuri100_AMB",
    "1Rail_HQ_Konkuri25_AMB",
    "1Rail_HQ_Konkuri50_AMB",
    "1Rail_Kin_100_AMB",
    "1Rail_Kin_25_AMB",
    "1Rail_Kin_50_AMB",
    "2Rail_Den_100_AMB",
    "2Rail_Den_25_AMB",
    "2Rail_Den_50_AMB",
    "2Rail_Kin_100_AMB",
    "2Rail_Kin_25_AMB",
    "2Rail_Kin_50_AMB",
    "AMB_1Rail_Den_100",
    "AMB_1Rail_Den_100_Under",
    "AMB_1Rail_Den_25",
    "AMB_1Rail_Den_25_Under",
    "AMB_1Rail_Den_50",
    "AMB_1Rail_Den_50_Konkuri",
    "AMB_1Rail_Den_50_Under",
    "AMB_1Rail_Den_50W",
    "AMB_1Rail_Kin_100",
    "AMB_1Rail_Kin_25",
    "AMB_1Rail_Kin_50",
    "AMB_1RAIL_UNDER_IN",
    "AMB_2Rail100Only",
    "AMB_3300Body",
    "AMB_AMI",
    "AMB_APART00",
    "AMB_APART01",
    "AMB_BigEkiue",
    "AMB_BILLS00",
    "AMB_BK_Block",
    "AMB_BLACK_BOX2",
    "AMB_BLACK_CHU",
    "AMB_BlackCube",
    "AMB_BLACKWall",
    "AMB_Block",
    "AMB_Block_BK",
    "AMB_Block_Under",
    "AMB_BriBlock",
    "AMB_Bridgh_Hashira",
    "AMB_Bridgh_W_Hashira",
    "AMB_CHIKA_IN",
    "AMB_DANCHI00",
    "AMB_DenWall",
    "AMB_DenWallOnly",
    "AMB_DOTE_Left",
    "AMB_DOTE_Right",
    "AMB_DriftBlock",
    "AMB_Ekihyo",
    "AMB_Ekihyo_Reg",
    "AMB_Ekihyo_Tate",
    "AMB_Ekiue",
    "AMB_EleBox",
    "AMB_ES",
    "AMB_ES_LONG",
    "AMB_Floor50",
    "AMB_HARF_TONNEL",
    "AMB_HARF_TONNELE_IN",
    "AMB_HarfTonnel_100",
    "AMB_HIGHBILL_00",
    "AMB_Hodokyo",
    "AMB_HomeSideSement",
    "AMB_HomeSideSement2",
    "AMB_HomeSideSement3",
    "AMB_HQ_HumikiriObj",
    "AMB_HQ_KasenLong0",
    "AMB_HQ_RailStop",
    "AMB_HQ_YANE0",
    "AMB_HQ_YANE1",
    "AMB_HQ_YANE2",
    "AMB_HQ_YANE3",
    "AMB_HUMIKIRI_ROAD_25",
    "AMB_HumikiriObj",
    "AMB_hutako_box",
    "AMB_Hutako_IRON",
    "AMB_Ichigao",
    "AMB_JARI_100",
    "AMB_JARI_HQ_100",
    "AMB_JARI_ONLY",
    "AMB_Kaidan",
    "AMB_Kaidan2",
    "AMB_Kaidan3",
    "AMB_Kaidan4",
    "AMB_KaidanLong",
    "AMB_KAISATU",
    "AMB_Kasen_Gurd",
    "AMB_Kasenchu_1Rail",
    "AMB_Kasenchu_Center",
    "AMB_Kasenchu_Left",
    "AMB_Kasenchu_Long0",
    "AMB_Kasenchu_Long1",
    "AMB_Kasenchu_Long2",
    "AMB_Kasenchu_MEI00",
    "AMB_Kasenchu_Short",
    "AMB_Kasenchu_TQ2",
    "AMB_Kasenchu_TQ3",
    "AMB_KILL_STEN",
    "AMB_KONBINI_MAN",
    "AMB_KoukaRail",
    "AMB_LANDBRIDGE",
    "AMB_LANDBRIDGE02",
    "AMB_LEAF",
    "AMB_LIGHT_D4_4",
    "AMB_MANSYON_M",
    "AMB_MANSYON_M2",
    "AMB_MANSYON_S",
    "AMB_MetalBox",
    "AMB_MetalBox_50",
    "AMB_Mina_Hole",
    "AMB_MINA_ST_WALL",
    "AMB_Mina_Tenjo",
    "AMB_Mina_Wall",
    "AMB_Mina_Wall2",
    "AMB_Mina_Wall3",
    "AMB_MinaIn",
    "AMB_MinaInMirrar",
    "AMB_MM_Ekihyo",
    "AMB_MONO_REG",
    "AMB_MONO_REGW",
    "AMB_MONO100",
    "AMB_MOTO_DOOM",
    "AMB_MOTO_EXIT",
    "AMB_MOTO_LIGHT",
    "AMB_MOTO_METAL",
    "AMB_MOTO_WALL",
    "AMB_Nagatuta",
    "AMB_RAIL",
    "AMB_RAIL_WALL",
    "AMB_RailBlock",
    "AMB_RailMillerCut",
    "AMB_RailMillerCut2",
    "AMB_RailStop",
    "AMB_RAILWOOD",
    "AMB_RAILWOOD50",
    "AMB_RAIN",
    "AMB_RAIN_WIDE",
    "AMB_RANKAN",
    "AMB_RANKAN1",
    "AMB_Rankan2",
    "AMB_Rankan3",
    "AMB_RikkyoFood",
    "AMB_RikkyoOnly",
    "AMB_RikkyoS",
    "AMB_RikkyoS2",
    "AMB_Room",
    "AMB_Saginuma",
    "AMB_SAKU",
    "AMB_SAKU_YE",
    "AMB_Sekkin",
    "AMB_SHIBU_ARCH",
    "AMB_SHIBU_FLOOR",
    "AMB_SHIBU_HOME",
    "AMB_SHIBU_KANBAN",
    "AMB_SHIBU_SUKIMA",
    "AMB_SHIBU_TENJO0",
    "AMB_SHIBU_TENJO1",
    "AMB_SHIBU_YANE",
    "AMB_ShibuKanban",
    "AMB_Shibuya_Wall",
    "AMB_ShibuyaWall",
    "AMB_SPOT_LIGHT",
    "AMB_ST_EXIT",
    "AMB_ST_HASHIGO",
    "AMB_ST_HASHIRA",
    "AMB_ST_HASHIRA1",
    "AMB_ST_KAIDAN_D4",
    "AMB_ST_UP",
    "AMB_ST_WALL",
    "AMB_Stop",
    "AMB_SYAKO_LIGHT",
    "AMB_SYAKO_W_LIGHT",
    "AMB_TakaraTekkyo0",
    "AMB_TakaraTekkyo1",
    "AMB_TakaraTekkyo2",
    "AMB_Takatu_IRON",
    "AMB_TakaWall",
    "AMB_TONNELE_IN",
    "AMB_TONNELE100",
    "AMB_TOWN00",
    "AMB_Toyo_Kasenchu",
    "AMB_TQ_Bridgh",
    "AMB_TQ_Ele",
    "AMB_TQ_Exit",
    "AMB_TQ_HomeNo",
    "AMB_TQ_Jihanki",
    "AMB_TQ_Kaidan1",
    "AMB_TQ_Kaidan2",
    "AMB_TQ_Kaidan3",
    "AMB_TQ_Kasenchu_Big",
    "AMB_TQ_RailWall25",
    "AMB_TQ_Sheet1",
    "AMB_TQ_Sheet2",
    "AMB_TQ_Sheet3",
    "AMB_TQ_TimeBord",
    "AMB_TQ_Wall0",
    "AMB_TQ_Wall1",
    "AMB_TQ_Wall2",
    "AMB_TQ_Wall3",
    "AMB_TQ_Wall4",
    "AMB_TQLight",
    "AMB_TQLightOnly",
    "AMB_TQLightOnlyW",
    "AMB_TQSignal0",
    "AMB_TQSignalBlue",
    "AMB_TQSignalOneB",
    "AMB_TQSignalOneY",
    "AMB_TQSignalYellow",
    "AMB_TrackMdl",
    "AMB_TREES_D4",
    "AMB_TREES2_D4",
    "AMB_UNDER_HASHIRA",
    "AMB_UNDER_HASHIRA2",
    "AMB_UNDER_HASHIRA3",
    "AMB_UNDER_HASHIRA4",
    "AMB_UNDER_IN",
    "AMB_UnderIn",
    "AMB_UnderLight100",
    "AMB_UnderWall",
    "AMB_Wnd",
    "AMB_YOUGA_IN",
    "Aobadai",
    "basha_wall",
    "bri_under_50",
    "bri_under_HQ_50",
    "CenterIron",
    "chuo_rinkan_box",
    "chuo_rinkan_lastwall",
    "chuo_rinkan_railblock",
    "Dote_L",
    "Dote_R",
    "GroundFlash",
    "HQ_Benchi0",
    "HQ_Benchi1",
    "HQ_Ekihyo",
    "HQ_HOME_S1",
    "HQ_HOME_S2",
    "HQ_HOME_S3",
    "HQ_HOME_W3",
    "HQ_HOME1",
    "HQ_HOME2",
    "HQ_HOME3",
    "HQ_Kasenchu0",
    "HQ_Kasenchu1",
    "HQ_Kasenchu2",
    "HQ_Kasenchu3",
    "hq_kouka_wall",
    "HQ_LEDBORD",
    "hq_rail_saku",
    "HQ_TakaraBox",
    "HQBigUnderRailBlock",
    "HQHomeYOnly0",
    "HQHomeYOnly1",
    "HQUnderRailBlock",
    "mina_ele",
    "NagatutaST",
    "rail_floor",
    "rail_only_50",
    "rail_saku",
    "RailEnd",
    "RailSaku",
    "RailSaku2",
    "renga_wall_st",
    "Rikkyo_S",
    "Rikkyo_S2",
    "sibuya_hashira",
    "sibuya_hashira_only",
    "Signal_HQ_Y",
    "Signal_Mini",
    "Signal_Syuppatu",
    "Signale_00",
    "Signale_01",
    "Signale_02",
    "Signale_GG",
    "st_floor",
    "st_floor_big",
    "ST_Iron8",
    "ST_IronHashira",
    "ST_IronHashira2",
    "ST_IronHashira3",
    "ST_Light100",
    "ST_Light25",
    "st_saku",
    "st_saku_only",
    "taka_hashira",
    "takara_kanban",
    "Takara1RailWall",
    "TakaraST_FloorSten",
    "TakaraST_Hashira",
    "TakaraST_Hashira2",
    "TakaraST_Home2",
    "TakaraST_Iron0",
    "TakaraST_Iron1",
    "TakaraSTWall0",
    "TakaraSTWall1",
    "TakaraSTWall2",
    "TakaraWall_Left",
    "TakaraWall_Right",
    "takatu_st",
    "takatu_st_none",
    "tama_wall_parts",
    "tama_wall_parts_last",
    "tamagawa_wall",
    "ToyoWall",
    "ToyoWallEnd",
    "tq_amb_wall",
    "TQ_Eda_Hashira",
    "TQ_Eda_Iron",
    "TQ_Eda_Yane",
    "tq_hutako",
    "tq_hutako_grass",
    "tq_hutako_yane",
    "tq_hutako_yane_only",
    "tq_hutako2",
    "tq_hutako3",
    "tq_hutako4",
    "tq_kasenchu2",
    "tq_kouka",
    "tq_kouka_wall",
    "tq_light",
    "tq_light_stencil",
    "TQ_Obj0",
    "TQ_Obj1",
    "TQ_Obj2",
    "TQ_Rankan50",
    "TQ_ST_Hashira",
    "TQ_ST_Hashira1",
    "tq_st_tile_wall",
    "tq_st_tile_wall2",
    "tq_st_wall",
    "tq_st_wall_s",
    "tq_st_wall2",
    "tq_st_wall3",
    "tq_st_wall3_15",
    "tq_st_wall4",
    "TQ_Tenjo",
    "TQ_Tenjo2",
    "TQ_Tenjo3",
    "TQ_TenjoRoof",
    "TQ_TenjoRoofWhite",
    "tq_under_wall",
    "tq_w_wall",
    "TQ_Yane_Big",
    "TQ_Yane_Big1",
    "tq_yane_center",
    "TQ_Yane00",
    "TQ_Yane01",
    "TQHome0",
    "TQHome1",
    "TQHome2",
    "TQHomeFloorOnly",
    "TQHomeFloorOnly50",
    "TQHomeFloorSementOnly",
    "TQHomeSten",
    "TQHomeW0",
    "TQHomeW1",
    "TQHomeW2",
    "TQHomeYOnly0",
    "TQHomeYOnly1",
    "TQKonkuriFloor",
    "TQStencilFloor",
    "TQUnderRailBlock",
    "umeda_floor_big",
    "umeda_home_sement",
    "umeda_tenjo",
    "umeda_tenjo_big",
    "UmedaIron0",
    "UmedaIron1",
    "UmedaStop",
    "white_wall_st",
    "Yane_W",
    "Yane_W2",
    "YaneBig_Saku1",
    "YaneBig_Saku2",
    "YaneBig_Saku3"
]
let ambModelList = [];
for (let ambName of ambModelOriginList) {
    ambModelList.push(ambName.toLowerCase());
}

var progressStatus = 0;

let texInfoList = [];
let modelList = [];
let ambList = [];

window.addEventListener('load', () => {
    initTable();

    let file = document.getElementById("file");
    file.addEventListener("change", () => {
        const reader = new FileReader();
        let [inputFile] = document.getElementById("file").files;

        reader.addEventListener("load", async () => {
            let tableDiv = document.getElementById("tableDiv");
            tableDiv.style.display = "none";
            allTextList = reader.result.split("\n").map(m => m.trim());
            try {
                if (!readStageData()) {
                    file.value = "";
                }
            } catch (error) {
                let errorDiv = document.getElementById("errorDiv");
                let stackList = error.stack.split("\n");
                let errorLine = stackList[1];
                let errorNum = errorLine.substring(errorLine.indexOf("viewer.js"), errorLine.length - 1);
                errorDiv.innerHTML = `${errorNum}：${error}`;
                let tableDiv = document.getElementById("tableDiv");
                tableDiv.style.display = "inline";
            }
        }, false);

        if (inputFile) {
            reader.readAsText(inputFile);
        }
    });
});

function findText(t) {
    let count = 0;
    for (const text of allTextList) {
        if (text.includes(t)) {
            return count;
        }
        count++;
    }
    return -1;
}
function initTable() {
    let tableDiv = document.getElementById("tableDiv");
    tableDiv.innerHTML = "";
    for (let i = 0; i < searchTextList.length; i++) {
        let div = document.createElement("div");
        tableDiv.appendChild(div);
        let titleDiv = document.createElement("div");
        div.appendChild(titleDiv);
        let table = document.createElement("table");
        div.appendChild(table);
        table.border = "1";
        table.id = searchTextList[i][1];
    }
    let errorDiv = document.getElementById("errorDiv");
    errorDiv.innerHTML = "";
}
function getProgressPer(start, end, count) {
    let diff = end - start;
    return diff / count;
}
async function setProgress(value) {
    let loader = document.getElementById("progress");
    loader.style.width = `${value * 100}%`;
    await sleep(1);
}
async function sleep(miliseconds) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, miliseconds)
    });
}
function readTbl(str) {
    let newArray = [];
    if (str.length > 1 && str.indexOf("//") != 0) {
        let array = str.split("\t").filter(e=>e);
        for (let i = 0; i < array.length; i++) {
            let element = array[i];
            if (element.indexOf("//") == 0) {
                continue;
            }
            newArray.push(element);
        }
    }
    return newArray;
}
async function readStageData() {
    try {
        initTable();

        for (let i = 0; i < searchTextList.length; i++) {
            await setProgress(i / searchTextList.length);
            let tableBody = document.getElementById(searchTextList[i][1]);
            let div = tableBody.parentNode.getElementsByTagName("div")[0];
            div.innerHTML = `<h3 style="margin-bottom:0px;">${searchTextList[i][2]}（${searchTextList[i][0]}）</h3>`;

            let index = findText(searchTextList[i][0]);
            if (index == -1) {
                // Track: 存在しない場合
                if (i == 1) {
                    setTrack(tableBody, 1, false);
                    continue;
                }
                // Dir: 存在しない場合
                else if (i == 2) {
                    setDir(tableBody, 1, false);
                    continue;
                }
                // BtlPri: 存在しない場合
                else if (i == 20) {
                    setBtlPri(tableBody, []);
                    continue;
                }
                // NoDriftRail: 存在しない場合
                else if (i == 21) {
                    setNoDriftRail(tableBody, []);
                    continue;
                }
                else {
                    let errorDiv = document.getElementById("errorDiv");
                    errorDiv.innerHTML = `${searchTextList[i][0]}を探せません`;
                    return false;
                }
            }
            
            // Story:
            if (i == 0) {
                let array = readTbl(allTextList[index]);
                let story = array[1];
                setStory(tableBody, story);
            }
            // Track:
            else if (i == 1) {
                let array = readTbl(allTextList[index]);
                let num = Number(array[1]);
                setTrack(tableBody, num);
            }
            // Dir:
            else if (i == 2) {
                let array = readTbl(allTextList[index]);
                let num = Number(array[1]);
                setDir(tableBody, num);
            }
            // COMIC_DATA
            else if (i == 3) {
                let array = readTbl(allTextList[index]);
                let cnt = Number(array[1]);
                let realCount = 0;
                let comicDataList = [];
                if (cnt > 0) {
                    for (let c = 0; ; c++) {
                        let dataArray = readTbl(allTextList[index + 1 + c]);
                        if (dataArray.length > 0) {
                            comicDataList.push(dataArray[0]);
                            realCount++;
                        }
                        if (realCount >= cnt) {
                            break;
                        }
                    }
                }
                countCheck("COMIC_DATA", comicDataList, cnt);
                setComicData(tableBody, "comic_bin", comicDataList);
            }
            // COMIC_IMAGE
            else if (i == 4) {
                let array = readTbl(allTextList[index]);
                let cnt = Number(array[1]);
                let realCount = 0;
                let comicDataList = [];
                if (cnt > 0) {
                    for (let c = 0; ; c++) {
                        let dataArray = readTbl(allTextList[index + 1 + c]);
                        if (dataArray.length > 0) {
                            comicDataList.push(dataArray[0]);
                            realCount++;
                        }
                        if (realCount >= cnt) {
                            break;
                        }
                    }
                }
                countCheck("COMIC_IMAGE", comicDataList, cnt);
                setComicData(tableBody, "comic_img", comicDataList);
            }
            // COMIC_SE
            else if (i == 5) {
                let array = readTbl(allTextList[index]);
                let cnt = Number(array[1]);
                let realCount = 0;
                let comicDataList = [];
                if (cnt > 0) {
                    for (let c = 0; ; c++) {
                        let dataArray = readTbl(allTextList[index + 1 + c]);
                        if (dataArray.length > 0) {
                            comicDataList.push(dataArray[0]);
                            realCount++;
                        }
                        if (realCount >= cnt) {
                            break;
                        }
                    }
                }
                countCheck("COMIC_SE", comicDataList, cnt);
                setComicData(tableBody, "comic_se", comicDataList);
            }
            // RailPos:
            else if (i == 6) {
                let array = readTbl(allTextList[index]);
                let cnt = Number(array[1]);
                let realCount = 0;
                let railDataList = [];
                if (cnt > 0) {
                    for (let c = 0; ; c++) {
                        let railArray = readTbl(allTextList[index + 1 + c]);
                        if (railArray.length > 0) {
                            railDataList.push(railArray);
                            realCount++;
                        }
                        if (realCount >= cnt) {
                            break;
                        }
                    }
                }
                countCheck("RailPos:", railDataList, cnt);
                setRailData(tableBody, "レール位置", railDataList);
            }
            // FreeRun:
            else if (i == 7) {
                let cnt = 1
                let realCount = 0;
                let railDataList = [];
                if (cnt > 0) {
                    for (let c = 0; ; c++) {
                        let railArray = readTbl(allTextList[index + 1 + c]);
                        if (railArray.length > 0) {
                            railDataList.push(railArray);
                            realCount++;
                        }
                        if (realCount >= cnt) {
                            break;
                        }
                    }
                }
                countCheck("FreeRun:", railDataList, cnt);
                setRailData(tableBody, "試運転のレール位置", railDataList);
            }
            // VSPos:
            else if (i == 8) {
                let array = readTbl(allTextList[index]);
                let cnt = Number(array[1]);
                let realCount = 0;
                let railDataList = [];
                if (cnt > 0) {
                    for (let c = 0; ; c++) {
                        let railArray = readTbl(allTextList[index + 1 + c]);
                        if (railArray.length > 0) {
                            railDataList.push(railArray);
                            realCount++;
                        }
                        if (realCount >= cnt) {
                            break;
                        }
                    }
                }
                countCheck("VSPos:", railDataList, cnt);
                setRailData(tableBody, "対戦のレール位置", railDataList);
            }
            // FadeImage:
            else if (i == 9) {
                let array = readTbl(allTextList[index]);
                let cnt = Number(array[1]);
                let realCount = 0;
                let imageList = [];
                if (cnt > 0) {
                    for (let c = 0; ; c++) {
                        let imageArray = readTbl(allTextList[index + 1 + c]);
                        if (imageArray.length > 0) {
                            imageList.push(imageArray);
                            realCount++;
                        }
                        if (realCount >= cnt) {
                            break;
                        }
                    }
                }
                countCheck("FadeImage:", imageList, cnt);
                setFadeImage(tableBody, imageList);
            }
            // StageRes:
            else if (i == 10) {
                let array = readTbl(allTextList[index]);
                let cnt = Number(array[1]);
                let realCount = 0;
                let imageList = [];
                if (cnt > 0) {
                    for (let c = 0; ; c++) {
                        let imageArray = readTbl(allTextList[index + 1 + c]);
                        if (imageArray.length > 0) {
                            imageList.push(imageArray);
                            realCount++;
                        }
                        if (realCount >= cnt) {
                            break;
                        }
                    }
                }
                countCheck("StageRes:", imageList, cnt);
                setStageRes(tableBody, imageList);
            }
            // SetTexInfo:
            else if (i == 11) {
                let array = readTbl(allTextList[index]);
                let cnt = Number(array[1]);
                let realCount = 0;
                texInfoList = [];
                if (cnt > 0) {
                    for (let c = 0; ; c++) {
                        let texInfoArray = readTbl(allTextList[index + 1 + c]);
                        if (texInfoArray.length > 0) {
                            texInfoList.push(texInfoArray);
                            realCount++;
                        }
                        if (realCount >= cnt) {
                            break;
                        }
                    }
                }
                countCheck("SetTexInfo:", texInfoList, cnt);
                setTexInfo(tableBody, texInfoList);
            }
            // STCnt:
            else if (i == 12) {
                let array = readTbl(allTextList[index]);
                let cnt = Number(array[1]);
                let realCount = 0;
                let stationList = [];
                if (cnt > 0) {
                    for (let c = 0; ; c++) {
                        let stationArray = readTbl(allTextList[index + 1 + c]);
                        if (stationArray.length > 0) {
                            stationArray.splice(0, 1)
                            stationList.push(stationArray);
                            realCount++;
                        }
                        if (realCount >= cnt) {
                            break;
                        }
                    }
                }
                countCheck("STCnt:", stationList, cnt);
                setStation(tableBody, stationList);
            }
            // CPU:
            else if (i == 13) {
                let array = readTbl(allTextList[index]);
                let cnt = Number(array[1]);
                let realCount = 0;
                let cpuList = [];
                if (cnt > 0) {
                    for (let c = 0; ; c++) {
                        let cpuArray = readTbl(allTextList[index + 1 + c]);
                        if (cpuArray.length > 0) {
                            cpuList.push(cpuArray);
                            realCount++;
                        }
                        if (realCount >= cnt) {
                            break;
                        }
                    }
                }
                countCheck("CPU:", cpuList, cnt);
                setCPU(tableBody, cpuList);
            }
            // ComicScript:
            else if (i == 14) {
                let array = readTbl(allTextList[index]);
                let cnt = Number(array[1]);
                let realCount = 0;
                let comicScriptList = [];
                if (cnt > 0) {
                    for (let c = 0; ; c++) {
                        let comicScriptArray = readTbl(allTextList[index + 1 + c]);
                        if (comicScriptArray.length > 0) {
                            comicScriptList.push(comicScriptArray);
                            realCount++;
                        }
                        if (realCount >= cnt) {
                            break;
                        }
                    }
                }
                countCheck("ComicScript:", comicScriptList, cnt);
                setComicScript(tableBody, comicScriptList);
            }
            // RainChecker:
            else if (i == 15) {
                let array = readTbl(allTextList[index]);
                let cnt = Number(array[1]);
                let realCount = 0;
                let rainCheckerList = [];
                if (cnt > 0) {
                    for (let c = 0; ; c++) {
                        let rainCheckerArray = readTbl(allTextList[index + 1 + c]);
                        if (rainCheckerArray.length > 0) {
                            rainCheckerList.push(rainCheckerArray);
                            realCount++;
                        }
                        if (realCount >= cnt) {
                            break;
                        }
                    }
                }
                countCheck("RainChecker:", rainCheckerList, cnt);
                setRainChecker(tableBody, rainCheckerList);
            }
            // DosanInfo:
            else if (i == 16) {
                let array = readTbl(allTextList[index]);
                let cnt = Number(array[1]);
                let realCount = 0;
                let dosanInfoList = [];
                if (cnt > 0) {
                    for (let c = 0; ; c++) {
                        let dosanInfoArray = readTbl(allTextList[index + 1 + c]);
                        if (dosanInfoArray.length > 0) {
                            dosanInfoList.push(dosanInfoArray);
                            realCount++;
                        }
                        if (realCount >= cnt) {
                            break;
                        }
                    }
                }
                countCheck("DosanInfo:", dosanInfoList, cnt);
                setDosanInfo(tableBody, dosanInfoList);
            }
            // MdlCnt:
            else if (i == 17) {
                let array = readTbl(allTextList[index]);
                let cnt = Number(array[1]);
                let realCount = 0;
                modelList = [];
                if (cnt > 0) {
                    for (let c = 0; ; c++) {
                        let modelArray = readTbl(allTextList[index + 1 + c]);
                        if (modelArray.length > 0) {
                            modelList.push(modelArray);
                            realCount++;
                        }
                        if (realCount >= cnt) {
                            break;
                        }
                    }
                }
                countCheck("MdlCnt:", modelList, cnt);
                await setMdlCnt(i, tableBody, modelList);
            }
            // RailCnt:
            else if (i == 18) {
                let array = readTbl(allTextList[index]);
                let cnt = Number(array[1]);
                let realCount = 0;
                let railList = [];
                if (cnt > 0) {
                    for (let c = 0; ; c++) {
                        let railArray = readTbl(allTextList[index + 1 + c]);
                        if (railArray.length > 0) {
                            railList.push(railArray);
                            realCount++;
                        }
                        if (realCount >= cnt) {
                            break;
                        }
                    }
                }
                countCheck("RailCnt:", railList, cnt);
                await setRailCnt(i, tableBody, railList);
            }
            // RailPri:
            else if (i == 19) {
                let array = readTbl(allTextList[index]);
                let cnt = Number(array[1]);
                let realCount = 0;
                let railPriList = [];
                if (cnt > 0) {
                    for (let c = 0; ; c++) {
                        let railPriArray = readTbl(allTextList[index + 1 + c]);
                        if (railPriArray.length > 0) {
                            railPriList.push(railPriArray);
                            realCount++;
                        }
                        if (realCount >= cnt) {
                            break;
                        }
                    }
                }
                countCheck("RailPri:", railPriList, cnt);
                setRailPri(tableBody, railPriList);
            }
            // BtlPri:
            else if (i == 20) {
                let array = readTbl(allTextList[index]);
                let cnt = Number(array[1]);
                let realCount = 0;
                let btlPriList = [];
                if (cnt > 0) {
                    for (let c = 0; ; c++) {
                        let btlPriArray = readTbl(allTextList[index + 1 + c]);
                        if (btlPriArray.length > 0) {
                            btlPriList.push(btlPriArray);
                            realCount++;
                        }
                        if (realCount >= cnt) {
                            break;
                        }
                    }
                }
                countCheck("BtlPri:", btlPriList, cnt);
                setBtlPri(tableBody, btlPriList);
            }
            // NoDriftRail:
            else if (i == 21) {
                let array = readTbl(allTextList[index]);
                let cnt = Number(array[1]);
                let realCount = 0;
                let noDriftRailList = [];
                if (cnt > 0) {
                    for (let c = 0; ; c++) {
                        let noDriftRailArray = readTbl(allTextList[index + 1 + c]);
                        if (noDriftRailArray.length > 0) {
                            noDriftRailList.push(noDriftRailArray);
                            realCount++;
                        }
                        if (realCount >= cnt) {
                            break;
                        }
                    }
                }
                countCheck("NoDriftRail:", noDriftRailList, cnt);
                setNoDriftRail(tableBody, noDriftRailList);
            }
            // AmbCnt:
            else if (i == 22) {
                let array = readTbl(allTextList[index]);
                let cnt = Number(array[1]);
                let realCount = 0;
                ambList = [];
                if (cnt > 0) {
                    for (let c = 0; ; c++) {
                        let ambArray = readTbl(allTextList[index + 1 + c]);
                        if (ambArray.length > 0) {
                            ambList.push(ambArray);
                            realCount++;
                        }
                        if (realCount >= cnt) {
                            break;
                        }
                    }
                }
                countCheck("ambCnt:", ambList, cnt);
                await setAmbCnt(i, tableBody, ambList);
            }
        }
        setProgress(1);
        checkTexInfo(texInfoList, modelList, ambList);
    } catch (error) {
        let errorDiv = document.getElementById("errorDiv");
        let stackList = error.stack.split("\n");
        let errorLine = stackList[1];
        let errorNum = errorLine.substring(errorLine.indexOf("viewer.js"), errorLine.length - 1);
        errorDiv.innerHTML = `${errorNum}：${error}`;
    } finally {
        let tableDiv = document.getElementById("tableDiv");
        tableDiv.style.display = "inline";
    }
}

function countCheck(name, list, cnt) {
    if (list.length != cnt) {
        printError(`【${name}】読み込んだデータと設定数が不一致です`);
    }
}

function setStory(tableBody, story) {
    let tbody = document.createElement("tbody");
    tableBody.appendChild(tbody);
    let headTr = document.createElement("tr");
    tbody.appendChild(headTr);
    let th = document.createElement("th");
    th.innerHTML = "ステージ";
    headTr.appendChild(th);

    let tr = document.createElement("tr");
    tbody.appendChild(tr);
    let td = document.createElement("td");
    tr.appendChild(td);
    td.innerHTML = story;
}
function setTrack(tableBody, num, flag=true) {
    let tbody = document.createElement("tbody");
    tableBody.appendChild(tbody);
    let headTr = document.createElement("tr");
    tbody.appendChild(headTr);
    let th = document.createElement("th");
    th.innerHTML = "台車";
    headTr.appendChild(th);

    let tr = document.createElement("tr");
    tbody.appendChild(tr);
    let td = document.createElement("td");
    tr.appendChild(td);
    let resultStr = "標準軌";
    if (num > 0) {
        resultStr = "狭軌";
    }

    if (!flag) {
        resultStr += "（デフォルト）";
    }
    td.innerHTML = resultStr;
}
function setDir(tableBody, dir, flag=true) {
    let tbody = document.createElement("tbody");
    tableBody.appendChild(tbody);
    let headTr = document.createElement("tr");
    tbody.appendChild(headTr);
    let th = document.createElement("th");
    th.innerHTML = "向き";
    headTr.appendChild(th);

    let tr = document.createElement("tr");
    tbody.appendChild(tr);
    let td = document.createElement("td");
    tr.appendChild(td);

    let resultStr = dir;
    if (!flag) {
        resultStr += "（デフォルト）";
    }
    td.innerHTML = resultStr;
}
function setComicData(tableBody, title, comicDataList) {
    let tbody = document.createElement("tbody");
    tableBody.appendChild(tbody);
    let headTr = document.createElement("tr");
    tbody.appendChild(headTr);
    let th = document.createElement("th");
    th.innerHTML = `読み込む ${title}`;
    headTr.appendChild(th);

    for (let i = 0; i < comicDataList.length; i++) {
        let tr = document.createElement("tr");
        tbody.appendChild(tr);
        let td = document.createElement("td");
        tr.appendChild(td);
        td.innerHTML = comicDataList[i];
    }
}
function setRailData(tableBody, title, railDataList) {
    let tbody = document.createElement("tbody");
    tableBody.appendChild(tbody);
    let headTr = document.createElement("tr");
    tbody.appendChild(headTr);
    let th = document.createElement("th");
    th.innerHTML = `${title}`;
    th.colSpan = 3;
    headTr.appendChild(th);

    for (let i = 0; i < railDataList.length; i++) {
        let tr = document.createElement("tr");
        tbody.appendChild(tr);
        for (let j = 0; j < railDataList[i].length; j++) {
            if (j >= 3) {
                break;
            }
            let td = document.createElement("td");
            tr.appendChild(td);
            td.style.width = "50px";
            td.innerHTML = railDataList[i][j];
        }
    }
}
function setFadeImage(tableBody, fadeImageList) {
    let thTitle = ["denファイル", "imgファイル"];

    let tbody = document.createElement("tbody");
    tableBody.appendChild(tbody);
    let headTr = document.createElement("tr");
    tbody.appendChild(headTr);

    for (let i = 0; i < thTitle.length; i++) {
        let th = document.createElement("th");
        th.innerHTML = thTitle[i];
        headTr.appendChild(th);
    }

    for (let i = 0; i < fadeImageList.length; i++) {
        let tr = document.createElement("tr");
        tbody.appendChild(tr);
        for (let j = 0; j < fadeImageList[i].length; j++) {
            if (j >= 2) {
                break;
            }
            let td = document.createElement("td");
            tr.appendChild(td);
            td.innerHTML = fadeImageList[i][j];
        }
    }
}
function setStageRes(tableBody, stageResList) {
    let thTitle = ["index", "denファイル", "imgファイル"];

    let tbody = document.createElement("tbody");
    tableBody.appendChild(tbody);
    let headTr = document.createElement("tr");
    tbody.appendChild(headTr);

    for (let i = 0; i < thTitle.length; i++) {
        let th = document.createElement("th");
        th.innerHTML = thTitle[i];
        headTr.appendChild(th);
    }

    for (let i = 0; i < stageResList.length; i++) {
        let tr = document.createElement("tr");
        tbody.appendChild(tr);
        for (let j = 0; j < stageResList[i].length; j++) {
            if (j >= 3) {
                break;
            }
            let td = document.createElement("td");
            tr.appendChild(td);
            if (j == 0) {
                td.innerHTML = i;
            } else {
                td.innerHTML = stageResList[i][j];
            }
        }
    }
}
function setTexInfo(tableBody, texInfoList) {
    let thTitle = [
        "index",
        "amb番号",
        "amb_child番号",
        "路線別画像データ番号",
        "tex_type",
        "change_index",
        "mat_index",
        "f1",
        "f2"
    ];
    let typeDict = {
        0: "駅表 表",
        1: "駅表 裏",
        2: "ローカルY軸反転",
        10: "時刻表示案内",
        11: "阪急LED",
        20: "ホーム",
        30: "テクスチャー変更",
        31: "UV変更",
        32: "メッシュの表示切替"
    }

    let tbody = document.createElement("tbody");
    tableBody.appendChild(tbody);
    let headTr = document.createElement("tr");
    tbody.appendChild(headTr);

    for (let i = 0; i < thTitle.length; i++) {
        let th = document.createElement("th");
        th.innerHTML = thTitle[i];
        headTr.appendChild(th);
    }

    for (let i = 0; i < texInfoList.length; i++) {
        let tr = document.createElement("tr");
        tbody.appendChild(tr);
        for (let j = 0; j < texInfoList[i].length; j++) {
            if (j >= 9) {
                break;
            }
            let td = document.createElement("td");
            tr.appendChild(td);
            if (j == 0) {
                td.innerHTML = i;
            } 
            else if (j == 4) {
                td.innerHTML = typeDict[Number(texInfoList[i][j])];
            }
            else {
                td.innerHTML = texInfoList[i][j];
            }
        }
    }
}
function setStation(tableBody, stationList) {
    let thTitle = ["stIndex", "レール", "オフセット", "駅名", "ふりがな", "英語"];

    let tbody = document.createElement("tbody");
    tableBody.appendChild(tbody);
    let headTr = document.createElement("tr");
    tbody.appendChild(headTr);

    for (let i = 0; i < thTitle.length; i++) {
        let th = document.createElement("th");
        th.innerHTML = thTitle[i];
        headTr.appendChild(th);
    }

    for (let i = 0; i < stationList.length; i++) {
        let tr = document.createElement("tr");
        tbody.appendChild(tr);
        for (let j = 0; j < stationList[i].length; j++) {
            if (j >= 6) {
                break;
            }
            let td = document.createElement("td");
            tr.appendChild(td);
            td.innerHTML = stationList[i][j];
        }
    }
}
function setCPU(tableBody, cpuList) {
    let thTitle = [
        "index",
        "レール",
        "train_no",
        "run_type",
        "min_len",
        "max_len",
        "max_speed",
        "min_speed",
        "p1"
    ];

    let tbody = document.createElement("tbody");
    tableBody.appendChild(tbody);
    let headTr = document.createElement("tr");
    tbody.appendChild(headTr);

    for (let i = 0; i < thTitle.length; i++) {
        let th = document.createElement("th");
        th.innerHTML = thTitle[i];
        headTr.appendChild(th);
    }

    for (let i = 0; i < cpuList.length; i++) {
        let tr = document.createElement("tr");
        tbody.appendChild(tr);
        for (let j = 0; j < cpuList[i].length; j++) {
            if (j >= 9) {
                break;
            }
            let td = document.createElement("td");
            tr.appendChild(td);
            if (j == 0) {
                td.innerHTML = i;
            } else {
                td.innerHTML = cpuList[i][j];
            }
        }
    }
}
function setComicScript(tableBody, comicScriptList) {
    let thTitle = [
        "index",
        "comic_bin",
        "event_type",
        "レール",
        "オフセット"
    ];

    let eventTypeList = [
        "Player",
		"CPU",
		"Fast",
		"Goal",
		"GoalEvent",
		"FreeRunFastEvent",
		"BtlFastEvent"
    ];

    let tbody = document.createElement("tbody");
    tableBody.appendChild(tbody);
    let headTr = document.createElement("tr");
    tbody.appendChild(headTr);

    for (let i = 0; i < thTitle.length; i++) {
        let th = document.createElement("th");
        th.innerHTML = thTitle[i];
        headTr.appendChild(th);
    }

    for (let i = 0; i < comicScriptList.length; i++) {
        let tr = document.createElement("tr");
        tbody.appendChild(tr);
        for (let j = 0; j < comicScriptList[i].length; j++) {
            if (j >= 5) {
                break;
            }
            let td = document.createElement("td");
            tr.appendChild(td);
            if (j == 0) {
                td.innerHTML = i;
            } 
            else if (j == 2) {
                td.innerHTML = eventTypeList[Number(comicScriptList[i][j])];
            }
            else {
                td.innerHTML = comicScriptList[i][j];
            }
        }
    }
}
function setRainChecker(tableBody, rainCheckerList) {
    let thTitle = [
        "index",
        "event_no",
        "event_type",
        "レール",
        "オフセット",
        "param"
    ];

    let eventTypeDict = {
        0: "雨停止",
		1: "雨開始",
		2: "ワイパー開始",
		3: "ワイパー停止",
		4: "音だけ停止",
		5: "音だけ開始",
		10: "地下突入",
		11: "地下から出現",
		100: "CityPos",
		101: "CityScale",
		102: "MountPos"
    }

    let tbody = document.createElement("tbody");
    tableBody.appendChild(tbody);
    let headTr = document.createElement("tr");
    tbody.appendChild(headTr);

    for (let i = 0; i < thTitle.length; i++) {
        let th = document.createElement("th");
        th.innerHTML = thTitle[i];
        headTr.appendChild(th);
    }

    for (let i = 0; i < rainCheckerList.length; i++) {
        let tr = document.createElement("tr");
        tbody.appendChild(tr);
        for (let j = 0; j < rainCheckerList[i].length; j++) {
            if (rainCheckerList[i][j].indexOf("//") == 0) {
                break;
            }
            let td = document.createElement("td");
            tr.appendChild(td);
            if (j == 0) {
                td.innerHTML = i;
            }
            else if (j == 2) {
                td.innerHTML = eventTypeDict[Number(rainCheckerList[i][j])];
            }
            else {
                td.innerHTML = rainCheckerList[i][j];
            }
        }
    }
}
function setDosanInfo(tableBody, dosanInfoList) {
    let thTitle = [
        "index",
        "event_no",
        "event_type",
        "レール",
        "オフセット",
        "param"
    ];

    let eventTypeDict = {
		10: "TrainJump"
    }

    let tbody = document.createElement("tbody");
    tableBody.appendChild(tbody);
    let headTr = document.createElement("tr");
    tbody.appendChild(headTr);

    for (let i = 0; i < thTitle.length; i++) {
        let th = document.createElement("th");
        th.innerHTML = thTitle[i];
        headTr.appendChild(th);
    }

    for (let i = 0; i < dosanInfoList.length; i++) {
        let tr = document.createElement("tr");
        tbody.appendChild(tr);
        for (let j = 0; j < dosanInfoList[i].length; j++) {
            if (dosanInfoList[i][j].indexOf("//") == 0) {
                break;
            }
            let td = document.createElement("td");
            tr.appendChild(td);
            if (j == 0) {
                td.innerHTML = i;
            }
            else if (j == 2) {
                td.innerHTML = eventTypeDict[Number(dosanInfoList[i][j])];
            }
            else {
                td.innerHTML = dosanInfoList[i][j];
            }
        }
    }
}
async function setMdlCnt(index, tableBody, modelList) {
    let thTitle = [
        "index",
        "モデル名",
        "flg",
        "flg",
        "架線柱"
    ];

    let tbody = document.createElement("tbody");
    tableBody.appendChild(tbody);
    let headTr = document.createElement("tr");
    tbody.appendChild(headTr);

    for (let i = 0; i < thTitle.length; i++) {
        let th = document.createElement("th");
        th.innerHTML = thTitle[i];
        headTr.appendChild(th);
    }

    let start = index / searchTextList.length;
    let end = (index + 1) / searchTextList.length;
    let diff = getProgressPer(
        start,
        end,
        modelList.length
    );

    for (let i = 0; i < modelList.length; i++) {
        if (i % 20 == 0) {
            await setProgress(start + i * diff);
        }
        let tr = document.createElement("tr");
        tbody.appendChild(tr);
        for (let j = 0; j < modelList[i].length; j++) {
            if (j >= 5) {
                break;
            }
            let td = document.createElement("td");
            tr.appendChild(td);
            if (j == 0) {
                td.innerHTML = i;
            }
            else if (j == 2 || j == 3) {
                td.innerHTML = toHex(modelList[i][j], "char");
            }
            else if (j == 4) {
                let idx = Number(modelList[i][j]);
                if (idx >= 0 && idx < modelList.length) {
                    td.innerHTML = modelList[idx][1];
                    td.title = modelList[i][j];
                } else {
                    td.innerHTML = modelList[i][j];
                }
            }
            else {
                td.innerHTML = modelList[i][j];
            }
        }
    }
}
async function setRailCnt(index, tableBody, railList) {
    let thTitle = [
        "index", "prevRailIndex", "BlockNo", 
        "pos_x", "pos_y", "pos_z", 
        "dir_x", "dir_y", "dir_z",
        "モデル", "架線柱", "per",
        "flg", "flg", "flg", "flg",
        "rail_data",
        "next_rail", "next_no", "prev_rail", "prev_no"
    ];

    let tbody = document.createElement("tbody");
    tableBody.appendChild(tbody);
    let headTr = document.createElement("tr");
    tbody.appendChild(headTr);

    for (let i = 0; i < thTitle.length; i++) {
        let th = document.createElement("th");
        th.innerHTML = thTitle[i];
        headTr.appendChild(th);
    }

    let railHeaderColorList = [
        "", "#E7B5E8", "#E7D5E8",
        "#B7D5E8", "#B7D5E8", "#B7D5E8",
        "#99F5FF", "#99F5FF", "#99F5FF",
        "#C9F58F", "#99F58F", "#C9A1AE",
        "#78F2D3", "#78F2D3", "#78F2D3", "#78F2D3",
        "",
        "#FBF585", "#FBF585", "#F593E3", "#F593E3"
    ];

    let start = index / searchTextList.length;
    let end = (index + 1) / searchTextList.length;
    let diff = getProgressPer(
        start,
        end,
        railList.length
    );

    let railDataCnt = 0;
    for (let i = 0; i < railList.length; i++) {
        if (i % 20 == 0) {
            await setProgress(start + i * diff);
        }
        railDataCnt = 0;
        let tr = document.createElement("tr");
        tbody.appendChild(tr);
        for (let j = 0; j < railList[i].length; j++) {
            if (railDataCnt > 0) {
                if (j > 16 + 4 * railDataCnt) {
                    break;
                }
            }
            let td = document.createElement("td");
            tr.appendChild(td);
            // index
            switch (j) {
                // index
                case 0:
                    td.innerHTML = i;
                    break;
                case 9:
                case 10:
                    let idx = Number(railList[i][j]);
                    if (idx >= 0 && idx < modelList.length) {
                        td.innerHTML = modelList[idx][1];
                        td.title = railList[i][j];
                        if (j == 9) {
                            if (!railModelNameList.includes(modelList[idx][1].toLowerCase())) {
                                printError(`レールNo.${i}で、レールで使えないモデル【${modelList[idx][1]}】が含まれています`);
                            }
                        }
                    } else {
                        if (j == 10) {
                            if (idx == 255 || idx == -1) {
                                let modelIdx = railList[i][j - 1];
                                let baseIdx = Number(modelList[modelIdx][4]);
                                if (baseIdx >= 0 && baseIdx < 254) {
                                    td.innerHTML = modelList[baseIdx][1];
                                    td.style.backgroundColor = "gold";
                                    td.title = railList[i][j];
                                } else {
                                    td.innerHTML = railList[i][j];
                                    td.style.backgroundColor = "lightgray";
                                }
                            } else {
                                td.innerHTML = railList[i][j];
                                td.style.backgroundColor = "lightgray";
                            }
                        } else {
                            td.innerHTML = railList[i][j];
                        }
                    }
                    break;
                case 12:
                case 13:
                case 14:
                case 15:
                    td.innerHTML = toHex(railList[i][j], "char");
                    break;
                default:
                    if (j == 16) {
                        railDataCnt = Number(railList[i][j]);
                    }
                    td.innerHTML = railList[i][j];
                    break;
            }

            if (j > 16) {
                let idx = (j - 17) % 4 + 17;
                td.style.backgroundColor = railHeaderColorList[idx];
            } else {
                if (["lightgray", "gold"].indexOf(td.style.backgroundColor) == -1) {
                    td.style.backgroundColor = railHeaderColorList[j];
                }
            }
            td.style.minWidth = "80px";

            if (j == 16) {
                // baseX検査
                prevRail = Number(railList[i][1]);
                if (prevRail != -1 && prevRail != 0) {
                    currentRailDataCnt = Number(railList[i][16]);
                    currentRailModelName = modelList[Number(railList[i][9])][1]
                    prevRailDataCnt = Number(railList[prevRail][16]);
                    prevRailModelName = modelList[Number(railList[prevRail][9])][1];
                    // ちゃんとモデル通り書いたかの検査
                    if (currentRailDataCnt != railModelList[currentRailModelName]) {
                        printError(`レール No.${i}の進み方の定義が違います【モデル：${railCntToName[Number(railModelList[currentRailModelName])]}】【書き方：${railCntToName[Number(currentRailDataCnt)]}】`);
                    } else {
                        if (currentRailDataCnt != railModelList[prevRailModelName]) {
                            if (currentRailDataCnt == 2) {
                                currentRailLeftPrevRailNo = Number(railList[i][19]);
                                currentRailRightPrevRailNo = Number(railList[i][23]);
                                if (currentRailLeftPrevRailNo == prevRail || currentRailRightPrevRailNo == prevRail) {
                                    if (currentRailLeftPrevRailNo == prevRail) {
                                        baseX = Number(railList[i][3]);
                                        if (baseX != 6.5) {
                                            baseTd = tr.childNodes[3];
                                            baseTd.style.backgroundColor = "red";
                                            printError(`レール No.${i}のX移動数値(${baseX})が異常です`);
                                        }
                                    } else if (currentRailRightPrevRailNo == prevRail) {
                                        baseX = Number(railList[i][3]);
                                        if (baseX != -6.5) {
                                            baseTd = tr.childNodes[3];
                                            baseTd.style.backgroundColor = "red";
                                            printError(`レール No.${i}のX移動数値(${baseX})が異常です`);
                                        }
                                    }
                                }
                            }
                            else if (currentRailDataCnt == 1) {
                                currentRailPrevRailNo = Number(railList[i][19]);
                                if (currentRailPrevRailNo == prevRail) {
                                    prevRailNextLeftRailNo = Number(railList[prevRail][17]);
                                    prevRailNextRightRailNo = Number(railList[prevRail][21]);
                                    if (prevRailNextLeftRailNo == i || prevRailNextRightRailNo == i) {
                                        if (prevRailNextLeftRailNo == i) {
                                            baseX = Number(railList[i][3]);
                                            if (baseX != -6.5) {
                                                if (baseX == 6.5) {
                                                    console.log(`レール No.${prevRail}のNextを自動補正しました`);
                                                } else {
                                                    baseTd = tr.childNodes[3];
                                                    baseTd.style.backgroundColor = "red";
                                                    printError(`レール No.${i}のX移動数値(${baseX})が異常です`);
                                                }
                                            }
                                        } else if (prevRailNextRightRailNo == i) {
                                            baseX = Number(railList[i][3]);
                                            if (baseX != 6.5) {
                                                if (baseX == -6.5) {
                                                    console.log(`レール No.${prevRail}のNextを自動補正しました`);
                                                } else {
                                                    baseTd = tr.childNodes[3];
                                                    baseTd.style.backgroundColor = "red";
                                                    printError(`レール No.${i}のX移動数値(${baseX})が異常です`);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                currentRailDataCnt = Number(railList[i][16]);
                // 繋ぎ方の数を検査
                if (railList[i].length - 17 < 4 * currentRailDataCnt) {
                    printError(`レール No.${i}の繋ぎ方の要素が必要数(${4 * currentRailDataCnt})より足りないです->（${railList[i].length - 17}）`)
                } 
                // 存在しないNext検査
                else {
                    for (let cnt = 0; cnt < currentRailDataCnt; cnt++) {
                        nextRailNo = Number(railList[i][17 + cnt*4]);
                        if (nextRailNo >= railList.length) {
                            nextRailTd = tr.childNodes[17 + cnt*4];
                            nextRailTd.style.backgroundColor = "red";
                            printError(`レール No.${i}のNextレール(${nextRailNo})が異常です`);
                        }
                    }
                }
            }
        }
    }
}
function setRailPri(tableBody, railPriList) {
    let thTitle = [
        "rail_index",
        "pri_rail_index"
    ];

    let tbody = document.createElement("tbody");
    tableBody.appendChild(tbody);
    let headTr = document.createElement("tr");
    tbody.appendChild(headTr);

    for (let i = 0; i < thTitle.length; i++) {
        let th = document.createElement("th");
        th.innerHTML = thTitle[i];
        headTr.appendChild(th);
    }

    for (let i = 0; i < railPriList.length; i++) {
        let tr = document.createElement("tr");
        tbody.appendChild(tr);
        for (let j = 0; j < railPriList[i].length; j++) {
            if (j >= 2) {
                break;
            }
            let td = document.createElement("td");
            tr.appendChild(td);
            td.innerHTML = railPriList[i][j];
        }
    }
}
function setBtlPri(tableBody, btlPriList) {
    let thTitle = [
        "rail_index",
        "pri_rail_index"
    ];

    let tbody = document.createElement("tbody");
    tableBody.appendChild(tbody);
    let headTr = document.createElement("tr");
    tbody.appendChild(headTr);

    for (let i = 0; i < thTitle.length; i++) {
        let th = document.createElement("th");
        th.innerHTML = thTitle[i];
        headTr.appendChild(th);
    }

    for (let i = 0; i < btlPriList.length; i++) {
        let tr = document.createElement("tr");
        tbody.appendChild(tr);
        for (let j = 0; j < btlPriList[i].length; j++) {
            if (j >= 2) {
                break;
            }
            let td = document.createElement("td");
            tr.appendChild(td);
            td.innerHTML = btlPriList[i][j];
        }
    }
}
function setNoDriftRail(tableBody, noDriftRailList) {
    let thTitle = [
        "rail_index",
        "pri_rail_index"
    ];

    let tbody = document.createElement("tbody");
    tableBody.appendChild(tbody);
    let headTr = document.createElement("tr");
    tbody.appendChild(headTr);

    for (let i = 0; i < thTitle.length; i++) {
        let th = document.createElement("th");
        th.innerHTML = thTitle[i];
        headTr.appendChild(th);
    }

    for (let i = 0; i < noDriftRailList.length; i++) {
        let tr = document.createElement("tr");
        tbody.appendChild(tr);
        for (let j = 0; j < noDriftRailList[i].length; j++) {
            if (j >= 2) {
                break;
            }
            let td = document.createElement("td");
            tr.appendChild(td);
            td.innerHTML = noDriftRailList[i][j];
        }
    }
}
async function setAmbCnt(index, tableBody, ambList) {
    let thTitle = [
        "index", "rail", "length",
        "amd_data",
        "モデル", "親index",
        "pos_x", "pos_y", "pos_z", 
        "dir_x", "dir_y", "dir_z",
        "joint_dir_x", "joint_dir_y", "joint_dir_z",
        "per", "kasenchu_per"
    ];

    let tbody = document.createElement("tbody");
    tableBody.appendChild(tbody);
    let headTr = document.createElement("tr");
    tbody.appendChild(headTr);

    for (let i = 0; i < thTitle.length; i++) {
        let th = document.createElement("th");
        th.innerHTML = thTitle[i];
        headTr.appendChild(th);
    }

    let ambHeaderColorList = [
        "", "", "",
        "",
        "#C9F58F", "",
        "#B7D5E8", "#B7D5E8", "#B7D5E8",
        "#99F5FF", "#99F5FF", "#99F5FF",
        "#99F58F", "#99F58F", "#99F58F",
        "#C9A1AE", "#F593E3"
    ];

    let start = index / searchTextList.length;
    let end = (index + 1) / searchTextList.length;
    let diff = getProgressPer(
        start,
        end,
        ambList.length
    );

    let ambDataCnt = 0
    for (let i = 0; i < ambList.length; i++) {
        if (i % 20 == 0) {
            await setProgress(start + i * diff);
        }
        ambDataCnt = 0;
        let tr = document.createElement("tr");
        tbody.appendChild(tr);
        for (let j = 0; j < ambList[i].length; j++) {
            if (ambDataCnt > 0) {
                if (j >= 4 + 13 * ambDataCnt) {
                    break;
                }
            }
            if (j > 4 && j % 13 == 4) {
                tr = document.createElement("tr");
                tbody.appendChild(tr);
                for (let k = 0; k < 4; k++) {
                    let newTd = document.createElement("td");
                    newTd.style.borderWidth = "0px";
                    tr.appendChild(newTd);
                }
            }
            let td = document.createElement("td");
            tr.appendChild(td);
            if (j == 0) {
                td.innerHTML = i;
            } else {
                if (j == 3) {
                    ambDataCnt = Number(ambList[i][j]);
                    td.innerHTML = ambList[i][j];
                } else if (j % 13 == 4) {
                    let idx = Number(ambList[i][j]);
                    if (idx >= 0 && idx < modelList.length) {
                        td.innerHTML = modelList[idx][1];
                        td.title = ambList[i][j];
                        if (!ambModelList.includes(modelList[idx][1].toLowerCase())) {
                            printError(`AMB No.${i}で、AMBで使えないモデル【${modelList[idx][1]}】が含まれています`);
                        }
                    } else {
                        td.innerHTML = ambList[i][j];
                    }
                } else {
                    td.innerHTML = ambList[i][j];
                }
            }
            if (j >= 17) {
                let idx = (j - 4) % 13 + 4;
                td.style.backgroundColor = ambHeaderColorList[idx];
            } else {
                td.style.backgroundColor = ambHeaderColorList[j];
            }   
        }
    }
}

function checkTexInfo(texInfoList, modelList, ambList) {
    for (let i = 0; i < texInfoList.length; i++) {
        let ambNo = -1;
        let ambChildNo = -1;
        for (let j = 0; j < texInfoList[i].length; j++) {
            if (j >= 9) {
                break;
            }
            if (j == 1) {
                ambNo = Number(texInfoList[i][j]);
            }
            else if (j == 2) {
                ambChildNo = Number(texInfoList[i][j]);
                if (ambNo == -1) {
                    if (ambChildNo < 0 || ambChildNo >= modelList.length) {
                        printError(`SetTexInfo No.${i}は、存在しないモデル番号（${ambChildNo}）を指定しています`);
                    }
                } else {
                    ambArray = ambList[ambNo];
                    ambDataCnt = ambArray[3];
                    if (ambChildNo < 0 || ambChildNo >= ambDataCnt) {
                        printError(`SetTexInfo No.${i}は、存在しないAMBの子モデル（${ambChildNo}）を指定しています`);
                    }
                }
            }
        }
    }
}

function toHex(number, mode) {
    let compNum = 0;
    let zeroFill = "";
    let sliceNum = 0;
    if (mode == "char") {
        compNum = 256;
        zeroFill = "00";
        sliceNum = -2;
    }

    if (number < 0) {
        number += compNum;
    }
    return "0x" + (zeroFill + number.toString(16).toUpperCase()).slice(sliceNum);
}
function printError(error) {
    let errorDiv = document.getElementById("errorDiv");
    errorDiv.innerHTML += `${error}<br>`;
    let tableDiv = document.getElementById("tableDiv");
    tableDiv.style.display = "inline";
}