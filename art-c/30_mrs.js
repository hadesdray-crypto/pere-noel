/* ===== Style C — Mère Noël (vectoriel) + aides de dessin partagées (préfixe mc_) ===== */
const MC={OL:'#4a2418',RED:'#d2342f',REDS:'#9f2420',REDH:'#ee5a4f',CREAM:'#fffaf0',CREAMS:'#e4d8c6',SKIN:'#f6c7a0',SKINS:'#e0a47c',BLUSH:'#f08a80',GOLD:'#f0c04a',GOLDS:'#b98a22',GOLDH:'#fff0a8',GREEN:'#2f7a4f',GREENS:'#1f5538'};
const mc_f=n=>Math.round(n*100)/100;
function mc_bez(p0,p1,p2,p3,n){const o=[];for(let i=0;i<=n;i++){const t=i/n,u=1-t;o.push([u*u*u*p0[0]+3*u*u*t*p1[0]+3*u*t*t*p2[0]+t*t*t*p3[0],u*u*u*p0[1]+3*u*u*t*p1[1]+3*u*t*t*p2[1]+t*t*t*p3[1]])}return o}
function mc_line(a,b,n){const o=[];for(let i=0;i<=n;i++)o.push([a[0]+(b[0]-a[0])*i/n,a[1]+(b[1]-a[1])*i/n]);return o}
/* fourrure « nuage » : rangée de cercles (contour, ombre, crème) */
function mc_fur(pts,r,ow,sh){ow=ow||4.6;sh=sh??1;let a='',b='',c='';
  pts.forEach((p,i)=>{const rr=r*(.92+.16*Math.sin(i*2.7+1));a+=`<circle cx="${mc_f(p[0])}" cy="${mc_f(p[1])}" r="${mc_f(rr+ow*.5)}"/>`;
    b+=`<circle cx="${mc_f(p[0])}" cy="${mc_f(p[1]+rr*.2)}" r="${mc_f(rr)}"/>`;c+=`<circle cx="${mc_f(p[0]-rr*.06)}" cy="${mc_f(p[1]-rr*.08)}" r="${mc_f(rr*.86)}"/>`});
  return `<g fill="${MC.OL}">${a}</g><g fill="${MC.CREAMS}">${b}</g><g fill="${MC.CREAM}">${c}</g>`}
/* capsule effilée entre deux cercles (c1,r1)->(c2,r2) */
function mc_caps(x1,y1,r1,x2,y2,r2){const dx=x2-x1,dy=y2-y1,L=Math.hypot(dx,dy),th=Math.atan2(dy,dx),al=Math.acos((r1-r2)/L);
  const P=(x,y,r,a)=>[x+r*Math.cos(a),y+r*Math.sin(a)];const a1=P(x1,y1,r1,th+al),a2=P(x2,y2,r2,th+al),b2=P(x2,y2,r2,th-al),b1=P(x1,y1,r1,th-al);
  return `M${mc_f(a1[0])},${mc_f(a1[1])} L${mc_f(a2[0])},${mc_f(a2[1])} A${r2},${r2} 0 0 0 ${mc_f(b2[0])},${mc_f(b2[1])} L${mc_f(b1[0])},${mc_f(b1[1])} A${r1},${r1} 0 1 0 ${mc_f(a1[0])},${mc_f(a1[1])} Z`}
/* cloche dorée */
function mc_bell(x,y,r){return `<g><circle cx="${x}" cy="${y}" r="${r+2.2}" fill="${MC.OL}"/><circle cx="${x}" cy="${y}" r="${r}" fill="${MC.GOLD}"/><path d="M${x-r*.9},${y+r*.1} A${r},${r} 0 0 0 ${x+r*.9},${y+r*.1} A${r},${r} 0 0 1 ${x},${y+r} A${r},${r} 0 0 1 ${x-r*.9},${y+r*.1}Z" fill="${MC.GOLDS}" opacity=".55"/><path d="M${x-r*.55},${y+r*.2} L${x+r*.55},${y+r*.2}" stroke="${MC.OL}" stroke-width="2.2" stroke-linecap="round"/><circle cx="${x}" cy="${y+r*.42}" r="${r*.17}" fill="${MC.OL}"/><ellipse cx="${x-r*.35}" cy="${y-r*.4}" rx="${r*.28}" ry="${r*.2}" fill="${MC.GOLDH}" transform="rotate(-30 ${x-r*.35} ${y-r*.4})"/></g>`}

