/*
 * KeyDownEvent controller
 * Intercept all keydown event
 */

function CompileCtrl($scope, lxConnector, sharedService){
    $scope.fileNames = '';
    $scope.files = [];

    //When a modal shown, get current files
    $('#compileModal').on('show', function () {
        sharedService.prepForBroadcast('requestFiles', null);
    });

    $scope.$on('handleBroadcast', function(){
        if(sharedService.message == "requestFilesResponse"){
            //console.log('msg = ' + sharedService.message);
            //console.log('param = ' + sharedService.param[0].tabTitle);
            $scope.fileNames = sharedService.param;
            console.log('name = ' + $scope.fileNames[0].tabTitle);
        }
    });

    $scope.compile = function(){
        console.log('submit compilation request = ' + KeyDownCtrl.INSTANCE_CTR);
        $("#compileModal").modal('hide');

        for(i=1; i<=KeyDownCtrl.INSTANCE_CTR; ++i){
            console.log('val = ' + $("#editor-" + i).val());
            $scope.files[i-1] = $("#editor-" + i).val();
        }
        lxConnector.submit($scope.fileNames, $scope.files);
    }
}
KeyDownCtrl.$inject = ['$scope', 'lxConnector', 'sharedService'];
