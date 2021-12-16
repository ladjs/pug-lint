module.exports = createTask;

const fs = require('fs');
const path = require('path');
const parseDocsFromRules = require('./parse-docs-from-rules');

function createTask(pliers) {
  pliers('buildJsonSchema', function (done) {
    const fullSchema = require('../schemas/_template-schema.json');
    const props = fullSchema.properties;
    const docs = parseDocsFromRules(pliers);

    for (const doc of docs) {
      const rule = require(doc.file).prototype;
      const schema = rule.schema || {};
      schema.description = doc.text.match(
        /\n\n(?:## .*?\n\n)?([\s\S]*?)\n(?:\n|$)/
      )[1];
      schema.documentation = doc.text;
      props[rule.name] = schema;
    }

    // eslint-disable-next-line node/prefer-promises/fs
    fs.writeFile(
      path.join(__dirname, '../schemas/pug-lintrc-schema.json'),
      JSON.stringify(fullSchema, null, '    '),
      'utf8',
      function (error) {
        if (error) {
          pliers.logger.error('Failed to build JSON schema');
          return done(error);
        }

        done();
      }
    );
  });
}
