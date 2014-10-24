/* global define */
define(function () {
  'use strict';
  var Number = {
    add: function () {
      var input = [].slice.call(arguments);
      var sum = 0;

      input.forEach(function (value) {
        sum += value;
      });

      return sum;
    }
  };

  return Number;
});