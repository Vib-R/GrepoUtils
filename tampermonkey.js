// ==UserScript==
// @name         GrepoUtils
// @author       Vib-R
// @include      http://*.grepolis.com/game/*
// @include      https://*.grepolis.com/game/*
// @exclude      view-source://*
// @exclude      https://classic.grepolis.com/game/*
// @version      v0.0
// @require      https://openuserjs.org/src/libs/sizzle/GM_config.js
// @require      https://raw.githubusercontent.com/Vib-R/GrepoUtils/main/style.js
// @require      https://raw.githubusercontent.com/Vib-R/GrepoUtils/main/main.js
// @require      https://raw.githubusercontent.com/Vib-R/GrepoUtils/main/ui.js
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';
    GM_xmlhttpRequest({
        method : "GET",
        url : "https://raw.githubusercontent.com/Vib-R/GrepoUtils/main/main.js",
        onload : (ev) =>
        {
            let e = document.createElement('script');
            e.innerText = ev.responseText;
            document.head.appendChild(e);
        }
    });
    GM_xmlhttpRequest({
        method : "GET",
        url : "https://raw.githubusercontent.com/Vib-R/GrepoUtils/main/style.js",
        onload : (ev) =>
        {
            let e = document.createElement('script');
            e.innerText = ev.responseText;
            document.head.appendChild(e);
        }
    });
})();
