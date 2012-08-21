function NavbarCtrl($scope, sharedService) {
    $scope.duration = '--';
    $scope.fileName = '';
    $scope.langs = ["Pascal", "C/C++", "LISP"];
    $scope.choosen_lang = $scope.langs[0]; //Set PASCAL as default lang

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
        sharedService.prepForBroadcast(sharedService.REQUEST_SAVE_FILE, false);
    }

    $scope.saveFileAsBtnClick = function(){
        sharedService.prepForBroadcast(sharedService.REQUEST_SAVE_FILE, true);
    }

    $scope.importFileBtnClick = function(){
        $("#importFileModal").modal('show');
    }

    $scope.addNewTabBtnClick = function(){
        sharedService.prepForBroadcast(sharedService.NEW_TAB_BTN_CLICKED, {title: '', content: ''});
    }

    $scope.lang_changed = function(){
        sharedService.prepForBroadcast(sharedService.LANG_CHANGED, $scope.choosen_lang);
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
            $scope.fileName = sharedService.param.tabTitle;
            $scope.choosen_lang = sharedService.param.tabLang;
        }
    });
}
NavbarCtrl.$inject = ['$scope', 'sharedService'];
