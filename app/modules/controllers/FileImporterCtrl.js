/*
 * KeyDownEvent controller
 * Intercept all keydown event
 */

function FileImporterCtrl($scope, sharedService){
    $scope.files = [];

    $scope.handleFileSelect = function (evt) {
        $scope.files = evt.target.files;
        $scope.$apply();
    }

    $scope.handleFileSelectFromDrop = function(evt){
        evt.stopPropagation();
        evt.preventDefault();

        $scope.files = evt.dataTransfer.files;
        $scope.$apply();
    }

    $scope.handleDragOver = function handleDragOver(evt) {
        evt.stopPropagation();
        evt.preventDefault();
    }

    $scope.importFiles = function(){
        for (i=0, n=$scope.files.length; i<n; i++) {
            var f = $scope.files[i];

            if(f.size < 1048576){ //only process file with size < 1 MB
                var reader = new FileReader();
                reader.readAsText(f);
                reader.onload = (function(file){
                    return function(e){
                        sharedService.prepForBroadcast(sharedService.NEW_TAB_BTN_CLICKED, {title: file.name, content: e.target.result});
                        $scope.$apply();
                    }
                })(f);
            }
        }
        
        $("#importFileModal").modal('hide');
    }
}
FileImporterCtrl.$inject = ['$scope', 'sharedService'];
