import notify from 'gulp-notify';
import gutil from 'gulp-util';

const env = gutil.env.env || 'development';

export function errorHandler (error) {
  notify.onError({
    title: 'Gulp error',
    message: error.message
  });
  console.error(error.message);
  this.emit('end');
}

function readKeys (filename) {
  let keys;
  try {
    keys = require(filename)
  } catch (e) {
    console.error(`No config file found at: ${filename}`);
    keys = {};
  }
  return keys;
}

export function getConfigKeys () {
  const keys = readKeys(`../config/${env}`);
  keys.environment = env;
  console.log(keys);
  return keys;
}
