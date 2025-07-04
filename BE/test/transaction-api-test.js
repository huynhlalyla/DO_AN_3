// Test file cho Transaction APIs
// Có thể sử dụng với Postman hoặc chạy bằng Node.js với axios

const testTransactionAPIs = {
    baseURL: 'http://localhost:3000/transactions',
    
    // Test data mẫu
    testData: {
        userId: '64f123456789abcdef123456',
        categoryId: '64f123456789abcdef123457',
        amount: 100000,
        date: new Date().toISOString(),
        note: 'Test transaction'
    },

    // Test thêm giao dịch
    testAddTransaction: async () => {
        const response = await fetch(`${testTransactionAPIs.baseURL}/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(testTransactionAPIs.testData)
        });
        
        const result = await response.json();
        console.log('Add Transaction Result:', result);
        return result;
    },

    // Test lấy tất cả giao dịch
    testGetAllTransactions: async () => {
        const response = await fetch(`${testTransactionAPIs.baseURL}/info/all`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: testTransactionAPIs.testData.userId
            })
        });
        
        const result = await response.json();
        console.log('Get All Transactions Result:', result);
        return result;
    },

    // Test cập nhật giao dịch
    testUpdateTransaction: async (transactionId) => {
        const updateData = {
            ...testTransactionAPIs.testData,
            amount: 150000,
            note: 'Updated test transaction'
        };

        const response = await fetch(`${testTransactionAPIs.baseURL}/update/${transactionId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateData)
        });
        
        const result = await response.json();
        console.log('Update Transaction Result:', result);
        return result;
    },

    // Test tìm kiếm giao dịch
    testSearchTransactions: async () => {
        const searchData = {
            userId: testTransactionAPIs.testData.userId,
            searchText: 'test',
            page: 1,
            limit: 5
        };

        const response = await fetch(`${testTransactionAPIs.baseURL}/search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(searchData)
        });
        
        const result = await response.json();
        console.log('Search Transactions Result:', result);
        return result;
    },

    // Test thống kê giao dịch
    testGetStatistics: async () => {
        const statsData = {
            userId: testTransactionAPIs.testData.userId,
            startDate: new Date('2024-06-01').toISOString(),
            endDate: new Date('2024-06-30').toISOString()
        };

        const response = await fetch(`${testTransactionAPIs.baseURL}/statistics`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(statsData)
        });
        
        const result = await response.json();
        console.log('Statistics Result:', result);
        return result;
    },

    // Test xóa giao dịch
    testDeleteTransaction: async (transactionId) => {
        const response = await fetch(`${testTransactionAPIs.baseURL}/delete/${transactionId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: testTransactionAPIs.testData.userId
            })
        });
        
        const result = await response.json();
        console.log('Delete Transaction Result:', result);
        return result;
    },

    // Chạy tất cả test
    runAllTests: async () => {
        console.log('=== Bắt đầu test Transaction APIs ===');
        
        try {
            // Test thêm giao dịch
            console.log('\n1. Testing Add Transaction...');
            const addResult = await testTransactionAPIs.testAddTransaction();
            const transactionId = addResult.data?.transaction?._id;

            // Test lấy tất cả giao dịch
            console.log('\n2. Testing Get All Transactions...');
            await testTransactionAPIs.testGetAllTransactions();

            // Test tìm kiếm giao dịch
            console.log('\n3. Testing Search Transactions...');
            await testTransactionAPIs.testSearchTransactions();

            // Test thống kê
            console.log('\n4. Testing Get Statistics...');
            await testTransactionAPIs.testGetStatistics();

            if (transactionId) {
                // Test cập nhật giao dịch
                console.log('\n5. Testing Update Transaction...');
                await testTransactionAPIs.testUpdateTransaction(transactionId);

                // Test xóa giao dịch
                console.log('\n6. Testing Delete Transaction...');
                await testTransactionAPIs.testDeleteTransaction(transactionId);
            }

            console.log('\n=== Hoàn thành test ===');
        } catch (error) {
            console.error('Error during testing:', error);
        }
    }
};

// Export để sử dụng trong môi trường Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = testTransactionAPIs;
}

