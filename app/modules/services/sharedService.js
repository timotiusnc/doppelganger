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

    //Events
    /**
     * NEW_TAB_ADDED
     * @broadcaster EditoCtrl
     * @receiver tabbedpane ctrl
     * Broadcasted when a new tab is added, set all old tabs selected attr to false and the newest one to true
     */
    sharedService.NEW_TAB_ADDED             = "newTabAdded";

    /**
     * NEW_TAB_BTN_CLICKED
     * @broadcaster MainCtrl, FileImporterCtrl
     * @reicever EditorCtrl
     * @param string title
     * @param string content
     * @param boolean selected
     * Broadcasted when new tab button is clicked or when file is imported. Call NEW_TAB_ADDED event
     */
    sharedService.NEW_TAB_BTN_CLICKED       = "newTabBtnClicked";

    /**
     * RESULT_RECEIVED
     * @broadcaster lxConector
     * @receiver FooterCtrl
     * @param string the result string
     * App gets a queue-number
     */
    sharedService.RESULT_RECEIVED           = "resultReceived";

    /**
     * CODE_GRADED
     * @broadcaster lxConnectr
     * @receiver FooterCtrl
     * @param string the result string
     * App gets the result
     */
    sharedService.CODE_GRADED               = "codeGraded";

    /**
     * TODO: CHECK THIS
     */
    sharedService.START_TIMER               = "startTimer";
    sharedService.ONE_SECOND_PASSED         = "oneSecondPassed";

    //Request response
    /**
     * REQUEST_FILE_NAMES
     * @broadcaster CompileCtrl
     * @receiver EditorCtrl
     * CompileCtrl needs a file names. Get responded vice-versa with FILE_NAMES_RESPONSE
     */
    sharedService.REQUEST_FILE_NAMES        = "requestFileNames";
    sharedService.FILE_NAMES_RESPONSE       = "fileNamesResponse"

    /**
     * REQUEST_CODE_TEXT
     * @broadcaster CompileCtrl, ResultDialog
     * @receiver TextAreaCtrl
     * CompileCtrl and ResultDialog need source code contents. Get responded vice-versa with CODE_TEXT_RESPONSE
     */
    sharedService.REQUEST_CODE_TEXT         = "getCodeText";
    sharedService.CODE_TEXT_RESPONSE        = "codeTextResponse";

    /**
     * @broadcaster SaveFileAsCtrl
     * @receiver CodeEditorCtrl
     * Save as thingy
     */
    sharedService.REQUEST_OLD_FILE_NAME    = "requestOldFileName";
    sharedService.OLD_FILE_NAME_RESPONSE   = "oldFileNameResponse"

    /**
     * @broadcaster FileHandler
     * @receiver TextAreaCtrl
     * @param string fileName file name to be saved (associated to textarea id)
     * Ask the TextAreaCtrl's CodeMirror intance to save its content.
     * Then SaveFileAsCtrl can get the textarea value
     */
    sharedService.REQUEST_SAVE_FILE_AS     = "saveFileAs";
    
    /**
     * @broadcaster tabbedpane.js (when a tab is selected)
     * @receiver navbar.js
     */
    sharedService.CHANGE_NAVBAR_FILENAME    = "changeNavbarFilename";

    //Action to be recorded for grading purpose
    sharedService.KEYPRESS_ACTION           = "keypressAction";
    sharedService.MOUSECLICK_ACTION         = "mouseClickAction";
    sharedService.COMPILE_ACTION            = "compileAction";

    sharedService.STOPCODING_ACTION        = "stopCodingAction";
    sharedService.SEND_CODINGRESULT        = "sendCodingResult";

    return sharedService;
});
