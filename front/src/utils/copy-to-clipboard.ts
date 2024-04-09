export async function copyToClipboard(message: string) {
  await navigator.clipboard.writeText(message);
}
