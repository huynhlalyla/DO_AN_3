// API configuration and helper functions
const API_BASE_URL = 'http://localhost:3000'
import axios from "axios"


// API helper function
const search = async (query) => {
    const response = await axios.get(`${API_BASE_URL}/search?q=${encodeURIComponent(query)}`)
    if (response.status !== 200) {
        throw new Error('Search API request failed')
    }
    return {
        status: 'success',
        categories: response.data.categories,
        transactions: response.data.transactions
    }
}


export {
    search
}