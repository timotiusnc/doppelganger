function NavbarMessagingCtrl($scope, sharedService) {
    /**
     * @name compileBtnClick
     * @methodOf CodeMessagingCtrl#
     */
    $scope.compileBtnClick = function(){
        sharedService.prepForBroadcast(sharedService.ASK_TO_COMPILE, null);
    }

    $scope.executeBtnClick = function(){
        sharedService.prepForBroadcast(sharedService.ASK_TO_EXECUTE, null);
    }
}
NavbarMessagingCtrl.$inject = ['$scope', 'sharedService'];
