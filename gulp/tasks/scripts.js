import gulp from 'gulp'
import plumber from 'gulp-plumber'
import gulpif from 'gulp-if'
import sourcemaps from 'gulp-sourcemaps'
import babel from 'gulp-babel'
import concat from 'gulp-concat'
import iife from 'gulp-iife'
import uglify from 'gulp-uglify'
import rename from 'gulp-rename'

import { errorHandler, getConfigKeys } from '../config'

const taskOptions  = getConfigKeys();

const localConfig = {
  scripts: {
    src: ['./resources/assets/scripts/**/*.js'],
    buildName: 'app.js',
    rename: 'app.min.js',
    dest: './public/js/'
  }
}

gulp.task('scripts', ['clean:scripts'], () =>
  gulp.src(localConfig.scripts.src)
    .pipe(plumber({ errorHandler }))
    .pipe(gulpif(taskOptions.sourcemaps ,sourcemaps.init()))
      .pipe(babel())
      .pipe(gulpif(taskOptions.concat, concat(localConfig.scripts.buildName)))
      .pipe(iife({ useStrict: false }))
      .pipe(gulpif(taskOptions.minify, uglify()))
      .pipe(gulpif(taskOptions.minify, rename(localConfig.scripts.rename)))
    .pipe(gulpif(taskOptions.sourcemaps, sourcemaps.write('.')))
    .pipe(gulp.dest(localConfig.scripts.dest))
)
