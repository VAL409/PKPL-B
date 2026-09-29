import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const usersFilePath = path.resolve(__dirname, 'src/data/users.json')
const newsletterFilePath = path.resolve(__dirname, 'src/data/newsletter.json')

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'local-db-middleware',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/api/users' && req.method === 'GET') {
            try {
              const data = fs.existsSync(usersFilePath)
                ? fs.readFileSync(usersFilePath, 'utf8')
                : '[]';
              res.setHeader('Content-Type', 'application/json');
              res.end(data);
              return;
            } catch (err) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err.message }));
              return;
            }
          }

          if (req.url === '/api/users' && req.method === 'POST') {
            let body = '';
            req.on('data', (chunk) => { body += chunk; });
            req.on('end', () => {
              try {
                const parsed = JSON.parse(body);
                fs.writeFileSync(usersFilePath, JSON.stringify(parsed, null, 2), 'utf8');
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true }));
              } catch (err) {
                res.statusCode = 500;
                res.end(JSON.stringify({ error: err.message }));
              }
            });
            return;
          }

          if (req.url === '/api/newsletter' && req.method === 'GET') {
            try {
              const data = fs.existsSync(newsletterFilePath)
                ? fs.readFileSync(newsletterFilePath, 'utf8')
                : '[]';
              res.setHeader('Content-Type', 'application/json');
              res.end(data);
              return;
            } catch (err) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err.message }));
              return;
            }
          }

          if (req.url === '/api/newsletter' && req.method === 'POST') {
            let body = '';
            req.on('data', (chunk) => { body += chunk; });
            req.on('end', () => {
              try {
                const parsed = JSON.parse(body);
                fs.writeFileSync(newsletterFilePath, JSON.stringify(parsed, null, 2), 'utf8');
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true }));
              } catch (err) {
                res.statusCode = 500;
                res.end(JSON.stringify({ error: err.message }));
              }
            });
            return;
          }

          next();
        });
      }
    }
  ],
})
