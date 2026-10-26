// Lista de jogos que o professor pode atribuir.
// Para incluir um jogo novo: coloque o arquivo .html na pasta "jogos" e acrescente um item aqui.
// cor: amarelo | coral | verde | azul | lilas | laranja (as mesmas cores do portal)
// Cada jogo usa a ponte "jogos/ponte-portal.js" para receber o nome do aluno e enviar a nota.
window.JOGOS = {
  "aventura-do-pi": {
    nome: "Aventura do Pi",
    tema: "Geometria plana",
    desc: "Plataforma com portões de perímetro e área das figuras planas.",
    arquivo: "jogos/aventura-do-pi.html",
    emoji: "🥧", cor: "laranja"
  },
  "dossie-geometrico": {
    nome: "Dossiê Geométrico",
    tema: "Figuras e sólidos",
    desc: "Investigação: abra as pistas e descubra qual é a figura geométrica.",
    arquivo: "jogos/dossie-geometrico.html",
    emoji: "🕵️", cor: "coral"
  },
  "projeto-omega": {
    nome: "Projeto Ômega",
    tema: "Escape room",
    desc: "Resolva os enigmas das 4 portas antes que o tempo acabe.",
    arquivo: "jogos/projeto-omega.html",
    emoji: "🔐", cor: "lilas"
  },
  "forca-financeira": {
    nome: "Forca Financeira",
    tema: "Educação Financeira",
    desc: "Adivinhe 10 termos de educação financeira antes que as moedas acabem.",
    arquivo: "jogos/forca-financeira.html",
    emoji: "💰", cor: "verde"
  },
  "invasao-alienigena": {
    nome: "Invasão Alienígena",
    tema: "Porcentagem",
    desc: "Calcule porcentagens para defender a Terra dos invasores.",
    arquivo: "jogos/invasao-alienigena.html",
    emoji: "👾", cor: "azul"
  },
  "estatistica-agrupados": {
    nome: "Laboratório Estatístico",
    tema: "Estatística",
    desc: "Tabela de frequências, média, mediana, moda, histograma e polígono.",
    arquivo: "jogos/estatistica-agrupados.html",
    emoji: "📊", cor: "amarelo"
  },
  "laboratorio-de-funcoes": {
    nome: "Laboratório de Funções",
    tema: "Função do 2º grau",
    desc: "Raízes, vértice e gráfico da parábola, passo a passo.",
    arquivo: "jogos/laboratorio-de-funcoes.html",
    emoji: "📈", cor: "azul"
  },
  "geometria-espacial-3d": {
    nome: "Missão Geometria Espacial 3D",
    tema: "Geometria espacial",
    desc: "Conte vértices, arestas e faces dos sólidos girando em 3D.",
    arquivo: "jogos/geometria-espacial-3d.html",
    emoji: "🧊", cor: "lilas"
  },
  "show-da-proporcao": {
    nome: "Show da Proporção",
    tema: "Proporcionalidade",
    desc: "Show de perguntas de regra de três valendo um milhão.",
    arquivo: "jogos/show-da-proporcao.html",
    emoji: "🎤", cor: "amarelo"
  },
  "uno-potenciacao": {
    nome: "UNO da Potenciação",
    tema: "Potências",
    desc: "UNO contra o Prof. Robô com perguntas relâmpago de potências.",
    arquivo: "jogos/uno-potenciacao.html",
    emoji: "🃏", cor: "coral"
  },
  "uno-radiciacao": {
    nome: "UNO da Radiciação",
    tema: "Raízes",
    desc: "UNO contra o Prof. Robô com perguntas relâmpago de raízes.",
    arquivo: "jogos/uno-radiciacao.html",
    emoji: "🃏", cor: "verde"
  },
  "uno-fracoes-decimais": {
    nome: "UNO de Frações e Decimais",
    tema: "Frações",
    desc: "UNO contra o Prof. Robô: transforme frações em decimais.",
    arquivo: "jogos/uno-fracoes-decimais.html",
    emoji: "🃏", cor: "laranja"
  },
  "demo-porcentagem": {
    nome: "Quiz de teste",
    tema: "Porcentagem",
    desc: "Jogo curto (5 perguntas) para você testar o envio de notas.",
    arquivo: "jogos/demo-porcentagem.html",
    emoji: "🧪", cor: "azul"
  }
};
