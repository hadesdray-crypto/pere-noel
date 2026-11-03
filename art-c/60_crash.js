/* 60 — Le traîneau défonce le mur : trou, réparations, débris, traîneau, renne penaud (style C, vecteur) */
(function(){
const O='#4a2418',W0=180,H0=300;/* repère commun trou/fix/patch : ancrage bas-centre (90,300) */
const f=n=>Math.round(n*10)/10;
const HOLE=[[48,292],[40,258],[46,232],[36,204],[44,172],[38,140],[50,112],[44,84],[66,66],[80,46],[102,58],[122,44],[138,72],[134,98],[150,124],[142,152],[152,180],[144,208],[148,242],[140,270],[142,292]];
const pth=a=>'M'+a.map(p=>f(p[0])+','+f(p[1])).join(' L')+' Z';
const WOODS=[['#c58a50','#a9703d','#7a4a2a'],['#b97d45','#9a6234','#6e4326'],['#d1985c','#b57a44','#85532f']];
const star=(x,y,r,fill,sw)=>{let p='';for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,q=i%2?r*.45:r;p+=(i?'L':'M')+f(x+Math.cos(a)*q)+','+f(y+Math.sin(a)*q)+' '}return `<path d="${p}Z" fill="${fill}" stroke="${O}" stroke-width="${sw||2}" stroke-linejoin="round"/>`};
const nail=(x,y,r)=>`<circle cx="${f(x)}" cy="${f(y)}" r="${r||2.6}" fill="#8d8d9a" stroke="${O}" stroke-width="1.4"/><circle cx="${f(x-.7)}" cy="${f(y-.8)}" r="${(r||2.6)*.35}" fill="#fff" opacity=".8"/>`;
/* planche à plat centrée (0,0), longueur L, épaisseur T */
function plank(cx,cy,L,T,rot,w,o){o=o||{};const c=WOODS[w%3],h=-L/2,t=-T/2;let g='';
  g+=`<rect x="${h+3}" y="${t+4}" width="${L}" height="${T}" rx="3" fill="#1a0a20" opacity=".28"/>`;
  g+=`<rect x="${h}" y="${t}" width="${L}" height="${T}" rx="3" fill="${c[1]}" stroke="${O}" stroke-width="2.6" stroke-linejoin="round"/>`;
  g+=`<rect x="${h+2}" y="${t+2}" width="${L-4}" height="${T*.32}" rx="2" fill="${c[0]}" opacity=".75"/><rect x="${h+2}" y="${t+T*.72}" width="${L-4}" height="${T*.24}" rx="2" fill="${c[2]}" opacity=".45"/>`;
  g+=`<path d="M${h+10},${-T*.08} q${L*.2},-3 ${L*.38},0 t${L*.34},.5" fill="none" stroke="${c[2]}" stroke-width="1.4" opacity=".6" stroke-linecap="round"/>`;
  if(!o.nonail){g+=nail(h+8,0)+nail(-h-8,0)}
  return `<g transform="translate(${f(cx)},${f(cy)}) rotate(${rot})">${g}</g>`}
/* ===== c-hole ===== */
(function(){
  const defs=`<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#121b3e"/><stop offset=".55" stop-color="#2a437a"/><stop offset="1" stop-color="#5b7cb4"/></linearGradient><clipPath id="hc"><path d="${pth(HOLE)}"/></clipPath><linearGradient id="st" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e6e0d8"/><stop offset="1" stop-color="#a79f98"/></linearGradient>`;
  let s='';
  /* fissures sur le mur */
  const cr=['M40,140 L22,128 L14,104 L4,98','M44,172 L26,176 L12,194','M142,152 L160,146 L170,124','M150,124 L166,112 L176,90','M46,232 L28,240 L20,262','M80,46 L72,28 L78,12','M122,44 L132,26 L128,10','M152,180 L168,186 L176,208','M148,242 L164,250 L170,272'];
  s+=cr.map(d=>`<path d="${d}" fill="none" stroke="${O}" stroke-width="3.2" stroke-linejoin="round" stroke-linecap="round" opacity=".7"/><path d="${d}" fill="none" stroke="#e8e2f0" stroke-width="1" opacity=".35" transform="translate(1.5,1.5)"/>`).join('');
  /* bord éclaté = tranche de pierre claire */
  s+=`<path d="${pth(HOLE)}" fill="none" stroke="${O}" stroke-width="26" stroke-linejoin="round"/><path d="${pth(HOLE)}" fill="none" stroke="url(#st)" stroke-width="20" stroke-linejoin="round"/>`;
  /* blocs de pierre éclatés autour */
  const blocks=[[30,170,16,12,-20],[24,118,14,11,15],[152,100,15,12,25],[158,166,14,12,-10],[34,256,15,11,10],[156,232,14,11,-15],[96,34,16,12,8],[60,70,13,10,-25],[132,60,13,10,20]];
  for(const [x,y,w,h,r] of blocks)s+=`<g transform="translate(${x},${y}) rotate(${r})"><rect x="${-w/2}" y="${-h/2}" width="${w}" height="${h}" rx="3" fill="#cfc8d6" stroke="${O}" stroke-width="2.4" stroke-linejoin="round"/><rect x="${-w/2+2}" y="${-h/2+2}" width="${w-4}" height="${h*.3}" rx="1.5" fill="#f1edf6" opacity=".8"/></g>`;
  /* trou : nuit */
  s+=`<g clip-path="url(#hc)"><rect x="0" y="0" width="${W0}" height="${H0}" fill="url(#sky)"/>`;
  const stars=[[70,80,1.8],[110,96,1.4],[88,128,1.6],[124,150,1.2],[66,170,1.5],[104,190,1.3],[78,70,1],[120,118,1.7]];
  s+=stars.map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}" fill="#fff8e0"/>`).join('')+star(98,100,6,'#fff3c2',1.2);
  s+=`<path d="M30,236 C60,214 84,226 104,222 C124,218 140,208 160,214 L160,300 L30,300Z" fill="#c9d9f0"/><path d="M30,256 C58,240 86,252 108,248 C126,246 140,240 160,244 L160,300 L30,300Z" fill="#f4f8ff"/>`;
  s+=`<path d="M108,150 L124,184 L116,184 L130,216 L86,216 L100,184 L92,184Z" fill="#23415f"/><path d="M108,150 L116,168 L100,168Z" fill="#eef4ff" opacity=".9"/>`;
  for(const [x,y,r] of [[60,120,2.2],[96,150,1.8],[124,110,2.4],[80,200,2],[112,170,1.6],[70,90,1.5]])s+=`<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" opacity=".9"/>`;
  s+=`<path d="${pth(HOLE)}" fill="none" stroke="#0a1230" stroke-width="16" opacity=".45" stroke-linejoin="round"/></g>`;
  s+=`<path d="${pth(HOLE)}" fill="none" stroke="${O}" stroke-width="3.4" stroke-linejoin="round"/>`;
  /* planches du lambris éclatées, pointes vers l'intérieur */
  const sp=[[-12,60,214,40,-60],[0,66,34,38,70],[1,70,148,34,40]];
  s+=`<g transform="translate(44,216) rotate(-70)"><path d="M0,0 L34,-5 L40,4 L36,11 L22,8 L14,12 L4,10Z" fill="#a9703d" stroke="${O}" stroke-width="2.6" stroke-linejoin="round"/><path d="M4,2 L32,-1" stroke="#d9a066" stroke-width="2"/></g>`;
  s+=`<g transform="translate(142,204) rotate(-115) scale(1,-1)"><path d="M0,0 L36,-4 L42,5 L32,9 L24,5 L16,12 L4,9Z" fill="#b97d45" stroke="${O}" stroke-width="2.6" stroke-linejoin="round"/><path d="M4,2 L32,-1" stroke="#d9a066" stroke-width="2"/></g>`;
  s+=`<g transform="translate(40,120) rotate(-25)"><path d="M0,0 L30,-6 L36,3 L26,7 L18,4 L10,10 L2,8Z" fill="#a9703d" stroke="${O}" stroke-width="2.6" stroke-linejoin="round"/></g>`;
  s+=`<g transform="translate(148,128) rotate(200)"><path d="M0,0 L28,-6 L34,3 L24,8 L14,4 L6,9Z" fill="#b97d45" stroke="${O}" stroke-width="2.6" stroke-linejoin="round"/></g>`;
  /* quelques flocons qui entrent + poussière */
  for(const [x,y,r] of [[40,230,2.6],[52,200,2],[132,236,2.4],[150,196,1.8],[100,276,2.2],[60,282,1.6],[22,288,2.4]])s+=`<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" opacity=".95"/>`;
  s+=`<path d="M36,294 C60,286 80,296 100,290 C120,286 140,294 158,290 L158,300 L36,300Z" fill="#f4f8ff" stroke="#c9d9f0" stroke-width="1.5"/>`;
  art('c-hole',W0,H0,s,defs)})();
