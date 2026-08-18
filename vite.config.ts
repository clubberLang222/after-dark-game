import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';
  return {
    plugins: [react()],
    base: '/',
    resolve: { alias: { '@': path.resolve(__dirname, 'src') } },
    server: { host: true, port: 5173, strictPort: true },
    preview: { host: true, port: 5173, strictPort: true },
    build: {
      target: 'es2020',
      outDir: 'dist',
      assetsDir: 'assets',
      emptyOutDir: true,
      cssCodeSplit: true,
      sourcemap: isProd ? false : true,
      minify: isProd ? 'esbuild' : false,
      cssMinify: isProd,
      chunkSizeWarningLimit: 900,
      rollupOptions: {
        output: {
          entryFileNames: isProd ? 'assets/[name]-[hash].js' : 'assets/[name].js',
          chunkFileNames: isProd ? 'assets/[name]-[hash].js' : 'assets/[name].js',
          assetFileNames: isProd ? 'assets/[name]-[hash][extname]' : 'assets/[name][extname]',
          manualChunks(id) {
            if (!id.includes('node_modules')) return;
            if (id.includes('three') || id.includes('@react-three')) return 'three-vendor';
            if (id.includes('react-dom') || id.includes('/react/') || id.includes('scheduler')) return 'react-vendor';
          },
        },
      },
    },
    optimizeDeps: { include: ['react', 'react-dom'] },
    esbuild: { legalComments: 'none', drop: isProd ? ['debugger'] : [] },
  };
});
