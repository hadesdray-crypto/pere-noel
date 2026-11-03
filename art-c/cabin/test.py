import os,re,shutil
from playwright.sync_api import sync_playwright
D=os.path.dirname(os.path.abspath(__file__))
src=open('/home/claude/pere-noel/app/index.html',encoding='utf8').read()
frag=open(f'{D}/cabin.html').read(); css=open(f'{D}/cabin.css').read()
out=src.replace('<div id="grain"',frag+'<div id="grain"',1).replace('</head>',f'<style>{css}</style></head>',1)
open(f'{D}/app_test.html','w',encoding='utf8').write(out)
sizes=[(360,640),(390,844),(412,915),(800,1280),(844,390),(1024,768)]
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox','--allow-file-access-from-files'])
    def shot(w,h,name,big=False,off=False):
        pg=b.new_page(viewport={'width':w,'height':h},device_scale_factor=2)
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
        pg.goto(f'file://{D}/app_test.html');pg.wait_for_timeout(800)
        try: pg.click('#spGo',timeout=1500,force=True)
        except Exception as e: print('click',str(e)[:80])
        pg.wait_for_timeout(2500)
        if big: pg.add_style_tag(content='html{font-size:200%!important}#panel,#panel *{font-size:200%!important}')
        if off: pg.evaluate("document.getElementById('stage').classList.add('cabin-off')")
        pg.wait_for_timeout(500)
        r=pg.evaluate("(()=>{const s=document.getElementById('stage').getBoundingClientRect();const q=e=>{const r=document.querySelector(e).getBoundingClientRect();return [Math.round(r.width),Math.round(r.height)]};return {stage:[Math.round(s.width),Math.round(s.height)],roof:q('.cb-roof'),post:q('.cb-l'),base:q('.cb-base')}})()")
        pg.screenshot(path=f'{D}/{name}.png');print(name,r,errs);pg.close()
    for w,h in sizes: shot(w,h,f'shot_{w}x{h}')
    shot(390,844,'shot_text200',big=True)
    shot(390,844,'shot_off',off=True)
    b.close()
