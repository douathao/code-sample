// Starts a new timer with an associated label.
console.time();
console.timeEnd()

// Displays an object-style listing of all the properties of the specified object.
console.dir();

// Prints an XML representation of the specified object, as seen in the Elements tab.
console.dirxml();

// Opens and selects the specified element or object in the appropriate panel: either the Elements panel for DOM elements and the Profiles panel for JavaScript heap objects
// @param: dom element
inspect(window.body);

// Returns the event listeners registered on the specified object.
// @param: dom element
getEventListeners(window.body);


// reference the element that is select in the inspect
$0;

// Returns reference to the first DOM element with the specified CSS selector.
$();

// Returns an array of elements that match the given CSS selector.
$$();

// Returns the value of the most recently evaluated expression
$_;

// Get the last 5 element (can only remember up to 5)
$0 - $4

// Returns an array of DOM elements that match the given XPath expression.
$x();

// Clears the console of its history.
clear();

// When one of the specified events occurs on the specified object, the Event object is logged to the console. You can specify a single event to monitor, an array of events, or one of the generic events "types" that are mapped to a predefined collection of events.
// use unmonitorEvents(object[, events]) to remove monitoring
monitorEvents(object[, events]);

// Turns on logging for all calls to a function.
monitor(fn);
unmonitor(fn);

// Returns an array containing the names of the properties belonging to the specified object.
// Returns an array containing the values of all properties belonging to the specified object.
keys();
values();


// Copies a string representation of the specified object to the clipboard.
copy();

// Use to group console output
// use  console.groupCollapsed() to start with collapsed
console.group('name');
console.groupEnd();

// Use to set a breakpoint
debugger;

// Use to to put a mark on the timeline tab
console.timeStamp('string');

// Prints a stack trace from the point where the method was called, including links to the specific lines in the JavaScript source.
console.trace();

// Includes a remote script.
include(url[, alias]) / include(alias);

// Adds a breakpoint on the first line of a function.
function fn() {

}
debug(fn);
undebug(fn);

// Starts a JavaScript CPU profiling session with an optional name. To complete the profile call profileEnd().
// Can be nested passing the same name to profileEnd(string)
profile([name]);

// Only in Opera
// jquery()
// load jquery to the page

// Only in FireFox ? (Firebug)
// By default, command line expressions are relative to the top-level window of the page. cd() allows you to use the window of a frame in the page instead.
cd(iframe domNode | top) // top to go back

// Use to view all of chrome inspector for worker
chrome://inspect

// assert
// If the value passed in the first argument is false, the function will log a message given as the second argument in the web console. If the expression is true, nothing is logged.
console.assert(document.querySelector('body'), "Missing 'body' element");

// console table
// This function displays the provided object or array as a table:
console.table(/* object or array */);