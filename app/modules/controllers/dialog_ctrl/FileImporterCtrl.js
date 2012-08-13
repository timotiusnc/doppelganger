/*
 * KeyDownEvent controller
 * Intercept all keydown event
 */

function FileImporterCtrl($scope, fileHandler, sharedService){
    $scope.files = [];

    $scope.handleFileSelect = function (evt) {
        $scope.$apply(function(){
            $scope.files = evt.target.files;
        })
    }

    $scope.handleFileSelectFromDrop = function(evt){
        evt.stopPropagation();
        evt.preventDefault();

        $scope.$apply(function(){
            $scope.files = evt.dataTransfer.files;
        });
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
                        $scope.$apply(function(){
                            sharedService.prepForBroadcast(sharedService.NEW_TAB_BTN_CLICKED, {title: fileHandler.formatFileName(file.name), content: e.target.result});
                        });
                    }
                })(f);
            }
        }
        
        $("#importFileModal").modal('hide');
    }
}
FileImporterCtrl.$inject = ['$scope', 'fileHandler', 'sharedService'];
