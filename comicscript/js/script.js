angular.module('myApp', ['myModule'])
    .controller('myCtrl', ['$scope', function($scope) {
        $scope.railList = [];
        $scope.selectFile = "RAIL002";
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

        $scope.trainList = [];
        $scope.series = "LS";
        $scope.comicList = {
            "num":[],
            "type":[],
            "railNo":[]
        };
        $scope.scriptList = {};
        $scope.selectScript = [];
        $scope.headerInfoList = {
            "imgList":[],
            "seList":[],
            "bgmList":[]
        }

        $scope.updateScript = function(num) {
            $scope.selectScript = $scope.scriptList[num];
        }

        $scope.updateFile = function(path) {
            $scope.comicList = {
                "num":[],
                "type":[],
                "railNo":[]
            };
            $scope.scriptList = {};
            $scope.selectScript = [];
            $scope.headerInfoList = {
                "imgList":[],
                "seList":[],
                "bgmList":[]
            }
            readTextFile(path);
        }

        function readFileList(file){
            var rawFile = new XMLHttpRequest();
            rawFile.open("GET", file, false);
            rawFile.onreadystatechange = function (){
                if (rawFile.readyState === 4){
                    if (rawFile.status === 200 || rawFile.status == 0){
                        var allText = rawFile.responseText;
                        let rows = allText.split("\r\n");
                        for (let i = 0; i < rows.length; i++){
                            let arr = rows[i].split("/");
                            let temp = arr[arr.length - 1];
                            let name = temp.split("_")[0];
                            let info = {"name":name, "path":rows[i]};
                            $scope.railList.push(info);
                        }
                    }
                }
            };
            rawFile.send(null);
        }
        readFileList("./RAILList.txt");

        function readTextFile(file){
            var rawFile = new XMLHttpRequest();
            rawFile.open("GET", file, false);
            rawFile.onreadystatechange = function (){
                if (rawFile.readyState === 4){
                    if (rawFile.status === 200 || rawFile.status == 0){
                        var allText = rawFile.responseText;
                        let arr = file.split("/");
                        $scope.series = arr[2];
                        $scope.trainList = $scope.trainIndexList[arr[2]];
                        let temp = arr[arr.length - 1];
                        $scope.selectFile = temp.split("_")[0];
                        TableInput(allText);
                    }
                }
            };
            rawFile.send(null);
        }
        
        function TableInput(allText){
            allText = allText.replaceAll("\r", "")
            let rows = allText.split("\n");
            let comicNum = 0;
            let cmdList = [];
            for (let i = 0; i < rows.length; i++){
                // \tで分ける
                let cols = rows[i].split("\t");
                // comic scriptのタイトル行
                if (cols[0] == "comicTitle") {
                    comicNum = cols[1];
                    $scope.scriptList[comicNum] = [];
                    $scope.comicList["num"].push(cols[1]);
                    $scope.comicList["type"].push(cols[2]);
                    $scope.comicList["railNo"].push(cols[3]);
                }
                // imgListの場合
                else if (cols[0] == "imgList") {
                    for (let j = 1; j < cols.length; j++) {
                        $scope.headerInfoList["imgList"].push(cols[j]);
                    }
                }
                // seListの場合
                else if (cols[0] == "seList") {
                    for (let j = 1; j < cols.length; j++) {
                        $scope.headerInfoList["seList"].push(cols[j]);
                    }
                }
                // bgmListの場合
                else if (cols[0] == "bgmList") {
                    for (let j = 1; j < cols.length; j++) {
                        $scope.headerInfoList["bgmList"].push(cols[j]);
                    }
                }
                // その他はコミックスクリプト
                else {
                    for (let j = 0; j < cols.length; j++) {
                        if (cols[j] == ""){
                            continue;
                        }
                        cmdList.push({
                            "info":cols[j],
                            "property":setProperty(cols, cols[0], j)
                        });
                    }
                    $scope.scriptList[comicNum].push(cmdList);
                    cmdList = [];
                }
            }
        }
        readTextFile("./dend/LS/RAIL002_comic.txt");
        $scope.obj = $scope.railList[0];

        function setProperty(cmdList, cmd, index){
            if (cmd == "CHK_TRAIN_TYPE" && index == 2) {
                return $scope.trainList[Number(cmdList[index])];
            } else if (cmd == "PlayComicBGM" && index == 1) {
                return $scope.headerInfoList["bgmList"][Number(cmdList[index])];
            }
            return "";
        }
    }]);

angular.module('myModule', [])
    .filter('numberFixedLen', function () {
        return function (n, len) {
            var num = parseInt(n, 10);
            len = parseInt(len, 10);
            if (isNaN(num) || isNaN(len)) {
                return n;
            }
            num = ''+num;
            while (num.length < len) {
                num = '0'+num;
            }
            return num;
        };
    });