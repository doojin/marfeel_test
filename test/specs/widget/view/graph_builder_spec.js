define(['jQ', 'widget/view/graph_builder', 'd3'], function($, GraphBuilder) {

    describe('graphBuilder', function() {

        var builder;

        beforeEach(function() {
            builder = new GraphBuilder();
            builder.config = {};
            $('#fixture').append('<svg></svg>');
        });

        it('_buildOuterCircle() should append circle to node', function() {
            builder.config.size = 100;
            spyOn(builder, '_outerCircleRadius').and.returnValue(60);
            spyOn(builder, '_outerCircleStroke').and.returnValue(40);
            var svg = d3.select('#fixture').select('svg');

            builder._buildOuterCircle(svg);

            var circle = $('#fixture').find('svg').find('circle');
            expect(circle.length).toBeGreaterThan(0);
            expect(circle.attr('cx')).toEqual('50');
            expect(circle.attr('cy')).toEqual('50');
            expect(circle.attr('r')).toEqual('60');
            expect(circle.attr('stroke-width')).toEqual('40');
        });

        it('_outerCircleStroke() should calculate stroke width for outer circle', function() {
            builder.config.size = 100;

            result = builder._outerCircleStroke();

            expect(result).toEqual(50);
        });

        it('_outerCircleRadius() should calculate radius for outer circle', function() {
            builder.config.size = 100;
            builder.config.thickness = 10;
            spyOn(builder, '_outerCircleStroke').and.returnValue(20);

            result = builder._outerCircleRadius();

            expect(result).toEqual(43);
        });

    });
});