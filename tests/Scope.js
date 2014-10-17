define([
	'intern!bdd',
	'intern/chai!',
	'intern/chai!expect',
	'app/Scope',
	'intern/order!node_modules/sinon/lib/sinon',
	'intern/order!node_modules/sinon-chai/lib/sinon-chai'
], function (
	bdd,
	chai,
	expect,
	Scope,
	sinon,
	sinonChai
	) {
	chai.use(sinonChai);
	var describe = bdd.describe,
		it = bdd.it,
		before = bdd.before;

	describe('Scope', function () {
		it('can be constructed and used as an object', function () {
			var scope = new Scope();
			scope.aProperty = 1;
			expect(scope.aProperty).to.be.equal(1);
		});

		describe('digest', function () {
			var scope;

			before(function() {
				scope = new Scope();
			});

			it('calls the listener function of a watch on first $digest', function () {
				var watchFn = function () {
					return 'wat';
				};
				var listenerFn = sinon.spy();

				scope.$watch(watchFn, listenerFn);
				scope.$digest();

				expect(listenerFn).to.have.been.calledOnce;
			});

			it('calls the watch function with the scope as the argument', function () {
				var watchFn = sinon.spy();
				var listenerFn = function () { };

				scope.$watch(watchFn, listenerFn);
				scope.$digest();

				expect(watchFn).to.have.been.calledWith(scope);
			});

			it('calls the listener function when the watched value changes', function () {
				scope.someValue = 'a';
				scope.counter = 0;
				scope.$watch(function (scope) {
						return scope.someValue;
					},
					function (newValue, oldValue, scope) {
						scope.counter++;
					});

				expect(scope.counter).to.be.equal(0);

				scope.$digest();
				expect(scope.counter).to.be.equal(1);

				scope.$digest();
				expect(scope.counter).to.be.equal(1);

				scope.someValue = 'b';
				expect(scope.counter).to.be.equal(1);

				scope.$digest();
				expect(scope.counter).to.be.equal(2);
			});

			it('calls listener when watch value is first undefined', function () {
				scope.counter = 0;
				scope.$watch(
					function (scope) {
						return scope.someValue;
					},
					function (newValue, oldValue, scope) {
						scope.counter++;
					}
				);

				scope.$digest();
				expect(scope.counter).to.be.equal(1);
			});

			it('calls listener with new value as old value the first time', function() {
				scope.someValue = 123;
				var oldValueGiven;

				scope.$watch(
					function (scope) {
						return scope.someValue;
					},
					function (newValue, oldValue /*, scope*/) {
						oldValueGiven = oldValue;
					}
				);

				scope.$digest();
				expect(oldValueGiven).to.be.equal(123);
			});

			it('may have watchers that omit the listener function', function() {
				var watchFn = sinon.spy();

				scope.$watch(watchFn);
				scope.$digest();

				expect(watchFn).to.have.been.called;
			});

			it('triggers chained watchers in the same digest', function() {
				scope.name = 'Jane';

				scope.$watch(
					function (scope) {
						return scope.nameUpper;
					},
					function (newValue, oldValue, scope) {
						if (newValue) {
							scope.initial = newValue.substring(0, 1) + '.';
						}
					}
				);

				scope.$watch(
					function (scope) {
						return scope.name;
					},
					function (newValue, oldValue, scope) {
						if (newValue) {
							scope.nameUpper = newValue.toUpperCase();
						}
					}
				);

				scope.$digest();
				expect(scope.initial).to.be.equal('J.');

				scope.name = 'Bob';
				scope.$digest();

				expect(scope.initial).to.be.equal('B.');
			});
		});
	});
});