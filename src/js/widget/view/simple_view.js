define(['widget/view/chart_builder', 'd3'], function(ChartBuilder) {

    // Widget representation without a slider
    function SimpleView(config) {
        this.config = config;
    }

    SimpleView.prototype.build = function() {
        var svg = this._buildSVG();
        this._buildCharts(svg);
    };

    // Creating SVG element
    SimpleView.prototype._buildSVG = function() {
        return d3.select(this.config.parent)
            .append('svg')
            .classed('circle-chart', true)
            .attr('width', this._totalWidth())
            .attr('height', this._totalHeight());
    };

    SimpleView.prototype._buildCharts = function(parent) {
        var chartBuilder = new ChartBuilder();
        var self = this;
        var charts = chartBuilder.build(parent, this.config);
        charts.attr('transform', function(d, i) { return self._chartPosition(d, i); });
        return charts;
    };

    SimpleView.prototype._totalWidth = function() {
        return (this._chartMarginLeft() + this.config.size + this._chartMarginRight()) * this.config.data.length;
    };

    SimpleView.prototype._totalHeight = function() {
        return this.config.size;
    };

    SimpleView.prototype._chartPosition = function(d, i) {
        var x = this._chartMarginLeft() +                               // Margin-left of the first chart
            i * this.config.size +                                      // Sum of sizes of previous charts
            i * (this._chartMarginLeft() + this._chartMarginRight());   // Sum of margins of previous charts
        var y = 0;
        return 'translate(' + x + ',' + y + ')';
    };

    // Margin-left of one circle chart
    SimpleView.prototype._chartMarginLeft = function() {
        return this.config.size / 3;
    };

    // Margin-right of one circle chart
    SimpleView.prototype._chartMarginRight = function() {
        return this.config.size / 3;
    };

    return SimpleView;

});