<template>
  <!-- Mini Chat Widget - Ẩn khi đang ở trang ChatBot chính -->
  <div v-if="!isOnChatBotPage" class="fixed bottom-6 right-6 z-50">
    <!-- Chat Widget (when expanded) -->
    <div v-if="isOpen" class="mb-4 w-80 h-96 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 dark:border-slate-700/50 flex flex-col overflow-hidden">
      <!-- Widget Header -->
      <div class="bg-gradient-to-r from-purple-500 to-pink-500 p-4 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
            <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93s3.05-7.44 7-7.93v15.86zm2-15.86c1.03.13 2 .45 2.87.93H13v-.93z"/>
            </svg>
          </div>
          <div>
            <h3 class="text-white font-semibold text-sm">AI Assistant</h3>
            <p class="text-white/70 text-xs">
              {{ isConnected ? 'Online' : 'Offline' }}
              <span class="ml-1 inline-block w-1.5 h-1.5 rounded-full" :class="{
                'bg-green-400': isConnected,
                'bg-red-400': !isConnected
              }"></span>
            </p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <router-link to="/chatbot" class="p-1 rounded text-white/70 hover:text-white hover:bg-white/20 transition-all">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/>
            </svg>
          </router-link>
          <button @click="isOpen = false" class="p-1 rounded text-white/70 hover:text-white hover:bg-white/20 transition-all">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Messages Area -->
      <div ref="miniChatContainer" class="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
        <!-- Welcome message when no conversations -->
        <div v-if="miniMessages.length === 0" class="text-center py-6">
          <div class="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg class="w-6 h-6 text-purple-500 dark:text-purple-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93s3.05-7.44 7-7.93v15.86zm2-15.86c1.03.13 2 .45 2.87.93H13v-.93z"/>
            </svg>
          </div>
          <p class="text-sm text-slate-600 dark:text-slate-400 mb-3">Xin chào! Tôi có thể giúp gì cho bạn?</p>
          <button @click="sendQuickMessage('Xin chào! Tôi cần tư vấn tài chính')" 
                  class="text-xs px-3 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-full hover:bg-purple-200 dark:hover:bg-purple-900/30 transition-all">
            Bắt đầu trò chuyện
          </button>
        </div>

        <!-- Mini Messages -->
        <div v-for="(message, index) in miniMessages" :key="index" 
             class="flex" :class="{ 'justify-end': message.role === 'user' }">
          
          <!-- User Message -->
          <div v-if="message.role === 'user'" 
               class="max-w-[200px] bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg rounded-tr-sm px-3 py-2 text-sm">
            {{ message.content }}
          </div>

          <!-- Assistant Message -->
          <div v-else class="flex gap-2 max-w-[220px]">
            <div class="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
              <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93s3.05-7.44 7-7.93v15.86zm2-15.86c1.03.13 2 .45 2.87.93H13v-.93z"/>
              </svg>
            </div>
            <div class="bg-slate-100 dark:bg-slate-700 rounded-lg rounded-tl-sm px-3 py-2 text-sm text-slate-800 dark:text-white">
              {{ message.content }}
            </div>
          </div>
        </div>

        <!-- Typing Indicator -->
        <div v-if="isMiniTyping" class="flex gap-2 max-w-[220px]">
          <div class="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
            <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93s3.05-7.44 7-7.93v15.86zm2-15.86c1.03.13 2 .45 2.87.93H13v-.93z"/>
            </svg>
          </div>
          <div class="bg-slate-100 dark:bg-slate-700 rounded-lg rounded-tl-sm px-3 py-2">
            <div class="flex space-x-1">
              <div class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
              <div class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
              <div class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Input Area -->
      <div class="p-3 border-t border-slate-200 dark:border-slate-700">
        <div class="flex gap-2">
          <input v-model="miniCurrentMessage" 
                 @keydown.enter.prevent="sendMiniMessage"
                 placeholder="Nhập tin nhắn..."
                 class="flex-1 px-3 py-2 text-sm bg-slate-100 dark:bg-slate-700 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-800 dark:text-white placeholder-slate-500 dark:placeholder-slate-400"
                 :disabled="isMiniTyping">
          <button @click="sendMiniMessage" 
                  :disabled="!miniCurrentMessage.trim() || isMiniTyping"
                  class="p-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
            <svg v-if="!isMiniTyping" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9-7-9-7-9 7 9 7z"/>
            </svg>
            <div v-else class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </button>
        </div>
      </div>
    </div>

    <!-- Toggle Button -->
    <button @click="toggleWidget" 
            class="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 flex items-center justify-center group"
            :class="{ 'rotate-45': isOpen }">
      <svg v-if="!isOpen" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93s3.05-7.44 7-7.93v15.86zm2-15.86c1.03.13 2 .45 2.87.93H13v-.93zM13 7h5.24c.25.31.48.65.68 1H13V7zm0 3h6.74c.08.33.15.66.19 1H13v-1zm0 9.93V19h2.87c-.87.48-1.84.8-2.87.93z"/>
      </svg>
      <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>

    <!-- Notification Badge -->
    <div v-if="hasNewMessage && !isOpen" class="absolute -top-1 -left-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
      {{ unreadCount }}
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted, watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import { getCategories } from '../composables/useCategoryAPI';
import { getTransactions } from '../composables/useTransactionAPI';

