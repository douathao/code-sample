# Dojo
*Sample Dojo Code*

## Dojo Best Practices
### Dojo core
Asynchronous Module Definition (AMD)

Use Asynchronous Module Definition (AMD)
* Use define when creating a new AMD module
* Use require when simply loading AMD modules
* Avoid passing a module ID as the first argument to define. The AMD loader will determine the module ID based on the module's path.

```javascript
// correct
define([ /* dependencies */ ], function () {});
    
// incorrect
define('app/myModule', [ /* dependencies */ ], function () {});
```

* Use relative module IDs in a module's dependency list for dependencies within the same package (Note: relative module IDs do not work with require, only with define).

```javascript
define([
	// if this is a module in the 'app' package, the AMD loader
	// would resolve this relative MID to:
	// 'app/util/moduleInSamePackage'
	'./util/moduleInSamePackage'
], function (
	moduleInSamePackage
) {
	// module definition
});
```

* Group dependencies by package name for clarity
* Load NLS resources using the dojo/i18n! AMD plugin

### The DOM
* Use the dojo/domReady! AMD plugin to prevent code from executing before the DOM is ready.

```javascript
require([
	'dojo/dom-construct',
	'dojo/domReady!'
], function (
	domConstruct
) {
	// The DOM is ready
});
```

*  Use dojo/query for querying DOM nodes using CSS selectors

```javascript
// assume 'this.listNode' references a UL element
// Retrieve the LI elements contained in the UL
var items = query('li', this.listNode);
```

* Use dojo/on for adding DOM event listeners and using event delegation

```javascript
// assume 'this.cancelButton' references a BUTTON element
on(this.cancelButton, 'click', function (event) {
	/* … */
});

// Event delegation
// assume 'this.listNode' references a UL element
on(this.listNode, 'li:click', function (event) {
	// This handler will be called for 'click' events on all
	// LI elements in 'this.listNode'
	/* … */
});
```

* When using event delegation, include dojo/query in your dependency list along with dojo/on. If you don't need to use the query function directly, you can omit creating a reference to the dojo/query module in the factory function's parameter list.
* Use Dojo's dojo/dom-* modules to manipulate the DOM and avoid cross-browser issues
* Use dojo/dom-construct to create, add, remove, and destroy DOM nodes

```javascript
require([
	'dojo/dom-construct'
], function (
	domConstruct
) {
	var headerNode = domConstruct.create('h1', {
		innerHTML: 'A nice title'
	});

	domConstruct.place(headerNode, document.body);
});
```

* Set element properties directly rather than using dojo/dom-prop
* Use attribute-related DOM APIs (element.getAttribute, element.setAttribute) directly rather than dojo/dom-attr because dom-attr incorrectly conflates DOM attributes and properties
* Use dojo/dom-class to work with CSS classes on DOM nodes

```javascript
require([
	'dojo/dom-class'
], function (
	domClass
) {
	domClass.add(someNode, 'myClass');
	domClass.replace(someNode, 'newClass', 'oldClass');

	// In addition to simple toggling, 'toggle' can be used to
	// conditionally set a class. This is shorter than using 'if'
	domClass.toggle(someNode, 'someClass', booleanCondition);

	// Equivalent, but more code:
	if (booleanCondition) {
		domClass.add(someNode, 'someClass');
	} else {
		domClass.remove(someNode, 'someClass');
	}
});
```

* Use dojo/dom-geometry to get and set various dimensions of DOM nodes

```javascript
require([
	'dojo/dom-geometry'
], function (
	domGeom
) {
	var position = domGeom.position(someNode);
	// position will have x, y, w, and h properties
});
```

### Feature detection
Use dojo/has to test for features before using features that are not supported by all target environments
* Use dojo/has for feature detection rather than dojo/sniff to sniff the browser version. Only use dojo/sniff to work around browser bugs that cannot be otherwise detected.
* Add custom feature tests using dojo/has.add and, in general, pass a function to has.add so the feature test only run if it is needed.

```javascript
require([
	'dojo/has'
], function (
	has
) {
	has.add('a-custom-feature', function (global, document, anElement) {
		// perform test and return boolean result
	});
});
```

