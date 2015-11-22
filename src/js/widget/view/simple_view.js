define([
    'widget/view/chart_builder',
    'widget/view/description_builder',
    'widget/view/helper',
    'd3'
], function(
    ChartBuilder,
    DescriptionBuilder,
    helper
) {

    var DESCRIPTION_MARGIN = 0.4;

    // Widget representation without a slider
    function SimpleView(config) {
        this.config = config;
    }

    SimpleView.prototype.build = function() {
        var svg = this._buildSVG();
        this._buildCharts(svg);
        this._buildDescriptions(svg);
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
        var charts = chartBuilder.build(parent, this.config);
        var self = this;
        charts.attr('transform', function(d, i) { return self._chartPosition(d, i); });
    };

    SimpleView.prototype._buildDescriptions = function(parent) {
        var descriptionBuilder = new DescriptionBuilder();
        var descriptions = descriptionBuilder.build(parent, this.config);
        var self = this;
        this._formatDescriptions(descriptions);
    };

    SimpleView.prototype._formatDescriptions = function(descriptions) {
        var self = this;

        descriptions.attr('transform', function(d, i) { return self._descriptionPosition(d, i); });

        descriptions.select('text.left.member')
            .attr('fill', function(d, i) { return helper.secondaryColor(d, i, self.config); });

        descriptions.select('text.right.member')
            .attr('fill', function(d, i) { return helper.primaryColor(d, i, self.config); })
            .attr('x', self._descriptionEnd());
    };

    // Position of i-th description
    SimpleView.prototype._descriptionPosition = function(d, i) {
        var x = this._chartMarginLeft() * DESCRIPTION_MARGIN +
            i * this.config.size +
            i * (this._chartMarginLeft() + this._chartMarginRight());

        var y = this.config.size + this._descriptionMarginTop();

        return 'translate(' + x + ',' + y + ')';
    };

    // X coordinate of the right description border
    SimpleView.prototype._descriptionEnd = function() {
        return this.config.size +
            this._chartMarginLeft() * (1 - DESCRIPTION_MARGIN)+
            this._chartMarginRight() * (1 - DESCRIPTION_MARGIN);
    };

    SimpleView.prototype._descriptionMarginTop = function() {
        return this.config.size * 0.05;
    };

    SimpleView.prototype._descriptionHeight = function() {
        return this.config.size * 0.3;
    };

    SimpleView.prototype._totalWidth = function() {
        return (this._chartMarginLeft() + this.config.size + this._chartMarginRight()) * this.config.data.length;
    };

    SimpleView.prototype._totalHeight = function() {
        return this.config.size + this._descriptionMarginTop() + this._descriptionHeight();
    };

    // Position of the i-th chart
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