
angular.module('ngComponent', [])

.provider('Component', function() {
  // have to make this local, not global
  // all directives will use this one object them
  // or clear it when they make a new one
  var cache = {
    domEvents: {}
  }; //events

  var defaults = {
    template: '<div>Default ngComponent template, go change it</div>',
    compile: function() {
      if (cache.start) {
        cache.start(this, arguments);
      }
      return {
        pre: function() {
          if (cache.beforeReadyFn) {
            cache.beforeReadyFn.apply(this, arguments);
          }
        },

        post: function(scope, element) {
          var args = arguments;

          angular.forEach(cache.domEvents, function(cb, event) {

            element.on(event, function() {
              scope.$apply(function(e) {
                var locals = [].slice.call(args);
                locals.unshift(e);

                cb.apply(this, locals);

              }.bind(this));
            }.bind(this));
          }.bind(this));


          scope.$on('$destroy', function() {
            angular.forEach(cache.domEvents, function(cb, event) {
              element.off(event);
            });
          });

          if (cache.readyFn) {
            cache.readyFn.apply(this, args);
          }
        }
      };
    },

    transclude: false,
    restrict: 'EA',
    replace: false,
    scope: false
  };

  function Component(config) {
    console.log(cache);
    cache = {
      domEvents: {}
    };
    console.log(cache);
    angular.extend(this, defaults, config || {});
  }

  Component.prototype.children = function (option) {
    if (option === true) {
      this.transclude = true;
    }

    return this;
  };

  Component.prototype.setTemplate = function(template) {
    this.template = template;
    return this;
  };

  Component.prototype.scopeOptions = function (options) {
    if (options === 'parent') {
      this.scope = false;
    }

    if (options === 'child') {
      this.scope = true;
    }

    if (angular.isObject(options)) {
      this.scope = {};

      angular.forEach(options, function(type, attrName) {
        if (type === 'one-way' || type === 'attrValue') {
          this.scope[attrName] = '@';
        }

        if (type === 'two-way') {
          this.scope[attrName] = '=';
        }

        if (type === 'function') {
          this.scope[attrName] = '&';
        }
      }.bind(this));
    }

    return this;
  };

  //should return promise too
  Component.prototype.ready = function (cb) {
    cache.readyFn = cb || function(){};
    return this;
  };

  Component.prototype.on = function(event, cb) {
    cache.domEvents[event] = cb;
    return this;
  };

  Component.prototype.beforeReady = function(cb) {
    cache.beforeReadyFn = cb || function(){};
    return this;
  };

  Component.prototype.start = function(cb) {
    cache.start = cb || function(){};
    return this;
  };

  Component.prototype.parent = function(parent) {
    if (parent) {
      this.require = '^?'+ parent;
    }
    return this;
  };

  return {
    $get: function () {
      cache = {
        domEvents: {}
      }
      console.log('$get');
      return Component;
    },

    setDefaults: function(config) {
      return angular.extend(defaults, config);
    }
  };

});
