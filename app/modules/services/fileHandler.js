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
            newFile.previewContent  = '';
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

            if(file.content){
                file.previewContent = file.content.substring(0, 50);
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

    fileHandler.saveFile = function(fileName){
        var fileContent;

        //[save code mirror value]; get textarea value; update file content attr; save to localstorage
        sharedService.prepForBroadcast(sharedService.REQUEST_SAVE_FILE_AS, fileName);
        fileContent = $("#" + fileName.replace(/[.]/g,"\\.")).val();
        fileHandler.updateFileAttr(fileName, {content: fileContent});
        fileHandler.saveFileToLocalStorage(fileName);
    }

    fileHandler.saveFileAs = function(oldFileName, newFileName){
        var fileContent;

        //[save code mirror value]; get textarea value
        sharedService.prepForBroadcast(sharedService.REQUEST_SAVE_FILE_AS, newFileName);
        fileContent = $("#" + newFileName.replace(/[.]/g,"\\.")).val();

        //change fileHandler.files file name; update file content attr
        fileHandler.changeFileName(oldFileName, newFileName);
        fileHandler.updateFileAttr(newFileName, {content: fileContent});

        //delete old file and then save new file from/to localstorage
        fileHandler.deleteFileFromLocalStorage(oldFileName);
        fileHandler.saveFileToLocalStorage(newFileName);
    }

    fileHandler.openFile = function(fileName){
        var openedFile = fileHandler.getFileFromLocalStorage(fileName);
        if(openedFile){
            fileHandler.files[fileName] = openedFile;
            fileHandler.startTimer(fileName);           //start the timer as soon as the file opened
            return openedFile.content;                  //return the content (to be displayed)
        }else{
            return null;
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
                //console.log(localStorage[fileName]);
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
    fileHandler.deleteFileFromLocalStorage = function(fileName){
        localStorage.removeItem(fileName);
    }

    fileHandler.listFilesOnLocalStorage = function(){
        var retval = new Object();
        for(var i=0; i<localStorage.length; ++i){
            var key = localStorage.key(i);
            retval[key] = fileHandler.getFileFromLocalStorage(key);

            if(retval[key].content){
                retval[key].previewContent = retval[key].content.substring(0, 50);
            }
        }

        return retval;
    }

    fileHandler.formatFileName = function(fileName){
        return fileName.replace(/\s/g,"_");
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