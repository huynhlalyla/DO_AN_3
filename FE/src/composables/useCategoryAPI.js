import { ref } from 'vue'
import { categoryAPI } from './useAPI'

export function useCategoryAPI() {
    const loading = ref(false)
    const error = ref(null)

    // Get all categories
    const getCategories = async () => {
        loading.value = true
        error.value = null
        
        try {
            const result = await categoryAPI.getAll()
            
            if (result.status === 'success') {
                return {
                    status: 'success',
                    data: {
                        categories: result.data
                    }
                }
            } else {
                throw new Error(result.error || 'Failed to fetch categories')
            }
        } catch (err) {
            error.value = err.message
            throw err
        } finally {
            loading.value = false
        }
    }

    // Get categories by type
    const getCategoriesByType = async (type) => {
        try {
            const result = await getCategories()
            const filteredCategories = result.data.categories.filter(cat => cat.type === type)
            
            return {
                status: 'success',
                data: {
                    categories: filteredCategories
                }
            }
        } catch (err) {
            error.value = err.message
            throw err
        }
    }

    // Add new category
    const addCategory = async (categoryData) => {
        loading.value = true
        error.value = null
        
        try {
            // Validate required fields
            if (!categoryData.name || !categoryData.type) {
                throw new Error('Tên danh mục và loại danh mục là bắt buộc')
            }

            // Map frontend data to backend expected format
            const backendData = {
                name: categoryData.name,
                type: categoryData.type,
                description: categoryData.description || '',
                icon: categoryData.icon || 'default-icon',
                color: categoryData.color || 'gray',
                limit_amount: categoryData.limit_amount || 0,
                start_date: categoryData.start_date || new Date(),
                end_date: categoryData.end_date || new Date(new Date().setMonth(new Date().getMonth() + 1)),
                user_id: categoryData.user_id
            }

            // Validate required backend fields
            if (!backendData.user_id) {
                throw new Error('User ID is required')
            }

            const result = await categoryAPI.add(backendData)
            
            if (result.status === 'success') {
                return {
                    status: 'success',
                    data: {
                        category: result.data
                    },
                    message: 'Danh mục đã được tạo thành công'
                }
            } else {
                throw new Error(result.error || 'Failed to create category')
            }
        } catch (err) {
            error.value = err.message
            throw err
        } finally {
            loading.value = false
        }
    }

    // Update category
    const updateCategory = async (categoryId, updateData) => {
        loading.value = true
        error.value = null
        
        try {
            // Map frontend data to backend expected format
            const backendData = {
                name: updateData.name,
                type: updateData.type,
                description: updateData.description || '',
                icon: updateData.icon || 'default-icon',
                color: updateData.color || 'gray',
                limit_amount: updateData.limitAmount || updateData.limit_amount || 0,
                start_date: updateData.start_date || new Date(),
                end_date: updateData.end_date || new Date(new Date().setMonth(new Date().getMonth() + 1))
            }

            const result = await categoryAPI.edit(categoryId, backendData)
            
            if (result.status === 'success') {
                return {
                    status: 'success',
                    data: {
                        category: result.data
                    },
                    message: 'Danh mục đã được cập nhật thành công'
                }
            } else {
                throw new Error(result.error || 'Failed to update category')
            }
        } catch (err) {
            error.value = err.message
            throw err
        } finally {
            loading.value = false
        }
    }

    // Delete category
    const deleteCategory = async (categoryId) => {
        loading.value = true
        error.value = null
        
        try {
            const result = await categoryAPI.delete(categoryId)
            
            if (result.status === 'success') {
                return {
                    status: 'success',
                    data: {
                        category: result.data
                    },
                    message: 'Danh mục đã được xóa thành công'
                }
            } else {
                throw new Error(result.error || 'Failed to delete category')
            }
        } catch (err) {
            error.value = err.message
            throw err
        } finally {
            loading.value = false
        }
    }

    // Get category by ID
    const getCategoryById = async (categoryId) => {
        loading.value = true
        error.value = null
        
        try {
            const result = await getCategories()
            const category = result.data.categories.find(cat => cat._id === categoryId)
            
            if (!category) {
                throw new Error('Không tìm thấy danh mục')
            }
            
            return {
                status: 'success',
                data: {
                    category
                }
            }
        } catch (err) {
            error.value = err.message
            throw err
        } finally {
            loading.value = false
        }
    }

    return {
        loading,
        error,
        getCategories,
        getCategoriesByType,
        addCategory,
        updateCategory,
        deleteCategory,
        getCategoryById
    }
}
