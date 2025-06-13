import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4000',
    setupNodeEvents(on, config) {}
  },

  component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack'
    }
  }
});
