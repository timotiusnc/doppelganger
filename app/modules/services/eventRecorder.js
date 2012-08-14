/*
 * KeyDownEvent controller
 * Intercept all keydown event
 */

angular.module('codeEdit.services').
    factory('eventRecorder', function(fileHandler){
    var eventRecorder = {};

    eventRecorder.keyPressHandler = function(fileName, keyEvent){
        if((keyEvent.type == 'keydown') && !(keyEvent.altKey || keyEvent.ctrlKey || keyEvent.shiftKey)){
            var kc = keyEvent.keyCode;
            if(kc == 8){                    //backspace
                fileHandler.incrementCtr(fileName, {backspace_ctr: 1});
            }else if(kc >= 37 && kc <= 40){ //4-directional pad
                fileHandler.incrementCtr(fileName, {dir_ctr: 1});
            }
            fileHandler.incrementCtr(fileName, {keypress_ctr: 1});
        }
    }

    eventRecorder.mouseClickHandler = function(fileName, mouseEvent){
        fileHandler.incrementCtr(fileName, {mouseclick_ctr: 1});
    }

    return eventRecorder;
});


/**
 * if(browserDetect.mobileVendor){
            if (keyEvent.keyCode == 9 ) { //Detect TAB key
                keyEvent.preventDefault();

                var start = element.prop('selectionStart');
                var end = element.prop('selectionEnd');

                element.val(element.val().substring(0, start) + '\t' + element.val().substring(end, element.val().length));

                element.prop('selectionStart', start + 1);
                element.prop('selectionEnd', start + 1);
                element.focus();
                $scope.$apply();
            }
        }
 */