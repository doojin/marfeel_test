define(['widget/view/chart_builder', 'd3'], function(chartBuilder) {

    // Widget representation without a slider
    function SimpleView(config) {
        this.config = config;
    }

    SimpleView.prototype.build = function() {
        var svg = this._buildSVG();
        var charts = this._buildCharts(svg);
    };

    // Creating SVG element
    SimpleView.prototype._buildSVG = function() {
        return d3.select(this.config.parent)
            .append('svg')
            .classed('circle-chart', true)
            .attr('width', this._totalWidth())
            .attr('height', this._totalHeight());
    };

    SimpleView.prototype._buildCharts = function(svg) {
        var charts = chartBuilder.build(svg, this.config);
        return charts;
    };

    SimpleView.prototype._totalWidth = function() {
        return this.config.paddingLeft +
            this.config.paddingRight +
            this.config.size * this.config.data.length +
            this.config.spacing * (this.config.data.length - 1);
    };

    SimpleView.prototype._totalHeight = function() {
        return this.config.paddingTop + this.config.paddingBottom + this.config.size;
    };

    return SimpleView;

});