* Use has('config-isDebug') to conditionally execute debug-only code

### Asynchronous programming 
Use promises rather than callbacks when creating asynchronous APIs.

* When creating a Deferred for an async method, return the Deferred's promise property rather than the Deferred itself. The promise property is the consumer-oriented Promise interface of a Deferred. If a Deferred is returned directly, those receiving it can resolve or reject the promise themselves, which is undesirable.

```javascript
require([
	'dojo/Deferred'
], function (
	Deferred
) {
	function myAsyncFunction () {
		var dfd = new Deferred();

		// Perform some async process
		setTimeout(function () {
			dfd.resolve();
		}, 5000);

		return dfd.promise;
	}
});
```

* Use the dojo/when module to deal uniformly with code that may return either a value or a promise

```javascript
require([
	'dojo/request',
	'dojo/when'
], function (
	request,
	when
) {
	var syncValue = 5;
	var promise = request('someUrl');

	when(syncValue).then(function (someValue) {
		// code will run immediately since 'syncValue' is already
		// available
		/* … */
	});

	when(promise).then(function (someValue) {
		// code will run when 'promise' is resolved
		/* … */
	});
});
```

* Use dojo/promise/all to create a single promise from a list or hash of promises. The promise will not resolve until all consolidated promises resolve and will resolve to a list or hash of their resolved values.

```javascript
require([
	'dojo/request',
	'dojo/promise/all'
], function (
	request,
	whenAll
) {
	var requests = [];

	requests.push(request('someUrl'));
	requests.push(request('anotherUrl'));

	whenAll(requests).then(function (results) {
		// code will run after all promises in 'requests' array
		// have been resolved
		// 'results' will be an array with the values resolved
		// from each promise
		/* … */
	})
});
```

### HTTP requests
Use dojo/request for HTTP requests

* If you need to perform special request handling in some cases, use dojo/request/registry. This module allows you to set up special handlers depending on the request URL or options.
* Do not load dojo/request/xhr except in special cases. Using the dojo/request module is more portable as it will load the appropriate default provider for the platform, and works well with dojo/request/registry.
* Use dojo/request/script for JSONP
* dojo/request/iframe can be useful in some cross-domain situations

### Working with objects

* Use dojo/_base/lang.hitch to create a function bound to a particular context

```javascript
require([
	'dojo/request',
	'dojo/_base/lang'
], function (
	request,
	lang
) {
	// Without lang.hitch
	var example = {
		resource: null,
		retrieve: function () {
			var self = this;
			request('aResource').then(function (results) {
				// 'this', the context' references the global object
				// 'self' references 'example'
				self.resource = results;
			});
		}
	};

	// With lang.hitch
	example = {
		resource: null,
		retrieve: function () {
			request('aResource').then(lang.hitch(this, function (results) {
				// 'this', the context, references 'example'
				this.resource = results;
			}));
		}
	};
});
```

* Use dojo/_base/lang.mixin to mix the properties of one object into another
* Use dojo/_base/lang.delegate to create an object that delegates to the specified object for properties it does not have a value for. This is useful to create an augmented version of an object without modifying the original.

```javascript
require([
	'dojo/_base/lang'
], function (
	lang
) {
	var original = { x: 3 },
	var delegatingObject = lang.delegate(original, { y: 7 });

	original.x === 3;
	delegatingObject.y === 7;
	delegatingObject.x === 3;		// 'x' property is delegated to 'original'
});
```

* Use dojo/aspect to add AOP-style advice to methods. Aspect-oriented programming (AOP) is a technique for isolating cross-cutting concerns such as logging or security which would not be neatly encapsulated but rather scattered across an object's methods. Advice can be added before, after, or around an existing method.

```javascript
// Advice before a 'performOperation' method
aspect(object, 'performOperation', function () {
	logger.debug('performOperation called', arguments);
});

// Now, 'logger.debug' is called before the actual implementation of 'performOperation'
object.performOperation();
```

