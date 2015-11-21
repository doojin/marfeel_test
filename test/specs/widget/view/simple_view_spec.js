define(['jQ', 'widget/view/simple_view'], function($, SimpleView) {

    describe('SimpleView', function() {

        var simpleView;

        afterEach(function() {
            simpleView = null;
        });

        it('_totalWidth() should calculate width of widget for one nested chart', function() {
            simpleView = new SimpleView({
                data: [{/* the only one chart */}],
                width: 100,
                paddingLeft: 10,
                paddingRight: 20,
                spacing: 30
            });

            var result = simpleView._totalWidth();

            expect(result).toEqual(130);
        });

        it('_totalWidth() should calculate width of widget for multiple nested charts', function() {
            simpleView = new SimpleView({
                data: [{/* first chart */}, {/* second chart */}, {/* third chart */}],
                width: 100,
                paddingLeft: 10,
                paddingRight: 20,
                spacing: 30
            });

            var result = simpleView._totalWidth();

            expect(result).toEqual(390);
        });

        it('_totalHeight() should calculate height of widget', function() {
            simpleView = new SimpleView({
                paddingTop: 10,
                paddingBottom: 20,
                height: 100
            });

            var result = simpleView._totalHeight();

            expect(result).toEqual(130);
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
    });
});