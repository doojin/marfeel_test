define(['jQ', 'widget/view/carousel_view', 'd3'], function($, CarouselView) {

    function flushTransitions() {
        var now = Date.now;
        Date.now = function() { return Infinity; };
        d3.timer.flush();
        Date.now = now;
    }

    describe('CarouselView', function() {

        var view;

        beforeEach(function() {
            view = new CarouselView();
            view.config = {};
            jasmine.clock().install()
        });

        afterEach(function() {
            jasmine.clock().uninstall()
        });

        it('_totalWidth() should calculate the total width of widget', function() {
            view.config.size = 100;
            spyOn(view, '_chartMarginLeft').and.returnValue(20);
            spyOn(view, '_chartMarginRight').and.returnValue(30);

            var result = view._totalWidth();

            expect(result).toEqual(150);
        });

        it('_totalHeight() should calculate the total height of widget', function() {
            spyOn(view, '_navigationY').and.returnValue(200);
            spyOn(view, '_navItemSize').and.returnValue(30);

            var result = view._totalHeight();

            expect(result).toEqual(230);
        });

        it('_changePositions() should change positions of movable elements and set running flag to false on complete', function() {
            var svg = $('#fixture').append($('<svg>')).find('svg');
            var chart1 = $('<g class="chart">').attr('transform', 'translate(100, 200)');
            var chart2 = $('<g class="chart">').attr('transform', 'translate(200, 200)');
            var desc1 = $('<g class="desc">').attr('transform', 'translate(100, 500)');
            var desc2 = $('<g class="desc">').attr('transform', 'translate(200, 500)');

            svg.append(chart1).append(chart2).append(desc1).append(desc2);

            spyOn(view, '_totalWidth').and.returnValue(200);

            view.charts = d3.select('#fixture').select('svg').selectAll('g.chart');
            view.descriptions = d3.select('#fixture').select('svg').selectAll('g.desc');
            view.running = false;

            expect(chart1.attr('transform')).toEqual('translate(100, 200)');
            expect(chart2.attr('transform')).toEqual('translate(200, 200)');
            expect(desc1.attr('transform')).toEqual('translate(100, 500)');
            expect(desc2.attr('transform')).toEqual('translate(200, 500)');
            expect(view.running).toBeFalsy();

            view._changePositions(1);

            expect(view.running).toBeTruthy();

            jasmine.clock().tick(7000);
            flushTransitions();

            expect(chart1.attr('transform')).toEqual('translate(300,200)');
            expect(chart2.attr('transform')).toEqual('translate(400,200)');
            expect(desc1.attr('transform')).toEqual('translate(300,500)');
            expect(desc2.attr('transform')).toEqual('translate(400,500)');
            expect(view.running).toBeFalsy();

        });

    });

});