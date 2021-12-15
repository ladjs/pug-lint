module.exports = function (errors) {
  if (errors.length > 0) {
    for (const error of errors) {
      const message = [
        error.filename,
        ':' + error.line,
        error.column ? ':' + error.column : '',
        ' ' + error.msg
      ];

      console.error(message.join(''));
    }
  }
};
