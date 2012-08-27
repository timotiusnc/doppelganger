function NavbarMessagingCtrl($scope, lxConnector, sharedService) {
    $scope.evaluation_set_id = '';

    /**
     * @name compileBtnClick
     * @methodOf CodeMessagingCtrl#
     */
    $scope.compileBtnClick = function(){
        if(!$scope.evaluation_set_id || $scope.evaluation_set_id<=0){
            alert("Please specify a valid evaluation set ID");
        }else{
            sharedService.prepForBroadcast(sharedService.ASK_TO_COMPILE, $scope.evaluation_set_id);
        }
    }

    $scope.executeBtnClick = function(){
        if(!$scope.evaluation_set_id  || $scope.evaluation_set_id<=0){
            alert("Please specify a valid evaluation set ID");
        }else{
            sharedService.prepForBroadcast(sharedService.ASK_TO_EXECUTE, $scope.evaluation_set_id);
        }
    }

    $scope.getResultBtnClick = function(){
        lxConnector.getResultManual();
    }
}
NavbarMessagingCtrl.$inject = ['$scope', 'lxConnector', 'sharedService'];
