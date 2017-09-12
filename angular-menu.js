// js
(function() {
  'use strict';

  if (typeof angular === 'undefined') return;
  // the provider MUST be a named function ($menuProvider)
  angular.module('ngMenu', []).provider('$menu', function $menuProvider() {
    var _proto = {};
    var _value = [];
    _proto.get = function(key) {
      for(var i=0; i < _value.length; i++) {
        if(key == _value[i].name)
          return(_value[key]);
      }
      return(undefined);
    };
    _proto.add = function(value) {
      // first check for any existing value with same name
      for(var i=0; i < _value.length; i++) {
        if(value.name == _value[i].name) {
          // update existing key
          _value[i] = value;
          return(i);
        }
      }
      // add a new key
      _value.push(value);
      return(_value.length);
    };
    _proto.delete = function(key) {
      for(var i=0; i < _value.length; i++) {
        if(key == _value[i].name) {
          _value.splice(i, 1);
        }
      }
    };
    _proto.list = function() {
      return(_value);
    };

    this.add = _proto.add;

    this.$get = function() {return(_proto)};
  });

})();
