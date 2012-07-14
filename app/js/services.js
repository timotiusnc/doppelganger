'use strict';

/* Services */

angular.module('codeEdit.services').
    value('version', '0.1').
    value('header_footer', $('.navbar').height() + $('footer').height() + 40 + 56); //10 for footer padding + 30 for jQuery tabs header + 54 for tab height

//http://180.246.3.122:port/tes.php
//http://167.205.32.27/lz/services/grading/compile
