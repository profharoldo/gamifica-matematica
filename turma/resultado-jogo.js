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
    ok.type = 'submit'; form.appendChild(ok); form.appendChild(aviso);
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
    var mudo = false, masters = [];
    window.__gamificaSomSet = function(m){ mudo = !!m; masters.forEach(function(g){ try{ g.gain.value = mudo ? 0 : 1; }catch(e){} }); };
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
  window.ResultadoJogo.preparar = function(html){
    var tag = '<script>(' + jogoPatch.toString() + ')();(' + protecaoTela.toString() + ')();</script>';
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

        /* Identificação obrigatória antes de jogar (se o jogo ainda não tem aluno) */
        if(!G.aluno) pedirIdentificacao(G);

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
