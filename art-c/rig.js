/* ===== moteur d'articulations : chaque os = une image avec un pivot, des enfants accrochés dans son repère ===== */
function Rig(container,W,H,IMG){this.W=W;this.H=H;this.IMG=IMG;this.bones={};
  this.root=document.createElement('div');this.root.className='rigroot';this.root.style.cssText=`position:absolute;left:0;top:0;width:${W}px;height:${H}px;transform-origin:0 0`;container.appendChild(this.root)}
/* def : {name, img, parent, x, y (point d'accroche dans le repère du parent), px, py (pivot dans l'image, en fraction), r, sx, sy, z} */
Rig.prototype.add=function(d){const b={...d,r:d.r||0,sx:d.sx??1,sy:d.sy??1,dx:0,dy:0,dr:0,dsx:1,dsy:1,vis:true};
  const node=document.createElement('div');node.className='bone';node.style.cssText='position:absolute;left:0;top:0;width:0;height:0;transform-origin:0 0';node.style.zIndex=d.z||0;
  if(d.img){const [w,h]=this.IMG[d.img].size;const im=document.createElement('img');im.alt='';im.draggable=false;im.src=this.IMG[d.img].src;
    im.style.cssText=`position:absolute;display:block;max-width:none;width:${w}px;height:${h}px;left:${-(d.px??.5)*w}px;top:${-(d.py??.5)*h}px`;node.appendChild(im);b.im=im}
  (d.parent?this.bones[d.parent].node:this.root).appendChild(node);b.node=node;this.bones[d.name]=b;this.place(b);return b};
Rig.prototype.place=function(b){b.node.style.transform=`translate(${b.x+b.dx}px,${b.y+b.dy}px) rotate(${b.r+b.dr}deg) scale(${b.sx*b.dsx},${b.sy*b.dsy})`;b.node.style.visibility=b.vis?'':'hidden'};
Rig.prototype.set=function(name,o){const b=this.bones[name];if(!b)return;Object.assign(b,o);this.place(b)};
Rig.prototype.show=function(name,v){const b=this.bones[name];if(b&&b.vis!==v){b.vis=v;this.place(b)}};
