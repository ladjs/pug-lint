// # validateAttributeQuoteMarks: `"\""` | `"'"` | `true`
//
// ## e.g.: `"'"`
//
// All attribute values must be enclosed in single quotes.
//
// ```pug
// //- Invalid
// input(type="text" name="name" value="value")
//
// //- Valid
// input(type='text' name='name' value='value')
// ```
//
// ## if (true)
//
// All attribute values must be enclosed in quote marks match the first quote mark encountered in the source code.

const assert = require('assert');

module.exports = function () {};

module.exports.prototype = {
  name: 'validateAttributeQuoteMarks',

  schema: {
    enum: [null, '"', "'", true]
  },

  configure(options) {
    assert(
      options === '"' || options === "'" || options === true,
      this.name + ' option requires \'"\', "\'", or a true value'
    );

    this._quoteMark = options;
  },

  lint(file, errors) {
    let quoteMark = this._quoteMark;
    let isQuoteMarkFound;

    file.iterateTokensByType('attribute', function (token) {
      const value = token.val.length > 0 ? token.val : '';
      const quotes = new Set(['"', "'"]);
      const openingQuote = value.charAt(0);
      const closingQuote = value.charAt(value.length - 1);

      if (quoteMark === true && !isQuoteMarkFound) {
        quoteMark = openingQuote;
        isQuoteMarkFound = true;
      }

      if (
        quotes.has(openingQuote) &&
        quotes.has(closingQuote) &&
        (openingQuote !== quoteMark || closingQuote !== quoteMark)
      ) {
        errors.add('Invalid attribute quote mark found', token.line, token.col);
      }
    });
  }
};
