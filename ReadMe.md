---
# user-scripts

A collection of personal Tampermonkey/Greasemonkey user scripts.
---

## 🟣 twitch-video-tab.user.js

**Location:** `./scripts/twitch-video-tab.user.js`
**Target:** `https://www.twitch.tv/*`
**Type:** Tampermonkey userscript

### 🔎 What It Does

This script automatically modifies query parameters when navigating to a Twitch channel’s **Videos** tab.

Twitch is a single-page React application (SPA), meaning URL changes do not trigger full page reloads. This script:

- Detects navigation to `/channel-name/videos`
- Modifies specific query parameters (e.g. `sort`, `filter`)
- Updates the URL **without reloading the page**
- Hooks into `history.pushState`, `history.replaceState`, and `popstate`
- Ensures consistent video tab behavior across SPA navigation

---

## 🚀 Installation

1. Install a userscript manager:
   - Tampermonkey (recommended)
   - Greasemonkey
   - Violentmonkey

2. Open:

   ```
   scripts/twitch-video-tab.user.js
   ```

3. Click **Install** in your userscript manager.

---

## 🛠 Customization

Edit the `updateQueryParams()` function inside the script to modify:

```js
newUrl.searchParams.set('sort', 'time');
newUrl.searchParams.set('filter', 'archives');
```

Add, remove, or change parameters as desired.

---

## 📜 License

MIT (or your preferred license)

---
