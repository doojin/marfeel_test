define(['d3'], function() {

    var chartBuilder = {};

    chartBuilder.build = function(parent, config) {
        this.config = config;

        var group = this._buildGroups(parent);
        this._buildCircles(group);
    };

    chartBuilder._buildGroups = function(parent) {
        return parent.selectAll('g')
            .data(this.config.data)
            .enter()
            .append('g');
    };

    chartBuilder._buildCircles = function(parent) {
        var circle2 = this._appendCircle(parent)
            .attr('stroke', chartBuilder.secondaryColor);

        var circle1 = this._appendCircle(parent)
            .attr('stroke', chartBuilder.primaryColor)
            .attr('stroke-dasharray', chartBuilder.chartValue)
            // For animation only
            .attr('stroke-dashoffset', -this._circleLength() / 2)
            .transition()
            .duration(1000)
            .ease('linear-in-out')
            .attr('stroke-dashoffset', this._circleLength() / 4);
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

        // Latest value pair from the array
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