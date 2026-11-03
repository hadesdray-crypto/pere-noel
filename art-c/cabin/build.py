import urllib.parse
O='#4a2418'
def uri(svg):
    return 'url("data:image/svg+xml,'+urllib.parse.quote(svg,safe="/:=' ,;().-")+'")'
def svg(w,h,body,defs=''):
    return f"<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 {w} {h}'><defs>{defs}</defs>{body}</svg>"
S=f"stroke='{O}' stroke-width='3' stroke-linejoin='round' stroke-linecap='round'"
# ---------- toit : tuile 200x100 ----------
roof_defs="""<linearGradient id='w' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#d9a066'/><stop offset='.5' stop-color='#a9703d'/><stop offset='1' stop-color='#7a4a2a'/></linearGradient>
<linearGradient id='g' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#3f9a65'/><stop offset='1' stop-color='#1f5538'/></linearGradient>
<radialGradient id='b1' cx='.35' cy='.3' r='.8'><stop offset='0' stop-color='#ee5a4f'/><stop offset='1' stop-color='#9f2420'/></radialGradient>
<radialGradient id='b2' cx='.35' cy='.3' r='.8'><stop offset='0' stop-color='#fff0a8'/><stop offset='1' stop-color='#b98a22'/></radialGradient>
<radialGradient id='lt' cx='.5' cy='.5' r='.5'><stop offset='0' stop-color='#fff6b8'/><stop offset='.45' stop-color='#ffd25a'/><stop offset='1' stop-color='#ffb347' stop-opacity='0'/></radialGradient>"""
r=''
# bardeaux : 3 rangees
for row in range(3):
    y=8+row*16
    off=0 if row%2==0 else -20
    for i in range(-1,6):
        x=off+i*40
        col=['#d2342f','#b92b27'][(i+row)%2]
        r+=f"<path d='M{x} {y} h40 v6 a20 13 0 0 1 -40 0z' fill='{col}' {S}/>"
        r+=f"<path d='M{x+8} {y+5} q4 4 10 4' fill='none' stroke='#ff8a7a' stroke-width='2.2' stroke-linecap='round' opacity='.7'/>"
# neige sur le faite
r+="<path d='M0 0 H200 V7 Q190 15 180 8 Q168 17 156 8 Q144 14 132 7 Q120 17 108 8 Q96 15 84 7 Q72 17 60 8 Q48 14 36 7 Q24 17 12 8 Q6 12 0 7z' fill='#f4f8ff' "+S+"/>"
r+="<path d='M8 3 H70 M110 3 H170' stroke='#fff' stroke-width='2' stroke-linecap='round' opacity='.9'/>"
# planche d'avant-toit
r+=f"<rect x='-2' y='52' width='204' height='14' rx='2' fill='url(#w)' {S}/>"
r+="<path d='M0 55 H200' stroke='#fff0a8' stroke-width='2' opacity='.55'/><path d='M0 63 H200' stroke='#f0c04a' stroke-width='2' opacity='.8'/>"
for x in (20,60,100,140,180): r+=f"<circle cx='{x}' cy='59' r='2.4' fill='#f0c04a' stroke='{O}' stroke-width='1.4'/>"
# guirlande
r+=f"<path d='M0 68 Q50 100 100 68 Q150 100 200 68' fill='none' stroke='{O}' stroke-width='9' stroke-linecap='round'/>"
r+="<path d='M0 68 Q50 100 100 68 Q150 100 200 68' fill='none' stroke='url(#g)' stroke-width='6' stroke-linecap='round'/>"
r+="<path d='M0 66.5 Q50 98 100 66.5 Q150 98 200 66.5' fill='none' stroke='#6fc48a' stroke-width='1.6' stroke-linecap='round' opacity='.8' stroke-dasharray='6 5'/>"
def bez(t,p0=68,p1=100,p2=68): return (1-t)**2*p0+2*t*(1-t)*p1+t*t*p2
for base,(xs) in ((0,(25,50,75)),(100,(125,150,175))):
    for k,x in enumerate(xs):
        t=(x-base)/100; y=bez(t)+1
        if k==1:
            r+=f"<path d='M{x} {y} v6' stroke='{O}' stroke-width='2.2'/><circle cx='{x}' cy='{y+12}' r='7' fill='url(#{'b2' if base==0 else 'b1'})' {S}/><circle cx='{x-2.3}' cy='{y+9.5}' r='1.8' fill='#fff' opacity='.85'/>"
        else:
            r+=f"<circle cx='{x}' cy='{y+2}' r='7.5' fill='url(#lt)'/><circle cx='{x}' cy='{y+1}' r='2.6' fill='#fff6b8' stroke='{O}' stroke-width='1.2'/>"
