const assert = require('assert');
const sinon = require('sinon');
const reporter = require('../../lib/reporters/console');

module.exports = createTest;

function createTest(linter) {
  describe('console', function () {
    beforeEach(function () {
      sinon.stub(console, 'error');
    });

    afterEach(function () {
      console.error.restore();
    });

    it('should report no errors for valid string', function () {
      reporter(linter.checkString('span Text'));

      assert.equal(console.error.called, false);
    });

    it('should report errors for valid string', function () {
      reporter(linter.checkString('div: span Text'));

      assert.equal(
        console.error
          .getCall(0)
          .args[0].includes('Block expansion operators must not be used'),
        true,
        console.error.getCall(0).args[0]
      );
      assert.equal(console.error.called, true);
    });

    it('should report multiple errors for valid string', function () {
      reporter(linter.checkString('div: span Text\r\r\r\ndiv: span Text'));

      assert.equal(
        console.error
          .getCall(0)
          .args[0].includes('Block expansion operators must not be used'),
        true,
        console.error.getCall(0).args[0]
      );
      assert.equal(console.error.called, true);
    });
  });
}
