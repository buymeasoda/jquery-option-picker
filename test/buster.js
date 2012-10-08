var config = module.exports;

config['optionPicker Test'] = {
    env: 'browser',
    rootPath: '../',
    sources: [
        'lib/jquery-1.8.2.min.js',
        'jquery.optionPicker-min.js'
    ],
    tests: [
        'test/*-test.js'
    ]
};