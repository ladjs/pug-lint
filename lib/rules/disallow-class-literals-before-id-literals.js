// # disallowClassLiteralsBeforeIdLiterals: `true`
//
// All ID literals must be written before any class literals.
//
// ```pug
// //- Invalid
// input.class#id(type='text')
//
// //- Valid
// input#id.class(type='text')
// ```

const utils = require('../utils');

module.exports = function () {};

module.exports.prototype = {
  name: 'disallowClassLiteralsBeforeIdLiterals',

  schema: {
    enum: [null, true]
  },

  contradictions: ['requireClassLiteralsBeforeIdLiterals'],

  configure(options) {
    utils.validateTrueOptions(this.name, options);
  },

  lint(file, errors) {
    file.addErrorForIncorrectTokenTypeOrder(
      'id',
      'class',
      utils.htmlTagBoundaryTypes,
      errors,
      'All class literals must be written after any ID literals'
    );
  }
};
