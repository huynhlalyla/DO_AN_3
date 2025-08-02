import { ref } from 'vue'

const API_BASE_URL = 'http://localhost:3000'

// Transaction API
export const transactionAPI = {
    async getAll() {
        try {
            const response = await fetch(`${API_BASE_URL}/transaction`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            
            const result = await response.json()
            
            // Handle new response structure from backend
            if (result.status === 'success') {
                return {
                    status: 'success',
                    data: result.data.transactions || []
                }
            } else {
                throw new Error(result.message || 'Failed to fetch transactions')
            }
        } catch (error) {
            console.error('Transaction API getAll error:', error)
            return {
                status: 'error',
                error: error.message
            }
        }
    },

    async add(transactionData) {
        try {
            const response = await fetch(`${API_BASE_URL}/transaction/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(transactionData)
            })
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            
            const result = await response.json()
            
            // Handle new response structure from backend
            if (result.status === 'success') {
                return {
                    status: 'success',
                    data: result.data.transaction,
                    message: result.message
                }
            } else {
                throw new Error(result.message || 'Failed to add transaction')
            }
        } catch (error) {
            console.error('Transaction API add error:', error)
            return {
                status: 'error',
                error: error.message
            }
        }
    },

    async delete(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/transaction/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            
            const result = await response.json()
            
            // Handle new response structure from backend
            if (result.status === 'success') {
                return {
                    status: 'success',
                    message: result.message
                }
            } else {
                throw new Error(result.message || 'Failed to delete transaction')
            }
        } catch (error) {
            console.error('Transaction API delete error:', error)
            return {
                status: 'error',
                error: error.message
            }
        }
    }
}
