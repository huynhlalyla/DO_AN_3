# API Documentation - Transaction Management

## Tổng quan
API quản lý giao dịch cung cấp các chức năng CRUD (Create, Read, Update, Delete) và các tính năng nâng cao như tìm kiếm, thống kê.

## Base URL
```
POST /transactions
```

## API Endpoints

### 1. Thêm giao dịch mới
**Endpoint:** `POST /transactions/add`

**Request Body:**
```json
{
    "userId": "64f123456789abcdef123456",
    "categoryId": "64f123456789abcdef123457",
    "amount": 100000,
    "date": "2024-06-18T10:00:00.000Z",
    "note": "Mua sắm tạp hóa"
}
```

**Response:**
```json
{
    "status": "success",
    "message": "Thêm giao dịch thành công",
    "data": {
        "transaction": {
            "_id": "64f123456789abcdef123458",
            "amount": 100000,
            "type": "expense",
            "date": "2024-06-18T10:00:00.000Z",
            "note": "Mua sắm tạp hóa",
            "user_id": "64f123456789abcdef123456",
            "category_id": "64f123456789abcdef123457"
        },
        "category": {
            "_id": "64f123456789abcdef123457",
            "name": "Mua sắm",
            "type": "expense",
            "budget_id": "64f123456789abcdef123459"
        }
    }
}
```

### 2. Lấy thông tin giao dịch theo ID
**Endpoint:** `POST /transactions/info/:transactionId`

**Request Body:**
```json
{
    "userId": "64f123456789abcdef123456"
}
```

**Response:** Tương tự như response của API thêm giao dịch

### 3. Lấy tất cả giao dịch của user
**Endpoint:** `POST /transactions/info/all`

**Request Body:**
```json
{
    "userId": "64f123456789abcdef123456"
}
```

**Response:**
```json
{
    "status": "success",
    "message": "Lấy tất cả giao dịch thành công",
    "data": [
        {
            "transaction": {...},
            "category": {...},
            "budget": {...}
        }
    ]
}
```

### 4. Cập nhật giao dịch
**Endpoint:** `POST /transactions/update/:transactionId`

**Request Body:**
```json
{
    "userId": "64f123456789abcdef123456",
    "categoryId": "64f123456789abcdef123457",
    "amount": 150000,
    "date": "2024-06-18T11:00:00.000Z",
    "note": "Mua sắm tạp hóa - cập nhật"
}
```

**Response:** Tương tự như response của API thêm giao dịch

### 5. Xóa giao dịch
**Endpoint:** `POST /transactions/delete/:transactionId`

**Request Body:**
```json
{
    "userId": "64f123456789abcdef123456"
}
```

**Response:**
```json
{
    "status": "success",
    "message": "Đã xóa giao dịch thành công",
    "data": {
        "deletedTransactionId": "64f123456789abcdef123458"
    }
}
```

### 6. Xóa tất cả giao dịch theo danh mục
**Endpoint:** `POST /transactions/delete/all/:categoryId`

**Request Body:**
```json
{
    "userId": "64f123456789abcdef123456"
}
```

### 7. Tìm kiếm giao dịch
**Endpoint:** `POST /transactions/search`

**Request Body:**
```json
{
    "userId": "64f123456789abcdef123456",
    "categoryId": "64f123456789abcdef123457", // Optional
    "type": "expense", // Optional: "income" hoặc "expense"
    "startDate": "2024-06-01T00:00:00.000Z", // Optional
    "endDate": "2024-06-30T23:59:59.999Z", // Optional
    "minAmount": 50000, // Optional
    "maxAmount": 200000, // Optional
    "searchText": "mua sắm", // Optional: tìm kiếm trong note
    "page": 1, // Optional, default: 1
    "limit": 10 // Optional, default: 10
}
```

**Response:**
```json
{
    "status": "success",
    "message": "Tìm kiếm giao dịch thành công",
    "data": {
        "transactions": [...],
        "pagination": {
            "currentPage": 1,
            "totalPages": 5,
            "totalRecords": 50,
            "hasNextPage": true,
            "hasPrevPage": false
        }
    }
}
```

### 8. Thống kê giao dịch
**Endpoint:** `POST /transactions/statistics`

**Request Body:**
```json
{
    "userId": "64f123456789abcdef123456",
    "startDate": "2024-06-01T00:00:00.000Z", // Optional
    "endDate": "2024-06-30T23:59:59.999Z" // Optional
}
```

**Response:**
```json
{
    "status": "success",
    "message": "Lấy thống kê thành công",
    "data": {
        "summary": {
            "totalIncome": 5000000,
            "totalExpense": 3000000,
            "balance": 2000000,
            "transactionCount": 25
        },
        "categoryStatistics": [
            {
                "name": "Lương",
                "type": "income",
                "totalAmount": 5000000,
                "transactionCount": 1
            },
            {
                "name": "Mua sắm",
                "type": "expense",
                "totalAmount": 1500000,
                "transactionCount": 10
            }
        ],
        "monthlyStatistics": [
            {
                "month": "2024-06",
                "income": 5000000,
                "expense": 3000000,
                "balance": 2000000
            }
        ]
    }
}
```

## Error Responses

### 400 Bad Request
```json
{
    "status": "fail",
    "message": "Thiếu thông tin bắt buộc: categoryId, amount, userId"
}
```

### 403 Forbidden
```json
{
    "status": "fail",
    "message": "Bạn không có quyền thực hiện hành động này"
}
```

### 404 Not Found
```json
{
    "status": "fail",
    "message": "Không tìm thấy giao dịch"
}
```

### 500 Internal Server Error
```json
{
    "status": "fail",
    "message": "Lỗi server",
    "error": "Chi tiết lỗi..."
}
```

## Validation Rules

### Khi thêm giao dịch:
- `userId`: Bắt buộc, phải là ObjectId hợp lệ
- `categoryId`: Bắt buộc, phải là ObjectId hợp lệ và tồn tại
- `amount`: Bắt buộc, phải là số dương
- `date`: Tùy chọn, mặc định là thời gian hiện tại
- `note`: Tùy chọn, mặc định là chuỗi rỗng

### Khi cập nhật giao dịch:
- Chỉ cần cung cấp các trường muốn cập nhật
- `amount` nếu có phải là số dương
- Nếu thay đổi `categoryId`, category mới phải tồn tại

## Notes
- Tất cả datetime được trả về theo định dạng ISO 8601
- Type của transaction sẽ tự động được set theo type của category
- Khi xóa hoặc cập nhật transaction, hệ thống sẽ tự động cập nhật liên kết với category
- API hỗ trợ pagination cho tìm kiếm để tối ưu performance
