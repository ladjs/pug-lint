module.exports = createTask;

const fs = require('fs');
const path = require('path');
const parseDocsFromRules = require('./parse-docs-from-rules');

function createTask(pliers) {
  pliers('buildRuleDocs', function (done) {
    const docs = parseDocsFromRules(pliers);

    const concatenatedDocs = docs
      .map(function (doc) {
        return doc.text;
      })
      .join('\n');

    // eslint-disable-next-line node/prefer-promises/fs
    fs.writeFile(
      path.join(__dirname, '../docs/rules.md'),
      concatenatedDocs,
      'utf8',
      function (error) {
        if (error) {
          pliers.logger.error('Failed to build rule docs');
          return done(error);
        }

        done();
      }
    );
  });
}
