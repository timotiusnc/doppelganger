/*
 * KeyDownEvent controller
 * Intercept all keydown event
 */

angular.module('codeEdit.services').
    factory('eventRecorder', function($rootScope, sharedService){
    var eventRecorder = {};

    var timer = null;

    eventRecorder.keyPressCtr      = 0;
    eventRecorder.directionCtr     = 0;
    eventRecorder.mouseClickCtr    = 0;
    eventRecorder.backSpaceCtr     = 0;
    eventRecorder.compilationCtr   = 0;
    eventRecorder.duration         = 0;

    eventRecorder.setTime = function(){
        ++eventRecorder.duration;
        sharedService.prepForBroadcast(sharedService.ONE_SECOND_PASSED, this.duration);
    };

    eventRecorder.start = function(){
        if(!timer){
            timer = setInterval(function(){eventRecorder.setTime()}, 1000);
        }
    }

    $rootScope.$on(sharedService.HANDLE_BROADCAST, function(){
        if(sharedService.message == sharedService.START_TIMER){
            eventRecorder.start();
        }else if(sharedService.message == sharedService.KEYPRESS_ACTION){
            var evt = sharedService.param;
            if(evt.type == 'keydown'){
                ++eventRecorder.keyPressCtr;
                
                var kc = evt.keyCode;
                if(kc == 8){                    //backspace
                    ++eventRecorder.backSpaceCtr;
                }else if(kc >= 37 && kc <= 40){ //4-directional pad
                    ++eventRecorder.directionCtr;
                }
            }
        }else if(sharedService.message == sharedService.MOUSECLICK_ACTION){
            ++eventRecorder.mouseClickCtr;
        }else if(sharedService.message == sharedService.COMPILE_ACTION){
            ++eventRecorder.compilationCtr;
        }else if(sharedService.message == sharedService.STOPCODING_ACTION){
            if(timer){
                //stop the timer
                clearInterval(timer);
                timer = null;

                $rootScope.$apply(function(){
                    //Send coding result for process-grading
                    sharedService.prepForBroadcast(sharedService.SEND_CODINGRESULT, {
                        keyPressCtr     : eventRecorder.keyPressCtr,
                        directionCtr    : eventRecorder.directionCtr,
                        mouseClickCtr   : eventRecorder.mouseClickCtr,
                        backSpaceCtr    : eventRecorder.backSpaceCtr,
                        compilationCtr  : eventRecorder.compilationCtr,
                        duration        : eventRecorder.duration
                    });

                    //Show result grade dialog
                    $('#resultDialogModal').modal('show');
                });
            }else{
                jAlert("You haven't started coding, yet !!", 'Coding Not Yet Started');
            }
        }
    });

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