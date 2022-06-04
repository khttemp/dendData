angular.module('myApp', ['myModule'])
    .controller('myCtrl', ['$scope', function($scope) {
        $scope.railList = [];
        $scope.selectFile = "RAIL002";

        $scope.comicList = {
            "num":[],
            "type":[],
            "railNo":[]
        };
        $scope.scriptList = {};
        $scope.selectScript = [];

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
                    
                }
                // seListの場合
                else if (cols[0] == "seList") {
                    
                }
                // bgmListの場合
                else if (cols[0] == "bgmList") {
                    
                }
                // その他はコミックスクリプト
                else {
                    for (let j = 0; j < cols.length; j++) {
                        if (cols[j] == ""){
                            continue;
                        }
                        cmdList.push(cols[j]);
                    }
                    $scope.scriptList[comicNum].push(cmdList);
                    cmdList = [];
                }
            }
        }
        readTextFile("./dend/LS/RAIL002_comic.txt");
        $scope.obj = $scope.railList[0];
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



let tableRailNo = document.getElementById("railNo");
let tableRailFlag = false;
let trNum;
let trType;
let trRailNo;



function update(){

}