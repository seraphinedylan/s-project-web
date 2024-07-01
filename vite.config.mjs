import path from 'path';
import { fileURLToPath } from 'url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), eslint()],
  server: { open: true, port: 3000 },
  resolve: {
    alias: [{ find: '~', replacement: path.resolve(__dirname, 'src') }],
  },
});
