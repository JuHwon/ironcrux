module.exports = function (wallaby) {
    console.log(wallaby);
    
    var wallabify = require("wallabify");
    var wallabyPostprocessor = wallabify({
        entryPatterns: [
            "src/client/**/*.spec.js"
        ]
    });
    
    return {
        // files : [
        //     { pattern: 'src/**/*.ts', load: false },          
        //     { pattern: 'src/**/*.spec.ts', ignore: true }
        // ],
        files: [
            'src/**/*.ts',
            '!src/**/*.spec.ts'  
        ],
        tests: [
            'src/**/*.spec.ts'  
        ],
        // tests: [
        //     { pattern: 'src/**/*.spec.ts', load: false }
        // ],
        testFramework: 'mocha',
        // postprocessor: wallabyPostprocessor,
        // setup: function () {
        //     window.__moduleBundler.loadTests();
        // },
        compilers: {
            'src/server/**/*.ts': wallaby.compilers.typeScript({
                typescript: require("typescript"),
                module: 'commonjs',
                target: 'es6'
            }),
            'src/client/**/*.ts': wallaby.compilers.typeScript({
                typescript: require("typescript"),
                target: 'es5'
            })
        },
        env: {
            type: 'node'
        },
        debug: true
    };
};