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
     * @name importFileBtnClick
     * @methodOf AppCtrl#
     */
    $scope.importFileBtnClick = function(){
        $("#importFileModal").modal('show');
    }

    /**
     * @name addNewTabBtnClick
     * @methodOf AppCtrl#
     */
    $scope.addNewTabBtnClick = function(){
        sharedService.prepForBroadcast(sharedService.NEW_TAB_BTN_CLICKED, {title: '', content: ''});
    }
}
AppCtrl.$inject = ['$scope', 'sharedService'];

function EditorCtrl($scope, sharedService) {
    $scope.tabs = []; //Semantically an array of Tab Title, the content (codeEditTextArea) is another instance

    $scope.addNewTab = function(title, content, selected){
        console.log(content);
        $scope.tabs.push({
            tabTitle: (title == '') ? ('untitled-' + ($scope.tabs.length)) : title,
            tabContent: (content) ? content : '',
            selected: selected
        });
        sharedService.prepForBroadcast(sharedService.NEW_TAB_ADDED, null);
    }

    $scope.$on(sharedService.HANDLE_BROADCAST, function(){
        if(sharedService.message == sharedService.NEW_TAB_BTN_CLICKED){
            //console.log('masuk ' + sharedService.param.title + ' ' + sharedService.param.content);
            $scope.addNewTab(sharedService.param.title, sharedService.param.content);
        }else if(sharedService.message == sharedService.REQUEST_FILE_NAMES){ //Files requested from CompileCtrl
            sharedService.prepForBroadcast(sharedService.REQUEST_FILE_NAMES_RESPONSE, $scope.tabs);
        }
    });

    //Add default tab
    $scope.addNewTab('main', '', true);
}
EditorCtrl.$inject = ['$scope', 'sharedService'];

function MyCtrl2($scope) {
    $scope.tes = 'tes';
    $scope.changeTes = function(){
        $scope.tes = 'bukan tes';
    }
}
MyCtrl2.$inject = ['$scope'];
