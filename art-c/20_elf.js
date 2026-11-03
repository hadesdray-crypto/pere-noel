/* Style C — lutins (SVG vectoriel). Même contrat que elfSVG. */
const TOOLSPEC_C={marteau:{h:34,g:[.2,.84],r:6},scie:{h:42,g:[.8,.16],r:-12},pinceau:{h:32,g:[.72,.28],r:-6},balai:{h:60,g:[.9,.12],r:-72},eponge:{h:13,g:[.5,.5],r:-10,front:1}};
function toolImgC(n,sp){const [w,hh]=IMG[n].size,s=sp.h/hh;return `<g transform="translate(49.7 67) rotate(${sp.r}) scale(${s.toFixed(4)})"><image href="${IMG[n].src}" x="${-sp.g[0]*w}" y="${-sp.g[1]*hh}" width="${w}" height="${hh}"/></g>`}
function elfSVGC(h,b,prop,tool){
const K='#4a2418',O=`style="stroke:${K};stroke-width:1.5;stroke-linejoin:round;stroke-linecap:round"`,N='style="stroke:none"';
const OF=(w)=>`style="stroke:${K};stroke-width:${w};stroke-linejoin:round;stroke-linecap:round"`;
const P={
 hammer:`<g transform="translate(49.5 66) rotate(-12)"><rect x="-1.9" y="-18" width="3.8" height="25" rx="1.8" fill="#b9814a" ${O}/><rect x="-8" y="-24" width="16" height="9.5" rx="2.4" fill="#8e97a8" ${O}/><rect x="-6.6" y="-22.7" width="5" height="2.6" rx="1.2" fill="#e6ebf5" ${N}/></g>`,
 brush:`<g transform="translate(49.5 66) rotate(-18)"><rect x="-1.5" y="-21" width="3" height="28" rx="1.5" fill="#b9814a" ${O}/><path d="M-3.4 -21 L3.4 -21 L3 -29 Q0 -35 -3 -29Z" fill="#ff5fa2" ${O}/></g>`,
 gift:`<g transform="translate(49 64)"><rect x="-10.5" y="-16" width="21" height="18" rx="2.4" fill="#e8454a" ${O}/><rect x="-10.5" y="-9.5" width="21" height="4" fill="#ffd84d" ${N}/><rect x="-2.2" y="-16" width="4.4" height="18" fill="#ffd84d" ${N}/><path d="M0 -16 Q-9 -27 -11.5 -18 Q-4 -13.5 0 -16 Q4 -13.5 11.5 -18 Q9 -27 0 -16Z" fill="#ffd84d" ${O}/></g>`,
 cane:`<g transform="translate(49.5 66) rotate(-10)"><path d="M0 8 V-18 Q0 -26.5 -6 -26.5 Q-10.5 -26.5 -10.5 -21" fill="none" stroke="${K}" stroke-width="6.4" stroke-linecap="round"/><path d="M0 8 V-18 Q0 -26.5 -6 -26.5 Q-10.5 -26.5 -10.5 -21" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round"/><path d="M0 8 V-18 Q0 -26.5 -6 -26.5 Q-10.5 -26.5 -10.5 -21" fill="none" stroke="#e8454a" stroke-width="4" stroke-dasharray="3 3.2"/></g>`
}[prop]||'';
const TL=(t,front)=>{let o='';const sp=TOOLSPEC_C.eponge;if(!front&&t!=='balai')o+=`<g class="cl">${toolImgC('objs-eponge',sp)}</g>`;if(t&&TOOLSPEC_C[t]&&!!TOOLSPEC_C[t].front===!!front)o+=`<g class="tl">${toolImgC('objs-'+t,TOOLSPEC_C[t])}</g>`;return o};
const FUR='#fffaf0',FUS='#e4d8c6';
/* tunique : silhouette + bas dentelé */
const TUN='M15.5 42 Q30 36.5 44.5 42 Q48.5 56 50.5 71 L46.5 77.5 L42.5 72.5 L38.5 77.5 L34.5 73 L30.5 78 L26.5 73 L22.5 77.5 L18.5 72.5 L14.5 77.5 L9.5 71 Q11.5 56 15.5 42Z';
const arm=(side)=>{ // épaule en haut au centre du groupe
 const L=side==='l',sx=L?13.4:46.6,hx=L?12.2:49.5; // pivot (sx,45.6)
 const sl=L?`M${sx-4.9} 45.6 H${sx+4.9} L${hx+4.6} 60 H${hx-4.6}Z`:`M${sx-4.9} 45.6 H${sx+4.9} L${hx+4.6} 60 H${hx-4.6}Z`;
 return `<g class="arm ${side}"><path d="${sl}" fill="${b}" ${O}/><path d="M${sx-4.9} 45.6 H${sx-1.8} L${hx-1.2} 60 H${hx-4.6}Z" fill="#fff" opacity=".22" ${N}/><path d="M${sx+1.5} 46 H${sx+4.9} L${hx+4.6} 60 H${hx+1.5}Z" fill="#000" opacity=".13" ${N}/>`+
 `@@TLB@@<circle cx="${hx}" cy="66.2" r="4.9" fill="url(#ceSk)" ${O}/><circle cx="${L?hx+3.6:hx-3.6}" cy="64.6" r="1.9" fill="#f6c7a0" ${N}/><ellipse cx="${hx-1.6}" cy="64.6" rx="1.8" ry="1.2" fill="#fff" opacity=".35" ${N}/>`+
 `<rect x="${hx-5.6}" y="58.6" width="11.2" height="4.6" rx="2.3" fill="${FUR}" ${O}/>@@P@@`+
 `<circle cx="${sx}" cy="45.6" r="5.0" fill="${b}" ${O}/><path d="M${sx-4} 43.4 Q${sx} 40.8 ${sx+3.6} 43" fill="none" stroke="#fff" stroke-width="1.3" opacity=".35" stroke-linecap="round"/></g>`};
let al=arm('l'),ar=arm('r');
/* main droite : outils derrière la moufle (back), accessoires devant ; fourrure du poignet ajoutée après la moufle, outil avant en dernier */
al=al.replace('@@TLB@@','').replace('@@P@@','');
ar=ar.replace('@@TLB@@',TL(tool,0)).replace('@@P@@',P+TL(tool,1));
const scallop=(cx,cy,n,r,rx)=>{let s='';for(let i=0;i<n;i++){const x=cx-rx+ (2*rx)*(i/(n-1));s+=`<circle cx="${x.toFixed(2)}" cy="${(cy+Math.sin(i/(n-1)*Math.PI)*0).toFixed(2)}" r="${r}"/>`}return s};
return `<svg class="elfsvg" viewBox="0 -12 60 108" aria-hidden="true">
<defs>
<radialGradient id="ceSk" cx=".38" cy=".32" r=".8"><stop offset="0" stop-color="#ffdcbc"/><stop offset=".6" stop-color="#f6c7a0"/><stop offset="1" stop-color="#e3a77f"/></radialGradient>
<radialGradient id="ceFu" cx=".4" cy=".3" r=".9"><stop offset="0" stop-color="#ffffff"/><stop offset=".7" stop-color="#fffaf0"/><stop offset="1" stop-color="#e9ddca"/></radialGradient>
<radialGradient id="ceEy" cx=".5" cy=".3" r=".8"><stop offset="0" stop-color="#7a4a2a"/><stop offset=".5" stop-color="#3a2216"/><stop offset="1" stop-color="#1f120b"/></radialGradient>
<linearGradient id="ceGo" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff0a8"/><stop offset=".5" stop-color="#f0c04a"/><stop offset="1" stop-color="#b98a22"/></linearGradient>
<pattern id="ceSt" width="9" height="6.4" patternUnits="userSpaceOnUse"><rect width="9" height="3.2" fill="#d2342f"/><rect y="3.2" width="9" height="3.2" fill="#fffaf0"/></pattern>
<clipPath id="ceTc"><path d="${TUN}"/></clipPath><clipPath id="ceTr"><rect x="0" y="68.2" width="60" height="12"/></clipPath>
<clipPath id="ceHd"><circle cx="30" cy="29.5" r="15.6"/></clipPath>
<clipPath id="ceLg"><rect x="0" y="0" width="60" height="96"/></clipPath>
</defs>
<ellipse cx="30" cy="95.2" rx="19" ry="3.3" fill="rgba(60,30,10,.32)"/>
<g class="legs">
<g class="l1"><rect x="20" y="64" width="8.6" height="23" rx="4" fill="url(#ceSt)" ${O}/><rect x="25.2" y="64" width="3.4" height="23" rx="1.7" fill="#000" opacity=".1" ${N}/>
<path d="M19 85.5 H29.4 V93 Q29.4 95.6 26.8 95.6 H17.4 Q12.6 95.6 11.6 92.4 Q11 90.2 12.6 89.4 Q14.2 88.9 14.6 90.8 Q15 92.4 17 92.4 H19Z" fill="#8b4a22" ${O}/><path d="M20.4 87.2 H28" stroke="#fffaf0" stroke-width="2.6" stroke-linecap="round" ${N}/><path d="M19.6 88.6 Q23 87.8 28.4 88.6" fill="none" stroke="#c98a55" stroke-width="1.2" stroke-linecap="round" ${N}/><circle cx="11.9" cy="89.6" r="1.6" fill="url(#ceGo)" ${OF(.8)}/></g>
<g class="l2"><rect x="31.4" y="64" width="8.6" height="23" rx="4" fill="url(#ceSt)" ${O}/><rect x="36.6" y="64" width="3.4" height="23" rx="1.7" fill="#000" opacity=".1" ${N}/>
<path d="M30.6 85.5 H41 V93 Q41 95.6 38.4 95.6 H30.6Z M30.6 85.5 V95.6 H42.6 Q47.4 95.6 48.4 92.4 Q49 90.2 47.4 89.4 Q45.8 88.9 45.4 90.8 Q45 92.4 43 92.4 H41 V85.5Z" fill="#8b4a22" ${O}/><path d="M32 87.2 H39.6" stroke="#fffaf0" stroke-width="2.6" stroke-linecap="round" ${N}/><circle cx="48.1" cy="89.6" r="1.6" fill="url(#ceGo)" ${OF(.8)}/></g>
</g>
<g class="body">
<path d="${TUN}" fill="${b}" ${N}/>
<g clip-path="url(#ceTc)"><path d="M32 36 H52 V80 H28 Q34 58 32 36Z" fill="#000" opacity=".17" ${N}/><path d="M13 40 Q16 58 11 74 L8 74 L8 40Z" fill="#fff" opacity=".2" ${N}/><g clip-path="url(#ceTr)"><path d="${TUN}" fill="${FUR}" ${N}/><path d="M32 60 H52 V80 H30Z" fill="${FUS}" opacity=".7" ${N}/></g>
<rect x="8" y="56.4" width="46" height="5.6" fill="#4a2a1a" ${N}/><rect x="8" y="56.4" width="46" height="1.6" fill="#fff" opacity=".12" ${N}/></g>
<path d="${TUN}" fill="none" ${O}/>
<path d="M10.6 68.2 Q30 72 49.6 68.2" fill="none" stroke="${K}" stroke-width="1" opacity=".55" ${N.replace('stroke:none','stroke:'+K+';stroke-width:1')}/>
<rect x="25.4" y="55.2" width="9.6" height="8" rx="2" fill="url(#ceGo)" ${OF(1.1)}/><rect x="27.8" y="57.6" width="4.8" height="3.2" rx="1" fill="#4a2a1a" ${N}/>
<circle cx="30" cy="47.6" r="1.5" fill="url(#ceGo)" ${OF(.7)}/><circle cx="30" cy="51.6" r="1.5" fill="url(#ceGo)" ${OF(.7)}/>
</g>
<g class="collar"><g fill="url(#ceFu)" ${O}>${[[19,43.6],[23.2,45.4],[27.6,46.4],[32.4,46.4],[36.8,45.4],[41,43.6]].map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="3.4"/>`).join('')}</g>
<g fill="url(#ceFu)" ${N}>${[[19,43.6],[23.2,45.4],[27.6,46.4],[32.4,46.4],[36.8,45.4],[41,43.6]].map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="2.6"/>`).join('')}<rect x="19" y="41" width="22" height="5" /></g></g>
${al}${ar}
<g class="hd">
<g class="ears"><path d="M15.4 26.5 L1.6 19.4 Q4.4 31.5 15.2 36.6Z" fill="url(#ceSk)" ${O}/><path d="M14.4 28.6 L5.4 24 Q7.2 30.8 14.4 33.8Z" fill="#f2907a" ${N}/>
<path d="M44.6 26.5 L58.4 19.4 Q55.6 31.5 44.8 36.6Z" fill="url(#ceSk)" ${O}/><path d="M45.6 28.6 L54.6 24 Q52.8 30.8 45.6 33.8Z" fill="#f2907a" ${N}/></g>
<circle cx="30" cy="29.5" r="15.6" fill="url(#ceSk)" ${N}/>
<g clip-path="url(#ceHd)"><circle cx="35" cy="31" r="15.6" fill="#c97d52" opacity=".22" ${N}/></g>
<circle cx="30" cy="29.5" r="15.6" fill="none" ${O}/>
<circle cx="20.4" cy="35" r="3.5" fill="#f0766c" opacity=".5" ${N}/><circle cx="39.6" cy="35" r="3.5" fill="#f0766c" opacity=".5" ${N}/>
<g class="ee"><ellipse cx="24.2" cy="30.6" rx="3.1" ry="3.9" fill="url(#ceEy)"/><ellipse cx="35.8" cy="30.6" rx="3.1" ry="3.9" fill="url(#ceEy)"/><circle cx="25.3" cy="29" r="1.35" fill="#fff"/><circle cx="36.9" cy="29" r="1.35" fill="#fff"/><circle cx="23.3" cy="32.4" r=".65" fill="#fff" opacity=".85"/><circle cx="34.9" cy="32.4" r=".65" fill="#fff" opacity=".85"/></g>
<path d="M20.6 24.6 Q24 22.6 27.4 24.4 M32.6 24.4 Q36 22.6 39.4 24.6" stroke="#8a5230" stroke-width="1.2" fill="none" stroke-linecap="round" ${N.replace('stroke:none','stroke:#8a5230;stroke-width:1.2')}/>
<circle cx="30" cy="35" r="1.7" fill="#ef8f78" ${N}/>
<path d="M25.2 37.6 Q30 44 34.8 37.6 Q30 39.4 25.2 37.6Z" fill="#8a2a2a" ${OF(.7)}/><path d="M27.4 40.6 Q30 42.2 32.6 40.6 Q30 39.6 27.4 40.6Z" fill="#ef6f68" ${N}/>
<g class="hat"><path d="M13.6 23.5 C12 8 22 -6 36 -8.5 C46 -10 54 -3 54.5 7 C54.8 14 52 19.5 46.4 23.5Z" fill="${h}" ${O}/>
<path d="M17 21 C16.5 10 23 -1 33 -5" fill="none" stroke="#fff" stroke-width="2.4" opacity=".3" stroke-linecap="round" ${N.replace('stroke:none','stroke:#fff;stroke-width:2.4')}/>
<path d="M36 -8.5 C46 -10 54 -3 54.5 7 C54.8 14 52 19.5 46.4 23.5 H38 C46 18 48 8 44 0 C42 -4 40 -7 36 -8.5Z" fill="#000" opacity=".16" ${N}/>
<path d="M11.2 22.4 Q11 18.6 15.4 18.4 H44.6 Q49 18.6 48.8 22.4 Q49 26.8 45.2 27 H14.8 Q11 26.8 11.2 22.4Z" fill="url(#ceFu)" ${O}/>
<g fill="url(#ceFu)" ${N}>${[14,20,26,32,38,44].map((x,i)=>`<circle cx="${x}" cy="${i%2?18.8:19.4}" r="3.2"/>`).join('')}</g>
<path d="M13 25.6 Q30 28.6 47 25.6" fill="none" stroke="${FUS}" stroke-width="1.5" stroke-linecap="round" ${N.replace('stroke:none','stroke:'+FUS+';stroke-width:1.5')}/>
<circle cx="54.6" cy="12.6" r="5.4" fill="url(#ceFu)" ${O}/><circle cx="53" cy="10.8" r="2" fill="#fff" ${N}/><circle cx="56.2" cy="14.4" r="2.6" fill="${FUS}" opacity=".7" ${N}/></g>
</g></svg>`}
