PHẦN FRONT-END
*** AUTH(đăng kí - đăng nhập) ***
* Đăng kí
    - API để gửi form đăng kí: 'http://localhost:3000/user/auth/register'
    - Các dữ liệu sẽ gửi: {phone, email, password}
    - Dữ liệu muốn nhận được: {status}
* Đăng nhập
    - API để gửi form đăng nhập: 'http://localhost:3000/user/auth/login'
    - các dữ liệu sẽ gửi: {phone, password}
    - Dữ liệu muốn nhận: {status, userData}

!Lưu ý: dữ liệu phải được phân tách ra rõ ràng ở dạng json. Chỉ cần 2 status cụ thể là 200 và 400, Không cần gửi message.

