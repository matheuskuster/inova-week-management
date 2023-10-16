import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    clearMocks: true,
    mockReset: true,
    coverage: {
      reporter: ['text', 'json', 'html', 'json-summary'],
    },
    alias: {
      '@test/': './test/',
      '@/': './src/',
    },
  },
});
