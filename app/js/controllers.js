/* Controllers */

'use strict';

/**
 * @name AppCtrl
 * @class Application level controller
 */
function AppCtrl($scope, sharedService){
    /**
     * @name compileBtnClick
     * @methodOf AppCtrl#
     */
    $scope.compileBtnClick = function(){
        $("#compileModal").modal('show');
    }

    /**
     * @name sendFileBtnClick
     * @methodOf AppCtrl#
     */
    $scope.sendFileBtnClick = function(){
        $("#sendFileModal").modal('show');
    }

    /**
     * @name listFileBtnClick
     * @methodOf AppCtrl#
     */
    $scope.listFileBtnClick = function(){
        $scope.log('list file btn click');
    }

    /**
     * @name addNewTabBtnClick
     * @methodOf AppCtrl#
     */
    $scope.addNewTabBtnClick = function(){
        sharedService.prepForBroadcast(sharedService.NEW_TAB_BTN_CLICKED, null);
    }
}
AppCtrl.$inject = ['$scope', 'sharedService'];

function EditorCtrl($scope, sharedService) {
    $scope.tabs = []; //Semantically an array of Tab Title, the content (codeEditTextArea) is another instance

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
        }else if(sharedService.message == sharedService.REQUEST_FILE_NAMES){ //Files requested from CompileCtrl
            sharedService.prepForBroadcast(sharedService.REQUEST_FILE_NAMES_RESPONSE, $scope.tabs);
        }
    });

    //Add default tab
    $scope.addNewTab('main', true);
}
EditorCtrl.$inject = ['$scope', 'sharedService'];

function MyCtrl2($scope) {
    $scope.tes = 'tes';
    $scope.changeTes = function(){
        $scope.tes = 'bukan tes';
    }
}
MyCtrl2.$inject = ['$scope'];
