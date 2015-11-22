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

        it('_markData() should return array of 4 marks', function() {
            builder.config.size = 200;
            builder.config.thickness = 10;

            var marks = builder._markData();
            var topMark = marks[0];
            var rightMark = marks[1];
            var bottomMark = marks[2];
            var leftMark = marks[3];

            expect(topMark).toEqual({x: 98.5, y: 11, width: 3, height:4});
            expect(rightMark).toEqual({x: 185, y: 98, width: 4, height: 3});
            expect(bottomMark).toEqual({x: 98.5, y: 185, width: 3, height: 4});
            expect(leftMark).toEqual({x: 11, y: 98.5, width: 4, height: 3});
        });

        it('_buildMarks() should append all marks to parent node', function() {
            var fixture = d3.select('#fixture').select('svg');
            spyOn(builder, 'primaryColor').and.returnValue('#fff');
            spyOn(builder, '_markData').and.returnValue([
                {x: 1, y: 2, width: 3, height: 4},
                {x: 10, y: 20, width: 30, height: 40}
            ]);

            builder._buildMarks(fixture);
            var rectangles = $('#fixture').find('svg').find('rect');

            expect(rectangles.length).toEqual(2);
            var rect1 = $(rectangles[0]);
            expect(rect1.attr('x')).toEqual('1');
            expect(rect1.attr('y')).toEqual('2');
            expect(rect1.attr('width')).toEqual('3');
            expect(rect1.attr('height')).toEqual('4');
            expect(rect1.attr('fill')).toEqual('#fff');
            var rect2 = $(rectangles[1]);
            expect(rect2.attr('x')).toEqual('10');
            expect(rect2.attr('y')).toEqual('20');
            expect(rect2.attr('width')).toEqual('30');
            expect(rect2.attr('height')).toEqual('40');
            expect(rect2.attr('fill')).toEqual('#fff');
        });

        it('_addGraphColors() should fill graph with secondary color', function() {
            var line = $('<path>').addClass('line');
            var fill = $('<path>').addClass('fill');
            var g = $('<g>').append(line).append(fill);
            $('#fixture').find('svg').append(g);
            var svg = d3.select('#fixture').select('svg');

            spyOn(builder, 'secondaryColor').and.returnValue('#ff00ff');

            expect(line.attr('stroke')).toBeUndefined();
            expect(fill.attr('fill')).toBeUndefined();

            builder._addGraphColors(svg);

            expect(line.attr('stroke')).toEqual('#ff00ff');
            expect(fill.attr('fill')).toEqual('#ff00ff');
        });

        it('_formatNumber() should format number with suffix', function() {
            var number = 1000000;
            var suffix = '$';

            var result = builder._formatNumber(number, suffix);

            expect(result).toBe('1.000.000$');
        });

        it('_formatNumber() should format number without suffix', function() {
            var number = 1000000;

            var result = builder._formatNumber(number);

            expect(result).toBe('1.000.000');
        });
    });
});