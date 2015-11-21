(function() {
    require.config({
        paths: {
            'd3': '../../bower_components/d3/d3.min'
        }
    });
})();

define(['widget/circle_chart'], function (CircleChart) {
    var chart = new CircleChart({
        data: [1]
    });

    chart.init();
});