/* Ponte entre os jogos e o portal da turma (Gamefica Ação Matemática).
   - Recebe do portal o nome e a turma do aluno.
   - Envia ao portal a nota quando o jogo termina.
   Fora do portal (arquivo aberto sozinho) ou no modo livre não faz nada. */
(function(){
  'use strict';
  var noPortal = false;
  try { noPortal = window.parent && window.parent !== window; } catch(e){ noPortal = true; }
  // Aberto pelo próprio portal (professor/assinante): jogo completo, sem envio de nota
  if (/(^|#)livre\b/.test(location.hash || '')) noPortal = false;

  var ouvintes = [];
  var campos = [];
  var contagem = {certas: 0, total: 0};

  function preencher(c){
    if (!G.aluno) return;
    var el = document.querySelector(c.sel);
    if (!el || el.dataset.gamificaNome === '1') return;
    el.value = G.aluno.slice(0, c.max || 80);
    el.readOnly = true;
    el.title = 'Nome informado ao abrir a atividade';
    el.dataset.gamificaNome = '1';
    try { el.dispatchEvent(new Event('input', {bubbles: true})); } catch(e){}
  }
  function preencherTodos(){ campos.forEach(preencher); }

  var G = window.GAMIFICA = {
    noPortal: noPortal,
    aluno: '',
    /* Estado guardado pelo jogo na tentativa anterior (se o aluno recarregou a página) */
    estado: null,
    /* Guarda o andamento do jogo (objeto simples). Chame a cada fase/pergunta; ao recarregar, G.estado volta aqui. */
    salvarEstado: function(obj){ if(!noPortal) return false; try { window.parent.postMessage({tipo: 'gamifica-estado', estado: obj}, '*'); return true; } catch(e){ return false; } },
    turma: '',
    /* Chama fn(nome, turma) quando o nome do aluno chegar */
    aoReceberAluno: function(fn){ if (G.aluno) fn(G.aluno, G.turma); else ouvintes.push(fn); },
    /* Coloca o nome do aluno no campo indicado (e trava), mesmo se ele aparecer depois */
    preencherNome: function(seletor, max){ campos.push({sel: seletor, max: max}); preencherTodos(); },
    /* Envia a nota: acertos de um total (a nota é acertos ÷ total × 10) */
    enviar: function(acertos, total, pontos){
      if (!noPortal) return false;
      acertos = Math.round(Number(acertos)); total = Math.round(Number(total));
      if (!(total >= 1) || !(acertos >= 0)) return false;
      if (acertos > total) acertos = total;
      if (total > 200){ acertos = Math.round(acertos * 100 / total); total = 100; }
      pontos = Math.max(0, Math.round(Number(pontos) || 0));
      try { window.parent.postMessage({tipo: 'gamifica-resultado', acertos: acertos, total: total, pontos: pontos}, '*'); } catch(e){ return false; }
      return true;
    },
    /* Contador simples de perguntas (para jogos com perguntas espalhadas) */
    zerar: function(){ contagem.certas = 0; contagem.total = 0; },
    contar: function(certa){ contagem.total++; if (certa) contagem.certas++; },
    contagem: function(){ return {certas: contagem.certas, total: contagem.total}; },
    enviarContagem: function(pontos){ return contagem.total ? G.enviar(contagem.certas, contagem.total, pontos) : false; },
    /* Aviso discreto na tela do jogo */
    aviso: function(texto){
      if (!noPortal) return;
      var d = document.getElementById('gamifica-aviso');
      if (!d){
        d = document.createElement('div');
        d.id = 'gamifica-aviso';
        d.setAttribute('role', 'status');
        d.style.cssText = 'position:fixed;left:50%;bottom:18px;transform:translateX(-50%);z-index:2147483647;' +
          'background:#065f46;color:#fff;font:700 15px system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;' +
          'padding:10px 18px;border-radius:999px;box-shadow:0 8px 24px rgba(0,0,0,.35);max-width:92vw;text-align:center;transition:opacity .4s';
        document.body.appendChild(d);
      }
      d.textContent = texto; d.style.opacity = '1';
      clearTimeout(d._t); d._t = setTimeout(function(){ d.style.opacity = '0'; }, 6000);
    }
  };

  if (!noPortal) return;

  window.addEventListener('message', function(ev){
    if (ev.source !== window.parent) return;
    var d = ev.data;
    if (!d || d.tipo !== 'gamifica-aluno' || typeof d.nome !== 'string') return;
    G.aluno = d.nome.trim().replace(/\s+/g, ' ');
    G.turma = typeof d.turma === 'string' ? d.turma.trim() : '';
    G.estado = (d.estado && typeof d.estado === 'object') ? d.estado : null;
    preencherTodos();
    var fs = ouvintes; ouvintes = [];
    fs.forEach(function(fn){ try { fn(G.aluno, G.turma); } catch(e){} });
  });

  function observar(){
    try { new MutationObserver(preencherTodos).observe(document.body, {childList: true, subtree: true}); } catch(e){}
  }
  if (document.body) observar(); else document.addEventListener('DOMContentLoaded', observar);
})();
