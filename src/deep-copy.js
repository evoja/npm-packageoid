// Got it here: https://github.com/simov/deep-copy
//////////////////////////////////////////////////
// Copyright (c) 2013-2015 Simeon Velichkov <simeonvelichkov@gmail.com>
//////////////////////////////////////////////////
'use strict'



;(function (name, root, factory) {
  if (typeof exports == 'object') {
    module.exports = factory()
  } else if (typeof define == 'function' && define.amd) {
    define(factory)
  } else {
    root[name] = factory()
  }
}('dcopy', this, function () {
  var api = {}

  /**
   * Deep copy any object or array
   *
   * @param {Object/Array} target
   * @return {Object/Array} copy
   * @api public
   */

  api.dcopy = function (target) {
    var copy = (target instanceof Array) ? [] : {}
    ;(function read (target, copy) {
      for (var key in target) {
        var obj = target[key]
        if (obj instanceof Array) {
          var value = []
            , last = add(copy, key, value)
          read(obj, last)
        }
        else if (obj instanceof Object && typeof obj !== 'function') {
          var value = {}
            , last = add(copy, key, value)
          read(obj, last)
        }
        else {
          var value = obj
          add(copy, key, value)
        }
      }
    }(target, copy))
    return copy
  }

  /**
   * Adds a value to the copy object based on its type
   *
   * @api private
   */

  function add (copy, key, value) {
    if (copy instanceof Array) {
      copy.push(value)
      return copy[copy.length-1]
    }
    else if (copy instanceof Object) {
      copy[key] = value
      return copy[key]
    }
  }

  return api.dcopy
}))
