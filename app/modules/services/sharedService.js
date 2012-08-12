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

    //Event
    sharedService.NEW_TAB_ADDED             = "newTabAdded";
    sharedService.NEW_TAB_BTN_CLICKED       = "newTabBtnClicked";
    sharedService.RESULT_RECEIVED           = "resultReceived";
    sharedService.CODE_GRADED               = "codeGraded";
    sharedService.START_TIMER               = "startTimer";
    sharedService.ONE_SECOND_PASSED         = "oneSecondPassed";

    //Request response
    sharedService.REQUEST_FILE_NAMES        = "requestFileNames";
    sharedService.FILE_NAMES_RESPONSE       = "requestFileNamesResponse"
    sharedService.REQUEST_CODE_TEXT         = "getCodeText";
    sharedService.CODE_TEXT_RESPONSE        = "codeTextResponse";

    //Action to be recorded for grading purpose
    sharedService.KEYPRESS_ACTION           = "keypressAction";
    sharedService.MOUSECLICK_ACTION         = "mouseClickAction";
    sharedService.COMPILE_ACTION            = "compileAction";

    sharedService.STOPCODING_ACTION        = "stopCodingAction";
    sharedService.SEND_CODINGRESULT        = "sendCodingResult";

    return sharedService;
});
