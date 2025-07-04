# Test Authentication Flow

## Các bước kiểm tra luồng đăng nhập và thêm giao dịch:

### 1. Kiểm tra đăng nhập
- Truy cập `/auth/login`
- Nhập số điện thoại và mật khẩu hợp lệ
- Kiểm tra console log để xem user data được trả về
- Kiểm tra localStorage xem user đã được lưu chưa
- Kiểm tra chuyển hướng về trang chủ

### 2. Kiểm tra state user
- Truy cập trang `/add-transaction`
- Mở console và kiểm tra log "Current user:"
- Đảm bảo user._id có giá trị

### 3. Kiểm tra thêm giao dịch
- Điền form thêm giao dịch
- Submit form
- Kiểm tra console log để xem request được gửi
- Kiểm tra response từ backend
- Kiểm tra thông báo success/error

### 4. Debug commands trong console:
```javascript
// Kiểm tra localStorage
localStorage.getItem('user')
localStorage.getItem('isAuthenticated')

// Kiểm tra Vue component data (trong dev tools)
$data.user
```

### 5. Nếu vẫn lỗi "Không tìm thấy thông tin người dùng":
- Kiểm tra backend có trả về đúng structure userData không
- Kiểm tra useAuth composable có được import đúng không
- Kiểm tra initAuth() có được gọi đúng lúc không

### 6. Backend cần đảm bảo:
- API `/user/auth/login` trả về đúng format:
```json
{
  "status": 200,
  "userData": {
    "_id": "user-id-here",
    "phone": "phone-number",
    "name": "user-name",
    // ... other user fields
  }
}
```
