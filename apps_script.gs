// ============================================================
// BAN GIAO CA — Google Apps Script
// Dán toàn bộ code này vào Apps Script của Google Sheet
// Sau đó: Triển khai → Ứng dụng web → Mọi người có thể truy cập
// ============================================================

const SHEET_NAME = 'BanGiaoCa';

const HEADERS = [
  'Thời gian', 'Ngày', 'Ca làm việc',
  'NV Bàn giao', 'NV Tiếp nhận',
  'Số phòng', 'Đơn giá TB',
  'Tiền mặt (₫)', 'Chuyển khoản (₫)', 'Tổng thu (₫)',
  'Ghi chú'
];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length)
        .setBackground('#1A6B4A')
        .setFontColor('#FFFFFF')
        .setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      data.thoiGian || new Date().toLocaleString('vi-VN'),
      data.ngay || '',
      data.ca || '',
      data.nvBan || '',
      data.nvNhan || '',
      Number(data.soPhong) || 0,
      Number(data.donGia) || 0,
      Number(data.tienMat) || 0,
      Number(data.chuyenKhoan) || 0,
      Number(data.tong) || 0,
      data.ghiChu || ''
    ]);

    // Auto-resize columns
    sheet.autoResizeColumns(1, HEADERS.length);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    const action = e.parameter.action;
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet || action !== 'get') {
      return ContentService
        .createTextOutput(JSON.stringify({ records: [] }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const rows = sheet.getDataRange().getValues();
    if (rows.length <= 1) {
      return ContentService
        .createTextOutput(JSON.stringify({ records: [] }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const records = rows.slice(1).reverse().slice(0, 100).map(r => ({
      thoiGian: r[0], ngay: r[1], ca: r[2],
      nvBan: r[3], nvNhan: r[4],
      soPhong: r[5], donGia: r[6],
      tienMat: r[7], chuyenKhoan: r[8], tong: r[9],
      ghiChu: r[10], saved: true
    }));

    return ContentService
      .createTextOutput(JSON.stringify({ records }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({ records: [], error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}