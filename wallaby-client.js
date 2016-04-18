module.exports = function (wallaby) {

  return {
    files: [
      { pattern: 'bower_components/angular/angular.js', instrument: false },
      { pattern: 'bower_components/angular-mocks/angular-mock.js', instrument: false },
      { pattern: 'bower_components/angular-ui-router/release/angular-ui-router.js', instrument: false },
      { pattern: 'node_modules/chai/chai.js', instrument: false },
      { pattern: 'bower_components/bardjs/dist/bard.js', instrument: false },
      '!src/client/**/*.spec.ts',
      'src/client/app/**/*.html',
      { pattern: 'src/client/**/*.ts', load: true }      
    ],
    tests: [
      { pattern: 'src/client/**/*.spec.ts', load: true }
    ],

    testFramework: 'mocha',
    
    compilers: {
      '**/*.ts': wallaby.compilers.typeScript({
        target: 'es5'
      })
    }

  };
};