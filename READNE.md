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
*** TRANSACTION
* Gửi dữ liệu thêm giao dịch:
    - API để thêm giao dịch mới: 'http://localhost:3000/transactions/add'
    - method: POST.
    - các dữ liệu sẽ gửi: {categoryId, amount, userId, date, note}
    - phản hồi muốn nhận: {status(success, fail, warning), message}
* nhận dữ liệu 
    - API nhận dữ liệu một giao dịch: ''http://localhost:3000/transactions/info/:transactionId
    - method: POST
    - dữ liệu sẽ gửi: {userId}
    - dữ liệu muốn nhận: tất cả dữ liệu cảu giao dịch bao gồm transaction, category và budget liên quan. cùng với status và message như trên.
*nhận dữ liệu tất cả giao dịch
    - API: 'http://localhost:3000/transactions/info/all'
    - method: POST
    - dữ liệu sẽ gửi: {userId}
    - dữ liệu muốn nhận là tất cả thông tin như nhận một giao dịch ở trên, tuy nhiên lần này là lấy tất cả giao dịch của user. cùng status và message
* xoá 1 giao dịch:
    - API: 'http://localhost:3000/transactions/delete/:transactionId'
    - method: POST
    - dữ liệu sẽ gửi: {userId}
    - dữ liệu muốn nhận: {status và message như trên}
* xoá tất cả giao dịch của một category:
    - API: 'http://localhost:3000/transactions/delete/all/:categoryId'
    - dữ liệu gửi: {userId, categoryId}
    - dữ liệu nhận: status và message như bình thường.