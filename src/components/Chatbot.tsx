import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, Bot, User } from 'lucide-react';

/* ─── Anand's complete profile (system context) ─── */
const SYSTEM_PROMPT = `You are Anand Kumar's personal AI assistant embedded on his portfolio website. You speak in a friendly, concise, professional tone. Use markdown bold (**text**) for emphasis. Use emojis sparingly but effectively.

IMPORTANT RULES:
- You MUST answer questions about Anand using the information below.
- For general/unrelated questions (like "write a paragraph on cow"), politely answer briefly and then redirect to Anand's portfolio: "By the way, if you'd like to know about Anand's work, just ask!"
- Never make up information about Anand that isn't provided below.
- Keep responses concise (2-4 short paragraphs max). Use bullet points for lists.
- If asked "who are you", say you're Anand's AI portfolio assistant.

═══ ABOUT ANAND ═══
Anand Kumar is a Software Developer currently working at OptyStack Tech Pvt Ltd in Gurugram, India. He graduated from NIT Jamshedpur in 2024 with a B.Tech in Electronics & Communication (CGPA 8.0). He's passionate about building production-grade SaaS, full-stack web apps, competitive programming, and mobile development with Flutter. He was an NSS Event Management Lead and TEDx Bistupur volunteer.

═══ WORK EXPERIENCE ═══
1. Software Developer at OptyStack Tech Pvt Ltd (Aug 2025 — Present, Gurugram, Haryana)
   - Building a multi-tenant SaaS Management Dashboard on Next.js App Router with Prisma + PostgreSQL
   - Integrated 20+ enterprise apps (Google Workspace, Okta, Dropbox, etc.) for unified user/access management with alerts and reporting
   - Architected AWS backend services across EC2, Lambda, EventBridge, and Parameter Store
   - Owned a custom GitHub Actions CI/CD pipeline for repeatable, automated deploys

2. Software Development Engineer at NetNXT Network (Mar 2025 — Jul 2025, Gurugram, Haryana)
   - Shipped frontend features and REST integrations on the company website using Next.js + Express + MongoDB
   - Built a parameter-based cost calculator tool supporting multiple service tiers
   - Crafted dynamic, interactive UI components with smooth data fetching and state

═══ PROJECTS ═══
1. SaaS Management Dashboard (OptyStack · Production) — Multi-tenant access-management platform with 20+ enterprise app integrations, custom RBAC, alert workflows, AWS-native backend. Tech: Next.js, Prisma, PostgreSQL, AWS, GitHub Actions. LIVE in production.

2. Milk & Muse PoS — Multi-platform Point of Sale ecosystem:
   - Android App: Flutter-based for in-store ops — orders, thermal printing (Bluetooth/USB/Network via ESC/POS), coupons, offline support. State mgmt with Riverpod. Local SQLite DB synced via PowerSync.
   - Web Dashboard: React + Fastify for owners — analytics, catalog, store config. Drizzle ORM + PostgreSQL.
   - Offline-first sync via PowerSync. Multi-tenant, multi-store data scoping.
   Tech: Flutter, Dart, Riverpod, PowerSync, SQLite, React, Fastify, Drizzle ORM, PostgreSQL.

3. CryptoNewz — Real-time crypto portfolio tracker. 100+ coins, live prices, charts, curated news. Tech: React, Redux Toolkit, ChartJS, Ant Design, RapidAPI.
   Live: https://anand-cryptonewz.netlify.app/ | Code: https://github.com/mr-andyyy/CryptoNewz

4. Travel Blog — Full-stack blogging platform with JWT auth, image uploads, role-aware routes, Material UI. Tech: Next.js, Node.js, Express, PostgreSQL, Material UI.
   Live: https://anand-travel-blog.netlify.app/ | Code: https://github.com/mr-andyyy/travel-blog

5. Cost Calculator Engine (NetNXT · Internal) — Multi-service pricing calculator with parameter-driven tiers used by sales for instant client quotes.

═══ TECH STACK ═══
Languages: C++, TypeScript, JavaScript, Python, Dart, HTML/CSS, SQL
Frontend: Next.js (App Router), React.js, Redux Toolkit, Tailwind CSS, Material UI, Ant Design
Backend: Node.js, Express.js, Fastify, Prisma ORM, Drizzle ORM, REST APIs
Databases: PostgreSQL, MongoDB, SQLite, PowerSync
Cloud/DevOps: AWS EC2, AWS Lambda, EventBridge, Parameter Store, Docker, GitHub Actions CI/CD
Mobile: Flutter, Dart, Riverpod, PowerSync, ESC/POS Printing
ML/AI: PyTorch, TensorFlow, NumPy/Pandas
Tooling: Git/GitHub, VS Code, Postman, Vite, Vercel

═══ COMPETITIVE PROGRAMMING ═══
- CodeChef: 6★ (Rating 2203) — Global Rank 19 in Starters 160 (Div 1). Profile: https://www.codechef.com/users/dedh00ma
- LeetCode: Guardian (Rating 2123) — Global #228, India Rank 23 in Weekly 354. Profile: https://leetcode.com/u/dedhooma/
- Codeforces: Expert (Rating 1620) — Global Rank 69 in Round 981 (Div 3). Profile: https://codeforces.com/profile/dedhooma.xd
- GeeksforGeeks: Coding Score 2833 — Global Rank #7 in Weekly Contest 113, Institute Rank 30. Profile: https://www.geeksforgeeks.org/profile/anandkumar4549
- Member of Competitive Programming Team at SECE, NIT Jamshedpur

═══ CONTACT ═══
Email: anandkumar4549@gmail.com
Phone: +91 8210014035
LinkedIn: https://www.linkedin.com/in/anand-kumar-591431211/
GitHub: https://github.com/mr-andyyy
Location: Gurugram, India
Status: Open to opportunities (full-time, freelance, collaborations)`;

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

