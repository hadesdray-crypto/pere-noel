/* 40 — Décor de fond « bg » + meubles « furn-* » (style C, 100 % vecteur) */
(function(){
const O='#4a2418';
const WOOD={f:'#a9703d',d:'#7a4a2a',h:'#d9a066'};
/* ---------- kit de dessin : formes avec contour, ombre douce et reflet ---------- */
function kit(W,H,sw){
  const k={d:[],n:0,W,H,sw:sw||Math.max(2,H*.016)};
  k.id=p=>p+(++k.n);
  k.lg=(x1,y1,x2,y2,st)=>{const i=k.id('g');k.d.push(`<linearGradient id="${i}" gradientUnits="userSpaceOnUse" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">${st.map(s=>`<stop offset="${s[0]}" stop-color="${s[1]}"${s[2]!=null?` stop-opacity="${s[2]}"`:''}/>`).join('')}</linearGradient>`);return `url(#${i})`};
  k.rg=(cx,cy,r,st,fx,fy)=>{const i=k.id('r');k.d.push(`<radialGradient id="${i}" gradientUnits="userSpaceOnUse" cx="${cx}" cy="${cy}" r="${r}"${fx!=null?` fx="${fx}" fy="${fy}"`:''}>${st.map(s=>`<stop offset="${s[0]}" stop-color="${s[1]}"${s[2]!=null?` stop-opacity="${s[2]}"`:''}/>`).join('')}</radialGradient>`);return `url(#${i})`};
  /* fx : forme (fonction d'attributs -> élément), remplissage, options */
  k.fx=(el,fill,o)=>{o=o||{};const c=k.id('c'),m=k.id('m'),b=k.id('b'),m2=k.id('n');
    const d=o.d!=null?o.d:Math.max(3,H*.022),sh=o.sh!=null?o.sh:.3,hi=o.hi!=null?o.hi:.4,sws=o.sw!=null?o.sw:k.sw;
    const X=o.box?o.box[0]:-40,Y=o.box?o.box[1]:-40,WW=o.box?o.box[2]:W+80,HH=o.box?o.box[3]:H+80;
    k.d.push(`<clipPath id="${c}">${el('')}</clipPath><filter id="${b}" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="${(d*.45).toFixed(2)}"/></filter>`);
    k.d.push(`<mask id="${m}" maskUnits="userSpaceOnUse" x="${X}" y="${Y}" width="${WW}" height="${HH}"><rect x="${X}" y="${Y}" width="${WW}" height="${HH}" fill="#fff"/>${el(`fill="#000" filter="url(#${b})" transform="translate(${-d},${-d*.9})"`)}</mask>`);
    k.d.push(`<mask id="${m2}" maskUnits="userSpaceOnUse" x="${X}" y="${Y}" width="${WW}" height="${HH}"><rect x="${X}" y="${Y}" width="${WW}" height="${HH}" fill="#fff"/>${el(`fill="#000" filter="url(#${b})" transform="translate(${d*.8},${d*.8})"`)}</mask>`);
    let s=el(`fill="${fill}"`);
    s+=`<g clip-path="url(#${c})"><rect x="${X}" y="${Y}" width="${WW}" height="${HH}" fill="${o.dark||'#1a0a20'}" opacity="${sh}" mask="url(#${m})"/>`;
    if(hi)s+=`<rect x="${X}" y="${Y}" width="${WW}" height="${HH}" fill="${o.hic||'#fff0b8'}" opacity="${hi}" mask="url(#${m2})"/>`;
    s+='</g>';
    if(!o.ns)s+=el(`fill="none" stroke="${O}" stroke-width="${sws}" stroke-linejoin="round" stroke-linecap="round"`);
    return s};
  return k}
const R=(x,y,w,h,r)=>a=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r||0}" ${a}/>`;
const P=d=>a=>`<path d="${d}" ${a}/>`;
const E=(cx,cy,rx,ry)=>a=>`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry||rx}" ${a}/>`;
const line=(x1,y1,x2,y2,c,w,o)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"${o!=null?` opacity="${o}"`:''}/>`;
const poly=(pts,fill,extra)=>`<polygon points="${pts.map(p=>p.join(',')).join(' ')}" fill="${fill}" ${extra||''}/>`;
const out=(k,pts,fill,w)=>`<polygon points="${pts.map(p=>p.join(',')).join(' ')}" fill="${fill}" stroke="${O}" stroke-width="${w||k.sw}" stroke-linejoin="round"/>`;
function gShadow(k,cx,y,rx){const g=k.rg(cx,y,rx,[[0,'#2a1020',.38],[1,'#2a1020',0]]);return `<ellipse cx="${cx}" cy="${y}" rx="${rx}" ry="${rx*.13}" fill="${g}"/>`}
/* planches de bois : lignes de veines sur une zone */
function grain(x,y,w,h,n,c,o){let s='';for(let i=1;i<n;i++){const yy=y+h*i/n;s+=line(x+3,yy,x+w-3,yy,c,Math.max(1,h*.02),o==null?.28:o)}return s}
function boltS(x,y,r){return `<circle cx="${x}" cy="${y}" r="${r}" fill="#8e8f98" stroke="${O}" stroke-width="${Math.max(1,r*.35)}"/><circle cx="${x-r*.3}" cy="${y-r*.3}" r="${r*.35}" fill="#fff" opacity=".6"/>`}
function rotEll(cx,cy,rx,ry,deg){const r=deg*Math.PI/180,p=[];for(let i=0;i<40;i++){const t=i/40*Math.PI*2,x=Math.cos(t)*rx,y=Math.sin(t)*ry;p.push((cx+x*Math.cos(r)-y*Math.sin(r)).toFixed(1)+','+(cy+x*Math.sin(r)+y*Math.cos(r)).toFixed(1))}return 'M'+p.join(' L')+' Z'}
function bow(k,cx,cy,s,c1,c2){ /* noeud de cadeau : deux boucles pleines + noeud + deux pans */
  const w=s;let t='';
  for(const sg of [-1,1]){
    const lx=cx+sg*w*.62,ly=cy-w*.34;
    t+=k.fx(P(rotEll(lx,ly,w*.62,w*.4,sg*28)),c1,{d:w*.1,sw:k.sw*.8});
    t+=`<path d="${rotEll(lx,ly,w*.36,w*.2,sg*28)}" fill="${c2||c1}" opacity=".45"/>`}
  t+=k.fx(P(`M${cx-w*.2},${cy} L${cx-w*.7},${cy+w*.7} L${cx-w*.3},${cy+w*.6} L${cx-w*.02},${cy+w*.1} Z`),c1,{d:w*.08,sw:k.sw*.7});
  t+=k.fx(P(`M${cx+w*.2},${cy} L${cx+w*.7},${cy+w*.7} L${cx+w*.3},${cy+w*.6} L${cx+w*.02},${cy+w*.1} Z`),c1,{d:w*.08,sw:k.sw*.7});
  t+=k.fx(E(cx,cy-w*.04,w*.26,w*.22),c1,{d:w*.07,sw:k.sw*.8});
  return t}
function gift(k,x,y,w,h,col,rib,withBow,bowS){
  const t=h*.17,ins=w*.07,tw=w*.3;let s='';
  /* dessus */
  s+=k.fx(P(`M${x+ins},${y-t} L${x+w-ins},${y-t} L${x+w},${y} L${x},${y} Z`),col.hi,{d:2,hi:.2,sh:.15});
  const rx=x+w/2-tw/2;
  s+=`<polygon points="${rx+tw*.06},${y-t} ${rx+tw*.94},${y-t} ${rx+tw},${y} ${rx},${y}" fill="${rib.f}" stroke="${O}" stroke-width="${k.sw*.55}" stroke-linejoin="round"/>`;
  s+=k.fx(R(x,y,w,h,k.sw),col.f,{});
  s+=`<rect x="${rx}" y="${y}" width="${tw}" height="${h}" fill="${rib.f}"/>`;
  s+=`<rect x="${rx+tw*.12}" y="${y}" width="${tw*.18}" height="${h}" fill="#fff6c8" opacity=".45"/>`;
  s+=`<rect x="${rx}" y="${y}" width="${tw}" height="${h}" fill="none" stroke="${O}" stroke-width="${k.sw*.55}"/>`;
  s+=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${k.sw}" fill="none" stroke="${O}" stroke-width="${k.sw}" stroke-linejoin="round"/>`;
  /* petits motifs étoiles clairs */
  for(let i=0;i<5;i++){const px=x+w*(.14+.14*(i%2))+(i>1?w*.45:0),py=y+h*(.2+.2*i%.7);s+=`<circle cx="${px}" cy="${py}" r="${w*.018}" fill="${rib.f}" opacity=".55"/>`}
  if(withBow)s+=bow(k,x+w/2,y-t-bowS*.05,bowS,rib.f,rib.d);
  return s}
const RED={f:'#d2342f',d:'#9f2420',hi:'#ee5a4f'},GRN={f:'#2f7a4f',d:'#1f5538',hi:'#4d9b6c'},BLU={f:'#3d6fb5',d:'#284c86',hi:'#6a96d4'},GLD={f:'#f0c04a',d:'#b98a22',hi:'#fbe08a'};
function star(cx,cy,r,fill,k){const p=[];for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,rr=i%2?r*.46:r;p.push([(cx+Math.cos(a)*rr).toFixed(1),(cy+Math.sin(a)*rr).toFixed(1)])}return `<polygon points="${p.join(' ')}" fill="${fill}" stroke="${O}" stroke-width="${k.sw*.6}" stroke-linejoin="round"/>`}

/* ================= ÉTABLI ================= */
(function(){const W=421,H=238,k=kit(W,H,3.8);let s='';const G=231;
  s+=gShadow(k,W/2,G,W*.46);
  /* pattes arrière visibles entre : non, seulement avant */
  const leg=(x)=>k.fx(R(x,60,40,G-60,5),k.lg(x,0,x+40,0,[[0,WOOD.f],[1,WOOD.d]]),{});
  s+=leg(22);s+=leg(359);
  /* pieds */
  s+=k.fx(R(14,G-26,56,26,5),WOOD.d,{});s+=k.fx(R(351,G-26,56,26,5),WOOD.d,{});
  /* traverse basse */
  s+=k.fx(R(62,168,297,22,4),k.lg(0,168,0,190,[[0,WOOD.f],[1,WOOD.d]]),{});
  s+=boltS(40,100,4)+boltS(380,100,4);
  /* tablier + tiroir */
  s+=k.fx(R(22,58,377,38,4),k.lg(0,58,0,96,[[0,WOOD.f],[1,'#8f5a31']]),{});
  s+=k.fx(R(150,66,118,24,4),'#b97f47',{sh:.2});
  s+=`<circle cx="209" cy="78" r="6" fill="#f0c04a" stroke="${O}" stroke-width="2.5"/><circle cx="207" cy="76" r="2" fill="#fff0a8"/>`;
  /* plateau : dessus + chant */
  s+=k.fx(P('M26,10 L396,10 L415,32 L6,32 Z'),'#d9a066',{d:3,sh:.14,hi:.25});
  s+=grain(34,12,350,18,3,'#7a4a2a',.25);
  s+=k.fx(R(6,32,409,28,6),k.lg(0,32,0,60,[[0,'#b97f47'],[1,WOOD.d]]),{});
  s+=line(14,41,404,41,'#e8b980',2,.35);
  /* outils accrochés */
  const tx=96,ty=96;
  s+=`<rect x="${tx-5}" y="${ty}" width="11" height="58" rx="5" fill="#c98a4c" stroke="${O}" stroke-width="2.6"/>`;
  s+=k.fx(R(tx-24,ty-12,48,22,6),'#a8adb8',{d:3,sw:2.8});
  s+=line(tx-18,ty-8,tx+14,ty-8,'#fff',2,.7);
  const t2=272;
  s+=`<path d="M${t2},${ty+8} L${t2-5},${ty+58} Q${t2-4},${ty+66} ${t2+2},${ty+62} L${t2+7},${ty+22} Z" fill="#d2342f" stroke="${O}" stroke-width="2.6" stroke-linejoin="round"/>`;
  s+=`<path d="M${t2+16},${ty+8} L${t2+23},${ty+58} Q${t2+22},${ty+66} ${t2+16},${ty+62} L${t2+10},${ty+22} Z" fill="#d2342f" stroke="${O}" stroke-width="2.6" stroke-linejoin="round"/>`;
  s+=`<path d="M${t2-1},${ty-4} L${t2+17},${ty-4} L${t2+16},${ty+14} L${t2},${ty+14} Z" fill="#b6bbc6" stroke="${O}" stroke-width="2.6" stroke-linejoin="round"/>`;
  const t3=312;
  s+=`<path d="M${t3-8},${ty-2} a11,11 0 1 1 18,0 L${t3+9},${ty+14} L${t3+3},${ty+66} L${t3-3},${ty+66} L${t3-9},${ty+14} Z" fill="#b6bbc6" stroke="${O}" stroke-width="2.6" stroke-linejoin="round"/>`;
  const t4=346;
  s+=`<rect x="${t4-5}" y="${ty+2}" width="10" height="30" rx="5" fill="#d2342f" stroke="${O}" stroke-width="2.6"/><rect x="${t4-2}" y="${ty+30}" width="4" height="34" fill="#b6bbc6" stroke="${O}" stroke-width="2.2"/>`;
  art('furn-etabli',W,H,s,k.d.join(''))})();

