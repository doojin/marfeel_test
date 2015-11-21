// Preventing global scope's pollution
define(['jquery'], function(jQuery) {
    return jQuery.noConflict(true);
});