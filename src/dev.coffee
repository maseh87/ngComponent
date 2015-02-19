angular.module 'ngWidget', []

.provider 'Widget', ->

  events = {}
  readyFn = null
  # _scopeOptions = false
  returnScope = ->
    _scopeOptions

  # Default properties for the directive
  defaults =
    template: '<div>Default ngWidget template, go change it! {{ code }}</div>'
    link: (scope, elem, attrs)->

      # Iterate through an object of events and callbacks
      # passing each one into elem.on
      angular.forEach events, (value, key) =>
        elem.on key, (e) =>
          scope.$apply =>
            value.apply @, [e, scope, elem, attrs]

      # Listen for the $destroy event to clean up
      scope.$on '$destroy', ->
        #then iterate through the elements and call element.off on each event
        angular.forEach events, (value, key)->
          elem.off key

      # Call the readyFn is there is one
      if readyFn isnt null then readyFn.apply @, arguments

    transclude: false
    restrict: 'EA'
    replace: false
    scope: false

  class Widget
    # Extends @ with the defaults object
    constructor: ->
      angular.extend @, defaults

    # Alias for the transclude property
    children: (option)->
      @transclude = option if option is true

    # Configurations for the directive's scope
    scopeOptions: (option)->
      # scope: false === 'parent'
      @scope = false if option is 'parent'
      # scope: true === 'child'
      @scope = true if option is 'child'
      # scope: {} for isolate scope
      if angular.isObject option
        # Will have to iterate through object to convert the values
        @scope = {}
        angular.forEach option, (value, key) =>
          @scope[key] = '@' if value is 'attrValue' or value is 'one-way'
          @scope[key] = '=' if value is 'two-way'
          @scope[key] = '&' if value is 'function'

    # Alias for the link function
    ready: (callback)->
      readyFn = callback

    # store the users events in the events object to use in the link function
    on: (event, callback)->
      events[event] = callback

  # Object to return for the injector
  return directiveObject =
    $get: ->
      Widget
    # Option for the config block of the user to overwrite the defaults
    setDefaults: (config)->
      angular.extend defaults, config
