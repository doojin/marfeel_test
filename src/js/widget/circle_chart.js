define([
    'widget/default_config',
    'widget/view/simple_view'
], function(
    DefaultConfig,
    SimpleView
) {

    function CircleChart(config) {
        this.config = new DefaultConfig().merge(config);
    }

    CircleChart.prototype.init = function() {
        this.view = new SimpleView(this.config);
        this.view.build();
    };

    return CircleChart;
});