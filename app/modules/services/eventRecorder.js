/*
 * KeyDownEvent controller
 * Intercept all keydown event
 */

angular.module('codeEdit.services').
    factory('eventRecorder', function(){
    var eventRecorder = {};

    eventRecorder.keyPressCtr      = 0;
    eventRecorder.directionCtr     = 0;
    eventRecorder.mouseClickCtr    = 0;
    eventRecorder.backSpaceCtr     = 0;
    eventRecorder.compilationCtr   = 0;
    eventRecorder.duration         = 0;

    eventRecorder.keyPressHandler = function(keyEvent){
        if( (keyEvent.type == 'keydown') && !(keyEvent.altKey || keyEvent.ctrlKey || keyEvent.shiftKey)){
            ++eventRecorder.keyPressCtr;

            var kc = keyEvent.keyCode;
            if(kc == 8){                    //backspace
                ++eventRecorder.backSpaceCtr;
            }else if(kc >= 37 && kc <= 40){ //4-directional pad
                ++eventRecorder.directionCtr;
            }
        }
    }

    eventRecorder.mouseClickHandler = function(){
        ++eventRecorder.mouseClickCtr;
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