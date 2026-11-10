// Tiny static server for index.html. Run: npm start (PORT env, default 3000).
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('.', import.meta.url)));
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.json': 'application/json' };
const port = Number(process.env.PORT) || 3000;

createServer(async (req, res) => {
  try {
    let path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    if (path.endsWith('/')) path += 'index.html';
    const file = resolve(root, '.' + path);
    if (file !== root && !file.startsWith(root + sep)) throw Object.assign(new Error(), { code: 'ENOENT' });
    const rel = file.slice(root.length + 1);
    if (rel.startsWith('node_modules') || rel.startsWith('.git')) throw Object.assign(new Error(), { code: 'ENOENT' });
    const body = await readFile(file);
    res.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
  }
}).listen(port, () => console.log(`http://localhost:${port}/`));
