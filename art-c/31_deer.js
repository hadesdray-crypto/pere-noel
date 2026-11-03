/* ===== Style C — Renne (vectoriel), regarde vers la DROITE ===== */
const DC={FUR:'#a9703d',FURS:'#7a4a2a',FURH:'#d9a066',CRM:'#f0d9b0',CRMS:'#d9bb8a',HOOF:'#3a2418'};
function dc_defs(){return `<linearGradient id="fg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b87c46"/><stop offset="1" stop-color="${DC.FUR}"/></linearGradient>`}
function dc_antler(x,y,sc,far){/* bois : un côté ; (x,y) = racine */
  const col=far?'#8f6c44':'#d4a569',hl=far?'#aa8456':'#f0cf98';
  const beam='M0,0 C-22,-40 -54,-80 -52,-130 C-50,-166 -24,-190 8,-196';
  const T=['M-10,-34 C10,-50 30,-50 44,-72','M-40,-92 C-66,-98 -84,-114 -90,-140','M-52,-128 C-30,-134 -6,-124 8,-102','M8,-196 C24,-206 34,-224 32,-246','M-26,-190 C-36,-210 -34,-232 -46,-248'];
  const L=(d,w,c)=>`<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
  const all=(w,c,dw)=>L(beam,w+dw,c)+T.map((t,i)=>L(t,w*(i<3?.7:.6)+dw,c)).join('');
  return `<g transform="translate(${x},${y}) scale(${sc})">${all(34,'#4a2418',13)}${all(34,col,0)}<g transform="translate(-6,0)" opacity=".9">${L(beam,7,hl)}${L(T[0],5,hl)}${L(T[1],5,hl)}</g></g>`}
function dc_body(){
  const P='M45,160 C45,88 110,44 200,42 C280,40 356,52 400,100 C436,140 430,206 392,244 C350,282 270,282 200,280 C110,278 45,236 45,160Z';
  const defs=dc_defs()+`<clipPath id="b"><path d="${P}"/></clipPath><radialGradient id="bg" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#c4864c"/><stop offset=".6" stop-color="${DC.FUR}"/><stop offset="1" stop-color="#8f5a31"/></radialGradient>`;
  const band='M326,34 C348,110 352,200 338,290',strap='M328,90 C260,76 170,80 90,106';
  const studs=[0,1,2,3].map(i=>`<circle cx="${300-i*60}" cy="${90+i*3+ (i>1?2:0)}" r="5" fill="${MC.GOLD}" stroke="${MC.OL}" stroke-width="2"/>`).join('');
  const inner=`<path d="${P}" fill="url(#bg)" stroke="${MC.OL}" stroke-width="7" stroke-linejoin="round"/>
  <g clip-path="url(#b)"><ellipse cx="240" cy="290" rx="170" ry="58" fill="${DC.CRM}"/><ellipse cx="240" cy="296" rx="150" ry="36" fill="${DC.CRMS}" opacity=".7"/>
   <ellipse cx="430" cy="190" rx="60" ry="130" fill="${DC.FURS}" opacity=".35"/><ellipse cx="150" cy="86" rx="100" ry="26" transform="rotate(-8 150 86)" fill="${DC.FURH}" opacity=".5"/>
   <path d="${strap}" fill="none" stroke="${MC.OL}" stroke-width="22" stroke-linecap="round"/><path d="${strap}" fill="none" stroke="${MC.RED}" stroke-width="13" stroke-linecap="round"/>
   <path d="${band}" fill="none" stroke="${MC.OL}" stroke-width="36"/><path d="${band}" fill="none" stroke="${MC.RED}" stroke-width="27"/><path d="M319,36 C340,110 344,200 331,290" fill="none" stroke="${MC.REDH}" stroke-width="5" opacity=".7"/><path d="M336,36 C357,110 361,200 348,290" fill="none" stroke="${MC.REDS}" stroke-width="7" opacity=".6"/></g>
  ${studs}<circle cx="328" cy="88" r="12" fill="${MC.GOLD}" stroke="${MC.OL}" stroke-width="4"/><circle cx="325" cy="85" r="4" fill="${MC.GOLDH}"/>
  ${mc_bell(344,150,15)}${mc_bell(350,196,16)}${mc_bell(344,242,15)}`;
  return [inner,defs]}
