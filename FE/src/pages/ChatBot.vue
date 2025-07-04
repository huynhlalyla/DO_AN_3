<template>
  <div class="relative h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
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
            <h1 class="text-xl font-bold text-slate-800 dark:text-white">AI Assistant</h1>
            <p class="text-sm text-slate-600 dark:text-slate-400">
              {{ isConnected ? 'Đang kết nối với Vistral-7B qua LM Studio (Port 1234)' : 'Chưa kết nối đến LM Studio' }}
              <span class="ml-2 inline-block w-2 h-2 rounded-full" :class="{
                'bg-green-500': isConnected,
                'bg-red-500': !isConnected
              }"></span>
            </p>
          </div>
        </div>
        
        <!-- Quick Navigation & Settings -->
        <div class="flex items-center gap-3">
          <!-- Quick Navigation Menu -->
          <div class="relative">
            <button @click="showQuickNav = !showQuickNav" 
                    class="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
            
            <!-- Quick Navigation Dropdown -->
            <div v-if="showQuickNav" class="absolute top-12 right-0 z-20 w-48 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/30 dark:border-slate-700/50 py-2">
              <router-link to="/" @click="showQuickNav = false" class="flex items-center px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all">
                <svg class="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z"/>
                </svg>
                Trang chủ
              </router-link>
              <router-link to="/transactions" @click="showQuickNav = false" class="flex items-center px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all">
                <svg class="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1z"/>
                </svg>
                Giao dịch
              </router-link>
              <router-link to="/categories" @click="showQuickNav = false" class="flex items-center px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all">
                <svg class="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15 4H9v16h6V4zm2 16h3a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-3v16z"/>
                </svg>
                Danh mục
              </router-link>
              <router-link to="/budgets" @click="showQuickNav = false" class="flex items-center px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all">
                <svg class="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
                </svg>
                Ngân sách
              </router-link>
            </div>
          </div>
          
          <!-- Connection Settings -->
          <div class="flex items-center gap-3">
            <button @click="showSettings = !showSettings" 
                    class="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </button>
            <button @click="clearChat" 
                    class="px-3 py-2 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-all duration-200 text-sm font-medium">
              Xóa chat
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Settings Panel -->
    <div v-if="showSettings" class="absolute top-16 right-6 z-10 w-80 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 dark:border-slate-700/50 p-6">
      <h3 class="text-lg font-semibold text-slate-800 dark:text-white mb-4">Cài đặt kết nối</h3>
      
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">API URL</label>
          <input v-model="apiUrl" type="text" 
                 class="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                 placeholder="http://localhost:1234/v1/chat/completions">
        </div>
        
        <div>
          <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Model</label>          <input v-model="selectedModel" type="text" 
                 class="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                 placeholder="vistral-7b-chat">
        </div>
        
        <div class="flex gap-2">
          <button @click="testConnection" 
                  class="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200">
            Test kết nối
          </button>
          <button @click="showSettings = false" 
                  class="px-4 py-2 bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-500 transition-all duration-200">
            Đóng
          </button>
        </div>
      </div>
    </div>

    <!-- Main Chat Container -->
    <div class="flex flex-col h-full pt-20 pb-6">
      <div class="flex-1 max-w-4xl mx-auto w-full px-6">
        <!-- Chat Messages -->
        <div ref="chatContainer" class="h-full overflow-y-auto custom-scrollbar space-y-4 pb-4">
          <!-- Welcome Message -->
          <div v-if="messages.length === 0" class="flex flex-col items-center justify-center h-full">
            <div class="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-full flex items-center justify-center mb-6">
              <svg class="w-10 h-10 text-purple-500 dark:text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93s3.05-7.44 7-7.93v15.86zm2-15.86c1.03.13 2 .45 2.87.93H13v-.93zM13 7h5.24c.25.31.48.65.68 1H13V7zm0 3h6.74c.08.33.15.66.19 1H13v-1zm0 9.93V19h2.87c-.87.48-1.84.8-2.87.93z"/>
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-slate-800 dark:text-white mb-4">Chào mừng đến với AI Assistant!</h2>
            <p class="text-slate-600 dark:text-slate-400 text-center mb-8 max-w-md">
              Tôi có thể giúp bạn phân tích tài chính, đưa ra lời khuyên về ngân sách và trả lời các câu hỏi về quản lý tiền bạc.
            </p>
            
            <!-- Quick Actions -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl">
              <button v-for="suggestion in quickSuggestions" :key="suggestion.text"
                      @click="sendMessage(suggestion.text)"
                      class="p-4 bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-xl border border-white/30 dark:border-slate-700/50 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-200 text-left">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path :d="suggestion.icon"/>
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-medium text-slate-800 dark:text-white">{{ suggestion.title }}</h4>
                    <p class="text-sm text-slate-600 dark:text-slate-400">{{ suggestion.description }}</p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          <!-- Messages -->
          <div v-for="(message, index) in messages" :key="index" 
               class="flex" :class="{ 'justify-end': message.role === 'user' }">
            
            <!-- User Message -->
            <div v-if="message.role === 'user'" 
                 class="max-w-xs lg:max-w-md bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl rounded-tr-md px-4 py-3 shadow-lg">
              <p class="text-sm">{{ message.content }}</p>
              <div class="text-xs opacity-70 mt-1">{{ formatTime(message.timestamp) }}</div>
            </div>

            <!-- Assistant Message -->
            <div v-else class="flex gap-3 max-w-xs lg:max-w-2xl">
              <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93s3.05-7.44 7-7.93v15.86zm2-15.86c1.03.13 2 .45 2.87.93H13v-.93zM13 7h5.24c.25.31.48.65.68 1H13V7zm0 3h6.74c.08.33.15.66.19 1H13v-1zm0 9.93V19h2.87c-.87.48-1.84.8-2.87.93z"/>
                </svg>
              </div>
              <div class="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl rounded-tl-md px-4 py-3 shadow-lg border border-white/30 dark:border-slate-700/50">
                <p class="text-sm text-slate-800 dark:text-white whitespace-pre-wrap">{{ message.content }}</p>
                <div class="text-xs text-slate-500 dark:text-slate-400 mt-1">{{ formatTime(message.timestamp) }}</div>
              </div>
            </div>
          </div>

          <!-- Typing Indicator -->
          <div v-if="isTyping" class="flex gap-3 max-w-xs lg:max-w-2xl">
            <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
              <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93s3.05-7.44 7-7.93v15.86zm2-15.86c1.03.13 2 .45 2.87.93H13v-.93zM13 7h5.24c.25.31.48.65.68 1H13V7zm0 3h6.74c.08.33.15.66.19 1H13v-1zm0 9.93V19h2.87c-.87.48-1.84.8-2.87.93z"/>
              </svg>
            </div>
            <div class="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl rounded-tl-md px-4 py-3 shadow-lg border border-white/30 dark:border-slate-700/50">
              <div class="flex space-x-1">
                <div class="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                <div class="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                <div class="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Input Area -->
      <div class="max-w-4xl mx-auto w-full px-6">
        <div class="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 dark:border-slate-700/50 p-4">
          <div class="flex gap-3">
            <div class="flex-1 relative">
              <textarea v-model="currentMessage" 
                        @keydown.enter.prevent="handleEnterKey"
                        @input="adjustTextareaHeight"
                        ref="messageInput"
                        placeholder="Nhập tin nhắn của bạn..."
                        class="w-full px-4 py-3 bg-transparent border-0 resize-none focus:outline-none text-slate-800 dark:text-white placeholder-slate-500 dark:placeholder-slate-400"
                        rows="1"
                        :disabled="isTyping"></textarea>
            </div>
            <button @click="sendMessage()" 
                    :disabled="!currentMessage.trim() || isTyping"
                    class="p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200">
              <svg v-if="!isTyping" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9-7-9-7-9 7 9 7z"/>
              </svg>
              <div v-else class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue';