/* ===== c-hole-fix1..3 : planches clouées (cumulatives, transparentes, même repère) ===== */
const ROWS=[[246,-5,0,142,'a'],[174,4,1,138,'a'],[270,3,2,146,'b'],[198,-4,0,140,'b'],[126,5,1,136,'b'],[222,3,2,144,'c'],[150,-3,0,140,'c'],[102,-6,1,134,'c']];
const stage=(n)=>ROWS.filter(r=>({1:'a',2:'ab',3:'abc'})[n].includes(r[4])).map((r,i)=>plank(90+((i*7)%9)-4,r[0],r[3],25,r[1],r[2])).join('');
for(const n of [1,2,3])art('c-hole-fix'+n,W0,H0,stage(n));
/* ===== c-wall-patch : rapiéçage propre, définitif ===== */
(function(){
  const defs='';let s='';
  const x0=26,x1=154,y0=38,y1=294;
  s+=`<rect x="${x0+3}" y="${y0+5}" width="${x1-x0}" height="${y1-y0}" rx="8" fill="#1a0a20" opacity=".28"/>`;
  s+=`<rect x="${x0}" y="${y0}" width="${x1-x0}" height="${y1-y0}" rx="8" fill="#7a4a2a" stroke="${O}" stroke-width="3.2"/>`;
  const rows=9,rh=(y1-y0-20)/rows;
  for(let i=0;i<rows;i++){const y=y0+10+i*rh,c=WOODS[i%3];
    s+=`<rect x="${x0+9}" y="${f(y)}" width="${x1-x0-18}" height="${f(rh-1.5)}" rx="2.5" fill="${c[1]}" stroke="${O}" stroke-width="2"/><rect x="${x0+11}" y="${f(y+1.5)}" width="${x1-x0-22}" height="${f(rh*.3)}" rx="1.5" fill="${c[0]}" opacity=".7"/>`;
    s+=`<path d="M${x0+20},${f(y+rh*.62)} q30,-3 56,0" fill="none" stroke="${c[2]}" stroke-width="1.2" opacity=".55"/>`+nail(x0+16,y+rh*.5-.5,2.2)+nail(x1-16,y+rh*.5-.5,2.2)}
  /* cadre : coins cloués */
  for(const [x,y] of [[x0+9,y0+9],[x1-9,y0+9],[x0+9,y1-9],[x1-9,y1-9]])s+=nail(x,y,3);
  /* petite étoile peinte */
  s+=`<g transform="translate(90,150) rotate(-8)"><circle r="30" fill="#fffaf0" opacity=".16"/>${star(0,0,25,'#f0c04a',3)}<path d="M-9,-3 L-3,-4" stroke="#fff0a8" stroke-width="3" stroke-linecap="round"/><circle cx="-5" cy="1" r="1.8" fill="${O}"/><circle cx="5" cy="1" r="1.8" fill="${O}"/><path d="M-4,7 Q0,10 4,7" fill="none" stroke="${O}" stroke-width="1.8" stroke-linecap="round"/><circle cx="-10" cy="6" r="2.6" fill="#f08a80" opacity=".8"/><circle cx="10" cy="6" r="2.6" fill="#f08a80" opacity=".8"/></g>`;
  art('c-wall-patch',W0,H0,s,defs)})();
