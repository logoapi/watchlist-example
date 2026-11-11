# watchlist-example

A static stock and crypto watchlist: 10 symbols (stocks, an ETF, coins), each logo in light and dark. Plain HTML, no framework, no build needed to view.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/logoapi/watchlist-example)

StackBlitz installs stock-ticker-logos from npm and runs the build.

Live demo: [logoapi.github.io/watchlist-example](https://logoapi.github.io/watchlist-example/). Or open `index.html` in a browser.

Each logo is one URL, no key:

```html
<img src="https://logoapi.sh/ticker/AAPL.svg" alt="AAPL logo" width="32" height="32">
<img src="https://logoapi.sh/dark/ticker/BTC.svg" alt="BTC logo" width="32" height="32">
```

The URLs come from the [stock-ticker-logos](https://www.npmjs.com/package/stock-ticker-logos) package (`url()` and `darkUrl()`). To change the symbols, edit `WATCHLIST` in `build.mjs`, then:

```bash
npm install
npm run build
```

Using React? [react-stock-logo](https://www.npmjs.com/package/react-stock-logo) renders the same logos as a component:

```jsx
import { StockLogo } from 'react-stock-logo';

<StockLogo ticker="AAPL" theme="dark" shape="square" size={32} />
```

Ticker and crypto logo URLs: no rate limit, no key. Docs: [logoapi.sh/docs](https://logoapi.sh/docs).

License: MIT.
