function CodeEditorCtrl($scope, fileHandler, sharedService) {
    $scope.tabs = []; //Semantically an array of Tab Title, the content (codeEditTextArea) is another instance

    $scope.getSelectedTab = function(){
        var found = false, i=0;
        while(!found && i<$scope.tabs.length){
            if($scope.tabs[i].selected){
                found = true;
            }else{
                ++i;
            }
        }

        if(found){
            return $scope.tabs[i];
        }else{
            return null;
        }
    }

    $scope.addNewTab = function(title, content, selected){
        var fileName = (title == '') ? ('untitled-' + (TextAreaCtrl.INSTANCE_CTR)) : title;
        $scope.tabs.push({
            tabTitle: fileName,
            tabInitialContent: (content) ? content : '',
            selected: selected
        });
        fileHandler.createNewFile(fileName);
        sharedService.prepForBroadcast(sharedService.NEW_TAB_ADDED, null); //to tabbedpane.js, set selected to the newest one
    }

    $scope.$on(sharedService.HANDLE_BROADCAST, function(){
        if(sharedService.message == sharedService.NEW_TAB_BTN_CLICKED){
            $scope.addNewTab(sharedService.param.title, sharedService.param.content);
        }else if(sharedService.message == sharedService.REQUEST_OLD_FILE_NAME){
            var selectedTab = $scope.getSelectedTab();
            sharedService.prepForBroadcast(sharedService.OLD_FILE_NAME_RESPONSE, selectedTab);
        }
    });

    //Add default tab
    //$scope.addNewTab('main', '', true);

    console.log(NavbarCtrl.TES);
}
CodeEditorCtrl.$inject = ['$scope', 'fileHandler', 'sharedService'];