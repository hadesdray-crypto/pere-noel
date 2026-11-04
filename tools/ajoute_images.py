"""Découpe les planches d'images de jouets (5 colonnes x 4 lignes) et les range dans l'appli.
Usage : python tools/ajoute_images.py dossier_des_planches   (p1.png, p2.png, p3.png)"""
import sys, json, base64, io, re, unicodedata
from PIL import Image, ImageChops
def slug(n):
    n = unicodedata.normalize('NFD', n.lower()); n = ''.join(c for c in n if unicodedata.category(c) != 'Mn')
    return re.sub(r'^-|-$', '', re.sub(r'[^a-z0-9]+', '-', n))
SKIP = {'Un iPhone','Un smartphone Samsung Galaxy','Une Nintendo Switch','Une PlayStation 5','Une Xbox','Des écouteurs sans fil','Une montre connectée','Un pistolet Nerf','Une peluche Pikachu','Une poupée Elsa qui chante','Un costume de Spider-Man',"Une Pat'Patrouille : la tour de contrôle",'Un jeu de société en famille'}  # personnages / marques reconnaissables : pas d'image (risque de droits)
P = json.load(open('tools/planches.json')); D = sys.argv[1]; out = {}
for k, names in enumerate(P, 1):
    try: im = Image.open(f'{D}/p{k}.png').convert('RGB')
    except Exception: print('planche absente', k); continue
    W, H = im.size; cw, ch = W / 5, H / 4
    for n, name in enumerate(names):
        c, r = n % 5, n // 5
        if name in SKIP: continue
        cell = im.crop((int(c*cw)+4, int(r*ch)+4, int((c+1)*cw)-4, int((r+1)*ch)-4))
        bg = Image.new('RGB', cell.size, cell.getpixel((3, 3)))
        diff = ImageChops.difference(cell, bg).convert('L').point(lambda v: 255 if v > 28 else 0)
        box = diff.getbbox()
        if not box: print('vide', name); continue
        cell = cell.crop(box)
        a = diff.crop(box).filter(__import__('PIL.ImageFilter', fromlist=['x']).MaxFilter(5)).filter(__import__('PIL.ImageFilter', fromlist=['x']).GaussianBlur(1.5))
        rgba = cell.convert('RGBA'); rgba.putalpha(a)
        s = 300 / max(rgba.size); rgba = rgba.resize((max(1, int(rgba.width*s)), max(1, int(rgba.height*s))), Image.LANCZOS)
        b = io.BytesIO(); rgba.save(b, 'WEBP', quality=82, method=6)
        out[slug(name)] = 'data:image/webp;base64,' + base64.b64encode(b.getvalue()).decode()
h = open('app/index.html', encoding='utf-8').read()
m = re.search(r'const TOYPICS=\{.*?\};\nfunction toySlug', h, re.S)
h = h[:m.start()] + 'const TOYPICS=' + json.dumps(out, ensure_ascii=False) + ';\nfunction toySlug' + h[m.end():]
open('app/index.html', 'w', encoding='utf-8').write(h)
print(len(out), 'images intégrées')
