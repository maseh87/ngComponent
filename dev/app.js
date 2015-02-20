angular.module("app", ['ngComponent'])

.directive('demo', function(Component) {

  var component = new Component();

  component.on('click', function(e, scope){
    scope.message = 'changed';
  });

  component.scopeOptions({
    'code': 'one-way'
  });

  component.ready(function(){
    console.log('ready')
  });

  component.start(function() {
    console.log('start');
  });

  component.beforeReady(function(){
    console.log('beforeReady');
  });

  return component;
});
