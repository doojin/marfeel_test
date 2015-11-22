define(['widget/view/description_builder', 'jQ', 'd3'], function(DescriptionBuilder, $) {

    describe('DescriptionBuilder', function() {

        var builder;

        beforeEach(function() {
            $('#fixture').append($('<svg>'));
            builder = new DescriptionBuilder();
            builder.config = {};
        });

        it('_buildLeftText() should append text to parent node', function() {
            builder.config.descriptionSize = '25px';
            builder.config.fontFamily = 'sans-serif';
            var svg = d3.select('#fixture')
                .data([ {member1: 'text1', member2: 'text2'} ])
                .select('svg');

            builder._buildLeftText(svg);

            var text = $('#fixture').find('svg').find('text');
            expect(text.length).toBeGreaterThan(0);
            expect(text.text()).toEqual('text1');
            expect(text.attr('font-size')).toEqual('25px');
            expect(text.attr('font-family')).toEqual('sans-serif');
        });

        it('_buildRightText() should append text to parent node', function() {
            builder.config.descriptionSize = '25px';
            builder.config.fontFamily = 'sans-serif';
            var svg = d3.select('#fixture')
                .data([ {member1: 'text1', member2: 'text2'} ])
                .select('svg');

            builder._buildRightText(svg);

            var text = $('#fixture').find('svg').find('text');
            expect(text.length).toBeGreaterThan(0);
            expect(text.text()).toEqual('text2');
            expect(text.attr('font-size')).toEqual('25px');
            expect(text.attr('font-family')).toEqual('sans-serif');
        });

    });

});