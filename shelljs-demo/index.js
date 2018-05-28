const path = require('path');
const shell = require('shelljs');

shell.mkdir('-p', path.resolve(__dirname, './a/a/a'));

/**
 * const createFolder = (dir, callback) => {
  const _f = (self) => {
    return (dir) => {
      return (callback) => {
        fs.stat(dir, (err, info) => {
          if (err) {
            self(self)(path.dirname(dir))(() => {
              fs.mkdir(dir, () => {
                callback && callback(info)
              })
            })
          } else {
            callback && callback(info)
          }
        })
      }
    }
  }
  _f(_f)(dir)(callback)
}
 */