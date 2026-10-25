import fs from 'node:fs';
import path from 'node:path';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Serves api/*.ts serverless functions during `vite dev`, mimicking Vercel's
// JSON body parsing and res.status().json(), so no Vercel CLI is needed locally.
function vercelApiDev(): Plugin {
  return {
    name: 'vercel-api-dev',
    apply: 'serve',
    configureServer(server) {
      const env = loadEnv(server.config.mode, server.config.envDir || server.config.root, '');
      for (const [key, value] of Object.entries(env)) process.env[key] ??= value;

      server.middlewares.use('/api', async (req, res, next) => {
        const url = new URL(req.url ?? '/', 'http://localhost');
        const name = url.pathname.slice(1);
        const file = path.join(server.config.root, 'api', `${name}.ts`);
        if (!/^[\w-]+$/.test(name) || !fs.existsSync(file)) return next();

        const chunks: Buffer[] = [];
        for await (const chunk of req) chunks.push(chunk as Buffer);
        const raw = Buffer.concat(chunks).toString();
        let body: unknown;
        try {
          body = raw && req.headers['content-type']?.includes('application/json') ? JSON.parse(raw) : raw;
        } catch {
          res.statusCode = 400;
          return res.end('Invalid JSON body');
        }

        const vercelReq = Object.assign(req, {
          body,
          query: Object.fromEntries(url.searchParams),
          cookies: {},
        }) as unknown as VercelRequest;
        const vercelRes = Object.assign(res, {
          status(code: number) {
            res.statusCode = code;
            return vercelRes;
          },
          json(data: unknown) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data));
            return vercelRes;
          },
        }) as unknown as VercelResponse;

        try {
          const mod = await server.ssrLoadModule(file);
          await mod.default(vercelReq, vercelRes);
        } catch (err) {
          if (err instanceof Error) server.ssrFixStacktrace(err);
          console.error(err);
          if (!res.headersSent) {
            res.statusCode = 500;
            res.end('Internal Server Error');
          }
        }
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vercelApiDev()],
  optimizeDeps: {
    include: ['lucide-react'],
  },
});
