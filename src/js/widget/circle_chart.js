define([
    'widget/default_config',
    'widget/view/simple_view'
], function(
    DefaultConfig,
    SimpleView
) {

    function CircleChart(config) {
        config = new DefaultConfig().merge(config);

        this.view = new SimpleView(config);
        this.view.build();
    }

    return CircleChart;
});