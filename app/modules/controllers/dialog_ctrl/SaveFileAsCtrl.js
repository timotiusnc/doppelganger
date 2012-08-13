/*
 * KeyDownEvent controller
 * Intercept all keydown event
 */

function SaveFileAsCtrl($scope, fileHandler, sharedService){
    $scope.selectedTab = null;
    $scope.newFileName = '';

    $scope.save_file_as = function(){
        var oldFileName = $scope.selectedTab.tabTitle;

        //change textarea ID and tab title
        $("#"+oldFileName.replace(".", "\\.")).attr('id', $scope.newFileName);
        $scope.selectedTab.tabTitle = $scope.newFileName;

        fileHandler.saveFileAs(oldFileName, $scope.newFileName);

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
