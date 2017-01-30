import gulp from 'gulp'
import plumber from 'gulp-plumber'

import errorHandler from '../config'

const localConfig = {
  src: ['./public/*.html', 'resources/assets/views/**/*.html']
}

gulp.task('views', () =>
  gulp.src(localConfig.src)
    .pipe(plumber({ errorHandler }))
)
