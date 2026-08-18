# 🌾 AgriGIS Hậu Giang — bản phục dựng static/offline

Bản tái cấu trúc giao diện **AgriGIS Hậu Giang – Hệ thống thông tin nông nghiệp** từ snapshot trang chủ năm 2022.

## Mục tiêu

- Loại bỏ hoàn toàn `web-static.archive.org`, `web.archive.org`, Wayback toolbar, Wombat và mã analytics của Archive.
- Không giữ WordPress/Elementor runtime; viết lại bằng **HTML + CSS + JavaScript thuần**.
- Các trang hoạt động không cần CDN, API key, iframe hay tile server.
- Có WebGIS SVG tương tác offline: kéo, zoom, layer toggle, tìm kiếm, popup.
- Có dashboard canvas, tin tức snapshot, bản tin thời tiết mẫu và form lưu `localStorage`.

## Cấu trúc

```text
index.html
map.html
dashboard.html
news.html
weather.html
contact.html
assets/
  css/style.css
  js/app.js
  js/map.js
  js/dashboard.js
  img/*.svg
sw.js
manifest.webmanifest
start-offline.bat
```

## Chạy offline

Cách nhanh nhất trên Windows: chạy `start-offline.bat`.

Hoặc:

```bash
python -m http.server 8080
```

sau đó mở `http://localhost:8080/`.

`index.html` cũng có thể mở trực tiếp; Service Worker/PWA chỉ hoạt động khi chạy qua HTTP(S).

## Phạm vi phục dựng

Bản gốc trong snapshot dùng menu **Bản đồ / Quản trị / Tin tức / Bản tin thời tiết / Liên hệ** và các khối: biểu đồ, cơ sở dữ liệu, tìm kiếm, mobile, thông báo, báo cáo, GIS nông nghiệp, phân tích thông tin, giám sát lúa, giám sát lũ, quan trắc tự động và Datacube.

Các ranh giới trên `map.html` là **sơ đồ minh họa**, không phải dữ liệu địa giới hành chính chính thức.

## Ghi chú nguồn

Nội dung tổ chức/tác giả ở footer được giữ theo snapshot 2022 để tôn trọng nguồn gốc. Repo này là **bản phục dựng kỹ thuật**, không phải cổng thông tin chính thức của cơ quan nhà nước.

## License

Mã tái cấu trúc: MIT. Các tên tổ chức, nội dung gốc và dấu hiệu nhận diện của nguồn ban đầu vẫn thuộc chủ thể tương ứng.
