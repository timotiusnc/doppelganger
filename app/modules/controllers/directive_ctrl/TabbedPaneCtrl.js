/*
 * KeyDownEvent controller
 * Intercept all keydown event
 */

function TabbedPaneCtrl($scope, fileHandler, sharedService){
    $scope.items = []; //tabs attribute

    $scope.selectItem = function(item) {
        angular.forEach($scope.items, function(it) {
            it.selected = false;
            fileHandler.stopTimer(it.tabTitle);
        });

        item.selected = true;
        fileHandler.startTimer(item.tabTitle);
        sharedService.prepForBroadcast(sharedService.CHANGE_NAVBAR_FILENAME, {tabTitle: item.tabTitle, tabLang: item.lang});
    };

    $scope.closeItem = function(item, $event){
        var found = false, i=0, changeSelected=false;

        /*if(item.selected){
            changeSelected = true;
        }*/

        while(!found && i<$scope.items.length){
            if($scope.items[i].tabTitle === item.tabTitle){
                found = true;
                $scope.items.splice(i, 1);
                fileHandler.stopTimer(item.tabTitle);
                fileHandler.deleteFileFromMemory(item.tabTitle); //delete it from memory so it is valid when user ask for grading
            }else{
                ++i;
            }
        }

        //If the deleted tab is selected, change selected to previous item
        /*if(changeSelected){
            --i;
            if( (i>=0) && (i<$scope.items.length)){
                $scope.selectItem($scope.items[i]);
            }else{ //no more items
                sharedService.prepForBroadcast(sharedService.CHANGE_NAVBAR_FILENAME, '');
            }
        }*/

        $event.preventDefault();
    }

    $scope.getSelectedTab = function(){
        var found = false, i=0;
        while(!found && i<$scope.items.length){
            if($scope.items[i].selected){
                found = true;
            }else{
                ++i;
            }
        }

        if(found){
            return $scope.items[i];
        }else{
            return null;
        }
    }

    $scope.addNewTab = function(title, content, selected){
        var fileName = (title == '') ? ('untitled-' + (TextAreaCtrl.INSTANCE_CTR)) : title;
        $scope.items.push({
            tabTitle: fileName,
            tabInitialContent: (content) ? content : '',
            selected: selected,
            lang: "Pascal" //default lang
        });

        fileHandler.createNewFile(fileName);

        //set selected tab to the newest one
        var i = 1;
        angular.forEach($scope.items, function(item) {
            if(i < $scope.items.length){
                item.selected = false;
                fileHandler.stopTimer(item.tabTitle);
            }else{
                item.selected = true;
                fileHandler.startTimer(item.tabTitle);
                sharedService.prepForBroadcast(sharedService.CHANGE_NAVBAR_FILENAME, {tabTitle: item.tabTitle, tabLang: item.lang});
            }
            ++i;
        });
    }

    $scope.$on(sharedService.HANDLE_BROADCAST, function(){ //When a new tab added, set selected tab to the newest one
        var selectedTab = null;
        if(sharedService.message == sharedService.NEW_TAB_BTN_CLICKED){
            $scope.addNewTab(sharedService.param.title, sharedService.param.content);
        }else if(sharedService.message == sharedService.LANG_CHANGED){
            selectedTab = $scope.getSelectedTab();
            selectedTab.lang = sharedService.param;

            sharedService.prepForBroadcast(sharedService.REQUEST_MODE_CHANGE, {lang: sharedService.param, idx: $scope.items.indexOf(selectedTab)});
        }else if(sharedService.message == sharedService.REQUEST_OLD_FILE_NAME){
            sharedService.prepForBroadcast(sharedService.OLD_FILE_NAME_RESPONSE, $scope.getSelectedTab());
        }else if(sharedService.message == sharedService.REQUEST_SAVE_FILE){
            var saveAs      = sharedService.param;
            selectedTab = $scope.getSelectedTab();

            if(saveAs){
                if(selectedTab){
                    $("#saveFileAsModal").modal('show');
                }
            }else{
                if(selectedTab){
                    fileHandler.saveFile(selectedTab.tabTitle);
                    //console.log(selectedTab.tabInitialContent);
                }
            }
        }
    });
}
TabbedPaneCtrl.$inject = ['$scope', 'fileHandler', 'sharedService'];
