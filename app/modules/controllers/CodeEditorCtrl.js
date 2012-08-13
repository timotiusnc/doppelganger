function CodeEditorCtrl($scope, fileHandler, sharedService) {
    $scope.tabs = []; //Semantically an array of Tab Title, the content (codeEditTextArea) is another instance

    /**
     * @name compileBtnClick
     * @methodOf MainCtrl#
     */
    $scope.compileBtnClick = function(){
        $("#compileModal").modal('show');       
    }

    /**
     * @name openFileBtnClick
     * @methodOf MainCtrl#
     */
    $scope.openFileBtnClick = function(){
        $("#openFileModal").modal('show');
    }

    $scope.saveFileBtnClick = function(){
        $("#sendFileModal").modal('show');
    }

    $scope.saveFileAsBtnClick = function(){
        $("#sendFileModal").modal('show');
    }

    $scope.importFileBtnClick = function(){
        $("#importFileModal").modal('show');
    }

    $scope.addNewTabBtnClick = function(){
        sharedService.prepForBroadcast(sharedService.NEW_TAB_BTN_CLICKED, {title: '', content: ''});
    }

    $scope.stopCodingBtnClick = function(){
        jConfirm('Are you sure you want to stop coding?', 'Stop Coding Confirmation', function(r) {
            if(r){
                sharedService.prepForBroadcast(sharedService.STOPCODING_ACTION, null);
            }
        });
    }

    $scope.addNewTab = function(title, content, selected){
        var fileName = (title == '') ? ('untitled-' + (TextAreaCtrl.INSTANCE_CTR)) : title;
        $scope.tabs.push({
            tabIndex: $scope.tabs.length,
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
        }else if(sharedService.message == sharedService.REQUEST_FILE_NAMES){
            sharedService.prepForBroadcast(sharedService.FILE_NAMES_RESPONSE, $scope.tabs);
        }
    });

    //Add default tab
    //$scope.addNewTab('main', '', true);
}
CodeEditorCtrl.$inject = ['$scope', 'fileHandler', 'sharedService'];