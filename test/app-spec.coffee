define (require) ->
  app = require('app')
  $ = require('jquery')

  describe 'app', ->
    beforeEach ->
      @sandbox = sinon.sandbox.create()

    afterEach ->
      @sandbox.restore()

    it 'should prepend view', ->
      @sandbox.stub($.fn, 'prepend')
      app()
      expect($.fn.prepend).to.be.calledOnce