// Postman Collection JSON
const postmanCollection = {
    "info": {
        "name": "Transaction APIs",
        "description": "Collection for testing transaction management APIs"
    },
    "item": [
        {
            "name": "Add Transaction",
            "request": {
                "method": "POST",
                "header": [
                    {
                        "key": "Content-Type",
                        "value": "application/json"
                    }
                ],
                "body": {
                    "mode": "raw",
                    "raw": JSON.stringify({
                        "userId": "{{userId}}",
                        "categoryId": "{{categoryId}}",
                        "amount": 100000,
                        "date": "2024-06-18T10:00:00.000Z",
                        "note": "Test transaction"
                    })
                },
                "url": {
                    "raw": "{{baseURL}}/transactions/add",
                    "host": ["{{baseURL}}"],
                    "path": ["transactions", "add"]
                }
            }
        },
        {
            "name": "Get All Transactions",
            "request": {
                "method": "POST",
                "header": [
                    {
                        "key": "Content-Type",
                        "value": "application/json"
                    }
                ],
                "body": {
                    "mode": "raw",
                    "raw": JSON.stringify({
                        "userId": "{{userId}}"
                    })
                },
                "url": {
                    "raw": "{{baseURL}}/transactions/info/all",
                    "host": ["{{baseURL}}"],
                    "path": ["transactions", "info", "all"]
                }
            }
        },
        {
            "name": "Update Transaction",
            "request": {
                "method": "POST",
                "header": [
                    {
                        "key": "Content-Type",
                        "value": "application/json"
                    }
                ],
                "body": {
                    "mode": "raw",
                    "raw": JSON.stringify({
                        "userId": "{{userId}}",
                        "amount": 150000,
                        "note": "Updated transaction"
                    })
                },
                "url": {
                    "raw": "{{baseURL}}/transactions/update/{{transactionId}}",
                    "host": ["{{baseURL}}"],
                    "path": ["transactions", "update", "{{transactionId}}"]
                }
            }
        },
        {
            "name": "Search Transactions",
            "request": {
                "method": "POST",
                "header": [
                    {
                        "key": "Content-Type",
                        "value": "application/json"
                    }
                ],
                "body": {
                    "mode": "raw",
                    "raw": JSON.stringify({
                        "userId": "{{userId}}",
                        "searchText": "test",
                        "page": 1,
                        "limit": 10
                    })
                },
                "url": {
                    "raw": "{{baseURL}}/transactions/search",
                    "host": ["{{baseURL}}"],
                    "path": ["transactions", "search"]
                }
            }
        },
        {
            "name": "Get Statistics",
            "request": {
                "method": "POST",
                "header": [
                    {
                        "key": "Content-Type",
                        "value": "application/json"
                    }
                ],
                "body": {
                    "mode": "raw",
                    "raw": JSON.stringify({
                        "userId": "{{userId}}",
                        "startDate": "2024-06-01T00:00:00.000Z",
                        "endDate": "2024-06-30T23:59:59.999Z"
                    })
                },
                "url": {
                    "raw": "{{baseURL}}/transactions/statistics",
                    "host": ["{{baseURL}}"],
                    "path": ["transactions", "statistics"]
                }
            }
        },
        {
            "name": "Delete Transaction",
            "request": {
                "method": "POST",
                "header": [
                    {
                        "key": "Content-Type",
                        "value": "application/json"
                    }
                ],
                "body": {
                    "mode": "raw",
                    "raw": JSON.stringify({
                        "userId": "{{userId}}"
                    })
                },
                "url": {
                    "raw": "{{baseURL}}/transactions/delete/{{transactionId}}",
                    "host": ["{{baseURL}}"],
                    "path": ["transactions", "delete", "{{transactionId}}"]
                }
            }
        }
    ],
    "variable": [
        {
            "key": "baseURL",
            "value": "http://localhost:3000"
        },
        {
            "key": "userId",
            "value": "64f123456789abcdef123456"
        },
        {
            "key": "categoryId",
            "value": "64f123456789abcdef123457"
        },
        {
            "key": "transactionId",
            "value": ""
        }
    ]
};

console.log('Postman Collection:', JSON.stringify(postmanCollection, null, 2));
