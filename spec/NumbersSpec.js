/* globals describe, define, it, expect, beforeEach */
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
      var output;

      // run before each test
      beforeEach(function () {
        // arrange
        this.numberInput1 = 1;
        this.numberInput2 = 2;
        this.stringInput1 = '1';
      });

      // run after each test
      // afterEach...

      it('should add one or more arguments and return the sum of them', function () {
        // act
        output = Numbers.add(this.numberInput1, this.numberInput2);

        // assert
        expect(output).toEqual(3);
      });

      it('should try to parse an interger when a string is passed to the function', function () {
        output = Numbers.add(this.stringInput1, this.numberInput2);

        expect(output).toEqual(3);
      });
    });
  });
});