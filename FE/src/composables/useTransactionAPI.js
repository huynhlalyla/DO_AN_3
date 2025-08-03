import axios from 'axios'
const baseAPI = import.meta.env.VITE_BASE_API


async function getTransactions() {
  try {
    const rs = await axios.get(`${baseAPI}/transaction`)
    return { status: 'success', data: rs.data }
  } catch (error) {
    console.error('Error fetching transactions:', error)
    return { status: 'error', message: error.message }
  }
}

export { getTransactions }