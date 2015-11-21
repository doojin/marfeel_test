define(['widget/default_config'], function(DefaultConfig) {

    describe('DefaultConfig', function() {
        var config;

        beforeEach(function() {
            config = new DefaultConfig();
        });

        it('merge() should update old fields of default config', function() {
            var result = config.merge({ width: 1024, height: 512 });

            expect(result).toEqual({
                width: 1024,
                height: 512,
                parent: 'body',
                paddingTop: 30,
                paddingRight: 30,
                paddingBottom: 30,
                paddingLeft: 30,
                spacing: 30
            });
        });

        it('merge() should add new fields to default config', function() {
            var result = config.merge({
                prop1: 'value1',
                prop2: 'value2'
            });

            expect(result).toEqual({
                width: 200,
                height: 200,
                prop1: 'value1',
                prop2: 'value2',
                parent: 'body',
                paddingTop: 30,
                paddingRight: 30,
                paddingBottom: 30,
                paddingLeft: 30,
                spacing: 30
            });
        });
    });
});