describe 'ngWidget', ->
  ngWidgetProvider = null
  mockModule = null
  defaults = null
  testDirectiveObject = null

  beforeEach ->
    mockModule = angular.module 'fake', ->

    mockModule.config (WidgetProvider) ->
      ngWidgetProvider = WidgetProvider

    module 'ngWidget', 'fake'
    inject ->

  describe 'Defaults', ->
    it 'should have function to override defaults', ->
      expect(ngWidgetProvider.setDefaults).to.be.a 'function'

      defaults = ngWidgetProvider.setDefaults()

    it 'shoud have a defaults object', ->
      expect(defaults).to.be.a 'object'

    it 'should have a transclude property equal to false', ->
      expect(defaults.transclude).to.equal false

    it 'should have a restrict property equal to EA', ->
      expect(defaults.restrict).to.equal 'EA'

    it 'should have a replace property equal to false', ->
      expect(defaults.replace).to.equal false

    it 'should have a scope property equal to false', ->
      expect(defaults.scope).to.equal false

    it 'should have a default template', ->
      expect(defaults.template).to.be.a 'string'

  # describe 'Scope Options', ->
  #   mockModule.directive 'mockDirective', (Widget)->
  #     testDirectiveObject = new Widget()
  #   it 'should be an object', ->
  #     expect(testDirectiveObject).to.be.an 'object'
