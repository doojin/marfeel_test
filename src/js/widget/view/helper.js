define([], function() {

    var helper = {};

    helper.primaryColor = function(d, i, config) {
        var pair = config.colors[i];
        return pair && pair.primary ? pair.primary : config.primaryColor;
    };

    helper.secondaryColor = function(d, i, config) {
        var pair = config.colors[i];
        return pair && pair.secondary ? pair.secondary : config.secondaryColor;
    };

    return helper;
});