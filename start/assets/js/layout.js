'use strict';

import $ from 'jquery';
// Note: Bootstrap extends/modifies jquery, that there is no assignement to a variable
// but bootstrap requires a global jquery variable
import 'bootstrap-sass';
import '../css/main.scss';

// include this on every page to make sure Promise exists
import 'core-js/library/es6/promise';

$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();
});
