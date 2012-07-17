/*
 * KeyDownEvent controller
 * Intercept all keydown event
 */

function FooterCtrl($scope, sharedService){
    $scope.result   = '';
    $scope.report   = '';
    $scope.error    = '';
    $scope.output   = '';

    $scope.$on(sharedService.HANDLE_BROADCAST, function(){
        if(sharedService.message == sharedService.RESULT_RECEIVED){
            $scope.result = sharedService.param;
            $scope.$apply(); //jika $apply ini dikeluarkan dari if else, muncul error $digest already in progress
        }else if(sharedService.message == sharedService.CODE_GRADED){
            $scope.report= sharedService.param
            if($scope.report.compile_result['return'] != 0){
                $scope.error = $scope.report.compile_result.output;
                $("#footer_tab a[href='#error']").tab('show');
            }else{
                $scope.output = $scope.report.compile_result.output;
                $("#footer_tab a[href='#output']").tab('show');
            }
            $scope.$apply();
        }
    });
}
KeyDownCtrl.$inject = ['$scope', 'sharedService'];
