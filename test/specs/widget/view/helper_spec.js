define(['widget/view/helper'], function(helper) {

    describe('helper', function() {

        it('helper should return the primary and secondary colors for i-th element', function() {
            var config = {
                colors: [
                    {primary: '#fff', secondary: '#000'},
                    {primary: '#000', secondary: '#fff'}
                ]
            };

            expect(helper.primaryColor(null, 0, config)).toEqual('#fff');
            expect(helper.primaryColor(null, 1, config)).toEqual('#000');
            expect(helper.secondaryColor(null, 0, config)).toEqual('#000');
            expect(helper.secondaryColor(null, 1, config)).toEqual('#fff');
        });

        it('helper should format number with suffix correctly', function() {
            var number = 1000000; // one million
            var suffix = '$';

            var result = helper.formatNumber(number, suffix);

            expect(result).toEqual('1.000.000$');
        });

        it('helper should format number without suffix correctly', function() {
            var number = 1000000; // one million

            var result = helper.formatNumber(number);

            expect(result).toEqual('1.000.000');
        });

        it('helper should calculate ratio correctly', function() {
            var pair = {m1: 50, m2: 150};

            var result = helper.ratio(pair);

            expect(result).toEqual(25);
        });

        it('helper should return last value pair from data object', function() {
            var data = {
                values: [
                    {m1: 1, m2: 2},
                    {m1: 3, m2: 4},
                    {m1: 5, m2: 6}
                ]
            };

            var result = helper.lastValues(data);

            expect(result).toEqual({m1: 5, m2: 6});
        });

    });

});