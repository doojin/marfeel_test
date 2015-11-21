(function() {
    var ROOT_DIR = '../../';
    var JASMINE_DIR = ROOT_DIR + 'bower_components/jasmine-core/lib/jasmine-core/';

    require.config({
        urlArgs: 'cb=' + Math.random(),
        baseUrl: '../src/js',
        paths: {
            'jasmine': JASMINE_DIR + 'jasmine',
            'jasmine-html': JASMINE_DIR + 'jasmine-html',
            'boot': JASMINE_DIR + 'boot',
            'jquery': ROOT_DIR + 'bower_components/jquery/dist/jquery.min',
            'jQ': ROOT_DIR + 'test/helpers/jquery_private', // This dependency won't pollute global scope with $ variable
            'specs': ROOT_DIR + 'test/specs',
            'd3': ROOT_DIR + 'bower_components/d3/d3.min'
        },
        shim: {
            'jasmine': {exports: 'jasmineRequire'},
            'jasmine-html': {exports: 'jasmineRequire', deps: ['jasmine']},
            'boot': {exports: 'jasmineRequire', deps: ['jasmine', 'jasmine-html']}
        }
    });
}());

define(['jQ', 'boot'], function($) {
    var specs = [
        'specs/widget/default_config_spec',
        'specs/widget/view/simple_view_spec',
        'specs/widget/view/chart_builder_spec'
    ];

    require(specs, function() {
        beforeEach(function() {
            $('#fixture').empty();
        });
        window.onload();
    });
});