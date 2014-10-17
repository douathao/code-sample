/**
 * Performs a binary search on the host array. This method can either be
 * injected into Array.prototype or called with a specified scope like this:
 * binaryIndexOf.call(someArray, searchElement);
 *
 * @param {*} searchElement The item to search for within the array.
 * @return {Number} The index of the element which defaults to -1 when not found.
 */
function binaryIndexOf(searchElement) {
  'use strict';

  var minIndex = 0,
      maxIndex = this.length - 1,
      currentIndex,
      currentElement,
      resultIndex;

  while (minIndex <= maxIndex) {
    resultIndex = currentIndex = (minIndex + maxIndex) / 2 | 0;
    currentElement = this[currentIndex];

    if (currentElement < searchElement) {
      minIndex = currentIndex + 1;
    } else if (currentElement > searchElement) {
      maxIndex = currentIndex - 1;
    } else {
      return currentIndex;
    }
  }

  return ~maxIndex;
}

Array.prototype.binaryIndexOf = binaryIndexOf;

// have to be sorted
var arr = [0, 1, 2, 3, 4, 5, 6, 6.5, 7, 8, 9];

// insert 3 to the array
arr.splice(Math.abs(arr.binaryIndexOf(3)), 0, 3);

// -> "[0,1,2,3,4,5,6,6.5,7,8,9]"
JSON.stringify(arr);