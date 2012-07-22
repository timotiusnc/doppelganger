/*
 * KeyDownEvent controller
 * Intercept all keydown event
 */

function FooterCtrl($scope, sharedService, browserDetect){
    $scope.result   = '';
    $scope.report   = '';
    $scope.error    = '';
    $scope.output   = '';
    $scope.wheight  = '';
    $scope.UA       = '';
    $scope.fileAPI  = '';

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

    $scope.wheight = 'Height = ' + $(window).height();
    $(window).resize(function() { //Bind and event (window resized)
        $scope.wheight = 'Height = ' + $(window).height();
        $scope.$apply();
    });

    $scope.UA = '\n' + ' on ' + browserDetect.OS + ' mobile ' + browserDetect.mobileVendor;
    $scope.fileAPI = browserDetect.fileAPISupport();
}
TextAreaCtrl.$inject = ['$scope', 'sharedService', 'browserDetect'];
