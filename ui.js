// ==UserScript==
// @name               GrepoUtilsGUI
// @require            https://openuserjs.org/src/libs/sizzle/GM_config.js
// @grant              GM_getValue
// @grant              GM_setValue
// ==/UserScript==

GM_config.init(
{
  'id': 'MyConfig', // The id used for this instance of GM_config
  'fields': // Fields object
  {
    'Name': // This is the id of the field
    {
      'label': 'Name', // Appears next to field
      'type': 'text', // Makes this setting a text field
      'default': 'Sizzle McTwizzle' // Default value if user doesn't change it
    }
  }
});

(function() {
    'use strict';
  GM_config.open();
})();
