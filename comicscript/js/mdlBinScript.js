angular.module('myApp', [])
    .controller('myCtrl', ['$scope', function($scope) {
        $scope.mdlBinFileList = [];
        $scope.scriptList = [];
        $scope.headerInfoList = {};

        $scope.updateFile = function(path) {
            readTextFile(path);
        }

        function readFileList(file){
            var rawFile = new XMLHttpRequest();
            rawFile.open("GET", file, false);
            rawFile.onreadystatechange = function (){
                if (rawFile.readyState === 4){
                    if (rawFile.status === 200 || rawFile.status == 0){
                        var allText = rawFile.responseText;
                        let rows = allText.split("\n");
                        for (let i = 0; i < rows.length; i++){
                            if (rows[i] == "") {
                                continue;
                            }
                            rows[i] = rows[i].replaceAll("\r", "");
                            if (rows[i] == "-") {
                                let info = {"name":"---", "path":rows[i], "disabled":true};
                                $scope.mdlBinFileList.push(info);
                            } else {
                                let filename = rows[i].split(".txt")[0]
                                let info = {"name":filename + ".bin", "path":"./mdlBin/" + rows[i], "disabled":false};
                                $scope.mdlBinFileList.push(info);
                            }
                        }
                    }
                }
            };
            rawFile.send(null);
        }
        readFileList("./mdlBinList.txt");

        function readTextFile(file){
            var rawFile = new XMLHttpRequest();
            rawFile.open("GET", file, false);
            rawFile.onreadystatechange = function (){
                if (rawFile.readyState === 4){
                    if (rawFile.status === 200 || rawFile.status == 0){
                        var allText = rawFile.responseText;
                        TableInput(allText);
                    }
                }
            };
            rawFile.send(null);
        }
        
        function TableInput(allText){
            allText = allText.replaceAll("\r", "")
            let rows = allText.split("\n");
            let cmdList = [];
            $scope.scriptList = [];
            $scope.headerInfoList = {};
            $scope.headerInfoList["imgList"] = [];
            $scope.headerInfoList["smfList"] = [];
            $scope.headerInfoList["wavList"] = [];
            for (let i = 0; i < rows.length; i++){
                // \tで分ける
                let cols = rows[i].split("\t");
                // imgListの場合
                if (cols[0] == "imgList") {
                    for (let j = 1; j < cols.length; j++) {
                        $scope.headerInfoList["imgList"].push(cols[j]);
                    }
                }
                // seListの場合
                else if (cols[0] == "smfList") {
                    for (let j = 1; j < cols.length; j++) {
                        $scope.headerInfoList["smfList"].push(cols[j]);
                    }
                }
                // bgmListの場合
                else if (cols[0] == "wavList") {
                    for (let j = 1; j < cols.length; j++) {
                        $scope.headerInfoList["wavList"].push(cols[j]);
                    }
                }
                // その他はコミックスクリプト
                else {
                    for (let j = 0; j < cols.length; j++) {
                        if (cols[j] == ""){
                            continue;
                        }
                        if (cols[0] == "-") {
                            cmdList.push({
                                "info":cols[j],
                                "property":"---section---"
                            });
                        } else {
                            cmdList.push({
                                "info":cols[j],
                                "property":setProperty(cols, cols[1], j)
                            });
                        }
                    }
                    $scope.scriptList.push(cmdList);
                    cmdList = [];
                }
            }
        }
        $scope.obj = $scope.mdlBinFileList[0];
        readTextFile($scope.obj.path);

        function setProperty(cmdList, cmd, idx){
            if (idx == 1) {
                if (CMD[cmd].description != "") {
                    return CMD[cmd].description.replaceAll(' ', '');
                }
            }
            let index = Number(cmdList[idx]);
            if (cmd == "Set3DObj" && idx == 2) {
                return $scope.headerInfoList["smfList"][index];
            }
            return "";
        }
    }]);