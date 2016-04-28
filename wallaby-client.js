var wiredep = require('wiredep');
var angularTemplatePreprocessor = require('wallaby-ng-html2js-preprocessor');

module.exports = function(wallaby) {

    return {
        files: wiredep({ 
            devDependencies: true, 
            directory: './bower_components/',
            ignorePath: './..'
        })['js'].map(function(dep) {
            return { pattern: dep, instrument: false }
        }).concat([
            // test libs
            { pattern: 'node_modules/chai/chai.js', instrument: false },
            { pattern: 'node_modules/sinon/pkg/sinon.js', instrument: false },
            { pattern: 'node_modules/sinon-chai/lib/sinon-chai.js', instrument: false },
            { pattern: 'node_modules/babel-polyfill/browser.js', instrument: false},

            // app files
            'src/client/app/**/*.html',
            'src/client/**/*.module.ts', // first modules
            'src/client/**/*.ts',        // then the rest
            '!src/client/**/*.spec.ts'
        ]),
        tests: [
            'src/client/**/*.spec.ts'
        ],

        testFramework: 'mocha',

        compilers: {
            '**/*.ts': wallaby.compilers.typeScript({
                target: 'es5'
            })
        },

        preprocessors: {
            '**/*.html': function(file) {
                return angularTemplatePreprocessor.transform(file, { stripPrefix: 'src/client/', moduleName: 'app' })
            }
        }
    };
};