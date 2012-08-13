/*
 * KeyDownEvent controller
 * Intercept all keydown event
 */

function OpenFileCtrl($scope, fileHandler, sharedService){
    $scope.files = null;

    $scope.open = function(){
        for(var key in $scope.files){
            if($scope.files[key].checked){
                var fileContent = fileHandler.openFile($scope.files[key].fileName);
                sharedService.prepForBroadcast(sharedService.NEW_TAB_BTN_CLICKED, {title: $scope.files[key].fileName, content: (fileContent ? fileContent : '')});
            }
        }

        $("#openFileModal").modal('hide');
    }

    $('#openFileModal').on('shown', function () { //When the modal shown
        $scope.files = fileHandler.listFilesOnLocalStorage();

        for(var key in $scope.files){
            $scope.files[key].checked = true; //initialize check state to true
        }
    });
}
TextAreaCtrl.$inject = ['$scope', 'fileHandler', 'sharedService'];