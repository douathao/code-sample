/* globals describe, define, it, expect, beforeEach, xit, pending, xdescribe, spyOn */
define([
  'Numbers',
  'events'
], function(
  Numbers,
  events
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
        this.stringInput2 = 'not a number';
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

      it('should ignore the argument if it is not a parseable string', function () {
        output = Numbers.add(this.numberInput1, this.stringInput2);

        expect(output).toEqual(1);
      });

      it('should publish an added event showing the arguments passed to the function and result', function () {
        spyOn(events, 'publish');

        Numbers.add(this.numberInput1, this.numberInput2);

        expect(events.publish).toHaveBeenCalled();
        expect(events.publish).toHaveBeenCalledWith(
          'added',
          { args: [this.numberInput1, this.numberInput2], result: 3}
        );
      });

      it('should be able to substract', function () {
        pending();
      });

      xit('should be able to multiply', function () {
        // is in pending mode because of xit
      });
    });

    // is in pending mode because of xdescribe
    xdescribe('should do something awsome', function () {
      it('should do nothing since describle is in pending mode', function () {

      });

      it('all test in describe will not be run since describe is in pending mode', function () {

      });
    });
  });
});