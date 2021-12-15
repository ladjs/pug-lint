const assert = require('assert');

const bin = require.resolve('../bin/pug-lint');
const fs = require('fs');
const path = require('path');
const spawn = require('child_process').spawn;

const fixturesPath = path.join(__dirname, 'fixtures/');
const fixturesRelativePath = './test/fixtures/';
const packageDetails = require('../package.json');

describe('cli', function () {
  function run(args, cb) {
    const command = [bin].concat(args);
    let stdout = '';
    let stderr = '';
    const node = process.execPath;
    const child = spawn(node, command);

    if (child.stderr) {
      child.stderr.on('data', function (chunk) {
        stderr += chunk;
      });
    }

    if (child.stdout) {
      child.stdout.on('data', function (chunk) {
        stdout += chunk;
      });
    }

    child.on('error', cb);

    child.on('close', function (code) {
      cb(null, code, stdout, stderr);
    });

    return child;
  }

  it('should output the current version number', function (done) {
    const args = ['-V'];

    run(args, function (err, code, stdout, stderr) {
      assert(!err, err);
      assert.equal(code, 0, code);
      assert.equal(stderr, '', stderr);
      assert.equal(stdout.includes(packageDetails.version), true, stdout);
      done();
    });
  });

  it('should output help', function (done) {
    const args = ['-h'];
    const message = 'Usage: pug-lint [options] <file ...>';

    run(args, function (err, code, stdout, stderr) {
      assert(!err, err);
      assert.equal(code, 0, code);
      assert.equal(stderr, '', stderr);
      assert.equal(stdout.includes(message), true, stdout);
      assert.equal(stdout.includes(packageDetails.description), true, stdout);
      done();
    });
  });

  it('should output help if no file specified', function (done) {
    const args = [];
    const message = 'Usage: pug-lint [options] <file ...>';

    run(args, function (err, code, stdout, stderr) {
      assert(!err, err);
      assert.equal(code, 0, code);
      assert.equal(stderr, '', stderr);
      assert.equal(stdout.includes(message), true, stdout);
      assert.equal(stdout.includes(packageDetails.description), true, stdout);
      done();
    });
  });

  it('should report errors for file path', function (done) {
    const args = [fixturesRelativePath + 'invalid.pug'];
    const expectedReport = fs.readFileSync(
      fixturesPath + 'reporters/expected-invalid.txt',
      'utf-8'
    );

    run(args, function (err, code, stdout, stderr) {
      assert(!err, err);
      assert.equal(code, 2, code);
      assert.equal(stdout, '', stdout);
      assert.equal(
        stderr.trim(),
        expectedReport.replace(/%dirname%/g, fixturesRelativePath).trim(),
        stderr
      );
      done();
    });
  });

  it('should report errors for directory path', function (done) {
    const dirname = fixturesRelativePath + 'rules/';
    const args = [dirname];
    const expectedReport = fs.readFileSync(
      fixturesPath + 'reporters/expected-invalid.txt',
      'utf-8'
    );

    run(args, function (err, code, stdout, stderr) {
      assert(!err, err);
      assert.equal(code, 2, code);
      assert.equal(stdout, '', stdout);
      assert.equal(
        stderr.trim(),
        expectedReport.replace(/%dirname%/g, dirname).trim(),
        stderr
      );
      done();
    });
  });

  it('should use config when it is supplied', function (done) {
    const dirname = fixturesRelativePath + 'rules/';
    const args = [
      '-c',
      fixturesPath + 'config-file/dotfile/.pug-lintrc',
      dirname + 'disallow-block-expansion.pug'
    ];
    const expectedReport = fs.readFileSync(
      fixturesPath + 'reporters/expected-disallow-block-expansion--console.txt',
      'utf-8'
    );

    run(args, function (err, code, stdout, stderr) {
      assert(!err, err);
      assert.equal(code, 2, code);
      assert.equal(stdout, '', stdout);
      assert.equal(
        stderr.trim(),
        expectedReport.replace(/%dirname%/g, dirname).trim(),
        stderr
      );
      done();
    });
  });

  it('should error on invalid reporter', function (done) {
    const args = ['-r', 'nonexistent', fixturesRelativePath];

    run(args, function (err, code, stdout, stderr) {
      assert(!err, err);
      assert.equal(code, 1, code);
      assert.equal(stdout, '', stdout);
      assert.equal(
        stderr.trim(),
        'Reporter "nonexistent" does not exist',
        stderr
      );
      done();
    });
  });

  it('should report errors using reporter', function (done) {
    const dirname = fixturesRelativePath + 'rules/';
    const args = [
      '-r',
      'inline',
      '-c',
      fixturesPath + 'config-file/dotfile/.pug-lintrc',
      dirname + 'disallow-block-expansion.pug'
    ];
    const expectedReport = fs.readFileSync(
      fixturesPath + 'reporters/expected-disallow-block-expansion--inline.txt',
      'utf-8'
    );

    run(args, function (err, code, stdout, stderr) {
      assert(!err, err);
      assert.equal(code, 2, code);
      assert.equal(stdout, '', stdout);
      assert.equal(
        stderr.trim(),
        expectedReport.replace(/%dirname%/g, dirname).trim(),
        stderr
      );
      done();
    });
  });
});
