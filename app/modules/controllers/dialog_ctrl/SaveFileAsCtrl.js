/*
 * KeyDownEvent controller
 * Intercept all keydown event
 */

function SaveFileAsCtrl($scope, fileHandler, sharedService){
    $scope.selectedTab = null;
    $scope.newFileName = '';

    $scope.save_file_as = function(){
        var oldFileName = $scope.selectedTab.tabTitle;
        var newFileName = fileHandler.formatFileName($scope.newFileName);

        //change textarea ID and tab title
        $("#"+oldFileName.replace(/[.]/g,"\\.")).attr('id', newFileName);
        $scope.selectedTab.tabTitle = newFileName;

        fileHandler.saveFileAs(oldFileName, newFileName);
        alert('File ' + newFileName + ' has been saved');

        $scope.newFileName = ''; //initialize with empty string again for next save-as command
        $("#saveFileAsModal").modal('hide');
    }

    $scope.close = function(){
        $scope.newFileName = ''; //initialize with empty string again for next save-as command
    }

    $('#saveFileAsModal').on('shown', function () { //When a modal shown
        $("#newfilename_input").focus();//auto focus
        
        //Request old files' name to CodeEditorCtrl
        sharedService.prepForBroadcast(sharedService.REQUEST_OLD_FILE_NAME, null);
    });

    $scope.$on(sharedService.HANDLE_BROADCAST, function(){
        if(sharedService.message == sharedService.OLD_FILE_NAME_RESPONSE){ //OldFiles' name requested from EditorCtrl
            $scope.selectedTab = sharedService.param;
        }
    });
}
SaveFileAsCtrl.$inject = ['$scope', 'fileHandler', 'sharedService'];
