# Bàn Giao Ca —

Ứng dụng web bàn giao ca . Chạy hoàn toàn trên trình duyệt, lưu dữ liệu vào Google Sheets qua Apps Script.

## Tính năng

- **Form bàn giao ca**: nhập thông tin ca (sáng/chiều/đêm), nhân viên bàn giao & tiếp nhận, số phòng, doanh thu tiền mặt + chuyển khoản, ghi chú
- **Tự động tính tổng thu**: cộng tiền mặt + chuyển khoản realtime
- **Lưu lên Google Sheets**: mỗi lần bàn giao được ghi thành 1 dòng trong sheet
- **Lịch sử offline**: lưu cục bộ (localStorage) khi không có mạng; tải lại từ Sheet khi có mạng
- **QR code**: tạo QR từ link file HTML để nhân viên quét vào nhanh
- **Tải Apps Script**: nút tải sẵn file `.gs` để dán vào Google Apps Script

## Cấu trúc

```
ban_giao_ca.html   — Giao diện web chính (single-file app)
apps_script.gs     — Code Google Apps Script cho phần backend Google Sheets
```

## Hướng dẫn cài đặt

### 1. Cài Google Apps Script

1. Mở **Google Sheets**, tạo một spreadsheet mới
2. Vào menu **Tiện ích mở rộng → Apps Script**
3. Xóa code mặc định, dán toàn bộ nội dung file `apps_script.gs` vào
4. Nhấn **Triển khai → Triển khai mới → Ứng dụng web**
5. Đặt quyền truy cập: **Mọi người**
6. Copy URL triển khai (dạng `https://script.google.com/macros/s/.../exec`)

### 2. Kết nối giao diện với Sheet

1. Mở file `ban_giao_ca.html` trong trình duyệt
2. Chuyển sang tab **Kết nối**
3. Dán URL Apps Script vừa copy vào ô, nhấn **Lưu**

### 3. Sử dụng

- Tab **Bàn giao**: điền form → nhấn **Xác nhận bàn giao ca** → dữ liệu ghi vào Sheet
- Tab **Lịch sử**: xem các bàn giao gần đây; nhấn **Tải từ Sheet** để đồng bộ
- Tab **QR**: tạo QR để nhân viên quét vào form nhanh

## Cấu trúc dữ liệu trong Google Sheets

Sheet tên `BanGiaoCa` với các cột:

| Thời gian | Ngày | Ca làm việc | NV Bàn giao | NV Tiếp nhận | Số phòng | Đơn giá TB | Tiền mặt (₫) | Chuyển khoản (₫) | Tổng thu (₫) | Ghi chú |
|-----------|------|-------------|-------------|--------------|----------|------------|--------------|------------------|--------------|---------|

## Công nghệ

- HTML/CSS/JS thuần — không cần framework, không cần build
- Google Apps Script (doPost / doGet) làm backend
- `localStorage` cho offline storage
- [qrcodejs](https://github.com/davidshimjs/qrcodejs) cho QR code
