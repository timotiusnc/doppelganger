/*
 * KeyDownEvent controller
 * Intercept all keydown event
 */

function OpenFileCtrl($scope, fileHandler, sharedService){
    $scope.files = null;
    $scope.noFile = '';
    $scope.selectDeselectStr = 'Select All';

    $scope.open = function(){
        for(var key in $scope.files){
            if($scope.files[key].checked){
                var fileContent = fileHandler.openFile($scope.files[key].fileName);
                if(fileContent != null){
                    sharedService.prepForBroadcast(sharedService.NEW_TAB_BTN_CLICKED, {title: $scope.files[key].fileName, content: (fileContent ? fileContent : '')});
                }
            }
        }

        $("#openFileModal").modal('hide');
    }

    $scope.selectDeselect = function(){
        var selectDeselectVar = null;

        if($scope.selectDeselectStr === 'Select All'){
            $scope.selectDeselectStr = 'Deselect All';
            selectDeselectVar = true;
        }else{
            $scope.selectDeselectStr = 'Select All';
            selectDeselectVar = false;
        }

        for(var key in $scope.files){
            $scope.files[key].checked = selectDeselectVar;
        }
    }

    $('#openFileModal').on('shown', function () { //When the modal shown
        var ctr = 0;
        $scope.files = fileHandler.listFilesOnLocalStorage();
        $scope.selectDeselectStr = 'Deselect All';

        for(var key in $scope.files){
            ++ctr;
            $scope.files[key].checked = true; //initialize check state to true
        }

        if(ctr == 0){
            $scope.noFile = 'No saved file';
        }
    });
}
OpenFileCtrl.$inject = ['$scope', 'fileHandler', 'sharedService'];
