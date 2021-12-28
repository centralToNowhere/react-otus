export interface Debounced<T> {
  (value: T): void;
  clear: () => void;
}

export const debounce = <T>(
  callback: (value: T) => void,
  delay = 1000
): Debounced<T> => {
  let timeout: ReturnType<typeof window.setTimeout> | null = null;

  const clearDebounce = () => {
    if (timeout !== null) {
      clearTimeout(timeout);
      timeout = null;
    }
  };

  const debounced: Debounced<T> = (value: T) => {
    clearDebounce();

    timeout = setTimeout(() => {
      clearDebounce();
      callback(value);
    }, delay);
  };

  debounced.clear = clearDebounce;

  return debounced;
};
