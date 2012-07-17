'use strict';

/* Services */

angular.module('codeEdit.services').
    value('version', '0.1').
    value('default_navbar_mb', '18').
    value('footer_height', '200'). //was 70
    value('header_footer', $('.navbar').height() + $('footer').height() + 8 + 30 + 56 + 260); //8 for footer padding + 30 for jQuery tabs header + 56 for tab height + 130 for footer_tab height
    //was 130
//http://180.246.3.122:port/tes.php
//http://167.205.32.27/lz/services/grading/compile
