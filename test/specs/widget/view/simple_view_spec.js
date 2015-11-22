define(['jQ', 'widget/view/simple_view', 'widget/view/helper'], function($, SimpleView, helper) {

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
            spyOn(simpleView, '_descriptionMarginTop').and.returnValue(10);
            spyOn(simpleView, '_descriptionHeight').and.returnValue(50);

            var result = simpleView._totalHeight();

            expect(result).toEqual(160);
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

        it('_formatDescriptions() should format description', function() {
            simpleView = new SimpleView();
            spyOn(simpleView, '_descriptionPosition').and.returnValue('translate(10,20)');
            spyOn(simpleView, '_descriptionEnd').and.returnValue(50);
            spyOn(helper, 'secondaryColor').and.returnValue('#fff');
            spyOn(helper, 'primaryColor').and.returnValue('#000');
            var svg = $('<svg>');
            var g = $('<g>');
            g.append($('<text class="left member">'));
            g.append($('<text class="right member">'));
            svg.append(g);
            $('#fixture').append(svg);

            var node = d3.select('#fixture').select('svg').select('g');
            simpleView._formatDescriptions(node);

            var leftText = $('text.left.member');
            var rightText = $('text.right.member');
            expect(g.attr('transform')).toEqual('translate(10,20)');
            expect(leftText.attr('fill')).toEqual('#fff');
            expect(rightText.attr('fill')).toEqual('#000');
        });

        it('_descriptionPosition() should calculate desciprtion position', function() {
            simpleView = new SimpleView({
                size: 100
            });
            spyOn(simpleView, '_chartMarginLeft').and.returnValue(20);
            spyOn(simpleView, '_chartMarginRight').and.returnValue(30);
            spyOn(simpleView, '_descriptionMarginTop').and.returnValue(40);

            var first = simpleView._descriptionPosition(null, 0);
            var second = simpleView._descriptionPosition(null, 1);

            expect(first).toEqual('translate(8,140)');
            expect(second).toEqual('translate(158,140)');
        });

        it('_descriptionEnd() should calculate x coordinate of description right border', function() {
            simpleView = new SimpleView({
                size: 100
            });
            spyOn(simpleView, '_chartMarginLeft').and.returnValue(20);
            spyOn(simpleView, '_chartMarginRight').and.returnValue(30);

            var result = simpleView._descriptionEnd();

            expect(result).toEqual(130);
        });

        it('_descriptionMarginTop() should return top margin of description', function() {
            var simpleView = new SimpleView({
                size: 100
            });

            expect(simpleView._descriptionMarginTop()).toEqual(5);
        });

        it('_descriptionHeight() the height of description', function() {
            var simpleView = new SimpleView({
                size: 100
            });

            expect(simpleView._descriptionHeight()).toEqual(30);
        });

    });
});