function mc_robe(){const D='M128,26 C106,32 90,46 87,70 C84,104 98,138 110,166 C98,206 62,256 32,302 C100,326 300,326 368,302 C338,256 302,206 290,166 C302,138 316,104 313,70 C310,46 294,32 272,26 Z';
  const hem=mc_bez([30,300],[96,326],[304,326],[370,300],17), col=mc_bez([118,58],[138,96],[262,96],[282,58],10);
  const ap='M158,168 L242,168 C256,200 276,246 286,296 L114,296 C124,246 144,200 158,168 Z';
  const sc=mc_bez([112,297],[150,310],[250,310],[288,297],9);
  let scal='';sc.forEach(p=>scal+=`<circle cx="${mc_f(p[0])}" cy="${mc_f(p[1])}" r="10"/>`);
  const defs=`<clipPath id="d"><path d="${D}"/></clipPath><clipPath id="a"><path d="${ap}"/></clipPath>
  <linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e2493f"/><stop offset=".55" stop-color="${MC.RED}"/><stop offset="1" stop-color="#b92c27"/></linearGradient>
  <radialGradient id="h"><stop offset="0" stop-color="${MC.REDH}" stop-opacity=".7"/><stop offset="1" stop-color="${MC.REDH}" stop-opacity="0"/></radialGradient>`;
  const folds=[[150,176,112,300],[185,176,168,305],[215,176,232,305],[250,176,290,300]].map(f=>`<path d="M${f[0]},${f[1]} Q${(f[0]+f[2])/2+ (f[2]-f[0])*.1},${(f[1]+f[3])/2} ${f[2]},${f[3]}" fill="none" stroke="${MC.REDS}" stroke-width="5" stroke-linecap="round" opacity=".28"/>`).join('');
  const holly=`<g transform="translate(200,252)"><path d="M0,0 C-10,-26 -44,-30 -52,-12 C-40,-6 -34,-8 -30,-2 C-38,6 -30,12 -22,10 C-14,14 -6,8 0,0Z" fill="${MC.GREEN}" stroke="${MC.GREENS}" stroke-width="2.5" stroke-linejoin="round"/><path d="M0,0 C10,-26 44,-30 52,-12 C40,-6 34,-8 30,-2 C38,6 30,12 22,10 C14,14 6,8 0,0Z" fill="${MC.GREEN}" stroke="${MC.GREENS}" stroke-width="2.5" stroke-linejoin="round"/>
   <g fill="#d2342f" stroke="${MC.REDS}" stroke-width="2.5"><circle cx="-8" cy="4" r="9"/><circle cx="9" cy="3" r="9"/><circle cx="0" cy="-9" r="9"/></g><g fill="#fff" opacity=".8"><circle cx="-11" cy="1" r="2.6"/><circle cx="6" cy="0" r="2.6"/><circle cx="-3" cy="-12" r="2.6"/></g></g>`;
  const inner=`<ellipse cx="200" cy="320" rx="150" ry="14" fill="none"/>
  <path d="${D}" fill="url(#g)" stroke="${MC.OL}" stroke-width="6" stroke-linejoin="round"/>
  <g clip-path="url(#d)"><ellipse cx="345" cy="200" rx="120" ry="230" fill="${MC.REDS}" opacity=".38"/><ellipse cx="150" cy="118" rx="44" ry="60" fill="url(#h)"/>${folds}
   <ellipse cx="200" cy="40" rx="48" ry="32" fill="${MC.SKIN}"/></g>
  <path d="${ap}" fill="#fff1d6"/><g clip-path="url(#a)"><ellipse cx="300" cy="230" rx="60" ry="120" fill="#e6d3b0" opacity=".6"/></g>
  <path d="${ap}" fill="none" stroke="${MC.OL}" stroke-width="4" stroke-linejoin="round"/>
  <g fill="${MC.OL}">${scal.replace(/r="10"/g,'r="12.6"')}</g><g fill="#fff1d6">${scal}</g>
  <path d="M112,297 C150,310 250,310 288,297" fill="none" stroke="#fff1d6" stroke-width="6"/>
  ${holly}
  <rect x="150" y="162" width="100" height="16" rx="8" fill="${MC.GREEN}" stroke="${MC.OL}" stroke-width="4"/>
  <g stroke="${MC.OL}" stroke-width="4" stroke-linejoin="round"><path d="M200,170 C176,150 160,160 164,176 C168,190 190,180 200,170Z" fill="${MC.GOLD}"/><path d="M200,170 C224,150 240,160 236,176 C232,190 210,180 200,170Z" fill="${MC.GOLD}"/><circle cx="200" cy="170" r="8" fill="${MC.GOLD}"/></g>
  ${mc_fur(hem,17,5)}${mc_fur(col,15,5)}`;
  return [inner,defs]}

