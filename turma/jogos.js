// Catálogo do portal Gamefica Ação Matemática.
// Os arquivos dos jogos ficam CIFRADOS na pasta protegido/ (só o servidor abre).
// Para incluir um jogo novo: node _ferramentas/proteger.mjs <id> <arquivo.html> e acrescente um item aqui.
// cor: amarelo | coral | verde | azul | lilas | laranja
// ferramenta: true = aparece só para quem tem conta (não vira atividade de turma).
window.JOGOS = {
  "aventura-do-pi": {
    nome: "Aventura do Pi",
    tema: "Geometria plana",
    desc: "Plataforma com portões de perímetro e área das figuras planas.",
    emoji: "🥧", cor: "laranja"
  },
  "dossie-geometrico": {
    nome: "Dossiê Geométrico",
    tema: "Figuras e sólidos",
    desc: "Investigação: abra as pistas e descubra qual é a figura geométrica.",
    emoji: "🕵️", cor: "coral"
  },
  "projeto-omega": {
    nome: "Projeto Ômega",
    tema: "Escape room",
    desc: "Resolva os enigmas das 4 portas antes que o tempo acabe.",
    emoji: "🔐", cor: "lilas"
  },
  "forca-financeira": {
    nome: "Forca Financeira",
    tema: "Educação Financeira",
    desc: "Adivinhe 10 termos de educação financeira antes que as moedas acabem.",
    emoji: "💰", cor: "verde"
  },
  "invasao-alienigena": {
    nome: "Invasão Alienígena",
    tema: "Porcentagem",
    desc: "Calcule porcentagens para defender a Terra dos invasores.",
    emoji: "👾", cor: "azul"
  },
  "estatistica-agrupados": {
    nome: "Laboratório Estatístico",
    tema: "Estatística",
    desc: "Tabela de frequências, média, mediana, moda, histograma e polígono.",
    emoji: "📊", cor: "amarelo"
  },
  "laboratorio-de-funcoes": {
    nome: "Laboratório de Funções",
    tema: "Função do 2º grau",
    desc: "Raízes, vértice e gráfico da parábola, passo a passo.",
    emoji: "📈", cor: "azul"
  },
  "geometria-espacial-3d": {
    nome: "Missão Geometria Espacial 3D",
    tema: "Geometria espacial",
    desc: "Conte vértices, arestas e faces dos sólidos girando em 3D.",
    emoji: "🧊", cor: "lilas"
  },
  "show-da-proporcao": {
    nome: "Show da Proporção",
    tema: "Proporcionalidade",
    desc: "Show de perguntas de regra de três valendo um milhão.",
    emoji: "🎤", cor: "amarelo"
  },
  "uno-potenciacao": {
    nome: "UNO da Potenciação",
    tema: "Potências",
    desc: "UNO contra o Prof. Robô com perguntas relâmpago de potências.",
    emoji: "🃏", cor: "coral"
  },
  "uno-radiciacao": {
    nome: "UNO da Radiciação",
    tema: "Raízes",
    desc: "UNO contra o Prof. Robô com perguntas relâmpago de raízes.",
    emoji: "🃏", cor: "verde"
  },
  "uno-fracoes-decimais": {
    nome: "UNO de Frações e Decimais",
    tema: "Frações",
    desc: "UNO contra o Prof. Robô: transforme frações em decimais.",
    emoji: "🃏", cor: "laranja"
  },
  "leitor-gabaritos": {
    nome: "Leitor de Gabaritos",
    tema: "Ferramenta do professor",
    desc: "Corrija cartões-resposta pela câmera do celular e veja as notas.",
    emoji: "📷", cor: "azul", ferramenta: true
  },
  "mapa-da-sala": {
    nome: "Mapa da Sala",
    tema: "Ferramenta do professor",
    desc: "Organize os grupos da sala por nível e imprima o mapa.",
    emoji: "🗺️", cor: "verde", ferramenta: true
  },
  "urna-eletronica": {
    nome: "Urna Eletrônica",
    tema: "Simulador",
    desc: "Simulador de votação com boletim de urna e zerésima.",
    emoji: "🗳️", cor: "amarelo", ferramenta: true
  },
  "laboratorio-probabilidade": {
    nome: "Laboratório de Probabilidade",
    tema: "Probabilidade",
    desc: "Lance dados e moedas, sorteie cartas e compare o observado com o teórico.",
    emoji: "🎲", cor: "lilas", ferramenta: true
  },
  "gerador-qrcode": {
    nome: "Gerador de QR Code",
    tema: "Ferramenta",
    desc: "Crie QR Codes com links ou textos e baixe a imagem em PNG.",
    emoji: "🔳", cor: "coral", ferramenta: true
  },
  "derivada-integral": {
    nome: "Derivada e Integral",
    tema: "Cálculo",
    desc: "Veja no gráfico a integral definida como área e a derivada como inclinação.",
    emoji: "∫", cor: "azul", ferramenta: true
  },
  "sorteador": {
    nome: "Sorteador de Alunos e Grupos",
    tema: "Ferramenta do professor",
    desc: "Sorteie quem responde (sem repetir) e forme grupos com líder em um toque.",
    emoji: "🎲", cor: "verde", ferramenta: true
  },
  "calculadora-notas": {
    nome: "Calculadora de Notas e Médias",
    tema: "Ferramenta do professor",
    desc: "Média ponderada passo a passo, quanto falta para fechar o bimestre e médias da turma.",
    emoji: "🧮", cor: "azul", ferramenta: true
  },
  "cronometro": {
    nome: "Cronômetro de Atividades",
    tema: "Ferramenta do professor",
    desc: "Contagem regressiva grande para projetar, com cores de alerta e alarme no fim.",
    emoji: "⏱️", cor: "laranja", ferramenta: true
  },
  "demo-porcentagem": {
    nome: "Quiz de teste",
    tema: "Porcentagem",
    desc: "Jogo curto (5 perguntas) para você testar o envio de notas.",
    emoji: "🧪", cor: "azul"
  }
};
