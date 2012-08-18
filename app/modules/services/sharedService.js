angular.module('codeEdit.services').
    factory('sharedService', function($rootScope){
    var sharedService = {};

    sharedService.message = '';
    sharedService.param = {};

    sharedService.prepForBroadcast = function(msg, param) {
        sharedService.message = msg;
        sharedService.param = param;
        sharedService.broadcastItem();
    };

    sharedService.broadcastItem = function() {
        $rootScope.$broadcast('handleBroadcast');
    };

    //HANDLE TAG
    sharedService.HANDLE_BROADCAST          = "handleBroadcast";

    //Events
    /**
     * NEW_TAB_BTN_CLICKED
     * @broadcaster MainCtrl, FileImporterCtrl
     * @receiver CodeEditorCtrl
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
     * App gets the compilation/execution result
     */
    sharedService.CODE_GRADED               = "codeGraded";

    /**
     * @broadcaster fileHandler
     * @receiver NavbarCtrl
     * fileHandler has incremented the duration, the view in navbar should reflect it
     */
    sharedService.ONE_SECOND_PASSED         = "oneSecondPassed";

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
    sharedService.REQUEST_SAVE_EDITOR     = "requestSaveEditor";

    /**
     * @broadcaster NavbarCtrl
     * @receiver TabbedPaneCtrl
     * when button Save File or Save File As is clicked
     * then TabbedPaneCtrl will invoke save or saveFileAs method on fileHandler
     */
    sharedService.REQUEST_SAVE_FILE       = "requestSaveFile";

    /**
     * @broadcaster tabbedpane.js (when a tab is selected)
     * @receiver navbar.js
     */
    sharedService.CHANGE_NAVBAR_FILENAME    = "changeNavbarFilename";

    /**
     * @broadcaster NavbarMessagingCtrl
     * @receiver CodeMessagingCtrl
     * when button Compile is clicked, notify CodeMessaingCtrl to invoke lxConnector.submit
     */
    sharedService.ASK_TO_COMPILE    = "askToCompile";

    /**
     * @broadcaster NavbarMessagingCtrl
     * @receiver CodeMessagingCtrl
     * when button Execute is clicked, notify CodeMessaingCtrl to invoke lxConnector. what ?
     */
    sharedService.ASK_TO_COMPILE    = "askToExecute";

    return sharedService;
});
