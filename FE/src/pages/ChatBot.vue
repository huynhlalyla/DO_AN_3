<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
    <!-- Header -->
    <div class="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border-b border-white/30 dark:border-slate-700/50 px-6 py-4">
      <div class="max-w-4xl mx-auto flex items-center justify-between">
        <div class="flex items-center gap-3">
          <!-- Back Navigation -->
          <button @click="goBack" class="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200 mr-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
          
          <div class="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93s3.05-7.44 7-7.93v15.86zm2-15.86c1.03.13 2 .45 2.87.93H13v-.93zM13 7h5.24c.25.31.48.65.68 1H13V7zm0 3h6.74c.08.33.15.66.19 1H13v-1zm0 9.93V19h2.87c-.87.48-1.84.8-2.87.93z"/>
            </svg>
          </div>
          <div>
            <h1 class="text-xl font-bold text-slate-800 dark:text-white">AI Financial Assistant</h1>
            <p class="text-sm text-slate-600 dark:text-slate-400">
              Phân tích tài chính thông minh với AI
              <span class="ml-2 inline-block w-2 h-2 rounded-full bg-green-500"></span>
            </p>
          </div>
        </div>
        
        <!-- Action Buttons -->
        <div class="flex items-center gap-3">
          <button @click="reloadData" 
                  class="px-3 py-2 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-all duration-200 text-sm font-medium">
            Cập nhật dữ liệu
          </button>
          <button @click="clearChat" 
                  class="px-3 py-2 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-all duration-200 text-sm font-medium">
            Xóa chat
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-4xl mx-auto p-6">
      <!-- Quick Analysis Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div v-for="hint in hinds" :key="hint.title" 
             class="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-xl border border-white/30 dark:border-slate-700/50 p-6 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-200 cursor-pointer"
             @click="sendChat(url, hint.content())">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path v-if="hint.title.includes('danh mục')" d="M4 6h16M4 12h16M4 18h16"/>
                <path v-else-if="hint.title.includes('giao dịch')" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                <path v-else d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 class="font-semibold text-slate-800 dark:text-white">{{ hint.title }}</h3>
          </div>
          <p class="text-sm text-slate-600 dark:text-slate-400">
            {{ hint.title.includes('danh mục') ? 'Phân tích chi tiết các danh mục thu chi và đưa ra gợi ý tối ưu' : 
               hint.title.includes('trong ngày') ? 'Xem xét các giao dịch hôm nay và đánh giá xu hướng chi tiêu' :
               'Tổng quan về tất cả giao dịch và phân tích tình hình tài chính' }}
          </p>
          <div class="mt-3 flex items-center text-xs text-blue-600 dark:text-blue-400 font-medium">
            Nhấn để phân tích
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- Chat Container -->
      <div class="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl border border-white/30 dark:border-slate-700/50 p-6">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
            <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4v3c0 .6.4 1 1 1 .2 0 .5-.1.7-.3L12.9 18H20c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
            </svg>
          </div>
          <h2 class="text-lg font-semibold text-slate-800 dark:text-white">Cuộc trò chuyện với AI</h2>
        </div>
        
        <!-- Messages -->
        <div class="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
          <div v-if="chatMemories.length === 0" class="text-center py-8">
            <div class="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-purple-500 dark:text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93s3.05-7.44 7-7.93v15.86zm2-15.86c1.03.13 2 .45 2.87.93H13v-.93zM13 7h5.24c.25.31.48.65.68 1H13V7zm0 3h6.74c.08.33.15.66.19 1H13v-1zm0 9.93V19h2.87c-.87.48-1.84.8-2.87.93z"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-slate-800 dark:text-white mb-2">Chào mừng bạn!</h3>
            <p class="text-slate-600 dark:text-slate-400">Chọn một trong các phân tích trên để bắt đầu cuộc trò chuyện với AI</p>
          </div>
          
          <div v-for="memory in chatMemories" :key="memory.content" 
               class="flex" :class="{ 'justify-end': memory.role === 'user' }">
            
            <!-- User Message -->
            <div v-if="memory.role === 'user'" 
                 class="max-w-xs lg:max-w-md bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl rounded-tr-md px-4 py-3 shadow-lg">
              <p class="text-sm whitespace-pre-wrap">{{ memory.content }}</p>
            </div>

            <!-- Assistant Message -->
            <div v-else class="flex gap-3 max-w-xs lg:max-w-2xl">
              <div class="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93s3.05-7.44 7-7.93v15.86zm2-15.86c1.03.13 2 .45 2.87.93H13v-.93zM13 7h5.24c.25.31.48.65.68 1H13V7zm0 3h6.74c.08.33.15.66.19 1H13v-1zm0 9.93V19h2.87c-.87.48-1.84.8-2.87.93z"/>
                </svg>
              </div>
              <div class="bg-slate-50 dark:bg-slate-700 rounded-2xl rounded-tl-md px-4 py-3 shadow-lg border border-slate-200 dark:border-slate-600">
                <p class="text-sm text-slate-800 dark:text-white whitespace-pre-wrap">{{ memory.content }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div class="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-xl border border-white/30 dark:border-slate-700/50 p-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </div>
            <div>
              <p class="text-sm text-slate-600 dark:text-slate-400">Danh mục</p>
              <p class="text-lg font-semibold text-slate-800 dark:text-white">{{ categories.length }}</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-xl border border-white/30 dark:border-slate-700/50 p-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
            </div>
            <div>
              <p class="text-sm text-slate-600 dark:text-slate-400">Giao dịch</p>
              <p class="text-lg font-semibold text-slate-800 dark:text-white">{{ transactions.length }}</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-xl border border-white/30 dark:border-slate-700/50 p-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4v3c0 .6.4 1 1 1 .2 0 .5-.1.7-.3L12.9 18H20c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
              </svg>
            </div>
            <div>
              <p class="text-sm text-slate-600 dark:text-slate-400">Phân tích</p>
              <p class="text-lg font-semibold text-slate-800 dark:text-white">{{ chatMemories.filter(m => m.role === 'assistant').length }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue';
import { getCategories } from '../composables/useCategoryAPI';
import { getTransactions } from '../composables/useTransactionAPI';
import axios from 'axios';


const url = 'http://192.168.65.1:1234/v1/chat/completions';
const model = 'google/gemma-3-12b';
const categories = ref([]);
const transactions = ref([]);
const chatMemories = ref([]);


//tổng quát về danh mục
const solveCategories = (categories) => {
  const response = categories.map(category => {
    return {
      name: category.name,
      limit_amount: category.limit_amount,
      type: category.type,
      description: category.description || '',
      start_date: category.start_date || '',
      end_date: category.end_date || '',
    }
  })
  const format = response.map((category, index) => {
    return `Danh mục ${index + 1}: ${category.name}, Loại: ${category.type}, Mô tả: ${category.description}, Ngày bắt đầu: ${category.start_date}, Ngày kết thúc: ${category.end_date}`;
  })
  return format.join('\n');
}
//tổng quát về giao dịch
const solveTransactions = (transactions) => {
  const response = transactions.map(transaction => {
    return {
      name: transaction.name,
      amount: transaction.amount,
      category: transaction.category_id.name,
      date: transaction.date || '',
      description: transaction.description || '',
    }
  })
  const format = response.map((transaction, index) => {
    return `Giao dịch ${index + 1}: Tên: ${transaction.name}, Số tiền: ${transaction.amount}, Danh mục: ${transaction.category}, Ngày: ${transaction.date}, Mô tả: ${transaction.description}`;
  })
  return format.join('\n');
}
//giao dịch trong ngày
const solveTransactionsInDay = (transactions) => {
  const currentDate = new Date().toISOString().split('T')[0]; // Lấy ngày hiện tại theo định dạng YYYY-MM-DD
  const filteredTransactions = transactions.filter(t => {
    const transactionDate = t.date ? new Date(t.date).toISOString().split('T')[0] : '';
    return transactionDate === currentDate;
  });
  const response = filteredTransactions.map(transaction => {
    return {
      amount: transaction.amount,
      category: transaction.category_id.name,
      date: transaction.date || '',
      note: transaction.note || '',
    }
  })
  const format = response.map((transaction, index) => {
    return `Giao dịch ${index + 1}: Số tiền: ${transaction.amount}, Danh mục: ${transaction.category}, Ngày: ${transaction.date}, Ghi chú: ${transaction.note}`;
  })
  return format.join('\n');
}


const hinds = [
  {
    title: 'Tổng quát về danh mục',
    content: () => `Phân tích các danh mục và đưa ra phương hướng hợp lí cho tôi. ${solveCategories(categories.value)}`
  },
  {
    title: 'Tổng quát về giao dịch',
    content: () => `Phân tích các giao dịch và đưa ra phương hướng hợp lí cho tôi. ${solveTransactions(transactions.value)}`
  },
  {
    title: 'Giao dịch trong ngày',
    content: () => `Phân tích các giao dịch trong ngày và đưa ra phương hướng hợp lí cho tôi. ${solveTransactionsInDay(transactions.value)}`
  }
]

onMounted(async () => {
  await loadCategories();
  await loadTransactions();
  console.log('Data loaded - Categories:', categories.value.length, 'Transactions:', transactions.value.length);
});

// Helper methods for UI
const goBack = () => {
  window.history.back();
};

const reloadData = async () => {
  await loadCategories();
  await loadTransactions();
  console.log('Data reloaded - Categories:', categories.value.length, 'Transactions:', transactions.value.length);
};

const clearChat = () => {
  if (confirm('Bạn có chắc chắn muốn xóa toàn bộ cuộc trò chuyện?')) {
    chatMemories.value = [];
  }
};


const loadCategories = async () => {
  try {
    const response = await getCategories();
    if (response && response.data) {
      categories.value = response.data.data;
    } else {
      console.error('No categories found');
    }
  } catch (error) {
    console.error('Error loading categories:', error);
  }
};

const loadTransactions = async () => {
  try {
    const response = await getTransactions();
    if (response && response.data) {
      transactions.value = response.data;
    } else {
      console.error('No transactions found');
    }
  } catch (error) {
    console.error('Error loading transactions:', error);
  }
};

const sendChat = async (url, message) => {
  chatMemories.value.push({
    role: 'user',
    content: message
  });
  const response = await axios.post(url, {
    model: model,
    messages: [
      { role: 'system', content: 'Bạn là một trợ lý AI thông minh, giúp người dùng quản lý tài chính và ngân sách.' },
      { role: 'user', content: message }
    ],
    temperature: 0.7,
    max_tokens: -1,
    stream: false
  });
  if (response && response.data) {
    chatMemories.value.push({
      role: 'assistant',
      content: response.data.choices[0].message.content
    });
  } else {
    console.error('No response from chat API');
  }
}

</script>

<style lang="css" scoped>
/* Custom scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 3px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: #94a3b8;
}

/* Dark mode scrollbar */
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #475569;
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: #64748b;
}

/* Animation for typing dots */
@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

.animate-bounce {
  animation: bounce 1.4s infinite ease-in-out both;
}

/* Smooth transitions */
* {
  transition: all 0.2s ease;
}
</style>
