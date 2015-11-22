define([
    'widget/default_config',
    'widget/view/simple_view',
    'widget/view/carousel_view'
], function(
    DefaultConfig,
    SimpleView,
    CarouselView
) {

    function CircleChart(config) {
        this.config = new DefaultConfig().merge(config);
    }

    CircleChart.prototype.init = function() {
        this.view = this.config.view == 'simple' ? new SimpleView(this.config) : new CarouselView(this.config);
        this.view.build();
    };

    return CircleChart;
});