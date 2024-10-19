angular.module('myApp', [])
    .controller('myCtrl', ['$scope', function($scope) {
        $scope.cmdInfoList = [];
        $scope.modelCheck = true;
        $scope.allNotUsed = true;
        $scope.notDefined = true;

        $scope.isMatch = function(str, regax) {
            const regex = new RegExp(regax);
            return regex.test(str);
        }

        let cmdKeys = Object.keys(CMD);
        for (let i = 0; i < cmdKeys.length; i++) {
            let cmdKey = cmdKeys[i];
            let cmdObj = CMD[cmdKey];
            let cmdInfo = {};
            let cmdUsedList = [];
            let cmdSeries = "comic";
            if (CMD[cmdKey]["description"] == NOT_DEFINED) {
                cmdSeries = "notDefined";
            }
            if (CMD[cmdKey]["description"].indexOf("【モデルバイナリ】") != -1) {
                cmdSeries = "model";
            }

            if ($scope.isMatch(CMD[cmdKey]["description"], "^【.*LS.*】")) {
                cmdUsedList.push("LS");
            } else {
                cmdUsedList.push("");
            }
            if ($scope.isMatch(CMD[cmdKey]["description"], "^【.*BS.*】")) {
                cmdUsedList.push("BS");
            } else {
                cmdUsedList.push("");
            }
            if ($scope.isMatch(CMD[cmdKey]["description"], "^【.*CS.*】")) {
                cmdUsedList.push("CS");
            } else {
                cmdUsedList.push("");
            }
            if ($scope.isMatch(CMD[cmdKey]["description"], "^【.*RS.*】")) {
                cmdUsedList.push("RS");
            } else {
                cmdUsedList.push("");
            }
            if ($scope.isMatch(CMD[cmdKey]["description"], "^【.*SS.*】")) {
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
            let notDefinedFlag = true;
            let lsFlag = true;
            let bsFlag = true;
            let csFlag = true;
            let rsFlag = true;
            let ssFlag = true;
            let cmdNameFlag = true;
            if (!$scope.modelCheck && 
                !$scope.allNotUsed &&
                !$scope.notDefined &&
                !$scope.LSCheck &&
                !$scope.BSCheck &&
                !$scope.CSCheck &&
                !$scope.RSCheck &&
                !$scope.SSCheck &&
                !$scope.cmdName) {
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
            if ($scope.notDefined) {
                if (item.cmdSeries == "notDefined") {
                    notDefinedFlag = false;
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
            if ($scope.cmdName) {
                if (item.name.toUpperCase().indexOf($scope.cmdName.toUpperCase()) == -1) {
                    cmdNameFlag = false;
                }
            }

            if (modelCheckFlag && 
                allNotUsedFlag &&
                notDefinedFlag &&
                lsFlag &&
                bsFlag &&
                csFlag &&
                rsFlag &&
                ssFlag &&
                cmdNameFlag) {
                return item;
            }
        }
    }]);