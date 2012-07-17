/*
 * KeyDownEvent controller
 * Intercept all keydown event
 */

function CompileCtrl($scope, lxConnector, sharedService){
    $scope.fileNames = '';
    $scope.files = [];

    //When a modal shown, get current files
    $('#compileModal').on('show', function () {
        sharedService.prepForBroadcast(sharedService.REQUEST_FILES, null);
    });

    $scope.$on(sharedService.HANDLE_BROADCAST, function(){
        if(sharedService.message == sharedService.REQUEST_FILES_RESPONSE){
            $scope.fileNames = sharedService.param;
        }
    });

    $scope.compile = function(){
        console.log('submit compilation request = ' + KeyDownCtrl.INSTANCE_CTR);
        $("#compileModal").modal('hide');

        for(i=1; i<=KeyDownCtrl.INSTANCE_CTR; ++i){ //Get file contents());
            $scope.files[i-1] = $("#editor-" + i).val();
        }
        
        //console.log('input = ' + $("#input_txt").val());
        lxConnector.submit($scope.fileNames, $scope.files);
    }
}
KeyDownCtrl.$inject = ['$scope', 'lxConnector', 'sharedService'];
