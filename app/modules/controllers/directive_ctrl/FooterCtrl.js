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
    $scope.localStore = '';

    $scope.$on(sharedService.HANDLE_BROADCAST, function(){
        if(sharedService.message == sharedService.ASK_FOR_INPUT_FILE){
            sharedService.prepForBroadcast(sharedService.RESPONSE_FOR_INPUT_FILE, {eval_id:sharedService.param, input: $scope.input});
        }else if(sharedService.message == sharedService.RESULT_RECEIVED){
            $scope.$apply(function(){
                $scope.output = "Your request has been received, please wait for the result or get it manually by clicking 'Get Result' button";
            });
        }else if(sharedService.message == sharedService.CODE_GRADED){
            $scope.report = sharedService.param;
            console.log('report', $scope.report);
            if(typeof $scope.report == "object"){
                if($scope.report.grade_result){
                    if($scope.report.grade_result['return'] == 0){
                        $scope.output = $scope.report.grade_result.output + '\n' + $scope.report.grade_result.sandboxoutput;
                        $scope.error = '';
                        $scope.$apply();
                        $("#footer_tab a[href='#output']").tab('show');
                    }else if($scope.report.grade_result['return'] != 0){
                        $scope.error = $scope.report.grade_result.output + '\n' + $scope.report.grade_result.sandboxoutput;
                        $scope.output = '';
                        $scope.$apply();
                        $("#footer_tab a[href='#error']").tab('show');
                    }
                }else if($scope.report.compile_result){
                    if($scope.report.compile_result['return'] == 0){
                        $scope.output = "Compilation success\n" + $scope.report.compile_result.output;
                        $scope.error = '';
                        $scope.$apply();
                        $("#footer_tab a[href='#output']").tab('show');
                    }else{
                        $scope.error = $scope.report.compile_result.output;
                        $scope.output = '';
                        $scope.$apply();
                        $("#footer_tab a[href='#error']").tab('show');
                    }
                }
            }else if(typeof $scope.report == "string"){
                //if($scope.report.indexOf("Error") != -1){
                    $scope.error = $scope.report;
                    $scope.output = '';
                    $scope.$apply();
                    $("#footer_tab a[href='#error']").tab('show');
                //}
            }else{
                $scope.error = 'Unknown Error, contact system administrator';
                $scope.$apply();
                $("#footer_tab a[href='#error']").tab('show');
            }
        }
    });

    $scope.wheight = 'Height = ' + $(window).height();
    $(window).resize(function() { //Bind and event (window resized)
        $scope.$apply(function(){
            $scope.wheight = 'Height = ' + $(window).height();
        });
    });

    $scope.UA = '\n' + ' on ' + browserDetect.OS + ' mobile=' + browserDetect.mobileVendor;
    $scope.fileAPI = browserDetect.fileAPISupport();
    $scope.localStore = browserDetect.supportLocalStorage();
}
FooterCtrl.$inject = ['$scope', 'sharedService', 'browserDetect'];
