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
    describe('compile defaults method', function() {
      it('should have a compile property', function() {
        expect(defaults.compile).to.be.a('function');
      });
      it('should return an object', function() {
        expect(defaults.compile()).to.be.an('object');
      });
      describe('pre and post link', function() {
        it('should have a prelink method', function() {
          var obj = defaults.compile();
          expect(obj.pre).to.be.a('function');
        });
        it('should have a postlink method', function() {
          var obj = defaults.compile();
          expect(obj.post).to.be.a('function');
        });
      });
    });
  });
  
  describe('Directive options', function() {
    it('should be an object', function() {
      expect(testDirectiveObject).to.be.an('object');
    });
    
    describe('ready method', function() {
      it('should have a ready method', function() {
        expect(testDirectiveObject.ready).to.be.a('function');
      });
      it('should take return an object', function() {
        var obj = testDirectiveObject.ready(function() {
          console.log('yo');
        });
        expect(obj).to.be.an('object');
      });
    });
    
    describe('on method', function() {
      it('should have an on method', function() {
        expect(testDirectiveObject.on).to.be.a('function');
      });
      it('should return an object', function() {
        expect(testDirectiveObject.on('click', function(){})).to.be.an('object');
      });
    });
    describe('start', function() {
      it('should have a start method', function() {
        expect(testDirectiveObject.start).to.be.a('function');
      });
      it('should return an object', function() {
        expect(testDirectiveObject.start(function(){})).to.be.an('object');
      });
      it('should set a default callback', function() {
        var obj = testDirectiveObject.start();
        expect(testDirectiveObject._cache.start).to.be.a('function');
      });
    });

    describe('scope options', function() {
      it('should have a scope options method', function() {
        expect(testDirectiveObject.scopeOptions).to.be.a('function');
      });
      it('should return an object', function() {
        expect(testDirectiveObject.scopeOptions('parent')).to.be.an('object');
      });
      it('should take 3 different arguments', function() {
        expect(testDirectiveObject.scopeOptions('parent')).to.be.an('object');
        expect(testDirectiveObject.scopeOptions('child')).to.be.an('object');
        // expect(testDirectiveObject.scopeOptions({})).to.be.an('object');
      });
    });
    
    describe('parent', function() {
      it('should have a parent method', function() {
        expect(testDirectiveObject.parent).to.be.an('function');
      });
      it('should return an object', function() {
        expect(testDirectiveObject.parent('parent')).to.be.an('object');
      });
    });
     
     describe('set template', function() {
      it('should have a set template method', function() {
        expect(testDirectiveObject.setTemplate).to.be.an('function');
      });
      it('should return an object', function() {
        expect(testDirectiveObject.setTemplate('parent')).to.be.an('object');
      });
    });

    describe('children', function() {
      it('should have a children method', function() {
        expect(testDirectiveObject.children).to.be.an('function');
      });
      it('should return an object', function() {
        expect(testDirectiveObject.children()).to.be.an('object');
      });
      it('should set translude to true', function() {
        var obj = testDirectiveObject.children(true);
        expect(obj.transclude).to.eql(true);
      });
    });

    describe('beforeReady', function() {
      it('should have a beforeReady method', function() {
        expect(testDirectiveObject.beforeReady).to.be.a('function');
      });
      it('should return an object', function() {
        expect(testDirectiveObject.beforeReady()).to.be.an('object');
      });
    });
  });
});