for x in (0,100,200):
    r+=f"<circle cx='{x}' cy='68' r='5' fill='url(#b2)' {S}/>"
roof=svg(200,100,r,roof_defs)
# ---------- montant : tuile 40x120 ----------
post_defs="""<linearGradient id='c' x1='0' y1='0' x2='1' y2='0'><stop offset='0' stop-color='#7a4a2a'/><stop offset='.28' stop-color='#d9a066'/><stop offset='.6' stop-color='#a9703d'/><stop offset='1' stop-color='#6b3f22'/></linearGradient>
<linearGradient id='gd' x1='0' y1='0' x2='1' y2='0'><stop offset='0' stop-color='#b98a22'/><stop offset='.3' stop-color='#fff0a8'/><stop offset='.65' stop-color='#f0c04a'/><stop offset='1' stop-color='#b98a22'/></linearGradient>"""
p=f"<rect x='9' y='-2' width='22' height='204' fill='url(#c)' {S}/>"
p+="<path d='M16 8 V192 M25 8 V192' stroke='#7a4a2a' stroke-width='1.3' opacity='.4'/>"
p+=f"<ellipse cx='20' cy='100' rx='17' ry='11' fill='url(#c)' {S}/><path d='M8 96 Q20 90 32 96' fill='none' stroke='#ffe6b0' stroke-width='2' opacity='.6' stroke-linecap='round'/>"
for y in (4,196):
    p+=f"<rect x='4' y='{y-5}' width='32' height='10' rx='4' fill='url(#gd)' {S}/>"
for y in (52,148):
    p+=f"<rect x='7' y='{y-3}' width='26' height='6' rx='3' fill='url(#gd)' {S}/>"
p+=f"<circle cx='20' cy='100' r='3.4' fill='url(#gd)' stroke='{O}' stroke-width='1.6'/><path d='M18 100 h4 M20 98 v4' stroke='{O}' stroke-width='1'/>"
post=svg(40,200,p,post_defs)
# ---------- base : tuile 120x60 ----------
base_defs=post_defs.replace("x2='1' y2='0'><stop offset='0' stop-color='#7a4a2a'/><stop offset='.28' stop-color='#d9a066'/><stop offset='.6' stop-color='#a9703d'/><stop offset='1' stop-color='#6b3f22'/>","x2='0' y2='1'><stop offset='0' stop-color='#e8b27a'/><stop offset='.4' stop-color='#b9803f'/><stop offset='1' stop-color='#8a5530'/>")
b=f"<rect x='-2' y='14' width='124' height='48' fill='#a9703d' {S}/>"
b+="<rect x='1' y='16' width='118' height='44' fill='#b27743' opacity='.0'/>"
b+=f"<path d='M60 15 V61' stroke='{O}' stroke-width='3'/>"
b+="<path d='M8 28 Q30 25 52 28 M68 34 Q90 31 112 34 M10 46 Q30 44 50 47 M70 22 Q92 24 112 21' fill='none' stroke='#7a4a2a' stroke-width='1.6' opacity='.45' stroke-linecap='round'/>"
b+="<rect x='1' y='52' width='118' height='8' fill='#7a4a2a' opacity='.55'/>"
b+=f"<rect x='-2' y='-1' width='124' height='17' rx='5' fill='url(#c)' {S}/>"
b+="<path d='M3 4.5 H117' stroke='#fff0a8' stroke-width='2.4' stroke-linecap='round' opacity='.7'/><path d='M3 12 H117' stroke='#f0c04a' stroke-width='1.8' opacity='.7'/>"
for x,y in ((12,38),(48,38),(72,38),(108,38)):
    b+=f"<circle cx='{x}' cy='{y}' r='3.6' fill='url(#gd)' stroke='{O}' stroke-width='1.6'/><path d='M{x-2} {y} h4' stroke='{O}' stroke-width='1.2'/>"
