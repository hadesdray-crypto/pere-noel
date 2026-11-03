/* Style C : tout en vecteur. Chaque pièce = un SVG (taille en px du repère de la pièce). */
const ART={};
const IMG_C={};
function buildIMG_C(){for(const k in ART){const a=ART[k];IMG_C[k]={size:a.size,src:'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(a.svg).replace(/\(/g,'%28').replace(/\)/g,'%29').replace(/'/g,'%27')}}return IMG_C}
/* aide : enveloppe un contenu SVG dans un <svg> aux dimensions de la pièce */
function svgPiece(w,h,inner,defs){return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}"><defs>${defs||''}</defs>${inner}</svg>`}
function art(name,w,h,inner,defs){ART[name]={size:[w,h],svg:svgPiece(w,h,inner,defs)}}
