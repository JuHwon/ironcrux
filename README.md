# ironcrux

**AngularJS / NodeJS Application in TypeScript**

> The structure of the application is influenced by the [HotTowel-Angular](https://github.com/johnpapa/generator-hottowel) and the [gulp-angular](https://github.com/Swiip/generator-gulp-angular) skeleton.


## Prerequisites

1. Install [Node.js](http://nodejs.org)
 - on OSX use [homebrew](http://brew.sh) `brew install node`
 - on Windows use [chocolatey](https://chocolatey.org/) `choco install nodejs`

2. Install these NPM packages globally

    ```bash
    npm install -g bower gulp nodemon tsc typings
    ```

    >Refer to these [instructions on how to not require sudo](https://github.com/sindresorhus/guides/blob/master/npm-global-without-sudo.md)

    > On linux you might have problems with `gulp.watch`. In this case check out these links: [GitHub Issue](https://github.com/gulpjs/gulp/issues/217) / [Stackoverflow](http://stackoverflow.com/questions/16748737/grunt-watch-error-waiting-fatal-error-watch-enospc)
    
3. Install local npm, typings and bower packages in your project directory

    ```bash
    npm install
    typings install
    bower install
    ```

