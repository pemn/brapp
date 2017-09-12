// js

(function() {
  'use strict';
  if (typeof angular === 'undefined') return;
  angular.module('ngApiphp', ['ngResource']).service('apiphp', function($resource) {
    var _url = "/php-crud-api/api.php/:table/:id";
    var _paramDefaults = {transform: true, id: '@id'};
    /*
    default actions:
    {
      'get':    {method:'GET'},
      'save':   {method:'POST'},
      'query':  {method:'GET', isArray:true},
      'remove': {method:'DELETE'},
      'delete': {method:'DELETE'} 
    };
    */
    var _actions = {'put': {method:'PUT'}, 'post': {method:'POST', isArray:true}};

    return $resource(_url, _paramDefaults, _actions);
  });
})();
