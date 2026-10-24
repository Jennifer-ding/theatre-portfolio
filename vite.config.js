import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
export default defineConfig({ build: { rollupOptions: { input: {
  website: fileURLToPath(new URL('./index.html', import.meta.url)),
  prototype: fileURLToPath(new URL('./prototype.html', import.meta.url))
} } } });
