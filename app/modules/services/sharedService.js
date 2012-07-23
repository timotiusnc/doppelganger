angular.module('codeEdit.services').
    factory('sharedService', function($rootScope){
    var sharedService = {};

    sharedService.message = '';
    sharedService.param = {};

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
    sharedService.REQUEST_FILE_NAMES        = "requestFileNames";
    sharedService.REQUEST_FILE_NAMES_RESPONSE    = "requestFileNamesResponse"
    sharedService.RESULT_RECEIVED           = "resultReceived";
    sharedService.CODE_GRADED               = "codeGraded";
    sharedService.SAVE_CODE                 = "saveCode";

    sharedService.START_TIMER               = "startTimer";
    sharedService.ONE_SECOND_PASSED         = "oneSecondPassed";

    //Action to be recorded for grading purpose
    sharedService.KEYPRESS_ACTION           = "keypressAction";
    sharedService.MOUSECLICK_ACTION         = "mouseClickAction";
    sharedService.COMPILE_ACTION            = "compileAction";

    return sharedService;
});
