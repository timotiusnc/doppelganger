/*
 * KeyDownEvent controller
 * Intercept all keydown event
 */

function CompileCtrl($scope, lxConnector, sharedService, browserDetect){
    $scope.fileNames = '';
    $scope.files = [];

    $scope.compile = function(){
        $("#compileModal").modal('hide');

        //if Desktop OS used, tell TextAreaCtrl to transfer code from CodeMirror to original textarea
        if(!browserDetect.mobileVendor){
            sharedService.prepForBroadcast(sharedService.SAVE_CODE, null);
        }
        
        for(i=1; i<=TextAreaCtrl.INSTANCE_CTR; ++i){ //Get file contents());
            $scope.files[i-1] = $("#editor-" + i).val();
        }
        
        //console.log('input = ' + $("#input_txt").val());
        lxConnector.submit($scope.fileNames, $scope.files);
    }

    //eventListener
    $('#compileModal').on('show', function () { //When a modal shown, get current files
        sharedService.prepForBroadcast(sharedService.REQUEST_FILE_NAMES, null); //Request files to MyCtrl1
    });

    $scope.$on(sharedService.HANDLE_BROADCAST, function(){
        if(sharedService.message == sharedService.REQUEST_FILE_NAMES_RESPONSE){ //Files requested from MyCtrl1 responded
            $scope.fileNames = sharedService.param;
        }
    });
}
TextAreaCtrl.$inject = ['$scope', 'lxConnector', 'sharedService', 'browserDetect'];