function mc_arm(side){/* bras du haut : cap d'épaule rond + manche ; art 90x136, pivot épaule (45,38) */
  const caps=mc_caps(45,36,29,45,104,24);
  const defs=`<clipPath id="c"><path d="${caps}"/></clipPath><linearGradient id="g" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#e2493f"/><stop offset=".6" stop-color="${MC.RED}"/><stop offset="1" stop-color="#ad2a25"/></linearGradient>`;
  const sg=side==='g'?1:-1;
  return [`<path d="${caps}" fill="url(#g)" stroke="${MC.OL}" stroke-width="5.5" stroke-linejoin="round"/><g clip-path="url(#c)"><ellipse cx="${45+sg*30}" cy="100" rx="20" ry="80" fill="${MC.REDS}" opacity="${side==='g'?.22:.4}"/><ellipse cx="${side==='g'?34:56}" cy="32" rx="11" ry="15" fill="${MC.REDH}" opacity=".5"/></g>`,defs]}
function mc_fore(side){/* avant-bras + manchette de fourrure + main moufle ; art 90x136, pivot coude (45,26) */
  const caps=mc_caps(45,26,22,45,80,18);const sg=side==='g'?1:-1;
  const defs=`<clipPath id="c"><path d="${caps}"/></clipPath><clipPath id="hd"><circle cx="45" cy="102" r="21"/></clipPath><linearGradient id="g" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#e2493f"/><stop offset=".6" stop-color="${MC.RED}"/><stop offset="1" stop-color="#ad2a25"/></linearGradient>`;
  const hand=`<circle cx="45" cy="102" r="21" fill="${MC.SKIN}" stroke="${MC.OL}" stroke-width="5"/><g clip-path="url(#hd)"><ellipse cx="${45-sg*12}" cy="118" rx="26" ry="16" fill="${MC.SKINS}" opacity=".7"/></g>
   <ellipse cx="${45+sg*19}" cy="98" rx="8.5" ry="13" transform="rotate(${sg*-20} ${45+sg*19} 98)" fill="${MC.SKIN}" stroke="${MC.OL}" stroke-width="4.5"/>`;
  return [`<path d="${caps}" fill="url(#g)" stroke="${MC.OL}" stroke-width="5.5" stroke-linejoin="round"/><g clip-path="url(#c)"><ellipse cx="${45+sg*20}" cy="55" rx="12" ry="50" fill="${MC.REDS}" opacity="${side==='g'?.2:.38}"/></g>
   ${hand}${mc_fur(mc_line([30,82],[60,82],3),11,5)}`,defs]}

