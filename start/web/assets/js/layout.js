'use strict';

const $ = require('jquery');
// Note: Bootstrap extends/modifies jequery, that's there is no assignement to a variable
// but bootstrap requires a global jquery variable
require('bootstrap');

$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();
});