function dc_neck(){/* art 170x250 ; pivot base (85,230) ; axe vertical */
  const N='M10,244 C20,170 30,96 44,6 L132,6 C142,96 156,170 164,244Z';
  const defs=dc_defs()+`<clipPath id="n"><path d="${N}"/></clipPath><linearGradient id="fd" x1="0" y1="1" x2="0" y2="0"><stop offset=".06" stop-color="#fff" stop-opacity="0"/><stop offset=".2" stop-color="#fff" stop-opacity="1"/></linearGradient><mask id="mk"><rect width="170" height="250" fill="url(#fd)"/></mask>
  <linearGradient id="ng" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#b98048"/><stop offset=".6" stop-color="${DC.FUR}"/><stop offset="1" stop-color="#8f5a31"/></linearGradient>`;
  const col='M24,118 Q88,150 150,114';
  const inner=`<g mask="url(#mk)"><path d="${N}" fill="url(#ng)"/><g clip-path="url(#n)"><path d="M120,6 C132,96 146,170 152,244 L170,244 L170,6Z" fill="${DC.CRM}"/><path d="M110,10 C120,96 132,170 138,244" stroke="${DC.CRMS}" stroke-width="8" fill="none" opacity=".7"/></g>
   <path d="M10,244 C20,170 30,96 44,6" fill="none" stroke="${MC.OL}" stroke-width="7" stroke-linecap="round"/><path d="M164,244 C156,170 142,96 132,6" fill="none" stroke="${MC.OL}" stroke-width="7" stroke-linecap="round"/></g>
   <path d="${col}" fill="none" stroke="${MC.OL}" stroke-width="30" stroke-linecap="round"/><path d="${col}" fill="none" stroke="${MC.RED}" stroke-width="21" stroke-linecap="round"/><path d="M34,112 Q88,142 140,108" fill="none" stroke="${MC.REDH}" stroke-width="4" opacity=".7"/>
   ${mc_bell(66,152,12.5)}${mc_bell(94,160,13.5)}${mc_bell(122,148,11.5)}`;
  return [inner,defs]}
function dc_head(open){/* art 440x360 ; pivot (cou) (150,300) ; regarde à droite */
  const UP='M72,252 C66,190 112,146 176,146 C224,146 258,168 290,196 C312,216 344,220 366,236 C382,250 376,270 356,276 L222,284 C216,300 210,320 200,338 C150,342 78,310 72,252Z';
  const JW='M222,284 L356,276 C370,280 370,292 352,298 C330,304 300,308 272,312 C248,316 228,316 214,310 C208,300 214,290 222,284Z';
  const defs=dc_defs()+`<clipPath id="u"><path d="${UP}"/></clipPath><clipPath id="j"><path d="${JW}"/></clipPath><radialGradient id="hg" cx=".35" cy=".3" r=".9"><stop offset="0" stop-color="#c4864c"/><stop offset=".6" stop-color="${DC.FUR}"/><stop offset="1" stop-color="#8f5a31"/></radialGradient>`;
  const ang=open?26:0;
  const jaw=`<g transform="rotate(${ang} 222 292)"><path d="${JW}" fill="#e6c595" stroke="${MC.OL}" stroke-width="6.5" stroke-linejoin="round"/><g clip-path="url(#j)"><ellipse cx="290" cy="330" rx="110" ry="24" fill="${DC.CRMS}" opacity=".8"/>${open?'<ellipse cx="290" cy="282" rx="56" ry="12" fill="#f07a7a"/>':''}</g></g>`;
  const mouthIn=open?`<path d="M222,284 L352,278 L338,346 L224,318Z" fill="#6b1d1a" stroke="${MC.OL}" stroke-width="5" stroke-linejoin="round"/>`:'';
  const eye=`<g transform="translate(240,208)"><ellipse rx="21" ry="23" fill="#fff" stroke="${MC.OL}" stroke-width="4"/><circle cx="3" cy="2" r="16" fill="#4a2a18"/><circle cx="3" cy="2" r="9.5" fill="#150a06"/><circle cx="-3" cy="-6" r="6" fill="#fff"/><circle cx="9" cy="9" r="2.6" fill="#fff" opacity=".9"/><path d="M-17,-14 Q2,-26 20,-14" fill="none" stroke="${MC.OL}" stroke-width="4" stroke-linecap="round"/></g>`;
  const inner=`<g transform="translate(0,60)">${dc_antler(226,160,.66,true)}${dc_antler(166,166,.8,false)}
  ${mouthIn}
  <path d="${UP}" fill="url(#hg)" stroke="${MC.OL}" stroke-width="7" stroke-linejoin="round"/>
  <g clip-path="url(#u)"><ellipse cx="352" cy="262" rx="64" ry="36" fill="${DC.CRM}" opacity=".9"/><ellipse cx="90" cy="300" rx="50" ry="70" fill="${DC.FURS}" opacity=".3"/><ellipse cx="170" cy="176" rx="60" ry="22" transform="rotate(-14 170 176)" fill="${DC.FURH}" opacity=".5"/>
   </g>
  ${jaw}
  <ellipse cx="256" cy="256" rx="24" ry="17" fill="${MC.BLUSH}" opacity=".4"/>${eye}
  <path d="M350,277 Q326,290 304,285" fill="none" stroke="${MC.OL}" stroke-width="4" stroke-linecap="round"/>
  <g transform="translate(360,238)"><circle r="33" fill="${MC.OL}"/><circle r="28" fill="#e8282b"/><path d="M-27,6 A28,28 0 0 0 20,18 A28,28 0 0 1 -27,6Z" fill="#a8161a"/><ellipse cx="-9" cy="-11" rx="11" ry="7" fill="#fff" opacity=".85" transform="rotate(-30 -9 -11)"/><circle cx="-18" cy="2" r="2.6" fill="#fff" opacity=".7"/></g></g>`;
  return [inner,defs]}
