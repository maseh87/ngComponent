describe('ngComponent', function(){
  var ngComponentProvider,
      mockModule,
      defaults,
      testDirectiveObject;

  beforeEach(function() {
    mockModule = angular.module('fake', function() {});

    mockModule.config(function(ComponentProvider) {
      ngComponentProvider = ComponentProvider;
      testDirectiveObject = ComponentProvider.$get();
      testDirectiveObject = new testDirectiveObject();
    });

    module('ngComponent', 'fake');

    inject(function(){});
  });

  describe('Defaults', function() {
    it('should have a function to override the defaults', function() {
      expect(ngComponentProvider.setDefaults).to.be.a('function');

      defaults = ngComponentProvider.setDefaults();
    });

    it('should have a defaults object', function() {
      expect(defaults).to.be.a('object');
    });
    it('should have a transclude property equal to false', function() {
      expect(defaults.transclude).to.be.false;
    });
    it('should have a restrict property equal to EA', function() {
      expect(defaults.restrict).to.equal('EA');
    });
    it('should have a replace property equal to false', function() {
      expect(defaults.replace).to.be.false;
    });
    it('should have a scope property equal to false', function() {
      expect(defaults.scope).to.be.false;
    });
    it('should have a default template', function() {
      expect(defaults.template).to.be.a('string');
    });
  });
  describe('Directive options', function() {
    it('should be an object', function() {
      expect(testDirectiveObject).to.be.an('object');
    });
  });
});
