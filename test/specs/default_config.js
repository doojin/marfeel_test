define(['widget/default_config'], function(DefaultConfig) {
    describe('DefaultConfig', function() {
        var config;

        beforeEach(function() {
            config = new DefaultConfig();
        });

        it('merge() should update old fields of default config', function() {
            var result = config.merge({ width: 1024 });

            expect(result).toEqual({
                width: 1024,
                height: 200
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
                prop2: 'value2'
            });
        });
    });
});