function dc_ear(){/* art 110x170 ; pivot racine (55,150) ; pointe vers le haut */
  const E='M55,152 C14,130 8,70 30,10 C70,34 100,92 88,142 C82,160 64,164 55,152Z';
  const defs=`<clipPath id="e"><path d="${E}"/></clipPath>`;
  return [`<path d="${E}" fill="${DC.FUR}" stroke="${MC.OL}" stroke-width="6" stroke-linejoin="round"/><g clip-path="url(#e)"><path d="M54,140 C32,118 28,76 38,40 C62,64 78,100 74,134Z" fill="#f0a98a"/><ellipse cx="80" cy="110" rx="14" ry="50" fill="${DC.FURS}" opacity=".35"/></g>`,defs]}
function dc_tail(){/* art 80x100 ; pivot racine (40,88) ; pointe vers le haut */
  const T='M40,90 C10,74 4,30 28,6 C44,30 68,44 70,64 C70,80 56,92 40,90Z';
  return [`<path d="${T}" fill="${DC.CRM}" stroke="${MC.OL}" stroke-width="6" stroke-linejoin="round"/><path d="M40,88 C20,74 18,40 30,20 C40,44 52,58 50,76Z" fill="${DC.CRMS}" opacity=".7"/>`,'']}
function dc_thigh(rear){/* art 110x170 ; pivot hanche (55,50) ; genou (55,140) */
  const caps=rear?mc_caps(55,50,38,55,140,21):mc_caps(55,50,31,55,140,19);
  const defs=dc_defs()+`<clipPath id="t"><path d="${caps}"/></clipPath>`;
  return [`<path d="${caps}" fill="url(#fg)" stroke="${MC.OL}" stroke-width="6.5" stroke-linejoin="round"/>
   <g clip-path="url(#t)"><ellipse cx="${rear?86:80}" cy="100" rx="26" ry="70" fill="${DC.FURS}" opacity=".35"/><ellipse cx="40" cy="80" rx="9" ry="28" fill="${DC.FURH}" opacity=".5"/></g>
   <ellipse cx="49" cy="136" rx="8" ry="6" fill="${DC.FURH}" opacity=".5"/>`,defs]}
