define(['jQ', 'widget/view/simple_view'], function($, SimpleView) {

    describe('SimpleView', function() {

        var simpleView;

        afterEach(function() {
            simpleView = null;
        });

        it('_totalWidth() should calculate width of widget for one nested chart', function() {
            simpleView = new SimpleView({
                data: [{/* the only one chart */}],
                size: 100,
                paddingLeft: 10,
                paddingRight: 20,
                spacing: 30
            });
            spyOn(simpleView, '_chartMarginLeft').and.returnValue(50);
            spyOn(simpleView, '_chartMarginRight').and.returnValue(30);

            var result = simpleView._totalWidth();

            expect(result).toEqual(180);
        });

        it('_totalWidth() should calculate width of widget for multiple nested charts', function() {
            simpleView = new SimpleView({
                data: [{/* first chart */}, {/* second chart */}, {/* third chart */}],
                size: 100,
                paddingLeft: 10,
                paddingRight: 20,
                spacing: 30
            });
            spyOn(simpleView, '_chartMarginLeft').and.returnValue(50);
            spyOn(simpleView, '_chartMarginRight').and.returnValue(30);

            var result = simpleView._totalWidth();

            expect(result).toEqual(540);
        });

        it('_totalHeight() should calculate height of widget', function() {
            simpleView = new SimpleView({
                paddingTop: 10,
                paddingBottom: 20,
                size: 100
            });

            var result = simpleView._totalHeight();

            expect(result).toEqual(100);
        });

        it('_buildSVG() should append SVG to parent node', function() {
            simpleView = new SimpleView({ parent: '#fixture' });
            spyOn(simpleView, '_totalWidth').and.returnValue(400);
            spyOn(simpleView, '_totalHeight').and.returnValue(300);

            simpleView._buildSVG();
            var svg = $('#fixture').find('svg');

            expect(svg.length).toBeGreaterThan(0);
            expect(svg.attr('width')).toEqual('400');
            expect(svg.attr('height')).toEqual('300');
        });

        it('_chartPosition() should calculate position of i-th chart', function() {
            simpleView = new SimpleView({
                size: 100
            });
            spyOn(simpleView, '_chartMarginLeft').and.returnValue(50);
            spyOn(simpleView, '_chartMarginRight').and.returnValue(30);

            var firstChartPosition = simpleView._chartPosition(null, 0);
            var secondChartPosition = simpleView._chartPosition(null, 1);

            expect(firstChartPosition).toEqual('translate(50,0)');
            expect(secondChartPosition).toEqual('translate(230,0)');
        });

        it('_chartMarginLeft() should calculate left margin of chart', function() {
            simpleView = new SimpleView({
                size: 300
            });

            var result = simpleView._chartMarginLeft();

            expect(result).toEqual(100);
        });

        it('_chartMarginRight() should calculate right margin of chart', function() {
            simpleView = new SimpleView({
                size: 300
            });

            var result = simpleView._chartMarginLeft();

            expect(result).toEqual(100);
        });
    });
});