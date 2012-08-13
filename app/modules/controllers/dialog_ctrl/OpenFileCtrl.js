/*
 * KeyDownEvent controller
 * Intercept all keydown event
 */

function OpenFileCtrl($scope, fileHandler, sharedService){
    $scope.fileNames = null;
    $scope.files = [];

    $scope.open = function(){
        //Hide the compileModal dialog
        $("#openFileModal").modal('hide');
    }

    $('#openFileModal').on('show', function () { //When the modal shown
        
    });
}
TextAreaCtrl.$inject = ['$scope', 'fileHandler', 'sharedService'];
