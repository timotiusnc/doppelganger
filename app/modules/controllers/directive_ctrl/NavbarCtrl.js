function NavbarCtrl($scope, fileHandler, sharedService) {
    $scope.duration = '--';
    $scope.fileName = '';

    $scope.clearBtnClick = function(){
        localStorage.clear();
        alert('Local Storage Cleared');
    }

    /**
     * @name openFileBtnClick
     * @methodOf CodeEditorCtrl#
     */
    $scope.openFileBtnClick = function(){
        $("#openFileModal").modal('show');
    }

    $scope.saveFileBtnClick = function(){
        var selectedTab = $scope.getSelectedTab();
        if(selectedTab){
            fileHandler.saveFile(selectedTab.tabTitle);
        }
    }

    $scope.saveFileAsBtnClick = function(){
        if($scope.getSelectedTab()){
            $("#saveFileAsModal").modal('show');
        }
    }

    $scope.importFileBtnClick = function(){
        $("#importFileModal").modal('show');
    }

    $scope.addNewTabBtnClick = function(){
        sharedService.prepForBroadcast(sharedService.NEW_TAB_BTN_CLICKED, {title: '', content: ''});
    }

    $scope.gradeBtnClick = function(){
        $("#resultDialogModal").modal('show');
    }

    $scope.$on(sharedService.HANDLE_BROADCAST, function(){
        if(sharedService.message == sharedService.ONE_SECOND_PASSED){
            $scope.$apply(function(){
                $scope.duration = sharedService.param;
            });
        }else if(sharedService.message == sharedService.CHANGE_NAVBAR_FILENAME){
            $scope.duration = '--';
            $scope.fileName = sharedService.param;
        }
    });
}
NavbarCtrl.$inject = ['$scope', 'fileHandler', 'sharedService'];
NavbarCtrl.TES = "BLALBLAB";