/* ===== c-plank : planche seule (120x34, centrée) ===== */
art('c-plank',130,38,plank(65,19,112,24,-4,0),'');
/* ===== c-debris-1..3 : petits tas posés au sol (ancrage bas-centre) ===== */
(function(){
  const chunk=(x,y,w,h,r,fill)=>`<g transform="translate(${x},${y}) rotate(${r})"><path d="M${-w/2},${h/2} L${-w/2+2},${-h/2} L${w/2-3},${-h/2+1} L${w/2},${h/2}Z" fill="${fill}" stroke="${O}" stroke-width="2.4" stroke-linejoin="round"/><path d="M${-w/2+4},${-h/2+3} L${w/2-6},${-h/2+3}" stroke="#fff" stroke-width="2" opacity=".45" stroke-linecap="round"/></g>`;
  const wd=(x,y,L,r,c)=>`<g transform="translate(${x},${y}) rotate(${r})"><path d="M0,-4 L${L},-6 L${L+8},0 L${L},5 L0,4Z" fill="${c}" stroke="${O}" stroke-width="2.3" stroke-linejoin="round"/><path d="M4,-1 L${L-4},-2" stroke="#d9a066" stroke-width="1.5" opacity=".8"/></g>`;
  const sh=(w)=>`<ellipse cx="${w/2}" cy="48" rx="${w*.46}" ry="7" fill="#1a0a20" opacity=".3"/>`;
  const L=[
   sh(120)+wd(18,40,44,-12,'#a9703d')+wd(52,34,34,22,'#b97d45')+chunk(90,40,26,18,6,'#cfc8d6')+chunk(70,44,20,12,-8,'#b8b0c4')+chunk(36,45,14,9,15,'#cfc8d6')+wd(40,26,26,-35,'#d1985c')+`<circle cx="104" cy="30" r="3" fill="#fff"/><circle cx="12" cy="44" r="2.6" fill="#fff"/>`,
   sh(120)+chunk(42,38,30,22,-6,'#cfc8d6')+chunk(76,42,24,16,10,'#b8b0c4')+chunk(100,45,16,10,-12,'#cfc8d6')+wd(20,36,36,18,'#a9703d')+wd(60,24,30,-50,'#b97d45')+chunk(60,30,14,10,30,'#d8d2de')+`<ellipse cx="60" cy="46" rx="40" ry="4" fill="#f4f8ff" opacity=".8"/>`,
   sh(120)+wd(10,42,52,5,'#b97d45')+wd(30,34,46,-18,'#a9703d')+wd(70,38,40,28,'#d1985c')+wd(50,26,24,-60,'#a9703d')+chunk(100,43,18,12,0,'#cfc8d6')+`<circle cx="88" cy="40" r="3.2" fill="#fff"/><circle cx="24" cy="30" r="2.4" fill="#fff"/><ellipse cx="60" cy="47" rx="48" ry="3.6" fill="#f4f8ff" opacity=".7"/>`];
  L.forEach((s,i)=>art('c-debris-'+(i+1),130,56,s,''))})();
