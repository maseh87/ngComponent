
angular.module('ngComponent', [])

.provider('Component', function() {
  // have to make this local, not global
  // all directives will use this one object them
  // or clear it when they make a new one
  // var cache = {
  //   domEvents: {}
  // }; //events

  var globe = {};

  var getDefaults = function() {
    var cache = {
      domEvents: {}
    };
    var that = this;

    var defaults = {
      template: '<div>Default ngComponent template, go change it</div>',
      compile: function() {
        if (cache.start) {
          cache.start.apply(this, arguments);
        }

        return {
          pre: function() {
            if (cache.beforeReadyFn) {
              cache.beforeReadyFn.apply(that, arguments);
            }
          },

          post: function(scope, element) {

            var args = arguments;
            angular.forEach(cache.domEvents, function(cb, event) {

              element.on(event, function() {
                scope.$apply(function(e) {
                  var locals = [].slice.call(args);
                  locals.unshift(e);

                  cb.apply(that, locals);

                });
              });
            });


            scope.$on('$destroy', function() {
              angular.forEach(cache.domEvents, function(cb, event) {
                element.off(event, cb);
              });
            });

            if (cache.readyFn) {
              cache.readyFn.apply(that, args);
            }

            if (cache._template) {
              element.html(cache._template);
              globe.$compile(element.contents())(scope);
            }
          }
        };
      },

      transclude: false,
      restrict: 'EA',
      replace: false,
      scope: false
    };

    return {
      defaults: angular.copy(defaults),
      cache: cache
    };
  };

  function Component(config) {

    var data = getDefaults.call(this);
    this._cache = data.cache;
    angular.extend(this, data.defaults, config || {});

  }

  Component.prototype.children = function (option) {
    if (option === true) {
      this.transclude = true;
    }

    return this;
  };

  Component.prototype.setTemplate = function(template) {
    this._cache._template = template;
    return this;
  };

  Component.prototype.setTemplateUrl = function(url) {
    this._cache._templateUrl = url;
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
    this._cache.readyFn = cb || function(){};
    return this;
  };

  Component.prototype.on = function(event, cb) {
    this._cache.domEvents[event] = cb;
    return this;
  };

  Component.prototype.beforeReady = function(cb) {
    this._cache.beforeReadyFn = cb || function(){};
    return this;
  };

  Component.prototype.start = function(cb) {
    this._cache.start = cb || function(){};
    return this;
  };

  return {
    $get: ["$compile", function ($compile) {
      globe.$compile = $compile;
      return Component;
    }],

    setDefaults: function(config) {
      return angular.extend(getDefaults().defaults, config);
    }
  };

});
