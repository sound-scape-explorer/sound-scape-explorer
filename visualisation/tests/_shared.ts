import {_electron as electron} from '@playwright/test';

export async function startElectron() {
  const app = await electron.launch({
    args: ['.vite/build/main.js'],
    // bypassCSP: true,
  });

  const main = await app.firstWindow();

  // Direct Electron console to Node terminal.
  main.on('console', console.log);

  return {
    app,
    main,
  };
}