/* ================= ÉTAU ================= */
(function(){const W=280,H=220,k=kit(W,H,3.6);let s='';const G=213;
  s+=gShadow(k,W/2+10,G,W*.44);
  const leg=x=>k.fx(R(x,50,32,G-50,5),k.lg(x,0,x+32,0,[[0,WOOD.f],[1,WOOD.d]]),{});
  s+=leg(54)+leg(234);
  s+=k.fx(R(48,G-22,46,22,5),WOOD.d,{})+k.fx(R(228,G-22,46,22,5),WOOD.d,{});
  s+=k.fx(R(86,150,150,18,4),k.lg(0,150,0,168,[[0,WOOD.f],[1,WOOD.d]]),{});
  s+=k.fx(R(54,48,222,26,4),k.lg(0,48,0,74,[[0,WOOD.f],[1,'#8f5a31']]),{});
  s+=k.fx(P('M62,8 L262,8 L278,26 L46,26 Z'),'#d9a066',{d:3,sh:.14,hi:.25});
  s+=grain(66,10,192,15,3,'#7a4a2a',.25);
  s+=k.fx(R(46,26,232,24,6),k.lg(0,26,0,50,[[0,'#b97f47'],[1,WOOD.d]]),{});
  /* étau en fonte sur le coin gauche */
  s+=k.fx(R(30,2,50,56,7),k.lg(30,0,80,0,[[0,'#b8bdc9'],[1,'#6f7585']]),{});
  s+=k.fx(R(22,14,22,40,5),k.lg(22,0,44,0,[[0,'#9aa0ae'],[1,'#5f6575']]),{sh:.3});
  s+=`<rect x="58" y="16" width="12" height="6" fill="#4a4f5e"/>`;
  s+=line(23,30,10,30,O,9);s+=line(23,30,10,30,'#b6bbc6',4);
  s+=`<circle cx="9" cy="30" r="7" fill="#d2342f" stroke="${O}" stroke-width="3"/><circle cx="7" cy="28" r="2" fill="#fff" opacity=".7"/>`;
  s+=boltS(66,48,4);
  art('furn-etau',W,H,s,k.d.join(''))})();

/* ================= TAPIS ROULANTS (a et b symétriques) ================= */
function belt(name,W,flip){const H=186,k=kit(W,H,3.2);let s='';const G=180;
  const T=flip?(x=>W-x):(x=>x);
  const rectT=(x,y,w,h,r)=>R(flip?W-x-w:x,y,w,h,r);
  s+=gShadow(k,W/2,G,W*.46);
  /* pieds */
  s+=k.fx(rectT(26,150,34,30,4),'#555a68',{});s+=k.fx(rectT(W-60,150,34,30,4),'#555a68',{});
  /* caisson bas avec bandes de danger */
  s+=k.fx(rectT(10,104,W-20,56,8),k.lg(0,104,0,160,[[0,'#8f95a6'],[1,'#5f6575']]),{});
  for(const bx of [18,W-50]){const bw=32;
    s+=`<g clip-path="url(#hz${name}${bx})"></g>`;
    k.d.push(`<clipPath id="hz${name}${bx}">${rectT(bx,112,bw,40,4)('')}</clipPath>`);
    let st='';for(let i=-2;i<6;i++){const px=(flip?W-bx-bw:bx)+i*14;st+=`<polygon points="${px},152 ${px+9},152 ${px+9+40},112 ${px+40},112" fill="#f0c04a"/>`}
    s+=`<g clip-path="url(#hz${name}${bx})"><rect x="${(flip?W-bx-bw:bx)}" y="112" width="${bw}" height="40" fill="#2f2f38"/>${st}</g>`+rectT(bx,112,bw,40,4)(`fill="none" stroke="${O}" stroke-width="2.4"`)}
  s+=`<rect x="${W/2-24}" y="116" width="48" height="26" rx="6" fill="#4d5262" stroke="${O}" stroke-width="2.4"/><circle cx="${W/2-8}" cy="129" r="5" fill="#2f7a4f" stroke="${O}" stroke-width="2"/><circle cx="${W/2+10}" cy="129" r="5" fill="#d2342f" stroke="${O}" stroke-width="2"/>`;
  /* bande (dessus en perspective) */
  s+=k.fx(P(`M26,42 L${W-26},42 L${W-8},98 L8,98 Z`),k.lg(0,42,0,98,[[0,'#3a3d4a'],[1,'#252733']]),{d:3,hi:.15});
  for(let i=1;i<9;i++){const t=i/9,xa=26+(W-52)*t,xb=8+(W-16)*t;s+=line(xa,42,xb,98,'#6b7082',2,.45)}
  s+=`<polygon points="26,42 ${W-26},42 ${W-24},50 28,50" fill="#000" opacity=".25"/>`;
  /* rails latéraux */
  s+=k.fx(R(2,90,W-4,22,9),k.lg(0,90,0,112,[[0,'#d3d7e0'],[1,'#8b91a2']]),{});
  s+=k.fx(R(6,36,22,70,10),k.lg(6,0,28,0,[[0,'#d3d7e0'],[1,'#8b91a2']]),{});
  s+=k.fx(R(W-28,36,22,70,10),k.lg(W-28,0,W-6,0,[[0,'#d3d7e0'],[1,'#8b91a2']]),{});
  /* rouleaux d'extrémité */
  for(const cx of [30,W-30]){s+=`<circle cx="${cx}" cy="101" r="19" fill="${k.lg(cx-19,82,cx+19,120,[[0,'#cfd3dc'],[1,'#6f7585']])}" stroke="${O}" stroke-width="3.2"/><circle cx="${cx}" cy="101" r="8" fill="#e8eaf0" stroke="${O}" stroke-width="2.4"/><circle cx="${cx-2}" cy="99" r="2.4" fill="#fff"/>`}
  art(name,W,H,s,k.d.join(''))}
belt('furn-tapis-a',198,false);belt('furn-tapis-b',190,true);

/* ================= PRESSE ================= */
(function(){const W=280,H=421,k=kit(W,H,5.6);let s='';const G=408;
  s+=gShadow(k,W/2,G-4,W*.5);
  const RD=k.lg(0,0,280,0,[[0,'#ee5a4f'],[.45,'#d2342f'],[1,'#9f2420']]);
  /* socle doré */
  s+=k.fx(P('M12,408 L268,408 L276,388 L4,388 Z'),k.lg(0,388,0,408,[[0,'#f0c04a'],[1,'#b98a22']]),{});
  s+=k.fx(R(26,296,228,96,10),RD,{});
  s+=k.fx(R(20,292,240,18,6),k.lg(0,292,0,310,[[0,'#fbe08a'],[1,'#d8a73a']]),{});
  /* boutons */
  for(const [cx,r] of [[84,17],[140,19]]){s+=`<circle cx="${cx}" cy="350" r="${r+5}" fill="#b98a22" stroke="${O}" stroke-width="3.4"/><circle cx="${cx}" cy="350" r="${r}" fill="${k.rg(cx-4,346,r,[[0,'#fff0a8'],[1,'#d8a73a']])}" stroke="${O}" stroke-width="2.6"/><line x1="${cx}" y1="${350-r+4}" x2="${cx}" y2="350" stroke="${O}" stroke-width="3" stroke-linecap="round"/>`}
  s+=`<circle cx="196" cy="340" r="8" fill="#43c37a" stroke="${O}" stroke-width="3"/><circle cx="194" cy="338" r="2.5" fill="#fff"/><circle cx="224" cy="340" r="8" fill="#2f7a4f" stroke="${O}" stroke-width="3"/><rect x="186" y="360" width="46" height="14" rx="5" fill="#9f2420" stroke="${O}" stroke-width="2.6"/>`;
  s+=boltS(38,376,5)+boltS(242,376,5);
  /* enclume + plaque */
  s+=k.fx(R(60,268,160,30,5),k.lg(0,268,0,298,[[0,'#b9bdc9'],[1,'#707687']]),{});
  /* montants */
  s+=k.fx(R(58,110,38,190,6),k.lg(58,0,96,0,[[0,'#ee5a4f'],[.5,'#d2342f'],[1,'#9f2420']]),{});
  s+=k.fx(R(184,110,38,190,6),k.lg(184,0,222,0,[[0,'#ee5a4f'],[.5,'#d2342f'],[1,'#9f2420']]),{});
  /* piston */
  s+=k.fx(R(122,130,36,106,4),k.lg(122,0,158,0,[[0,'#fbe08a'],[.5,'#e2b13f'],[1,'#a8791c']]),{});
  s+=k.fx(R(100,230,80,30,6),k.lg(0,230,0,260,[[0,'#cfd3dc'],[1,'#6f7585']]),{});
  /* tête */
  s+=k.fx(R(50,48,180,90,14),RD,{});
  s+=k.fx(R(44,40,192,20,8),k.lg(0,40,0,60,[[0,'#fbe08a'],[1,'#d8a73a']]),{});
  s+=`<circle cx="140" cy="96" r="27" fill="#b98a22" stroke="${O}" stroke-width="3.6"/><circle cx="140" cy="96" r="21" fill="#fff8e4" stroke="${O}" stroke-width="2.4"/>`;
  for(let i=0;i<9;i++){const a=Math.PI*(.85+i*.1);}
  s+=line(140,96,152,82,'#d2342f',3.4)+`<circle cx="140" cy="96" r="3.5" fill="${O}"/>`;
  s+=`<path d="M123,106 A19,19 0 0 1 157,106" fill="none" stroke="#2f7a4f" stroke-width="3" stroke-linecap="round" opacity=".8"/>`;
  s+=`<circle cx="72" cy="94" r="7" fill="#43c37a" stroke="${O}" stroke-width="2.8"/><circle cx="208" cy="94" r="7" fill="#43c37a" stroke="${O}" stroke-width="2.8"/>`;
  s+=boltS(62,72,4.5)+boltS(218,72,4.5);
  /* levier */
  s+=`<path d="M218,66 L262,14" stroke="${O}" stroke-width="22" stroke-linecap="round"/><path d="M218,66 L262,14" stroke="${k.lg(218,14,262,66,[[0,'#d9a066'],[1,'#8f5a31']])}" stroke-width="15" stroke-linecap="round"/><path d="M222,58 L256,18" stroke="#f3cf9e" stroke-width="3" stroke-linecap="round" opacity=".7"/>`;
  s+=`<circle cx="262" cy="14" r="12" fill="${k.rg(258,10,12,[[0,'#e2a36c'],[1,'#8f5a31']])}" stroke="${O}" stroke-width="4"/>`;
  s+=`<circle cx="218" cy="66" r="9" fill="#f0c04a" stroke="${O}" stroke-width="3.4"/><circle cx="216" cy="64" r="2.6" fill="#fff"/>`;
  art('furn-presse',W,H,s,k.d.join(''))})();

/* ================= CAISSES ================= */
(function(){const W=346,H=373,k=kit(W,H,4.4);let s='';const G=362;
  s+=gShadow(k,W/2,G,W*.48);
  function crate(x,y,w,h,ang){let t='';const tp=h*.16,ins=w*.05;
    t+=k.fx(P(`M${x+ins},${y-tp} L${x+w-ins},${y-tp} L${x+w},${y} L${x},${y} Z`),k.lg(0,y-tp,0,y,[[0,'#d9a066'],[1,'#c08650']]),{d:2,hi:.2,sh:.12});
    t+=grain(x+10,y-tp+2,w-20,tp-3,3,'#7a4a2a',.3);
    t+=k.fx(R(x,y,w,h,5),k.lg(0,y,0,y+h,[[0,'#b57a44'],[1,'#8a5630']]),{});
    for(let i=1;i<4;i++)t+=line(x+3,y+h*i/4,x+w-3,y+h*i/4,O,2.4,.55);
    t+=grain(x+8,y+4,w-16,h-8,8,'#ffe2b0',.07);
    /* cadre de lattes */
    const f='#9a6234';
    t+=k.fx(R(x,y,18,h,4),k.lg(x,0,x+18,0,[[0,'#c78d55'],[1,'#8a5630']]),{d:2,sh:.2,hi:.3,sw:3.2});
    t+=k.fx(R(x+w-18,y,18,h,4),k.lg(x+w-18,0,x+w,0,[[0,'#c78d55'],[1,'#8a5630']]),{d:2,sh:.2,hi:.3,sw:3.2});
    t+=boltS(x+9,y+12,3.2)+boltS(x+9,y+h-12,3.2)+boltS(x+w-9,y+12,3.2)+boltS(x+w-9,y+h-12,3.2);
    t+=star(x+w/2,y+h/2+1,h*.27,'#f0c04a',k);
    t+=`<polygon points="${x+w/2-h*.04},${y+h/2-h*.2} ${x+w/2+h*.02},${y+h/2-h*.18} ${x+w/2},${y+h/2-h*.05}" fill="#fff6c8" opacity=".6"/>`;
    return t}
  s+=crate(2,252,162,110);s+=crate(178,254,166,108);
  s+=crate(22,142,150,108);s+=crate(182,146,142,106);
  s+=crate(92,34,148,106);
  art('furn-caisses',W,H,s,k.d.join(''))})();

