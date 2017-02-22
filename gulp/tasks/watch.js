import gulp from 'gulp'
import runSequence from 'run-sequence'

const localConfig = {
  styles: {
    src: ['./resources/assets/styles/**/*.css']
  },
  scripts: {
    src: ['./resources/assets/scripts/**/*.js']
  }
}

gulp.task('watch:styles', () => {
  gulp.watch(localConfig.styles.src, () => {
    runSequence('styles', 'inject')
  })
})

gulp.task('watch:scripts', () => {
  gulp.watch(localConfig.scripts.src, () => {
    runSequence('scripts', 'inject');
  })
})

gulp.task('watch', ['watch:styles', 'watch:scripts'])
