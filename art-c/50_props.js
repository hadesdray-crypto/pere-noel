/* Accessoires 'objs-*' — Style C, 100 % vecteur */
(function(){
const K='#4a2418';
const f1=n=>Math.round(n*100)/100;
const R=(x,y,w,h,r)=>{r=Math.min(r,w/2,h/2);return `M${x+r},${y}H${x+w-r}Q${x+w},${y} ${x+w},${y+r}V${y+h-r}Q${x+w},${y+h} ${x+w-r},${y+h}H${x+r}Q${x},${y+h} ${x},${y+h-r}V${y+r}Q${x},${y} ${x+r},${y}Z`};
const E=(cx,cy,rx,ry,rot)=>{rot=rot||0;const c=Math.cos(rot*Math.PI/180),s=Math.sin(rot*Math.PI/180);const x1=cx+rx*c,y1=cy+rx*s,x2=cx-rx*c,y2=cy-rx*s;return `M${f1(x1)},${f1(y1)}A${rx},${ry} ${rot} 1 0 ${f1(x2)},${f1(y2)}A${rx},${ry} ${rot} 1 0 ${f1(x1)},${f1(y1)}Z`};
function mk(name,w,h,fn,opt){opt=opt||{};let defs=[],n=0;
 const c={
  K,R,E,
  gs(cx,cy,rx,ry){return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#3a1c10" opacity=".25"/>`},
  /* forme ombrée : base + ombre portée (bas-droite) découpée dans la forme, contour */
  S(d,base,shade,o,sw,tr){o=o==null?5:o;sw=sw==null?3.4:sw;const id=name+'_c'+(n++);
   defs.push(`<clipPath id="${id}"><path d="${d}" clip-rule="evenodd"/></clipPath>`);
   const t=tr?` transform="${tr}"`:'';
   return `<g${t}><path d="${d}" fill="${shade}" fill-rule="evenodd"/><g clip-path="url(#${id})"><path d="${d}" fill="${base}" fill-rule="evenodd" transform="translate(${-o} ${-o*.9})"/></g>`+(sw?`<path d="${d}" fill="none" stroke="${K}" stroke-width="${sw}" stroke-linejoin="round" stroke-linecap="round"/>`:'')+`</g>`},
  F(d,fill,sw,tr,op){const t=tr?` transform="${tr}"`:'';return `<path d="${d}" fill="${fill}"${sw?` stroke="${K}" stroke-width="${sw}" stroke-linejoin="round" stroke-linecap="round"`:''}${op?` opacity="${op}"`:''}${t} fill-rule="evenodd"/>`},
  /* reflet doux */
  H(d,op,tr){const t=tr?` transform="${tr}"`:'';return `<path d="${d}" fill="#fff" opacity="${op||.5}"${t}/>`},
  L(d,col,sw,tr){const t=tr?` transform="${tr}"`:'';return `<path d="${d}" fill="none" stroke="${col||K}" stroke-width="${sw||3}" stroke-linecap="round" stroke-linejoin="round"${t}/>`},
  grad(id,a,b,x1,y1,x2,y2){defs.push(`<linearGradient id="${name}_${id}" x1="${x1||0}" y1="${y1||0}" x2="${x2||1}" y2="${y2||1}"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`);return `url(#${name}_${id})`},
  rgrad(id,a,b,cx,cy,r){defs.push(`<radialGradient id="${name}_${id}" cx="${cx}" cy="${cy}" r="${r}"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></radialGradient>`);return `url(#${name}_${id})`},
  clip(id,d){defs.push(`<clipPath id="${name}_${id}"><path d="${d}" clip-rule="evenodd"/></clipPath>`);return `url(#${name}_${id})`},
 };
 const inner=fn(c);art(name,w,h,inner,defs.join(''));
}
const RED='#d2342f',RED2='#9f2420',RED3='#ee5a4f',GRN='#2f7a4f',GRN2='#1f5538',GRN3='#58a878',GOLD='#f0c04a',GOLD2='#b98a22',GOLD3='#fff0a8',
 WOOD='#a9703d',WOOD2='#7a4a2a',WOOD3='#d9a066',BLU='#3b78c8',BLU2='#264f8c',BLU3='#6ea3e8';

/* ---------- OURS ---------- */
mk('objs-ours',220,262,c=>{const fur='#c98f4f',sh='#a06a35',lt='#e3b077',mz='#f6dcb0';
 let s=c.gs(110,248,86,12);
 s+=c.S(E(58,52,27,27),fur,sh,5)+c.F(E(60,55,14,14),'#e8b98a',0)+c.S(E(162,52,27,27),fur,sh,5)+c.F(E(160,55,14,14),'#e8b98a',0);
 s+=c.S(E(110,184,64,62),fur,sh,8)+c.F(E(110,196,38,40),mz,0);
 s+=c.S(E(58,234,36,24,-8),fur,sh,5)+c.F(E(54,236,17,12,-8),mz,0)+c.S(E(162,234,36,24,8),fur,sh,5)+c.F(E(166,236,17,12,8),mz,0);
 s+=c.S(E(40,176,22,36,18),fur,sh,5)+c.S(E(180,176,22,36,-18),fur,sh,5);
 s+=c.S(E(110,92,68,58),fur,sh,8);
 s+=c.H(E(78,60,26,11,-35),.35);
 s+=c.S(E(110,112,31,25),mz,'#e3bd88',3,3);
 s+=c.F(E(110,100,12,8),'#3a2016',0)+c.H(E(106,97,4,2.5),.7);
 s+=c.L('M110,108V116 M98,119Q110,130 122,119','#3a2016',3);
 s+=c.F(E(82,82,8,9),'#2b1810',0)+c.F(E(138,82,8,9),'#2b1810',0)+c.F(E(85,79,3,3),'#fff',0)+c.F(E(141,79,3,3),'#fff',0);
 s+=c.F(E(66,106,10,7),'#f08a80',0,'',.65)+c.F(E(154,106,10,7),'#f08a80',0,'',.65);
 /* noeud rouge */
 s+=c.S('M110,152 C90,134 66,140 68,158 C70,174 94,166 110,154Z',RED,RED2,3,3)+c.S('M110,152 C130,134 154,140 152,158 C150,174 126,166 110,154Z',RED,RED2,3,3);
 s+=c.S(E(110,154,10,10),RED3,RED2,2,3);
 return s});

/* ---------- TRAIN ---------- */
mk('objs-train',215,190,c=>{
 let s=c.gs(108,176,96,10);
 s+=c.S(R(8,128,200,24,8),WOOD,WOOD2,4);
 /* cabine */
 s+=c.S(R(138,60,62,72,10),GOLD,GOLD2,5)+c.F(R(148,72,36,30,8),'#bfe4f7',3)+c.H(R(152,76,12,10,3),.7);
 s+=c.S(R(130,44,78,22,8),RED,RED2,4);
 /* cube bleu */
 s+=c.S(R(98,84,38,42,6),BLU,BLU2,4)+c.H(R(103,89,12,8,3),.4);
 /* chaudiere */
 s+=c.S(R(16,70,100,62,24),RED,RED2,6);
 s+=c.F(R(24,114,92,8,4),GOLD,2.5)+c.F(E(30,92,9,9),GOLD,3);
 s+=c.H(R(26,78,60,9,4),.4);
 /* cheminee */
 s+=c.S('M30,70 L34,36 H66 L70,70Z',GOLD,GOLD2,5)+c.S(R(26,26,48,14,6),RED,RED2,4);
 /* roues */
 for(const [x,y,r] of [[46,150,24],[104,152,22],[170,152,22]]){s+=c.S(E(x,y,r,r),'#3d3a46','#222028',4,4)+c.F(E(x,y,r*.42,r*.42),GOLD,2.5)+c.H(E(x-r*.35,y-r*.4,r*.25,r*.14,-30),.4)}
 return s});

/* ---------- VOITURE ---------- */
mk('objs-voiture',283,211,c=>{
 let s=c.gs(142,190,126,12);
 /* cabine */
 s+=c.S('M78,100 C86,58 110,44 146,44 H182 C208,44 220,66 232,102Z',RED,RED2,7,5);
 s+=c.F('M92,98 C98,68 112,58 134,58 H142 V98Z','#bfe4f7',3.5)+c.F('M152,58 H180 C196,58 204,74 212,98 H152Z','#bfe4f7',3.5);
 s+=c.H('M100,92 C104,74 112,66 124,64 L118,92Z',.55)+c.H('M158,64 H172 L166,92 H158Z',.45);
 /* caisse */
 s+=c.S('M14,138 C14,112 26,100 50,98 H246 C268,100 272,120 270,142 C270,156 264,160 256,160 H28 C18,160 14,152 14,138Z',RED,RED2,9,5.5);
 s+=c.H('M36,112 H200 Q206,112 200,118 H40 Q30,118 36,112Z',.4);
 s+=c.F(E(256,120,12,10),GOLD3,3.5)+c.F(E(30,122,9,8),GOLD,3);
 s+=c.F(R(138,118,24,6,3),'#7a1b18',0);
 /* pare-chocs */
 s+=c.S(R(8,148,40,12,6),'#e6ebf2','#aeb8c6',2,3)+c.S(R(240,148,34,12,6),'#e6ebf2','#aeb8c6',2,3);
 /* roues */
 for(const x of [76,210]){s+=c.S(E(x,164,28,28),'#3d3a46','#1f1d25',5,4.5)+c.F(E(x,164,12,12),GOLD,3)+c.H(E(x-10,152,8,4,-35),.45)}
 return s});

/* ---------- ROBOT ---------- */
mk('objs-robot',166,259,c=>{const g='#c3ccd8',gs='#8896a8';
 let s=c.gs(83,246,62,10);
 s+=c.L('M83,28V10','#4a2418',4)+c.S(E(83,8,8,8),RED,RED2,2,3);
 /* jambes */
 s+=c.S(R(44,190,30,46,8),g,gs,5)+c.S(R(92,190,30,46,8),g,gs,5)+c.S(R(36,226,44,20,9),RED,RED2,4)+c.S(R(86,226,44,20,9),RED,RED2,4);
 /* bras */
 s+=c.S(R(8,118,26,66,12),g,gs,4)+c.S(R(132,118,26,66,12),g,gs,4)+c.S(E(21,188,15,14),RED,RED2,3,3)+c.S(E(145,188,15,14),RED,RED2,3,3);
 /* corps */
 s+=c.S(R(32,108,102,90,20),g,gs,8,6)+c.H(R(40,114,34,10,5),.5);
 s+=c.F(R(48,126,70,34,10),'#2d3a52',3.5)+c.F(E(66,143,8,8),'#6fe0f0',0)+c.F(E(100,143,8,8),'#ffd24a',0)+c.F(E(83,143,5,5),'#ff6a5a',0);
 s+=c.F(E(54,176,7,7),RED,2.5)+c.F(E(83,176,7,7),GOLD,2.5)+c.F(E(112,176,7,7),GRN3,2.5);
 /* tete */
 s+=c.S(R(24,30,118,82,24),g,gs,8,6);
 s+=c.H(R(32,36,46,10,5),.5)+c.S(R(38,56,90,38,16),'#2d3a52','#1c2638',3,4);
 s+=c.F(E(62,75,13,13),'#7ee8f8',0)+c.F(E(104,75,13,13),'#7ee8f8',0)+c.F(E(58,70,4.5,4.5),'#fff',0)+c.F(E(100,70,4.5,4.5),'#fff',0);
 s+=c.L('M70,92Q83,98 96,92','#7ee8f8',3);
 s+=c.S(R(12,56,14,32,6),RED,RED2,3,3)+c.S(R(140,56,14,32,6),RED,RED2,3,3);
 return s});

/* ---------- POUPEE ---------- */
mk('objs-poupee',198,263,c=>{const dress='#e8607f',ds='#b83a5c',skin='#f6c7a0',sk2='#e0a47c',hair='#8a5230',hs='#5e361c';
 let s=c.gs(100,250,84,10);
 /* jambes vers la droite */
 s+=c.S(R(84,208,80,26,13),skin,sk2,4,4)+c.S(E(172,221,17,15),'#2a2630','#16141a',3,4)+c.F(R(152,208,8,26,3),'#fff7f0',2.5);
 s+=c.S(R(62,230,76,22,11),skin,sk2,4,4)+c.S(E(146,241,16,13),'#2a2630','#16141a',3,4)+c.F(R(126,230,8,22,3),'#fff7f0',2.5);
 /* nattes */
 s+=c.S(E(34,96,24,30,-12),hair,hs,4,4)+c.S(E(164,96,24,30,12),hair,hs,4,4)+c.F(E(40,70,7,7),RED,2.5)+c.F(E(158,70,7,7),RED,2.5);
 /* robe */
 s+=c.S('M64,134 H134 C146,160 160,196 168,214 H30 C38,196 52,160 64,134Z',dress,ds,7,5);
 for(const [x,y] of [[60,186],[90,196],[120,184],[78,160],[108,166],[140,200],[44,204]])s+=c.F(E(x,y,4.5,4.5),'#fff0f4',0);
 /* bras */
 s+=c.S(E(52,150,14,26,28),skin,sk2,3,4)+c.S(E(146,150,14,26,-28),skin,sk2,3,4);
 s+=c.S('M70,124 Q99,146 128,124 L120,138 Q99,152 78,138Z','#fff7f0','#e4d8c6',2,3);
 /* tete */
 s+=c.S(E(99,80,58,56),skin,sk2,7,5);
 s+=c.S('M42,86 C36,38 74,22 99,22 C124,22 162,38 156,86 C146,66 128,54 99,54 C70,54 52,66 42,86Z',hair,hs,5,4.5);
 s+=c.F(E(78,88,8,10),'#2b1810',0)+c.F(E(120,88,8,10),'#2b1810',0)+c.F(E(81,84,3,3.5),'#fff',0)+c.F(E(123,84,3,3.5),'#fff',0);
 s+=c.F(E(64,106,11,8),'#f08a80',0,'',.75)+c.F(E(134,106,11,8),'#f08a80',0,'',.75);
 s+=c.L('M88,108Q99,118 110,108','#8a2a2a',3.2);
 s+=c.H(E(72,50,20,7,-20),.3);
 return s});

/* ---------- BALLON ---------- */
mk('objs-ballon',206,228,c=>{
 const D=E(103,112,94,94);const cl=c.clip('b',D);
 let s=c.gs(103,214,76,11);
 s+=`<path d="${D}" fill="#fffaf0"/><g clip-path="${cl}">`+
  `<path d="M103,18 C50,40 34,90 36,118 C38,160 60,196 100,206 C62,170 70,60 103,18Z" fill="${RED}"/>`+
  `<path d="M103,18 C140,60 148,170 100,206 C150,196 172,160 172,118 C174,70 150,34 103,18Z" fill="${BLU}"/>`+
  `<path d="M4,100 C20,60 44,36 70,26 C46,60 36,100 36,118 C36,160 60,196 100,206 L4,206Z" fill="${GOLD}"/>`+
  `<ellipse cx="103" cy="112" rx="94" ry="94" fill="url(#b_sh)"/></g>`+
  `<circle cx="103" cy="112" r="14" fill="#fffaf0" stroke="${K}" stroke-width="3"/><path d="${D}" fill="none" stroke="${K}" stroke-width="5"/>`+
  c.H(E(66,64,22,11,-45),.7);
 c.rgrad('sh','#fff0','#40201855',.35,.3,.8);
 return s.replace('url(#b_sh)','url(#objs-ballon_sh)')});

/* ---------- CHEVAL A BASCULE ---------- */
mk('objs-cheval',261,261,c=>{const b='#c98f4f',bs='#9a6232',mane='#6b3a1c',ms='#4a2410';
 let s=c.gs(130,246,112,9);
 /* pattes arriere et avant */
 s+=c.S('M176,150 L206,150 L196,226 L174,226Z',b,bs,4,4)+c.S('M72,150 L102,150 L88,226 L64,226Z',b,bs,4,4);
 /* queue */
 s+=c.S('M204,96 C238,92 248,122 236,150 C232,128 222,118 204,116Z',mane,ms,3,4);
 /* corps */
 s+=c.S('M70,28 L100,38 C104,80 122,108 120,134 L74,138 C78,110 62,94 48,84Z',b,bs,6,5);
 s+=c.S(E(138,124,76,42,-4),b,bs,7,5);
 s+=c.S(E(138,98,40,15,-4),RED,RED2,3,4)+c.F(R(122,106,34,6,3),GOLD,2);
 /* cou/tete */
  s+=c.S('M98,30 C112,40 106,58 112,70 C118,84 108,100 118,118 C124,122 130,108 128,94 C126,70 122,52 108,34Z',mane,ms,3,4);
 s+=c.S(E(56,56,40,26,125),b,bs,6,5);
 s+=c.S(E(34,86,15,19,125),'#e8bf8c','#c99a64',3,4)+c.F(E(28,92,3.5,2.5,35),'#5a3018',0);
 s+=c.S('M70,26 L78,2 L92,24Z',b,bs,2,3.5)+c.F('M77,10 L81,22 L86,22Z','#e8b98a',0);
 s+=c.S('M84,30 C74,40 76,52 84,56 C86,46 94,40 98,36 C96,30 90,26 84,30Z',mane,ms,2,3);
 s+=c.F(E(58,50,6.5,7),'#2b1810',0)+c.F(E(60,48,2.4,2.4),'#fff',0);
 s+=c.L('M44,52 L26,76','#d2342f',5)+c.L('M66,70 C54,76 42,80 30,80','#d2342f',4);
 s+=c.F(E(30,82,5,5),GOLD,2);
 s+=c.H(E(60,40,12,5,-40),.35);
 /* arceaux */
 s+=c.S('M8,196 C40,262 222,266 254,196 C258,188 244,184 240,192 C206,238 56,238 22,192 C18,184 4,188 8,196Z',WOOD,WOOD2,5,5);
 s+=c.H('M24,198 C60,226 110,230 130,230 C100,222 56,214 24,198Z',.35);
 return s});

/* ---------- PUZZLE ---------- */
mk('objs-puzzle',241,257,c=>{
 let s=c.gs(120,244,100,9);
 const pc=(shapes,a,b,hl)=>{let o='';const g=c.grad('g'+a.slice(1)+Math.random().toString(36).slice(2,5),a,b,.2,0,.8,1);
  for(const d of shapes)o+=`<path d="${d}" fill="none" stroke="${K}" stroke-width="7" stroke-linejoin="round"/>`;
  for(const d of shapes)o+=`<path d="${d}" fill="${g}"/>`;
  o+=c.H(hl,.4);return o};
  s+=pc([R(126,138,105,94,14)],RED3,RED2,R(136,146,50,10,5));
  s+=pc([R(126,10,105,100,14),E(178,122,15,15)],GRN3,GRN2,R(136,18,50,10,5));
  s+=pc([R(10,126,100,106,14),E(122,178,15,15)],'#ffd966',GOLD2,R(20,134,50,10,5));
  s+=pc([R(10,10,100,100,14),E(122,60,15,15)],BLU3,BLU2,R(20,18,50,10,5));
 return s});

/* ---------- CUBES ---------- */
mk('objs-cubes',311,264,c=>{
 let s=c.gs(155,250,138,10);
 s+=c.S(R(30,56,252,124,10),WOOD2,'#5a321c',4,5);
 const cube=(x,y,sz,a,b,t)=>c.S(R(x,y,sz,sz,6),a,b,4,3.5)+c.F(`M${x+3},${y+3} H${x+sz-3}`,'none',0)+c.H(R(x+6,y+6,sz*.4,sz*.18,3),.45);
 s+=cube(48,84,56,BLU,BLU2)+cube(110,70,60,GOLD,GOLD2)+cube(176,84,56,RED,RED2)+cube(232,92,44,GRN,GRN2);
 s+=cube(76,118,56,GRN,GRN2)+cube(140,126,50,'#e8b98a','#c99a64')+cube(196,122,56,BLU3,BLU2);
 s+=c.S(R(14,150,284,98,14),WOOD,WOOD2,8,6);
 s+=c.F(R(14,150,284,22,10),WOOD3,0,'',.9)+c.L('M14,172H298','#5a321c',3);
 s+=c.L('M22,196H290 M22,222H290','#7a4a2a',3,'');
 s+=c.S(R(14,150,28,98,10),WOOD3,WOOD,5,4)+c.S(R(270,150,28,98,10),WOOD,WOOD2,6,4);
 s+=c.F(E(156,210,15,15),GOLD,3)+c.F('M156,201 l2.8,6 6.5,.7 -5,4.4 1.5,6.4 -5.8,-3.4 -5.8,3.4 1.5,-6.4 -5,-4.4 6.5,-.7Z','#fff0a8',0);
 s+=c.H(R(46,158,110,6,3),.4);
 return s});

/* ---------- CADEAUX ---------- */
function gift(name,w,h,a,sh,hi,rb,rbs){mk(name,w,h,c=>{
 const lx=10,lw=w-20,ly=Math.round(h*.3),lh=Math.round(h*.16),bx=22,bw=w-44,by=ly+lh-4,bh=h-by-14,cx=w/2;
 let s=c.gs(cx,h-10,w*.42,9);
 s+=c.S(R(bx,by,bw,bh,10),a,sh,12,5);
 s+=c.S(R(cx-17,by-2,34,bh+2,0),rb,rbs,5,3.5);
 s+=c.H(R(bx+8,by+12,12,bh*.45,5),.35);
 s+=c.S(R(lx,ly,lw,lh,10),a,sh,8,5);
 s+=c.S(R(cx-20,ly,40,lh,0),rb,rbs,4,3.5);
 s+=c.H(R(lx+10,ly+7,lw*.25,6,3),.45);
 /* noeud */
 const by0=ly-4;
 s+=c.S(`M${cx},${by0} C${cx-18},${by0-44} ${cx-62},${by0-38} ${cx-52},${by0-8} C${cx-46},${by0+6} ${cx-20},${by0+4} ${cx},${by0}Z`,rb,rbs,4,4);
 s+=c.S(`M${cx},${by0} C${cx+18},${by0-44} ${cx+62},${by0-38} ${cx+52},${by0-8} C${cx+46},${by0+6} ${cx+20},${by0+4} ${cx},${by0}Z`,rb,rbs,4,4);
 s+=c.S(E(cx,by0,14,12),rb,rbs,3,4)+c.H(E(cx-4,by0-4,5,3.5),.55);
 return s})}
gift('objs-cadeau-rouge',215,229,RED,RED2,RED3,GOLD,GOLD2);
gift('objs-cadeau-vert',215,227,GRN,GRN2,GRN3,RED,RED2);
gift('objs-cadeau-bleu',231,234,BLU,BLU2,BLU3,'#fff6f0','#d8c9bd');

/* ---------- BALAI (manche haut-droite, poils bas-gauche) ---------- */
mk('objs-balai',195,355,c=>{
 const T='translate(124 195) rotate(18)';let s='';
 const g=(x)=>`<g transform="${T}">${x}</g>`;
 /* poils */
 s+=g(c.S('M-24,-6 H24 L52,138 Q0,152 -52,138Z','#e3b45a','#b98a3a',6,5)+
   [-36,-20,-4,12,28].map(x=>c.L(`M${x*.5},10 L${x*1.4},132`,'#9a6f2a',2.5)).join('')+
   c.H('M-18,6 L-6,6 L-26,120 L-40,120Z',.3));
 /* bande */
 s+=g(c.S(R(-30,-12,60,30,9),RED,RED2,5,4.5)+c.H(R(-24,-8,22,6,3),.5));
 /* manche */
 s+=g(c.S(R(-8,-196,16,190,8),WOOD,WOOD2,5,4)+c.H(R(-4,-190,4,170,2),.4)+c.F(E(0,-190,4,4),'#4a2418',0));
 return s});

/* ---------- BLOC ---------- */
mk('objs-bloc',195,205,c=>{
 let s=c.gs(98,190,76,10);
 const top='M97,12 L180,56 L97,102 L14,56Z',left='M14,56 L97,102 V196 L14,150Z',right='M180,56 L97,102 V196 L180,150Z';
 s+=c.F(left,WOOD,0)+c.F(right,WOOD2,0)+c.F(top,WOOD3,0);
 s+=c.L('M30,66 L84,98 M30,86 L84,118 M30,108 L84,140','#8a5530',2.5,'',)+c.L('M112,110 L164,82 M112,132 L164,104','#5a321c',2.5);
 s+=c.H('M97,22 L150,50 L97,78 L44,50Z',.3);
 s+=c.F(E(55,68,0.1,0.1),'none',0);
 s+=c.L('M14,56 L97,102 L180,56 M97,102 V196','#6e4020',3);
 s+=`<path d="M97,12 L180,56 V150 L97,196 L14,150 V56Z" fill="none" stroke="${K}" stroke-width="5" stroke-linejoin="round"/>`;
 return s});

/* ---------- ENGRENAGE ---------- */
mk('objs-engrenage',214,210,c=>{
 let s=c.gs(107,196,84,9);
 const cx=107,cy=104,n=8,Ro=98,Rr=76;let d='';
 for(let i=0;i<n;i++){const a=i*2*Math.PI/n,w1=.17,w2=.11;
  const p=(r,t)=>`${f1(cx+r*Math.cos(a+t))},${f1(cy+r*Math.sin(a+t))}`;
  d+=(i?'L':'M')+p(Rr,-w1-.06)+'L'+p(Ro,-w2)+'L'+p(Ro,w2)+'L'+p(Rr,w1+.06)+(i==n-1?'':'');
  const a2=a+Math.PI/n;d+=`L${f1(cx+Rr*Math.cos(a2))},${f1(cy+Rr*Math.sin(a2))}`}
 d+='Z'+E(cx,cy,34,34);
 s+=c.S(d,GOLD,GOLD2,8,6);
 s+=c.F(E(cx,cy,34,34),'#7a4a2a',0)+c.F(E(cx,cy,30,30),'#3a2218',0)+c.F(E(cx+3,cy+3,26,26),'#24150e',0);
 s+=`<circle cx="${cx}" cy="${cy}" r="34" fill="none" stroke="${K}" stroke-width="4.5"/>`;
 s+=c.F(E(cx,cy,48,48),'none',0)+`<circle cx="${cx}" cy="${cy}" r="54" fill="none" stroke="${GOLD3}" stroke-width="4" opacity=".5"/>`;
 s+=c.H(E(66,52,22,8,-40),.55);
 return s});

/* ---------- MARTEAU (poignee bas-gauche, tete en haut) ---------- */
mk('objs-marteau',167,270,c=>{
 const T='translate(26 250) rotate(20)';const g=x=>`<g transform="${T}">${x}</g>`;
 let s='';
 s+=g(c.S('M-13,-10 Q-14,6 0,8 Q14,6 13,-10 V-190 H-13Z',WOOD,WOOD2,6,5)+c.H(R(-8,-170,5,150,2),.4)+c.S(R(-14,-30,28,10,5),RED,RED2,2,3));
 s+=g(c.S('M-46,-232 H34 C46,-232 58,-224 60,-206 C62,-196 54,-190 46,-196 C44,-206 36,-212 30,-212 H-46Z','#c7d0dc','#8896a8',7,5.5));
 s+=g(c.S(R(-44,-236,26,56,8),'#d7dee8','#8896a8',5,5)+c.H(R(-40,-230,8,40,4),.6));
 s+=g(c.S(R(-12,-216,38,36,6),'#b3becc','#7b899b',5,5));
 return s});

/* ---------- PINCEAU (manche haut-droite, poils bas-gauche) ---------- */
mk('objs-pinceau',211,253,c=>{
 const T='translate(66 181) rotate(38)';const g=x=>`<g transform="${T}">${x}</g>`;
 let s='';
 s+=g(c.S('M-15,0 Q-22,50 0,88 Q22,50 15,0Z','#b0703a','#7a4220',6,4.5)+c.S('M-6,44 Q-2,74 0,86 Q10,64 8,44 Z','#e3453a',RED2,2,0)+c.H('M-10,6 Q-14,40 -4,66 Q-8,36 -4,6Z',.35));
 s+=g(c.S(R(-15,-32,30,38,6),'#d7dee8','#8896a8',4,4.5)+c.L('M-15,-19H15 M-15,-9H15','#8896a8',2.5)+c.H(R(-10,-28,5,30,2),.6));
 s+=g(c.S('M-10,-36 H10 L14,-150 Q0,-170 -14,-150Z',RED,RED2,5,4.5)+c.H('M-6,-44 H0 L-3,-140 H-7Z',.4));
 return s});

/* ---------- SCIE ---------- */
mk('objs-scie',227,249,c=>{
 const T='translate(142 66) rotate(137)';const g=x=>`<g transform="${T}">${x}</g>`;
 let s='';
 /* lame : dents cote -y */
 let teeth='M0,-34 L2,-38';const nT=11;
 let d='M0,6 L0,-34';for(let i=0;i<nT;i++){const x0=6+i*(180/nT),x1=x0+180/nT/2,x2=x0+180/nT;d+=` L${f1(x1)},${-34+(i*.2)} L${f1(x2)},${f1(-24+i*.7)} `}
 d='M0,6 L0,-38';for(let i=0;i<nT;i++){const w=17,x0=4+i*w;d+=` L${f1(x0+w*.2)},${-38+i*1.7} L${f1(x0+w)},${f1(-30+i*1.7)}`}
 d+=' L196,-18 L196,-10 L0,6Z';
 s+=g(c.S(d,'#c7d0dc','#8896a8',5,5));
 s+=g(c.H('M10,-4 L160,-12 L160,-8 L10,2Z',.7));
 /* poignee */
 s+=g(c.S('M-6,-48 H-52 C-64,-48 -68,-34 -66,-20 C-64,-4 -58,14 -44,16 H-6Z',WOOD,WOOD2,6,5.5));
 s+=g(c.F(R(-38,-30,24,24,11),'#2a1a10',3.5)+c.H(R(-60,-40,34,6,3),.4));
 s+=g(c.S(R(-10,-44,14,56,4),'#d7dee8','#8896a8',3,4));
 return s});

/* ---------- SEAU ---------- */
mk('objs-seau',216,230,c=>{
 let s=c.gs(108,218,82,10);
 /* anse arriere */
 s+=c.L('M28,60 C28,-4 188,-4 188,60','#7b899b',9)+c.L('M28,60 C28,-4 188,-4 188,60','#d7dee8',4.5);
 s+=c.S('M22,56 H194 L176,206 Q108,226 40,206Z','#b6c3d0','#7b899b',12,5.5);
 s+=c.F('M22,56 H194 L192,70 Q108,90 24,70Z','#e1e8ef',0)+c.L('M30,98 Q108,112 186,98 M36,150 Q108,164 180,150','#8896a8',3);
 s+=c.H('M38,86 L52,86 L58,190 L48,186Z',.5);
 s+=c.F(E(108,56,86,16),'#4c7fb0',5)+c.F(E(108,59,78,11),'#7fc0ea',0)+c.H(E(84,56,34,4,-3),.6);
 s+=c.F(E(24,58,7,7),'#8896a8',3.5)+c.F(E(192,58,7,7),'#8896a8',3.5);
 return s});

/* ---------- EPONGE ---------- */
mk('objs-eponge',230,188,c=>{
 let s=c.gs(115,170,94,11);
 s+=c.S('M12,66 L50,20 H212 L188,66Z','#ffe87a','#e6c030',5,5);
 s+=c.S(R(12,66,176,96,14),'#ffd940','#d9a81c',10,5.5);
 s+=c.S('M188,66 L212,20 V116 Q212,126 202,134 L188,162Z','#e6b822','#b88a12',3,5);
 s+=c.S(R(12,126,176,36,12),GRN,GRN2,6,5)+c.H(R(22,132,70,6,3),.35);
 for(const [x,y,rx,ry] of [[40,92,10,8],[84,84,13,9],[130,98,11,8],[164,86,9,7],[62,112,8,6],[112,118,9,6],[150,114,7,5]])s+=c.F(E(x,y,rx,ry),'#c9a014',0)+c.F(E(x-1,y+2,rx*.7,ry*.6),'#a5800c',0,'',.7);
 for(const [x,y,rx,ry] of [[70,42,9,4],[120,36,12,5],[160,46,9,4],[96,50,6,3]])s+=c.F(E(x,y,rx,ry),'#d3ab18',0);
 s+=c.H(R(22,72,60,7,3),.5);
 return s});

/* ---------- CROTTE (mignonne) ---------- */
mk('objs-crotte',170,188,c=>{
 let s=c.gs(85,172,66,9);
 s+=c.S('M22,168 C6,168 4,138 20,128 C26,102 50,96 64,90 C54,76 70,56 84,46 C92,32 100,24 108,14 C118,28 124,44 112,60 C124,64 140,70 142,92 C158,98 168,124 156,142 C160,162 150,168 142,168Z','#8a5532','#5e371e',9,5.5);
 /* etages / reflets */
 s+=c.L('M30,134 C60,148 112,148 146,132','#5e371e',3.5)+c.L('M56,98 C80,108 110,106 134,94','#5e371e',3.5);
 s+=c.H('M54,86 C50,70 60,60 70,54 C64,68 66,78 74,84Z',.5)+c.H(E(42,132,12,6,-20),.4);
 /* visage */
 s+=c.F(E(62,128,9,10.5),'#2b1810',0)+c.F(E(106,128,9,10.5),'#2b1810',0)+c.F(E(65,124,3.5,4),'#fff',0)+c.F(E(109,124,3.5,4),'#fff',0);
 s+=c.F('M72,144 Q84,162 96,144Z','#7a2420',3)+c.F(E(84,153,6,3.5),'#f08a80',0);
 s+=c.F(E(44,142,8,5),'#f08a80',0,'',.6)+c.F(E(124,142,8,5),'#f08a80',0,'',.6);
 return s});

/* ---------- FLAQUE ---------- */
mk('objs-flaque',270,137,c=>{
 const d='M30,70 C16,52 40,34 66,36 C80,18 116,14 138,28 C156,16 196,18 208,38 C232,34 258,48 252,70 C260,92 232,104 208,98 C196,118 156,122 138,108 C116,124 80,118 68,102 C44,110 16,94 30,70Z';
 let s=c.S(d,'#ffe45c','#f2c93a',8,3);
 s+=c.F(E(135,70,70,30),'#fff3a8',0,'',.8)+c.H(E(84,50,32,7,-12),.8)+c.H(E(176,46,16,4,8),.7)+c.F(E(210,86,12,4),'#fff',0,'',.7);
 s+=c.L('M226,60 q8,2 6,10','#fff',3);
 return s});

/* ---------- CLOCHE ---------- */
mk('objs-cloche',197,247,c=>{
 let s=c.gs(98,236,64,8);
 s+=c.L(E(98,34,16,16),GOLD2,9)+c.L(E(98,34,16,16),GOLD,4);
 s+=c.S(E(98,223,17,17),GOLD,GOLD2,4,4.5)+c.H(E(92,217,5,4,-30),.7);
 s+=c.F(E(98,204,70,14),'#7a4a10',5);
 s+=c.S('M98,46 C70,46 62,78 60,114 C58,150 40,170 22,192 C16,200 24,206 34,206 C60,214 136,214 162,206 C172,206 180,200 174,192 C156,170 138,150 136,114 C134,78 126,46 98,46Z',GOLD,GOLD2,12,5.5);
 s+=c.F('M30,196 Q98,224 168,196 Q176,206 164,208 Q98,222 34,208 Q22,206 30,196Z',GOLD3,0,'',.5);
 s+=c.H('M78,66 C68,76 66,96 66,120 C66,140 60,150 52,164 C62,150 76,140 78,110 C80,92 78,80 86,70Z',.6);
 s+=c.L('M64,160 Q98,176 134,160','#b98a22',3);
 return s});
})();
