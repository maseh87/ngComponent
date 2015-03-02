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
  .ready(function(scope, element, attrs){
    // console.log('ready')
    scope.message = 'Default';
    console.log(attrs, 'attrs');
  })
  .start(function() {
    // console.log('start');
  })
  .beforeReady(function(){
    // console.log('beforeReady');
  })
  .setTemplate('<div><h1>the message: {{ message }}</h1></div>');
})

.directive('other', function(Component){
  var count = 0;
  var component =  new Component()
  .on('click', function(event, scope){
    
    scope.thing = count++;
  })
  .ready(function(event, scope){
    scope.thing = 'thing';
  })
  .start(function(){

  })
  .setTemplate('<h1>count{{ thing }}</h1>')
  .scopeOptions({});

  return component;
});
