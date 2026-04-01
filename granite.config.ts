import { defineConfig } from '@apps-in-toss/web-framework/config';

export default defineConfig({
  appName: 'my-spending-habit',
  brand: {
    displayName: '나의 소비 습관',
    primaryColor: '#3182F6',
    icon: 'https://spendinghabbittest.vercel.app/logo_600x600.png',
  },
  web: {
    host: 'localhost',
    port: 3000,
    commands: {
      dev: 'next dev',
      build: 'next build',
    },
  },
  permissions: [],
  outdir: 'out',
});