function mc_head(){/* art 300x330 ; visage décalé de +26 en y ; pivot (150,258) */
  const defs=`<clipPath id="f"><ellipse cx="150" cy="170" rx="98" ry="82"/></clipPath><clipPath id="hr"><path d="M40,150 C32,66 92,28 150,28 C208,28 268,66 260,150 C259,168 251,172 246,162 C238,128 208,98 168,98 C140,98 114,112 96,126 C80,138 66,148 56,166 C51,174 42,168 40,150Z"/></clipPath>
  <radialGradient id="ch"><stop offset="0" stop-color="${MC.BLUSH}" stop-opacity=".85"/><stop offset="1" stop-color="${MC.BLUSH}" stop-opacity="0"/></radialGradient>
  <linearGradient id="sk" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fbd2ad"/><stop offset="1" stop-color="${MC.SKIN}"/></linearGradient>`;
  const hair='#fdfdff',hairS='#d9d9e6',ol=MC.OL;
  const eye=x=>`<g transform="translate(${x},174)"><ellipse rx="14" ry="15.5" fill="#fff"/><circle cx="0" cy="1" r="11.5" fill="#7a4524"/><circle cx="0" cy="1" r="6.6" fill="#2b140c"/><circle cx="-4" cy="-3.6" r="4" fill="#fff"/><circle cx="3.2" cy="4.4" r="1.7" fill="#fff" opacity=".9"/><path d="M-13,-6 Q0,-18 13,-6" fill="none" stroke="${ol}" stroke-width="3.4" stroke-linecap="round"/></g>`;
  const glass=x=>`<circle cx="${x}" cy="174" r="30" fill="#fff" fill-opacity=".13" stroke="${MC.GOLDS}" stroke-width="7"/><circle cx="${x}" cy="174" r="30" fill="none" stroke="${MC.GOLD}" stroke-width="4"/><path d="M${x-19},${158} Q${x-9},${147} ${x+4},${147}" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" opacity=".8"/>`;
  const inner=`<g transform="translate(0,26)">
  <circle cx="150" cy="28" r="42" fill="${hair}" stroke="${ol}" stroke-width="5.5"/>
  <ellipse cx="150" cy="120" rx="110" ry="94" fill="${hair}" stroke="${ol}" stroke-width="5.5"/>
  <circle cx="150" cy="28" r="36" fill="${hair}"/><path d="M112,62 C130,76 170,76 188,62" fill="none" stroke="${hairS}" stroke-width="4" stroke-linecap="round"/>
  <path d="M128,26 C128,10 158,8 168,20 C178,32 166,46 154,42 C146,38 148,28 156,28" fill="none" stroke="${hairS}" stroke-width="4" stroke-linecap="round"/>
  <ellipse cx="50" cy="176" rx="17" ry="20" fill="${MC.SKIN}" stroke="${ol}" stroke-width="5"/><ellipse cx="250" cy="176" rx="17" ry="20" fill="${MC.SKINS}" stroke="${ol}" stroke-width="5"/>
  <ellipse cx="150" cy="170" rx="98" ry="82" fill="url(#sk)" stroke="${ol}" stroke-width="5.5"/>
  <g clip-path="url(#f)"><ellipse cx="262" cy="190" rx="60" ry="100" fill="${MC.SKINS}" opacity=".28"/></g>
  <circle cx="86" cy="208" r="26" fill="url(#ch)"/><circle cx="214" cy="208" r="26" fill="url(#ch)"/>
  <path d="M40,150 C32,66 92,28 150,28 C208,28 268,66 260,150 C259,168 251,172 246,162 C240,130 214,104 188,102 C176,92 156,90 150,98 C138,88 116,92 108,104 C80,110 62,134 56,166 C51,174 42,168 40,150Z" fill="${hair}"/>
  <path d="M246,164 C240,130 214,104 188,102 C176,92 156,90 150,98 C138,88 116,92 108,104 C80,110 62,134 54,168" fill="none" stroke="${ol}" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/>
  <g clip-path="url(#hr)"><ellipse cx="268" cy="100" rx="52" ry="90" fill="${hairS}" opacity=".7"/>
   <path d="M70,104 C80,70 112,52 150,52 M190,58 C216,66 238,88 246,118" fill="none" stroke="${hairS}" stroke-width="4" stroke-linecap="round"/></g>
  <path d="M86,146 Q108,136 128,146" fill="none" stroke="#c9c9d6" stroke-width="5.5" stroke-linecap="round"/><path d="M172,146 Q192,136 214,146" fill="none" stroke="#c9c9d6" stroke-width="5.5" stroke-linecap="round"/>
  ${eye(106)}${eye(194)}
  <path d="M134,172 Q150,162 166,172" fill="none" stroke="${MC.GOLDS}" stroke-width="5" stroke-linecap="round"/>${glass(106)}${glass(194)}
  <ellipse cx="150" cy="200" rx="12" ry="10" fill="#f2a98a" stroke="#d98c6c" stroke-width="2.5"/><ellipse cx="146" cy="196" rx="4" ry="3" fill="#fff" opacity=".6"/>
  <path d="M124,222 Q150,244 176,222" fill="none" stroke="${ol}" stroke-width="4.2" stroke-linecap="round"/>
  <path d="M118,214 Q122,220 128,224 M182,214 Q178,220 172,224" fill="none" stroke="${MC.SKINS}" stroke-width="3" stroke-linecap="round" opacity=".7"/></g>`;
  return [inner,defs]}
