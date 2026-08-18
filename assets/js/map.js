(() => {
 const stage=document.getElementById('mapStage'), canvas=document.getElementById('mapCanvas'), popup=document.getElementById('mapPopup');
 if(!stage||!canvas)return;
 let s=1, x=0, y=0, drag=false, sx=0, sy=0, ox=0, oy=0;
 const apply=()=>canvas.style.transform=`translate(${x}px,${y}px) scale(${s})`;
 const zoom=(factor,cx=stage.clientWidth/2,cy=stage.clientHeight/2)=>{
   const ns=Math.max(.75,Math.min(4,s*factor)); const k=ns/s;
   x=cx-(cx-x)*k; y=cy-(cy-y)*k; s=ns; apply();
 };
 document.getElementById('zoomIn').onclick=()=>zoom(1.2);
 document.getElementById('zoomOut').onclick=()=>zoom(.83);
 document.getElementById('resetMap').onclick=()=>{s=1;x=0;y=0;apply();};
 stage.addEventListener('wheel',e=>{e.preventDefault(); const r=stage.getBoundingClientRect();zoom(e.deltaY<0?1.12:.89,e.clientX-r.left,e.clientY-r.top)},{passive:false});
 stage.addEventListener('pointerdown',e=>{if(e.target.closest('.map-controls,.map-popup'))return;drag=true;sx=e.clientX;sy=e.clientY;ox=x;oy=y;stage.classList.add('dragging');stage.setPointerCapture(e.pointerId)});
 stage.addEventListener('pointermove',e=>{
   const r=stage.getBoundingClientRect();
   const lon=(105.25+(e.clientX-r.left)/r.width*.85).toFixed(4), lat=(10.1+(1-(e.clientY-r.top)/r.height)*.55).toFixed(4);
   document.getElementById('coord').textContent=`${lat}, ${lon}`;
   if(drag){x=ox+e.clientX-sx;y=oy+e.clientY-sy;apply();}
 });
 stage.addEventListener('pointerup',()=>{drag=false;stage.classList.remove('dragging')});
 const info={
  'Vị Thanh':['TP. Vị Thanh','Trung tâm hành chính tỉnh trong bối cảnh dữ liệu 2022.'],
  'Ngã Bảy':['TP. Ngã Bảy','Điểm nút giao thông – nông nghiệp phía đông bắc.'],
  'Long Mỹ':['TX. Long Mỹ','Vùng sản xuất lúa và cây trồng đặc trưng.'],
  'Vị Thủy':['H. Vị Thủy','Khu vực có các mô hình liên kết chuỗi giá trị lúa.'],
  'Phụng Hiệp':['H. Phụng Hiệp','Vùng nông nghiệp quy mô lớn, nhiều mô hình sản xuất.'],
  'Châu Thành':['H. Châu Thành','Vùng cây ăn trái và hành lang sông Hậu.'],
  'Châu Thành A':['H. Châu Thành A','Khu vực nông nghiệp – đô thị hóa phía bắc.'],
  'Long Mỹ H':['H. Long Mỹ','Vùng nông nghiệp phía nam tỉnh theo cấu trúc 2022.']
 };
 document.querySelectorAll('.district').forEach(el=>el.addEventListener('click',e=>{
   document.querySelectorAll('.district').forEach(d=>d.classList.remove('selected'));el.classList.add('selected');
   const key=el.dataset.name, v=info[key]||[key,'Khu vực minh họa'];
   const r=stage.getBoundingClientRect();popup.innerHTML=`<h4>${v[0]}</h4><p>${v[1]}</p><p style="margin-top:7px"><b>Lưu ý:</b> ranh giới SVG là sơ đồ phục dựng, không dùng cho mục đích pháp lý.</p>`;
   popup.style.left=Math.min(r.width-310,Math.max(12,e.clientX-r.left+12))+'px';popup.style.top=Math.min(r.height-170,Math.max(12,e.clientY-r.top+12))+'px';popup.classList.add('show');
 }));
 stage.addEventListener('click',e=>{if(!e.target.classList.contains('district')&&!e.target.closest('.map-popup'))popup.classList.remove('show')});
 const search=document.getElementById('mapSearch');
 search?.addEventListener('input',e=>{
   const q=e.target.value.toLowerCase().trim();document.querySelectorAll('.district').forEach(d=>d.classList.toggle('selected',q&&d.dataset.name.toLowerCase().includes(q)));
 });
 document.querySelectorAll('[data-layer]').forEach(ch=>ch.addEventListener('change',()=>{
   document.querySelectorAll('.'+ch.dataset.layer).forEach(el=>el.style.display=ch.checked?'':'none');
 }));
})();
