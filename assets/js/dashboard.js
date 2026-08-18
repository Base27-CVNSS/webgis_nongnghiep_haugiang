(() => {
 function chart(id,values,labels){
  const c=document.getElementById(id);if(!c)return;const ctx=c.getContext('2d');const dpr=devicePixelRatio||1;
  const w=c.clientWidth,h=c.clientHeight;c.width=w*dpr;c.height=h*dpr;ctx.scale(dpr,dpr);ctx.clearRect(0,0,w,h);
  const pad=38,max=Math.max(...values)*1.15, bw=(w-pad*2)/values.length*.58, gap=(w-pad*2)/values.length;
  ctx.strokeStyle='#d7e5e2';ctx.beginPath();ctx.moveTo(pad,15);ctx.lineTo(pad,h-pad);ctx.lineTo(w-10,h-pad);ctx.stroke();
  values.forEach((v,i)=>{const bh=(h-pad-25)*v/max,x=pad+i*gap+gap*.2,y=h-pad-bh;ctx.fillStyle=i%2?'#59aa96':'#009688';ctx.fillRect(x,y,bw,bh);ctx.fillStyle='#49635f';ctx.font='11px Arial';ctx.textAlign='center';ctx.fillText(labels[i],x+bw/2,h-pad+18);ctx.fillStyle='#17312e';ctx.fillText(v,x+bw/2,y-6)});
 }
 const draw=()=>{chart('cropChart',[54,31,22,18,14],['Lúa','Cây ăn trái','Mía','Rau màu','Khác']);chart('districtChart',[78,69,66,58,51,49,42,38],['Phụng Hiệp','Vị Thủy','Long Mỹ','Châu Thành','CTA','Vị Thanh','Ngã Bảy','TX LM'])};
 addEventListener('resize',draw);draw();
})();