function mc_mouth(){/* bouche ouverte (même repère que la tête) */
  const inner=`<g transform="translate(0,26)"><path d="M122,221 Q150,243 178,221 Q176,264 150,266 Q124,264 122,221Z" fill="#7d2420" stroke="${MC.OL}" stroke-width="4.6" stroke-linejoin="round"/>
  <clipPath id="m"><path d="M122,221 Q150,243 178,221 Q176,264 150,266 Q124,264 122,221Z"/></clipPath><g clip-path="url(#m)"><ellipse cx="150" cy="268" rx="26" ry="18" fill="#f07a7a"/></g></g>`;
  return [inner,'']}
function mc_boot(side){const o=side==='d'?1:-1;const X=x=>o>0?x:84-x;
  const shoe=`M${X(24)},40 C${X(8)},44 ${X(2)},56 ${X(4)},64 C${X(6)},72 ${X(14)},73 ${X(24)},73 L${X(62)},73 C${X(70)},73 ${X(74)},68 ${X(72)},60 L${X(68)},40Z`;
  const leg=`M${X(26)},0 L${X(66)},0 L${X(66)},46 L${X(26)},46Z`;
  const defs=`<clipPath id="l"><path d="${leg}"/></clipPath><clipPath id="b"><path d="${shoe}"/></clipPath>`;
  let st='';for(let i=0;i<4;i++)st+=`<rect x="0" y="${i*16}" width="90" height="8" fill="${MC.RED}"/>`;
  return [`<path d="${leg}" fill="${MC.CREAM}"/><g clip-path="url(#l)">${st}<rect x="${X(62)}" y="0" width="${o>0?10:-10}" height="50" fill="#000" opacity=".12"/></g><path d="M${X(26)},0 L${X(26)},44 M${X(66)},0 L${X(66)},44" stroke="${MC.OL}" stroke-width="5" fill="none" stroke-linecap="round"/>
  <path d="${shoe}" fill="#7a4a2a" stroke="${MC.OL}" stroke-width="5" stroke-linejoin="round"/><g clip-path="url(#b)"><rect x="0" y="64" width="90" height="12" fill="#3a2216"/><ellipse cx="${X(30)}" cy="52" rx="10" ry="6" fill="#d9a066" opacity=".7"/></g>
  <path d="M${X(24)},42 L${X(68)},42" stroke="${MC.OL}" stroke-width="4.5" stroke-linecap="round"/>`,defs]}
function mc_tray(){/* art 260x150 ; pivot = centre du dessous (130,118) */
  const cook=(x,y,rot)=>`<g transform="translate(${x},${y}) rotate(${rot})"><ellipse rx="25" ry="18" fill="#c98e55" stroke="${MC.OL}" stroke-width="3.5"/><ellipse cx="-4" cy="-4" rx="15" ry="10" fill="#dfa86a" opacity=".7"/><g fill="#5a3320"><circle cx="-8" cy="-3" r="3.4"/><circle cx="7" cy="-6" r="3.2"/><circle cx="4" cy="6" r="3.4"/><circle cx="-10" cy="7" r="2.6"/></g></g>`;
  const star=(x,y,rot)=>{let d='';for(let i=0;i<10;i++){const a=Math.PI*i/5-Math.PI/2,r=i%2?10:24;d+=(i?'L':'M')+mc_f(r*Math.cos(a))+','+mc_f(r*Math.sin(a)*.8)}return `<g transform="translate(${x},${y}) rotate(${rot})"><path d="${d}Z" fill="#e9b877" stroke="${MC.OL}" stroke-width="3.5" stroke-linejoin="round"/><path d="${d}Z" transform="scale(.5)" fill="#fff6e6"/><circle r="3" fill="${MC.RED}"/></g>`};
  const inner=`<ellipse cx="130" cy="96" rx="122" ry="36" fill="#7a4a2a" stroke="${MC.OL}" stroke-width="5"/><ellipse cx="130" cy="86" rx="122" ry="36" fill="#a9703d" stroke="${MC.OL}" stroke-width="5"/>
  <ellipse cx="130" cy="86" rx="106" ry="27" fill="#8a5630"/><ellipse cx="130" cy="82" rx="100" ry="23" fill="#c48a52" opacity=".6"/>
  ${cook(70,82,-8)}${cook(190,82,10)}${star(130,86,8)}${cook(100,66,6)}${cook(162,66,-6)}${star(130,50,-4)}${cook(84,92,0).replace('<g ','<g opacity="0" ')}
  <path d="M30,92 Q60,112 130,114 Q200,112 230,92" fill="none" stroke="#e9b877" stroke-width="4" stroke-linecap="round" opacity=".6"/>`;
  return [inner,'']}

