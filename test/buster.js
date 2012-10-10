var config = module.exports;

config['optionPicker Test'] = {
    environment: 'browser',
    rootPath: '../',
    libs: ['lib/jquery-1.8.2.min.js'],
    sources: ['jquery.optionPicker.js'],
    tests: ['test/*-test.js'],
    resources: [
        {path: '/', file: 'test/fixtures/basic.html'},
    ]
};