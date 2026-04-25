import { Github, Linkedin, Mail, MapPin, Phone, Send, Sparkles } from 'lucide-react';
import { useState } from 'react';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const contacts = [
    {
      icon: Mail,
      label: 'Email',
      value: 'anandkumar4549@gmail.com',
      href: 'mailto:anandkumar4549@gmail.com',
      accent: 'cyan',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 8210014035',
      href: 'tel:+918210014035',
      accent: 'violet',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'in/anand-kumar-591431211',
      href: 'https://www.linkedin.com/in/anand-kumar-591431211/',
      accent: 'lime',
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'github.com/mr-andyyy',
      href: 'https://github.com/mr-andyyy',
      accent: 'amber',
    },
    {
      icon: MapPin,
      label: 'Based in',
      value: 'Gurugram, India',
      href: '#',
      accent: 'cyan',
    },
  ] as const;

  const accentText = (a: string) =>
    a === 'cyan'
      ? 'text-neon-cyan'
      : a === 'violet'
      ? 'text-neon-violet'
      : a === 'lime'
      ? 'text-neon-lime'
      : 'text-amber-300';
  const accentBg = (a: string) =>
    a === 'cyan'
      ? 'bg-neon-cyan/10'
      : a === 'violet'
      ? 'bg-neon-violet/10'
      : a === 'lime'
      ? 'bg-neon-lime/10'
      : 'bg-amber-400/10';

  return (
    <section id="contact" className="relative py-32 px-6 lg:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-20">
          <div className="reveal font-mono text-xs tracking-widest uppercase text-neon-cyan mb-4">
            // 06 — let's connect
          </div>
          <h2 className="reveal reveal-delay-1 font-display text-5xl md:text-7xl font-bold mb-5">
            Got an idea? <span className="text-gradient">Let's build it.</span>
          </h2>
          <p className="reveal reveal-delay-2 text-zinc-400 max-w-2xl mx-auto text-lg">
            Always open to interesting problems, full-time roles, freelance, or just a
            good engineering chat.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10">
          {/* LEFT — info + stats */}
          <div className="space-y-4">
            {contacts.map((c, i) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                data-cursor="hover"
                className={`reveal reveal-delay-${(i % 5) + 1} group flex items-center gap-5 p-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.04] transition-all`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${accentBg(
                    c.accent
                  )} ${accentText(c.accent)} group-hover:scale-110 transition-transform`}
                >
                  <c.icon size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-[10px] tracking-widest uppercase text-zinc-500">
                    {c.label}
                  </div>
                  <div className="text-base font-semibold truncate group-hover:text-white transition-colors">
                    {c.value}
                  </div>
                </div>
                <Send
                  size={16}
                  className="text-zinc-600 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
                />
              </a>
            ))}

            <div className="reveal grad-border p-6 mt-2">
              <h3 className="font-display text-lg font-bold mb-4 flex items-center gap-2">
                <Sparkles size={16} className="text-neon-lime" />
                At a glance
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <Stat value="2+" label="Yrs Building" accent="cyan" />
                <Stat value="20+" label="Apps Integrated" accent="violet" />
                <Stat value="2203" label="Max Rating" accent="amber" />
              </div>
            </div>
          </div>

          {/* RIGHT — form */}
          <div className="reveal grad-border p-8 md:p-10 relative overflow-hidden">
            <div className="absolute -top-32 -right-32 w-72 h-72 rounded-full bg-neon-cyan blur-3xl opacity-10" />
            <div className="absolute -bottom-32 -left-32 w-72 h-72 rounded-full bg-neon-violet blur-3xl opacity-10" />
            <h3 className="relative font-display text-3xl font-bold mb-2">Send a message</h3>
            <p className="relative text-zinc-400 mb-8 text-sm">
              I usually respond within 24 hours.
            </p>

            <form
              className="relative space-y-5"
              onSubmit={async (e) => {
                e.preventDefault();
                setIsSending(true);
                setStatus('idle');
                setErrorMessage(null);
                try {
                  const resp = await fetch('/api/send-email', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, message }),
                  });
                  const data = (await resp.json().catch(() => null)) as
                    | { ok?: boolean; error?: string }
                    | null;
                  if (!resp.ok) {
                    throw new Error(data?.error || 'Failed to send message');
                  }
                  setStatus('success');
                  setName('');
                  setEmail('');
                  setMessage('');
                } catch (err) {
                  setStatus('error');
                  setErrorMessage(
                    err instanceof Error ? err.message : 'Failed to send message'
                  );
                } finally {
                  setIsSending(false);
                }
              }}
            >
              <Field
                label="Your name"
                input={
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg focus:border-neon-cyan/70 focus:outline-none focus:ring-1 focus:ring-neon-cyan/30 transition-all text-white placeholder-zinc-600"
                    placeholder="Ada Lovelace"
                  />
                }
              />
              <Field
                label="Email"
                input={
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg focus:border-neon-violet/70 focus:outline-none focus:ring-1 focus:ring-neon-violet/30 transition-all text-white placeholder-zinc-600"
                    placeholder="ada@compute.dev"
                  />
                }
              />
              <Field
                label="Message"
                input={
                  <textarea
                    rows={6}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg focus:border-neon-lime/70 focus:outline-none focus:ring-1 focus:ring-neon-lime/30 transition-all text-white placeholder-zinc-600 resize-none"
                    placeholder="Tell me about the project, the role, or the problem you're chewing on…"
                  />
                }
              />

              <button
                type="submit"
                disabled={isSending}
                data-cursor="hover"
                className="w-full relative overflow-hidden rounded-lg font-semibold py-4 bg-gradient-to-r from-neon-cyan via-neon-violet to-neon-lime bg-[length:200%_200%] animate-gradient-x text-black flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed group"
              >
                <span>{isSending ? 'Sending…' : 'Fire away'}</span>
                <Send
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>

              {status === 'success' && (
                <p className="text-sm text-neon-lime font-mono">
                  ✓ Message delivered. Talk soon.
                </p>
              )}
              {status === 'error' && (
                <p className="text-sm text-red-400 font-mono">
                  ✗ {errorMessage ?? 'Failed to send message.'}
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-24 pt-10 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="font-mono text-xs text-zinc-500">
              <span className="text-neon-cyan">{'<'}</span>
              built with React · Tailwind · too much coffee
              <span className="text-neon-violet">{' />'}</span>
            </div>
            <div className="font-mono text-xs text-zinc-600">
              © {new Date().getFullYear()} Anand Kumar — all wrongs reversed.
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
};

const Field = ({ label, input }: { label: string; input: React.ReactNode }) => (
  <div>
    <label className="block font-mono text-[11px] tracking-widest uppercase mb-2 text-zinc-500">
      {label}
    </label>
    {input}
  </div>
);

const Stat = ({
  value,
  label,
  accent,
}: {
  value: string;
  label: string;
  accent: 'cyan' | 'violet' | 'lime' | 'amber';
}) => (
  <div>
    <div
      className={`font-display text-2xl font-bold ${
        accent === 'cyan'
          ? 'text-neon-cyan'
          : accent === 'violet'
          ? 'text-neon-violet'
          : accent === 'lime'
          ? 'text-neon-lime'
          : 'text-amber-300'
      }`}
    >
      {value}
    </div>
    <div className="font-mono text-[10px] tracking-widest uppercase text-zinc-500 mt-1">
      {label}
    </div>
  </div>
);

export default Contact;
