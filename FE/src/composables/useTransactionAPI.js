import axios from 'axios'
const baseAPI = import.meta.env.VITE_BASE_API
import { useAuth } from './useAuth'

async function getTransactions() {
  try {
    const { user } = useAuth();
    const rs = await axios.get(`${baseAPI}/transaction?user=${user.value._id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    })
    return { status: 'success', data: rs.data }
  } catch (error) {
    console.error('Error fetching transactions:', error)
    return { status: 'error', message: error.message }
  }
}

async function addTransaction(transaction) {
  try {
    const rs = await axios.post(`${baseAPI}/transaction/add`, transaction)
    return { status: 'success', data: rs.data }
  } catch (error) {
    console.error('Error adding transaction:', error)
    return { status: 'error', message: error.message }
  }
}

async function deleteTransaction(id) {
  try {
    const rs = await axios.delete(`${baseAPI}/transaction/delete/${id}`)
    return { status: 'success', data: rs.data }
  } catch (error) {
    console.error('Error deleting transaction:', error)
    return { status: 'error', message: error.message }
  }
}

async function updateTransaction(id, transaction) {
  try {
    const rs = await axios.put(`${baseAPI}/transaction/update/${id}`, transaction)
    return { status: 'success', data: rs.data }
  } catch (error) {
    console.error('Error updating transaction:', error)
    return { status: 'error', message: error.message }
  }
}

export { getTransactions, addTransaction, deleteTransaction, updateTransaction }