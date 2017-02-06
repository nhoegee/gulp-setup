import gulp from 'gulp'
import plumber from 'gulp-plumber'
import clean from 'gulp-clean'
import gulpif from 'gulp-if'
import sourcemaps from 'gulp-sourcemaps'
import postcss from 'gulp-postcss'
import rename from 'gulp-rename'

import atImport from 'postcss-import'
import url from 'postcss-url'
import cssnext from 'postcss-cssnext'
import cssnano from 'cssnano'
import browserReporter from 'postcss-browser-reporter'
import reporter from 'postcss-reporter'

import { errorHandler, getConfigKeys } from '../config'

const taskOptions  = getConfigKeys();

const localConfig = {
  clean: {
    src: ['./public/css/*'],
    read: false
  },
  plugins: {
    cssnano: {
      autoprefixer: false
    }
  },
  styles: {
    src: ['./resources/assets/styles/*.css'],
    rename: 'style.min.css',
    dest: './public/css/'
  }
}

gulp.task('clean:styles', () =>
  gulp.src(localConfig.clean.src, { read: localConfig.clean.read })
    .pipe(clean())
)

gulp.task('styles', ['clean:styles'], () => {
  const plugins = taskOptions.minify
    ? [atImport, url, cssnext, cssnano({ autoprefixer: localConfig.plugins.cssnano.autoprefixer }), browserReporter, reporter]
    : [atImport, url, cssnext, browserReporter, reporter]

  return gulp.src(localConfig.styles.src)
    .pipe(plumber({ errorHandler }))
    .pipe(gulpif(taskOptions.sourcemaps ,sourcemaps.init()))
      .pipe(postcss(plugins))
      .pipe(gulpif(taskOptions.minify, rename(localConfig.styles.rename)))
    .pipe(gulpif(taskOptions.sourcemaps, sourcemaps.write('.')))
    .pipe(gulp.dest(localConfig.styles.dest))
})
