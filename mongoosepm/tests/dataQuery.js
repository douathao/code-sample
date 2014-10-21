var User = require('../model/db');
/**
 *  Using Query Builder
 **/
var myQuery = User.find({'name': 'Simon Holmes'});
myQuery.where('age').gt(18);
myQuery.sort('-lastLogin');
myQuery.select('_id name email');
myQuery.exec(function(err, users) {
  if (!err) {
    console.log(users); // output array of users found
  }
});

// using chain
User.find({'name': 'Simon Holmes'})
  .where('age').gt(18)
  .sort('-lastLogin')
  .select('_id name email')
  .exec(function(err, users) {
    if (!err) {
      console.log(users); // output array of users found
    }
  });

// combination
var myQuery = User.find({'name': 'Simon Holmes'})
  .where('age').gt(18)
  .sort('-lastLogin')
  .select('_id name email');
// do some other operations
// and then...
myQuery.exec(function(err, users) {
  if (!err) {
    console.log(users); // output array of users found
  }
});

/**
 * Single query operation
 **/
Model.find(conditions, [fields], [options], [callback]);

User.find(
  {'name': 'Simon Holmes'}, // users called Simon Holmes
  function(err, users) {
    if (!err) {
      console.log(users);
    }
  });

User.find(
  {'name': 'Simon Holmes'}, // users called Simon Holmes
  'name email', // returning just the name and email fields
  function(err, users) {
    if (!err) {
      console.log(users);
    }
  });

User.find(
  {'name': 'Simon Holmes'}, // users called Simon Holmes
  null, // returning all fields in model
  {sort: {lastLogin: -1}}, // sorted by lastLogin descending
  function(err, users) {
    if (!err) {
      console.log(users);
    }
  });

/**
 * Static helper function - finding data
 */
Model.find(query);
Model.findOne(query);
Model.findById(ObjectID);