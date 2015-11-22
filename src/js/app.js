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
                title: 'revenue',
                member1: 'Member 1',
                member2: 'Member 2',
                values: [
                    {member1: 100, member2: 200},
                    {member1: 300, member2: 200},
                    {member1: 50, member2: 200},
                    {member1: 200, member2: 200},
                    {member1: 400, member2: 200},
                    {member1: 150, member2: 200},
                    {member1: 50, member2: 200},
                    {member1: 200, member2: 200},
                    {member1: 400, member2: 200},
                    {member1: 100, member2: 200},
                    {member1: 300, member2: 200},
                    {member1: 50, member2: 200},
                    {member1: 30000, member2: 20000}
                ],
                suffix: '€'
            }
        ],
        colors: [
            { primary: '#005E00', secondary: '#4DD027' }
        ]
    });

    chart.init();
});