// Detect current route to hide widget on ChatBot page
const route = useRoute();
const isOnChatBotPage = computed(() => route.path === '/chatbot');

// Props
const props = defineProps({
  apiUrl: {
    type: String,
    default: 'http://192.168.65.1:1234/v1/chat/completions'
  },
  modelName: {
    type: String,
    default: 'google/gemma-3-12b'
  }
});

// Reactive data
const isOpen = ref(false);
const miniMessages = ref([]);
const miniCurrentMessage = ref('');
const isMiniTyping = ref(false);
const isConnected = ref(false);
const hasNewMessage = ref(false);
const unreadCount = ref(0);
const miniChatContainer = ref(null);
// Financial data
const categories = ref([]);
const transactions = ref([]);
const dataLoaded = ref(false);
const loadingData = ref(false);
const lastLoadTs = ref(0);
const contextSummary = ref('');

// Methods
const toggleWidget = () => {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    hasNewMessage.value = false;
    unreadCount.value = 0;
  }
};

const sendQuickMessage = (message) => {
  miniCurrentMessage.value = message;
  sendMiniMessage();
};

const sendMiniMessage = async () => {
  const message = miniCurrentMessage.value.trim();
  if (!message) return;

  // Ensure data loaded (lazy) before first send
  if(!dataLoaded.value && !loadingData.value){
    await loadFinancialData();
  }
  if(Date.now() - lastLoadTs.value > 5*60*1000){ // refresh after 5 minutes
    loadFinancialData(); // fire & forget
  }

  // Add user message
  miniMessages.value.push({
    role: 'user',
    content: message,
    timestamp: new Date()
  });

  miniCurrentMessage.value = '';
  isMiniTyping.value = true;
  
  // Scroll to bottom
  await nextTick();
  scrollMiniToBottom();

  try {
    // Call LM Studio API
    const response = await callMiniLMStudioAPI(message);
    
    // Add assistant response
    miniMessages.value.push({
      role: 'assistant',
      content: response,
      timestamp: new Date()
    });

    // Show notification if widget is closed
    if (!isOpen.value) {
      hasNewMessage.value = true;
      unreadCount.value += 1;
    }
  } catch (error) {
    console.error('Error calling LM Studio API:', error);
    
    // Add error message
    miniMessages.value.push({
      role: 'assistant',
      content: 'Xin lỗi, tôi không thể kết nối đến AI. Vui lòng kiểm tra kết nối.',
      timestamp: new Date()
    });
  } finally {
    isMiniTyping.value = false;
    await nextTick();
    scrollMiniToBottom();
  }
};

const callMiniLMStudioAPI = async (message) => {
  const response = await fetch(props.apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: props.modelName,
      messages: [
        { role: 'system', content: 'Bạn là trợ lý AI tài chính. Trả lời ngắn gọn (1-2 câu), thực tế, dựa trên dữ liệu cung cấp. Nếu thiếu dữ liệu hãy đề nghị mở trang phân tích chi tiết.' },
        { role: 'system', content: contextSummary.value },
        ...miniMessages.value.slice(-5), // Send last 5 messages for context
        {
          role: 'user',
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 150, // Shorter responses for mini chat
      stream: false
    })
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
};

const scrollMiniToBottom = () => {
  if (miniChatContainer.value) {
    miniChatContainer.value.scrollTop = miniChatContainer.value.scrollHeight;
  }
};

const testMiniConnection = async () => {
  try {
    const response = await fetch(props.apiUrl.replace('/chat/completions', '/models'));
    isConnected.value = response.ok;
  } catch (error) {
    isConnected.value = false;
  }
};

// Build summaries
function buildCategorySummary(list){
  if(!list.length) return 'Không có danh mục.';
  return list.slice(0,10).map((c,i)=>`#${i+1} ${c.name} (${c.type}) limit:${c.limit_amount||'--'}`).join('\n');
}
function buildTransactionSummary(list){
  if(!list.length) return 'Không có giao dịch.';
  return list.slice(-10).map(t=>`${t.name||'GD'}:${t.amount} ${t.category_id?.name||''} @${(t.date||'').toString().split('T')[0]}`).join('\n');
}
function rebuildContext(){
  contextSummary.value = `DỮ LIỆU HIỆN TẠI (rút gọn)\nDanh mục:\n${buildCategorySummary(categories.value)}\nGiao dịch gần đây:\n${buildTransactionSummary(transactions.value)}`;
}

async function loadFinancialData(){
  try{
    loadingData.value = true;
    const [catRs, txRs] = await Promise.all([getCategories().catch(()=>null), getTransactions().catch(()=>null)]);
    if(catRs?.data?.data) categories.value = catRs.data.data;
    if(txRs?.data) transactions.value = txRs.data;
    dataLoaded.value = true;
    lastLoadTs.value = Date.now();
    rebuildContext();
  }catch(e){
    console.error('Load financial data failed', e);
  }finally{ loadingData.value=false; }
}

// Auto-test connection & lazy data
onMounted(() => {
  testMiniConnection();
});

watch(isOpen, (open)=> { if(open && !dataLoaded.value) loadFinancialData(); });

// Watch for connection status
watch(() => props.apiUrl, () => {
  testMiniConnection();
});
</script>

<style lang="css" scoped>
/* Custom scrollbar for mini chat */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 2px;
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

/* Smooth transitions */
* {
  transition: all 0.2s ease;
}

/* Animation for notification badge */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
