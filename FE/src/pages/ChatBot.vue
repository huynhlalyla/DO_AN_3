<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
    <!-- Header -->
    <div class="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border-b border-white/30 dark:border-slate-700/50 px-4 sm:px-6 py-4">
      <div class="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
        <div class="flex items-center gap-3 flex-shrink-0">
          <div class="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93s3.05-7.44 7-7.93v15.86zm2-15.86c1.03.13 2 .45 2.87.93H13v-.93zM13 7h5.24c.25.31.48.65.68 1H13V7zm0 3h6.74c.08.33.15.66.19 1H13v-1zm0 9.93V19h2.87c-.87.48-1.84.8-2.87.93z"/>
            </svg>
          </div>
          <div>
            <h1 class="text-lg sm:text-xl font-bold text-slate-800 dark:text-white">AI Financial Assistant</h1>
            <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Phân tích tài chính thông minh với AI
              <span class="ml-2 inline-block w-2 h-2 rounded-full bg-green-500"></span>
            </p>
          </div>
        </div>
        
        <!-- Action Buttons (wrap on small) -->
        <div class="flex flex-wrap items-center gap-2 sm:gap-3">
          <button @click="reloadData"
                  class="px-3 py-2 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-all duration-200 text-xs sm:text-sm font-medium">
            Cập nhật
          </button>
            <button @click="clearChat"
                  class="px-3 py-2 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-all duration-200 text-xs sm:text-sm font-medium">
            Xóa chat
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-4xl mx-auto p-4 sm:p-6">
      <!-- Quick Analysis Cards: horizontal scroll on mobile -->
      <div class="mb-6">
        <div class="flex md:hidden gap-4 overflow-x-auto pb-2 -mx-2 px-2 snap-x custom-scrollbar">
          <div v-for="hint in hinds" :key="hint.title" @click="sendChat(url, hint.content())"
               class="min-w-[260px] snap-start bg-white/80 dark:bg-slate-800/70 backdrop-blur-xl rounded-xl border border-white/30 dark:border-slate-700/50 p-5 hover:bg-white/90 dark:hover:bg-slate-800/80 transition-all duration-200 cursor-pointer">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path v-if="hint.title.includes('danh mục')" d="M4 6h16M4 12h16M4 18h16"/>
                  <path v-else-if="hint.title.includes('giao dịch')" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                  <path v-else d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 class="font-semibold text-slate-800 dark:text-white text-sm">{{ hint.title }}</h3>
            </div>
            <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {{ hint.title.includes('danh mục') ? 'Phân tích danh mục & gợi ý tối ưu' : 
                 hint.title.includes('trong ngày') ? 'Xem giao dịch hôm nay & xu hướng' :
                 'Tổng quan giao dịch & tình hình tài chính' }}
            </p>
            <div class="mt-3 flex items-center text-[11px] text-blue-600 dark:text-blue-400 font-medium">
              Nhấn để phân tích
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </div>
          </div>
        </div>
        <div class="hidden md:grid grid-cols-3 gap-4">
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
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Chat Container -->
  <div class="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl border border-white/30 dark:border-slate-700/50 p-4 sm:p-6 flex flex-col h-[70vh] md:max-h-[640px]">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
            <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4v3c0 .6.4 1 1 1 .2 0 .5-.1.7-.3L12.9 18H20c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
            </svg>
          </div>
          <h2 class="text-lg font-semibold text-slate-800 dark:text-white">Cuộc trò chuyện với AI</h2>
        </div>
        <!-- Messages -->
        <div ref="messagesEl" class="space-y-4 overflow-y-auto custom-scrollbar flex-1 pr-1">
          <div v-if="chatMemories.length === 0" class="text-center py-8">
            <div class="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-purple-500 dark:text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93s3.05-7.44 7-7.93v15.86zm2-15.86c1.03.13 2 .45 2.87.93H13v-.93zM13 7h5.24c.25.31.48.65.68 1H13V7zm0 3h6.74c.08.33.15.66.19 1H13v-1zm0 9.93V19h2.87c-.87.48-1.84.8-2.87.93z"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-slate-800 dark:text-white mb-2">Chào mừng bạn!</h3>
            <p class="text-slate-600 dark:text-slate-400">Chọn một trong các phân tích trên để bắt đầu cuộc trò chuyện với AI</p>
          </div>
          
    <div v-for="(memory, idx) in chatMemories" :key="idx" 
      class="flex" :class="{ 'justify-end': memory.role === 'user' }">
            
            <!-- User Message -->
      <div v-if="memory.role === 'user'" 
        class="max-w-[80%] md:max-w-md bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl rounded-tr-md px-4 py-3 shadow-lg">
              <p class="text-sm whitespace-pre-wrap">{{ memory.content }}</p>
            </div>

            <!-- Assistant Message -->
      <div v-else class="flex gap-3 max-w-[85%] md:max-w-2xl">
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
          <div v-if="loading" class="flex gap-2 items-center text-xs text-slate-500 dark:text-slate-400">
            <span class="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce"></span>
            <span class="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style="animation-delay:.15s"></span>
            <span class="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style="animation-delay:.3s"></span>
            <span>Đang phản hồi...</span>
          </div>
        </div>
        <!-- Input Bar -->
    <form @submit.prevent="handleSend" class="mt-4 flex items-end gap-3">
          <div class="flex-1 relative">
      <textarea v-model="userInput" @keydown.enter.exact.prevent="handleSend" rows="1" placeholder="Nhập tin nhắn..." class="w-full resize-none px-3 sm:px-4 py-3 pr-12 rounded-xl bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-blue-500 outline-none text-sm leading-relaxed"></textarea>
            <button type="button" @click="expand" class="absolute top-2 right-10 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300" title="Mở rộng">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12h16M12 4v16"/></svg>
            </button>
            <button type="submit" :disabled="!trimmedInput || loading" class="absolute top-2 right-2 w-8 h-8 rounded-lg flex items-center justify-center text-white" :class="trimmedInput && !loading ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700':'bg-slate-400 cursor-not-allowed'">
              <svg v-if="!loading" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M12 5l7 7-7 7"/></svg>
              <svg v-else class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke-width="4" class="opacity-25"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M12 2a10 10 0 0 1 10 10"/></svg>
            </button>
          </div>
        </form>
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
import { ref, nextTick, onMounted, computed } from 'vue';
import { getCategories } from '../composables/useCategoryAPI';
import { getTransactions } from '../composables/useTransactionAPI';
import axios from 'axios';


