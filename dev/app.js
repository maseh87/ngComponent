angular.module("app", ['ngComponent'])

.directive('demo', function(Component) {

  return new Component()
  .on('click', function(e, scope){
    scope.message = 'changed';
    console.log('yooooo')
  })
  .scopeOptions({
    'code': 'one-way'
  })
  .ready(function(){
    console.log('ready')
  })
  .start(function() {
    console.log('start');
  })
  .beforeReady(function(){
    console.log('beforeReady');
  })
  .children(true);
})

.directive('other', function(Component){
  var component =  new Component()
  .on('click', function(){
    console.log('im other');
  })
  .ready(function(event, scope){
    scope.thing = 'thing';
  })
  .setTemplate('<h1>{{ thing }}</h1>')
  .scopeOptions({});

  return component;
});
