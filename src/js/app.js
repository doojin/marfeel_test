(function() {
    require.config({
        urlArgs: 'cb=' + Math.random(),
        paths: {
            'd3': '../../bower_components/d3/d3.min'
        }
    });
})();

define(['widget/circle_chart'], function (CircleChart) {
    var config = {
        data: [
            {
                title: 'revenue',
                member1: 'Member 1',
                member2: 'Member 2',
                values: [
                    {m1: 100, m2: 200},
                    {m1: 300, m2: 200},
                    {m1: 50, m2: 200},
                    {m1: 200, m2: 200},
                    {m1: 400, m2: 200},
                    {m1: 150, m2: 200},
                    {m1: 50, m2: 200},
                    {m1: 200, m2: 200},
                    {m1: 400, m2: 200},
                    {m1: 100, m2: 200},
                    {m1: 300, m2: 200},
                    {m1: 50, m2: 200},
                    {m1: 30000, m2: 20000}
                ],
                suffix: '€'
            },
            {
                title: 'revenue',
                member1: 'Member 1',
                member2: 'Member 2',
                values: [
                    {m1: 100, m2: 200},
                    {m1: 300, m2: 200},
                    {m1: 50, m2: 200},
                    {m1: 200, m2: 200},
                    {m1: 400, m2: 200},
                    {m1: 150, m2: 200},
                    {m1: 50, m2: 200},
                    {m1: 200, m2: 200},
                    {m1: 400, m2: 200},
                    {m1: 100, m2: 200},
                    {m1: 300, m2: 200},
                    {m1: 50, m2: 200},
                    {m1: 30000, m2: 20000}
                ],
                suffix: '€'
            },
            {
                title: 'revenue',
                member1: 'AAAA',
                member2: 'AAAA',
                values: [
                    {m1: 100, m2: 200},
                    {m1: 120, m2: 200},
                    {m1: 90, m2: 200},
                    {m1: 110, m2: 200},
                    {m1: 140, m2: 200},
                    {m1: 100, m2: 200},
                    {m1: 50, m2: 200},
                    {m1: 100, m2: 200},
                    {m1: 120, m2: 200},
                    {m1: 100, m2: 200},
                    {m1: 120, m2: 200},
                    {m1: 50, m2: 200},
                    {m1: 120, m2: 200}
                ],
                suffix: '€'
            }
        ],
        colors: [
            { primary: '#000', secondary: '#AEB846' }
        ]
    };
    var chart = new CircleChart(config);
    chart.init();

    config.colors = [{ primary: 'red', secondary: '#AEB846' }];
    var chart2 = new CircleChart(config);
    chart2.init();

});