import {shell} from 'electron';

export async function openClientBrowser(url: string) {
  await shell.openExternal(url);
}
