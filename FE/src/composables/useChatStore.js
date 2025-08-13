import { reactive, toRefs } from 'vue';
import axios from 'axios';

const STORAGE_KEY = 'chatbot:lastConversation';
let hydrated = false;

const state = reactive({
  chatMemories: [],
  loading: false,
});

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.chatMemories));
  } catch (_) { /* ignore */ }
}

function hydrateIfNeeded() {
  if (hydrated) return;
  hydrated = true;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        state.chatMemories = parsed;
      }
    }
  } catch (_) { /* ignore */ }
}

function clear() {
  state.chatMemories = [];
  try { localStorage.removeItem(STORAGE_KEY); } catch (_) { /* ignore */ }
}

async function sendChat({ url, model, baseContext, message }) {
  if (!message || state.loading) return;
  hydrateIfNeeded();
  state.chatMemories.push({ role: 'user', content: message });
  persist();
  state.loading = true;
  try {
    const history = state.chatMemories.slice(-12).map(m => ({ role: m.role, content: m.content }));
  const response = await axios.post(url, {
      model,
      messages: [
    { role: 'system', content: 'Bạn là một trợ lý AI tài chính. Luôn dùng dữ liệu cung cấp để phân tích & đề xuất. Nếu thiếu dữ liệu hãy hỏi lại.' },
    { role: 'system', content: 'QUY TẮC TRẢ LỜI: Luôn trả lời 100% bằng tiếng Việt (không pha tiếng Anh). Trình bày gọn gàng, dễ đọc với cấu trúc rõ ràng. Ưu tiên dùng tiêu đề ngắn và danh sách gạch đầu dòng. Định dạng mẫu:\n\n1) Tóm tắt ngắn (1-2 câu)\n2) Số liệu chính\n- ...\n- ...\n3) Phân tích nhanh\n- ...\n4) Khuyến nghị/Hành động\n- ...\n\nYêu cầu: dùng đơn vị tiền tệ VND (ví dụ: 1.234.567 ₫), ngày tháng định dạng YYYY-MM-DD khi cần, tránh đoạn dài khó đọc.' },
        { role: 'system', content: baseContext || '' },
        ...history,
      ],
      temperature: 0.7,
      max_tokens: -1,
      stream: false,
    });
    if (response && response.data) {
      state.chatMemories.push({ role: 'assistant', content: response.data.choices?.[0]?.message?.content || '...' });
    } else {
      state.chatMemories.push({ role: 'assistant', content: 'Không nhận được phản hồi từ máy chủ AI.' });
    }
  } catch (e) {
    state.chatMemories.push({ role: 'assistant', content: 'Đã xảy ra lỗi khi gọi AI.' });
  } finally {
    state.loading = false;
    persist();
  }
}

export function useChatStore() {
  return {
    ...toRefs(state),
    sendChat,
    clear,
    hydrateIfNeeded,
  };
}
