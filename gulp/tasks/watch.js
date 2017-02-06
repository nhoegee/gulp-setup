import gulp from 'gulp'
import runSequence from 'run-sequence'

const localConfig = {
  viewsSrc: ['./public/index.html', './resources/assets/views/**/*.html'],
  stylesSrc: ['./resources/assets/styles/**/*.css'],
  scriptsSrc: ['./resources/assets/scripts/**/*.js']
}

gulp.task('watch:views', () => {
  gulp.watch(localConfig.stylesSrc, ['views'])
})

gulp.task('watch:styles', () => {
  gulp.watch(localConfig.stylesSrc, () => {
    runSequence('styles', 'inject')
  })
})

gulp.task('watch:scripts', () => {
  gulp.watch(localConfig.scriptsSrc, () => {
    runSequence('scripts', 'inject');
  })
})

gulp.task('watch', ['watch:views', 'watch:styles', 'watch:scripts'])
