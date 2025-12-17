// tests/codegen.ts
import {_electron as electron} from '@playwright/test';

(async () => {
  const app = await electron.launch({
    args: ['.vite/build/main.js'],
    env: {
      ...process.env,
      PWDEBUG: '1',
    },
  });

  const window = await app.firstWindow();

  // Lance directement l'inspector Playwright
  await window.pause();

  console.log('Interaction ready');
})();