* When working with a dojo/Stateful object, always call the object's set method to set properties rather than setting them directly. This ensures any watchers of a property are notified of the changes.

### Classical Object-oriented inheritance
Use dojo/_base/declare to create modules that behave according to classical OO-based inheritence

* Do not pass a name string to declare. It is deprecated, creates a global variable, and ties the module code to the name of the file.

```javascript
require([
	'dojo/_base/declare'
], function (
	declare
) {
	// Correct - the module id will be determined by the filepath
	return declare([ SuperClassConstructor, MixinConstructor ], {
		/* class definition */
	});

	// Incorrect - the module id should be determined only by the
	// filepath.
	// Hard-coding the module id also creates a global reference
	return declare('hard.coded.moduleId', SuperClassConstructor, {
		/* class definition */
	});
});
```

* Do not call this.inherited in the constructor function. declare chains constructor method calls automatically.
* Call this.inherited(arguments) to call the inherited version of an overridden method
* Always call this.inherited(arguments) when overriding the postscript method. While it is executed along with the constructor, declare does not automatically chain calls to postscript.
* If you need to mix methods into a declare-based object, use declare.safeMixin which will decorate the methods properly to support calls to this.inherited.

```javascript
require([
	'dojo/_base/declare'
], function (
	declare
) {
	var MyClass = declare(null, {
		constructor: function (kwArgs) {
			declare.safeMixin(this, kwArgs);
		},

		myMethod: function () {
			console.log('myMethod invoked');
		}
	});

	// MyClass can now have its methods extended in 'kwArgs':
	var myObj = new MyClass({
		myMethod: function () {
			this.inherited(arguments);
			console.log('extended myMethod invoked');
		}
	});

	myObject.myMethod();
	// console will log:
	// myMethod invoked
	// extended myMethod invoked
});
```

### Publish-Subscribe
Use dojo/topic to use the publish-subscribe pattern

* Name your topics like paths (e.g., “/dropdowns/user/change”)
* Namespace topics using the path-style naming to lower the risk of conflicting topic names

### Data layer
Use Dojo object stores for the data layer of your application.

* When consuming stores provided by a third party, use dojo/when with store methods because they may return promises or synchronous results

```javascript
require([
	'dojo/when'
], function (
	when
) {
	when(thirdPartyStore.put(updatedObject), function () {
		// Update complete
	});
});
```

* When creating a custom store, remember to wrap the return value of the query method with dojo/store/util/QueryResults

### Working with text

* Load text resources as AMD dependencies using the dojo/text! plugin. This is more encapsulated and convenient than retrieving via XHR and allows text resources to be inlined by the build system.

```javascript
define([
	'dojo/text!./templates/CustomWidget.html'
], function (
	templateText
) {
	// templateText will have the contents of CustomWidget.html
	// incorporate templateText in your module definition
});
```

* Use dojo/string.substitute for performing string substitutions

```javascript
require([
	'dojo/string'
], function (
	stringUtil
) {
	var hello = stringUtil.substitute('Hello, ${name}!', { name: 'Waldo' });
	hello === 'Hello, Waldo!';
});
```

* Use dojo/string.trim to trim whitespaces from the ends of a string
* Use dojo/string.pad to pad strings to a minimum length

### Managing resources
Free resources when you are done with them. Save the handles returned by modules like dojo/on, dojo/aspect, and dojo/topic#subscribe and call remove on them.

###Legacy modules

* Do not use the global dojo variable. It is an artifact of legacy Dojo releases and is there for backwards compatibility.
* Avoid the use of legacy modules in new applications
	* Use dojo/aspect instead of dojo/_base/connect
	* Use dojo/on instead of dojo/_base/connect
	* Avoid dojo/dom-attr as it incorrectly conflates DOM attributes with DOM properties
	* Use dojo/request rather than dojo/_base/xhr which is deprecated.
	* Use dojo/request/iframe instead of dojo/io/iframe
	* Use dojo/request/script instead of dojo/io/script
	* Use dojo/on's event delegation support instead of dojo/behavior
	* Use dojo/Deferred instead of dojo/_base/Deferred
	* Use dojo/promise/all instead of dojo/DeferredList
	* Use object stores (dojo/store) instead of dojo data stores (dojo/data)
	* Use dojo/dom-* modules over dojo/html and dojo/_base/html
	* Use dojo/query and dojo/NodeList instead of dojo/_base/query and dojo/_base/NodeList
	* Use dojo/window instead of dojo/_base/window
	* Use dojo/json instead of dojo/_base/json