/* ===== c-sleigh-front : avant du traîneau (260x210, ancrage bas-centre (130,210)) ===== */
(function(){
  const G='#f0c04a',GS='#b98a22',GH='#fff0a8',R='#d2342f',RS='#9f2420',RH='#ee5a4f';
  const defs=`<linearGradient id="rg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${RH}"/><stop offset=".5" stop-color="${R}"/><stop offset="1" stop-color="${RS}"/></linearGradient><linearGradient id="gg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${GH}"/><stop offset=".5" stop-color="${G}"/><stop offset="1" stop-color="${GS}"/></linearGradient>`;
  let s='';
  s+=`<ellipse cx="130" cy="202" rx="118" ry="9" fill="#1a0a20" opacity=".3"/>`;
  /* sacs de cadeaux derrière */
  s+=`<path d="M60,70 C54,40 80,22 110,26 C150,20 186,34 190,70Z" fill="#2f7a4f" stroke="${O}" stroke-width="4" stroke-linejoin="round"/><path d="M70,52 C90,40 120,38 140,44" fill="none" stroke="#43a36a" stroke-width="5" stroke-linecap="round" opacity=".7"/><rect x="146" y="14" width="36" height="34" rx="4" fill="#3d6fb5" stroke="${O}" stroke-width="3.4" transform="rotate(10 164 31)"/><rect x="158" y="10" width="9" height="40" fill="${G}" stroke="${O}" stroke-width="2.4" transform="rotate(10 164 31)"/>`;
  /* patins (vus 3/4) : barres dorées qui fuient vers l'arrière, volutes à l'avant */
  const runner=(x,sx)=>`<g transform="translate(${x},0) scale(${sx},1)"><path d="M0,190 L12,190 L26,142 L16,142Z" fill="url(#gg)" stroke="${O}" stroke-width="3.4" stroke-linejoin="round"/><path d="M-30,196 C-30,176 -6,176 -4,190 C-4,198 -16,200 -18,192 C-20,186 -10,184 -10,190" fill="none" stroke="${O}" stroke-width="12" stroke-linecap="round"/><path d="M-30,196 C-30,176 -6,176 -4,190 C-4,198 -16,200 -18,192 C-20,186 -10,184 -10,190" fill="none" stroke="url(#gg)" stroke-width="6.5" stroke-linecap="round"/><path d="M-4,190 L14,192" stroke="${O}" stroke-width="12" stroke-linecap="round"/><path d="M-4,190 L14,192" stroke="url(#gg)" stroke-width="6.5" stroke-linecap="round"/><rect x="2" y="150" width="9" height="40" rx="3" fill="${GS}" stroke="${O}" stroke-width="2.4"/></g>`;
  s+=runner(66,1)+runner(194,-1);
  s+=`<path d="M66,198 L194,198" stroke="${O}" stroke-width="0"/>`;
  /* caisse + dashboard en volute */
  const B='M52,96 C48,128 52,160 74,172 L186,172 C208,160 212,128 208,96 C190,86 70,86 52,96Z';
  s+=`<path d="${B}" fill="url(#rg)" stroke="${O}" stroke-width="5" stroke-linejoin="round"/>`;
  s+=`<path d="M60,100 C56,128 60,150 74,160" fill="none" stroke="${RH}" stroke-width="5" stroke-linecap="round" opacity=".7"/>`;
  s+=`<path d="M52,96 C70,86 190,86 208,96" fill="none" stroke="${O}" stroke-width="14" stroke-linecap="round"/><path d="M52,96 C70,86 190,86 208,96" fill="none" stroke="url(#gg)" stroke-width="8" stroke-linecap="round"/>`;
  /* volutes d'angle */
  const vol=(x,sx)=>`<g transform="translate(${x},96) scale(${sx},1)"><path d="M0,0 C-8,-22 -34,-22 -34,-4 C-34,8 -18,10 -18,-2 C-18,-10 -28,-8 -26,-2" fill="none" stroke="${O}" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/><path d="M0,0 C-8,-22 -34,-22 -34,-4 C-34,8 -18,10 -18,-2 C-18,-10 -28,-8 -26,-2" fill="none" stroke="url(#gg)" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></g>`;
  s+=vol(54,1)+vol(206,-1);
  /* médaillon doré + étoile */
  s+=`<ellipse cx="130" cy="132" rx="46" ry="30" fill="url(#gg)" stroke="${O}" stroke-width="4"/><ellipse cx="130" cy="132" rx="36" ry="22" fill="${R}" stroke="${O}" stroke-width="2.6"/>${star(130,132,17,G,2.6)}`;
  /* filet doré bas */
  s+=`<path d="M62,164 C100,172 160,172 198,164" fill="none" stroke="${G}" stroke-width="5" stroke-linecap="round"/>`;
  /* sangle + grelots */
  s+=`<path d="M40,104 C80,150 180,150 220,104" fill="none" stroke="${O}" stroke-width="9" stroke-linecap="round"/><path d="M40,104 C80,150 180,150 220,104" fill="none" stroke="${GS}" stroke-width="4.5" stroke-linecap="round"/>`;
  s+=mc_bell(80,138,10)+mc_bell(130,152,11)+mc_bell(180,138,10);
  /* éclats de planche accrochés */
  art('c-sleigh-front',260,210,s,defs)})();
