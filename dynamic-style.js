/**
 * Style: use to add / remove style
 * Source base on: http://davidwalsh.name/add-rules-stylesheets
 * TODO: improve the script.
 *    The script can add and remove a selector once only
 */
var style = (function() {
  var documentStyle = document.createElement('style'),
      head = document.head || document.getElementsByTagName('head')[0],
      allRules = [],
      index = 0,
      sheet;

  // WebKit
  documentStyle.appendChild(document.createTextNode(''));

  // add style to head
  head.appendChild(documentStyle);

  sheet = documentStyle.sheet;
  return {
    /**
     * Add style
     * @param selector
     * @param rules
     */
    addStyle: function(selector, rules) {

      if ('insertRule' in sheet) {
        sheet.insertRule(selector + '{' + rules + '}', index);
      } else if ('addRule' in sheet) {
        sheet.addRule(selector, rules, index);
      }
      allRules.push({selector: selector, index: index});
      index++;
    },
    /**
     * Remove the style with its index
     * @param selector of the added style
     */
    removeStyle: function(selector) {
      var found = this._findSelector(selector);

      if (found > -1) {
        this._remove(found);
        allRules.splice(found, 1);
      } else {
        console.error('No rules found to remove');
      }
    },
    _findSelector: function(selector) {
      var i, found = -1;

      for (i = 0; i < allRules.length; i++) {
        if (allRules[i].selector === selector) {
          found = allRules[i].index;
          break;
        }
      }
      return found;
    },
    _remove: function(index) {
      if ('removeRule' in sheet) {
        sheet.removeRule(index);
      } else if ('deleteRule' in sheet) {
        sheet.deleteRule(index);
      }
    },
    /**
     * Remove all the style
     */
    removeAll: function() {
      var selector;
      while ((selector = allRules.pop())) {
        this._remove(selector);
      }
    }
  };
})();