/* globals describe, define, it, expect */
define([
  'Numbers'
], function(
  Numbers
) {
  'use strict';
  // Test suite
  describe('The Number class', function () {
    // nested suite
    describe('The add function', function () {
      it('should add one or more arguments and return the sum of them', function () {
        // arrange
        var input1 = 1;
        var input2 = 2;

        // act
        var output = Numbers.add(input1, input2);

        // assert
        expect(output).toEqual(3);
      });

      it('should try to parse an interger when a string is passed to the function', function () {
        var input1 = 1;
        var input2 = '2';

        var output = Numbers.add(input1, input2);

        expect(output).toEqual(3);
      });
    });
  });
});