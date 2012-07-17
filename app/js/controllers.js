'use strict';

/* Controllers */

function GlobalCtrl($scope, sharedService){
    $scope.compileBtnClick = function(){
        $("#compileModal").modal('show');
    }

    $scope.sendFileBtnClick = function(){
        $("#sendFileModal").modal('show');
    }

    $scope.listFileBtnClick = function(){
        $scope.log('list file btn click');
    }

    $scope.addNewTabBtnClick = function(){
        sharedService.prepForBroadcast(sharedService.NEW_TAB_BTN_CLICKED, null);
    }
}
GlobalCtrl.$inject = ['$scope', 'sharedService'];

function MyCtrl1($scope, sharedService) {
    $scope.tabs = [];

    $scope.addNewTab = function(title, selected){
        $scope.tabs.push({
            tabTitle: (title == "") ? ('untitled-' + ($scope.tabs.length)) : title,
            selected: selected
        });
        sharedService.prepForBroadcast(sharedService.NEW_TAB_ADDED, null);
    }

    $scope.$on(sharedService.HANDLE_BROADCAST, function(){
        if(sharedService.message == sharedService.NEW_TAB_BTN_CLICKED){
            $scope.addNewTab('');
        }else if(sharedService.message == sharedService.REQUEST_FILES){
            sharedService.prepForBroadcast(sharedService.REQUEST_FILES_RESPONSE, $scope.tabs);
        }
    });

    //Add default tab
    $scope.addNewTab('main', true);
}
MyCtrl1.$inject = ['$scope', 'sharedService'];

function MyCtrl2($scope) {
    $scope.tes = 'asoe';
    $scope.changeTes = function(){
        $scope.tes = 'bukan asoe';
    }
}
MyCtrl2.$inject = ['$scope'];

/*$http({
        method: 'POST',
        url: 'http://167.205.32.27/lz/services/grading/compile',
        data: {
            asu: 'tes',
            tes: 'asu'
        }
    });*/
