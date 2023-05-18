angular.module('myApp', [])
    .controller('myCtrl', ['$scope', function($scope) {
        $scope.cmdInfoList = [];
        $scope.modelCheck = true;
        $scope.allNotUsed = true;

        let cmdKeys = Object.keys(CMD);
        for (let i = 0; i < cmdKeys.length; i++) {
            let cmdKey = cmdKeys[i];
            let cmdObj = CMD[cmdKey];
            let cmdInfo = {};
            let cmdUsedList = [];
            let cmdSeries = "comic";
            if (CMD[cmdKey]["description"].indexOf("【モデルバイナリ】") != -1) {
                cmdSeries = "model";
            }

            if (CMD[cmdKey]["LS_comic"] != undefined || CMD[cmdKey]["LS_bin"] != undefined) {
                cmdUsedList.push("LS");
            } else {
                cmdUsedList.push("");
            }
            if (CMD[cmdKey]["BS_comic"] != undefined || CMD[cmdKey]["BS_bin"] != undefined) {
                cmdUsedList.push("BS");
            } else {
                cmdUsedList.push("");
            }
            if (CMD[cmdKey]["CS_comic"] != undefined || CMD[cmdKey]["CS_bin"] != undefined) {
                cmdUsedList.push("CS");
            } else {
                cmdUsedList.push("");
            }
            if (CMD[cmdKey]["RS_comic"] != undefined || CMD[cmdKey]["RS_bin"] != undefined) {
                cmdUsedList.push("RS");
            } else {
                cmdUsedList.push("");
            }
            if (CMD[cmdKey]["SS_comic"] != undefined || CMD[cmdKey]["SS_cmn"] != undefined) {
                cmdUsedList.push("SS");
            } else {
                cmdUsedList.push("");
            }

            cmdInfo = {
                "num": cmdObj["num"],
                "name": cmdKey,
                "description": cmdObj["description"].split("<br>"),
                "cmdUsedList": cmdUsedList,
                "cmdSeries": cmdSeries
            };

            $scope.cmdInfoList.push(cmdInfo);
        }

        $scope.myFilter = function(item) {
            let modelCheckFlag = true;
            let allNotUsedFlag = true;
            let lsFlag = true;
            let bsFlag = true;
            let csFlag = true;
            let rsFlag = true;
            let ssFlag = true;
            if (!$scope.modelCheck && 
                !$scope.allNotUsed &&
                !$scope.LSCheck &&
                !$scope.BSCheck &&
                !$scope.CSCheck &&
                !$scope.RSCheck &&
                !$scope.SSCheck) {
                return item;
            }
            if ($scope.modelCheck) {
                if (item.cmdSeries == "model") {
                    modelCheckFlag = false;
                }
            }
            if ($scope.allNotUsed) {
                if (item.cmdUsedList.join("") == "") {
                    allNotUsedFlag = false;
                }
            }

            if ($scope.LSCheck) {
                if (item.cmdUsedList.indexOf("LS") == -1) {
                    lsFlag = false;
                }
            }
            if ($scope.BSCheck) {
                if (item.cmdUsedList.indexOf("BS") == -1) {
                    bsFlag = false;
                }
            }
            if ($scope.CSCheck) {
                if (item.cmdUsedList.indexOf("CS") == -1) {
                    csFlag = false;
                }
            }
            if ($scope.RSCheck) {
                if (item.cmdUsedList.indexOf("RS") == -1) {
                    rsFlag = false;
                }
            }
            if ($scope.SSCheck) {
                if (item.cmdUsedList.indexOf("SS") == -1) {
                    ssFlag = false;
                }
            }

            if (modelCheckFlag && 
                allNotUsedFlag &&
                lsFlag &&
                bsFlag &&
                csFlag &&
                rsFlag &&
                ssFlag) {
                return item;
            }
        }
    }]);