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

const DOMAINS = ['stripe.com', 'github.com', 'notion.so', 'openai.com'];
const domains = DOMAINS.map((symbol) => ({ symbol, kind: 'Domain', light: url(symbol), dark: darkUrl(symbol) }));
const domainBlock = `// BEGIN DOMAINS\nconst DOMAINS = ${JSON.stringify(domains, null, 2)};\n// END DOMAINS`;

let html = readFileSync('index.html', 'utf8');
for (const [name, b] of [['ROWS', block], ['DOMAINS', domainBlock]]) {
  const re = new RegExp(`// BEGIN ${name}[\\s\\S]*?// END ${name}`);
  if (!re.test(html)) throw new Error(`${name} markers not found in index.html`);
  html = html.replace(re, () => b);
}
writeFileSync('index.html', html);
console.log([...rows, ...domains].map((r) => `${r.symbol}\t${r.light}\t${r.dark}`).join('\n'));
