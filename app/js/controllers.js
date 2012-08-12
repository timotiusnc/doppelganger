/* Controllers */

'use strict';

/**
 * @name MainCtrl
 * @class Application level controller
 */
function MainCtrl($scope, sharedService, eventRecorder){
    /**
     * @name compileBtnClick
     * @methodOf MainCtrl#
     */
    $scope.compileBtnClick = function(){
        $("#compileModal").modal('show');
    }

    /**
     * @name sendFileBtnClick
     * @methodOf MainCtrl#
     */
    $scope.sendFileBtnClick = function(){
        $("#sendFileModal").modal('show');
    }

    /**
     * @name importFileBtnClick
     * @methodOf MainCtrl#
     */
    $scope.importFileBtnClick = function(){
        $("#importFileModal").modal('show');
    }

    /**
     * @name addNewTabBtnClick
     * @methodOf MainCtrl#
     */
    $scope.addNewTabBtnClick = function(){
        sharedService.prepForBroadcast(sharedService.NEW_TAB_BTN_CLICKED, {title: '', content: ''});
    }

    $scope.stopCodingBtnClick = function(){
        jConfirm('Are you sure you want to stop coding?', 'Stop Coding Confirmation', function(r) {
            if(r){
                sharedService.prepForBroadcast(sharedService.STOPCODING_ACTION, null);
            }
        });
    }
}
MainCtrl.$inject = ['$scope', 'sharedService', 'eventRecorder'];

function MyCtrl2($scope) {
    $scope.tes = 'tes';
    $scope.changeTes = function(){
        $scope.tes = 'bukan tes';
    }
}
MyCtrl2.$inject = ['$scope'];
