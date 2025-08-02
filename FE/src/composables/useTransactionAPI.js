import { ref } from 'vue'
import { transactionAPI } from './useTransactionAPIReal'

export function useTransactionAPI() {
    const loading = ref(false)
    const error = ref(null)

    // Get all transactions
    const getTransactions = async () => {
        loading.value = true
        error.value = null
        
        try {
            const result = await transactionAPI.getAll()
            
            if (result.status === 'success') {
                return {
                    status: 'success',
                    data: {
                        transactions: result.data
                    }
                }
            } else {
                throw new Error(result.error || 'Failed to fetch transactions')
            }
        } catch (err) {
            error.value = err.message
            throw err
        } finally {
            loading.value = false
        }
    }

    // Add new transaction
    const addTransaction = async (transactionData) => {
        loading.value = true
        error.value = null
        
        try {
            // Validate required fields
            if (!transactionData.amount || !transactionData.category_id || !transactionData.user_id) {
                throw new Error('Số tiền, danh mục và người dùng là bắt buộc')
            }

            // Ensure amount is a positive number
            if (transactionData.amount <= 0) {
                throw new Error('Số tiền phải lớn hơn 0')
            }

            const result = await transactionAPI.add(transactionData)
            
            if (result.status === 'success') {
                return {
                    status: 'success',
                    data: {
                        transaction: result.data
                    },
                    message: 'Giao dịch đã được tạo thành công'
                }
            } else {
                throw new Error(result.error || 'Failed to create transaction')
            }
        } catch (err) {
            error.value = err.message
            throw err
        } finally {
            loading.value = false
        }
    }

    // Delete transaction
    const deleteTransaction = async (transactionId) => {
        loading.value = true
        error.value = null
        
        try {
            if (!transactionId) {
                throw new Error('ID giao dịch là bắt buộc')
            }

            const result = await transactionAPI.delete(transactionId)
            
            if (result.status === 'success') {
                return {
                    status: 'success',
                    message: 'Giao dịch đã được xóa thành công'
                }
            } else {
                throw new Error(result.error || 'Failed to delete transaction')
            }
        } catch (err) {
            error.value = err.message
            throw err
        } finally {
            loading.value = false
        }
    }

    // Get transaction statistics
    const getTransactionStats = async (userId) => {
        loading.value = true
        error.value = null
        
        try {
            const result = await getTransactions()
            
            if (result.status === 'success') {
                const transactions = result.data.transactions || []
                
                // Calculate stats - Note: type now comes from category_id.type
                const totalIncome = transactions
                    .filter(t => t.category_id?.type === 'income')
                    .reduce((sum, t) => sum + (t.amount || 0), 0)
                
                const totalExpense = transactions
                    .filter(t => t.category_id?.type === 'expense')
                    .reduce((sum, t) => sum + (t.amount || 0), 0)
                
                const balance = totalIncome - totalExpense
                
                return {
                    status: 'success',
                    data: {
                        totalIncome,
                        totalExpense,
                        balance,
                        transactionCount: transactions.length
                    }
                }
            }
            
            throw new Error('Failed to get transaction stats')
        } catch (err) {
            error.value = err.message
            throw err
        } finally {
            loading.value = false
        }
    }

    // Filter transactions by criteria
    const filterTransactions = (transactions, filters = {}) => {
        let filtered = [...transactions]
        
        // Filter by date range
        if (filters.dateRange) {
            const now = new Date()
            let startDate, endDate
            
            switch (filters.dateRange) {
                case 'today':
                    startDate = new Date(now.setHours(0, 0, 0, 0))
                    endDate = new Date(now.setHours(23, 59, 59, 999))
                    break
                case 'week':
                    startDate = new Date(now.setDate(now.getDate() - now.getDay()))
                    endDate = new Date(now.setDate(startDate.getDate() + 6))
                    break
                case 'month':
                    startDate = new Date(now.getFullYear(), now.getMonth(), 1)
                    endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0)
                    break
                case 'year':
                    startDate = new Date(now.getFullYear(), 0, 1)
                    endDate = new Date(now.getFullYear(), 11, 31)
                    break
            }
            
            if (startDate && endDate) {
                filtered = filtered.filter(t => {
                    const tDate = new Date(t.date)
                    return tDate >= startDate && tDate <= endDate
                })
            }
        }
        
        // Filter by transaction type - Note: type now comes from category_id.type
        if (filters.type && filters.type !== 'all') {
            filtered = filtered.filter(t => t.category_id?.type === filters.type)
        }
        
        // Filter by category
        if (filters.categoryId && filters.categoryId !== 'all') {
            filtered = filtered.filter(t => t.category_id?._id === filters.categoryId)
        }
        
        // Filter by search term
        if (filters.search) {
            const searchTerm = filters.search.toLowerCase()
            filtered = filtered.filter(t => 
                t.note?.toLowerCase().includes(searchTerm) ||
                t.category_id?.name?.toLowerCase().includes(searchTerm)
            )
        }
        
        return filtered
    }

    // Sort transactions
    const sortTransactions = (transactions, sortBy = 'date', sortOrder = 'desc') => {
        return [...transactions].sort((a, b) => {
            let aValue, bValue
            
            switch (sortBy) {
                case 'date':
                    aValue = new Date(a.date)
                    bValue = new Date(b.date)
                    break
                case 'amount':
                    aValue = a.amount || 0
                    bValue = b.amount || 0
                    break
                case 'category':
                    aValue = a.category_id?.name || ''
                    bValue = b.category_id?.name || ''
                    break
                default:
                    aValue = a[sortBy] || ''
                    bValue = b[sortBy] || ''
            }
            
            if (sortOrder === 'asc') {
                return aValue > bValue ? 1 : -1
            } else {
                return aValue < bValue ? 1 : -1
            }
        })
    }

    return {
        // Main API functions
        getTransactions,
        addTransaction,
        deleteTransaction,
        getTransactionStats,
        
        // Utility functions
        filterTransactions,
        sortTransactions,
        
        // State
        loading,
        error
    }
}