function dc_canon(){/* art 70x150 ; pivot genou (35,24) ; sabot en bas (sol = y 136) */
  const caps=mc_caps(35,24,17,35,100,13);
  const defs=`<clipPath id="c"><path d="${caps}"/></clipPath><linearGradient id="cg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${DC.FUR}"/><stop offset=".4" stop-color="${DC.FUR}"/><stop offset=".85" stop-color="${DC.CRM}"/></linearGradient>`;
  const hoof='M17,102 L53,102 C56,116 58,126 56,132 C54,137 48,138 42,138 L28,138 C22,138 16,137 14,132 C12,126 14,116 17,102Z';
  return [`<path d="${hoof}" fill="${DC.HOOF}" stroke="${MC.OL}" stroke-width="5.5" stroke-linejoin="round"/><path d="M35,118 L35,137" stroke="#1f120b" stroke-width="3"/><ellipse cx="25" cy="116" rx="3.5" ry="8" fill="#7a5a48" opacity=".7"/>
   <path d="${caps}" fill="url(#cg)" stroke="${MC.OL}" stroke-width="6" stroke-linejoin="round"/><g clip-path="url(#c)"><ellipse cx="48" cy="70" rx="8" ry="46" fill="${DC.FURS}" opacity=".3"/></g>
   <path d="M20,104 Q35,112 50,104" fill="none" stroke="${MC.OL}" stroke-width="3.5" stroke-linecap="round" opacity=".5"/>`,defs]}

function defDeerC(R,IMG){
  const pcs={corps:[dc_body(),480,320],cou:[dc_neck(),170,250],'tete-f':[dc_head(false),440,420],'tete-o':[dc_head(true),440,420],oreille:[dc_ear(),110,170],queue:[dc_tail(),80,100],'cuisse-r':[dc_thigh(true),110,170],'cuisse-f':[dc_thigh(false),110,170],canon:[dc_canon(),70,150]};
  for(const k in pcs)art('c-deer-'+k,pcs[k][1],pcs[k][2],pcs[k][0][0],pcs[k][0][1]);
  const IM=buildIMG_C();for(const k in IM)IMG[k]=IM[k];
  R.add({name:'base',x:R.W/2,y:R.H-8});
  R.add({name:'corps',img:'c-deer-corps',parent:'base',x:-110,y:-262,px:.5,py:.5,z:5});
  /* pattes : 1 arrière proche, 2 arrière loin, 3 avant proche, 4 avant loin ; (diagonales 1+4 / 2+3) */
  const L=[[1,-122,1,1],[2,-86,0,0],[3,128,0,1],[4,92,1,0]];
  for(const [i,hx,rear,near] of L){const sh=near?'':'brightness(.78)';
    const t=R.add({name:'cuisse-'+i,img:'c-deer-cuisse-'+(rear?'r':'f'),parent:'corps',x:hx,y:58,px:55/110,py:50/170,z:near?-1:-2});
    const c=R.add({name:'canon-'+i,img:'c-deer-canon',parent:'cuisse-'+i,x:0,y:90,px:.5,py:24/150,z:-1});
    if(sh){t.im.style.filter=sh;c.im.style.filter=sh}}
  R.add({name:'queue',img:'c-deer-queue',parent:'corps',x:-196,y:-46,px:.5,py:88/100,r:-30,z:4});
  R.add({name:'cou',img:'c-deer-cou',parent:'corps',x:104,y:8,px:85/170,py:230/250,r:34,z:-3});
  R.add({name:'tete',parent:'cou',x:0,y:-204,r:-30});
  const H={px:150/440,py:360/420};
  R.add({name:'oreille-f',img:'c-deer-oreille',parent:'tete',x:36,y:-130,px:.5,py:150/170,sx:.8,sy:.8,r:8,z:6});
  R.add({name:'tete-f',img:'c-deer-tete-f',parent:'tete',x:0,y:0,...H,z:7});
  R.add({name:'tete-o',img:'c-deer-tete-o',parent:'tete',x:0,y:0,...H,z:7});
  R.add({name:'oreille',img:'c-deer-oreille',parent:'tete',x:-2,y:-122,px:.5,py:150/170,sx:.8,sy:.8,r:-16,z:8});
  R.bones['oreille-f'].im.style.filter='brightness(.8)';
  R.show('tete-o',false);
  /* signes de marche : le jeu envoie th (cuisse) positif = pied vers l'arrière ; on inverse la cuisse et on recale le canon pour que le pied se lève pendant l'oscillation vers l'avant */
  const orig=R.place.bind(R);
  R.place=function(b){const m=/^(cuisse|canon)-(\d)$/.exec(b.name);if(!m){return orig(b)}
    const d=b.dr;if(m[1]==='cuisse'){b.dr=-d;orig(b);b.dr=d}else{const th=R.bones['cuisse-'+m[2]].dr;b.dr=d+.8*th;orig(b);b.dr=d}};
  for(const i of [1,2,3,4])R.place(R.bones['cuisse-'+i]);
}
