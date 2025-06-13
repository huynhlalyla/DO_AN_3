# Hướng dẫn tích hợp AI ChatBot với LM Studio

## 📋 Yêu cầu hệ thống

- **LM Studio** phiên bản mới nhất
- **Node.js** phiên bản 16+ 
- **RAM**: Ít nhất 8GB (khuyến nghị 16GB+)
- **GPU**: NVIDIA với CUDA hỗ trợ (tùy chọn, để tăng tốc)

## 🚀 Cài đặt LM Studio

### Bước 1: Tải LM Studio
1. Truy cập: https://lmstudio.ai/
2. Tải phiên bản phù hợp với hệ điều hành
3. Cài đặt theo hướng dẫn

### Bước 2: Tải AI Model
1. Mở LM Studio
2. Vào tab **"Search"**
3. Tìm và tải model **Vistral-7B-Chat**:
   - Tìm kiếm: "vistral-7b-chat"
   - Kích thước: ~4.1GB
   - Mô tả: Model AI tiếng Việt được tối ưu cho tư vấn tài chính
   - Nhấn **"Download"** và chờ tải về

### Bước 3: Khởi động Server với Vistral-7B
1. Vào tab **"Local Server"**
2. Chọn model **"vistral-7b-chat"** từ dropdown
3. Cấu hình:
   - **Context Length**: 4096
   - **GPU Layers**: Auto (hoặc 0 nếu không có GPU)
   - **Temperature**: 0.7
4. Nhấn **"Start Server"**
5. Server sẽ chạy tại: `http://localhost:1234`

## ⚙️ Cấu hình ChatBot

### Cài đặt cho Vistral-7B
```javascript
API URL: http://localhost:1234/v1/chat/completions
Model: vistral-7b-chat
Port: 1234
Temperature: 0.7
Max Tokens: 1000
Context Length: 4096
```

### Kiểm tra kết nối với Vistral-7B
1. Mở trang **ChatBot** trong ứng dụng
2. Nhấn nút **⚙️** (Settings) ở góc trên bên phải
3. Kiểm tra cấu hình:
   - API URL: `http://localhost:1234/v1/chat/completions`
   - Model: `vistral-7b-chat`
4. Nhấn **"Test kết nối"**
5. Nếu thành công, trạng thái sẽ hiển thị "Đang kết nối với Vistral-7B qua LM Studio (Port 1234)" 🟢

## 🎯 Tối ưu hiệu suất cho Vistral-7B

### Cấu hình khuyến nghị:
- **RAM**: Tối thiểu 8GB, khuyến nghị 12GB+
- **Context Length**: 4096 tokens
- **Temperature**: 0.7 (cân bằng giữa creativity và accuracy)
- **Max Tokens**: 1000-2000 (tùy theo độ dài câu trả lời mong muốn)

### Cho máy tính yếu:
- Giảm Context Length xuống 2048
- Giảm Max Tokens xuống 500
- Đặt GPU Layers = 0 (chỉ dùng CPU)

### Cho máy tính mạnh (có GPU):
- Tăng Context Length lên 8192
- Tăng Max Tokens lên 2000+
- Đặt GPU Layers = Auto hoặc max value

## 🔧 Khắc phục sự cố

### Lỗi "Không thể kết nối"
1. Kiểm tra LM Studio đã load model Vistral-7B và khởi động server chưa
2. Đảm bảo port 1234 không bị chặn bởi firewall
3. Thử restart LM Studio và reload model
4. Kiểm tra trong LM Studio Console có báo lỗi gì không

### Model Vistral-7B chạy chậm
1. Giảm Context Length từ 4096 xuống 2048
2. Giảm Max Tokens xuống 500-800
3. Nếu có GPU, đảm bảo GPU Layers được bật
4. Tắt các ứng dụng khác đang sử dụng RAM/GPU

### Vistral-7B trả lời không chính xác
1. Kiểm tra Temperature (khuyến nghị 0.7)
2. Thử reset conversation để làm mới context
3. Đảm bảo đang sử dụng đúng model "vistral-7b-chat"
4. Kiểm tra system prompt đã được cấu hình đúng chưa

### Lỗi CORS
1. Trong LM Studio, vào **Settings**
2. Bật **"Enable CORS"**
3. Restart server

## 💡 Gợi ý sử dụng

### Gợi ý sử dụng với Vistral-7B:
- "Phân tích chi tiêu của tôi theo xu hướng thị trường Việt Nam"
- "Tư vấn đầu tư chứng khoán Việt Nam với 100 triệu đồng"
- "So sánh lãi suất tiết kiệm các ngân hàng lớn ở VN"
- "Lập kế hoạch mua nhà tại TP.HCM với mức lương 20 triệu/tháng"
- "Hướng dẫn đầu tư vàng trong bối cảnh lạm phát"

### Tối ưu câu hỏi cho Vistral-7B:
- Cung cấp context về thị trường Việt Nam
- Nêu rõ số tiền bằng VND
- Đề cập đến các ngân hàng/công ty Việt Nam cụ thể
- Sử dụng thuật ngữ tài chính Việt Nam

## 🔒 Bảo mật

- **Dữ liệu local**: Tất cả xử lý AI diễn ra trên máy tính cá nhân
- **Không gửi lên cloud**: Thông tin tài chính được bảo mật tuyệt đối
- **Offline hoàn toàn**: Không cần kết nối internet sau khi tải model

## 📞 Hỗ trợ

Nếu gặp vấn đề:
1. Kiểm tra log trong Console (F12)
2. Restart LM Studio và trình duyệt
3. Thử model khác
4. Liên hệ support team

---

**Lưu ý về Vistral-7B**: 
- Lần đầu load model có thể mất 2-3 phút để tải vào RAM
- Model được tối ưu cho tiếng Việt và hiểu rõ bối cảnh tài chính VN
- Khuyến nghị sử dụng với ít nhất 8GB RAM để có hiệu suất tốt nhất
- Temperature 0.7 cho kết quả cân bằng giữa sáng tạo và chính xác
