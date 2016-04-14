module.exports = function (wallaby) {

  return {
    files: [
      'src/server/**/*.ts',
      'src/client/**/*.html', // required because your server tests request pages
      '!src/**/*.spec.ts'
    ],
    tests: [
      'src/server/**/*.spec.ts'
    ],

    testFramework: 'mocha',

    compilers: {
      '**/*.ts': wallaby.compilers.typeScript({
        module: 'commonjs',
        target: 'es6'
      })
    },

    env: {
      type: 'node'
    }
  };
};