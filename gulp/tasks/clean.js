import gulp from 'gulp'
import clean from 'gulp-clean'
import cached from 'gulp-cached'

const localConfig = {
  styles: {
    src: ['./public/css/*'],
    read: false
  },
  scripts: {
    src: ['./public/js/*'],
    read: false
  },
}

gulp.task('clean:styles', () =>
  gulp.src(localConfig.styles.src, { read: localConfig.styles.read })
    .pipe(clean())
)

gulp.task('clean:scripts', () =>
  gulp.src(localConfig.scripts.src, { read: localConfig.scripts.read })
    .pipe(clean())
)

gulp.task('clean', () => {
  cached.caches = {}
})
