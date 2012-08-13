/**
 * @name Files
 * @class Files model
 */

angular.module('codeEdit.services').
    factory('fileHandler', function($rootScope, browserDetect, sharedService){
    var fileHandler = {};

    /**
     * @name files
     * @fieldOf Files#
     * key: name
     * value:
     * -content
     * -lang
     * -duration
     * -backspace-ctr
     * -dir-ctr
     * -keypress-ctr
     * -mouseclick_ctr
     */
    fileHandler.files = new Object();

    fileHandler.createNewFile = function(fileName){
        if(!fileHandler.files[fileName]){
            var newFile = new Object();
            newFile.fileName        = fileName;
            newFile.content         = '';
            newFile.duration        = 0;
            newFile.backspace_ctr   = 0;
            newFile.dir_ctr         = 0;
            newFile.keypress_ctr    = 0;
            newFile.mouseclick_ctr  = 0;
            newFile.timer           = null;

            fileHandler.files[fileName] = newFile;
            fileHandler.startTimer(fileName);       //start the timer as soon as the file created
        }
    }

    fileHandler.updateFileAttr = function(fileName, fileAttr){
        var file = fileHandler.files[fileName];
        if(file){
            for(var key in fileAttr){
                if(fileAttr.hasOwnProperty(key) && file.hasOwnProperty(key)){
                    file[key] = fileAttr[key];
                }
            }
        }
    }

    fileHandler.changeFileName = function(oldFileName, newFileName){
        var file = fileHandler.files[oldFileName];
        if(file){
            fileHandler.files[newFileName] = fileHandler.files[oldFileName];
            fileHandler.files[newFileName].fileName = newFileName;
            delete fileHandler.files[oldFileName];
        }
    }

    fileHandler.startTimer = function(fileName){
        var file = fileHandler.files[fileName];
        if(file){
            if(!file.timer){
                file.timer = setInterval(function(){
                    ++file.duration;
                }, 1000);
            }
        }
    }

    fileHandler.stopTimer = function(fileName){
        var file = fileHandler.files[fileName];
        if(file){
            if(file.timer){
                clearInterval(file.timer);
                file.timer = null;
            }
        }
    }

    /**
     * @name saveFile
     * @methodOf Files#
     * @param fileName string
     */
    fileHandler.saveFileToLocalStorage = function(fileName){
        if(browserDetect.supportLocalStorage){
            var file = fileHandler.files[fileName];
            if(file){
                localStorage[fileName] = JSON.stringify(file);
            }
        }
    }

    /**
     * @name getFile
     * @methodOf Files#
     */
    fileHandler.getFileFromLocalStorage = function(fileName){
        if(browserDetect.supportLocalStorage){
            var file = localStorage[fileName];
            if(file){
                return eval('(' + file + ')');
            }else{
                return null;
            }
        }else{
            return null;
        }
    }

    /**
     * @name deleteFile
     * @methodOf Files#
     */
    fileHandler.deleteFileFromLocalStorage = function(key){
        
    }

    fileHandler.listFilesOnLocalStorage = function(){
        for(var i=0; i<localStorage.length; ++i){
            var key = localStorage.key(i);
            console.log('local');
            console.log(localStorage[key]);
        }

        console.log(fileHandler.files);
    }

    $rootScope.$on(sharedService.HANDLE_BROADCAST, function(){
        if(sharedService.message == sharedService.START_TIMER){
            //eventRecorder.start();
        }
    });

    return fileHandler;
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

console.log(fileHandler.files);
        fileHandler.createNewFile('tes');

        fileHandler.changeFileName('tes', 'baru');
        fileHandler.updateFileAttr('baru', {backspace_ctr: 123});
        console.log(fileHandler.files);
 */