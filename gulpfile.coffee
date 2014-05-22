runSequence = require 'run-sequence'
browserify = require 'browserify'
source = require('vinyl-source-stream')
gulp = require 'gulp'
$ = require('gulp-load-plugins')()

paths =
  coffeeSrc: 'src/**/*.coffee'
  coffeeDest: 'lib/'

gulp.task 'coffee', ()->
  gulp.src paths.coffeeSrc
    .pipe($.coffee()).on 'error', $.util.log
    .pipe gulp.dest paths.coffeeDest

gulp.task 'watch', ()->
  gulp.watch paths.coffeeSrc, ['coffee', 'browserify']

gulp.task 'browserify', ['browserify-min', 'browserify-debug']

gulp.task 'browserify-min', ()->
  bundle = browserify './index.js'
  bundle.transform global: true, 'coffeeify'
  bundle.transform global: true, 'uglifyify'
  bundle.bundle()
    .on 'error', $.util.log
    .pipe source('hashwords.min.js')
    .pipe gulp.dest('dist/')

gulp.task 'browserify-debug', ()->
  bundle = browserify './index.js'
  bundle.transform global: true, 'coffeeify'
  bundle.bundle debug: true
    .on 'error', $.util.log
    .pipe source('hashwords.js')
    .pipe gulp.dest('dist/')

gulp.task 'default', ['coffee', 'browserify', 'watch']
