(function() {
    require.config({
        urlArgs: 'cb=' + Math.random(),
        paths: {
            'd3': '../../bower_components/d3/d3.min'
        }
    });
})();

// TODO: rename build methods
define(['widget/circle_chart', 'repository'], function (CircleChart, repo) {

    repo.load('task-data-1', function(data) {
        new CircleChart({
            parent: '#example1',
            colors: [
                {primary: '#005E00', secondary: '#4DD027'},
                {primary: '#00485D', secondary: '#09C4E2'},
                {primary: '#D44E0F', secondary: '#FFBF00'}
            ],
            data: data
        }).init();
    });

    repo.load('task-data-2', function(data) {
        new CircleChart({
            parent: '#example2',
            view: 'carousel',
            colors: [
                {primary: '#005E00', secondary: '#4DD027'},
                {primary: '#00485D', secondary: '#09C4E2'},
                {primary: '#D44E0F', secondary: '#FFBF00'}
            ],
            data: data
        }).init();
    });

    var singleChart = new CircleChart({
        parent: '#example3',
        data: [ // One array element
            {
                title: 'Title',
                member1: 'First',
                member2: 'Second',
                values: [
                    {m1: 250, m2: 350},
                    {m1: 100, m2: 800},
                    {m1: 100, m2: 800}
                ]
            }
        ]
    });
    singleChart.init();

    repo.load('task-data-3', function(data) {
        new CircleChart({
            parent: '#example4',
            size: 260,
            colors: [
                {primary: '#8F1515', secondary: '#F2E529'},
                {primary: '#605DB0', secondary: '#5DB081'}
            ],
            data: data
        }).init();
    });

    repo.load('task-data-3', function(data) {
        new CircleChart({
            parent: '#example5',
            size: 260,
            thickness: 30,
            colors: [
                {primary: '#8F1515', secondary: '#F2E529'},
                {primary: '#605DB0', secondary: '#5DB081'}
            ],
            data: data
        }).init();
    });

    repo.load('task-data-3', function(data) {
        new CircleChart({
            parent: '#example6',
            size: 260,
            thickness: 30,
            descriptionSize: '18px',
            sumSize: '20px',
            titleSize: '16px',
            colors: [
                {primary: '#8F1515', secondary: '#F2E529'},
                {primary: '#605DB0', secondary: '#5DB081'}
            ],
            data: data
        }).init();
    });

    repo.load('task-data-3', function(data) {
        new CircleChart({
            parent: '#example7',
            view: 'carousel',
            size: 260,
            thickness: 30,
            descriptionSize: '18px',
            sumSize: '20px',
            titleSize: '16px',
            colors: [
                {primary: '#8F1515', secondary: '#F2E529'},
                {primary: '#605DB0', secondary: '#5DB081'}
            ],
            data: data
        }).init();
    });
});