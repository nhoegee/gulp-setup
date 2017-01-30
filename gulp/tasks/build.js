import gulp from 'gulp'
import runSequence from 'run-sequence'

import { getConfigKeys } from '../config'

gulp.task('build', (cb) =>
  runSequence('views', 'styles', cb)
)
