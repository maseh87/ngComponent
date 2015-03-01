# NgComponent [![Build Status](https://travis-ci.org/maseh87/ngComponent.svg?branch=master)](https://travis-ci.org/maseh87/ngComponent)

## An easier way to write angular directives

![angular directives](/images/newPic.png)

The easiest way to start using NgComponent is with bower
```sh
$ bower install --save ng-component
```

###How to use NgComponent
+ NgComponent uses a more "jQuery" approach to directives so it makes more sense. 

+ To start, inject the Component service into your directive and create a default directive definition object:
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
##Contributing
1. Fork it
2. Clone your fork
3. Create new branch
4. Make changes
5. Make a test and then check your test to verify it passes
6. Run ```gulp``` and the files will be linted, concatenated, and minified
7. Push to new branch on your forked repo
8. Pull request from your branch to ngComponent master

###Format for pull request
+ in your commit message; ```(type) message [issue # closed]```
  + ```(bug) killed that bug, closes #45```
+ Submit issues as you see them. Let's help everyone learn angular! ;)

###Testing
+ ngComponent uses Karma + Jasmine + Travis for unit and ci
+ Verify all the tests are passing
  + run ```gulp test``` to test in Chrome with karma
+ Features will not be accepted without specs created for them
+ Run ```gulp``` and all the source files will be watched and concatenated
+ Open the ```index.html``` and use the test app as a playground

