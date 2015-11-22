// Responsible for building circle chart
define(['widget/view/graph_builder', 'd3'], function(GraphBuilder) {

    var NUMBER_FORMAT = '0,000',
        NUMBER_SEPARATOR = '.',
        MARK = {
            length: 0.02,
            thickness: 0.015
        },
        TRANSITION_DURATION = 700,
        EASE = 'linear';

    function ChartBuilder() {}

    ChartBuilder.prototype.build = function(parent, config) {
        this.config = config;

        var group = this._buildGroups(parent);

        // Building all components of chart
        this._buildGraphs(group);
        this._buildCircles(group);
        this._buildMarks(group);
        this._buildText(group);

        return group;
    };

    ChartBuilder.prototype._buildGroups = function(parent) {
        return parent.selectAll('g')
            .data(this.config.data)
            .enter()
            .append('g');
    };

    ChartBuilder.prototype._buildCircles = function(parent) {
        var self = this;

        this._appendCircle(parent)
            .attr('stroke', function(d, i) { return self._secondaryColor(d, i); });

        this._appendCircle(parent)
            .attr('stroke', function(d, i) { return self._primaryColor(d, i); })
            .attr('stroke-dasharray', function(d, i) { return self._chartValue(d, i); })
            // For animation only
            .attr('stroke-dashoffset', -this._circleLength() / 2)
            .transition()
            .duration(TRANSITION_DURATION)
            .ease(EASE)
            .attr('stroke-dashoffset', this._circleLength() / 4);
    };

    // Drawing small marks on the top, bottom, left and right of circle
    ChartBuilder.prototype._buildMarks = function(parent) {
        var self = this;
        parent.selectAll('rect')
            .data(this._markData())
            .enter()
            .append('rect')
            .attr('x', function(d) { return d.x; })
            .attr('y', function(d) { return d.y; })
            .attr('width', function(d) { return d.width; })
            .attr('height', function(d) { return d.height; });

        parent.each(function(d, i) {
            var primaryColor = self._primaryColor(d, i);
            d3.select(this)
                .selectAll('rect')
                .attr('fill', primaryColor);
        });
    };

    ChartBuilder.prototype._buildGraphs = function(parent) {
        var graphBuilder = new GraphBuilder();
        graphBuilder.build(parent, this.config);
        this._addGraphColors(parent);
    };

    // Building chart title and value sum
    ChartBuilder.prototype._buildText = function(parent) {
        parent.append('text')
            .classed('title', true)
            .attr('x', this.config.size / 2)
            .attr('y', this.config.size / 3)
            .attr('font-family', this.config.fontFamily)
            .attr('font-size', this.config.titleSize)
            .text(function(d) { return d.title });

        var self = this;
        parent.append('text')
            .classed('sum', true)
            .attr('x', this.config.size / 2)
            .attr('y', this.config.size / 2.1)
            .attr('font-family', this.config.fontFamily)
            .attr('font-size', this.config.sumSize)
            .text(function(d, i) {
                var last = d.values.length - 1;
                var val1 = self.config.data[i].values[last].m1;
                var val2 = self.config.data[i].values[last].m2;
                var result = val1 + val2;
                return self._formatNumber(result, d.suffix);
            });
    };

    ChartBuilder.prototype._formatNumber = function(number, suffix) {
        var format = d3.format(NUMBER_FORMAT);
        var result = format(number);
        result = result.replace(/,/g, NUMBER_SEPARATOR);
        return suffix ? result + suffix : result;
    };

    ChartBuilder.prototype._addGraphColors = function(node) {
        var self = this;
        node.select('g')
            .select('path.line')
            .attr('stroke', function(d, i) { return self._secondaryColor(d, i); });

        node.select('g')
            .select('path.fill')
            .attr('fill', function(d, i) { return self._secondaryColor(d, i); });
    };

    ChartBuilder.prototype._markData = function() {
        var topMark = {};
        topMark.width = MARK.thickness * this.config.size;
        topMark.height = MARK.length * this.config.size;
        topMark.x = this.config.size / 2 - topMark.width / 2;
        topMark.y = this.config.thickness + 1;

        var rightMark = {};
        rightMark.width = MARK.length * this.config.size;
        rightMark.height = MARK.thickness * this.config.size;
        rightMark.x = this.config.size - rightMark.width - this.config.thickness - 1;
        rightMark.y = this.config.size / 2 - topMark.height / 2;

        var bottomMark = {};
        bottomMark.width = MARK.thickness * this.config.size;
        bottomMark.height = MARK.length * this.config.size;
        bottomMark.x = this.config.size / 2 - bottomMark.width / 2;
        bottomMark.y = this.config.size - bottomMark.height - this.config.thickness - 1;

        var leftMark = {};
        leftMark.width = MARK.length * this.config.size;
        leftMark.height = MARK.thickness * this.config.size;
        leftMark.x = this.config.thickness + 1;
        leftMark.y = this.config.size / 2 - leftMark.height / 2;

        return [topMark, rightMark, bottomMark, leftMark];
    };

    ChartBuilder.prototype._appendCircle = function(parent) {
        return parent.append('circle')
            .classed('chart', true)
            .attr('cx', this._circleCenter())
            .attr('cy', this._circleCenter())
            .attr('r', this._circleRadius())
            .attr('stroke-width', this.config.thickness);
    };

    ChartBuilder.prototype._circleRadius = function() {
        return this.config.size / 2 - this.config.thickness / 2;
    };

    ChartBuilder.prototype._circleCenter = function() {
        return this.config.size / 2;
    };

    ChartBuilder.prototype._circleLength = function() {
        return Math.PI * 2 * this._circleRadius();
    };

    ChartBuilder.prototype._primaryColor = function(d, i) {
        var pair = this.config.colors[i];
        return pair && pair.primary ? pair.primary : this.config.primaryColor;
    };

    ChartBuilder.prototype._secondaryColor = function(d, i) {
        var pair = this.config.colors[i];
        return pair && pair.secondary ? pair.secondary : this.config.secondaryColor;
    };

    ChartBuilder.prototype._chartValue = function(d, i) {
        var last = this.config.data[i].values.length - 1;

        // Last value pair from the array
        var val1 = this.config.data[i].values[last].m1;
        var val2 = this.config.data[i].values[last].m2;

        // Ratio of first and second values
        var ratio1 = val1 / (val1 + val2);
        var ratio2 = 1 - ratio1;

        // Dividing circle according to ratios
        var lengths = [
            this._circleLength() * ratio2,
            this._circleLength() * ratio1
        ];

        return lengths.join(',');
    };

    return ChartBuilder;
});