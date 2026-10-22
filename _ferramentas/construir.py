"""Monta o index.html do site a partir do código (portal.html) e dos dados de um index.html existente."""
import re, json, sys
fonte_dados, saida = sys.argv[1], sys.argv[2]
base = sys.argv[3] if len(sys.argv) > 3 else 'https://profharoldo.github.io/gamifica-matematica/'
s = open(__import__('os').path.join(__import__('os').path.dirname(__file__),'portal-fonte.html'), encoding='utf8').read()
cur = open(fonte_dados, encoding='utf8').read()
data = re.search(r'<script type="application/json" id="portalData">(.*?)</script>', cur, re.S).group(1)
d = json.loads(data) if data.strip() not in ('', '{}') else {'site': {'nome': 'Portal de Matemática', 'subtitulo': 'Matemática de um jeito lúdico'}}
css = re.search(r'<style id="appStyle">(.*?)</style>', s, re.S).group(1)
js = re.search(r'<script id="portalApp">(.*)</script>', s, re.S).group(1)
fonts = re.search(r'(<link id="fonts"[^>]*>)', s).group(1)
reset = ':root{color-scheme:light;box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}html{scroll-padding-top:env(safe-area-inset-top,0px)}body{margin:0;padding:0;font:14px -apple-system,BlinkMacSystemFont,sans-serif;background:#fff;color:#000}img{max-width:100%}[hidden]{display:none!important}'
icone = 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%3E%3Crect%20x%3D%224%22%20y%3D%224%22%20width%3D%2256%22%20height%3D%2256%22%20rx%3D%2214%22%20fill%3D%22%23ffd23f%22%2F%3E%3Ctext%20x%3D%2232%22%20y%3D%2246%22%20font-size%3D%2238%22%20text-anchor%3D%22middle%22%20font-family%3D%22Georgia%2Cserif%22%20font-weight%3D%22700%22%20fill%3D%22%231d2b53%22%3E%CF%80%3C%2Ftext%3E%3C%2Fsvg%3E'
nome, desc = d['site']['nome'], d['site']['subtitulo']
m = lambda a, k, v: f'<meta {a}="{k}" content="{v}">\n'
html = ('<!doctype html>\n<html lang="pt-BR">\n<head>\n<meta charset="utf-8">\n'
  f'<title>{nome}</title>\n' + m('name','description',desc) + m('property','og:type','website') + m('property','og:site_name',nome)
  + m('property','og:title',nome) + m('property','og:description',desc) + m('property','og:url',base) + m('property','og:image',base+'capa.png')
  + m('property','og:image:width','1200') + m('property','og:image:height','630') + m('property','og:locale','pt_BR')
  + m('name','twitter:card','summary_large_image') + m('name','twitter:image',base+'capa.png') + m('name','theme-color','#ffd23f')
  + '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n'
  f'<link rel="icon" href="{icone}">\n{fonts}\n<style id="reset">{reset}</style>\n<style id="appStyle">{css}</style>\n</head>\n<body>\n<div id="app"></div>\n'
  f'<script type="application/json" id="portalData">{data}</script>\n<script id="portalApp">{js}</script>\n</body>\n</html>\n')
open(saida, 'w', encoding='utf8').write(html)
print('montado:', saida, len(html), 'bytes')