/* ================= EMBALLAGE ================= */
(function(){const W=439,H=291,k=kit(W,H,4);let s='';const G=282;
  s+=gShadow(k,W/2,G,W*.46);
  const leg=x=>k.fx(R(x,140,36,G-140,5),k.lg(x,0,x+36,0,[[0,WOOD.f],[1,WOOD.d]]),{});
  s+=leg(26)+leg(378);
  s+=k.fx(R(18,G-24,52,24,5),WOOD.d,{})+k.fx(R(370,G-24,52,24,5),WOOD.d,{});
  s+=k.fx(R(62,222,316,18,4),k.lg(0,222,0,240,[[0,WOOD.f],[1,WOOD.d]]),{});
  s+=k.fx(R(26,142,388,44,4),k.lg(0,142,0,186,[[0,WOOD.f],[1,'#8f5a31']]),{});
  s+=k.fx(R(150,150,138,28,4),'#b97f47',{sh:.2});
  s+=`<circle cx="219" cy="164" r="6.5" fill="#f0c04a" stroke="${O}" stroke-width="2.6"/><circle cx="217" cy="162" r="2" fill="#fff0a8"/>`;
  s+=k.fx(P('M34,108 L405,108 L433,134 L6,134 Z'),'#d9a066',{d:3,sh:.14,hi:.25});
  s+=grain(40,110,360,22,3,'#7a4a2a',.22);
  s+=k.fx(R(6,134,427,28,6),k.lg(0,134,0,162,[[0,'#b97f47'],[1,WOOD.d]]),{});
  s+=line(14,143,425,143,'#e8b980',2,.35);
  /* rouleaux de papier (3, en pile) */
  function roll(x,y,w,r,col,dot){let t='';
    t+=k.fx(R(x,y-r,w,2*r,3),k.lg(0,y-r,0,y+r,[[0,col.hi],[.45,col.f],[1,col.d]]),{d:3,sh:.25});
    /* motif */
    for(let i=0;i<9;i++){const px=x+14+i*(w-24)/8,py=y+((i*37)%5-2)*r*.28;t+=`<circle cx="${px}" cy="${py}" r="${r*.1}" fill="${dot}" opacity=".85"/>`}
    t+=`<ellipse cx="${x}" cy="${y}" rx="${r*.36}" ry="${r}" fill="#f3e4c8" stroke="${O}" stroke-width="3.4"/><ellipse cx="${x}" cy="${y}" rx="${r*.14}" ry="${r*.42}" fill="#8f5a31" stroke="${O}" stroke-width="2"/>`;
    return t}
  s+=roll(30,100,168,17,{f:'#2f7a4f',d:'#1f5538',hi:'#4d9b6c'},'#f0c04a');
  s+=roll(58,80,176,17,{f:'#d2342f',d:'#9f2420',hi:'#ee5a4f'},'#f0c04a');
  s+=roll(96,60,162,17,{f:'#f0c04a',d:'#c99a2c',hi:'#fbe08a'},'#d2342f');
  /* bobines de ruban */
  function spool(cx,col){let t='';
    t+=k.fx(R(cx-21,86,42,24,6),k.lg(cx-21,0,cx+21,0,[[0,'#d9a066'],[1,'#8f5a31']]),{d:2,sw:3});
    t+=k.fx(R(cx-24,72,48,18,8),k.lg(0,72,0,90,[[0,col.hi],[.5,col.f],[1,col.d]]),{d:2,sw:3});
    t+=k.fx(R(cx-24,102,48,14,7),k.lg(0,102,0,116,[[0,col.hi],[.5,col.f],[1,col.d]]),{d:2,sw:3});
    return t}
  s+=spool(300,RED);s+=spool(354,GRN);
  /* rubans qui pendent */
  s+=`<path d="M284,116 C276,130 292,144 280,158" fill="none" stroke="${O}" stroke-width="12" stroke-linecap="round"/><path d="M284,116 C276,130 292,144 280,158" fill="none" stroke="#f0c04a" stroke-width="7" stroke-linecap="round"/>`;
  s+=`<path d="M372,114 C386,128 366,148 380,166" fill="none" stroke="${O}" stroke-width="12" stroke-linecap="round"/><path d="M372,114 C386,128 366,148 380,166" fill="none" stroke="#d2342f" stroke-width="7" stroke-linecap="round"/>`;
  /* ciseaux/règle */
  s+=`<polygon points="224,112 262,100 266,108 228,122" fill="#e7cf8e" stroke="${O}" stroke-width="2.6" stroke-linejoin="round"/>`;
  art('furn-emballage',W,H,s,k.d.join(''))})();

/* ================= CHARIOT ================= */
(function(){const W=287,H=322,k=kit(W,H,4.4);let s='';const G=312;
  s+=gShadow(k,W/2,G,W*.46);
  /* poignée en U */
  s+=`<path d="M52,160 L52,26 Q52,12 66,12 L222,12 Q236,12 236,26 L236,160" fill="none" stroke="${O}" stroke-width="22" stroke-linecap="round" stroke-linejoin="round"/><path d="M52,160 L52,26 Q52,12 66,12 L222,12 Q236,12 236,26 L236,160" fill="none" stroke="${k.lg(0,0,288,0,[[0,'#c98a4c'],[.5,'#a9703d'],[1,'#7a4a2a']])}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/><path d="M62,18 L216,18" stroke="#e8b980" stroke-width="3" stroke-linecap="round" opacity=".7"/>`;
  /* plateau : intérieur visible */
  s+=k.fx(P('M34,150 L254,150 L270,196 L18,196 Z'),k.lg(0,150,0,196,[[0,'#7a4a2a'],[1,'#b57a44']]),{d:3,sh:.1,hi:.1});
  for(let i=1;i<6;i++){const t=i/6;s+=line(34+220*t,150,18+252*t,196,O,2,.4)}
  /* roues arrière visibles de chaque côté */
  for(const [cx] of [[28],[259]]){
    s+=`<ellipse cx="${cx}" cy="248" rx="24" ry="58" fill="#2f3140" stroke="${O}" stroke-width="4.4"/><ellipse cx="${cx+(cx<100?4:-4)}" cy="248" rx="14" ry="42" fill="#4a4d62"/><ellipse cx="${cx+(cx<100?7:-7)}" cy="248" rx="7" ry="14" fill="#f0c04a" stroke="${O}" stroke-width="3"/><ellipse cx="${cx-6}" cy="214" rx="4" ry="16" fill="#fff" opacity=".18"/>`}
  /* caisse du chariot */
  s+=k.fx(R(22,192,244,80,8),k.lg(0,192,0,272,[[0,'#b57a44'],[1,'#8a5630']]),{});
  for(let i=1;i<3;i++)s+=line(24,192+80*i/3,264,192+80*i/3,O,2.6,.6);
  s+=k.fx(R(22,192,244,14,5),k.lg(0,192,0,206,[[0,'#d9a066'],[1,'#b57a44']]),{d:2,sw:3.4});
  s+=k.fx(R(22,204,24,68,5),k.lg(22,0,46,0,[[0,'#c78d55'],[1,'#8a5630']]),{d:2,sw:3.2});
  s+=k.fx(R(242,204,24,68,5),k.lg(242,0,266,0,[[0,'#c78d55'],[1,'#8a5630']]),{d:2,sw:3.2});
  s+=boltS(34,218,3.6)+boltS(34,258,3.6)+boltS(254,218,3.6)+boltS(254,258,3.6);
  /* pieds */
  s+=k.fx(R(60,268,22,34,4),WOOD.d,{d:2,sw:3.4})+k.fx(R(206,268,22,34,4),WOOD.d,{d:2,sw:3.4});
  art('furn-chariot',W,H,s,k.d.join(''))})();

/* ================= CADEAUX ================= */
(function(){const W=263,H=361,k=kit(W,H,4.2);let s='';const G=350;
  s+=gShadow(k,W/2,G,W*.5);
  s+=gift(k,6,258,122,92,RED,GLD,false);
  s+=gift(k,128,284,112,66,BLU,GLD,false);
  s+=gift(k,10,160,104,96,GRN,GLD,false);
  s+=gift(k,120,186,120,92,RED,GLD,false);
  s+=gift(k,26,70,108,92,RED,GLD,true,34);
  s+=gift(k,142,96,70,74,GLD,RED,true,22);
  art('furn-cadeaux',W,H,s,k.d.join(''))})();

/* ================= SAC DU PÈRE NOËL ================= */
(function(){const W=273,H=303,k=kit(W,H,4.2);let s='';const G=294;
  s+=gShadow(k,W/2,G-2,W*.5);
  const SK=k.lg(0,0,273,0,[[0,'#dcb57f'],[.5,'#c9a06a'],[1,'#9d7544']]);
  /* jouets qui dépassent (derrière la gueule) */
  s+='<g transform="translate(0,12)">';
  s+=k.fx(R(14,26,40,56,6),'#2f7a4f',{d:2,sw:3.2});s+=`<rect x="22" y="36" width="24" height="14" rx="3" fill="#f0c04a" stroke="${O}" stroke-width="2"/>`;
  s+=k.fx(E(134,46,50,48),k.rg(122,34,56,[[0,'#d29a60'],[1,'#98623a']]),{d:4});
  s+=k.fx(E(96,24,19,19),'#b57a44',{d:2,sw:3.2})+`<circle cx="96" cy="26" r="9" fill="#e8c397"/>`;
  s+=k.fx(E(172,24,19,19),'#b57a44',{d:2,sw:3.2})+`<circle cx="172" cy="26" r="9" fill="#e8c397"/>`;
  s+=`<ellipse cx="116" cy="46" rx="5" ry="6" fill="${O}"/><ellipse cx="152" cy="46" rx="5" ry="6" fill="${O}"/><circle cx="114" cy="44" r="1.8" fill="#fff"/><circle cx="150" cy="44" r="1.8" fill="#fff"/>`;
  s+=`<ellipse cx="134" cy="62" rx="17" ry="12" fill="#e8c397" stroke="${O}" stroke-width="2.6"/><ellipse cx="134" cy="58" rx="6" ry="4.5" fill="${O}"/>`;
  s+=`<path d="M236,34 q-22,-34 -34,-8 l0,48" fill="none" stroke="${O}" stroke-width="15" stroke-linecap="round" stroke-linejoin="round"/><path d="M236,34 q-22,-34 -34,-8 l0,48" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/><path d="M226,12 l6,12 M214,18 l8,10 M204,36 l12,2" stroke="#d2342f" stroke-width="5" stroke-linecap="round"/>`;
  /* balles et train */
  const ball=(cx,cy,r,c)=>k.fx(E(cx,cy,r,r),k.rg(cx-r*.3,cy-r*.35,r*1.2,[[0,c[0]],[1,c[1]]]),{d:3,sw:3.4})+`<ellipse cx="${cx-r*.35}" cy="${cy-r*.4}" rx="${r*.22}" ry="${r*.14}" fill="#fff" opacity=".7"/>`;
  s+=ball(74,70,22,['#6a96d4','#284c86']);
  s+=ball(206,66,20,['#f0c04a','#b98a22']);
  s+='</g>';
  /* corps du sac */
  s+=k.fx(P('M54,92 C16,120 -2,188 10,238 C16,270 44,292 136,292 C228,292 258,270 264,236 C274,186 250,120 214,92 C190,108 80,108 54,92 Z'),SK,{d:7});
  /* plis de toile */
  s+=`<path d="M52,138 C70,168 66,210 58,252" fill="none" stroke="#7d5a30" stroke-width="3" stroke-linecap="round" opacity=".4"/><path d="M192,126 C214,164 222,212 214,258" fill="none" stroke="#7d5a30" stroke-width="3" stroke-linecap="round" opacity=".35"/><path d="M118,158 C128,196 120,240 128,284" fill="none" stroke="#7d5a30" stroke-width="3" stroke-linecap="round" opacity=".3"/>`;
  for(let i=0;i<14;i++){const px=30+(i*53)%210,py=140+(i*37)%130;s+=`<line x1="${px}" y1="${py}" x2="${px+9}" y2="${py}" stroke="#7d5a30" stroke-width="2" opacity=".22"/>`}
  /* bord replié (gueule) */
  s+=k.fx(P('M46,96 C84,114 190,114 222,96 C232,108 228,122 214,128 C176,140 94,140 58,128 C44,122 38,106 46,96 Z'),k.lg(0,96,0,140,[[0,'#e2bd88'],[1,'#b78d57']]),{d:3,sw:3.8});
  /* corde et gland */
  s+=`<path d="M60,128 C100,142 180,142 214,128" fill="none" stroke="${O}" stroke-width="12" stroke-linecap="round"/><path d="M60,128 C100,142 180,142 214,128" fill="none" stroke="#f0c04a" stroke-width="6.5" stroke-linecap="round"/><path d="M74,130 l6,10 M104,138 l5,10 M150,140 l4,10 M186,138 l4,10" stroke="#b98a22" stroke-width="2.4" stroke-linecap="round" opacity=".8"/>`;
  s+=`<path d="M200,134 C208,160 202,182 214,198" fill="none" stroke="${O}" stroke-width="11" stroke-linecap="round"/><path d="M200,134 C208,160 202,182 214,198" fill="none" stroke="#f0c04a" stroke-width="6" stroke-linecap="round"/>`;
  s+=`<path d="M206,198 l16,0 l5,24 l-26,0 Z" fill="#f0c04a" stroke="${O}" stroke-width="3.2" stroke-linejoin="round"/><path d="M208,206 l12,0 M207,214 l14,0" stroke="#b98a22" stroke-width="2" opacity=".8"/>`;
  /* train jouet devant */
  s+=k.fx(R(176,76,52,26,5),'#d2342f',{d:2,sw:3})+`<circle cx="188" cy="104" r="8" fill="#2f2f38" stroke="${O}" stroke-width="2.6"/><circle cx="216" cy="104" r="8" fill="#2f2f38" stroke="${O}" stroke-width="2.6"/>`;
  s+=k.fx(R(26,92,38,28,6),'#43a36a',{d:2,sw:3});
  art('furn-sac',W,H,s,k.d.join(''))})();

