// ==UserScript==
// @name         Twitch Videos Query Modifier
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Modify query parameters on twitch.tv/*/videos navigation
// @author       ChatGpt (propmt by NiNoX14)
// @match        https://www.twitch.tv/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  /**
   * Modify query parameters here
   */
  function updateQueryParams(url) {
    const newUrl = new URL(url);

    // Example modifications:
    newUrl.searchParams.set('sort', 'time'); // force sort by time
    newUrl.searchParams.set('filter', 'archives'); // force archives filter
    // newUrl.searchParams.delete('someParam'); // remove unwanted param

    return newUrl.toString();
  }

  function handleNavigation() {
    const currentUrl = new URL(window.location.href);

    if (!/^\/[^/]+\/videos/.test(currentUrl.pathname)) return;

    const modifiedUrl = updateQueryParams(currentUrl.href);

    // Only update if different
    if (modifiedUrl.toString() !== currentUrl.toString()) {
      console.log('[Tampermonkey] Updating URL without reload');

      history.replaceState(history.state, '', modifiedUrl.toString());

      // Notify Twitch router something changed
      window.dispatchEvent(
        new PopStateEvent('popstate', {
          state: history.state,
        }),
      );
    }
  }

  /**
   * Handle initial page load
   */
  handleNavigation();

  /**
   * Handle Twitch SPA navigation
   * Twitch uses history.pushState / replaceState
   */
  const originalPushState = history.pushState;
  history.pushState = function () {
    originalPushState.apply(this, arguments);
    setTimeout(handleNavigation, 0);
  };

  const originalReplaceState = history.replaceState;
  history.replaceState = function () {
    originalReplaceState.apply(this, arguments);
    setTimeout(handleNavigation, 0);
  };

  window.addEventListener('popstate', handleNavigation);
})();
