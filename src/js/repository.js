define(['d3'], function() {

    var FILE_DIR = './data/';
    var FILE_EXT = '.json';

    var fileRepository = {};

    fileRepository.load = function(file, onLoad) {
        if (typeof(onLoad) !== typeof(Function)) return;

        var fileName = FILE_DIR + file + FILE_EXT;
        d3.json(fileName, onLoad);
    };

    return fileRepository;

});