define(['widget/view/helper', 'd3'], function(helper) {

    function DescriptionBuilder() {}

    DescriptionBuilder.prototype.build = function(parent, config) {
        this.config = config;
        return this._buildDescription(parent);
    };

    DescriptionBuilder.prototype._buildDescription = function(parent) {
        var description = parent.selectAll('g.description')
            .data(this.config.data)
            .enter()
            .append('g')
            .classed('description', true);

        this._buildLeftText(description);
        this._buildRightText(description);
        this._buildLine(description);

        return description;
    };

    DescriptionBuilder.prototype._buildLeftText = function(parent) {
        this._buildMemberName(parent)
            .text(function(d) { return d.member1; })
            .classed('left', true);

        var value = this._buildValue(parent)
            .classed('left', true);

        value.append('tspan')
            .classed('ratio', true)
            .text(function(d) {
                var lastPair = helper.lastValues(d);
                return helper.ratio(lastPair) + '%';
            });

        value.append('tspan')
            .classed('raw', true)
            .attr('dx', this.config.size * 0.05)
            .text(function(d) {
                var last = d.values.length - 1;
                var rawValue = d.values[last].m1;
                return helper.formatNumber(rawValue, d.suffix);
            });
    };

    DescriptionBuilder.prototype._buildRightText = function(parent) {
        this._buildMemberName(parent)
            .text(function(d) { return d.member2; })
            .classed('right', true);

        var value = this._buildValue(parent)
            .classed('right', true);

        value.append('tspan')
            .classed('ratio', true)
            .text(function(d) {
                var lastPair = helper.lastValues(d);
                return 100 - helper.ratio(lastPair) + '%'; });

        value.append('tspan')
            .classed('raw', true)
            .attr('dx', this.config.size * 0.05)
            .text(function(d) {
                var last = d.values.length - 1;
                var rawValue = d.values[last].m2;
                return helper.formatNumber(rawValue, d.suffix);
            });

    };

    DescriptionBuilder.prototype._buildMemberName = function(parent) {
        return parent.append('text')
            .classed('member', true)
            .attr('font-size', this.config.descriptionSize)
            .attr('font-family', this.config.fontFamily);
    };

    DescriptionBuilder.prototype._buildValue = function(parent) {
        return parent.append('text')
            .classed('value', true)
            .attr('font-size', this.config.descriptionSize)
            .attr('font-family', this.config.fontFamily);
    };

    DescriptionBuilder.prototype._buildLine = function(parent) {
        parent.append('rect')
            .classed('underline', true);
    };

    return DescriptionBuilder;

});