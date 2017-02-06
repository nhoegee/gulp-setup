import gulp from 'gulp'
import runSequence from 'run-sequence'

gulp.task('default', (cb) => {
  runSequence('build', 'watch', 'serve', cb)
})
