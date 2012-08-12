function EditorCtrl($scope, sharedService) {
    $scope.tabs = []; //Semantically an array of Tab Title, the content (codeEditTextArea) is another instance

    $scope.addNewTab = function(title, content, selected){
        $scope.tabs.push({
            tabTitle: (title == '') ? ('untitled-' + ($scope.tabs.length)) : title,
            tabContent: (content) ? content : '',
            selected: selected
        });
        sharedService.prepForBroadcast(sharedService.NEW_TAB_ADDED, null);
    }

    $scope.$on(sharedService.HANDLE_BROADCAST, function(){
        if(sharedService.message == sharedService.NEW_TAB_BTN_CLICKED){
            $scope.addNewTab(sharedService.param.title, sharedService.param.content);
        }else if(sharedService.message == sharedService.REQUEST_FILE_NAMES){
            //Response for Files' name requested from CompileCtrl
            sharedService.prepForBroadcast(sharedService.FILE_NAMES_RESPONSE, $scope.tabs);
        }
    });

    //Add default tab
    $scope.addNewTab('main', '', true);
}
EditorCtrl.$inject = ['$scope', 'sharedService'];