import re,sys,json
S='/tmp/claude-0/-home-claude/b2788cff-0296-500c-9f83-db1cabe0b21b/scratchpad/'
src=open('/home/claude/pere-noel/app/index.html',encoding='utf-8').read()
bundle=open(S+'C/bundle.js',encoding='utf-8').read()
css=open(S+'C/20_elf.css',encoding='utf-8').read()
def R(a,b,n=1):
    global src
    assert src.count(a)>=1,a[:80]
    src=src.replace(a,b,n)
# 1. bundle + IMG selection + migration
old="const IMG=(prefs.style==='b')?Object.assign({},IMG_A,IMG_B):IMG_A;"
new="/* ===== style C (vectoriel, tout dessiné) ===== */\n"+bundle+"\nconst ELF_CSS_C="+json.dumps(css)+";\nif(!prefs.styleV){prefs.style='c';prefs.styleV=2;delete prefs.dev;savePrefs()}\nconst IMG=(prefs.style==='c')?Object.assign({},IMG_A,buildIMG_C()):(prefs.style==='b')?Object.assign({},IMG_A,IMG_B):IMG_A;\nif(prefs.style==='c'){const _s=document.createElement('style');_s.id='styleC';_s.textContent=ELF_CSS_C;document.head.appendChild(_s)}"
R(old,new)
# 2. defs
R("const RS=rigEnt('santa',760,1000,defSanta2);","const RS=rigEnt('santa',760,1000,prefs.style==='c'?defSantaC:defSanta2);")
R("const RM=rigEnt('mrs',760,1000,defMrs);","const RM=rigEnt('mrs',760,1000,prefs.style==='c'?defMrsC:defMrs);")
R("deer.R=rigEnt(null,760,1000,defDeer,'deer')","deer.R=rigEnt(null,760,1000,prefs.style==='c'?defDeerC:defDeer,'deer')")
R("elfSVG(HATS[i%6],BODIES[(i*5+2)%6],j.prop||'',j.tool||'')","(prefs.style==='c'?elfSVGC:elfSVG)(HATS[i%6],BODIES[(i*5+2)%6],j.prop||'',j.tool||'')")
# 3. defaults santa
R("const DEV_DEF={sFat:1.3,","const DEV_DEF={sFat:(prefs.style==='c'?1:1.3),")
R("sX:296,sY:1300,sM:1.62,","sX:(prefs.style==='c'?330:296),sY:(prefs.style==='c'?1360:1300),sM:(prefs.style==='c'?1.8:1.62),")
R("['sY','Père Noël : loin ↔ près',1120,1330,2]","['sY','Père Noël : loin ↔ près',1120,1420,2]")
R('#toast{z-index:900!important}','#toast{z-index:900!important}.sim i{font-size:min(.7rem,2.5vmin)!important;white-space:nowrap;overflow:hidden!important;text-overflow:ellipsis;max-width:100%}.sim button{min-width:0;overflow:hidden}#slots{gap:2px}#slots span{width:min(26px,5.6vmin)!important;height:min(26px,5.6vmin)!important;font-size:min(1rem,3.6vmin)!important}#card .tag{font-size:min(.8rem,3vmin)!important}#top{flex-wrap:nowrap}#top h1{min-width:0;overflow:hidden}.ib{flex:0 0 auto}')
# 4. style chips
R("[['a','🖼️ Illustrations'],['b','✏️ Dessin fait main']]","[['c','🎄 Livre de Noël'],['a','🖼️ Illustrations'],['b','✏️ Dessin fait main']]")
src=src.replace("(prefs.style||'a')","(prefs.style||'c')")
open('/home/claude/pere-noel/app/index.html','w',encoding='utf-8').write(src)
print('ok',len(src))
