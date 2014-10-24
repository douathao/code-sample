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
    },
    addAfterDelay: function ( /* delay, callBack */) {
      var _this = this;
      var timeDelay = [].shift.call(arguments);
      var callBack = [].shift.call(arguments);
      var input = arguments;

      window.setTimeout(function () {
        callBack(_this.add.apply(this, input));
      }, timeDelay);
    }
  };

  return Number;
});