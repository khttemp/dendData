angular.module('myApp', [])
    .controller('myCtrl', ['$scope', function($scope) {
        $scope.trainIndexList = {
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

        $scope.series = "SS";
        $scope.trainList = [];
        $scope.selectScript = [];
        $scope.headerInfoList = {};

        function convertBinaryToText(allBinaryList, filename){
            $scope.selectScript = [];
            $scope.headerInfoList = {};
            let index = 16;
            let headerBinary = allBinaryList.slice(0, index);
            let header = new TextDecoder().decode(headerBinary);
            if (header != "DEND_COMICSCRIPT") {
                throw new Error("コミックスクリプトファイルではありません");
            }
            index += 1;

            let comicNum = Number(filename.substring(5, filename.indexOf(".bin")));
            $scope.headerInfoList[comicNum] = {};
            $scope.headerInfoList[comicNum]["imgList"] = [];
            let imgCnt = allBinaryList[index];
            index += 1;
            for (let i = 0; i < imgCnt; i++) {
                let imgLen = allBinaryList[index];
                index += 1;
                let imgNameBinary = allBinaryList.slice(index, index + imgLen);
                let imgName = new TextDecoder().decode(imgNameBinary);
                $scope.headerInfoList[comicNum]["imgList"].push(imgName);
                index += imgLen;
            }

            let imgSizeCnt = allBinaryList[index];
            index += 1;
            for (let i = 0; i < imgSizeCnt; i++) {
                index += 1;
                index += 4*4;
            }

            $scope.headerInfoList[comicNum]["seList"] = [];
            let seCnt = allBinaryList[index];
            index += 1;
            for (let i = 0; i < seCnt; i++) {
                let seLen = allBinaryList[index];
                index += 1;
                let seNameBinary = allBinaryList.slice(index, index + seLen);
                let seName = new TextDecoder().decode(seNameBinary);
                $scope.headerInfoList[comicNum]["seList"].push(seName);
                index += seLen;
                index += 1;
            }

            $scope.headerInfoList[comicNum]["bgmList"] = [];
            let bgmCnt = allBinaryList[index];
            index += 1;
            for (let i = 0; i < bgmCnt; i++) {
                let bgmLen = allBinaryList[index];
                index += 1;
                let bgmNameBinary = allBinaryList.slice(index, index + bgmLen);
                let bgmName = new TextDecoder().decode(bgmNameBinary);
                $scope.headerInfoList[comicNum]["bgmList"].push(bgmName);
                index += bgmLen;
                index += 1 + 4 + 4;
            }

            index += 1;
            let comicDataCnt = getShort(allBinaryList, index);
            index += 2;

            let cmdKeys = Object.keys(CMD);
            for (let i = 0; i < comicDataCnt; i++) {
                let cmdList = [];
                let cmdNum = getShort(allBinaryList, index);
                cmdList.push(cmdKeys[cmdNum]);
                index += 2;

                let paramNum = allBinaryList[index];
                index += 1;

                for (let j = 0; j < paramNum; j++) {
                    let param = getFloat(allBinaryList, index);
                    cmdList.push(param);
                    index += 4;
                }

                let cmdInfoList = [];
                for (let j = 0; j < cmdList.length; j++) {
                    cmdInfoList.push({
                        "info":cmdList[j],
                        "property":setProperty(comicNum, cmdList, cmdList[0], j)
                    });
                }
                $scope.selectScript.push(cmdInfoList)
            }
        }

        function getShort(allBinaryList, index) {
            let binary = allBinaryList.slice(index, index + 2);
            let shortArray = new Int16Array(binary.buffer);
            return shortArray[0];
        }

        function getFloat(allBinaryList, index) {
            let binary = allBinaryList.slice(index, index + 4);
            let floatArray = new Float32Array(binary.buffer);
            return Math.round((floatArray[0] * 10000)) / 10000;
        }

        function setProperty(comicNum, cmdList, cmd, idx){
            if (idx == 0) {
                if (CMD[cmd].description != "") {
                    return CMD[cmd].description.replaceAll(' ', '');
                }
            }
            let index = Number(cmdList[idx]);
            if (cmd == "CHK_TRAIN_TYPE" && idx == 2) {
                return $scope.trainList[index];
            } else if (cmd == "PlayComicBGM" && idx == 1) {
                return $scope.headerInfoList[comicNum]["bgmList"][index];
            } else if (cmd == "SetComic" && idx == 2) {
                return $scope.headerInfoList[comicNum]["imgList"][index];
            } else if (cmd == "PlayComicSE" && idx == 1) {
                return $scope.headerInfoList[comicNum]["seList"][index];
            } else if (cmd == "SET_MIKOSHI" && idx == 1) {
                return $scope.headerInfoList[comicNum]["imgList"][index];
            } else if (cmd == "BODY_AUDIO_PLAY" && idx == 2) {
                return $scope.headerInfoList[comicNum]["seList"][index];
            }
            return "";
        }

        $scope.fileUpload = function(element) {
            const reader = new FileReader();
            let [inputFile] = element.files;

            reader.addEventListener("load", () => {
                try {
                    $scope.trainList = $scope.trainIndexList[$scope.series];
                    let allBinaryList = new Uint8Array(reader.result);
                    convertBinaryToText(allBinaryList, inputFile.name)
                    $scope.$apply();
                } catch (error) {
                    let errorDiv = document.getElementById("errorDiv");
                    errorDiv.innerHTML = error;
                }
            }, false);

            if (inputFile) {
                reader.readAsArrayBuffer(inputFile);
            }
        }
        
    }]);