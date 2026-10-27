/* Gerador de QR code (byte, correção M, versões 1–10). Sem dependências. */
window.QRMini = (function(){
  var ECC = {1:[10,[16]],2:[16,[28]],3:[26,[44]],4:[18,[32,32]],5:[24,[43,43]],6:[16,[27,27,27,27]],
    7:[18,[31,31,31,31]],8:[22,[38,38,39,39]],9:[22,[36,36,36,37,37]],10:[26,[43,43,43,43,44]]};
  var ALIN = {1:[],2:[6,18],3:[6,22],4:[6,26],5:[6,30],6:[6,34],7:[6,22,38],8:[6,24,42],9:[6,26,46],10:[6,28,50]};
  var EXP = [], LOG = [];
  (function(){ var x = 1; for(var i = 0; i < 255; i++){ EXP[i] = x; LOG[x] = i; x <<= 1; if(x & 256) x ^= 0x11d; } for(i = 255; i < 512; i++) EXP[i] = EXP[i - 255]; })();
  function mul(a, b){ return (a && b) ? EXP[LOG[a] + LOG[b]] : 0; }
  function gerador(n){ var g = [1]; for(var i = 0; i < n; i++){ var ng = new Array(g.length + 1).fill(0); for(var j = 0; j < g.length; j++){ ng[j] ^= g[j]; ng[j + 1] ^= mul(g[j], EXP[i]); } g = ng; } return g; }
  function resto(dados, n){ var g = gerador(n), r = new Array(n).fill(0); dados.forEach(function(d){ var f = d ^ r.shift(); r.push(0); for(var i = 0; i < n; i++) r[i] ^= mul(g[i + 1], f); }); return r; }
  function bch(v, poly, bits){ var d = v << bits; var tam = function(x){ return 32 - Math.clz32(x); }; while(tam(d) >= tam(poly)) d ^= poly << (tam(d) - tam(poly)); return d; }
  function codificar(texto){
    var bytes = Array.from(new TextEncoder().encode(texto));
    var v, dados;
    for(v = 1; v <= 10; v++){ var cap = ECC[v][1].reduce(function(a, b){ return a + b; }, 0); if(bytes.length + 2 + (v > 9 ? 1 : 0) <= cap) break; }
    if(v > 10) throw new Error('texto longo demais');
    var cap2 = ECC[v][1].reduce(function(a, b){ return a + b; }, 0), bits = [];
    function pôr(val, n){ for(var i = n - 1; i >= 0; i--) bits.push((val >>> i) & 1); }
    pôr(4, 4); pôr(bytes.length, v > 9 ? 16 : 8); bytes.forEach(function(b){ pôr(b, 8); });
    pôr(0, Math.min(4, cap2 * 8 - bits.length)); while(bits.length % 8) bits.push(0);
    dados = []; for(var i = 0; i < bits.length; i += 8){ var b = 0; for(var k = 0; k < 8; k++) b = (b << 1) | bits[i + k]; dados.push(b); }
    for(var pad = 0xEC; dados.length < cap2; pad ^= 0xEC ^ 0x11) dados.push(pad);
    var blocos = [], pos = 0, ne = ECC[v][0];
    ECC[v][1].forEach(function(n){ var d = dados.slice(pos, pos + n); pos += n; blocos.push({d: d, e: resto(d, ne)}); });
    var fim = [], maxd = Math.max.apply(null, ECC[v][1]);
    for(i = 0; i < maxd; i++) blocos.forEach(function(b){ if(i < b.d.length) fim.push(b.d[i]); });
    for(i = 0; i < ne; i++) blocos.forEach(function(b){ fim.push(b.e[i]); });
    return {v: v, cw: fim};
  }
  function montar(v, cw, mascara){
    var N = 17 + 4 * v, M = [], F = [];
    for(var y = 0; y < N; y++){ M.push(new Array(N).fill(false)); F.push(new Array(N).fill(false)); }
    function set(x, y, val){ M[y][x] = val; F[y][x] = true; }
    function localizador(cx, cy){ for(var dy = -4; dy <= 4; dy++) for(var dx = -4; dx <= 4; dx++){ var x = cx + dx, y = cy + dy; if(x < 0 || y < 0 || x >= N || y >= N) continue; var d = Math.max(Math.abs(dx), Math.abs(dy)); set(x, y, d !== 2 && d !== 4); } }
    localizador(3, 3); localizador(N - 4, 3); localizador(3, N - 4);
    var al = ALIN[v];
    al.forEach(function(cy, i){ al.forEach(function(cx, j){
      if((i === 0 && j === 0) || (i === 0 && j === al.length - 1) || (i === al.length - 1 && j === 0)) return;
      for(var dy = -2; dy <= 2; dy++) for(var dx = -2; dx <= 2; dx++) set(cx + dx, cy + dy, Math.max(Math.abs(dx), Math.abs(dy)) !== 1);
    }); });
    for(var i = 8; i < N - 8; i++){ set(6, i, i % 2 === 0); set(i, 6, i % 2 === 0); }
    set(8, N - 8, true);
    for(i = 0; i < 9; i++){ F[8][i] = F[i][8] = true; }
    for(i = 0; i < 8; i++){ F[8][N - 1 - i] = true; F[N - 1 - i][8] = true; }
    if(v >= 7){ var vi = (v << 12) | bch(v, 0x1F25, 12);
      for(i = 0; i < 18; i++){ var bit = ((vi >> i) & 1) === 1, a = N - 11 + (i % 3), b = Math.floor(i / 3); set(a, b, bit); set(b, a, bit); } }
    var bitsDados = []; cw.forEach(function(c){ for(var k = 7; k >= 0; k--) bitsDados.push((c >> k) & 1); });
    var idx = 0, sobe = true;
    for(var x = N - 1; x >= 1; x -= 2){
      if(x === 6) x = 5;
      for(var n = 0; n < N; n++){ var yy = sobe ? N - 1 - n : n;
        for(var c = 0; c < 2; c++){ var xx = x - c; if(F[yy][xx]) continue;
          var bit2 = idx < bitsDados.length ? bitsDados[idx] === 1 : false; idx++;
          var inv = [ (xx + yy) % 2 === 0, yy % 2 === 0, xx % 3 === 0, (xx + yy) % 3 === 0, (Math.floor(yy / 2) + Math.floor(xx / 3)) % 2 === 0,
            (xx * yy) % 2 + (xx * yy) % 3 === 0, ((xx * yy) % 2 + (xx * yy) % 3) % 2 === 0, ((xx + yy) % 2 + (xx * yy) % 3) % 2 === 0 ][mascara];
          M[yy][xx] = bit2 !== inv; } }
      sobe = !sobe;
    }
    var fmt = ((0 << 3) | mascara); /* nível M = 00 */
    var f = ((fmt << 10) | bch(fmt, 0x537, 10)) ^ 0x5412;
    function fb(i){ return ((f >> i) & 1) === 1; }
    for(i = 0; i <= 5; i++) M[i][8] = fb(i);
    M[7][8] = fb(6); M[8][8] = fb(7); M[8][7] = fb(8);
    for(i = 9; i < 15; i++) M[8][14 - i] = fb(i);
    for(i = 0; i < 8; i++) M[8][N - 1 - i] = fb(i);
    for(i = 8; i < 15; i++) M[N - 15 + i][8] = fb(i);
    M[N - 8][8] = true;
    return M;
  }
  function penalidade(M){
    var N = M.length, p = 0, x, y, i;
    for(var t = 0; t < 2; t++){
      for(y = 0; y < N; y++){ var run = 1; for(x = 1; x < N; x++){ var a = t ? M[x][y] : M[y][x], b = t ? M[x - 1][y] : M[y][x - 1]; if(a === b){ run++; if(run === 5) p += 3; else if(run > 5) p++; } else run = 1; } }
      for(y = 0; y < N; y++){ var s = 0; for(x = 0; x < N; x++){ s = ((s << 1) | ((t ? M[x][y] : M[y][x]) ? 1 : 0)) & 0x7FF;
        if(x >= 10 && (s === 0x05D || s === 0x5D0)) p += 40; } }
    }
    for(y = 0; y < N - 1; y++) for(x = 0; x < N - 1; x++){ var c = M[y][x]; if(c === M[y][x + 1] && c === M[y + 1][x] && c === M[y + 1][x + 1]) p += 3; }
    var pretos = 0; for(y = 0; y < N; y++) for(x = 0; x < N; x++) if(M[y][x]) pretos++;
    p += 10 * Math.floor(Math.abs(pretos * 20 - N * N * 10) / (N * N) );
    return p;
  }
  function matriz(texto){
    var c = codificar(texto), melhor = null, mp = Infinity;
    for(var m = 0; m < 8; m++){ var M = montar(c.v, c.cw, m), p = penalidade(M); if(p < mp){ mp = p; melhor = M; } }
    return melhor;
  }
  /* desenha num <canvas> (com margem de 4 módulos) */
  function canvas(texto, px){
    var M = matriz(texto), N = M.length, mod = Math.max(2, Math.floor((px || 220) / (N + 8)));
    var cv = document.createElement('canvas'); cv.width = cv.height = mod * (N + 8);
    var g = cv.getContext('2d'); g.fillStyle = '#fff'; g.fillRect(0, 0, cv.width, cv.height); g.fillStyle = '#000';
    for(var y = 0; y < N; y++) for(var x = 0; x < N; x++) if(M[y][x]) g.fillRect((x + 4) * mod, (y + 4) * mod, mod, mod);
    return cv;
  }
  return {matriz: matriz, canvas: canvas};
})();