/* ===== c-deer-head-hole : tête de renne penaude (300x300, ancrage bas-centre (150,300), regarde vers la GAUCHE = vers le Père Noël) ===== */
(function(){
  const [hin,hdef]=dc_head(false),[ein,edef]=dc_ear();
  const defs=hdef+edef+`<clipPath id="nk"><rect x="0" y="0" width="300" height="300"/></clipPath>`;
  let s='';
  /* cou + collier rouge + grelots */
  s+=`<path d="M86,300 C92,250 100,214 112,184 L196,170 C204,214 214,258 220,300Z" fill="${DC.FUR}" stroke="${O}" stroke-width="5" stroke-linejoin="round"/><path d="M150,176 L198,170 C206,214 214,258 220,300 L170,300 C170,250 160,206 150,176Z" fill="${DC.CRM}" opacity=".9"/><path d="M88,296 C94,252 102,216 112,186" fill="none" stroke="${O}" stroke-width="5"/>`;
  s+=`<path d="M100,236 Q156,262 212,232" fill="none" stroke="${O}" stroke-width="22" stroke-linecap="round"/><path d="M100,236 Q156,262 212,232" fill="none" stroke="${MC.RED}" stroke-width="14" stroke-linecap="round"/>`+mc_bell(126,262,10)+mc_bell(160,268,11);
  /* tête retournée vers la gauche, légèrement baissée */
  s+=`<g transform="translate(262,-4) rotate(-6 150 200) scale(-.62,.62)"><g transform="translate(0,60)"><g transform="translate(150,196) rotate(-100) scale(.9)"><g transform="translate(-55,-150)">${ein}</g></g></g>${hin}`
   +`<g transform="translate(0,60)">`
   +`<path d="M212,162 Q240,172 266,188" fill="none" stroke="${O}" stroke-width="6" stroke-linecap="round"/>`
   +`<path d="M222,206 Q240,214 258,208 L258,196 Q240,196 222,198Z" fill="${DC.FUR}" opacity=".0"/>`
   +`<path d="M227,243 C225,262 232,276 241,262 C246,254 240,246 227,243Z" fill="#9ed0f5" stroke="${O}" stroke-width="3.5" stroke-linejoin="round" transform="translate(44,-6)"/>`
   +`</g></g>`;
  art('c-deer-head-hole',300,300,s,defs)})();
})();
