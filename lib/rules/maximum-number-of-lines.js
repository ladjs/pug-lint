// # maximumNumberOfLines: `int`
//
// Pug files should be at most the number of lines specified.

const assert = require('assert');

module.exports = function () {};

module.exports.prototype = {
  name: 'maximumNumberOfLines',

  schema: {
    type: ['null', 'integer']
  },

  configure(options) {
    assert(
      typeof options === 'number',
      this.name + ' option requires number value or should be removed'
    );

    this._maximumNumberOfLines = options;
  },

  lint(file, errors) {
    const lastToken = file.getLastToken();

    if (lastToken.line > this._maximumNumberOfLines) {
      errors.add(
        'File must be at most ' + this._maximumNumberOfLines + ' lines long',
        lastToken.line
      );
    }
  }
};
