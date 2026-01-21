import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, message } = (req.body ?? {}) as {
    name?: unknown;
    email?: unknown;
    message?: unknown;
  };

  if (!isNonEmptyString(name) || !isNonEmptyString(email) || !isNonEmptyString(message)) {
    return res.status(400).json({ error: 'Missing required fields: name, email, message' });
  }

  // Basic email sanity check (not full RFC validation)
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  const to = 'anandkumar4549@gmail.com';
  const from = process.env.RESEND_FROM;

  if (!isNonEmptyString(from)) {
    return res
      .status(500)
      .json({ error: 'Server misconfigured: RESEND_FROM environment variable is missing' });
  }

  try {
    const subject = `Portfolio message from ${name}`;

    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    if (error) {
      return res.status(500).json({ error: error.message ?? 'Failed to send email' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return res.status(500).json({ error: message });
  }
}
