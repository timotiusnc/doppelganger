/*
 * KeyDownEvent controller
 * Intercept all keydown event
 */

function SaveFileAsCtrl($scope, fileHandler, sharedService){
    $scope.selectedTab = null;
    $scope.newFileName = '';

    $scope.save_file_as = function(){
        var fileContent, oldFileName;

        //save oldFileName
        oldFileName = $scope.selectedTab.tabTitle;

        //change textarea ID and tab title
        $("#"+$scope.selectedTab.tabTitle).attr('id', $scope.newFileName);
        $scope.selectedTab.tabTitle = $scope.newFileName;

        //[save code mirror value]; get textarea value
        sharedService.prepForBroadcast(sharedService.REQUEST_SAVE_FILE_AS, $scope.newFileName);
        fileContent = $("#" + $scope.newFileName).val();

        //change fileHandler.files file name; update file content attr
        fileHandler.changeFileName(oldFileName, $scope.newFileName);
        fileHandler.updateFileAttr($scope.newFileName, {content: fileContent});

        //delete old file and then save new file from/to localstorage
        fileHandler.deleteFileFromLocalStorage(oldFileName);
        fileHandler.saveFileToLocalStorage($scope.newFileName);

        $scope.newFileName = ''; //initialize with empty string again for next save-as command
        $("#saveFileAsModal").modal('hide');
    }

    $scope.close = function(){
        $scope.newFileName = ''; //initialize with empty string again for next save-as command
    }

    $('#saveFileAsModal').on('shown', function () { //When a modal shown
        //auto focus
        $("#newfilename_input").focus();
        
        //Request old files' name to CodeEditorCtrl
        sharedService.prepForBroadcast(sharedService.REQUEST_OLD_FILE_NAME, null);
    });

    $scope.$on(sharedService.HANDLE_BROADCAST, function(){
        if(sharedService.message == sharedService.OLD_FILE_NAME_RESPONSE){ //OldFiles' name requested from EditorCtrl
            $scope.selectedTab = sharedService.param;
            $scope.$apply();
        }
    });
}
SaveFileAsCtrl.$inject = ['$scope', 'fileHandler', 'sharedService'];
