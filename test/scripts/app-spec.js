define(function(require) {
  var app = require('app');
  var $ = require('jquery');

  describe('app', function() {
    it('should prepend view', function() {
      sinon.stub($.fn, 'prepend');
      app();
      expect($.fn.prepend).to.be.calledOnce;
    });
  });
});