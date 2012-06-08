'use strict';

/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('codeEdit.services', ['ngResource']).
    value('version', '0.1').
    factory('LZ', function($resource){
        return $resource('http://167.205.32.27/lz/services/grading/compile',
            {port: ':9000', clientid: '100', clienttoken: '100'},
            {
                'compile': {method: 'POST'}
            }
        );
    });

    //http://180.246.3.122:port/tes.php
    //http://167.205.32.27/lz/services/grading/compile
