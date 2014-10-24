/* globals describe, define, it, expect, beforeEach, xit, pending, xdescribe, spyOn */
define([
  'Numbers',
  'events',
  'lib/matchers'
], function(
  Numbers,
  events,
  matchers
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

        // add custom matcher
        jasmine.addMatchers(matchers);
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
        // spyOn will not run through the function unless:
        // spyOn(events, 'publish').and.callThrough();
        // test this by adding alert('test') inside the publish function
        // * you make all the test above pending to play around with this.
        spyOn(events, 'publish');

        // spy can return value
        // spyOn(events, 'publish').and.returnValue(false);

        // spy can call a fake function instead of the original event
        // spyOn(events, 'publish').and.callFake(function () { // do something });

        // spy can throw error
        // spyOn(events, 'publish').and.throwError('error');
          // expect(function () {
          //   Numbers.add(this.numberInput1, this.numberInput2);
          // }).toThrowError('error');

        // spy call the actually function
        // spyOn(events, ...
        // events.publish.and.stub();

        // all spyOn have a calls property
        // the event should not be call yet
        expect(events.publish.calls.any()).toBe(false);

        // jasmine have global variable for any
        // jasmine.any(String)
        // jasmine.any(Object)
        // can be use with expect..toEqual([jasmine.any(String), jasmine.any(Object)]);

        Numbers.add(this.numberInput1, this.numberInput2);

        expect(events.publish).toHaveBeenCalled();
        expect(events.publish).toHaveBeenCalledWith(
          'added',
          { args: [this.numberInput1, this.numberInput2], result: 3}
        );

        // spy can get arguments call of the function
        // the params is the order of the call
        // expect(events.publish.calls.argsFor(1)).toEqual();
        //
        // get the most recent call
        // expect(events.publish.calls.mostRecent().args).toEqual();
        //
        // get all the arguments call
        // events.publish.calls.allArgs()
        //
        // get all the call
        // events.publish.calls.all()
        //
        // reset the spy calls
        // events.publish.reset();

        // the event should be call
        // expect(events.publish.calls.any()).toBe(true);
        expect(events.publish.calls.count()).toBe(1);

        // spy will keep tracking the number of time the function is call
        // you can run Numbers.add.. again and the count will be 2
      });

      it('should return numbers that are either odd or event', function () {
        output = Numbers.add(this.numberInput1, this.numberInput2);

        expect(output).toBeOdd();

        output = Numbers.add(this.numberInput1, this.numberInput1);

        expect(output).not.toBeOdd();
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