import { defineConfig } from 'vite';
import mkcert from 'vite-plugin-mkcert';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    mkcert({
      certFileName: './localhost.pem',
      keyFileName: './localhost-key.pem',
    }),
  ],
  server: {
    port: 3000,
  },
});
