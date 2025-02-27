// # disallowSpecificAttributes: `string` | `Array`
//
// ## e.g.: `"a"` OR `[ "A", "b" ]`
//
// Pug must not contain any of the attributes specified.
//
// ```pug
// //- Invalid
// span(a='a')
// div(B='b')
// ```
//
// ## e.g.: `[ { img: [ "title" ] } ]`
//
// `img` tags must not contain any of the attributes specified.
//
// ```pug
// //- Invalid
// img(title='title')
// ```

const assert = require('assert');
const utils = require('../utils');

module.exports = function () {};

module.exports.prototype = {
  name: 'disallowSpecificAttributes',

  schema: {
    type: ['null', 'string', 'array'],
    items: {
      type: ['object', 'string'],
      additionalProperties: {
        type: ['string', 'array'],
        items: {
          type: 'string'
        }
      }
    }
  },

  configure(options) {
    assert(
      typeof options === 'string' || Array.isArray(options),
      this.name + ' option requires string or array value or should be removed'
    );

    this._disallowedAttributes = options;
  },

  lint(file, errors) {
    addErrorForDisallowedAttribute(this._disallowedAttributes);

    function addErrorForDisallowedAttribute(values, lineNumber, tag) {
      if (typeof values === 'string') {
        values = [values];
      }

      for (const value of values) {
        if (typeof value === 'object') {
          file.iterateTokensByFilter(
            function (token) {
              return (
                token.type === 'tag' &&
                utils.ownProperty(value, token.val) !== null
              );
            },
            function (token) {
              addErrorForDisallowedAttribute(
                utils.ownProperty(value, token.val),
                token.line,
                token.val
              );
            }
          );
        } else {
          file.iterateTokensByFilter(
            function (token) {
              return (
                token.type === 'attribute' &&
                (token.line === lineNumber || lineNumber === undefined)
              );
            },
            function (token) {
              const { name } = token;
              let errorMessage;

              if (name.toLowerCase() === value.toLowerCase()) {
                errorMessage = tag
                  ? 'Tag "' + tag + '" must not have attribute "' + name + '"'
                  : 'Attribute "' + name + '" must not be used';

                errors.add(errorMessage, token.line, token.col);
              }
            }
          );
        }
      }
    }
  }
};
