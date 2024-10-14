export const debounce = (fn: Function, delay: number) => {
  let timeout: number | null = null;
    return (...args: any[]) => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => fn(...args), delay);
    }
}