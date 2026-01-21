import { Mail, Phone, Linkedin, Github, MapPin, Send } from 'lucide-react';
import { useState } from 'react';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const contactInfo = [
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 7004227948',
      href: 'tel:+917004227948',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'Get in touch',
      href: 'oindrilamondal9102@gmail.com',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'Connect with me',
      href: 'https://www.linkedin.com/in/oindrila-mondall-296421206/',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Gurugram, India',
      href: '#',
    },
  ];

  return (
    <section id="contact" className="min-h-screen flex items-center py-24 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            Let's <span className="text-yellow-400">Connect</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Open to Product Management opportunities and exciting collaborations
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="space-y-6 mb-12">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.href}
                  className="flex items-center space-x-6 p-6 bg-zinc-900 rounded-2xl hover:bg-zinc-800 transition-all duration-300 group hover:scale-105"
                >
                  <div className="w-14 h-14 bg-yellow-400/10 rounded-xl flex items-center justify-center group-hover:bg-yellow-400/20 transition-colors duration-300">
                    <info.icon size={24} className="text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">{info.label}</p>
                    <p className="text-lg font-semibold group-hover:text-yellow-400 transition-colors duration-300">
                      {info.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            <div className="bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-3xl font-black text-yellow-400 mb-2">1.5+</p>
                  <p className="text-sm text-gray-400">Years Experience</p>
                </div>
                <div>
                  <p className="text-3xl font-black text-yellow-400 mb-2">10+</p>
                  <p className="text-sm text-gray-400">Projects Delivered</p>
                </div>
                <div>
                  <p className="text-3xl font-black text-yellow-400 mb-2">2</p>
                  <p className="text-sm text-gray-400">PM Certifications</p>
                </div>
                <div>
                  <p className="text-3xl font-black text-yellow-400 mb-2">100%</p>
                  <p className="text-sm text-gray-400">Commitment</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 rounded-2xl p-8 md:p-12">
            <h3 className="text-3xl font-bold mb-8">Send a Message</h3>
            <form
              className="space-y-6"
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
                  setErrorMessage(err instanceof Error ? err.message : 'Failed to send message');
                } finally {
                  setIsSending(false);
                }
              }}
            >
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-400">
                  Your Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-black border border-zinc-800 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors duration-300 text-white"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-400">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-black border border-zinc-800 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors duration-300 text-white"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-400">
                  Message
                </label>
                <textarea
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 bg-black border border-zinc-800 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors duration-300 text-white resize-none"
                  placeholder="Tell me about your project or opportunity..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="w-full bg-yellow-400 text-black font-bold py-4 rounded-lg hover:bg-yellow-300 transition-colors duration-300 flex items-center justify-center space-x-2 group disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <span>{isSending ? 'Sending...' : 'Send Message'}</span>
                <Send
                  size={20}
                  className="group-hover:translate-x-1 transition-transform duration-300"
                />
              </button>

              {status === 'success' && (
                <p className="text-sm text-green-400">Message sent successfully.</p>
              )}

              {status === 'error' && (
                <p className="text-sm text-red-400">{errorMessage ?? 'Failed to send message.'}</p>
              )}
            </form>
          </div>
        </div>

        <footer className="mt-24 pt-12 border-t border-zinc-800 text-center">
          <p className="text-gray-400 mb-4">
            Designed & Built with passion for great products
          </p>
          <p className="text-sm text-gray-600">
            © 2026 Oindrila Mondal. All rights reserved.
          </p>
        </footer>
      </div>
    </section>
  );
};

export default Contact;
