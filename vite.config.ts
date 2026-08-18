import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';
  return {
    plugins: [react()],
    base: '/',
    server: { host: true, port: 5173, strictPort: true },
    preview: { host: true, port: 5173, strictPort: true },
    build: {
      target: 'es2020',
      outDir: 'dist',
      emptyOutDir: true,
      cssCodeSplit: true,
      sourcemap: !isProd,
      minify: isProd ? 'esbuild' : false,
      chunkSizeWarningLimit: 900,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes('node_modules')) return;
            if (id.includes('three') || id.includes('@react-three')) return 'three-vendor';
            if (id.includes('react-dom') || id.includes('/react/')) return 'react-vendor';
          },
        },
      },
    },
    optimizeDeps: { include: ['react', 'react-dom'] },
    esbuild: { legalComments: 'none' },
  };
});
