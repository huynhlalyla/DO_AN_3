import axios from 'axios'
const baseAPI = import.meta.env.VITE_BASE_API
import { useAuth } from './useAuth'

const { user } = useAuth();

async function getCategories() {
    try {
        const rs = await axios.get(`${baseAPI}/category?user=${user.value._id}`)
        return { status: 'success', data: rs.data }
    } catch (error) {
        console.error('Error fetching categories:', error)
        return { status: 'error', message: error.message }
    }
}

async function getCategoriesByType(type) {
    try {
        const rs = await axios.get(`${baseAPI}/category/type/${type}?user=${user.value._id}`)
        return { status: 'success', data: rs.data }
    } catch (error) {
        console.error('Error fetching categories by type:', error)
        return { status: 'error', message: error.message }
    }
}

async function createCategory(category) {
    try {
        const rs = await axios.post(`${baseAPI}/category/create`, category)
        return { status: 'success', data: rs.data }
    } catch (error) {
        console.error('Error creating category:', error)
        return { status: 'error', message: error.message }
    }
}


async function deleteCategory(id) {
    try {
        const rs = await axios.delete(`${baseAPI}/category/delete/${id}`)
        return { status: 'success', data: rs.data }
    } catch (error) {
        console.error('Error deleting category:', error)
        return { status: 'error', message: error.message }
    }
}

async function editCategory(id, category) {
    try {
        const rs = await axios.put(`${baseAPI}/category/edit/${id}`, category)
        return { status: 'success', data: rs.data }
    } catch (error) {
        console.error('Error editing category:', error)
        return { status: 'error', message: error.message }
    }
}

export { 
    getCategories, 
    getCategoriesByType, 
    createCategory, 
    deleteCategory,
    editCategory
}