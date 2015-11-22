define(['widget/view/description_builder', 'jQ', 'd3'], function(DescriptionBuilder, $) {

    describe('DescriptionBuilder', function() {

        var builder;

        beforeEach(function() {
            $('#fixture').append($('<svg>'));
            builder = new DescriptionBuilder();
            builder.config = {};
        });

        it('_buildLeftText() should append left part of description to parent node', function() {
            builder.config.descriptionSize = '25px';
            builder.config.fontFamily = 'sans-serif';
            var svg = d3.select('#fixture')
                .select('svg')
                .data([
                {
                    member1: 'text1',
                    member2: 'text2',
                    values: [
                        {m1: 10, m2: 20}
                    ]
                }
            ]);

            builder._buildLeftText(svg);

            var member = $('.member');
            expect(member.length).toBeGreaterThan(0);
            expect(member.text()).toEqual('text1');
            expect(member.attr('font-size')).toEqual('25px');
            expect(member.attr('font-family')).toEqual('sans-serif');
            var ratio = $('.ratio');
            expect(ratio.length).toBeGreaterThan(0);
            expect(ratio.text()).toEqual('33%');
            var raw = $('.raw');
            expect(raw.length).toBeGreaterThan(0);
            expect(raw.text()).toEqual('10');
        });

        it('_buildRightText() should append right part of description to parent node', function() {
            builder.config.descriptionSize = '25px';
            builder.config.fontFamily = 'sans-serif';
            var svg = d3.select('#fixture')
                .select('svg')
                .data([
                    {
                        member1: 'text1',
                        member2: 'text2',
                        values: [
                            {m1: 10, m2: 20}
                        ]
                    }
                ]);

            builder._buildRightText(svg);

            var member = $('.member');
            expect(member.length).toBeGreaterThan(0);
            expect(member.text()).toEqual('text2');
            expect(member.attr('font-size')).toEqual('25px');
            expect(member.attr('font-family')).toEqual('sans-serif');
            var ratio = $('.ratio');
            expect(ratio.length).toBeGreaterThan(0);
            expect(ratio.text()).toEqual('67%');
            var raw = $('.raw');
            expect(raw.length).toBeGreaterThan(0);
            expect(raw.text()).toEqual('20');
        });

        it('_buildValue() should append value text to the parent node', function() {
            builder.config.descriptionSize = '24px';
            builder.config.fontFamily = 'sans-serif';
            var svg = d3.select('#fixture').select('svg');

            builder._buildValue(svg);

            var valueText = $('#fixture').find('svg').find('text');
            expect(valueText.length).toBeGreaterThan(0);
            expect(valueText.hasClass('value')).toBeTruthy();
            expect(valueText.attr('font-size')).toEqual('24px');
            expect(valueText.attr('font-family')).toEqual('sans-serif');
        });

        it('_buildLine() should append "underline" rectangle to the parent node', function() {
            var svg = d3.select('#fixture').select('svg');

            builder._buildLine(svg);

            var line = $('#fixture').find('svg').find('rect');
            expect(line.length).toBeGreaterThan(0);
            expect(line.hasClass('underline')).toBeTruthy(0);
        });

    });

});