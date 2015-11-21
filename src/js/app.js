(function() {
    require.config({
        paths: {
            'd3': '../../bower_components/d3/d3.min'
        }
    });
})();

define(['widget/circle_chart'], function (CircleChart) {
    new CircleChart({
        data: [1]
    });
});