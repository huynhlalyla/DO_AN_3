import axios from 'axios'
const baseAPI = import.meta.env.VITE_BASE_API
async function getCategories() {
    try {
        const rs = await axios.get(`${baseAPI}/category`)
        return { status: 'success', data: rs.data }
    } catch (error) {
        console.error('Error fetching categories:', error)
        return { status: 'error', message: error.message }
    }
}

async function getCategoriesByType(type) {
    try {
        const rs = await axios.get(`${baseAPI}/category/type/${type}`)
        return { status: 'success', data: rs.data }
    } catch (error) {
        console.error('Error fetching categories by type:', error)
        return { status: 'error', message: error.message }
    }
}


export { getCategories, getCategoriesByType }