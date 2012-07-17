angular.module('codeEdit.services').
    factory('sharedService', function($rootScope){
    var sharedService = {};

    sharedService.message = '';
    sharedService.param = '';

    sharedService.prepForBroadcast = function(msg, param) {
        this.message = msg;
        this.param = param;
        this.broadcastItem();
    };

    sharedService.broadcastItem = function() {
        $rootScope.$broadcast('handleBroadcast');
    };

    //HANDLE TAG
    sharedService.HANDLE_BROADCAST          = "handleBroadcast";
    
    sharedService.NEW_TAB_ADDED             = "newTabAdded";
    sharedService.NEW_TAB_BTN_CLICKED       = "newTabBtnClicked";
    sharedService.REQUEST_FILES             = "requestFiles";
    sharedService.REQUEST_FILES_RESPONSE    = "requestFilesResponse"
    sharedService.RESULT_RECEIVED           = "resultReceived";
    sharedService.CODE_GRADED               = "codeGraded";

    return sharedService;
});