const url = 'http://192.168.65.1:1234/v1/chat/completions';
const model = 'google/gemma-3-12b';
const categories = ref([]);
const transactions = ref([]);
const chatMemories = ref([]);
const userInput = ref('');
const loading = ref(false);
const messagesEl = ref(null);
const trimmedInput = computed(()=> userInput.value.trim());

function autoScroll(){
  nextTick(()=> { if(messagesEl.value){ messagesEl.value.scrollTop = messagesEl.value.scrollHeight; } });
}


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

function buildContext(){
  const catSummary = solveCategories(categories.value.slice(0,25));
  const txSummary = solveTransactions(transactions.value.slice(-40));
  return `DỮ LIỆU HIỆN TẠI\n--Danh mục (tối đa 25)\n${catSummary}\n--Giao dịch gần nhất (tối đa 40)\n${txSummary}`;
}

const sendChat = async (url, message) => {
  if(!message) return;
  chatMemories.value.push({ role:'user', content: message });
  autoScroll();
  loading.value = true;
  try {
    const baseContext = buildContext();
    const history = chatMemories.value.slice(-12).map(m => ({ role: m.role, content: m.content }));
    const response = await axios.post(url, {
      model,
      messages: [
        { role: 'system', content: 'Bạn là một trợ lý AI tài chính. Luôn dùng dữ liệu cung cấp để phân tích & đề xuất. Nếu thiếu dữ liệu hãy hỏi lại.' },
        { role: 'system', content: baseContext },
        ...history
      ],
      temperature: 0.7,
      max_tokens: -1,
      stream: false
    });
    if(response && response.data){
      chatMemories.value.push({ role:'assistant', content: response.data.choices[0].message.content });
    } else {
      chatMemories.value.push({ role:'assistant', content: 'Không nhận được phản hồi từ máy chủ AI.' });
    }
  } catch(e){
    console.error('Chat error', e);
    chatMemories.value.push({ role:'assistant', content: 'Đã xảy ra lỗi khi gọi AI.' });
  } finally {
    loading.value = false;
    autoScroll();
  }
};

function handleSend(){
  if(!trimmedInput.value || loading.value) return;
  const msg = trimmedInput.value;
  userInput.value='';
  sendChat(url, msg);
}

function expand(e){
  const el = e?.currentTarget?.previousElementSibling;
  if(el){ el.rows = el.rows === 1 ? 4 : 1; }
}

onMounted(()=> autoScroll());

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
