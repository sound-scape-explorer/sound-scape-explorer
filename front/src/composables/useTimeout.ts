let timeout: null | number = null;

export function useTimeout(callback: () => void, delay = 1000) {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }

  timeout = setTimeout(() => {
    callback();
  }, delay);
}
