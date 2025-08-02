// API configuration and helper functions
const API_BASE_URL = 'http://localhost:3000'

// API helper function
export const apiRequest = async (endpoint, options = {}) => {
    const url = `${API_BASE_URL}${endpoint}`
    
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
        },
        ...options
    }

    try {
        const response = await fetch(url, defaultOptions)
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        return data
    } catch (error) {
        console.error('API Request failed:', error)
        throw error
    }
}

// Category API endpoints
export const categoryAPI = {
    // Get all categories
    getAll: () => apiRequest('/category'),
    
    // Add category - Note: Your backend uses GET but should be POST
    // For now, we'll work with what you have
    add: (categoryData) => {
        // Since your backend uses GET for add, we'll need to modify this
        // Ideally this should be POST with body data
        return apiRequest('/category/add', {
            method: 'POST', // Changed to POST to send data properly
            body: JSON.stringify(categoryData)
        })
    },
    
    // Edit category
    edit: (id, categoryData) => {
        return apiRequest(`/category/edit/${id}`, {
            method: 'PUT', // Should be PUT for updates
            body: JSON.stringify(categoryData)
        })
    },
    
    // Delete category
    delete: (id) => {
        return apiRequest(`/category/delete/${id}`, {
            method: 'DELETE' // Should be DELETE for deletions
        })
    }
}

export default {
    apiRequest,
    categoryAPI,
    API_BASE_URL
}
