// ==UserScript==
// @name         OP.GG – Force English
// @namespace    https://op.gg/
// @version      1.1
// @description  Force OP.GG to English.
// @match        https://op.gg/*
// @match        https://*.op.gg/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(() => {
  'use strict';

  const url = new URL(location.href);

  const languages = new Set([
    'ru',
    'ko',
    'ja',
    'zh',
    'zh-cn',
    'zh-tw',
    'de',
    'es',
    'fr',
    'it',
    'pt',
    'pl',
    'tr',
    'th',
    'vi',
    'id',
    'nl',
    'da',
    'sv',
    'no',
    'hu',
    'fi',
    'ro',
    'ar',
    'sr',
  ]);

  const parts = url.pathname.split('/').filter(Boolean);
  const firstPathPart = parts[0];

  if (!languages.has(firstPathPart)) {
    return;
  }

  // Remove the locale.
  parts.shift();

  const cleanPath = '/' + parts.join('/');

  // Tell OP.GG explicitly that English is desired.
  url.pathname = cleanPath;
  url.searchParams.set('hl', 'en');

  console.log('[OP.GG] Redirecting to:', url.href);

  location.replace(url.href);
})();
