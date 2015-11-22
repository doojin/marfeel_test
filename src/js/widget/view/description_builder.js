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

        return description;
    };

    DescriptionBuilder.prototype._buildLeftText = function(parent) {
        parent.append('text')
            .classed('left', true)
            .classed('member', true)
            .text(function(d) { return d.member1; })
            .attr('font-size', this.config.descriptionSize)
            .attr('font-family', this.config.fontFamily);
    };

    DescriptionBuilder.prototype._buildRightText = function(parent) {
        parent.append('text')
            .classed('right', true)
            .classed('member', true)
            .text(function(d) { return d.member2; })
            .attr('font-size', this.config.descriptionSize)
            .attr('font-family', this.config.fontFamily);
    };

    return DescriptionBuilder;

});