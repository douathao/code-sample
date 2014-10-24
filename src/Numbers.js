/* global define */
define([
  'events'
], function (
  events
) {
  'use strict';
  var Number = {
    add: function () {
      var input = [].slice.call(arguments);
      var sum = 0;

      input.forEach(function (value) {
        if (typeof value === 'string') {
          value = value >> 0;
        }

        sum += value;
      });

      events.publish('added', {
        args: input,
        result: sum
      });

      return sum;
    }
  };

  return Number;
});