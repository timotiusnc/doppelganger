/*
 * KeyDownEvent controller
 * Intercept all keydown event
 */

function CompileCtrl($scope, sharedService, lxConnector, browserDetect){
    $scope.fileNames = null;
    $scope.files = [];

    $scope.compile = function(){
        //Hide the compileModal dialog
        $("#compileModal").modal('hide');

        //Submit the code to lxConnector
        lxConnector.submit($scope.fileNames, $scope.files);
    }

    $('#compileModal').on('show', function () { //When a modal shown
        //Request files' name to EditorCtrl
        sharedService.prepForBroadcast(sharedService.REQUEST_FILE_NAMES, null);

        //Request files' content to TextAreaCtrl
        sharedService.prepForBroadcast(sharedService.REQUEST_CODE_TEXT, null);
    });

    /**
     * Broadcast handling
     */
    $scope.$on(sharedService.HANDLE_BROADCAST, function(){
        if(sharedService.message == sharedService.FILE_NAMES_RESPONSE){ //Files' name requested from EditorCtrl
            $scope.fileNames = sharedService.param;
        }else if(sharedService.message == sharedService.CODE_TEXT_RESPONSE){
            $scope.files = sharedService.param;
        }
    });
}
TextAreaCtrl.$inject = ['$scope', 'sharedService', 'lxConnector', 'browserDetect'];
