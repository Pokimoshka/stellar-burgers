import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4000',
    supportFile: false,
    chromeWebSecurity: false          // ← разрешаем кросс-доменные запросы
  }
});