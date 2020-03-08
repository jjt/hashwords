browserify = require 'browserify'
source = require 'vinyl-source-stream'
gulp = require 'gulp'
coffee = require 'gulp-coffee'
log = require 'fancy-log'

b = browserify()

paths =
  coffeeSrc: 'src/**/*.coffee'
  coffeeDest: 'lib/'

gulp.task 'coffee', gulp.series ()->
  gulp.src paths.coffeeSrc
    .pipe(coffee()).on 'error', log
    .pipe gulp.dest paths.coffeeDest

gulp.task 'watch', gulp.series ()->
  gulp.watch paths.coffeeSrc, gulp.series ['coffee', 'browserify']

gulp.task 'browserify-min', gulp.series ()->
  bundle = browserify './index.js'
  bundle.transform 'coffeeify', global: true
  bundle.transform 'uglifyify', global: true
  bundle.bundle()
    .on 'error', log
    .pipe source('hashwords.min.js')
    .pipe gulp.dest('dist/')

gulp.task 'browserify-debug', gulp.series ()->
  bundle = browserify './index.js', debug: true
  bundle.transform 'coffeeify', global: true
  bundle.bundle()
    .on 'error', log
    .pipe source('hashwords.js')
    .pipe gulp.dest('dist/')

gulp.task 'browserify', gulp.series ['browserify-min', 'browserify-debug']

gulp.task 'build', gulp.series ['coffee', 'browserify']

gulp.task 'default', gulp.series ['coffee', 'browserify', 'watch']
