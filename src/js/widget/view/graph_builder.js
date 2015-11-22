// Responsible for building graph inside the circle chart
define(['d3'], function() {

    var graphBuilder = {};

    graphBuilder.build = function(nodes, config) {
        this.config = config;

        var self = this;
        nodes.each(function(d) {
            var node = d3.select(this);
            var graph = node.append('g')
                .attr('transform', 'translate(0,' + (self.config.size / 1.8) + ')');

            self._buildGraph(graph, d);
            self._buildOuterCircle(node);
        });
    };

    graphBuilder._buildGraph = function(node, data) {
        var x = d3.scale.linear().range([0, this.config.size]);
        var y = d3.scale.linear().range([this.config.size / 4, 0]);

        x.domain([0, data.values.length-1]);
        y.domain([0, d3.max(data.values, function(d) { return d.member1 / d.member2 })]);

        // Graph line
        var line = d3.svg.line()
            .interpolate('basis')
            .x(function(d, i) { return x(i); })
            .y(function(d) { return y(d.member1 / d.member2)});

        // Filling graph
        var area = d3.svg.area()
            .interpolate('basis')
            .x(function(d, i) { return x(i); })
            .y0(this.config.size / 2)
            .y1(function(d) { return y(d.member1 / d.member2)});

        node.append('path')
            .classed('fill', true)
            .datum(data.values)
            .attr('d', area);

        node.append('path')
            .classed('line', true)
            .attr('d', line(data.values));
    };

    graphBuilder._buildOuterCircle = function(node) {
        node.append('circle')
            .classed('outer', true)
            .attr('cx', this.config.size / 2)
            .attr('cy', this.config.size / 2)
            .attr('r', this._outerCircleRadius())
            .attr('stroke-width', this._outerCircleStroke());
    };

    graphBuilder._outerCircleStroke = function() {
        return this.config.size / 2;
    };

    graphBuilder._outerCircleRadius = function() {
        return this.config.size / 2 + this._outerCircleStroke() / 2 - this.config.thickness - 7;
    };

    return graphBuilder;
});