/* ================= DÉCOR DE FOND (bg) : perspective à un point de fuite central ================= */
(function(){
const W=1152,H=1728,k=kit(W,H,3);
const VX=576,VY=950,F=1116,WM=6.58,HC=11.83,ZW=24,FL=-.86;
const pj=(X,Y,Z)=>[VX+X*F/Z,VY-Y*F/Z];
const f1=n=>(Math.round(n*10)/10);
const pts=(a)=>a.map(p=>f1(p[0])+','+f1(p[1])).join(' ');
const pth=(a)=>'M'+a.map(p=>f1(p[0])+','+f1(p[1])).join(' L')+' Z';
let seed=7;const rnd=()=>{seed=(seed*16807)%2147483647;return (seed-1)/2147483646};
const hex=c=>[parseInt(c.slice(1,3),16),parseInt(c.slice(3,5),16),parseInt(c.slice(5,7),16)];
const mix=(a,b,t)=>{const A=hex(a),B=hex(b);return '#'+A.map((v,i)=>Math.round(v+(B[i]-v)*t).toString(16).padStart(2,'0')).join('')};
const HAZE='#9fb4dc';
const hz=(c,Z)=>mix(c,HAZE,Math.max(0,Math.min(.6,(Z-11)/13*.55)));
const SW=2.6;
let s='';
/* ---------- fond de sécurité ---------- */
s+=`<rect width="${W}" height="${H}" fill="#2a1a22"/>`;

/* ---------- mur du fond ---------- */
const WX0=VX-WM*F/ZW,WX1=VX+WM*F/ZW,WY0=VY-HC*F/ZW,WY1=VY-FL*F/ZW;
const bwpt=(u,Y)=>pj(u,Y,ZW);
s+=`<rect x="${f1(WX0)}" y="${f1(WY0)}" width="${f1(WX1-WX0)}" height="${f1(WY1-WY0)}" fill="${k.lg(0,WY0,0,WY1,[[0,'#7686b2'],[.45,'#9fb0d6'],[1,'#c0cbe4']])}"/>`;
/* pierres du mur */
for(let r=0;r<13;r++){const Y=FL+r*1.0;const a=bwpt(-WM,Y),b=bwpt(WM,Y);s+=`<line x1="${f1(a[0])}" y1="${f1(a[1])}" x2="${f1(b[0])}" y2="${f1(b[1])}" stroke="#5f70a0" stroke-width="1.6" opacity=".28"/>`;
  for(let c=-3;c<=3;c++){const u=c*2.2+(r%2?1.1:0);if(Math.abs(u)>WM)continue;const p=bwpt(u,Y),q=bwpt(u,Y+1);s+=`<line x1="${f1(p[0])}" y1="${f1(p[1])}" x2="${f1(q[0])}" y2="${f1(q[1])}" stroke="#5f70a0" stroke-width="1.4" opacity=".22"/>`}}

/* ---------- fenêtre en arc sur nuit étoilée ---------- */
(function(){
  const x0=466,x1=686,yb=905,ys=596,r=110,cx=576;
  const arch=(p)=>`M${cx-r-p},${yb+p*0} L${cx-r-p},${ys} A${r+p},${r+p} 0 0 1 ${cx+r+p},${ys} L${cx+r+p},${yb} Z`;
  /* encadrement pierre */
  s+=`<path d="${arch(16)}" fill="${k.lg(0,480,0,905,[[0,'#d8d3cc'],[1,'#a79f98']])}" stroke="${O}" stroke-width="${SW+.6}" stroke-linejoin="round"/>`;
  for(let i=0;i<9;i++){const a=Math.PI*(1+i/8),rr=r+16;const px=cx+Math.cos(a)*rr,py=ys+Math.sin(a)*rr,qx=cx+Math.cos(a)*(r+1),qy=ys+Math.sin(a)*(r+1);s+=`<line x1="${f1(px)}" y1="${f1(py)}" x2="${f1(qx)}" y2="${f1(qy)}" stroke="#7d756e" stroke-width="2" opacity=".55"/>`}
  k.d.push(`<clipPath id="wclip"><path d="${arch(0)}"/></clipPath>`);
  s+=`<g clip-path="url(#wclip)">`;
  s+=`<rect x="${x0}" y="470" width="220" height="440" fill="${k.lg(0,480,0,905,[[0,'#121b3e'],[.55,'#2a437a'],[1,'#5b7cb4']])}"/>`;
  /* étoiles */
  for(let i=0;i<46;i++){const px=x0+rnd()*220,py=486+rnd()*340,rr=.8+rnd()*1.7;s+=`<circle cx="${f1(px)}" cy="${f1(py)}" r="${f1(rr)}" fill="#fff8e0" opacity="${f1(.5+rnd()*.5)}"/>`}
  for(const [px,py,q] of [[530,560,7],[620,520,6],[600,660,5],[510,700,6],[650,730,5]]){s+=`<path d="M${px},${py-q} L${px+q*.28},${py-q*.28} L${px+q},${py} L${px+q*.28},${py+q*.28} L${px},${py+q} L${px-q*.28},${py+q*.28} L${px-q},${py} L${px-q*.28},${py-q*.28} Z" fill="#fffbe8" opacity=".95"/>`}
  /* lune */
  s+=`<circle cx="620" cy="566" r="64" fill="${k.rg(620,566,64,[[0,'#fff6c8',.55],[1,'#fff6c8',0]])}"/>`;
  k.d.push(`<mask id="moonm"><rect x="560" y="510" width="120" height="120" fill="#fff"/><circle cx="632" cy="556" r="21" fill="#000"/></mask>`);
  s+=`<circle cx="619" cy="567" r="25" fill="#fff3c2" mask="url(#moonm)"/>`;
  /* collines enneigées + sapins */
  s+=`<path d="M440,850 C500,800 560,812 600,826 C640,840 680,806 720,812 L720,920 L440,920 Z" fill="#c9d9f0"/>`;
  s+=`<path d="M440,880 C490,846 548,862 590,872 C640,884 690,856 720,868 L720,920 L440,920 Z" fill="#eef4ff"/>`;
  for(const [px,py,sc] of [[500,845,1],[548,858,.7],[650,846,.9],[690,860,.65]]){
    s+=`<path d="M${px},${py-70*sc} L${px+26*sc},${py-26*sc} L${px+14*sc},${py-26*sc} L${px+34*sc},${py+4*sc} L${px-34*sc},${py+4*sc} L${px-14*sc},${py-26*sc} L${px-26*sc},${py-26*sc} Z" fill="#23415f"/><path d="M${px},${py-70*sc} L${px+14*sc},${py-44*sc} L${px-14*sc},${py-44*sc} Z M${px-8*sc},${py-20*sc} L${px+8*sc},${py-20*sc} L${px+16*sc},${py-6*sc} L${px-16*sc},${py-6*sc} Z" fill="#f4f8ff"/>`}
  /* neige qui tombe */
  for(let i=0;i<34;i++){const px=x0+rnd()*220,py=490+rnd()*400;s+=`<circle cx="${f1(px)}" cy="${f1(py)}" r="${f1(1.4+rnd()*2.2)}" fill="#fff" opacity="${f1(.55+rnd()*.4)}"/>`}
  s+='</g>';
  /* meneaux */
  const bar=(x1,y1,x2,y2,w)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${O}" stroke-width="${w+3}" stroke-linecap="round"/><line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#8a5a36" stroke-width="${w}" stroke-linecap="round"/><line x1="${x1-1}" y1="${y1}" x2="${x2-1}" y2="${y2}" stroke="#c48a55" stroke-width="1.5" opacity=".7" stroke-linecap="round"/>`;
  for(const y of [660,750,838])s+=bar(cx-r,y,cx+r,y,6);
  for(const x of [cx-r*.5,cx+r*.5])s+=bar(x,ys-Math.sqrt(r*r-(r*.5)*(r*.5)),x,yb,5);
  s+=bar(cx,ys-r,cx,yb,8);
  for(const a of [45,135]){const t=a*Math.PI/180;s+=bar(cx,ys,cx+Math.cos(t)*r,ys-Math.sin(t)*r,4)}
  s+=`<path d="M${cx-r*.55},${ys} A${r*.55},${r*.55} 0 0 1 ${cx+r*.55},${ys}" fill="none" stroke="${O}" stroke-width="9" stroke-linecap="round"/><path d="M${cx-r*.55},${ys} A${r*.55},${r*.55} 0 0 1 ${cx+r*.55},${ys}" fill="none" stroke="#8a5a36" stroke-width="5" stroke-linecap="round"/>`;
  s+=`<path d="${arch(0)}" fill="none" stroke="${O}" stroke-width="3.6" stroke-linejoin="round"/>`;
  /* appui */
  s+=`<rect x="450" y="905" width="252" height="18" rx="5" fill="${k.lg(0,905,0,923,[[0,'#e8e2d8'],[1,'#a79f98']])}" stroke="${O}" stroke-width="${SW}"/>`;
  s+=`<path d="M466,905 C490,884 520,896 540,890 C566,882 590,896 620,889 C646,884 668,892 686,905 Z" fill="#f4f8ff" stroke="#c9d9f0" stroke-width="1.5"/>`;
})();

/* ---------- plinthe + lambris du mur du fond ---------- */
(function(){
  const a=bwpt(-WM,FL+1.2),b=bwpt(WM,FL+1.2),c=bwpt(WM,FL),d=bwpt(-WM,FL);
  s+=`<polygon points="${pts([a,b,c,d])}" fill="${k.lg(0,a[1],0,d[1],[[0,'#8f5f3a'],[1,'#6e4428']])}"/>`;
  for(let u=-WM;u<WM-.1;u+=1.5){const p=bwpt(u+.12,FL+1.05),q=bwpt(u+1.38,FL+.2);s+=`<rect x="${f1(p[0])}" y="${f1(p[1])}" width="${f1(q[0]-p[0])}" height="${f1(q[1]-p[1])}" rx="3" fill="#a06d43" opacity=".55" stroke="#4a2418" stroke-width="1.4" stroke-opacity=".45"/>`}
  s+=`<line x1="${f1(a[0])}" y1="${f1(a[1])}" x2="${f1(b[0])}" y2="${f1(b[1])}" stroke="${O}" stroke-width="${SW}"/>`;
  const e=bwpt(-WM,FL+.28),g=bwpt(WM,FL+.28);s+=`<line x1="${f1(e[0])}" y1="${f1(e[1])}" x2="${f1(g[0])}" y2="${f1(g[1])}" stroke="#4a2418" stroke-width="2" opacity=".5"/>`;
})();

/* ---------- étagères à jouets (mur du fond) ---------- */
function shelf(x,y,w,h,rows){
  const fr=14;
  s+=`<rect x="${x-fr}" y="${y-fr}" width="${w+2*fr}" height="${h+fr}" rx="5" fill="#7a4a2a" stroke="${O}" stroke-width="${SW}"/>`;
  s+=`<rect x="${x}" y="${y}" width="${w}" height="${h-4}" fill="${k.lg(0,y,0,y+h,[[0,'#5b3a2d'],[1,'#7a5a46']])}"/>`;
  const rh=(h-4)/rows;
  const cols=['#d2342f','#f0c04a','#2f7a4f','#3d6fb5','#f08a80','#8e63b8','#ff9a3d'];
  for(let r=0;r<rows;r++){
    const by=y+(r+1)*rh;let px=x+8;
    while(px<x+w-26){
      const t=Math.floor(rnd()*7),c=cols[Math.floor(rnd()*cols.length)],sz=16+rnd()*9,wid=Math.min(sz,x+w-8-px);
      const bx=px+sz/2;
      if(t===0){/* ours */
        s+=`<circle cx="${f1(bx)}" cy="${f1(by-sz*.38)}" r="${f1(sz*.38)}" fill="#b57a44" stroke="${O}" stroke-width="1.4"/><circle cx="${f1(bx)}" cy="${f1(by-sz*.9)}" r="${f1(sz*.27)}" fill="#c78d55" stroke="${O}" stroke-width="1.4"/><circle cx="${f1(bx-sz*.2)}" cy="${f1(by-sz*1.12)}" r="${f1(sz*.1)}" fill="#c78d55" stroke="${O}" stroke-width="1"/><circle cx="${f1(bx+sz*.2)}" cy="${f1(by-sz*1.12)}" r="${f1(sz*.1)}" fill="#c78d55" stroke="${O}" stroke-width="1"/>`}
      else if(t===1){s+=`<rect x="${f1(px)}" y="${f1(by-sz)}" width="${f1(sz)}" height="${f1(sz)}" rx="2" fill="${c}" stroke="${O}" stroke-width="1.4"/><rect x="${f1(px+sz*.35)}" y="${f1(by-sz)}" width="${f1(sz*.3)}" height="${f1(sz)}" fill="#f0c04a" opacity=".85"/>`}
      else if(t===2){s+=`<circle cx="${f1(bx)}" cy="${f1(by-sz*.5)}" r="${f1(sz*.5)}" fill="${c}" stroke="${O}" stroke-width="1.4"/><path d="M${f1(bx-sz*.45)},${f1(by-sz*.4)} Q${f1(bx)},${f1(by-sz*.8)} ${f1(bx+sz*.45)},${f1(by-sz*.4)}" fill="none" stroke="#fff" stroke-width="2" opacity=".7"/>`}
      else if(t===3){s+=`<rect x="${f1(px)}" y="${f1(by-sz*.55)}" width="${f1(sz*1.3)}" height="${f1(sz*.4)}" rx="2" fill="${c}" stroke="${O}" stroke-width="1.4"/><rect x="${f1(px+sz*.8)}" y="${f1(by-sz*.9)}" width="${f1(sz*.45)}" height="${f1(sz*.35)}" fill="#f0c04a" stroke="${O}" stroke-width="1.2"/><circle cx="${f1(px+sz*.25)}" cy="${f1(by-sz*.1)}" r="${f1(sz*.12)}" fill="#333" /><circle cx="${f1(px+sz*1)}" cy="${f1(by-sz*.1)}" r="${f1(sz*.12)}" fill="#333"/>`;px+=sz*.4}
      else if(t===4){s+=`<rect x="${f1(px)}" y="${f1(by-sz*.8)}" width="${f1(sz*.8)}" height="${f1(sz*.8)}" rx="3" fill="${c}" stroke="${O}" stroke-width="1.4"/><circle cx="${f1(px+sz*.4)}" cy="${f1(by-sz*1.05)}" r="${f1(sz*.22)}" fill="#f6c7a0" stroke="${O}" stroke-width="1.2"/>`}
      else if(t===5){s+=`<rect x="${f1(px)}" y="${f1(by-sz*.8)}" width="${f1(sz)}" height="${f1(sz*.8)}" rx="3" fill="${c}" stroke="${O}" stroke-width="1.4"/><rect x="${f1(px)}" y="${f1(by-sz*.8)}" width="${f1(sz)}" height="${f1(sz*.15)}" fill="#fff" opacity=".8"/>`}
      else {s+=`<rect x="${f1(px)}" y="${f1(by-sz*.7)}" width="${f1(sz*.9)}" height="${f1(sz*.7)}" fill="${c}" stroke="${O}" stroke-width="1.4"/><path d="M${f1(px)},${f1(by-sz*.7)} L${f1(px+sz*.45)},${f1(by-sz*1.1)} L${f1(px+sz*.9)},${f1(by-sz*.7)} Z" fill="#d2342f" stroke="${O}" stroke-width="1.4"/>`}
      px+=sz+6+rnd()*5}
    s+=`<rect x="${x-4}" y="${f1(by)}" width="${w+8}" height="6" rx="2" fill="#a06d43" stroke="${O}" stroke-width="1.6"/>`}
  /* brume légère */
  s+=`<rect x="${x-fr}" y="${y-fr}" width="${w+2*fr}" height="${h+fr}" rx="5" fill="#9fb4dc" opacity=".14"/>`;
}
shelf(298,640,118,340,5);shelf(736,640,118,340,5);

/* ---------- plafond et poutres ---------- */
s+='<!--CEIL-->';
const ceilPoly=[[WX0,WY0],[WX1,WY0],[1152+60,pj(WM,HC,ZW-12.2)[1]],[1152+60,-40],[-60,-40],[-60,pj(-WM,HC,ZW-12.2)[1]]];
(function(){
  const Zn=11;
  const ceil=[pj(-WM,HC,ZW),pj(WM,HC,ZW),pj(WM,HC,Zn),pj(-WM,HC,Zn)];
  s+=`<polygon points="${pts(ceil)}" fill="${k.lg(0,-40,0,WY0,[[0,'#4a2c1e'],[.6,'#6e4a38'],[1,'#8e7480']])}"/>`;
  /* lames du plafond */
  for(let X=-WM;X<=WM+.01;X+=.55){const a=pj(X,HC,ZW),b=pj(X,HC,Zn);s+=`<line x1="${f1(a[0])}" y1="${f1(a[1])}" x2="${f1(b[0])}" y2="${f1(b[1])}" stroke="#2a150e" stroke-width="1.8" opacity=".5"/>`}
  /* poutres longitudinales */
  const lg=(X,w,hb)=>{
    const Zs=[ZW,Zn];
    const u=[pj(X-w,HC-hb,ZW),pj(X+w,HC-hb,ZW),pj(X+w,HC-hb,Zn),pj(X-w,HC-hb,Zn)];
    s+=`<polygon points="${pts(u)}" fill="${k.lg(0,0,0,WY0,[[0,'#8a5a36'],[1,'#a98274']])}" stroke="${O}" stroke-width="${SW}" stroke-linejoin="round"/>`;
    const side=X<0?[pj(X+w,HC-hb,ZW),pj(X+w,HC,ZW),pj(X+w,HC,Zn),pj(X+w,HC-hb,Zn)]:[pj(X-w,HC-hb,ZW),pj(X-w,HC,ZW),pj(X-w,HC,Zn),pj(X-w,HC-hb,Zn)];
    s+=`<polygon points="${pts(side)}" fill="#4a2a1a" stroke="${O}" stroke-width="${SW}" stroke-linejoin="round"/>`};
  lg(-4.8,.3,.5);lg(-2.4,.3,.5);lg(0,.3,.5);lg(2.4,.3,.5);lg(4.8,.3,.5);
  /* poutres transversales (chevrons) */
  const cross=(Z,t,hb)=>{
    const Zf=Z-t;
    const under=[pj(-WM,HC-hb,Z),pj(WM,HC-hb,Z),pj(WM,HC-hb,Zf),pj(-WM,HC-hb,Zf)];
    s+=`<polygon points="${pts(under)}" fill="${k.lg(0,pj(0,HC-hb,Z)[1],0,pj(0,HC-hb,Zf)[1],[[0,hz('#8a5a36',Z)],[1,hz('#a8754a',Z)]])}" stroke="${O}" stroke-width="${SW}" stroke-linejoin="round"/>`;
    const face=[pj(-WM,HC,Z),pj(WM,HC,Z),pj(WM,HC-hb,Z),pj(-WM,HC-hb,Z)];
    s+=`<polygon points="${pts(face)}" fill="${k.lg(0,pj(0,HC,Z)[1],0,pj(0,HC-hb,Z)[1],[[0,hz('#5a3320',Z)],[1,hz('#4a2a1a',Z)]])}" stroke="${O}" stroke-width="${SW+.4}" stroke-linejoin="round"/>`;
    const hi=pj(-WM,HC-hb*.12,Z),hj=pj(WM,HC-hb*.12,Z);s+=`<line x1="${f1(hi[0])}" y1="${f1(hi[1])}" x2="${f1(hj[0])}" y2="${f1(hj[1])}" stroke="#d9a066" stroke-width="2" opacity=".45"/>`};
  cross(23.7,.6,.7);cross(20.2,.6,.7);cross(17.2,.6,.7);cross(14.8,.6,.7);
})();

/* ---------- murs latéraux ---------- */
const LW=(Z,Y)=>pj(-WM,Y,Z),RW=(Z,Y)=>pj(WM,Y,Z);
(function(){
  const Zn=11;
  for(const side of ['L','R']){
    const P2=side==='L'?LW:RW;
    const poly=[P2(ZW,HC),P2(Zn,HC),P2(Zn,FL),P2(ZW,FL)];
    const x0=P2(ZW,0)[0],x1=P2(Zn,0)[0];
    const warm=side==='L';
    s+=`<polygon points="${pts(poly)}" fill="${k.lg(x0,0,x1,0,warm?[[0,'#a2a2c0'],[.55,'#c49a86'],[1,'#d78d5a']]:[[0,'#a2a6c4'],[.55,'#8b86a0'],[1,'#6f5e6c']])}"/>`;
    /* lambris bois en bas (jusqu'à Y=1.2) */
    const lamb=[P2(ZW,1.2),P2(Zn,1.2),P2(Zn,FL),P2(ZW,FL)];
    s+=`<polygon points="${pts(lamb)}" fill="${k.lg(x0,0,x1,0,warm?[[0,'#8a5a3a'],[1,'#b87a44']]:[[0,'#7e5238'],[1,'#5a3a2a']])}"/>`;
    for(let Z=ZW;Z>Zn;Z-=1.6){const a=P2(Z,1.2),b=P2(Z,FL);s+=`<line x1="${f1(a[0])}" y1="${f1(a[1])}" x2="${f1(b[0])}" y2="${f1(b[1])}" stroke="#3a1f12" stroke-width="2" opacity=".5"/>`}
    for(const Y of [1.2,-.1,.5]){const a=P2(ZW,Y),b=P2(Zn,Y);s+=`<line x1="${f1(a[0])}" y1="${f1(a[1])}" x2="${f1(b[0])}" y2="${f1(b[1])}" stroke="${Y===1.2?O:'#3a1f12'}" stroke-width="${Y===1.2?SW+1:1.8}" opacity="${Y===1.2?1:.4}"/>`}
    /* poteaux verticaux de la partie haute (colombage) */
    for(const Z of [23.7,20.2,17.2,14.8]){const a=P2(Z,HC),b=P2(Z,1.2);s+=`<polygon points="${pts([a,P2(Z-.6,HC),P2(Z-.6,1.2),b])}" fill="#6a4228" stroke="${O}" stroke-width="2.2" stroke-linejoin="round"/>`}
    /* plinthe */
    const bs=[P2(ZW,FL+.3),P2(Zn,FL+.3),P2(Zn,FL),P2(ZW,FL)];s+=`<polygon points="${pts(bs)}" fill="#4a2c1b" stroke="${O}" stroke-width="2.4"/>`;
    /* lisière de plafond (corniche) */
    const co=[P2(ZW,HC),P2(Zn,HC),P2(Zn,HC-.6),P2(ZW,HC-.6)];s+=`<polygon points="${pts(co)}" fill="#5a3a26" stroke="${O}" stroke-width="2.4" stroke-linejoin="round"/>`;
    /* arête d'angle */
    const c1=side==='L'?LW(ZW,HC):RW(ZW,HC),c2=side==='L'?LW(ZW,FL):RW(ZW,FL);
    s+=`<line x1="${f1(c1[0])}" y1="${f1(c1[1])}" x2="${f1(c2[0])}" y2="${f1(c2[1])}" stroke="${O}" stroke-width="${SW+.6}"/>`}
})();

/* ---------- plancher en parquet (lames convergentes) ---------- */
s+='<!--FLOOR-->';
(function(){
  const fl=[[WX0,WY1],[WX1,WY1],[1152+80,pj(WM,FL,ZW-11.6)[1]],[1152+80,H+20],[-80,H+20],[-80,pj(-WM,FL,ZW-11.6)[1]]];
  s+=`<polygon points="${pts(fl)}" fill="${k.lg(0,WY1,0,H,[[0,'#b69a86'],[.08,'#b07a4e'],[.4,'#9c6236'],[1,'#7e4724']])}"/>`;
  const Zmin=1.1;
  /* lames : un ton par lame */
  const lanes=[];for(let X=-WM,i=0;X<WM-.01;X+=.26,i++)lanes.push(X);
  const tints=['#d9a066','#7a4a2a','#c48a55','#5b3320','#e8b980','#8f5a31'];
  lanes.forEach((X,i)=>{const a=pj(X,FL,ZW),b=pj(X+.26,FL,ZW),c=pj(X+.26,FL,Zmin),d=pj(X,FL,Zmin);const t=tints[(i*5+Math.floor(i/3))%tints.length];
    s+=`<polygon points="${pts([a,b,c,d])}" fill="${t}" opacity="${f1(.07+((i*7)%5)*.03)}"/>`});
  /* joints entre lames (convergent vers le point de fuite) */
  let ln='';
  for(const X of lanes.concat([WM])){const a=pj(X,FL,ZW),b=pj(X,FL,Zmin);ln+=`M${f1(a[0])},${f1(a[1])} L${f1(b[0])},${f1(b[1])} `}
  s+=`<path d="${ln}" fill="none" stroke="#3c1f10" stroke-width="2" opacity=".42"/>`;
  /* bouts de lames décalés (en rangées en Z) */
  let jn='';
  lanes.forEach((X,i)=>{const L=1.6,off=((i*0.61803)%1)*L;for(let Z=ZW-off;Z>Zmin;Z-=L){if(Z>ZW)continue;const a=pj(X,FL,Z),b=pj(X+.26,FL,Z);jn+=`M${f1(a[0])},${f1(a[1])} L${f1(b[0])},${f1(b[1])} `}});
  s+=`<path d="${jn}" fill="none" stroke="#3c1f10" stroke-width="1.6" opacity=".24"/>`;
  /* reflets sur les lames */
  let hl='';
  lanes.forEach((X,i)=>{if(i%3)return;const a=pj(X+.05,FL,ZW),b=pj(X+.05,FL,Zmin);hl+=`M${f1(a[0])},${f1(a[1])} L${f1(b[0])},${f1(b[1])} `});
  s+=`<path d="${hl}" fill="none" stroke="#ffd9a0" stroke-width="3" opacity=".08"/>`;
  /* ombre au pied des murs */
  s+=`<polygon points="${pts([[WX0,WY1],[WX1,WY1],[WX1,WY1+16],[WX0,WY1+16]])}" fill="#2a1020" opacity=".18"/>`;
  /* éclairage : lueur chaude du feu à gauche, brume bleutée au fond */
  s+=`<ellipse cx="60" cy="1180" rx="560" ry="420" fill="${k.rg(60,1180,560,[[0,'#ff9a3d',.5],[.5,'#ff8a3d',.18],[1,'#ff8a3d',0]])}"/>`;
  s+=`<rect x="-80" y="${WY1}" width="1312" height="170" fill="${k.lg(0,WY1,0,WY1+170,[[0,'#a9bce2',.38],[1,'#a9bce2',0]])}"/>`;
  /* lumière bleue de la fenêtre sur le sol (très douce) */
  const wl=[pj(-1.8,FL,ZW),pj(1.8,FL,ZW),pj(2.6,FL,19),pj(-2.6,FL,19)];
  s+=`<polygon points="${pts(wl)}" fill="#cfe0ff" opacity=".12"/>`;
})();

/* ---------- fenêtres en arc sur les murs latéraux + tableau ---------- */
function sideWin(P2,Z1,Z2,Y0,Ys,ar,id,sk){
  const Zc=(Z1+Z2)/2,hw=(Z1-Z2)/2;
  const arc=(m,hd)=>{const a=[P2(Z1+m,Y0-m)];a.push(P2(Z1+m,Ys));for(let i=0;i<=20;i++){const t=Math.PI*i/20;a.push(P2(Zc+(hw+m)*Math.cos(t),Ys+(ar+m)*Math.sin(t)))}a.push(P2(Z2-m,Ys));a.push(P2(Z2-m,Y0-m));return a};
  s+=`<polygon points="${pts(arc(.28))}" fill="#d8d3cc" stroke="${O}" stroke-width="${SW}" stroke-linejoin="round"/>`;
  k.d.push(`<clipPath id="${id}"><polygon points="${pts(arc(0))}"/></clipPath>`);
  const p0=P2(Zc,Y0),p1=P2(Zc,Ys+ar);
  s+=`<g clip-path="url(#${id})"><rect x="0" y="${f1(p1[1]-20)}" width="1152" height="${f1(p0[1]-p1[1]+40)}" fill="${k.lg(0,p1[1],0,p0[1],[[0,'#121b3e'],[.6,'#2a437a'],[1,'#5b7cb4']])}"/>`;
  for(let i=0;i<14;i++){const q=P2(Z2+rnd()*(Z1-Z2),Y0+rnd()*(Ys+ar-Y0));s+=`<circle cx="${f1(q[0])}" cy="${f1(q[1])}" r="${f1(1+rnd()*1.4)}" fill="#fff8e0" opacity=".85"/>`}
  const hl=[P2(Z1,Y0)];for(let i=0;i<=8;i++){const Z=Z1-(Z1-Z2)*i/8;hl.push(P2(Z,Y0+.5+.3*Math.sin(i*1.3+sk)))}hl.push(P2(Z2,Y0));
  s+=`<polygon points="${pts(hl)}" fill="#eef4ff"/>`;
  s+='</g>';
  for(const Y of [Y0+(Ys-Y0)*.5]){const a=P2(Z1,Y),b=P2(Z2,Y);s+=`<line x1="${f1(a[0])}" y1="${f1(a[1])}" x2="${f1(b[0])}" y2="${f1(b[1])}" stroke="#8a5a36" stroke-width="3.4"/>`}
  s+=`<line x1="${f1(p0[0])}" y1="${f1(p0[1])}" x2="${f1(p1[0])}" y2="${f1(p1[1])}" stroke="#8a5a36" stroke-width="4"/>`;
  s+=`<polygon points="${pts(arc(0))}" fill="none" stroke="${O}" stroke-width="2.4" stroke-linejoin="round"/>`}
sideWin(LW,23.1,20.7,2.0,6.0,1.3,'swl',0);
sideWin(RW,20.1,17.5,2.0,6.2,1.5,'swr',1);
/* ---------- cheminée à gauche (mur gauche, grande, avec feu) ---------- */
(function(){
  const Zn=10.5;
  /* chambranle de pierre en bloc */
  const Za=18.2,Zb=Zn;
  const breast=[LW(Za,HC),LW(Zb,HC),LW(Zb,FL),LW(Za,FL)];
  s+=`<polygon points="${pts(breast)}" fill="${k.lg(0,0,200,0,[[0,'#8a7a74'],[.5,'#a89484'],[1,'#c9a98a']])}" stroke="${O}" stroke-width="${SW+.6}" stroke-linejoin="round"/>`;
  /* briques en perspective */
  for(let r=0;r<17;r++){const Y=FL+r*.75;const a=LW(Za,Y),b=LW(Zb,Y);s+=`<line x1="${f1(a[0])}" y1="${f1(a[1])}" x2="${f1(b[0])}" y2="${f1(b[1])}" stroke="#5a4a42" stroke-width="1.8" opacity=".5"/>`;
    for(let Z=Za-(r%2?.45:0);Z>Zb;Z-=.9){const p=LW(Z,Y),q=LW(Z,Y+.75);s+=`<line x1="${f1(p[0])}" y1="${f1(p[1])}" x2="${f1(q[0])}" y2="${f1(q[1])}" stroke="#5a4a42" stroke-width="1.5" opacity=".42"/>`}}
  /* ouverture à arc */
  const Zc=15.1,hw=1.9,Yb=FL,Ya=1.55,ar=.75;
  const op=[];op.push(LW(Zc+hw,Yb));
  for(let i=0;i<=24;i++){const t=Math.PI*i/24;op.push(LW(Zc+hw*Math.cos(t),Ya+ar*Math.sin(t)))}
  op.push(LW(Zc-hw,Yb));
  s+=`<polygon points="${pts(op)}" fill="#24100c" stroke="${O}" stroke-width="${SW+1}" stroke-linejoin="round"/>`;
  /* fond du foyer (lueur) */
  const cxf=LW(Zc,0.3)[0],cyf=LW(Zc,0.3)[1];
  k.d.push(`<clipPath id="fpc"><polygon points="${pts(op)}"/></clipPath>`);
  s+=`<g clip-path="url(#fpc)">`;
  s+=`<ellipse cx="${f1(cxf)}" cy="${f1(cyf+30)}" rx="130" ry="150" fill="${k.rg(cxf,cyf+40,130,[[0,'#fff0a8'],[.35,'#ffb347'],[.75,'#ff6a2a',.9],[1,'#7a2210',.0]])}"/>`;
  /* bûches */
  const lb=LW(Zc,FL+.25);
  s+=`<rect x="${f1(lb[0]-48)}" y="${f1(lb[1]-18)}" width="100" height="18" rx="9" fill="#6a3b1e" stroke="${O}" stroke-width="3"/><rect x="${f1(lb[0]-38)}" y="${f1(lb[1]-34)}" width="84" height="18" rx="9" fill="#7a4624" stroke="${O}" stroke-width="3"/><ellipse cx="${f1(lb[0]+52)}" cy="${f1(lb[1]-9)}" rx="5" ry="9" fill="#d9a066" stroke="${O}" stroke-width="2"/>`;
  /* flammes */
  const fl=(x,y,w,h,c1,c2)=>`<path d="M${x},${y} C${x-w},${y-h*.2} ${x-w*.75},${y-h*.65} ${x-w*.1},${y-h} C${x-w*.05},${y-h*.6} ${x+w*.3},${y-h*.72} ${x+w*.42},${y-h*.5} C${x+w*.95},${y-h*.55} ${x+w*.9},${y-h*.1} ${x},${y} Z" fill="${k.lg(x,y,x,y-h,[[0,c1],[1,c2]])}"/>`;
  s+=fl(f1(lb[0]),f1(lb[1]-28),70,170,'#ff7a22','#ffd04a');
  s+=fl(f1(lb[0]-30),f1(lb[1]-26),38,100,'#ff6a1e','#ffb02e');
  s+=fl(f1(lb[0]+32),f1(lb[1]-26),38,112,'#ff6a1e','#ffbd3a');
  s+=fl(f1(lb[0]+2),f1(lb[1]-30),34,96,'#ffe27a','#fff8d0');
  s+='</g>';
  /* pierre d'arc (claveaux) */
  for(let i=1;i<24;i+=3){const t=Math.PI*i/24;const a=LW(Zc+hw*Math.cos(t),Ya+ar*Math.sin(t)),b=LW(Zc+(hw+.7)*Math.cos(t),Ya+(ar+.5)*Math.sin(t)+(i<12?.0:0));s+=`<line x1="${f1(a[0])}" y1="${f1(a[1])}" x2="${f1(b[0])}" y2="${f1(b[1])}" stroke="#6f5f52" stroke-width="2.4" opacity=".6"/>`}
  /* âtre en pierre (devant) */
  const ht=[pj(-WM,FL+.25,Za-.7),pj(-WM,FL+.25,Zb),pj(-WM+1.3,FL+.25,Zb),pj(-WM+1.3,FL+.25,Za-.7)];
  /* dalle vue du dessus */
  s+=`<polygon points="${pts(ht)}" fill="#8a7a6c" stroke="${O}" stroke-width="${SW}" stroke-linejoin="round"/>`;
  const hf=[pj(-WM+1.3,FL+.25,Za-.7),pj(-WM+1.3,FL+.25,Zb),pj(-WM+1.3,FL,Zb),pj(-WM+1.3,FL,Za-.7)];
  s+=`<polygon points="${pts(hf)}" fill="#6a5a4c" stroke="${O}" stroke-width="${SW}" stroke-linejoin="round"/>`;
  /* manteau */
  const MY=2.9,MT=.4,MD=.8;
  const mf=[pj(-WM+MD,MY,Za-.5),pj(-WM+MD,MY,Zb),pj(-WM+MD,MY-MT,Zb),pj(-WM+MD,MY-MT,Za-.5)];
  const mu=[pj(-WM,MY-MT,Za-.5),pj(-WM,MY-MT,Zb),pj(-WM+MD,MY-MT,Zb),pj(-WM+MD,MY-MT,Za-.5)];
  s+=`<polygon points="${pts(mu)}" fill="#3f2416" stroke="${O}" stroke-width="${SW}" stroke-linejoin="round"/>`;
  s+=`<polygon points="${pts(mf)}" fill="${k.lg(0,0,150,0,[[0,'#c48a55'],[1,'#a06d43']])}" stroke="${O}" stroke-width="${SW+.6}" stroke-linejoin="round"/>`;
  /* guirlande de sapin au manteau + boules + lumières */
  const g0=pj(-WM+MD,MY-MT,Za-.6),g1=pj(-WM+MD,MY-MT,Zb+.2);
  const gar=(a,b,sag,w)=>{const mx=(a[0]+b[0])/2,my=(a[1]+b[1])/2+sag;return `M${f1(a[0])},${f1(a[1])} Q${f1(mx)},${f1(my)} ${f1(b[0])},${f1(b[1])}`};
  /* trois chaussettes */
  for(const [Z,c1,c2] of [[16.5,'#d2342f','#fffaf0'],[15.0,'#2f7a4f','#f0c04a'],[13.5,'#d2342f','#fffaf0']]){
    const a=pj(-WM+MD,MY-MT,Z),sc=F/Z*1.0/ 1;const u=F/Z*.62;
    s+=`<g transform="translate(${f1(a[0])},${f1(a[1])})">`+
      `<path d="M${-.35*u},0 L${.35*u},0 L${.35*u},${.95*u} C${.35*u},${1.25*u} ${1.0*u},${1.25*u} ${1.0*u},${1.6*u} C${1.0*u},${2.0*u} ${.15*u},${2.0*u} ${-.1*u},${1.85*u} C${-.38*u},${1.7*u} ${-.35*u},${1.4*u} ${-.35*u},${.95*u} Z" fill="${c1}" stroke="${O}" stroke-width="3" stroke-linejoin="round"/>`+
      `<rect x="${-.42*u}" y="${-.06*u}" width="${.84*u}" height="${.34*u}" rx="${.12*u}" fill="${c2}" stroke="${O}" stroke-width="3"/>`+
      `<path d="M${.55*u},${1.55*u} C${.8*u},${1.5*u} ${.9*u},${1.65*u} ${.85*u},${1.8*u}" fill="none" stroke="#fff" stroke-width="3" opacity=".35" stroke-linecap="round"/></g>`}
  /* guirlande */
  s+=`<path d="${gar(g0,g1,22)}" fill="none" stroke="${O}" stroke-width="13" stroke-linecap="round"/><path d="${gar(g0,g1,22)}" fill="none" stroke="#2f7a4f" stroke-width="9" stroke-linecap="round"/><path d="${gar(g0,g1,22)}" fill="none" stroke="#4d9b6c" stroke-width="3" stroke-dasharray="5 8" stroke-linecap="round"/>`;
  for(let i=0;i<7;i++){const t=(i+.5)/7;const mx=(g0[0]+g1[0])/2,my=(g0[1]+g1[1])/2+22;const bx=(1-t)*(1-t)*g0[0]+2*t*(1-t)*mx+t*t*g1[0],by=(1-t)*(1-t)*g0[1]+2*t*(1-t)*my+t*t*g1[1];s+=`<circle cx="${f1(bx)}" cy="${f1(by)}" r="5" fill="${i%2?'#f0c04a':'#d2342f'}" stroke="${O}" stroke-width="1.8"/>`}
})();

(function(){ /* grand tableau au-dessus de la cheminée */
  const Z1=16.7,Z2=13.6,Y0=4.6,Y1=7.0;
  const q=(m)=>[LW(Z1+m,Y0-m),LW(Z2-m,Y0-m),LW(Z2-m,Y1+m),LW(Z1+m,Y1+m)];
  s+=`<polygon points="${pts(q(.22))}" fill="${k.lg(0,0,200,0,[[0,'#f6d36a'],[1,'#b98a22']])}" stroke="${O}" stroke-width="${SW+.4}" stroke-linejoin="round"/>`;
  k.d.push(`<clipPath id="pcl"><polygon points="${pts(q(0))}"/></clipPath>`);
  const a=LW(Z1,Y1),b=LW(Z1,Y0);
  s+=`<g clip-path="url(#pcl)"><rect x="0" y="${f1(a[1]-20)}" width="300" height="${f1(b[1]-a[1]+40)}" fill="${k.lg(0,a[1],0,b[1],[[0,'#1d2d5a'],[1,'#4a6aa8']])}"/>`;
  const hl=[LW(Z1,Y0)];for(let i=0;i<=10;i++){hl.push(LW(Z1-(Z1-Z2)*i/10,Y0+.9+.45*Math.sin(i*.9)))}hl.push(LW(Z2,Y0));
  s+=`<polygon points="${pts(hl)}" fill="#eef4ff"/>`;
  for(const [Zt,sz] of [[15.6,1.5],[14.5,1.1]]){const c=LW(Zt,Y0+1.1),u=F/Zt;s+=`<polygon points="${pts([[c[0],c[1]-sz*u*.9],[c[0]+sz*u*.25,c[1]+sz*u*.1],[c[0]-sz*u*.25,c[1]+sz*u*.1]])}" fill="#2f7a4f" stroke="${O}" stroke-width="2"/>`}
  for(let i=0;i<12;i++){const c=LW(Z2+rnd()*(Z1-Z2),Y1-.2-rnd()*1.2);s+=`<circle cx="${f1(c[0])}" cy="${f1(c[1])}" r="1.6" fill="#fff8e0"/>`}
  const m=LW(15.2,Y1-.7);s+=`<circle cx="${f1(m[0])}" cy="${f1(m[1])}" r="9" fill="#fff3c2"/>`;
  s+='</g>';
  s+=`<polygon points="${pts(q(0))}" fill="none" stroke="${O}" stroke-width="2.4" stroke-linejoin="round"/>`;
})();

/* ---------- guirlande murale + couronne côté droit ---------- */
(function(){
  /* couronne sur le mur droit */
  const c=RW(16.2,3.2),r=F/16.2*.9;
  s+=`<ellipse cx="${f1(c[0])}" cy="${f1(c[1])}" rx="${f1(r*.42)}" ry="${f1(r)}" fill="none" stroke="${O}" stroke-width="${f1(r*.42)}"/><ellipse cx="${f1(c[0])}" cy="${f1(c[1])}" rx="${f1(r*.42)}" ry="${f1(r)}" fill="none" stroke="#2f7a4f" stroke-width="${f1(r*.3)}"/><ellipse cx="${f1(c[0])}" cy="${f1(c[1])}" rx="${f1(r*.42)}" ry="${f1(r)}" fill="none" stroke="#4d9b6c" stroke-width="3" stroke-dasharray="6 9"/>`;
  s+=`<ellipse cx="${f1(c[0])}" cy="${f1(c[1]+r)}" rx="${f1(r*.4)}" ry="${f1(r*.26)}" fill="#d2342f" stroke="${O}" stroke-width="3"/>`;
})();

/* ---------- lanternes suspendues (tailles selon la profondeur) ---------- */
function lantern(Z,X,Yc,size){
  const c=pj(X,Yc,Z),u=F/Z*size;const top=pj(X,HC-1.1,Z);
  let t=`<line x1="${f1(c[0])}" y1="${f1(top[1])}" x2="${f1(c[0])}" y2="${f1(c[1]-1.15*u)}" stroke="${O}" stroke-width="${f1(Math.max(2.4,u*.06))}"/>`;
  t+=`<circle cx="${f1(c[0])}" cy="${f1(c[1])}" r="${f1(u*3.1)}" fill="${k.rg(c[0],c[1],u*3.1,[[0,'#ffd47a',.55],[.4,'#ffb347',.2],[1,'#ffb347',0]])}"/>`;
  const x=c[0],y=c[1];
  t+=`<path d="M${f1(x-.28*u)},${f1(y-1.1*u)} L${f1(x+.28*u)},${f1(y-1.1*u)} L${f1(x+.62*u)},${f1(y-.78*u)} L${f1(x-.62*u)},${f1(y-.78*u)} Z" fill="#8a5a1c" stroke="${O}" stroke-width="${f1(Math.max(2,u*.05))}" stroke-linejoin="round"/>`;
  t+=`<path d="M${f1(x-.6*u)},${f1(y-.78*u)} L${f1(x+.6*u)},${f1(y-.78*u)} L${f1(x+.5*u)},${f1(y+.7*u)} L${f1(x-.5*u)},${f1(y+.7*u)} Z" fill="${k.lg(0,y-.78*u,0,y+.7*u,[[0,'#ffe9a0'],[.55,'#ffc552'],[1,'#ff9a3d']])}" stroke="${O}" stroke-width="${f1(Math.max(2,u*.05))}" stroke-linejoin="round"/>`;
  t+=`<ellipse cx="${f1(x)}" cy="${f1(y+.05*u)}" rx="${f1(u*.2)}" ry="${f1(u*.34)}" fill="#fffbe0"/>`;
  t+=`<line x1="${f1(x-.1*u)}" y1="${f1(y-.78*u)}" x2="${f1(x-.12*u)}" y2="${f1(y+.7*u)}" stroke="${O}" stroke-width="${f1(Math.max(1.6,u*.04))}"/><line x1="${f1(x+.1*u)}" y1="${f1(y-.78*u)}" x2="${f1(x+.12*u)}" y2="${f1(y+.7*u)}" stroke="${O}" stroke-width="${f1(Math.max(1.6,u*.04))}"/>`;
  t+=`<path d="M${f1(x-.55*u)},${f1(y+.7*u)} L${f1(x+.55*u)},${f1(y+.7*u)} L${f1(x+.36*u)},${f1(y+1.02*u)} L${f1(x-.36*u)},${f1(y+1.02*u)} Z" fill="#8a5a1c" stroke="${O}" stroke-width="${f1(Math.max(2,u*.05))}" stroke-linejoin="round"/>`;
  return t}
/* étoiles de bois suspendues */
function hangStar(Z,X,Yc,size,col){
  const c=pj(X,Yc,Z),u=F/Z*size,top=pj(X,HC-1.1,Z);
  const p=[];for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,rr=i%2?u*.42:u;p.push((c[0]+Math.cos(a)*rr).toFixed(1)+','+(c[1]+Math.sin(a)*rr).toFixed(1))}
  return `<line x1="${f1(c[0])}" y1="${f1(top[1])}" x2="${f1(c[0])}" y2="${f1(c[1]-u)}" stroke="${O}" stroke-width="2"/><polygon points="${p.join(' ')}" fill="${col}" stroke="${O}" stroke-width="2.4" stroke-linejoin="round"/>`}

/* guirlandes de lumières (3 profondeurs) */
function lights(Z,Y,sag,cols,n,both){
  const a=pj(-WM,Y,Z),b=pj(WM,Y,Z);const mx=(a[0]+b[0])/2,my=(a[1]+b[1])/2+sag;
  const wp=`M${f1(a[0])},${f1(a[1])} Q${f1(mx)},${f1(my)} ${f1(b[0])},${f1(b[1])}`;
  let t=`<path d="${wp}" fill="none" stroke="#2a1410" stroke-width="2.6"/>`;
  const u=F/Z*.16;
  for(let i=1;i<n;i++){const q=i/n;const bx=(1-q)*(1-q)*a[0]+2*q*(1-q)*mx+q*q*b[0],by=(1-q)*(1-q)*a[1]+2*q*(1-q)*my+q*q*b[1];
    const c=cols[i%cols.length];
    t+=`<circle cx="${f1(bx)}" cy="${f1(by+u*.9)}" r="${f1(u*2.4)}" fill="${k.rg(bx,by+u*.9,u*2.4,[[0,c,.7],[1,c,0]])}"/><ellipse cx="${f1(bx)}" cy="${f1(by+u*.9)}" rx="${f1(u*.62)}" ry="${f1(u*.85)}" fill="${c}" stroke="${O}" stroke-width="1.6"/><ellipse cx="${f1(bx-u*.18)}" cy="${f1(by+u*.7)}" rx="${f1(u*.18)}" ry="${f1(u*.26)}" fill="#fff" opacity=".8"/>`}
  return t}
const LC=['#ffd04a','#ff6a5a','#6ee0a0','#ffd04a','#7ab4ff'];
s+=lights(24,9.9,38,LC,18);
s+=lights(19,8.6,70,LC,22);
s+=lights(15,7.2,118,LC,26);
/* lanternes + étoiles */
s+=lantern(24,-2.8,7.2,.62);s+=lantern(24,2.8,7.2,.62);
s+=lantern(19.5,-4.4,5.2,.74);s+=lantern(19.5,4.4,5.2,.74);
s+=lantern(15.2,-3.0,3.4,.86);s+=lantern(15.2,3.0,3.4,.86);
s+=hangStar(21,0,8.6,.6,'#f0c04a')+hangStar(17,-1.4,6.2,.55,'#e8514a')+hangStar(17,1.4,6.2,.55,'#6ee0a0');

/* ---------- le grand sapin (à droite) ---------- */
(function(){
  const bx=985,by=1022,sc=1;
  const g=[];
  /* tronc + pot */
  let t=`<g transform="translate(${bx-170},${by-612})">`;
  t+=`<ellipse cx="170" cy="606" rx="132" ry="22" fill="#2a1020" opacity=".3"/>`;
  t+=`<rect x="146" y="540" width="48" height="60" fill="#6b3f22" stroke="${O}" stroke-width="3"/>`;
  const tier=(ty,bt,w,col,n)=>{
    const cx=170;let d=`M${cx},${ty} L${cx+w},${bt-14}`;
    const step=2*w/n;for(let i=0;i<n;i++){const x1=cx+w-i*step,x2=x1-step;d+=` Q${f1((x1+x2)/2)},${bt+16} ${f1(x2)},${bt-14}`}
    d+=' Z';return d};
  const tiersC=[];
  const tiers=[[440,600,166],[352,508,146],[270,418,124],[190,332,100],[112,250,76],[40,166,48]];
  tiers.forEach((T,i)=>{
    const d=tier(T[0],T[1],T[2],0,Math.max(3,Math.round(T[2]/26)));tiersC.push(`<path d="${d}"/>`);
    t+=k.fx(P(d),k.lg(170-T[2],0,170+T[2],0,[[0,'#46a06a'],[.45,'#2f7a4f'],[1,'#1f5538']]),{d:6,sw:4,box:[-20,-20,400,640],hi:.35});
    /* branches : traits clairs */
    for(let j=0;j<5;j++){const yy=T[0]+(T[1]-T[0])*(.25+.14*j),ww=T[2]*(.2+.17*j);t+=`<path d="M${f1(170-ww*.9)},${f1(yy+16)} Q${f1(170-ww*.5)},${f1(yy+4)} ${f1(170-ww*.1)},${f1(yy+22)}" fill="none" stroke="#6bbf8a" stroke-width="3" stroke-linecap="round" opacity=".55"/>`}
  });
  k.d.push(`<clipPath id="treeclip">${tiersC.join('')}</clipPath>`);
  /* guirlande de lumières + boules */
  const balls=[[132,436,'#d2342f'],[214,426,'#f0c04a'],[170,448,'#3d6fb5'],[100,355,'#f0c04a'],[238,352,'#d2342f'],[172,360,'#d2342f'],[96,470,'#d2342f'],[246,478,'#f0c04a'],[148,300,'#f0c04a'],[200,290,'#d2342f'],[130,225,'#d2342f'],[204,226,'#3d6fb5'],[110,360,'#3d6fb5'],[170,150,'#f0c04a'],[150,95,'#d2342f'],[192,92,'#f0c04a'],[80,525,'#f0c04a'],[170,540,'#d2342f'],[260,518,'#3d6fb5'],[60,585,'#d2342f'],[288,586,'#f0c04a'],[170,590,'#f0c04a'],[118,562,'#3d6fb5'],[224,564,'#d2342f']];
  const gl=(pts0)=>{let d='M'+pts0.map(p=>p.join(',')).join(' L');return d};
  const strands=[[[60,170],[130,205],[210,198],[270,222]],[[88,260],[150,296],[250,280],[240,300]],[[46,348],[130,392],[210,380],[298,340]],[[40,448],[120,496],[220,484],[310,430]],[[28,552],[120,590],[230,580],[322,538]]];
  t+='<g clip-path="url(#treeclip)">';
  strands.forEach(S=>{let d=`M${S[0][0]},${S[0][1]} C${S[1][0]},${S[1][1]} ${S[2][0]},${S[2][1]} ${S[3][0]},${S[3][1]}`;t+=`<path d="${d}" fill="none" stroke="#fff4d0" stroke-width="5" stroke-linecap="round" opacity=".92"/><path d="${d}" fill="none" stroke="#d9a066" stroke-width="2" stroke-dasharray="1 12" stroke-linecap="round" opacity=".0"/>`});
  t+='</g>';
  balls.forEach(b=>{const r=11+(b[0]*7%5);t+=`<circle cx="${b[0]}" cy="${b[1]}" r="${r}" fill="${k.rg(b[0]-r*.3,b[1]-r*.35,r*1.3,[[0,'#fff6d0'],[.35,b[2]],[1,b[2]]])}" stroke="${O}" stroke-width="2.4"/><rect x="${b[0]-2.5}" y="${b[1]-r-4}" width="5" height="5" fill="#f0c04a" stroke="${O}" stroke-width="1.4"/><ellipse cx="${b[0]-r*.35}" cy="${b[1]-r*.4}" rx="${r*.2}" ry="${r*.13}" fill="#fff" opacity=".75"/>`});
  /* petites lumières jaunes qui brillent */
  const lights=[[84,230],[236,238],[110,310],[262,300],[70,400],[270,404],[60,500],[290,500],[40,570],[310,572],[130,150],[216,160]];
  lights.forEach(p=>{t+=`<circle cx="${p[0]}" cy="${p[1]}" r="12" fill="${k.rg(p[0],p[1],12,[[0,'#fff3a8',.8],[1,'#ffd04a',0]])}"/><circle cx="${p[0]}" cy="${p[1]}" r="4.2" fill="#fff6c0" stroke="#e2a520" stroke-width="1.4"/>`});
  /* étoile du sommet */
  const sx=170,sy=32;
  t+=`<circle cx="${sx}" cy="${sy}" r="52" fill="${k.rg(sx,sy,52,[[0,'#fff3a8',.8],[1,'#ffd04a',0]])}"/>`;
  const sp=[];for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,rr=i%2?13:30;sp.push((sx+Math.cos(a)*rr).toFixed(1)+','+(sy+Math.sin(a)*rr).toFixed(1))}
  t+=`<polygon points="${sp.join(' ')}" fill="#f0c04a" stroke="${O}" stroke-width="3.4" stroke-linejoin="round"/><polygon points="${sx-3},${sy-24} ${sx+6},${sy-6} ${sx},${sy+2}" fill="#fff6c8" opacity=".8"/>`;
  /* jupe rouge */
  t+=`<path d="M30,596 Q170,566 310,596 L322,616 Q170,640 18,616 Z" fill="${k.lg(0,596,0,630,[[0,'#e8514a'],[1,'#9f2420']])}" stroke="${O}" stroke-width="4" stroke-linejoin="round"/><path d="M26,612 Q170,636 314,612" fill="none" stroke="#f0c04a" stroke-width="4" stroke-linecap="round"/>`;
  t+='</g>';
  s+=t;
})();

/* ---------- tapis rouge et or (premier plan) ---------- */
(function(){
  const cx=576,cy=1568,rx=548,ry=168;
  s+=`<ellipse cx="${cx}" cy="${cy+10}" rx="${rx+16}" ry="${ry+10}" fill="#2a0e12" opacity=".35"/>`;
  /* franges */
  for(let i=0;i<64;i++){const a=i/64*Math.PI*2,x=cx+Math.cos(a)*(rx+6),y=cy+Math.sin(a)*(ry+4);if(Math.sin(a)<-.15&&false)continue;s+=`<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="3" ry="9" fill="#f6e3a8" stroke="#a8842a" stroke-width="1.2" transform="rotate(${f1(a*180/Math.PI)} ${f1(x)} ${f1(y)})" opacity=".95"/>`}
  const G=(rr,fill,sw,st,op)=>`<ellipse cx="${cx}" cy="${cy}" rx="${f1(rx*rr)}" ry="${f1(ry*rr)}" fill="${fill}" stroke="${st||'none'}" stroke-width="${sw||0}"${op?` opacity="${op}"`:''}/>`;
  s+=G(1,k.rg(cx,cy,rx,[[0,'#d2342f'],[1,'#9f2420']]),5,O);
  s+=G(.96,'none',9,'#f0c04a');
  s+=G(.90,k.rg(cx,cy,rx*.9,[[0,'#e24a3f'],[.7,'#c82d2b'],[1,'#a7241f']]),0);
  s+=G(.90,'none',2.5,'#7a1a18');
  /* frise de losanges dorés */
  for(let i=0;i<40;i++){const a=i/40*Math.PI*2,x=cx+Math.cos(a)*rx*.935,y=cy+Math.sin(a)*ry*.935;s+=`<path d="M${f1(x)},${f1(y-9)} L${f1(x+9)},${f1(y)} L${f1(x)},${f1(y+9)} L${f1(x-9)},${f1(y)} Z" fill="#f0c04a" stroke="#9f6f18" stroke-width="1.6" transform="translate(0,0)"/>`}
  s+=G(.80,'none',3,'#f0c04a');
  s+=G(.78,'none',1.8,'#fbe08a');
  /* guirlande de motifs (houx) */
  for(let i=0;i<24;i++){const a=i/24*Math.PI*2+.1,x=cx+Math.cos(a)*rx*.70,y=cy+Math.sin(a)*ry*.70;
    s+=`<ellipse cx="${f1(x-9)}" cy="${f1(y)}" rx="12" ry="5" fill="#2f7a4f" stroke="#1f5538" stroke-width="1.4" transform="rotate(${f1(a*180/Math.PI+30)} ${f1(x-9)} ${f1(y)})"/><ellipse cx="${f1(x+9)}" cy="${f1(y)}" rx="12" ry="5" fill="#2f7a4f" stroke="#1f5538" stroke-width="1.4" transform="rotate(${f1(a*180/Math.PI-30)} ${f1(x+9)} ${f1(y)})"/><circle cx="${f1(x)}" cy="${f1(y)}" r="4.2" fill="#f0c04a" stroke="#9f6f18" stroke-width="1.2"/>`}
  s+=G(.60,'none',3,'#f0c04a');
  s+=G(.57,k.rg(cx,cy,rx*.57,[[0,'#b52a26'],[1,'#d2342f']]),0);
  /* grand médaillon : étoile à 12 branches */
  const star12=(R1,R2,fill,st,sw)=>{const p=[];for(let i=0;i<24;i++){const a=i*Math.PI/12-Math.PI/2,rr=i%2?R2:R1;p.push(f1(cx+Math.cos(a)*rr)+','+f1(cy+Math.sin(a)*rr*(ry/rx)))}return `<polygon points="${p.join(' ')}" fill="${fill}" stroke="${st}" stroke-width="${sw}" stroke-linejoin="round"/>`};
  s+=star12(rx*.50,rx*.28,'#f0c04a','#9f6f18',2.4);
  s+=star12(rx*.36,rx*.2,'#d2342f','#7a1a18',2);
  s+=star12(rx*.22,rx*.12,'#fbe08a','#9f6f18',2);
  s+=`<ellipse cx="${cx}" cy="${cy}" rx="${f1(rx*.09)}" ry="${f1(ry*.09)}" fill="#d2342f" stroke="#7a1a18" stroke-width="2"/>`;
  /* petites étoiles blanches de côté */
  for(const sgn of [-1,1]){for(const t of [.42,.64]){const x=cx+sgn*rx*t,y=cy;s+=`<path d="M${f1(x)},${f1(y-12)} L${f1(x+4)},${f1(y-4)} L${f1(x+13)},${f1(y)} L${f1(x+4)},${f1(y+4)} L${f1(x)},${f1(y+12)} L${f1(x-4)},${f1(y+4)} L${f1(x-13)},${f1(y)} L${f1(x-4)},${f1(y-4)} Z" fill="#f0c04a" stroke="#9f6f18" stroke-width="1.6"/>`}}
  /* reflet chaud du feu sur le tapis (gauche) */
  s+=`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${k.lg(0,0,W,0,[[0,'#ffb347',.28],[.45,'#ffb347',0],[1,'#1a0a20',.18]])}"/>`;
})();

/* ---------- brume de profondeur, lueur chaude et vignette ---------- */
s+=`<rect x="0" y="${f1(WY0-30)}" width="${W}" height="${f1(WY1-WY0+30)}" fill="${k.lg(0,WY0,0,WY1,[[0,'#a9bce2',.0],[.5,'#a9bce2',.07],[1,'#a9bce2',.0]])}"/>`;
s+=`<rect x="0" y="0" width="${W}" height="${H}" fill="${k.rg(40,860,720,[[0,'#ff9a3d',.28],[.5,'#ff8a3d',.1],[1,'#ff8a3d',0]])}"/>`;
s+=`<rect x="0" y="0" width="${W}" height="${H}" fill="${k.rg(576,900,1000,[[0,'#1a0a20',0],[.65,'#1a0a20',0],[1,'#1a0a20',.35]])}"/>`;
art('bg',W,H,s,k.d.join(''));
})();

/*@@END@@*/
})();