### Dijit
* Do not use the dijit global variable. It is an artifact of legacy Dojo releases and is there for backwards compatibility.
* Don't mix dojo/Evented into Dijits; dijit/_WidgetBase defines its own on and emit methods
* Define Dijit property accessors according to the pattern _get<PropertyName>Attr and _set<PropertyName>Attr and access the properties with get and set methods (This differs from dojo/Stateful accessor naming)
* Always call the widget._set method within your setters. This sets the value on the instance and notifies all watchers of the property change.

```javascript
_setNameAttr: function (name) {
	// … custom setter logic …

	this._set('name', name);
}
```

* Use widget.own to register event handlers, topic subscriptions, aspect advice, or related widgets, which will cause these attachments to be removed automatically when the widget is destroyed

```javascript
postCreate: function () {
	this.inherited(arguments);

	this.own(
		topic.subscribe('/an/interesting/topic', function () {
			// … response to topic …
		})
	);
}
```

* Favor using widget.on to listen for widget events rather than using dojo/on with a widget's domNode
* Use widget.set to set properties rather than setting them directly

```javascript
// correct
widget.set('title', 'Amazing Title!');

// incorrect
widget.title = 'Amazing Title!';
```

* Combine multiple, adjacent calls to widget.set into a single call that passes an object literal with the property settings

```javascript
// correct
widget.set({
	title: 'Amazing Title!',
	content: 'Mindblowing content',
	index: contentIndex
});

// incorrect
widget.set('title', 'Amazing Title!');
widget.set('content', 'Mindblowing content');
widget.set('index', contentIndex);
```

* Widgets that manually create and add child widgets should mix in dijit/_Container and use addChild to add child widgets. This ensures that startup will be called on the child widgets when needed.
* Favor using HTML templates over manually constructing multi-level DOM structures. Manually constructing complex DOM structures usually results in less readable code.

### Widget lifecycle

* Dijit constructors should always have a constructor signature of function (kwArgs, srcNodeRef) where kwArgs is an object with properties to mix into the widget and srcNodeRef is a DOM node or an ID of a DOM node to attach the widget to.

```javascript
var CustomWidget = declare(_WidgetBase, {
	constructor: function (kwArgs, srcNodeRef) {
		// ...
	},
	// ...
});
```

* Override buildRendering for any logic involving the construction of the widget's DOM
* Override postCreate for things like adding event listeners after the widget DOM is built
* Override startup for any logic that must be executed only after the widget is added to the document flow
* Make sure to call this.inherited in any overridden lifecycle methods

```javascript
buildRendering: function () {
	this.inherited(arguments);
	// custom build logic
}
```

###Templated widgets
Create templated widgets when creating complex, composite widgets

* Annotate template nodes with data-dojo-attach-point to add them as widget properties, rather than using dojo/query to retrieve them

```html
<div>
	<div class="header"></div>
	<div class="container" data-dojo-attach-point="containerNode">
	</div>
</div>
```

* Add i18n support to your widgets using dojo/i18n! and template string substitution

```javascript
// widget module
define([
	'dojo/_base/declare',
	'dijit/_WidgetBase',
	'dijit/_TemplatedMixin'
	'dojo/text!./templates/CustomWidget.html',
	'dojo/i18n!./nls/CustomWidget'
], function (
	declare,
	_WidgetBase,
	_TemplatedMixin,
	template,
	i18n
) {
	return declare([ _WidgetBase, _TemplatedMixin ], {
		templateString: template,
		i18n: i18n
	});
});
```
```html
<-- template: -->
<div>
	<div class="header">${i18n.header}</div>
	<div class="container" data-dojo-attach-point="containerNode">
</div>
</div>
```