function defMrsC(R,IMG){
  const pcs={robe:mc_robe(),'bras-g':mc_arm('g'),'bras-d':mc_arm('d'),'av-g':mc_fore('g'),'av-d':mc_fore('d'),tete:mc_head(),bouche:mc_mouth(),'botte-g':mc_boot('g'),'botte-d':mc_boot('d'),plateau:mc_tray()};
  const sz={robe:[400,340],'bras-g':[90,136],'bras-d':[90,136],'av-g':[90,136],'av-d':[90,136],tete:[300,330],bouche:[300,330],'botte-g':[84,74],'botte-d':[84,74],plateau:[260,150]};
  for(const k in pcs)art('c-mrs-'+k,sz[k][0],sz[k][1],pcs[k][0],pcs[k][1]);
  const IM=buildIMG_C(); /* (re)construit avec nos pièces */
  for(const k in IM)IMG[k]=IM[k];
  R.add({name:'base',x:R.W/2,y:R.H-8});
  R.add({name:'botte-g',img:'c-mrs-botte-g',parent:'base',x:-54,y:0,px:.5,py:70/74,z:1});
  R.add({name:'botte-d',img:'c-mrs-botte-d',parent:'base',x:54,y:0,px:.5,py:70/74,z:1});
  R.add({name:'corps',parent:'base',x:0,y:-66,z:2});
  R.add({name:'robe',img:'c-mrs-robe',parent:'corps',x:0,y:0,px:.5,py:330/340,z:3});
  const SH={g:[-98,-238],d:[98,-238]};R.MRS_SH=SH;
  for(const s of ['g','d']){const sg=s==='g'?1:-1;
    R.add({name:'bras-'+s,img:'c-mrs-bras-'+s,parent:'corps',x:SH[s][0],y:SH[s][1],px:.5,py:38/136,r:sg*7,z:4});
    R.add({name:'avbras-'+s,img:'c-mrs-av-'+s,parent:'bras-'+s,x:0,y:68,px:.5,py:26/136,r:-sg*20,z:-1})}
  R.add({name:'tete',img:'c-mrs-tete',parent:'corps',x:0,y:-290,px:.5,py:258/330,z:6});
  R.add({name:'bouche',img:'c-mrs-bouche',parent:'tete',x:0,y:0,px:.5,py:258/330,z:1});
  R.add({name:'plateau',img:'c-mrs-plateau',parent:'bras-d',x:-90,y:44,px:.5,py:118/150,sx:.86,sy:.86,z:5});
  R.show('bouche',false);R.show('plateau',false);
  /* le plateau reste horizontal quelle que soit la pose du bras ; poser/retirer le plateau change la pose du bras droit */
  const orig=R.place.bind(R);
  const level=()=>{const p=R.bones.plateau;if(!p)return;let s=0,b=R.bones['bras-d'];while(b){s+=b.r+b.dr;b=b.parent?R.bones[b.parent]:null}p.r=-s;orig(p)};
  R.place=function(b){orig(b);if(b.name==='corps'||b.name==='bras-d'||b.name==='avbras-d')level()};
  R.carry=function(on){R.set('bras-d',{r:on?-32:-7});R.set('avbras-d',{r:on?110:20});const t=110*Math.PI/180,L=98;R.set('plateau',{x:-L*Math.sin(t),y:68+L*Math.cos(t)+10});level()};
  const sh=R.show.bind(R);R.show=function(n,v){sh(n,v);if(n==='plateau')R.carry(v)};
}
