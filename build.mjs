// Rebuilds the ROWS list in index.html from the stock-ticker-logos package.
// Run: npm install && npm run build
import { readFileSync, writeFileSync } from 'node:fs';
import { url, darkUrl } from 'stock-ticker-logos';

const WATCHLIST = [
  ['AAPL', 'Stock'], ['MSFT', 'Stock'], ['NVDA', 'Stock'], ['GOOGL', 'Stock'],
  ['TSLA', 'Stock'], ['META', 'Stock'], ['VOO', 'ETF'],
  ['BTC', 'Coin'], ['ETH', 'Coin'], ['SOL', 'Coin'],
];

const rows = WATCHLIST.map(([symbol, kind]) => ({ symbol, kind, light: url(symbol), dark: darkUrl(symbol) }));
const block = `// BEGIN ROWS\nconst ROWS = ${JSON.stringify(rows, null, 2)};\n// END ROWS`;

const html = readFileSync('index.html', 'utf8');
const next = html.replace(/\/\/ BEGIN ROWS[\s\S]*?\/\/ END ROWS/, block);
if (next === html && !html.includes(block)) throw new Error('ROWS markers not found in index.html');
writeFileSync('index.html', next);
console.log(rows.map((r) => `${r.symbol}\t${r.light}\t${r.dark}`).join('\n'));
