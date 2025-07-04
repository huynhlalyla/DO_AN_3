// Transaction API composable
import { ref, computed } from 'vue'

export function useTransactionAPI() {
    const loading = ref(false)
    const error = ref(null)
    const transactions = ref([])
    const statistics = ref(null)

    // Base URL for API
    const baseURL = 'http://localhost:3000/transactions'

    // Helper function to handle API calls
    const apiCall = async (url, options = {}) => {
        loading.value = true
        error.value = null
        
        try {
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                },
                ...options
            })
            
            const data = await response.json()
            
            if (!response.ok) {
                throw new Error(data.message || 'API call failed')
            }
            
            return data
        } catch (err) {
            error.value = err.message
            throw err
        } finally {
            loading.value = false
        }
    }

    // Add new transaction
    const addTransaction = async (transactionData) => {
        const url = `${baseURL}/add`
        const options = {
            method: 'POST',
            body: JSON.stringify({
                userId: transactionData.userId,
                categoryId: transactionData.categoryId,
                amount: transactionData.amount,
                date: transactionData.date,
                note: transactionData.note
            })
        }
        
        const result = await apiCall(url, options)
        return result
    }

    // Get all transactions for user
    const getAllTransactions = async (userId) => {
        const url = `${baseURL}/info/all`
        const options = {
            method: 'POST',
            body: JSON.stringify({ userId })
        }
        
        const result = await apiCall(url, options)
        transactions.value = result.data || []
        return result
    }

    // Get transaction by ID
    const getTransactionById = async (transactionId, userId) => {
        const url = `${baseURL}/info/${transactionId}`
        const options = {
            method: 'POST',
            body: JSON.stringify({ userId })
        }
        
        const result = await apiCall(url, options)
        return result
    }

    // Update transaction
    const updateTransaction = async (transactionId, transactionData) => {
        const url = `${baseURL}/update/${transactionId}`
        const options = {
            method: 'POST',
            body: JSON.stringify({
                userId: transactionData.userId,
                categoryId: transactionData.categoryId,
                amount: transactionData.amount,
                date: transactionData.date,
                note: transactionData.note
            })
        }
        
        const result = await apiCall(url, options)
        return result
    }

    // Delete transaction
    const deleteTransaction = async (transactionId, userId) => {
        const url = `${baseURL}/delete/${transactionId}`
        const options = {
            method: 'POST',
            body: JSON.stringify({ userId })
        }
        
        const result = await apiCall(url, options)
        return result
    }

    // Delete all transactions by category
    const deleteTransactionsByCategory = async (categoryId, userId) => {
        const url = `${baseURL}/delete/all/${categoryId}`
        const options = {
            method: 'POST',
            body: JSON.stringify({ userId })
        }
        
        const result = await apiCall(url, options)
        return result
    }

    // Search transactions
    const searchTransactions = async (searchParams) => {
        const url = `${baseURL}/search`
        const options = {
            method: 'POST',
            body: JSON.stringify(searchParams)
        }
        
        const result = await apiCall(url, options)
        return result
    }

    // Get transaction statistics
    const getTransactionStatistics = async (userId, startDate = null, endDate = null) => {
        const url = `${baseURL}/statistics`
        const options = {
            method: 'POST',
            body: JSON.stringify({
                userId,
                startDate,
                endDate
            })
        }
        
        const result = await apiCall(url, options)
        statistics.value = result.data
        return result
    }

    // Computed properties for easy access
    const totalIncome = computed(() => {
        return transactions.value
            .filter(item => item.transaction?.type === 'income')
            .reduce((sum, item) => sum + (item.transaction?.amount || 0), 0)
    })

    const totalExpense = computed(() => {
        return transactions.value
            .filter(item => item.transaction?.type === 'expense')
            .reduce((sum, item) => sum + (item.transaction?.amount || 0), 0)
    })

    const balance = computed(() => {
        return totalIncome.value - totalExpense.value
    })

    // Format currency helper
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'decimal',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount) + ' ₫'
    }

    // Format date helper
    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        })
    }

    return {
        // State
        loading,
        error,
        transactions,
        statistics,
        
        // Computed
        totalIncome,
        totalExpense,
        balance,
        
        // Methods
        addTransaction,
        getAllTransactions,
        getTransactionById,
        updateTransaction,
        deleteTransaction,
        deleteTransactionsByCategory,
        searchTransactions,
        getTransactionStatistics,
        
        // Helpers
        formatCurrency,
        formatDate
    }
}
