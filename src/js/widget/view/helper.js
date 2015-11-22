define([], function() {

    var NUMBER_FORMAT = '0,000',
        NUMBER_SEPARATOR = '.';

    var helper = {};

    helper.primaryColor = function(d, i, config) {
        var pair = config.colors[i];
        return pair && pair.primary ? pair.primary : config.primaryColor;
    };

    helper.secondaryColor = function(d, i, config) {
        var pair = config.colors[i];
        return pair && pair.secondary ? pair.secondary : config.secondaryColor;
    };

    helper.formatNumber = function(number, suffix) {
        var format = d3.format(NUMBER_FORMAT);
        var result = format(number);
        result = result.replace(/,/g, NUMBER_SEPARATOR);
        return suffix ? result + suffix : result;
    };

    helper.ratio = function(pair) {
        var first = pair.m1;
        var second = pair.m2;
        var ratio = first / (first + second);
        return Math.round(ratio * 100);
    };

    helper.lastValues = function(data) {
        var last = data.values.length - 1;
        return data.values[last];
    };

    return helper;
});