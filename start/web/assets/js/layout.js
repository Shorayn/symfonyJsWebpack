'use strict';

const $ = require('jquery');
// Note: Bootstrap extends/modifies jquery, that's there is no assignement to a variable
// but bootstrap requires a global jquery variable
require('bootstrap');
require('../css/main.css');

// include this on every page to make sure Promise exists
require('babel-polyfill');

$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();
});
