import gulp from 'gulp'
import plumber from 'gulp-plumber'
import inject from 'gulp-inject'

import { errorHandler, getConfigKeys } from '../config.js'

const taskOptions = getConfigKeys();

const localConfig = {
  src: ['./public/index.html'],
  target: ['./public/css/*.css', './public/js/*.js'],
  dest: './public/'
}

gulp.task('inject', () => {
  return gulp.src(localConfig.src)
    .pipe(plumber({ errorHandler }))
    .pipe(inject(gulp.src(localConfig.target)))
    .pipe(gulp.dest(localConfig.dest))
})
