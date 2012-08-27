/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('codeEdit.services').
    factory('lxConnector', function(sharedService){
        //constant
        var timeout_constant     = 5;
        var client_id            = 100;
        var client_token         = 'odysseus';
        var mw_address           = '192.168.0.104';

        //attrib
        var getResultCtr = 0;
        var lxConnector = {};
        var queue_id = -1;
        var timer;

        lxConnector.getResultManual = function(){
            console.log('queue_id', queue_id);
            lxConnector.getResult(client_id, client_token, queue_id);
        }

        lxConnector.getResult = function(clientid, clienttoken, id){
            if(id == -1){
                alert('Queue ID is not valid');
                return;
            }
            console.log('getResult');
            ++getResultCtr;

            $.ajax({ //Send POST to Oddysseus' getResult service
                type: 'POST',
                url: 'http://' + mw_address + '/lz/services/grading/detail?clienttoken=' + clienttoken + '&id=' + id,
                success: function(data){
                    var res = eval('(' + data + ')'); //example in js/ResultExample
                    if(res.detail.status == 2 || res.detail.status == 3){
                        sharedService.prepForBroadcast(sharedService.CODE_GRADED, res.detail.report);
                        lxConnector.stopGetResult();
                    }
                },
                error: function(jqXHR, textStatus, errorThrown){
                    var errMsg = "Error " + errorThrown.code + " " + errorThrown.message
                    console.log('err', errMsg);
                    sharedService.prepForBroadcast(sharedService.CODE_GRADED, errMsg);
                }
            });

            if(getResultCtr >= timeout_constant){
                lxConnector.stopGetResult();
                sharedService.prepForBroadcast(sharedService.CODE_GRADED, 'Error: Connection timed out');
            }
        }

        lxConnector.submit = function(service, files, eval_id){
            var data = { //Build the data parameter
                GradeRequest: {
                    submitter_id: 'DoppelGanger',
                    evaluationset_id: eval_id,
                    mode: 1,
                    source_file: 'DoppelGanger.zip'
                }
            };

            data.files = new Array();
            for(i=0,n=files.length; i<n; ++i){
                data.files[i] = {
                    name : files[i].fileName,
                    content: files[i].content
                }
            }
            console.log('data sent', data);

            getResultCtr = 0; //reset get result counter
            $.ajax({ //Send POST to Oddysseus' compile service
                type: 'POST',
                url: 'http://' + mw_address + '/lz/services/grading/' + service + '?&clienttoken=' + client_token + '&flat=1',
                data: data,
                success: function(data){
                    console.log('response', data); //example: {"reason":"Ok","success":true,"request_id":"114"}
                    var res = eval('(' + data + ')');
                    queue_id = res.request_id;
                    sharedService.prepForBroadcast(sharedService.RESULT_RECEIVED, queue_id); //Tell the user that the request has been received
                    timer = setInterval(function(){lxConnector.getResult(client_id, client_token, res.request_id)}, 1000); //pooling getResult per 1 sec until get the result
                },
                error: function(jqXHR, textStatus, errorThrown){
                    var errCode     = errorThrown.code;
                    var errMsg      = errorThrown.message;

                    if(!errCode)    {errCode = "";}
                    if(!errMsg)     {errMsg = "connection could not be established"}
                    var errResult   = "Error " + errCode + " " + errMsg;

                    sharedService.prepForBroadcast(sharedService.CODE_GRADED, errResult);
                }
            });
        }

        lxConnector.stopGetResult = function(){
            console.log('clearing interval');
            clearInterval(timer);
        }

        return lxConnector;
    });
