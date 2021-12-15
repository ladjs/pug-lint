// # disallowDuplicateAttributes: `true`
//
// Attribute blocks must not contain any duplicates.
// And if an ID literal is present an ID attribute must not be used. Ignores class attributes.
//
// ```pug
// //- Invalid
// div(a='a' a='b')
// #id(id='id')
//
// //- Valid
// div(class='a', class='b')
// .class(class='class')
// ```

const utils = require('../utils');

module.exports = function () {};

module.exports.prototype = {
  name: 'disallowDuplicateAttributes',

  schema: {
    enum: [null, true]
  },

  configure(options) {
    utils.validateTrueOptions(this.name, options);
  },

  lint(file, errors) {
    file.iterateTokensByType('start-attributes', function (token) {
      const attributeNames = [];
      const attributesStart = token;
      const attributesStartIndex = attributesStart._index;
      const attributesEnd = file.getNextTokenByType(token, 'end-attributes');
      const attributesEndIndex = attributesEnd._index;
      const attributesLineTokens = file.getTokensByFilter(function (token) {
        return token.line === attributesStart.line;
      });
      const boundaryStart =
        file.getPreviousTokenByType(token, utils.htmlTagBoundaryTypes) ||
        attributesLineTokens[0];
      const boundaryStartIndex = boundaryStart._index;
      const boundaryEnd = file.getNextTokenByType(
        token,
        utils.htmlTagBoundaryTypes
      );
      const boundaryEndIndex = boundaryEnd._index;

      file.iterateTokensByFilter(
        function (token) {
          return (
            token.type === 'attribute' &&
            token._index > attributesStartIndex &&
            token._index < attributesEndIndex
          );
        },
        function (token) {
          const name = token.name.toLowerCase();

          if (name !== 'class') {
            if (attributeNames.includes(name)) {
              errors.add(
                'Duplicate attribute "' + name + '" is not allowed',
                token.line,
                token.col
              );
            } else {
              attributeNames.push(name);
            }
          }
        }
      );

      file.iterateTokensByFilter(
        function (token) {
          return (
            token.type === 'id' &&
            token._index >= boundaryStartIndex &&
            token._index <= boundaryEndIndex
          );
        },
        function (token) {
          if (attributeNames.includes('id')) {
            errors.add(
              'Duplicate attribute "id" is not allowed',
              token.line,
              token.col
            );
          }
        }
      );
    });
  }
};
