function NavbarMessagingCtrl($scope, lxConnector, sharedService) {
    $scope.evaluation_set_id = '';
    $scope.last_archive = '';

    /**
     * @name compileBtnClick
     * @methodOf CodeMessagingCtrl#
     */
    $scope.compileBtnClick = function(){
        /*if(!$scope.evaluation_set_id || $scope.evaluation_set_id<=0){
            alert("Please specify a valid evaluation set ID");
        }else{*/
            sharedService.prepForBroadcast(sharedService.ASK_TO_COMPILE, $scope.evaluation_set_id);
        //}
    }

    $scope.executeBtnClick = function(){
        /*if(!$scope.evaluation_set_id  || $scope.evaluation_set_id<=0){
            alert("Please specify a valid evaluation set ID");
        }else{*/
            sharedService.prepForBroadcast(sharedService.ASK_TO_EXECUTE, $scope.evaluation_set_id);
        //}
    }
    //

    $scope.getResultBtnClick = function(){
        lxConnector.getResultManual();
    }

    $scope.$on(sharedService.HANDLE_BROADCAST, function(){
        if(sharedService.message == sharedService.RESULT_RECEIVED){
            $scope.$apply(function(){
                $scope.last_archive = "http://" + lxConnector.mw_address + "/lz/services/grading/downloadarchive?id=" + sharedService.param + "&clienttoken=" + lxConnector.client_token;
            });
        }
    });
}
NavbarMessagingCtrl.$inject = ['$scope', 'lxConnector', 'sharedService'];
