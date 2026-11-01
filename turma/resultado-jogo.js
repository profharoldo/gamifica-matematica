/* Identificação do aluno e resultado final para jogos abertos no modo livre (página principal).
   Funciona com qualquer jogo, inclusive os já publicados: o portal acompanha o GAMIFICA do jogo.
   - Antes de começar, pede nome completo e série/turma.
   - Quando o jogo chama GAMIFICA.enviar(acertos, total, pontos), mostra o resultado final
     (nome, série, atividade, acertos, nota de 0 a 10, pontos, data) com botão para baixar em Word.
   No portal do aluno (turma/jogar.html) a identificação e o resultado já são feitos pela própria página. */
(function(){
  'use strict';

  function esc(s){ return String(s).replace(/[&<>"]/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }
  function nota1(n){ return Number(n).toFixed(1).replace('.', ','); }

  function baixarWord(d){
    var linhas = [['Aluno(a)', d.aluno], ['Série / turma', d.serie], ['Atividade', d.atividade], ['Acertos', d.acertos + ' de ' + d.total], ['Nota (0 a 10)', nota1(d.nota)], ['Pontos', d.pontos], ['Data', d.data]];
    var tr = linhas.map(function(l){ return '<tr><td style="background:#eef0fb;font-weight:bold;width:35%;border:1px solid #b8c0d9;padding:6px">' + esc(l[0]) + '</td><td style="border:1px solid #b8c0d9;padding:6px">' + esc(l[1]) + '</td></tr>'; }).join('');
    var html = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="utf-8"><title>Resultado final</title></head><body style="font-family:Arial,sans-serif">' +
      '<h1 style="color:#1d2b53">Resultado final da atividade</h1><p style="color:#5d6785">Gamefica Ação Matemática</p>' +
      '<table style="border-collapse:collapse;width:100%">' + tr + '</table>' +
      '<p style="margin-top:18px;color:#5d6785;font-size:10pt">Documento gerado automaticamente ao término da atividade.</p></body></html>';
    var blob = new Blob(['\ufeff', html], {type: 'application/msword'});
    var nome = ('resultado-' + d.aluno + '-' + d.atividade).normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '').toLowerCase().slice(0, 80) + '.doc';
    var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = nome;
    document.body.appendChild(a); a.click();
    setTimeout(function(){ URL.revokeObjectURL(a.href); if(a.parentNode) a.parentNode.removeChild(a); }, 1000);
  }

  function caixa(conteudo){
    var fundo = document.createElement('div');
    fundo.setAttribute('role', 'dialog'); fundo.setAttribute('aria-modal', 'true');
    fundo.style.cssText = 'position:fixed;inset:0;z-index:2147483600;background:rgba(15,23,42,.72);display:flex;align-items:center;justify-content:center;padding:14px;font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif';
    var c = document.createElement('div');
    c.style.cssText = 'background:#fff;color:#1b2440;border-radius:18px;max-width:430px;width:100%;padding:20px;box-shadow:0 20px 50px rgba(0,0,0,.4);max-height:92vh;overflow:auto';
    c.appendChild(conteudo);
    fundo.appendChild(c); document.body.appendChild(fundo);
    return fundo;
  }

  function botao(texto, estilo, acao){
    var b = document.createElement('button'); b.type = 'button'; b.textContent = texto;
    b.style.cssText = 'font:inherit;font-weight:800;border-radius:12px;padding:10px 14px;cursor:pointer;margin:6px 6px 0 0;border:2px solid ' + (estilo === 'sec' ? '#d5d8f5' : '#e0ad00') + ';background:' + (estilo === 'sec' ? '#eef0fb' : '#ffd23f') + ';color:' + (estilo === 'sec' ? '#5b52f0' : '#1b2440');
    b.addEventListener('click', acao);
    return b;
  }

  function pedirIdentificacao(G){
    var titulo = document.createElement('div');
    titulo.innerHTML = '<h2 style="margin:0 0 6px;font-size:1.2rem">✍️ Identificação</h2><p style="margin:0 0 12px;color:#5d6785;font-size:.95rem">Digite seu <b>nome completo</b> e sua <b>série e turma</b>. Esse é o nome que aparece no resultado final.</p>';
    var form = document.createElement('form');
    var campos = [['Nome completo', 'nome', 'Ex.: Maria Silva Souza'], ['Série e turma', 'serie', 'Ex.: 3ª série A']];
    var entradas = {};
    campos.forEach(function(c){
      var lb = document.createElement('label'); lb.textContent = c[0]; lb.style.cssText = 'display:block;font-weight:800;margin:8px 0 4px';
      var inp = document.createElement('input'); inp.type = 'text'; inp.maxLength = 80; inp.placeholder = c[2]; inp.autocomplete = c[1] === 'nome' ? 'name' : 'off';
      inp.style.cssText = 'width:100%;font:inherit;font-size:1.05rem;padding:10px 12px;border-radius:12px;border:2px solid #e1e6f0;box-sizing:border-box';
      lb.appendChild(document.createElement('br')); lb.appendChild(inp);
      form.appendChild(lb); entradas[c[1]] = inp;
    });
    var aviso = document.createElement('div'); aviso.style.cssText = 'color:#b91c1c;font-weight:700;margin-top:8px;min-height:1em';
    var ok = botao('▶️ Começar', 'pri', function(){});
    ok.type = 'submit'; form.appendChild(ok);
    var pular = botao('Agora não', 'sec', function(){});
    pular.type = 'button';
    pular.addEventListener('click', function(){ if(fundo && fundo.parentNode) fundo.parentNode.removeChild(fundo); });
    form.appendChild(pular); form.appendChild(aviso);
    form.addEventListener('submit', function(ev){
      ev.preventDefault();
      var n = entradas.nome.value.trim().replace(/\s+/g, ' ');
      var s = entradas.serie.value.trim().replace(/\s+/g, ' ');
      if(n.split(' ').length < 2 || n.length < 5){ aviso.textContent = 'Digite o nome completo (nome e sobrenome).'; return; }
      if(s.length < 2){ aviso.textContent = 'Digite a série e a turma (ex.: 3ª série A).'; return; }
      G.aluno = n; G.turma = s;
      if(fundo.parentNode) fundo.parentNode.removeChild(fundo);
    });
    var c = document.createElement('div'); c.appendChild(titulo); c.appendChild(form);
    var fundo = caixa(c);
    setTimeout(function(){ entradas.nome.focus(); }, 50);
    return fundo;
  }

  function mostrarResultado(d){
    var c = document.createElement('div');
    c.innerHTML = '<div style="font-size:2.4rem;text-align:center">🏁</div><h2 style="margin:4px 0 8px;text-align:center;font-size:1.25rem">Resultado final</h2>';
    var tb = document.createElement('table'); tb.style.cssText = 'border-collapse:collapse;width:100%;font-size:.95rem';
    [['Aluno(a)', d.aluno], ['Série / turma', d.serie], ['Atividade', d.atividade], ['Acertos', d.acertos + ' de ' + d.total], ['Nota (0 a 10)', nota1(d.nota)], ['Pontos', d.pontos], ['Data', d.data]].forEach(function(l){
      var tr = document.createElement('tr');
      tr.innerHTML = '<td style="background:#eef0fb;font-weight:800;padding:7px;border:1px solid #e1e6f0;width:40%">' + esc(l[0]) + '</td><td style="padding:7px;border:1px solid #e1e6f0">' + esc(l[1]) + '</td>';
      tb.appendChild(tr);
    });
    c.appendChild(tb);
    var linha = document.createElement('div'); linha.style.cssText = 'margin-top:12px;text-align:center';
    var fundo = null;
    linha.appendChild(botao('📄 Baixar resultado em Word', 'pri', function(){ baixarWord(d); }));
    linha.appendChild(botao('📕 Baixar em PDF', 'pri', function(){ pdf(d); }));
    linha.appendChild(botao('👍 Fechar', 'sec', function(){ if(fundo && fundo.parentNode) fundo.parentNode.removeChild(fundo); }));
    c.appendChild(linha);
    fundo = caixa(c);
  }



  /* Relatório em PDF: abre a versão para impressão; em "Imprimir" escolha "Salvar como PDF" */
  function relatorioHtml(d){
    var linhas = [['Aluno(a)', d.aluno], ['Série / turma', d.serie], ['Atividade', d.atividade], ['Acertos', d.acertos + ' de ' + d.total], ['Nota (0 a 10)', nota1(d.nota)], ['Pontos', d.pontos], ['Data', d.data]];
    var tr = linhas.map(function(l){ return '<tr><th>' + esc(l[0]) + '</th><td>' + esc(l[1]) + '</td></tr>'; }).join('');
    return '<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Resultado final</title><style>' +
      'body{font-family:Arial,Helvetica,sans-serif;color:#1b2440;margin:40px}h1{color:#1d2b53;margin:0 0 4px}.sub{color:#5d6785;margin:0 0 24px}' +
      'table{border-collapse:collapse;width:100%}th,td{border:1px solid #b8c0d9;padding:10px;text-align:left}th{background:#eef0fb;width:35%}' +
      '.rod{margin-top:26px;color:#5d6785;font-size:12px}</style></head><body>' +
      '<h1>Resultado final da atividade</h1><p class="sub">Gamefica Ação Matemática</p><table>' + tr + '</table>' +
      '<p class="rod">Relatório gerado automaticamente ao término da atividade.</p></body></html>';
  }
  function pdf(d){
    var w = window.open('', '_blank');
    if(!w){ window.alert('Permita pop-ups deste site para baixar o PDF.'); return; }
    w.document.open(); w.document.write(relatorioHtml(d)); w.document.close();
    w.focus(); setTimeout(function(){ try{ w.print(); }catch(e){} }, 400);
  }

  /* Código injetado no início de cada jogo (escrito como função para não ter problema de aspas).
     - Som: todo áudio passa por um controle geral, que o botão 🔊 liga e desliga.
     - Proteção: bloqueia clique direito e atalhos de salvar/inspecionar fora dos campos de digitação. */
  function jogoPatch(){
    /* Um só botão de tela cheia: o do portal. Esconde o ⛶ que alguns jogos têm por conta própria. */
    (function esconderTelaCheia(){
      /* Seletores dos controles próprios de tela cheia e de som dos jogos. */
      var seletores = ['button[aria-label*="tela cheia" i]','button[title*="tela cheia" i]','button[aria-label*="fullscreen" i]','button[title*="fullscreen" i]','button[aria-label*="tela inteira" i]','button[title*="tela inteira" i]','#btnTela','#btn-tela','#fullscreen','#btnFullscreen','.btn-tela','.btn-fullscreen','button[aria-label~="som" i]','button[title~="som" i]','button[aria-label~="sound" i]','button[title~="sound" i]','button[aria-label~="mudo" i]','button[title~="mudo" i]','#btnSom','#btn-som','#btnSomJogo','#soundBtn'];
      var css = seletores.join(',') + '{display:none!important}';
      var st = document.createElement('style'); st.textContent = css;
      (document.head || document.documentElement).appendChild(st);
      var simbolos = ['⛶', '⤢', '⤡', '⛷', '🔊', '🔉', '🔈', '🔇'];
      /* Esconde com estilo inline (vence qualquer CSS do jogo, mesmo com !important) */
      function esconde(e){ if(e && e.style && e.style.getPropertyValue('display') !== 'none') e.style.setProperty('display', 'none', 'important'); }
      function limpa(){
        for (var j = 0; j < seletores.length; j++){
          var achados = document.querySelectorAll(seletores[j]);
          for (var a = 0; a < achados.length; a++) esconde(achados[a]);
        }
        var todos = document.querySelectorAll('body *');
        for (var i = 0; i < todos.length; i++){
          var e = todos[i];
          if (e.children.length || (e.tagName !== 'BUTTON' && e.tagName !== 'SPAN' && e.tagName !== 'A')) continue;
          var t = (e.textContent || '').replace(/[︎️\s]/g, '');
          if (!t || t.length > 4) continue;
          for (var k = 0; k < simbolos.length; k++){ if (t.indexOf(simbolos[k]) >= 0){ esconde(e); break; } }
        }
      }
      limpa();
      try{ new MutationObserver(limpa).observe(document.documentElement, {childList: true, subtree: true, attributes: true, attributeFilter: ['style', 'class']}); }catch(e){}
      document.addEventListener('DOMContentLoaded', limpa);
      window.addEventListener('load', limpa);
    })();
    var mudo = false, masters = [];
    window.__gamificaSomSet = function(m){ mudo = !!m; masters.forEach(function(g){ try{ g.gain.value = mudo ? 0 : 1; }catch(e){} }); try{ document.querySelectorAll('audio,video').forEach(function(x){ x.muted = mudo; }); }catch(e){} };
    var AC = window.AudioContext || window.webkitAudioContext;
    if (AC){
      var Patched = function(){
        var ctx = Reflect.construct(AC, arguments, Patched);
        try{
          var real = ctx.destination, master = ctx.createGain();
          master.gain.value = mudo ? 0 : 1; master.connect(real); masters.push(master);
          Object.defineProperty(ctx, 'destination', {configurable: true, get: function(){ return master; }});
        }catch(e){}
        return ctx;
      };
      Patched.prototype = Object.create(AC.prototype); Patched.prototype.constructor = Patched;
      try{ window.AudioContext = Patched; }catch(e){}
      if (window.webkitAudioContext){ try{ window.webkitAudioContext = Patched; }catch(e){} }
    }
  }
  /* Som temático para QUALQUER item: clique, acerto, erro e fim, com sons conforme o tema.
     Usa o AudioContext já ligado ao controle geral (botão 🔊 do portal). */
  function somTematico(){
    var ctx = null, ultimo = 0;
    var tema = String(window.__gamificaTema || '').toLowerCase();
    var paleta = /financ|dinheiro|juros|orcament|cart|compra|mercado|pagamento/.test(tema) ? 'moedas'
               : /espa|alien|geometr|solid|planet|gerador|3d|dado/.test(tema) ? 'espaco' : 'jogo';
    function audio(){
      if (ctx) return ctx;
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      try{ ctx = new AC(); }catch(e){ ctx = null; }
      return ctx;
    }
    function nota(f, t0, dur, tipo, vol, f2){
      var c = audio(); if (!c) return;
      try{
        if (c.state === 'suspended') c.resume();
        var t = c.currentTime + t0, o = c.createOscillator(), g = c.createGain();
        o.type = tipo || 'triangle';
        o.frequency.setValueAtTime(f, t);
        if (f2) o.frequency.exponentialRampToValueAtTime(f2, t + dur);
        g.gain.setValueAtTime(vol || 0.08, t);
        g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        o.connect(g); g.connect(c.destination);
        o.start(t); o.stop(t + dur + 0.05);
      }catch(e){}
    }
    var sons = {
      clique: function(){ nota(880, 0, .045, 'square', .025); },
      certo: function(){
        if (paleta === 'moedas'){ nota(988, 0, .10, 'square', .05); nota(1319, .09, .22, 'square', .05); }
        else if (paleta === 'espaco'){ nota(400, 0, .25, 'sine', .09, 1200); nota(1200, .22, .18, 'triangle', .07); }
        else { nota(523, 0, .12); nota(659, .1, .12); nota(784, .2, .22); }
      },
      errado: function(){
        if (paleta === 'moedas'){ nota(196, 0, .25, 'sawtooth', .05); nota(147, .2, .3, 'sawtooth', .05); }
        else if (paleta === 'espaco'){ nota(700, 0, .35, 'sine', .08, 150); }
        else { nota(220, 0, .18, 'sawtooth', .05); nota(165, .16, .25, 'sawtooth', .05); }
      },
      fim: function(){
        if (paleta === 'moedas'){ [988,1175,1319,1568].forEach(function(f,i){ nota(f, i*.09, .16, 'square', .045); }); }
        else if (paleta === 'espaco'){ [392,523,659,784,1047].forEach(function(f,i){ nota(f, i*.12, .3, 'sine', .07); }); }
        else { [523,659,784,1047].forEach(function(f,i){ nota(f, i*.13, .26); }); }
      }
    };
    /* Música de fundo em loop, gerada no navegador (sem arquivos). Começa com o item. */
    function tomAbs(f, tipo, dur, vol, ta){
      var c = audio(); if (!c) return;
      try{
        var o = c.createOscillator(), g = c.createGain();
        o.type = tipo; o.frequency.setValueAtTime(f, ta);
        g.gain.setValueAtTime(0.0001, ta);
        g.gain.linearRampToValueAtTime(vol, ta + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, ta + dur);
        o.connect(g); g.connect(c.destination);
        o.start(ta); o.stop(ta + dur + 0.05);
      }catch(e){}
    }
    var acordes = {
      jogo:   [[220, 261.63, 329.63], [174.61, 220, 261.63], [261.63, 329.63, 392], [196, 246.94, 293.66]],
      moedas: [[261.63, 329.63, 392], [196, 246.94, 293.66], [220, 261.63, 329.63], [174.61, 220, 261.63]],
      espaco: [[164.81, 196, 246.94], [261.63, 329.63, 392], [196, 246.94, 293.66], [293.66, 369.99, 440]]
    };
    var bpm = {jogo: 112, moedas: 124, espaco: 78}[paleta];
    var musicaIniciada = false;
    function iniciaMusica(c){
      if (musicaIniciada) return; musicaIniciada = true;
      var passo = 60 / bpm / 2, t0 = c.currentTime + 0.3, n = 0, proximo = t0;
      var base = acordes[paleta];
      function agenda(){
        while (proximo < c.currentTime + 0.6){
          var acorde = base[Math.floor(n / 8) % 4], pos = n % 8, ta = t0 + n * passo;
          if (pos === 0) tomAbs(acorde[0] / 2, 'sine', passo * 6, 0.08, ta);
          var nota = acorde[[0, 1, 2, 1][pos % 4]] * (pos >= 4 ? 2 : 1);
          if (paleta === 'espaco') tomAbs(nota, 'sine', passo * 3.5, 0.05, ta);
          else tomAbs(nota, 'triangle', passo * 1.6, 0.055, ta);
          n++; proximo = t0 + n * passo;
        }
      }
      agenda();
      setInterval(agenda, 120);
    }
    var tentativas = 0, timerMusica = null;
    function ligaMusica(){
      if (musicaIniciada) return;
      /* Se o próprio jogo já tem música (botão 🎵), não sobrepõe outra */
      if (document.querySelector('[id*="usica"],[aria-label*="úsica"],[title*="úsica"],[aria-label*="usic"],[title*="usic"]')) { musicaIniciada = true; return; }
      var c = audio(); if (!c) return;
      try{
        if (c.state === 'running'){ iniciaMusica(c); return; }
        c.resume().then(function(){ if (c.state === 'running') iniciaMusica(c); }).catch(function(){});
      }catch(e){}
    }
    /* Tenta sozinho no começo, a cada toque/tecla dentro do item e por alguns segundos */
    ligaMusica();
    ['pointerdown','touchstart','mousedown','keydown','click'].forEach(function(ev){
      document.addEventListener(ev, ligaMusica, true);
    });
    timerMusica = setInterval(function(){
      tentativas++; ligaMusica();
      if (musicaIniciada || tentativas > 60) clearInterval(timerMusica);
    }, 1000);

    function toca(nome){
      var agora = Date.now(); if (agora - ultimo < 250) return; ultimo = agora;
      sons[nome]();
    }
    /* Clique em botões e opções */
    document.addEventListener('click', function(e){
      var t = e.target; if (!t || !t.closest) return;
      if (t.closest('button,[role="button"],.opt,.chip,.tab,.cartao,.card,a')) toca('clique');
    }, true);
    /* Feedback: textos que aparecem na tela (acerto, erro, fim) */
    var RE_CERTO = /corre[tc]|certo|acert|parab[ée]ns|muito bem|isso mesmo|✅/i;
    var RE_ERRADO = /errad|incorret|errou|tente de novo|quase|❌/i;
    var RE_FIM = /fim de jogo|vencedor|vit[óo]ria|venceu|ganhou|resultado final|fim da (partida|atividade)|conclu[ií]d|terminou|🏆/i;
    function olha(no){
      if (!no || no.nodeType !== 1) return;
      var txt = (no.textContent || '').trim();
      if (!txt || txt.length > 140) return;
      if (RE_FIM.test(txt)) toca('fim');
      else if (RE_CERTO.test(txt)) toca('certo');
      else if (RE_ERRADO.test(txt)) toca('errado');
    }
    try{
      new MutationObserver(function(lista){
        lista.forEach(function(m){ for (var i = 0; i < m.addedNodes.length; i++) olha(m.addedNodes[i]); });
      }).observe(document.documentElement, {childList: true, subtree: true});
    }catch(e){}
  }

  function protecaoTela(){
    function campo(t){ return !!t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable); }
    document.addEventListener('contextmenu', function(e){ if(!campo(e.target)) e.preventDefault(); });
    document.addEventListener('keydown', function(e){
      var k = String(e.key || '').toLowerCase(), ctrl = e.ctrlKey || e.metaKey;
      if (e.key === 'F12' || (ctrl && (k === 'u' || k === 's')) || (ctrl && e.shiftKey && (k === 'i' || k === 'j' || k === 'c'))){
        e.preventDefault(); e.stopPropagation();
      }
    }, true);
    var st = document.createElement('style');
    st.textContent = 'body{-webkit-user-select:none;user-select:none}input,textarea,[contenteditable]{-webkit-user-select:text;user-select:text}';
    (document.head || document.documentElement).appendChild(st);
  }

  window.ResultadoJogo = window.ResultadoJogo || {};
  /* Insere o código de som/proteção antes de qualquer script do jogo */
  window.ResultadoJogo.preparar = function(html, tema){
    var tag = '<script>window.__gamificaTema=' + JSON.stringify(String(tema || '')) + ';(' + jogoPatch.toString() + ')();(' + somTematico.toString() + ')();(' + protecaoTela.toString() + ')();</script>';
    return /<head[^>]*>/i.test(html) ? html.replace(/<head[^>]*>/i, function(m){ return m + tag; }) : tag + html;
  };
  /* Proteção básica também na própria página do portal */
  window.ResultadoJogo.protegerPagina = function(){ try{ protecaoTela(); }catch(e){} };
  /* Marca d'água com o nome de quem está usando (desencoraja repasse e cópia de tela) */
  window.ResultadoJogo.marcaDagua = function(texto){
    window.ResultadoJogo.removerMarcaDagua();
    if(!texto) return null;
    var d = document.createElement('div'); d.id = 'marca-dagua'; d.setAttribute('aria-hidden', 'true');
    d.style.cssText = 'position:fixed;inset:-40%;z-index:2147483000;pointer-events:none;transform:rotate(-24deg);display:flex;flex-wrap:wrap;align-content:flex-start;gap:64px 80px;padding:30px;font:700 17px system-ui,Arial,sans-serif;color:rgba(30,41,59,.13);white-space:nowrap;user-select:none';
    for(var i = 0; i < 140; i++){ var sp = document.createElement('span'); sp.textContent = texto; d.appendChild(sp); }
    document.body.appendChild(d); return d;
  };
  window.ResultadoJogo.removerMarcaDagua = function(){ var d = document.getElementById('marca-dagua'); if(d && d.parentNode) d.parentNode.removeChild(d); };

  /* Liga/desliga o som do jogo que está no iframe */
  window.ResultadoJogo.somDoJogo = function(quadro, mudo){
    try{ if(quadro && quadro.contentWindow && quadro.contentWindow.__gamificaSomSet) quadro.contentWindow.__gamificaSomSet(mudo); }catch(e){}
  };
  /* Tela cheia do jogo (o próprio iframe ou o contêiner indicado) */
  window.ResultadoJogo.telaCheia = function(elemento){
    try{
      if(document.fullscreenElement) document.exitFullscreen();
      else if(elemento && elemento.requestFullscreen) elemento.requestFullscreen().catch(function(){});
    }catch(e){}
  };

  Object.assign(window.ResultadoJogo, {
    pdf: pdf,
    baixarWord: baixarWord,
    /* quadro: o iframe do jogo; titulo: nome da atividade (para o resultado) */
    anexar: function(quadro, titulo){
      quadro.addEventListener('load', function(){
        var win; try{ win = quadro.contentWindow; }catch(e){ return; }
        var G = win && win.GAMIFICA;
        if(!G || G.__resultadoLigado) return;
        G.__resultadoLigado = true;

        /* Quando o jogo termina e envia a nota, mostra o resultado final */
        var enviarOriginal = G.enviar;
        G.enviar = function(acertos, total, pontos){
          var r = typeof enviarOriginal === 'function' ? enviarOriginal.apply(G, arguments) : false;
          var a = Math.round(Number(acertos)), t = Math.round(Number(total));
          if(t >= 1 && a >= 0){
            if(a > t) a = t;
            mostrarResultado({
              aluno: G.aluno || 'Aluno(a) não identificado', serie: G.turma || '—', atividade: titulo || 'Atividade',
              acertos: a, total: t, nota: a / t * 10, pontos: Math.max(0, Math.round(Number(pontos) || 0)),
              data: new Date().toLocaleDateString('pt-BR') + ' às ' + new Date().toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit'})
            });
          }
          return r;
        };
      });
    }
  });
})();
