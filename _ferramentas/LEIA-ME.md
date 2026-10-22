# Ferramentas do portal Gamefica Ação Matemática

- `portal-fonte.html`: código do portal (sem dados).
- `construir.py`: monta o `index.html` com o código atual e os dados de um `index.html` existente.
  Uso: `python3 _ferramentas/construir.py index.html saida.html`
- `correio.mjs`: coloca atividades na caixa de correio do portal (cifradas com a chave pública).
  Uso: `node _ferramentas/correio.mjs index.html lote.json`
  Cada item do lote: titulo, desc, tema, emoji, cor (amarelo|coral|verde|azul|lilas|laranja), arquivo; `id` opcional para substituir uma atividade.
- `publicados.json`: arquivos da pasta HTMLs do professor que já foram publicados (para achar arquivos novos ou alterados).

Os dados dos participantes e das atividades ficam cifrados dentro do `index.html`; nenhuma senha fica aqui.