base=svg(120,60,b,base_defs.replace("id='c'","id='c'"))
# ---------- crochet + corde (fragment HTML) ----------
hook=f"""<svg class="cb-hang" viewBox="0 0 60 60" aria-hidden="true" focusable="false">
<defs><linearGradient id="cbGd" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff0a8"/><stop offset=".5" stop-color="#f0c04a"/><stop offset="1" stop-color="#b98a22"/></linearGradient></defs>
<g fill="none" stroke-linecap="round" stroke-linejoin="round">
<path d="M30 33 L9 -4 M30 33 L51 -4" stroke="{O}" stroke-width="7"/>
<path d="M30 33 L9 -4 M30 33 L51 -4" stroke="#d9b072" stroke-width="4.2"/>
<path d="M30 33 L9 -4 M30 33 L51 -4" stroke="#8a6030" stroke-width="4.2" stroke-dasharray="1.6 3.2"/>
</g>
<path d="M22 30 h16 v14 q0 10 -8 10 q-8 0 -8 -10z" fill="#a9703d" stroke="{O}" stroke-width="2.4" stroke-linejoin="round"/>
<path d="M24 32 h4" stroke="#ffe6b0" stroke-width="1.6" stroke-linecap="round"/>
<circle cx="30" cy="30" r="9.5" fill="none" stroke="{O}" stroke-width="7.6"/>
<circle cx="30" cy="30" r="9.5" fill="none" stroke="url(#cbGd)" stroke-width="4.4"/>
<path d="M24 25 q3 -4 8 -4" fill="none" stroke="#fff" stroke-width="1.4" stroke-linecap="round" opacity=".8"/>
<circle cx="30" cy="48" r="2.4" fill="url(#cbGd)" stroke="{O}" stroke-width="1.2"/>
</svg>"""
css=f"""/* ===== CABANE : cadre en bois overlay (enfant de #stage, au-dessus du monde, sous bulles/cartes/UI) ===== */
#cabin{{position:absolute;inset:0;z-index:60;pointer-events:none;container-type:size;
  --H:min(12cqh,23cqw);--B:min(6cqh,15cqw);--P:min(3.3cqw,10cqh)}}
#cabin *{{pointer-events:none}}
/* repli sans unités de conteneur */
@supports not (container-type:size){{#cabin{{--H:12%;--B:6%;--P:4%}}}}
#cabin .cb-roof{{position:absolute;left:0;right:0;top:0;height:var(--H);z-index:3;
  background:{uri(roof)} 0 0/auto 100% repeat-x,
   linear-gradient(to bottom,transparent 0,transparent 64%,rgba(28,12,6,.34) 68%,rgba(28,12,6,.16) 82%,transparent 100%)}}
#cabin .cb-post{{position:absolute;top:calc(var(--H)*.6);bottom:calc(var(--B)*.75);width:var(--P);z-index:1;
  background:{uri(post)} 0 0/100% auto repeat-y}}
#cabin .cb-l{{left:0;box-shadow:5px 0 9px rgba(28,12,6,.38)}}
#cabin .cb-r{{right:0;box-shadow:-5px 0 9px rgba(28,12,6,.38)}}
#cabin .cb-base{{position:absolute;left:0;right:0;bottom:0;height:var(--B);z-index:3;
  background:{uri(base)} 0 0/auto 100% repeat-x;box-shadow:0 -4px 9px rgba(28,12,6,.42)}}
#cabin .cb-hang{{position:absolute;left:50%;top:calc(var(--H)*-.02);height:calc(var(--H)*.7);width:calc(var(--H)*.7);transform:translateX(-50%);z-index:4;overflow:visible}}
.cabin-off #cabin,#cabin.cabin-off{{display:none!important}}
"""
html='<div id="cabin" aria-hidden="true">\n  <div class="cb-post cb-l"></div><div class="cb-post cb-r"></div>\n  <div class="cb-roof"></div>\n  <div class="cb-base"></div>\n  '+hook+'\n</div>\n'
open('cabin.css','w').write(css); open('cabin.html','w').write(html)
print(len(css),len(html))
