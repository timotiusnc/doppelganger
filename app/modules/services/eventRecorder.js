/*
 * KeyDownEvent controller
 * Intercept all keydown event
 */

angular.module('codeEdit.services').
    factory('eventRecorder', function($rootScope, sharedService){
    var eventRecorder = {};

    eventRecorder.timer = null;

    eventRecorder.keyPressCtr      = 0;
    eventRecorder.directionCtr     = 0;
    eventRecorder.mouseClickCtr    = 0;
    eventRecorder.backSpaceCtr     = 0;
    eventRecorder.compilationCtr   = 0;
    eventRecorder.duration         = 0;

    eventRecorder.setTime = function(){
        ++this.duration;
        sharedService.prepForBroadcast(sharedService.ONE_SECOND_PASSED, this.duration);
    };

    eventRecorder.start = function(){
        if(!this.timer){
            this.timer = setInterval(function(){eventRecorder.setTime()}, 1000);
        }
    }

    $rootScope.$on(sharedService.HANDLE_BROADCAST, function(){
        if(sharedService.message == sharedService.START_TIMER){
            eventRecorder.start();
        }else if(sharedService.message == sharedService.KEYPRESS_ACTION){
            var evt = sharedService.param;
            if(evt.type == 'keydown'){
                //TODO: for every case, direction, backspace, otherwise
            }
        }else if(sharedService.message == sharedService.MOUSECLICK_ACTION){
            ++eventRecorder.mouseClickCtr;
        }else if(sharedService.message == sharedService.COMPILE_ACTION){
            ++eventRecorder.compilationCtr;
            console.log(eventRecorder.compilationCtr);
        }
    });

    return eventRecorder;
});