/* ─── Groq API (OpenAI-compatible) ─── */
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';

type ChatMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

async function callGroq(
  userMessage: string,
  history: ChatMessage[]
): Promise<string> {
  const messages: ChatMessage[] = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...history,
    { role: 'user', content: userMessage },
  ];

  const response = await fetch(GROQ_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'llama-3.1-8b-instant',
      messages,
      temperature: 0.7,
      max_tokens: 512,
    }),
  });

  if (!response.ok) {
    throw new Error(`Groq API error: ${response.status}`);
  }

  const data = await response.json();
  const text = data?.choices?.[0]?.message?.content;
  if (!text) throw new Error('Empty response from Groq');
  return text;
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
      const reply = await callGroq(msg, chatHistory);

      // Update conversation history
      setChatHistory((prev) => [
        ...prev,
        { role: 'user', content: msg },
        { role: 'assistant', content: reply },
      ]);

      const botMsg: Message = { id: Date.now() + 1, text: reply, sender: 'bot' };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error('Groq API error:', err);
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
        className={`fixed bottom-24 right-6 z-[150] w-[380px] max-w-[calc(100vw-2rem)] transition-all duration-300 ${
          isOpen
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
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center ${
                    msg.sender === 'bot'
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
                  className={`max-w-[80%] px-4 py-3 rounded-2xl text-[13px] leading-relaxed ${
                    msg.sender === 'bot'
                      ? 'bg-[var(--chat-bot-bg)] text-[var(--chat-text)] rounded-tl-md'
                      : 'bg-gradient-to-r from-neon-cyan to-neon-violet text-black font-medium rounded-tr-md'
                  }`}
                  dangerouslySetInnerHTML={{
                    __html: msg.text
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/\n/g, '<br/>'),
                  }}
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
        className={`fixed bottom-6 right-6 z-[150] w-14 h-14 rounded-full flex items-center justify-center shadow-glow transition-all duration-300 ${
          isOpen
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