* Widget attach points for DOM nodes should be suffixed with "Node" (e.g. data-dojo-attach-point="specialLinkNode")
* Use slash-delimited module IDs rather than dot-separated class names in data-dojo-type. Module IDs are for the modern AMD loader; dot-separated class names are a relic of Dojo's synchronous loader and rely on global references to classes.

```html
<!-- Correct -->
<div data-dojo-type="dijit/form/Button">Ok</div>
<!-- Incorrect -->
<div data-dojo-type="dijit.form.Button">Ok</div>
```

* Don't forget to include dependencies referenced in the template within the widget module

```javascript
// widget module
define([
	'dojo/_base/declare',
	'dijit/_WidgetBase',
	'dijit/_TemplatedMixin',
	'dijit/_WidgetsInTemplateMixin',
	'dojo/text!./templates/CustomWidget.html',
	// template dependencies
	'dojo/form/Button'
], function (
	declare,
	_WidgetBase,
	_TemplatedMixin,
	_WidgetsInTemplateMixin,
	template
) {
	return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
		templateString: template
	});
});
```
```html
<!-- template: -->
<div>
	<div data-dojo-type="dojo/form/Button">Start</div>
</div>
```

### Automated testing
Create automated tests for your modules and actively run and maintain them. Use the Intern testing framework for writing and running unit and functional tests. If your application supports IE8 or below, use the Geezer version of Intern.

* Use a Selenium or WebDriver provider like Sauce Labs to run your unit and functional tests on all supported browser/OS environments
* Set up continuous integration to automatically run tests when new code is checked into source control
* Unit tests should verify module behavior, primarily through testing modules' public APIs
* Functional tests should programmatically mimic user interaction with the application and UI components
* Mock objects and data to isolate the objects under test from non-deterministic sources of data
* To mock AJAX requests, use dojo/request/registry

### Application builds
Build your application to optimize it for deployment.

Defining one module per file is great for development, but it can cause applications to load slowly in production due to hundreds of HTTP requests for individual modules and resources. The Dojo build system is designed to speed application loads by reducing the number and length of HTTP requests required to obtain the application. It does this by consolidating modules and resources, shortening private variable names, and removing comments and unreachable code.

The following are best practices for using the Dojo build system:

* Select the Google Closure compiler in your build profile for parallelized compilation, dead code removal, and source maps support
* Use build layers to aggregate the modules used by large pieces of your application into single layer .js files
* Use a single, monolithic build layer for small, single-page applications and multiple build layers for multi-page applications or large applications that don't need all of their pieces loaded up-front
* Use staticHasFeatures to force the result of feature tests. This allows dependencies using the dojo/has! plugin to be resolved at build time and can increase the amount of dead code identified and removed by the compiler.

```javascript
staticHasFeatures: {
	// This application is pure AMD,
	// so get rid of the legacy loader.
	'dojo-sync-loader': 0,

	// 'dojo-xhr-factory' relies on 'dojo-sync-loader',
	// which we have removed.
	'dojo-xhr-factory': 0,

	// all supported browsers provide native XMLHttpRequest
	'native-xhr': 1,

	// ...
}
```

* Set the cssOptimize property in your build profile to flatten and optimize the application's CSS resources
* Use a link element to include a single CSS file in your HTML; use @import in that file for dependencies. (The build system does not process link elements in HTML that load CSS)
* Use mini: true along with resourceTags.miniExclude in your build profile to exclude things like demos and tests from the build

```javascript
var profile = {
	// …

	// Exclude resources tagged as 'miniExclude' from the build
	mini: true,
	// …

	resourceTags: {
		miniExclude: function (filename, mid) {
			var testsPattern = /\/tests\//;
			var demosPattern = /\/demos\//;

			// All resources with path
			// including /tests/ or /demos/
			// are marked as mini.
			return testsPattern.test(filename) || demosPattern.test(filename);
		},
		// …
	}
};
```

* Create a build profile for each target environment if you need separate, highly-optimized builds for each environment (e.g. Desktop, Mobile, PhoneGap, etc).