// Reactive data
const messages = ref([]);
const currentMessage = ref('');
const isTyping = ref(false);
const isConnected = ref(false);
const showSettings = ref(false);
const showQuickNav = ref(false);
const apiUrl = ref('http://localhost:1234/v1/chat/completions');
const selectedModel = ref('vistral-7b-chat');
const chatContainer = ref(null);
const messageInput = ref(null);

// Quick suggestions for new users
const quickSuggestions = ref([
  {
    title: 'Phân tích tài chính',
    description: 'Phân tích chi tiêu của tôi',
    text: 'Hãy phân tích tình hình tài chính và đưa ra lời khuyên cho tôi',
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
  },
  {
    title: 'Lập kế hoạch ngân sách',
    description: 'Tạo ngân sách hàng tháng',
    text: 'Giúp tôi lập kế hoạch ngân sách cho tháng này',
    icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
  },
  {
    title: 'Lời khuyên đầu tư',
    description: 'Tư vấn về đầu tư',
    text: 'Tôi muốn bắt đầu đầu tư, bạn có lời khuyên gì không?',
    icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
  },
  {
    title: 'Tiết kiệm tiền',
    description: 'Cách tiết kiệm hiệu quả',
    text: 'Làm thế nào để tiết kiệm tiền hiệu quả hơn?',
    icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z'
  }
]);

