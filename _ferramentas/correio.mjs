// Coloca atividades na "caixa de correio" do portal: cifra cada uma com a chave pública do portal.
// Uso: node correio.mjs index.html lista.json
import fs from 'fs'; import zlib from 'zlib'; import { webcrypto as c, randomBytes } from 'crypto';
const [, , htmlPath, listaPath] = process.argv;
let html = fs.readFileSync(htmlPath, 'utf8');
const re = /(<script type="application\/json" id="portalData">)([\s\S]*?)(<\/script>)/;
const PUB = JSON.parse(html.match(re)[2]);
if (!PUB.correio || !PUB.correio.pub) { console.error('ERRO: o envio pelo Claude ainda não foi ativado neste portal.'); process.exit(2); }
const pub = await c.subtle.importKey('raw', Buffer.from(PUB.correio.pub, 'base64'), { name: 'ECDH', namedCurve: 'P-256' }, false, []);
const lista = JSON.parse(fs.readFileSync(listaPath, 'utf8'));
PUB.extras = PUB.extras || [];
const agora = Date.now();
for (const [i, it] of lista.entries()) {
  const id = it.id || ('c' + agora.toString(36) + randomBytes(3).toString('hex') + i);
  const a = { id, atualizacao: !!it.id, data: agora - i * 1000, titulo: it.titulo, desc: it.desc, tema: it.tema, emoji: it.emoji, cor: it.cor, html: fs.readFileSync(it.arquivo, 'utf8') };
  const eph = await c.subtle.generateKey({ name: 'ECDH', namedCurve: 'P-256' }, true, ['deriveKey']);
  const k = await c.subtle.deriveKey({ name: 'ECDH', public: pub }, eph.privateKey, { name: 'AES-GCM', length: 256 }, false, ['encrypt']);
  const iv = c.getRandomValues(new Uint8Array(12));
  const ct = new Uint8Array(await c.subtle.encrypt({ name: 'AES-GCM', iv }, k, zlib.gzipSync(Buffer.from(JSON.stringify(a), 'utf8'))));
  const out = new Uint8Array(12 + ct.length); out.set(iv); out.set(ct, 12);
  const epk = Buffer.from(await c.subtle.exportKey('raw', eph.publicKey)).toString('base64');
  PUB.extras.push({ id, epk, ct: Buffer.from(out).toString('base64') });
  console.log('adicionada:', it.titulo);
}
html = html.replace(re, (_, a, __, b) => a + JSON.stringify(PUB).replace(/</g, '\\u003c') + b);
fs.writeFileSync(htmlPath, html);
console.log('total na caixa de correio:', PUB.extras.length, '| tamanho do site:', (html.length / 1048576).toFixed(2), 'MB');
