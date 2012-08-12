/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('codeEdit.services').
    factory('lxConnector', function(sharedService){
        var lxConnector = {};
        var timer;

        lxConnector.getResult = function(clientid, clienttoken, id){
            console.log('getResult');
            $.ajax({
                type: 'POST',
                url: 'http://167.205.32.27/lz/services/grading/detail?clientid=' + clientid + '&clienttoken=' + clienttoken + '&id=' + id,
                success: function(data){
                    var res = eval('(' + data + ')');
                    sharedService.prepForBroadcast(sharedService.RESULT_RECEIVED, res);
                    if(res.detail.status == 2 || res.detail.status == 3){
                        //tap the compile event here, so should the compilation fails, it won't be counted
                        sharedService.prepForBroadcast(sharedService.COMPILE_ACTION, null);

                        //tell the timer to start (if it hasn't)
                        sharedService.prepForBroadcast(sharedService.START_TIMER, null);

                        //tell FooterCtrl that the code has been graded
                        sharedService.prepForBroadcast(sharedService.CODE_GRADED, res.detail.report);

                        //stop the pooling
                        lxConnector.stopGetResult();
                    }
                }
            });
        }

        lxConnector.submit = function(fileNames, fileContents){
            var data = {
                GradeRequest: {
                    submitter_id: 'timmy',
                    evaluationset_id: 3,
                    mode: 1,
                    source_file: 'tes_timmy.zip'
                }
            };

            data.files = new Array();
            for(i=0,n=fileNames.length; i<n; ++i){
                data.files[i] = {
                    name : fileNames[i].tabTitle,
                    content: fileContents[i]
                }
            }
            console.log(data);

            $.ajax({
                type: 'POST',
                url: 'http://167.205.32.27/lz/services/grading/compile?clientid=100&clienttoken=100&flat=1',
                data: data,
                success: function(data){
                    console.log(data);
                    var res = eval('(' + data + ')');
                    timer = setInterval(function(){lxConnector.getResult(100, 100, res.request_id)}, 1000); //pooling getResult per 1 sec until get the result
                }
            });
        }

        lxConnector.stopGetResult = function(){
            console.log('clearing interval');
            clearInterval(timer);
        }

        return lxConnector;
    });
