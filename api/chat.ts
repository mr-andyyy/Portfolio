import type { VercelRequest, VercelResponse } from '@vercel/node';

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
   - Integrated 50+ enterprise apps (Google Workspace, Okta, Dropbox, etc.) for unified user/access management with alerts and reporting
   - Architected AWS backend services across EC2, Lambda, EventBridge, and Parameter Store
   - Owned a custom GitHub Actions CI/CD pipeline for repeatable, automated deploys

2. Software Development Engineer at NetNXT Network (Mar 2025 — Jul 2025, Gurugram, Haryana)
   - Shipped frontend features and REST integrations on the company website using Next.js + Express + MongoDB
   - Built a parameter-based cost calculator tool supporting multiple service tiers
   - Crafted dynamic, interactive UI components with smooth data fetching and state

═══ PROJECTS ═══
1. SaaS Management Dashboard (OptyStack · Production) — Multi-tenant access-management platform with 50+ enterprise app integrations, custom RBAC, alert workflows, AWS-native backend. Tech: Next.js, Prisma, PostgreSQL, AWS, GitHub Actions. LIVE in production.

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

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL = 'openai/gpt-oss-20b';
const MAX_MESSAGE_CHARS = 1000;
const MAX_HISTORY_MESSAGES = 12;
const MAX_HISTORY_MESSAGE_CHARS = 4000;

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

// Only user/assistant turns are accepted so callers can't override the system prompt
function isChatMessage(value: unknown): value is ChatMessage {
  if (typeof value !== 'object' || value === null) return false;
  const { role, content } = value as Record<string, unknown>;
  return (role === 'user' || role === 'assistant') && typeof content === 'string';
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!isNonEmptyString(apiKey)) {
    return res
      .status(500)
      .json({ error: 'Server misconfigured: GROQ_API_KEY environment variable is missing' });
  }

  const { message, history = [] } = (req.body ?? {}) as {
    message?: unknown;
    history?: unknown;
  };

  if (!isNonEmptyString(message)) {
    return res.status(400).json({ error: 'Missing required field: message' });
  }
  if (message.length > MAX_MESSAGE_CHARS) {
    return res.status(400).json({ error: `Message must be ${MAX_MESSAGE_CHARS} characters or fewer` });
  }
  if (!Array.isArray(history) || !history.every(isChatMessage)) {
    return res.status(400).json({ error: 'Invalid history' });
  }

  const recentHistory = history.slice(-MAX_HISTORY_MESSAGES).map((m) => ({
    role: m.role,
    content: m.content.slice(0, MAX_HISTORY_MESSAGE_CHARS),
  }));

  try {
    const groqRes = await fetch(GROQ_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        reasoning_effort: 'low',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...recentHistory,
          { role: 'user', content: message },
        ],
        temperature: 0.7,
        max_tokens: 512,
      }),
    });

    if (!groqRes.ok) {
      const detail = await groqRes.text().catch(() => '');
      console.error(`Groq API error: ${groqRes.status} ${detail}`);
      return res.status(502).json({ error: 'AI service request failed' });
    }

    const data = (await groqRes.json()) as {
      choices?: { message?: { content?: unknown } }[];
    };
    const reply = data.choices?.[0]?.message?.content;
    if (!isNonEmptyString(reply)) {
      return res.status(502).json({ error: 'Empty response from AI service' });
    }

    return res.status(200).json({ reply });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return res.status(500).json({ error: message });
  }
}
