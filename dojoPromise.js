/**
 * example to show returning promises within a promise callback
 */
require([
  'dojo/Deferred'
], function(Deferred) {
  var def = new Deferred();
  var def2 = new Deferred();

  def.promise.then(function(value) {
    return def2.promise.then(function(someOtherValue) {
      return someOtherValue + 100;
    });
  }).then(function(newValue) {
    // will have to wait until def2 is resolve
    console.log(newValue);
  });

  def.resolve(4);

  setTimeout(function() {
    def2.resolve(20);
  }, 1000);
});