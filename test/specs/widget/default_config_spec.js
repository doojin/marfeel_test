define(['widget/default_config'], function(DefaultConfig) {

    describe('DefaultConfig', function() {
        var config;

        beforeEach(function() {
            config = new DefaultConfig();
        });

        it('merge() should update old fields of default config', function() {
            var result = config.merge({ size: 1024 });

            expect(result).toEqual({
                size: 1024,
                parent: 'body',
                thickness: 10,
                primaryColor: '#005E00',
                secondaryColor: '#4DD027',
                colors: [],
                fontFamily: 'sans-serif',
                titleSize: '20px',
                sumSize: '28px',
                descriptionSize: '14px',
                ratioSize: '24px',
                view: 'simple'
            });
        });

        it('merge() should add new fields to default config', function() {
            var result = config.merge({
                prop1: 'value1',
                prop2: 'value2'
            });

            expect(result).toEqual({
                size: 200,
                prop1: 'value1',
                prop2: 'value2',
                parent: 'body',
                thickness: 10,
                primaryColor: '#005E00',
                secondaryColor: '#4DD027',
                colors: [],
                fontFamily: 'sans-serif',
                titleSize: '20px',
                sumSize: '28px',
                descriptionSize: '14px',
                ratioSize: '24px',
                view: 'simple'
            });
        });
    });
});