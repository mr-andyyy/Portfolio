import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, Bot, User } from 'lucide-react';

/* ─── Quick questions ─── */
const QUICK_QUESTIONS = [
  'Tell me about Anand',
  "What projects has Anand built?",
  'Tell me about his work experience',
  "What's his tech stack?",
  'How can I contact Anand?',
  'How can I support Anand?',
  'Tell me about his CP achievements',
];

/* ─── Chat API (serverless proxy in api/chat.ts keeps the Groq key off the client) ─── */
type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

async function askAssistant(
  message: string,
  history: ChatMessage[]
): Promise<string> {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history }),
  });

  const data = await response.json().catch(() => null);
  if (!response.ok || typeof data?.reply !== 'string') {
    throw new Error(`Chat API error: ${response.status} ${data?.error ?? ''}`);
  }
  return data.reply;
}

/* ─── Minimal markdown → HTML (escapes first so model output can't inject markup) ─── */
function renderMarkdown(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(
      /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" class="underline underline-offset-2">$1</a>'
    )
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br/>');
}

/* ─── Types ─── */
type Message = {
  id: number;
  text: string;
  sender: 'user' | 'bot';
};

/* ─── Component ─── */
const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      text: "Hey! 👋 I'm Anand's AI assistant. Ask me anything — about his projects, skills, experience, or even general questions!",
      sender: 'bot',
    },
  ]);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSend = async (text?: string) => {
    const msg = (text || input).trim();
    if (!msg || isTyping) return;

    const userMsg: Message = { id: Date.now(), text: msg, sender: 'user' };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const reply = await askAssistant(msg, chatHistory);

      // Update conversation history
      setChatHistory((prev) => [
        ...prev,
        { role: 'user', content: msg },
        { role: 'assistant', content: reply },
      ]);

      const botMsg: Message = { id: Date.now() + 1, text: reply, sender: 'bot' };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      const errorMsg: Message = {
        id: Date.now() + 1,
        text: "Oops, I'm having trouble connecting right now. 😅 You can reach Anand directly at **anandkumar4549@gmail.com** or try again in a moment!",
        sender: 'bot',
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Chat window */}
      <div
        className={`fixed bottom-24 right-6 z-[150] w-[380px] max-w-[calc(100vw-2rem)] transition-all duration-300 ${isOpen
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
      >
        <div className="rounded-2xl border border-[var(--chat-border)] bg-[var(--chat-bg)] backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col" style={{ height: '520px' }}>
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--chat-border)] bg-[var(--chat-header)]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-neon-cyan via-neon-violet to-neon-lime flex items-center justify-center">
                <Bot size={18} className="text-black" />
              </div>
              <div>
                <div className="font-display text-sm font-bold text-[var(--chat-text)]">Anand's Assistant</div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />
                  <span className="font-mono text-[10px] text-[var(--chat-muted)]">Online</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              data-cursor="hover"
              className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[var(--chat-hover)] transition-colors text-[var(--chat-muted)] hover:text-[var(--chat-text)]"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin" data-lenis-prevent>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center ${msg.sender === 'bot'
                    ? 'bg-gradient-to-br from-neon-cyan to-neon-violet'
                    : 'bg-gradient-to-br from-neon-lime to-neon-cyan'
                    }`}
                >
                  {msg.sender === 'bot' ? (
                    <Bot size={14} className="text-black" />
                  ) : (
                    <User size={14} className="text-black" />
                  )}
                </div>
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl text-[13px] leading-relaxed ${msg.sender === 'bot'
                    ? 'bg-[var(--chat-bot-bg)] text-[var(--chat-text)] rounded-tl-md'
                    : 'bg-gradient-to-r from-neon-cyan to-neon-violet text-black font-medium rounded-tr-md'
                    }`}
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.text) }}
                />
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5">
                <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-neon-cyan to-neon-violet">
                  <Bot size={14} className="text-black" />
                </div>
                <div className="bg-[var(--chat-bot-bg)] px-4 py-3 rounded-2xl rounded-tl-md">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--chat-muted)] animate-bounce [animation-delay:0ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--chat-muted)] animate-bounce [animation-delay:150ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--chat-muted)] animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick questions */}
          {messages.length <= 1 && (
            <div className="px-4 pb-3">
              <div className="flex items-center gap-1.5 mb-2">
                <Sparkles size={12} className="text-neon-violet" />
                <span className="font-mono text-[10px] text-[var(--chat-muted)] uppercase tracking-widest">Quick questions</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {QUICK_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSend(q)}
                    data-cursor="hover"
                    className="font-mono text-[10px] px-2.5 py-1.5 rounded-full border border-[var(--chat-chip-border)] bg-[var(--chat-chip-bg)] text-[var(--chat-chip-text)] hover:border-neon-cyan/50 hover:text-neon-cyan transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="px-4 py-3 border-t border-[var(--chat-border)]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={1000}
                placeholder="Ask me anything..."
                className="flex-1 bg-[var(--chat-input-bg)] border border-[var(--chat-border)] rounded-xl px-4 py-2.5 text-[13px] text-[var(--chat-text)] placeholder-[var(--chat-muted)] focus:outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/20 transition-all"
              />
              <button
                type="submit"
                data-cursor="hover"
                disabled={!input.trim() || isTyping}
                className="w-10 h-10 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-violet flex items-center justify-center text-black hover:shadow-glow transition-shadow disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        data-cursor="hover"
        className={`fixed bottom-6 right-6 z-[150] w-14 h-14 rounded-full flex items-center justify-center shadow-glow transition-all duration-300 ${isOpen
          ? 'bg-[var(--chat-header)] border border-[var(--chat-border)] rotate-0'
          : 'bg-gradient-to-r from-neon-cyan via-neon-violet to-neon-lime bg-[length:200%_200%] animate-gradient-x hover:shadow-glow-violet'
          }`}
        aria-label="Chat with Anand's AI assistant"
      >
        {isOpen ? (
          <X size={22} className="text-[var(--chat-text)]" />
        ) : (
          <MessageCircle size={22} className="text-black" />
        )}
      </button>
    </>
  );
};

export default Chatbot;
