import gulp from 'gulp'
import plumber from 'gulp-plumber'
import clean from 'gulp-clean'
import gulpif from 'gulp-if'
import eslint from 'gulp-eslint'
import sourcemaps from 'gulp-sourcemaps'
import babel from 'gulp-babel'
import concat from 'gulp-concat'
import uglify from 'gulp-uglify'
import rename from 'gulp-rename'

import { errorHandler, getConfigKeys } from '../config'

const taskOptions  = getConfigKeys();

const localConfig = {
  clean: {
    src: ['./public/js/*']
  },
  scripts: {
    src: ['./resources/assets/scripts/**/*.js'],
    buildName: 'app.js',
    rename: 'app.min.js',
    dest: './public/js/'
  }
}

gulp.task('clean:scripts', () =>
  gulp.src(localConfig.clean.src)
    .pipe(plumber({ errorHandler }))
    .pipe(clean())
)

gulp.task('scripts', ['clean:scripts'], () =>
  gulp.src(localConfig.scripts.src)
    .pipe(plumber({ errorHandler }))
    .pipe(gulpif(taskOptions.lint, eslint({ useEslintrc: true })))
    .pipe(gulpif(taskOptions.lint, eslint.format()))
    .pipe(gulpif(taskOptions.sourcemaps ,sourcemaps.init()))
      .pipe(babel())
      .pipe(gulpif(taskOptions.concat, concat(localConfig.scripts.buildName)))
      .pipe(gulpif(taskOptions.minify, uglify()))
      .pipe(gulpif(taskOptions.minify, rename(localConfig.scripts.rename)))
    .pipe(gulpif(taskOptions.sourcemaps, sourcemaps.write('.')))
    .pipe(gulp.dest(localConfig.scripts.dest))
)
