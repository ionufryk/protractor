exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['protractor_?_spec.js'],

    capabilities: {
        browserName: 'firefox',
        shardTestFiles: true,
        maxInstances: 2
    }
}