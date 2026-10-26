// Cifra jogos para a pasta protegido/ usando a chave PÚBLICA do portal.
// Só o servidor (função "jogo" no Supabase) tem a chave privada para abrir.
// Uso: node _ferramentas/proteger.mjs <id> <arquivo.html> [<id> <arquivo.html> ...]
// A ponte com o portal (ponte-portal.js) é embutida no jogo automaticamente.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { webcrypto as C } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const pub = JSON.parse(readFileSync(join(raiz, 'protegido', 'chave-publica.json'), 'utf8'));
const ponte = readFileSync(join(raiz, '_ferramentas', 'ponte-portal.js'), 'utf8');
const b64 = u => Buffer.from(u).toString('base64');
const chavePub = await C.subtle.importKey('jwk', pub, { name: 'RSA-OAEP', hash: 'SHA-256' }, false, ['wrapKey']);
const args = process.argv.slice(2);
if (!args.length || args.length % 2) { console.error('Uso: node _ferramentas/proteger.mjs <id> <arquivo.html> ...'); process.exit(1); }
mkdirSync(join(raiz, 'protegido'), { recursive: true });
for (let i = 0; i < args.length; i += 2) {
  const id = args[i], arq = args[i + 1];
  if (!/^[a-z0-9-]{2,60}$/.test(id)) throw new Error('id inválido: ' + id);
  let html = readFileSync(arq, 'utf8');
  const tag = '<script src="ponte-portal.js"></script>';
  html = html.includes(tag) ? html.replace(tag, () => '<script>\n' + ponte + '\n</script>')
                            : html.replace(/<head[^>]*>/i, m => m + '\n<script>\n' + ponte + '\n</script>');
  const k = await C.subtle.generateKey({ name: 'AES-GCM', length: 256 }, true, ['encrypt']);
  const iv = C.getRandomValues(new Uint8Array(12));
  const ct = new Uint8Array(await C.subtle.encrypt({ name: 'AES-GCM', iv }, k, new TextEncoder().encode(html)));
  const wk = new Uint8Array(await C.subtle.wrapKey('raw', k, chavePub, { name: 'RSA-OAEP' }));
  writeFileSync(join(raiz, 'protegido', id + '.json'), JSON.stringify({ v: 1, k: b64(wk), iv: b64(iv), ct: b64(ct) }));
  console.log('protegido:', id, (html.length / 1024).toFixed(0) + ' KB');
}
