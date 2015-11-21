define(['jQ', 'widget/view/chart_builder', 'd3'], function($, builder) {

    describe('chartBuilder', function() {

        beforeEach(function() {
            builder.config = {};
            $('#fixture').append('<svg></svg>');
        });

        it('_buildGroups() should build the same amount of groups as data array\'s size', function() {
            builder.config.data = [{/* one */}, {/* two */}];
            var fixture = d3.select('#fixture').select('svg');

            builder._buildGroups(fixture);

            var groups = $('#fixture').find('svg').find('g');
            expect(groups.length).toEqual(2);
        });

        it('_appendCircle() should add a circle element to parent node', function() {
            var fixture = d3.select('#fixture').select('svg');
            spyOn(builder, '_circleCenter').and.returnValue(25);
            spyOn(builder, '_circleRadius').and.returnValue(10);

            builder._appendCircle(fixture);

            var circle = $('#fixture').find('svg').find('circle');
            expect(circle.length).toBeGreaterThan(0);
            expect(circle.attr('cx')).toEqual('25');
            expect(circle.attr('cy')).toEqual('25');
            expect(circle.attr('r')).toEqual('10');
        });

        it('_circleRadius() should calculate radius of circle', function() {
            builder.config.size = 40;
            builder.config.thickness = 10;

            var result = builder._circleRadius();

            expect(result).toEqual(15);
        });

        it('_circleCenter() should calculate center of circle', function() {
            builder.config.size = 40;

            var result = builder._circleCenter();

            expect(result).toEqual(20);
        });

        it('_circleLength() should calculate the length of circumference', function() {
            spyOn(builder, '_circleRadius').and.returnValue(10);

            var result = builder._circleLength();

            expect(result).toBeCloseTo(62.83, 2);
        });

        it('primaryColor() should return the primary color for i-th chart', function() {
            builder.config.colors = [
                {primary: 'p1', secondary: 's1'},
                {primary: 'p2', secondary: 's2'}
            ];

            expect(builder.primaryColor(null, 0)).toEqual('p1');
            expect(builder.primaryColor(null, 1)).toEqual('p2');
        });

        it('primaryColor() should return default primary color from config if color array is empty', function() {
            builder.config.colors = [];
            builder.config.primaryColor = 'p1';

            expect(builder.primaryColor(null, 0)).toEqual('p1');
        });

        it('secondaryColor() should return the secondary color for i-th chart', function() {
            builder.config.colors = [
                {primary: 'p1', secondary: 's1'},
                {primary: 'p2', secondary: 's2'}
            ];

            expect(builder.secondaryColor(null, 0)).toEqual('s1');
            expect(builder.secondaryColor(null, 1)).toEqual('s2');
        });

        it('secondaryColor() should return default secondary color from config if color array is empty', function() {
            builder.config.colors = [];
            builder.config.secondaryColor = 's1';

            expect(builder.secondaryColor(null, 0)).toEqual('s1');
        });

        it('chartValue() should calculate chart value', function() {
            builder.config.data = [{
                    values: [
                        {member1: 12345, member2: 12345}, // dummy data
                        {member1: 25, member2: 75} // last record that will be visualized
                    ]
                }];
            spyOn(builder, '_circleLength').and.returnValue(200);

            var result = builder.chartValue(null, 0);

            expect(result).toEqual('150,50');
        });
    });
});