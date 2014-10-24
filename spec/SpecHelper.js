/* globals define, beforeEach, jasmine */
define([
], function(
  ) {
  'use strict';

  beforeEach(function() {
    jasmine.addMatchers({
      toBePlaying: function() {
        return {
          compare: function(actual, expected) {
            var player = actual;

            return {
              pass: player.currentlyPlayingSong === expected && player.isPlaying
            };
          }
        };
      }
    });
  });
});