// Methods
const sendMessage = async (messageText = null) => {
  const message = messageText || currentMessage.value.trim();
  if (!message) return;

  // Add user message
  messages.value.push({
    role: 'user',
    content: message,
    timestamp: new Date()
  });

  currentMessage.value = '';
  isTyping.value = true;
  
  // Scroll to bottom
  await nextTick();
  scrollToBottom();

  try {
    // Call LM Studio API
    const response = await callLMStudioAPI(message);
    
    // Add assistant response
    messages.value.push({
      role: 'assistant',
      content: response,
      timestamp: new Date()
    });
  } catch (error) {
    console.error('Error calling LM Studio API:', error);
    
    // Add error message
    messages.value.push({
      role: 'assistant',
      content: 'Xin lỗi, tôi không thể kết nối đến AI model. Vui lòng kiểm tra cài đặt kết nối.',
      timestamp: new Date()
    });
  } finally {
    isTyping.value = false;
    await nextTick();
    scrollToBottom();
  }
};

const callLMStudioAPI = async (message) => {
  const response = await fetch(apiUrl.value, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: selectedModel.value,
      messages: [        {
          role: 'system',
          content: 'Bạn là một trợ lí AI tên là MOOD nói tiếng Việt dùng để hỗ trợ cho trang web của tôi và chỉ hoạt động trong phạm vi đó. Bạn sẽ hỗ trợ quản lí chi tiêu cá nhân. Bạn sẽ chịu trách nhiệm thống kê và cho ý kiến về các dạng chi tiêu cũng như cảnh báo sớm các rủi ro về chi tiêu trong dự án của tôi. mô tả về sự án: - dự án quản lí chi tiêu các nhân với các chức năng như: thêm, sửa xoá giao dịch. Thêm, sửa, xoá danh mục. Báo cáo chiêu tiêu, gợi ý phương hướng tiết kiệm cũng như cảnh báo sớm các nguồn hao phí tiền bạc. - bạn có thể lên lịch trình cũng như tự động hoá việc tạo danh mục và giao dịch tự động dựa vào yêu cầu của người dùng. đôi khi bạn cũng là người giúp thống kê nhanh dữ liệu. - có thể đề nghị hướng chi tiêu tốt hơn cũng như các nguồn thu nhập tốt dựa trên dữ liệu thu - chi ở những khoảng thời gian trước.'
        },
        ...messages.value.slice(-10), // Send last 10 messages for context
        {
          role: 'user',
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
      stream: false
    })
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
};

const testConnection = async () => {
  try {
    const response = await fetch(apiUrl.value.replace('/chat/completions', '/models'));
    if (response.ok) {
      const data = await response.json();
      isConnected.value = true;
      
      // Update model list if available
      if (data.data && data.data.length > 0) {
        selectedModel.value = data.data[0].id;
      }
    } else {
      throw new Error('Connection failed');
    }
  } catch (error) {
    isConnected.value = false;
  }
};

const clearChat = () => {
  if (confirm('Bạn có chắc chắn muốn xóa toàn bộ cuộc trò chuyện?')) {
    messages.value = [];
  }
};

const handleEnterKey = (event) => {
  if (event.shiftKey) {
    // Allow new line with Shift+Enter
    return;
  } else {
    // Send message with Enter
    event.preventDefault();
    sendMessage();
  }
};

const adjustTextareaHeight = () => {
  const textarea = messageInput.value;
  if (textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
  }
};

const scrollToBottom = () => {
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
  }
};

const formatTime = (timestamp) => {
  return new Intl.DateTimeFormat('vi-VN', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(timestamp);
};

const goBack = () => {
  window.history.back();
};

// Auto-test connection on mount
onMounted(() => {
  testConnection();
});
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
