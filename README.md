# NgComponent

## An easier way to write angular directives

![angular directives](/images/newPic.png)

The easiest way to start using NgComponent is with bower
```sh
$ bower install --save ng-component
```

###How to use NgComponent
NgComponent uses a more "jQuery" approach to directives so it makes more sense. 

To start, inject the Component service into your directive and create a default directive definition object:
```sh
var app = angular.module('myApp', [
  'ngComponent'
])
.directive('myNewDirective', function(){
  var component = new Component();
  return component;
});
```
######The component object gives you access to methods to control your  directives functionality.  

#Methods to utilize

###.ready (formally the link function)
Call ready to gain access to your directives scope, jQuery wrapped element and the attributes on the directive:
```
var app = angular.module('myApp', [
  'ngComponent'
])
.directive('myNewDirective', function(){
  var component = new Component()
  .ready(function(scope, element, attributes){
    
  });
  
  return component;
});
```
###.setTemplate (formally template)
To give your directive a template use the setTemplate method:
```
.directive('myNewDirective', function(){
  var component = new Component()
  .on('click', function(event){
    console.log('I clicked!');
  })
  .setTemplate('<div><h1>the message: {{ message }}</h1></div>');
  
  return component;
});
```
###.scopeOptions (formally scope)
To configure the scope of your object use the scopeOptions method:
```
.directive('myNewDirective', function(){
  var component = new Component()
  .ready(function(scope, element, attributes){
    
  });
  
  return component;
});
```
###.beforeReady (formally pre-link)
The beforeReady method lets you configure your directive before the ready function is invoked but after the start function runs:
```
.directive('myNewDirective', function(){
  var component = new Component()
  .beforeReady(function(scope, element, attributes){
    //this method will execute before the ready method
  });
  
  return component;
});
```

###.start (formally compile)
The before ready method give you access to the raw directive before it is compiled and given its scope:
```
.directive('myNewDirective', function(){
  var component = new Component()
  .start(function(element, attributes){
    //This method will execute first
    //your directive will not have it's own scope when this function 
    //is executed.
  });
  
  return component;
});
```
###.on
Register event listeners for your directive by using the on function:
```
.directive('myNewDirective', function(){
  var component = new Component()
  .on('click', function(event){
    console.log('I clicked!');
  });
  
  return component;
});
```

