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

    });

});