// Responsible for building circle chart
define(['widget/view/graph_builder', 'd3'], function(graphBuilder) {

    var chartBuilder = {};

    chartBuilder.build = function(parent, config) {
        this.config = config;

        var group = this._buildGroups(parent);

        // Building all components of chart
        this._buildGraphs(group);
        this._buildCircles(group);
        this._buildMarks(group);

        return group;
    };

    chartBuilder._buildGroups = function(parent) {
        return parent.selectAll('g')
            .data(this.config.data)
            .enter()
            .append('g');
    };

    chartBuilder._buildCircles = function(parent) {
        this._appendCircle(parent)
            .attr('stroke', chartBuilder.secondaryColor);

        this._appendCircle(parent)
            .attr('stroke', chartBuilder.primaryColor)
            .attr('stroke-dasharray', chartBuilder.chartValue)
            // For animation only
            .attr('stroke-dashoffset', -this._circleLength() / 2)
            .transition()
            .duration(700)
            .ease('linear-in-out')
            .attr('stroke-dashoffset', this._circleLength() / 4);
    };

    // Drawing small marks on the top, bottom, left and right of circle
    chartBuilder._buildMarks = function(parent) {
        parent.selectAll('rect')
            .data(chartBuilder._markData())
            .enter()
            .append('rect')
            .attr('x', function(d) { return d.x; })
            .attr('y', function(d) { return d.y; })
            .attr('width', function(d) { return d.width; })
            .attr('height', function(d) { return d.height; })
            .attr('fill', chartBuilder.primaryColor)
            .attr('fill-opacity', 0.6);
    };

    chartBuilder._buildGraphs = function(parent) {
        graphBuilder.build(parent, this.config);
        this._addGraphColors(parent);
    };

    chartBuilder._addGraphColors = function(node) {
        node.select('g')
            .select('path.line')
            .attr('stroke', chartBuilder.secondaryColor);

        node.select('g')
            .select('path.fill')
            .attr('fill', chartBuilder.secondaryColor);
    };

    chartBuilder._markData = function() {
        var topMark = {};
        topMark.width = 0.015 * this.config.size;
        topMark.height = 0.02 * this.config.size;
        topMark.x = this.config.size / 2 - topMark.width / 2;
        topMark.y = this.config.thickness + 1;

        var rightMark = {};
        rightMark.width = 0.02 * this.config.size;
        rightMark.height = 0.015 * this.config.size;
        rightMark.x = this.config.size - rightMark.width - this.config.thickness - 1;
        rightMark.y = this.config.size / 2 - topMark.height / 2;

        var bottomMark = {};
        bottomMark.width = 0.015 * this.config.size;
        bottomMark.height = 0.02 * this.config.size;
        bottomMark.x = this.config.size / 2 - bottomMark.width / 2;
        bottomMark.y = this.config.size - bottomMark.height - this.config.thickness - 1;

        var leftMark = {};
        leftMark.width = 0.02 * this.config.size;
        leftMark.height = 0.015 * this.config.size;
        leftMark.x = this.config.thickness + 1;
        leftMark.y = this.config.size / 2 - leftMark.height / 2;

        return [topMark, rightMark, bottomMark, leftMark];
    };

    chartBuilder._appendCircle = function(parent) {
        return parent.append('circle')
            .classed('chart', true)
            .attr('cx', this._circleCenter())
            .attr('cy', this._circleCenter())
            .attr('r', this._circleRadius())
            .attr('fill-opacity', 0)
            .attr('stroke-width', this.config.thickness);
    };

    chartBuilder._circleRadius = function() {
        return this.config.size / 2 - this.config.thickness / 2;
    };

    chartBuilder._circleCenter = function() {
        return this.config.size / 2;
    };

    chartBuilder._circleLength = function() {
        return Math.PI * 2 * this._circleRadius();
    };

    chartBuilder.primaryColor = function(d, i) {
        var pair = chartBuilder.config.colors[i];
        return pair && pair.primary ? pair.primary : chartBuilder.config.primaryColor;
    };

    chartBuilder.secondaryColor = function(d, i) {
        var pair = chartBuilder.config.colors[i];
        return pair && pair.secondary ? pair.secondary : chartBuilder.config.secondaryColor;
    };

    chartBuilder.chartValue = function(d, i) {
        var last = chartBuilder.config.data[i].values.length - 1;

        // Last value pair from the array
        var val1 = chartBuilder.config.data[i].values[last].member1;
        var val2 = chartBuilder.config.data[i].values[last].member2;

        // Ratio of first and second values
        var ratio1 = val1 / (val1 + val2);
        var ratio2 = 1 - ratio1;

        // Dividing circle according to ratios
        var lengths = [
            chartBuilder._circleLength() * ratio2,
            chartBuilder._circleLength() * ratio1
        ];

        return lengths.join(',');
    };

    return chartBuilder;
});