(() => {
 const qs=(s,r=document)=>r.querySelector(s), qsa=(s,r=document)=>[...r.querySelectorAll(s)];
 const menu=qs('#menuBtn'), nav=qs('#navLinks');
 if(menu&&nav) menu.addEventListener('click',()=>nav.classList.toggle('open'));
 qsa('#navLinks a').forEach(a=>{if(location.pathname.endsWith(a.getAttribute('href')))a.classList.add('active')});
 const sm=qs('#searchModal'), open=qs('#searchBtn'), close=qs('#searchClose'), input=qs('#globalSearch'), box=qs('#searchResults');
 const items=[
  ['Bản đồ nông nghiệp','map.html','Tra cứu lớp dữ liệu, huyện/thành phố và điểm quan trắc.'],
  ['Quản trị dữ liệu','dashboard.html','Bảng điều khiển thống kê nông nghiệp dạng chỉ đọc.'],
  ['Tin tức nông nghiệp','news.html','Các tin bài lưu trữ phục dựng từ trang gốc.'],
  ['Bản tin thời tiết','weather.html','Bản tin mẫu chạy hoàn toàn offline.'],
  ['Liên hệ','contact.html','Thông tin đơn vị chủ quản và phối hợp.'],
  ['Giám sát lúa','index.html#ung-dung','Bản đồ diện tích lúa, mùa vụ và sinh trưởng.'],
  ['Quan trắc tự động','index.html#ung-dung','Kết nối dữ liệu quan trắc phục vụ giám sát và cảnh báo.'],
  ['Datacube','index.html#ung-dung','Lưu trữ, xử lý và chia sẻ dữ liệu vệ tinh/nông nghiệp.']
 ];
 function render(v=''){
  if(!box)return; const key=v.trim().toLowerCase();
  const arr=items.filter(x=>!key||x.join(' ').toLowerCase().includes(key));
  box.innerHTML=arr.map(x=>`<a class="search-item" href="${x[1]}"><b>${x[0]}</b><small>${x[2]}</small></a>`).join('')||'<div class="notice">Không tìm thấy nội dung phù hợp.</div>';
 }
 if(open&&sm){open.addEventListener('click',()=>{sm.classList.add('open');render();setTimeout(()=>input?.focus(),50)});}
 if(close&&sm)close.addEventListener('click',()=>sm.classList.remove('open'));
 if(sm)sm.addEventListener('click',e=>{if(e.target===sm)sm.classList.remove('open')});
 if(input)input.addEventListener('input',e=>render(e.target.value));
 document.addEventListener('keydown',e=>{if(e.key==='Escape')sm?.classList.remove('open')});
 if('serviceWorker' in navigator && location.protocol.startsWith('http')) navigator.serviceWorker.register('./sw.js').catch(()=>{});
})();
