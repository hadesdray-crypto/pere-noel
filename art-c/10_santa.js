/* ===== Style C — Père Noël + fauteuil (vecteur). Repère du rig 760x1000, sol en (380,992). ===== */
;(function(){
const OL='#4a2418',SW=5;
const RED='#d2342f',RED_S='#9f2420',RED_H='#ee5a4f',GOLD='#f0c04a',GOLD_S='#b98a22',GOLD_H='#fff0a8';
const SKIN_S='#e0a47c',CHK='#f08a80',FUR='#fffaf0',FUR_S='#e4d8c6',BLK='#2b211d';
const r1=n=>Math.round(n*10)/10;
const BASE=[380,992],C=[380,660],N=[380,468];            /* sol, corps (hanches), cou */
const SHL=[236,500];                                      /* épaule gauche (écran) ; la droite = miroir */
const L1=145,L2=156;
const HY=38;                                              /* tête dessinée avec cou en y=430, posée avec cou en y=468 */

/* ---------- aides de dessin ---------- */
function piece(name,x0,y0,x1,y1,inner,defs){const w=Math.ceil(x1-x0),h=Math.ceil(y1-y0);
  art(name,w,h,`<g transform="translate(${-x0},${-y0})">${inner}</g>`,defs);return {name,x0,y0,w,h}}
const MIR=x=>760-x;
function sidePiece(name,box,fn,m){const o=fn(m);let [x0,y0,x1,y1]=box;
  if(m<0){const a=MIR(x1),b=MIR(x0);x0=a;x1=b;o.inner=`<g transform="translate(760,0) scale(-1,1)">${o.inner}</g>`}
  return piece(name,x0,y0,x1,y1,o.inner,o.defs)}
function sym(start,segs,cx){cx=cx??380;const m=x=>2*cx-x;let d=`M${start[0]},${start[1]}`;const pts=[start];
  for(const s of segs){d+=s[0]+s.slice(1).join(',');pts.push([s[s.length-2],s[s.length-1]])}
  const last=pts[pts.length-1];d+=`L${m(last[0])},${last[1]}`;
  for(let i=segs.length-1;i>=0;i--){const s=segs[i],pv=pts[i];
    if(s[0]==='L')d+=`L${m(pv[0])},${pv[1]}`;else d+=`C${m(s[3])},${s[4]} ${m(s[1])},${s[2]} ${m(pv[0])},${pv[1]}`}
  return d+'Z'}
function cloudQ(pts,bump){let d='';for(let i=1;i<pts.length;i++){const a=pts[i-1],b=pts[i],dx=b[0]-a[0],dy=b[1]-a[1],l=Math.hypot(dx,dy)||1;
  const cx=(a[0]+b[0])/2+dy/l*bump,cy=(a[1]+b[1])/2-dx/l*bump;d+=`Q${r1(cx)},${r1(cy)} ${r1(b[0])},${r1(b[1])}`}return d}
function ellPts(cx,cy,rx,ry,a0,a1,n){const o=[];for(let i=0;i<=n;i++){const a=(a0+(a1-a0)*i/n)*Math.PI/180;o.push([cx+rx*Math.cos(a),cy+ry*Math.sin(a)])}return o}
function cloudEll(cx,cy,rx,ry,n,bump){const p=ellPts(cx,cy,rx,ry,0,360,n);return `M${r1(p[0][0])},${r1(p[0][1])}`+cloudQ(p,bump)+'Z'}
function profile(cx,pts){const R=pts.map(p=>[cx+p[1],p[0]]),L=pts.map(p=>[cx-p[1],p[0]]).reverse();
  const sm=(a)=>{let d='';for(let i=1;i<a.length-1;i++){const mx=(a[i][0]+a[i+1][0])/2,my=(a[i][1]+a[i+1][1])/2;d+=`Q${a[i][0]},${a[i][1]} ${r1(mx)},${r1(my)}`}d+=`L${a[a.length-1][0]},${a[a.length-1][1]}`;return d};
  return `M${R[0][0]},${R[0][1]}`+sm(R)+`L${L[0][0]},${L[0][1]}`+sm(L)+'Z'}
const st=(w,c)=>`stroke="${c||OL}" stroke-width="${w||SW}" stroke-linejoin="round" stroke-linecap="round"`;
const lgr=(id,m,stops,x1,y1,x2,y2)=>{const a=m<0?1-x1:x1,b=m<0?1-x2:x2;
  return `<linearGradient id="${id}" x1="${a}" y1="${y1}" x2="${b}" y2="${y2}">${stops.map(s=>`<stop offset="${s[0]}" stop-color="${s[1]}"/>`).join('')}</linearGradient>`};
const goldG=(id,m)=>lgr(id,m,[[0,'#fbe08a'],[.4,GOLD],[1,'#c4952b']],0,0,1,1);
const redG=(id,m)=>lgr(id,m,[[0,RED_H],[.38,RED],[1,'#a8272a']],0,0,1,.3);
const furG=(id)=>`<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".55" stop-color="${FUR}"/><stop offset="1" stop-color="${FUR_S}"/></linearGradient>`;
const shadowG=`<radialGradient id="sh" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#3a1c0c" stop-opacity=".42"/><stop offset=".65" stop-color="#3a1c0c" stop-opacity=".2"/><stop offset="1" stop-color="#3a1c0c" stop-opacity="0"/></radialGradient>`;

/* ===================================================================================
   FAUTEUIL : arrière (dossier, assise) + avant (accoudoirs, pieds), g/d
   =================================================================================== */
function chairBack(){
  const defs=goldG('gw',1)+shadowG+`<radialGradient id="gv" cx=".35" cy=".25" r=".95"><stop offset="0" stop-color="#46906a"/><stop offset=".5" stop-color="#2d7049"/><stop offset="1" stop-color="#1a4a32"/></radialGradient>
  <linearGradient id="gv2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a8460"/><stop offset="1" stop-color="#1d5638"/></linearGradient>`;
  const outer=sym([380,70],[['C',410,70,440,80,470,92],['C',505,106,525,119,556,125],['C',590,132,616,154,624,190],['C',630,222,626,256,628,300],['L',634,808]]);
  const inner=sym([380,128],[['C',404,128,428,138,452,149],['C',486,164,515,170,546,177],['C',574,185,588,214,590,258],['L',594,806]]);
  const sc=(k)=>`transform="translate(380 450) scale(${k}) translate(-380 -450)"`;
  let s=`<ellipse cx="380" cy="962" rx="350" ry="40" fill="url(#sh)"/>`;
  s+=`<path d="${outer}" fill="url(#gw)" ${st(6)}/>`;
  s+=`<path d="${outer}" fill="none" stroke="${GOLD_H}" stroke-width="3" stroke-opacity=".7" ${sc(.968)}/>`;
  s+=`<path d="${inner}" fill="url(#gv)" ${st(5)}/>`;
  const rows=[[238,[236,380,524]],[336,[308,452]],[434,[236,380,524]],[532,[308,452]],[630,[236,380,524]],[728,[308,452]]];
  const pos=[];rows.forEach(r=>r[1].forEach(x=>pos.push([x,r[0]])));
  let tuft='',btn='',pillow='';
  for(const p of pos)for(const q of pos)if(q[1]-p[1]===98&&Math.abs(q[0]-p[0])===72)tuft+=`M${p[0]},${p[1]}L${q[0]},${q[1]}`;
  for(const p of pos){pillow+=`<ellipse cx="${p[0]}" cy="${p[1]+49}" rx="46" ry="34" fill="#fff" opacity=".07"/>`;
    btn+=`<circle cx="${p[0]}" cy="${p[1]}" r="8" fill="${GOLD}" ${st(2.5)}/><circle cx="${p[0]-2.5}" cy="${p[1]-2.5}" r="2.6" fill="${GOLD_H}"/>`}
  const cp=`<clipPath id="cv"><path d="${inner}"/></clipPath>`;
  s+=`<g clip-path="url(#cv)"><path d="${tuft}" stroke="#143826" stroke-opacity=".5" stroke-width="3.5" fill="none" stroke-linecap="round"/>${pillow}
   <path d="${inner}" fill="none" stroke="#143826" stroke-opacity=".35" stroke-width="26"/></g>`+btn;
  s+=`<path d="${inner}" fill="none" stroke="${OL}" stroke-width="12" stroke-linecap="round" stroke-dasharray="0 23" ${sc(.985)}/>
      <path d="${inner}" fill="none" stroke="${GOLD}" stroke-width="7.5" stroke-linecap="round" stroke-dasharray="0 23" ${sc(.985)}/>`;
  s+=`<path d="${inner}" fill="none" ${st(5)}/>`;
  const volute=(x,y,sg)=>`<g transform="translate(${x} ${y}) scale(${sg} 1)"><circle r="27" fill="url(#gw)" ${st(5)}/><circle r="17" fill="none" ${st(3)}/><path d="M0,-17 A17,17 0 1 1 -17,0 A11,11 0 0 1 -6,-11 A6,6 0 0 1 0,-5" fill="none" ${st(3)}/><circle r="5.5" fill="${GOLD_S}" ${st(2.5)}/><circle cx="-9" cy="-10" r="3.2" fill="${GOLD_H}"/></g>`;
  s+=volute(590,162,1)+volute(170,162,-1);
  s+=`<path d="M606,236 C612,300 612,380 616,780 M154,236 C148,300 148,380 144,780" fill="none" stroke="${GOLD_S}" stroke-width="4" stroke-linecap="round" opacity=".8"/>`;
  s+=`<g transform="translate(0 -22)"><path d="M380,106 C346,98 326,112 318,132 C340,126 354,128 380,142 C406,128 420,126 442,132 C434,112 414,98 380,106Z" fill="url(#gw)" ${st(4.5)}/>
      <circle cx="380" cy="124" r="19" fill="${GOLD}" ${st(4.5)}/><circle cx="380" cy="124" r="10" fill="${GOLD_S}" ${st(3)}/><circle cx="375" cy="119" r="3.4" fill="${GOLD_H}"/></g>`;
  const pad=(x0,x1)=>`<path d="M${x0},672 Q${x0-4},636 ${x0+30},630 L${x1-30},630 Q${x1+4},636 ${x1},672 Z" fill="url(#gv2)" ${st(5)}/><path d="M${x0+10},641 Q${(x0+x1)/2},630 ${x1-10},641" fill="none" stroke="#7fc79b" stroke-opacity=".6" stroke-width="4" stroke-linecap="round"/><path d="M${x0+3},668 L${x1-3},668" stroke="${GOLD}" stroke-width="5" stroke-linecap="round"/>`;
  s+=pad(62,186)+pad(574,698);
  s+=`<path d="M164,800 Q380,772 596,800 L614,858 Q380,886 146,858Z" fill="url(#gv2)" ${st(5)}/>
      <path d="M190,806 Q380,784 570,806" fill="none" stroke="#7fc79b" stroke-opacity=".5" stroke-width="5" stroke-linecap="round"/>
      <path d="M146,858 Q380,886 614,858 L610,900 Q380,930 150,900Z" fill="#1f5538" ${st(5)}/>
      <path d="M146,858 Q380,886 614,858" fill="none" stroke="${GOLD}" stroke-width="7" stroke-linecap="round"/><path d="M146,858 Q380,886 614,858" fill="none" ${st(2.5)}/>`;
  const tassel=(x)=>`<path d="M${x},888 L${x},914" stroke="${GOLD_S}" stroke-width="4"/><path d="M${x-8},914 Q${x},906 ${x+8},914 L${x+10},944 Q${x},952 ${x-10},944Z" fill="${GOLD}" ${st(3)}/><path d="M${x-5},926 L${x-5},940 M${x},924 L${x},942 M${x+5},926 L${x+5},940" stroke="${GOLD_S}" stroke-width="2"/><circle cx="${x}" cy="905" r="6" fill="${GOLD}" ${st(3)}/>`;
  s+=tassel(160)+tassel(600);
  s+=`<path d="M156,900 Q380,932 604,900 L598,944 C562,956 524,948 494,960 C456,972 424,960 380,980 C336,960 304,972 266,960 C236,948 198,956 162,944Z" fill="url(#gw)" ${st(5.5)}/>
      <circle cx="380" cy="946" r="17" fill="${GOLD}" ${st(4)}/><circle cx="380" cy="946" r="8" fill="${GOLD_S}" ${st(3)}/><circle cx="375" cy="941" r="3" fill="${GOLD_H}"/>
      <path d="M200,926 Q260,940 330,936 M560,926 Q500,940 430,936" fill="none" stroke="${GOLD_S}" stroke-width="4" stroke-linecap="round"/>`;
  return piece('c-santa-fauteuil',30,50,730,1000,s,defs+cp);
}
function chairFront(m){
  const defs=goldG('gw',m)+shadowG;const px=118;
  let s=`<ellipse cx="${px+8}" cy="982" rx="62" ry="12" fill="url(#sh)"/>`;
  const prof=profile(px,[[700,22],[722,17],[740,17],[756,26],[790,34],[826,26],[864,17],[880,17],[890,26],[910,18],[944,22],[968,34],[984,44]]);
  s+=`<path d="${prof}" fill="url(#gw)" ${st(5.5)}/>`;
  s+=`<path d="M${px-16},770 C${px-22},800 ${px-18},830 ${px-10},850" fill="none" stroke="${GOLD_H}" stroke-width="5" stroke-linecap="round" opacity=".75"/>`;
  s+=`<path d="M${px-20},736 Q${px},746 ${px+20},736 M${px-14},884 Q${px},892 ${px+14},884" fill="none" ${st(3)}/>`;
  s+=`<path d="M${px-46},976 Q${px-52},990 ${px-30},990 L${px+40},990 Q${px+54},988 ${px+50},974 Q${px+30},966 ${px},968 Q${px-30},966 ${px-46},976Z" fill="url(#gw)" ${st(5.5)}/>`;
  s+=`<path d="M60,666 L170,666 Q178,666 178,676 L178,698 Q178,708 170,708 L60,708 Q52,708 52,698 L52,676 Q52,666 60,666Z" fill="url(#gw)" ${st(5.5)}/>`;
  s+=`<path d="M92,676 L166,676" stroke="${GOLD_H}" stroke-width="4" stroke-linecap="round" opacity=".8"/><path d="M96,698 L166,698" stroke="${GOLD_S}" stroke-width="4" stroke-linecap="round"/>`;
  s+=`<circle cx="82" cy="688" r="34" fill="url(#gw)" ${st(5.5)}/><circle cx="82" cy="688" r="21" fill="none" ${st(3.5)}/><circle cx="82" cy="688" r="9" fill="${GOLD_S}" ${st(3)}/><circle cx="68" cy="674" r="4" fill="${GOLD_H}"/>`;
  return {inner:s,defs};
}

/* ===================================================================================
   TRONC
   =================================================================================== */
function gilet(){
  const body=sym([380,452],[['C',345,452,308,458,276,470],['C',228,488,196,522,184,572],['C',160,640,152,722,188,776],['C',226,830,306,848,380,848]]);
  const defs=`<radialGradient id="rb" cx=".36" cy=".3" r=".85"><stop offset="0" stop-color="#ee5a4f"/><stop offset=".45" stop-color="#d93a33"/><stop offset="1" stop-color="#a8272a"/></radialGradient>
  <linearGradient id="rs" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7a1a18" stop-opacity="0"/><stop offset=".62" stop-color="#7a1a18" stop-opacity="0"/><stop offset="1" stop-color="#7a1a18" stop-opacity=".42"/></linearGradient>
  <linearGradient id="bl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a4740"/><stop offset=".3" stop-color="#2b211d"/><stop offset="1" stop-color="#17110f"/></linearGradient>
  ${goldG('gw',1)}${furG('fg')}<clipPath id="cb"><path d="${body}"/></clipPath>`;
  let s=`<path d="${body}" fill="url(#rb)"/><g clip-path="url(#cb)"><rect x="120" y="440" width="520" height="440" fill="url(#rs)"/>
     <ellipse cx="300" cy="560" rx="70" ry="95" fill="#fff" opacity=".12" transform="rotate(14 300 560)"/>
     <path d="M200,740 Q245,800 310,812 M560,740 Q515,800 450,812" fill="none" stroke="${RED_S}" stroke-width="4" stroke-linecap="round" opacity=".55"/>`;
  const lp=[],rp=[];for(let y=470;y<=836;y+=26){const w=25+(y-470)*.014;lp.push([380-w,y]);rp.push([380+w,y])}
  const fd=`M${lp[0][0]},${lp[0][1]}`+cloudQ(lp,-9)+`L${rp[rp.length-1][0]},${rp[rp.length-1][1]}`+cloudQ(rp.slice().reverse(),-9)+'Z';
  s+=`<path d="${fd}" fill="url(#fg)" ${st(4.5)}/>`;
  s+=`<path d="M140,636 Q380,712 620,636 L624,702 Q380,780 136,702Z" fill="url(#bl)" ${st(5)}/>
      <path d="M170,644 Q380,718 590,644" fill="none" stroke="#7d6a62" stroke-width="3.5" stroke-linecap="round" opacity=".7"/>
      <path d="M166,690 Q380,764 594,690" fill="none" stroke="#6d5a50" stroke-width="2.6" stroke-dasharray="9 8" stroke-linecap="round" opacity=".75"/></g>`;
  const oe=ellPts(380,728,226,120,8,172,14),ie=ellPts(380,728,226*.9,120*.78,172,8,14);
  const hem=`M${r1(oe[0][0])},${r1(oe[0][1])}`+cloudQ(oe,12)+`L${r1(ie[0][0])},${r1(ie[0][1])}`+ie.slice(1).map(p=>`L${r1(p[0])},${r1(p[1])}`).join('')+'Z';
  s+=`<path d="${hem}" fill="url(#fg)" ${st(5)}/>`;
  s+=`<path d="${body}" fill="none" ${st(SW)}/>`;
  s+=`<rect x="328" y="674" width="104" height="88" rx="19" fill="url(#gw)" ${st(5)}/><rect x="351" y="695" width="58" height="46" rx="9" fill="${BLK}" ${st(4)}/>
      <rect x="351" y="713" width="46" height="9" rx="4" fill="${GOLD}" ${st(2.5)}/><path d="M338,686 Q340,680 358,680" fill="none" stroke="${GOLD_H}" stroke-width="5" stroke-linecap="round"/><path d="M340,750 L420,750" stroke="${GOLD_S}" stroke-width="4" stroke-linecap="round" opacity=".7"/>`;
  return piece('c-santa-gilet',120,430,640,880,s,defs);
}
function collar(){
  return piece('c-santa-col',240,420,520,530,`<path d="${cloudEll(380,472,122,36,18,9)}" fill="url(#fg)" ${st(4.5)}/><path d="M280,490 Q380,524 480,490" fill="none" stroke="${FUR_S}" stroke-width="6" stroke-linecap="round"/>`,furG('fg'));
}

/* ===================================================================================
   BRAS
   =================================================================================== */
function upperArm(m){
  const [x,y]=SHL;const defs=redG('ar',m)+`<radialGradient id="cap" cx=".35" cy=".3" r=".7"><stop offset="0" stop-color="#fff" stop-opacity=".28"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>`;
  const d=`M${x-58},${y} C${x-72},${y+50} ${x-62},${y+104} ${x-46},${y+L1} A46,46 0 0 0 ${x+46},${y+L1} C${x+62},${y+104} ${x+72},${y+50} ${x+58},${y} A58,58 0 0 0 ${x-58},${y}Z`;
  let s=`<path d="${d}" fill="url(#ar)" ${st(SW)}/><clipPath id="ca"><path d="${d}"/></clipPath><g clip-path="url(#ca)"><rect x="${x+10}" y="${y-60}" width="70" height="${L1+130}" fill="${RED_S}" opacity=".3"/>
      <circle cx="${x-14}" cy="${y-16}" r="36" fill="url(#cap)"/>
      <path d="M${x-40},${y+L1-24} Q${x-4},${y+L1-10} ${x+40},${y+L1-28} M${x-48},${y+70} Q${x-20},${y+84} ${x+4},${y+66} M${x+14},${y+40} Q${x+36},${y+56} ${x+48},${y+38}" fill="none" stroke="${RED_S}" stroke-width="4" stroke-linecap="round" opacity=".6"/></g>
      <path d="M${x-30},${y+34} Q${x-4},${y+56} ${x+26},${y+34}" fill="none" stroke="${RED_S}" stroke-width="4" stroke-linecap="round" opacity=".4"/>`;
  return {inner:s,defs};
}
function foreArm(m){
  const x=SHL[0],y=SHL[1]+L1;const defs=redG('ar',m)+furG('fg')+`<radialGradient id="gl" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#6a564e"/><stop offset=".5" stop-color="#3a2d28"/><stop offset="1" stop-color="#1b1411"/></radialGradient>`;
  const sl=`M${x-46},${y} A46,46 0 0 1 ${x+46},${y} C${x+56},${y+40} ${x+54},${y+80} ${x+48},${y+98} L${x-48},${y+98} C${x-54},${y+80} ${x-56},${y+40} ${x-46},${y}Z`;
  const hy=y+L2;
  let s=`<path d="${sl}" fill="url(#ar)" ${st(SW)}/><clipPath id="cf"><path d="${sl}"/></clipPath>
    <g clip-path="url(#cf)"><rect x="${x+8}" y="${y-60}" width="70" height="170" fill="${RED_S}" opacity=".3"/><ellipse cx="${x-18}" cy="${y+8}" rx="20" ry="14" fill="#fff" opacity=".16"/></g>`;
  s+=`<rect x="${x-14}" y="${y+100}" width="28" height="${L2-100}" fill="${BLK}" ${st(4)}/>`;
  s+=`<ellipse cx="${x+19}" cy="${hy-4}" rx="9.5" ry="13" transform="rotate(-24 ${x+19} ${hy-4})" fill="url(#gl)" ${st(4.5)}/>`;
  s+=`<ellipse cx="${x}" cy="${hy+2}" rx="25" ry="24" fill="url(#gl)" ${st(4.5)}/><ellipse cx="${x-8}" cy="${hy-6}" rx="9" ry="5" transform="rotate(-25 ${x-8} ${hy-6})" fill="#fff" opacity=".3"/>`;
  s+=`<path d="${cloudEll(x,y+101,47,18,12,6)}" fill="url(#fg)" ${st(4.5)}/><path d="M${x-30},${y+106} Q${x},${y+116} ${x+30},${y+106}" fill="none" stroke="${FUR_S}" stroke-width="4.5" stroke-linecap="round"/>`;
  return {inner:s,defs};
}

/* ===================================================================================
   JAMBES
   =================================================================================== */
const TRG=`<linearGradient id="tr" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e04740"/><stop offset=".5" stop-color="#c22f2b"/><stop offset="1" stop-color="#8f1f1e"/></linearGradient>`;
function thighs(){
  const th=(cx)=>`M${cx-82},760 Q${cx-92},810 ${cx-66},846 Q${cx},876 ${cx+66},846 Q${cx+92},810 ${cx+82},760Z`;
  const s=`<path d="${th(270)}" fill="url(#tr)" ${st(SW)}/><path d="${th(490)}" fill="url(#tr)" ${st(SW)}/>
   <path d="M222,800 Q262,822 318,800 M442,800 Q482,822 538,800" fill="none" stroke="${RED_S}" stroke-width="4.5" stroke-linecap="round" opacity=".6"/>
   <path d="M214,790 Q206,826 222,852" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".18"/>`;
  return piece('c-santa-short',170,740,590,890,s,TRG);
}
function shin(m){
  const kx=270,ky=846;const defs=TRG+shadowG+furG('fg')+`<linearGradient id="bt" x1="0" y1="0" x2="1" y2=".3"><stop offset="0" stop-color="#5a4740"/><stop offset=".35" stop-color="#2b211d"/><stop offset="1" stop-color="#120d0b"/></linearGradient>`;
  let s=`<ellipse cx="${kx+6}" cy="986" rx="96" ry="14" fill="url(#sh)"/>`;
  s+=`<path d="M${kx-56},${ky-4} Q${kx-58},${ky+30} ${kx-50},${ky+62} L${kx+50},${ky+62} Q${kx+58},${ky+30} ${kx+56},${ky-4} Q${kx},${ky+14} ${kx-56},${ky-4}Z" fill="url(#tr)" ${st(SW)}/>`;
  s+=`<path d="M${kx-48},896 Q${kx-52},930 ${kx-60},954 Q${kx-76},982 ${kx-50},990 L${kx+54},990 Q${kx+78},986 ${kx+68},956 Q${kx+54},934 ${kx+48},896Z" fill="url(#bt)" ${st(SW)}/>`;
  s+=`<path d="M${kx-52},976 Q${kx},994 ${kx+60},976" fill="none" stroke="#120d0b" stroke-width="6" stroke-linecap="round"/>`;
  s+=`<path d="M${kx-34},920 Q${kx-42},946 ${kx-48},964" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".25"/>`;
  s+=`<path d="${cloudEll(kx,904,56,17,13,7)}" fill="url(#fg)" ${st(4.5)}/>`;
  return {inner:s,defs};
}

/* ===================================================================================
   TÊTE
   =================================================================================== */
const brow=(x,y,sg)=>{const d=`M${x-27},${y+7} Q${x},${y-13} ${x+27},${y+7}`;return `<g transform="rotate(${-5*sg} ${x} ${y})"><path d="${d}" fill="none" stroke="${OL}" stroke-width="16" stroke-linecap="round"/><path d="${d}" fill="none" stroke="${FUR}" stroke-width="9.5" stroke-linecap="round"/></g>`};
function head(){
  const defs=`<radialGradient id="sk" cx=".4" cy=".3" r=".85"><stop offset="0" stop-color="#fbd6b4"/><stop offset=".6" stop-color="#f8cfa8"/><stop offset="1" stop-color="#e2a67e"/></radialGradient>
   <radialGradient id="nz" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#fbb0a0"/><stop offset=".6" stop-color="#f09284"/><stop offset="1" stop-color="#d9786c"/></radialGradient>
   <radialGradient id="ck" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="${CHK}" stop-opacity=".8"/><stop offset=".6" stop-color="${CHK}" stop-opacity=".4"/><stop offset="1" stop-color="${CHK}" stop-opacity="0"/></radialGradient>${furG('fg')}`;
  let s=`<ellipse cx="268" cy="318" rx="22" ry="30" fill="${SKIN_S}" ${st(4)}/><ellipse cx="492" cy="318" rx="22" ry="30" fill="${SKIN_S}" ${st(4)}/>
  <ellipse cx="380" cy="305" rx="115" ry="108" fill="url(#sk)" ${st(SW)}/>
    <ellipse cx="300" cy="340" rx="44" ry="38" fill="url(#ck)"/><ellipse cx="460" cy="340" rx="44" ry="38" fill="url(#ck)"/>
  ${brow(334,251,1)}${brow(426,251,-1)}`;
  const eye=(x)=>`<ellipse cx="${x}" cy="304" rx="15.5" ry="18.5" fill="#3a2418"/><circle cx="${x-4.5}" cy="297" r="6.5" fill="#fff"/><circle cx="${x+4.5}" cy="305" r="2.8" fill="#fff" opacity=".85"/>`;
  s+=eye(334)+eye(426);
  s+=`<circle cx="380" cy="335" r="26" fill="url(#nz)" stroke="#b85a4c" stroke-width="3"/><ellipse cx="371" cy="326" rx="8" ry="5.5" fill="#fff" opacity=".5" transform="rotate(-25 371 326)"/>`;
  return piece('c-santa-tete',230,200,530,460,`<g transform="translate(0 ${HY})">${s}</g>`,defs);
}
function eyesOverlay(kind,sx){
  const x=sx==='g'?334:426,hy=304;
  const defs=`<radialGradient id="pt" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#f9d1ab"/><stop offset=".72" stop-color="#f9d1ab"/><stop offset="1" stop-color="#f9d1ab" stop-opacity="0"/></radialGradient>`;
  let s=`<circle cx="${x}" cy="${hy}" r="29" fill="url(#pt)"/>`;
  if(kind==='f')s+=`<path d="M${x-15},${hy+4} Q${x},${hy-14} ${x+15},${hy+4}" fill="none" stroke="#3a2418" stroke-width="5" stroke-linecap="round"/>`;
  if(kind==='m')s+=`<path d="M${x-14},${hy-2} L${x+14},${hy-2} L${x+13.5},${hy+5} A13.5,13.5 0 0 1 ${x-13.5},${hy+5}Z" fill="#3a2418"/><circle cx="${x-3.5}" cy="${hy+3}" r="2.6" fill="#fff"/><path d="M${x-15},${hy-2} Q${x},${hy-6} ${x+15},${hy-2}" fill="none" stroke="#3a2418" stroke-width="4" stroke-linecap="round"/>`;
  if(kind==='g')s+=`<ellipse cx="${x}" cy="${hy}" rx="16" ry="21" fill="#3a2418"/><circle cx="${x-5}" cy="${hy-7}" r="6.4" fill="#fff"/><circle cx="${x+4}" cy="${hy+7}" r="2.6" fill="#fff" opacity=".85"/>`;
  return piece(`c-santa-yeux-${kind}-${sx}`,x-30,hy+HY-30,x+30,hy+HY+30,`<g transform="translate(0 ${HY})">${s}</g>`,defs);
}
function beard(open){
  const Pr=[[496,326],[510,356],[512,396],[498,434],[468,466],[430,486],[380,494]]//;
  const Pl=Pr.map(p=>[760-p[0],p[1]]).reverse();
  const full=`M${Pr[0][0]},${Pr[0][1]}`+cloudQ(Pr,10)+cloudQ(Pl,10)+`C262,354 300,366 340,366 Q380,372 420,366 C460,366 498,354 ${Pr[0][0]},${Pr[0][1]}Z`;
  const defs=furG('fg')+`<linearGradient id="bs" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${FUR_S}" stop-opacity="0"/><stop offset=".6" stop-color="${FUR_S}" stop-opacity="0"/><stop offset="1" stop-color="${FUR_S}" stop-opacity=".95"/></linearGradient><clipPath id="bc"><path d="${full}"/></clipPath>`;
  let s=`<path d="${full}" fill="url(#fg)" ${st(SW)}/>
   <g clip-path="url(#bc)"><rect x="380" y="290" width="150" height="260" fill="url(#bs)"/></g>
   <path d="M296,396 C290,424 304,452 338,472 M464,396 C470,424 456,452 422,472 M356,440 C354,460 364,474 380,480 M404,440 C406,460 396,474 382,480" fill="none" stroke="${FUR_S}" stroke-width="5" stroke-linecap="round"/>`;
  if(!open)s+=`<path d="M332,388 Q380,444 428,388 Q420,400 380,410 Q340,400 332,388Z" fill="#c9473f" ${st(3.5)}/>`;
  else{const mo='M346,388 Q380,380 414,388 Q422,438 380,448 Q338,438 346,388Z';
    s+=`<path d="${mo}" fill="#5b1a16"/><clipPath id="mo"><path d="${mo}"/></clipPath><g clip-path="url(#mo)"><ellipse cx="380" cy="446" rx="28" ry="16" fill="#e8736b"/><path d="M340,384 Q380,376 420,384 L420,402 Q380,394 340,402Z" fill="${FUR}"/></g><path d="${mo}" fill="none" ${st(4)}/>`}
  const lobe='M379,358 C400,344 434,344 456,354 C472,361 482,372 480,364 C486,382 470,388 456,380 C444,376 434,378 424,383 C408,390 392,390 379,386Z';
  const lm=`<g>${'<path d="'+lobe+'"/>'}</g>`;
  s+=`<g fill="url(#fg)" ${st(10)}><path d="${lobe}"/><path d="${lobe}" transform="translate(760 0) scale(-1 1)"/></g>
      <g fill="url(#fg)" stroke="none"><path d="${lobe}"/><path d="${lobe}" transform="translate(760 0) scale(-1 1)"/></g>
      <g fill="none" stroke="${FUR_S}" stroke-width="4" stroke-linecap="round"><path d="M398,370 C416,362 436,364 452,372"/><path d="M362,370 C344,362 324,364 308,372"/></g>`;
  return piece(open?'c-santa-barbe-o':'c-santa-barbe',230,320,530,590,`<g transform="translate(0 ${HY})">${s}</g>`,defs);
}
function glasses(){
  const defs=goldG('gw',1)+`<linearGradient id="lens" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#dff1ff" stop-opacity=".42"/><stop offset="1" stop-color="#dff1ff" stop-opacity=".12"/></linearGradient>`;
  const lens=(x)=>`<circle cx="${x}" cy="304" r="34" fill="url(#lens)"/><circle cx="${x}" cy="304" r="34" fill="none" stroke="${OL}" stroke-width="11"/><circle cx="${x}" cy="304" r="34" fill="none" stroke="url(#gw)" stroke-width="6"/><path d="M${x-24},287 A28,28 0 0 1 ${x-6},277" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".85"/>`;
  const arm=(d)=>`<path d="${d}" stroke="${OL}" stroke-width="9" stroke-linecap="round" fill="none"/><path d="${d}" stroke="${GOLD}" stroke-width="4.5" stroke-linecap="round" fill="none"/>`;
  const s=arm('M300,298 L268,306 M460,298 L492,306')+arm('M368,300 Q380,290 392,300')+lens(334)+lens(426);
  return piece('c-santa-lunettes',250,285,510,385,`<g transform="translate(0 ${HY})">${s}</g>`,defs);
}
function hat(){
  const defs=furG('fg')+`<linearGradient id="hr" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ee5a4f"/><stop offset=".45" stop-color="#d2342f"/><stop offset="1" stop-color="#9f2420"/></linearGradient>`;
  const dome=`M262,206 C254,166 286,134 340,124 C400,112 466,126 504,158 C542,190 562,240 560,296 L530,300 C528,256 514,228 498,206Z`;
  let s=`<path d="${dome}" fill="url(#hr)" ${st(SW)}/>
   <path d="M302,166 C330,142 378,134 424,142" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round" opacity=".22"/><path d="M466,166 C494,184 510,204 514,230" fill="none" stroke="${RED_S}" stroke-width="5" stroke-linecap="round" opacity=".5"/>`;
  const yc=(x)=>204+20*(1-Math.pow((x-380)/122,2));
  const top=[],bot=[];for(let x=262;x<=498;x+=24)top.push([x,yc(x)-21]);for(let x=498;x>=262;x-=24)bot.push([x,yc(x)+21]);
  const band=`M${top[0][0]},${r1(top[0][1])}`+cloudQ(top,6)+`Q510,${r1(yc(498))} ${bot[0][0]},${r1(bot[0][1])}`+cloudQ(bot,6)+`Q250,${r1(yc(262))} ${top[0][0]},${r1(top[0][1])}Z`;
  s+=`<path d="${band}" fill="url(#fg)" ${st(SW)}/><path d="M290,${r1(yc(290)+10)} Q380,${r1(yc(380)+16)} 470,${r1(yc(470)+10)}" fill="none" stroke="${FUR_S}" stroke-width="5" stroke-linecap="round"/>`;
  s+=`<path d="${cloudEll(550,322,34,32,10,8)}" fill="url(#fg)" ${st(SW)}/><path d="M530,334 Q550,350 572,334" fill="none" stroke="${FUR_S}" stroke-width="5" stroke-linecap="round"/>`;
  return piece('c-santa-bonnet',236,120,600,400,`<g transform="translate(0 ${HY})">${s}</g>`,defs);
}

/* ===== construction des pièces (au chargement : le harnais fabrique IMG avant d'appeler defSantaC) ===== */
const pBack=chairBack(),pTh=thighs(),pGil=gilet(),pCol=collar(),pHead=head(),pHat=hat(),pGl=glasses(),pB=beard(false),pBo=beard(true);
const mk=(nm,fn,box)=>({g:sidePiece(nm+'-g',box,fn,1),d:sidePiece(nm+'-d',box,fn,-1)});
const pChA=mk('c-santa-fauteuil-av',chairFront,[40,620,260,1000]);
const pUp=mk('c-santa-bras',upperArm,[156,430,316,700]);
const pFo=mk('c-santa-avbras',foreArm,[176,620,316,870]);
const pSh=mk('c-santa-jambe',shin,[170,830,380,1000]);
const pEy={};for(const k of ['f','m','g'])for(const s of ['g','d'])pEy[k+s]=eyesOverlay(k,s);

/* ===================================================================================
   ASSEMBLAGE
   =================================================================================== */
function ik2(S,H,l1,l2,bend){const dx=H[0]-S[0],dy=H[1]-S[1];let d=Math.hypot(dx,dy);d=Math.min(d,l1+l2-1e-3);d=Math.max(d,Math.abs(l1-l2)+1e-3);
  const a=Math.acos(Math.max(-1,Math.min(1,(l1*l1+d*d-l2*l2)/(2*l1*d))));const base=Math.atan2(dy,dx);const ang=base+bend*a;return [S[0]+l1*Math.cos(ang),S[1]+l1*Math.sin(ang)]}
const angDown=(A,B)=>Math.atan2(-(B[0]-A[0]),B[1]-A[1])*180/Math.PI;

window.defSantaC=function(R,IMG){
  const rel=(p,q)=>[p[0]-q[0],p[1]-q[1]];
  const put=(name,pc,pivot,pos,parent,o)=>R.add({name,img:pc.name,parent,x:pos[0],y:pos[1],px:(pivot[0]-pc.x0)/pc.w,py:(pivot[1]-pc.y0)/pc.h,...(o||{})});
  R.add({name:'base',x:BASE[0],y:BASE[1]});
  put('fauteuil',pBack,[380,992],rel([380,992],BASE),'base',{z:0});
  put('short',pTh,[380,740],rel([380,740],BASE),'base',{z:1});
  for(const s of ['g','d']){const pv=s==='g'?[270,846]:[490,846];put('jambe-'+s,pSh[s],pv,rel(pv,BASE),'base',{z:2,r:s==='g'?2:-2})}
  R.add({name:'corps',parent:'base',x:C[0]-BASE[0],y:C[1]-BASE[1],z:3});
  put('gilet',pGil,[380,848],rel([380,848],C),'corps',{z:1});
  const shG=rel(SHL,C),shD=rel([MIR(SHL[0]),SHL[1]],C);
  R.SH={g:{x:shG[0],y:shG[1]},d:{x:shD[0],y:shD[1]}};
  R.KNEE={g:{x:-100,y:92},d:{x:100,y:92}};
  R.ARM={L1,L2,S:1};
  for(const s of ['g','d']){const sp=s==='g'?SHL:[MIR(SHL[0]),SHL[1]];const ep=[s==='g'?SHL[0]:MIR(SHL[0]),SHL[1]+L1];
    put('bras-'+s,pUp[s],sp,rel(sp,C),'corps',{z:2});
    put('avbras-'+s,pFo[s],ep,rel(ep,C),'corps',{z:3})}
  put('col',pCol,[380,470],rel([380,470],C),'corps',{z:4});
  const nk=rel(N,C);
  R.add({name:'tete',img:pHead.name,parent:'corps',x:nk[0],y:nk[1],px:(380-pHead.x0)/pHead.w,py:(430+HY-pHead.y0)/pHead.h,sx:1.03,sy:1.03,z:6});
  const hd=(nm,pc,pv,z)=>R.add({name:nm,img:pc.name,parent:'tete',x:pv[0]-380,y:pv[1]-430,px:(pv[0]-pc.x0)/pc.w,py:(pv[1]+HY-pc.y0)/pc.h,z});
  for(const s of ['g','d']){const ex=s==='g'?334:426;
    hd('yf-'+s,pEy['f'+s],[ex,304],1);hd('ym-'+s,pEy['m'+s],[ex,304],1);hd('yg-'+s,pEy['g'+s],[ex,304],1)}
  hd('barbe',pB,[380,330],3);hd('barbe-o',pBo,[380,330],3);
  hd('lunettes',pGl,[380,304],4);
  hd('bonnet',pHat,[380,230],5);
  ['barbe-o','yf-g','yf-d','ym-g','ym-d','yg-g','yg-d'].forEach(n=>R.show(n,false));
  put('fauteuil-av-g',pChA.g,[130,990],rel([130,990],BASE),'base',{z:5});
  put('fauteuil-av-d',pChA.d,[MIR(130),990],rel([MIR(130),990],BASE),'base',{z:5});
  R.armTo=(s,H,bend)=>{const Sh=R.SH[s];const sg=s==='g'?1:-1;const E=ik2([Sh.x,Sh.y],H,L1,L2,bend??sg);
    R.set('bras-'+s,{r:angDown([Sh.x,Sh.y],E)});R.set('avbras-'+s,{x:E[0],y:E[1],r:angDown(E,H)})};
  R.armTo('g',[R.KNEE.g.x,R.KNEE.g.y]);R.armTo('d',[R.KNEE.d.x,R.KNEE.d.y]);
};
})();
