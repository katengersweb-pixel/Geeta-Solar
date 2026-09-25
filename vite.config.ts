import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import type { Plugin } from 'vite';
import type { IncomingMessage, ServerResponse } from 'http';
import Busboy from 'busboy';

// Local development in-memory state
let devAuthenticated = false;
let devHeroImage =
  'https://images.unsplash.com/photo-1509391365360-2e959784a276?q=80&w=1200&auto=format&fit=crop';
let devUpdatedAt: string | null = null;
const ADMIN_PASSWORDS = [
  process.env.ADMIN_PASSWORD_1 || process.env.ADMIN_PASSWORD || 'Geeta@Admin2026',
  process.env.ADMIN_PASSWORD_2 || 'Geeta@AdminTwo2026',
];

function localDevApiPlugin(): Plugin {
  return {
    name: 'local-dev-api-middleware',
    configureServer(server) {
      server.middlewares.use((req: IncomingMessage, res: ServerResponse, next) => {
        const url = req.url || '';

        // 1. Auth Endpoint: /api/auth
        if (url.startsWith('/api/auth')) {
          res.setHeader('Content-Type', 'application/json');

          if (req.method === 'GET' || url.includes('action=session')) {
            res.statusCode = 200;
            res.end(JSON.stringify({ authenticated: devAuthenticated }));
            return;
          }

          if (req.method === 'POST') {
            let bodyStr = '';
            req.on('data', (chunk) => {
              bodyStr += chunk;
            });
            req.on('end', () => {
              try {
                const body = JSON.parse(bodyStr || '{}');
                if (body.action === 'logout') {
                  devAuthenticated = false;
                  res.statusCode = 200;
                  res.end(JSON.stringify({ success: true, authenticated: false, message: 'Logged out' }));
                  return;
                }

                if (ADMIN_PASSWORDS.includes(body.password)) {
                  devAuthenticated = true;
                  res.statusCode = 200;
                  res.end(JSON.stringify({ success: true, authenticated: true, message: 'Admin authentication successful' }));
                  return;
                }

                res.statusCode = 401;
                res.end(JSON.stringify({ success: false, error: 'Incorrect admin password. Please try again.' }));
              } catch {
                res.statusCode = 400;
                res.end(JSON.stringify({ success: false, error: 'Invalid JSON request' }));
              }
            });
            return;
          }
        }

        // 2. Hero Image Endpoint: /api/hero-image
        if (url.startsWith('/api/hero-image')) {
          res.setHeader('Content-Type', 'application/json');

          if (req.method === 'GET') {
            res.statusCode = 200;
            res.end(
              JSON.stringify({
                key: 'hero-image',
                url: devHeroImage,
                updatedAt: devUpdatedAt,
                isDefault: devUpdatedAt === null,
              })
            );
            return;
          }

          if (req.method === 'POST') {
            if (!devAuthenticated) {
              res.statusCode = 401;
              res.end(JSON.stringify({ success: false, error: 'Unauthorized: Admin authentication required.' }));
              return;
            }

            const contentType = req.headers['content-type'] || '';
            if (!contentType.includes('multipart/form-data')) {
              res.statusCode = 400;
              res.end(JSON.stringify({ success: false, error: 'Content-Type must be multipart/form-data' }));
              return;
            }

            const bb = Busboy({ headers: req.headers, limits: { fileSize: 5 * 1024 * 1024 } });
            const chunks: Buffer[] = [];
            let mimeType = 'image/jpeg';

            bb.on('file', (_name, file, info) => {
              mimeType = info.mimeType || 'image/jpeg';
              file.on('data', (data) => chunks.push(data));
            });

            bb.on('finish', () => {
              if (chunks.length === 0) {
                res.statusCode = 400;
                res.end(JSON.stringify({ success: false, error: 'No image uploaded.' }));
                return;
              }

              const buffer = Buffer.concat(chunks);
              devHeroImage = `data:${mimeType};base64,${buffer.toString('base64')}`;
              devUpdatedAt = new Date().toISOString();

              res.statusCode = 200;
              res.end(
                JSON.stringify({
                  success: true,
                  message: 'Hero image updated successfully in local dev.',
                  data: { key: 'hero-image', url: devHeroImage, updatedAt: devUpdatedAt },
                })
              );
            });

            req.pipe(bb);
            return;
          }
        }

        next();
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), localDevApiPlugin()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-three': ['three', '@react-three/fiber', '@react-three/drei'],
          'vendor-gsap': ['gsap', 'lenis'],
          'vendor-motion': ['framer-motion'],
        },
      },
    },
  },
});

