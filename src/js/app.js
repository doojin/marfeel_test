(function() {
    require.config({
        paths: {
            'd3': '../../bower_components/d3/d3.min'
        }
    });
})();

define(['widget/circle_chart'], function (CircleChart) {
    var chart = new CircleChart({
        data: [
            {
                title: 'Title 1',
                member1: 'Member 1',
                member2: 'Member 2',
                values: [
                    {member1: 200, member2: 100}
                ]
            }
        ],
        colors: [
            { primary: '#005E00', secondary: '#4DD027' }
        ]
    });

    chart.init();
});