// Catálogo do portal Gamefica Ação Matemática.
// Os arquivos dos jogos ficam CIFRADOS na pasta protegido/ (só o servidor abre).
// Para incluir um jogo novo: node _ferramentas/proteger.mjs <id> <arquivo.html> e acrescente um item aqui.
// cor: amarelo | coral | verde | azul | lilas | laranja
// ferramenta: true = aparece só para quem tem conta (não vira atividade de turma).
// tipo: "simulador" | "ferramenta" (aba onde aparece; sem tipo = Jogos). conteudo: agrupa os jogos na aba Jogos.
window.JOGOS = {
  "aventura-do-pi": {
    nome: "Aventura do Pi",
    tema: "Geometria plana",
    desc: "Plataforma com portões de perímetro e área das figuras planas.",
    emoji: "🥧", cor: "laranja",
    conteudo: "Geometria"
  },
  "dossie-geometrico": {
    nome: "Dossiê Geométrico",
    tema: "Figuras e sólidos",
    desc: "Investigação: abra as pistas e descubra qual é a figura geométrica.",
    emoji: "🕵️", cor: "coral",
    conteudo: "Geometria"
  },
  "projeto-omega": {
    nome: "Projeto Ômega",
    tema: "Escape room",
    desc: "Resolva os enigmas das 4 portas antes que o tempo acabe.",
    emoji: "🔐", cor: "lilas",
    conteudo: "Desafios"
  },
  "forca-financeira": {
    nome: "Forca Financeira",
    tema: "Educação Financeira",
    desc: "Adivinhe 10 termos de educação financeira antes que as moedas acabem.",
    emoji: "💰", cor: "verde",
    conteudo: "Educação Financeira"
  },
  "orcamento-em-familia": {
    nome: "Orçamento em Família",
    tema: "Educação Financeira",
    desc: "Cuide do dinheiro de uma família por 6 meses: contas, imprevistos, golpes e ranking.",
    emoji: "🏠", cor: "verde",
    conteudo: "Educação Financeira"
  },
  "invasao-alienigena": {
    nome: "Invasão Alienígena",
    tema: "Porcentagem",
    desc: "Calcule porcentagens para defender a Terra dos invasores.",
    emoji: "👾", cor: "azul",
    conteudo: "Proporção e porcentagem"
  },
  "estatistica-agrupados": {
    nome: "Laboratório Estatístico",
    tema: "Estatística",
    desc: "Tabela de frequências, média, mediana, moda, histograma e polígono.",
    emoji: "📊", cor: "amarelo",
    conteudo: "Estatística e probabilidade"
  },
  "laboratorio-de-funcoes": {
    nome: "Laboratório de Funções",
    tema: "Função do 2º grau",
    desc: "Raízes, vértice e gráfico da parábola, passo a passo.",
    emoji: "📈", cor: "azul",
    conteudo: "Funções e trigonometria"
  },
  "geometria-espacial-3d": {
    nome: "Missão Geometria Espacial 3D",
    tema: "Geometria espacial",
    desc: "Conte vértices, arestas e faces dos sólidos girando em 3D.",
    emoji: "🧊", cor: "lilas",
    conteudo: "Geometria"
  },
  "show-da-proporcao": {
    nome: "Show da Proporção",
    tema: "Proporcionalidade",
    desc: "Show de perguntas de regra de três valendo um milhão.",
    emoji: "🎤", cor: "amarelo",
    conteudo: "Proporção e porcentagem"
  },
  "uno-potenciacao": {
    nome: "UNO da Potenciação",
    tema: "Potências",
    desc: "UNO contra o Prof. Robô com perguntas relâmpago de potências.",
    emoji: "🃏", cor: "coral",
    conteudo: "Números e operações"
  },
  "uno-radiciacao": {
    nome: "UNO da Radiciação",
    tema: "Raízes",
    desc: "UNO contra o Prof. Robô com perguntas relâmpago de raízes.",
    emoji: "🃏", cor: "verde",
    conteudo: "Números e operações"
  },
  "uno-fracoes-decimais": {
    nome: "UNO de Frações e Decimais",
    tema: "Frações",
    desc: "UNO contra o Prof. Robô: transforme frações em decimais.",
    emoji: "🃏", cor: "laranja",
    conteudo: "Números e operações"
  },
  "roda-gigante": {
    nome: "Roda-Gigante Trigonométrica",
    tema: "Trigonometria",
    desc: "A cabine gira e a altura vira gráfico: seno, cosseno, quadrantes e ângulos notáveis.",
    emoji: "🎡", cor: "lilas",
    conteudo: "Funções e trigonometria"
  },
  "leitor-gabaritos": {
    nome: "Leitor de Gabaritos",
    tema: "Ferramenta do professor",
    desc: "Corrija cartões-resposta pela câmera do celular e veja as notas.",
    emoji: "📷", cor: "azul", ferramenta: true,
    tipo: "ferramenta"
  },
  "mapa-da-sala": {
    nome: "Mapa da Sala",
    tema: "Ferramenta do professor",
    desc: "Organize os grupos da sala por nível e imprima o mapa.",
    emoji: "🗺️", cor: "verde", ferramenta: true,
    tipo: "ferramenta"
  },
  "urna-eletronica": {
    nome: "Urna Eletrônica",
    tema: "Simulador",
    desc: "Simulador de votação com boletim de urna e zerésima.",
    emoji: "🗳️", cor: "amarelo", ferramenta: true,
    tipo: "simulador"
  },
  "laboratorio-probabilidade": {
    nome: "Laboratório de Probabilidade",
    tema: "Probabilidade",
    desc: "Lance dados e moedas, sorteie cartas e compare o observado com o teórico.",
    emoji: "🎲", cor: "lilas", ferramenta: true,
    tipo: "simulador"
  },
  "gerador-qrcode": {
    nome: "Gerador de QR Code",
    tema: "Ferramenta",
    desc: "Crie QR Codes com links ou textos e baixe a imagem em PNG.",
    emoji: "🔳", cor: "coral", ferramenta: true,
    tipo: "ferramenta"
  },
  "derivada-integral": {
    nome: "Derivada e Integral",
    tema: "Cálculo",
    desc: "Veja no gráfico a integral definida como área e a derivada como inclinação.",
    emoji: "∫", cor: "azul", ferramenta: true,
    tipo: "simulador"
  },
  "sorteador": {
    nome: "Sorteador de Alunos e Grupos",
    tema: "Ferramenta do professor",
    desc: "Sorteie quem responde (sem repetir) e forme grupos com líder em um toque.",
    emoji: "🎲", cor: "verde", ferramenta: true,
    tipo: "ferramenta"
  },
  "calculadora-notas": {
    nome: "Calculadora de Notas e Médias",
    tema: "Ferramenta do professor",
    desc: "Escolha as avaliações e os pesos, cole os nomes, digite as notas e veja quem foi aprovado.",
    emoji: "🧮", cor: "azul", ferramenta: true,
    tipo: "ferramenta"
  },
  "cronometro": {
    nome: "Cronômetro de Atividades",
    tema: "Ferramenta do professor",
    desc: "Contagem regressiva grande para projetar, com cores de alerta e alarme no fim.",
    emoji: "⏱️", cor: "laranja", ferramenta: true,
    tipo: "ferramenta"
  },
  "bingo": {
    nome: "Bingo Matemático",
    tema: "Ferramenta do professor",
    desc: "Sorteie contas no telão; os alunos calculam e marcam a resposta na cartela impressa.",
    emoji: "🎯", cor: "coral", ferramenta: true,
    tipo: "ferramenta"
  },
  "geoplano": {
    nome: "Geoplano Digital",
    tema: "Geometria plana",
    desc: "Estique elásticos nos pinos: área, perímetro, Pitágoras e simetria, com 10 desafios.",
    emoji: "📐", cor: "laranja",
    tipo: "simulador", conteudo: "Geometria"
  },
  "domino-equivalencias": {
    nome: "Dominó de Equivalências",
    tema: "Frações, decimais e %",
    desc: "Dominó contra o robô: encaixe frações, decimais, porcentagens e desenhos que valem o mesmo.",
    emoji: "🁫", cor: "azul",
    conteudo: "Números e operações"
  },
  "cofre-combinacoes": {
    nome: "Cofre das Combinações",
    tema: "Análise combinatória",
    desc: "Abra 10 cofres resolvendo problemas de princípio multiplicativo, fatorial, permutação, arranjo e combinação.",
    emoji: "🔐", cor: "lilas",
    conteudo: "Estatística e probabilidade"
  },
  "escada-progressoes": {
    nome: "Escada das Progressões",
    tema: "PA e PG",
    desc: "Suba 10 degraus resolvendo PA e PG: próximo termo, razão, termo geral, soma e problemas do dia a dia.",
    emoji: "🪜", cor: "amarelo",
    conteudo: "Álgebra"
  },
  "batalha-naval": {
    nome: "Batalha Naval Cartesiana",
    tema: "Plano cartesiano",
    desc: "Batalha naval contra o robô: leia e localize pontos (x, y), com radar de distância e ponto médio.",
    emoji: "🚢", cor: "azul",
    conteudo: "Geometria"
  },
  "balanca-equacoes": {
    nome: "Balança das Equações",
    tema: "Equações do 1º grau",
    desc: "Equilibre a balança fazendo a mesma operação nos dois lados até deixar o x sozinho.",
    emoji: "⚖️", cor: "verde",
    conteudo: "Álgebra"
  },
  "missao-trigonometria": {
    nome: "Missão Trigonometria",
    tema: "Seno, cosseno e tangente",
    desc: "Meça prédios, rampas, escadas e pipas usando o triângulo retângulo e os ângulos notáveis.",
    emoji: "📐", cor: "azul",
    conteudo: "Funções e trigonometria"
  },
  "supermercado-inteligente": {
    nome: "Supermercado Inteligente",
    tema: "Preço por unidade, desconto e troco",
    desc: "Compare embalagens, calcule descontos, promoções leve 3 pague 2 e o troco certo.",
    emoji: "🛒", cor: "verde",
    conteudo: "Educação Financeira"
  },
  "demo-porcentagem": {
    nome: "Quiz de teste",
    tema: "Porcentagem",
    desc: "Jogo curto (5 perguntas) para você testar o envio de notas.",
    emoji: "🧪", cor: "azul",
    conteudo: "Proporção e porcentagem"
  }
};
