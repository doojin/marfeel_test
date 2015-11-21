define(['d3'], function() {

    // Widget representation without a slider
    function SimpleView(config) {
        this.config = config;
    }

    SimpleView.prototype.build = function() {
        this.svg = this._buildSVG();
    };

    // Creating SVG element
    SimpleView.prototype._buildSVG = function() {
        return d3.select(this.config.parent)
            .append('svg')
            .attr('width', this._totalWidth())
            .attr('height', this._totalHeight());
    };

    SimpleView.prototype._totalWidth = function() {
        return this.config.paddingLeft +
            this.config.paddingRight +
            this.config.width * this.config.data.length +
            this.config.spacing * (this.config.data.length - 1);
    };

    SimpleView.prototype._totalHeight = function() {
        return this.config.paddingTop + this.config.paddingBottom + this.config.height;
    };

    return SimpleView;

});