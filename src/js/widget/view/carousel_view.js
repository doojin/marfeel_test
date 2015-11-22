define([
    'widget/view/simple_view',
    'widget/view/helper'
], function(
    SimpleView,
    helper
) {

    function CarouselView(config) {
        this.config = config;
    }

    CarouselView.prototype = Object.create(SimpleView.prototype);


    CarouselView.prototype._oldFormatDescriptions = CarouselView.prototype._formatDescriptions;
    // TODO: move these magic numbers to constants / methods
    CarouselView.prototype._formatDescriptions = function(descriptions) {
        this._oldFormatDescriptions(descriptions);

        descriptions.select('rect.underline')
            .remove();

        descriptions.selectAll('text.value')
            .remove();

        descriptions.select('text.member.left')
            .style('text-anchor', 'end')
            .style('font-weight', 'normal')
            .attr('fill', '#B6B0C1')
            .attr('x', this._descriptionEnd() / 2 - this._descriptionPadding());

        descriptions.select('text.member.right')
            .style('text-anchor', 'start')
            .style('font-weight', 'normal')
            .attr('fill', '#B6B0C1')
            .attr('x', this._descriptionEnd() / 2 + this._descriptionPadding());

        this._buildRatioLabels(descriptions);
        this._buildRawValueLabels(descriptions);
        this._buildLine(descriptions);

        this._buildNavigation();
    };

    // TODO: tests
    CarouselView.prototype._buildRatioLabels = function(parent) {
        var self = this;

        parent.append('text')
            .attr('fill', function(d, i) { return helper.secondaryColor(d, i, self.config) })
            .text(function(d) {
                var lastPair = helper.lastValues(d);
                return helper.ratio(lastPair) + '%';
            })
            .attr('font-size', this.config.ratioSize)
            .attr('x', this._descriptionEnd() / 2 - this._descriptionPadding())
            .attr('y', this._ratioLabelsMarginTop())
            .attr('font-family', this.config.fontFamily)
            .attr('text-anchor', 'end');

        parent.append('text')
            .attr('fill', function(d, i) { return helper.primaryColor(d, i, self.config) })
            .text(function(d) {
                var lastPair = helper.lastValues(d);
                var ratio = 100 - helper.ratio(lastPair);
                return ratio + '%';
            })
            .attr('font-size', this.config.ratioSize)
            .attr('x', this._descriptionEnd() / 2 + this._descriptionPadding())
            .attr('font-family', this.config.fontFamily)
            .attr('y', this._ratioLabelsMarginTop());
    };

    // TODO: tests
    CarouselView.prototype._buildRawValueLabels = function(parent) {
        parent.append('text')
            .attr('fill', '#767A84')
            .text(function(d) {
                var lastPair = helper.lastValues(d);
                return helper.formatNumber(lastPair.m1, d.suffix);
            })
            .attr('font-size', this.config.descriptionSize)
            .attr('x', this._descriptionEnd() / 2 - this._descriptionPadding())
            .attr('y', this._rawLabelMarginTop())
            .attr('text-anchor', 'end')
            .attr('font-color', '#767A84')
            .attr('font-family', this.config.fontFamily);

        parent.append('text')
            .attr('fill', '#767A84')
            .text(function(d) {
                var lastPair = helper.lastValues(d);
                return helper.formatNumber(lastPair.m2, d.suffix);
            })
            .attr('font-size', this.config.descriptionSize)
            .attr('x', this._descriptionEnd() / 2 + this._descriptionPadding())
            .attr('y', this._rawLabelMarginTop())
            .attr('font-family', this.config.fontFamily);
    };

    // TODO: tests
    CarouselView.prototype._buildLine = function(parent) {
        parent.append('rect')
            .attr('width', this._lineWidth())
            .attr('height', this._descriptionHeight())
            .attr('x', this._descriptionEnd() / 2 - this._lineWidth() / 2)
            .attr('y', this._lineY())
            .classed('underline', true);
    };

    CarouselView.prototype._buildNavigation = function() {
        var nav = this.svg.append('g')
            .attr('transform', 'translate(' + this._navX() + ',' + this._navY() + ')');

        var self = this;
        nav.selectAll('circle')
            .data(this.config.data)
            .enter()
            .append('circle')
            .attr('cx', function(d, i) { return i * self._navItemSize() + self._navItemSize() / 2 })
            .attr('r', self._navItemSize() * 0.3)
            .classed('nav', true)
            .classed('active', function(d, i) { return i === 0; })
            .on('click', function (d, i) {
                if (self.current == i || self.running) return;
                nav.selectAll('circle').classed('active', false);
                self.running = true;
                var diff = self.current - i;
                self.current = i;
                d3.select(this).classed('active', true);
                self._changePositions(diff);
            });

        this.current = 0;
        this.running = false;
    };

    CarouselView.prototype._changePositions = function(diff) {
        var self = this;

        this.charts.transition()
            .duration(700)
            .attr('transform', function() {
                var transformAttr = d3.select(this).attr('transform');
                var transform = d3.transform(transformAttr);
                var x = transform.translate[0];
                x += diff * self._totalWidth();
                var y = transform.translate[1];
                return 'translate(' + x + ',' + y + ')';
            });

        this.descriptions.transition()
            .duration(700)
            .attr('transform', function() {
                var transformAttr = d3.select(this).attr('transform');
                var transform = d3.transform(transformAttr);
                var x = transform.translate[0];
                x += diff * self._totalWidth();
                var y = transform.translate[1];
                return 'translate(' + x + ',' + y + ')';
            });

        setTimeout(function() {
            self.running = false
        }, 700);
    };

    // TODO: tests
    CarouselView.prototype._totalWidth = function() {
        return this._chartMarginLeft() + this.config.size + this._chartMarginRight();
    };

    // TODO: tests
    CarouselView.prototype._totalHeight = function() {
        return this._navY() +
            this._navItemSize();
    };

    // TODO: tests
    SimpleView.prototype._descriptionMarginTop = function() {
        return this.config.size * 0.15;
    };

    // TODO: tests
    SimpleView.prototype._descriptionHeight = function() {
        return this.config.size * 0.4;
    };

    // TODO: tests
    CarouselView.prototype._descriptionPadding = function() {
        return this.config.size * 0.1;
    };

    // TODO: tests
    CarouselView.prototype._ratioLabelsMarginTop = function() {
        return this.config.size * 0.18;
    };

    // TODO: tests
    CarouselView.prototype._rawLabelMarginTop = function() {
        return this.config.size * 0.3;
    };

    // TODO: tests
    CarouselView.prototype._lineWidth = function() {
        return this.config.size * 0.005;
    };

    // TODO: tests
    CarouselView.prototype._lineY = function() {
        return - this.config.size * 0.07;
    };

    // TODO: tests
    CarouselView.prototype._navItemSize = function() {
        return this.config.size * 0.08;
    };

    // TODO: tests
    CarouselView.prototype._navSize = function() {
        return this.config.data.length * this._navItemSize();
    };

    // TODO: tests
    CarouselView.prototype._navX = function() {
        return this._totalWidth() / 2 - this._navSize() / 2;
    };

    // TODO: tests
    CarouselView.prototype._navY = function() {
        return this._descriptionMarginTop() +
            this._descriptionHeight() +
            this._navItemSize() +
            this.config.size;
    };

    return CarouselView;
});