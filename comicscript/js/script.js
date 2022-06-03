angular.module('myApp', ['myModule'])
    .controller('myCtrl', ['$scope', function($scope) {
        $scope.comicList = {
            "num":[],
            "type":[],
            "railNo":[]
        };

        $scope.scriptList = {};
        $scope.selectScript = [];

        $scope.updateScript = function(num) {
            $scope.selectScript = $scope.scriptList[num];
            console.log($scope.selectScript);
        }

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
        readTextFile("./dend/LS/RAIL002_comic.txt");
        
        function TableInput(allText){
            let rows = allText.split("\r\n");
            let comicNum = 0;
            let cmdList = [];
            for (let i = 0; i < rows.length - 1; i++){
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