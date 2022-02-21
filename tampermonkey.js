// ==UserScript==
// @name         Market
// @author       Vib-R
// @description  Grepolis tőzsde bot
// @include      http://*.grepolis.com/game/*
// @include      https://*.grepolis.com/game/*
// @exclude      view-source://*
// @exclude      https://classic.grepolis.com/game/*
// @version      v1.1
// @grant        GM_xmlhttpRequest
// @grant        GM_getResourceText
// @grant        GM_addStyle
// @require      https://raw.githubusercontent.com/Vib-R/Market/main/main.js
// @resource     REMOTE_CSS https://raw.githubusercontent.com/Vib-R/Market/main/style.css
// ==/UserScript==

(function() {
    'use strict';
    GM_xmlhttpRequest({
        method : "GET",
        url : "https://raw.githubusercontent.com/Vib-R/Market/main/main.js",
        onload : (ev) =>
        {
            let e = document.createElement('script');
            e.innerText = ev.responseText;
            document.head.appendChild(e);
        }
    });
    const myCss = GM_getResourceText("REMOTE_CSS");
    GM_addStyle(myCss);
})();
