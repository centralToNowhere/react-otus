import { useMemo } from "react";

export interface Debounced<T> {
  (value: T): void;
  clear: () => void;
}

export const useDebounce = <T>(
  callback: (value: T) => void,
  delay = 1000
): Debounced<T> => {
  // useMemo for preventing timeout clearing on every character input
  return useMemo<Debounced<T>>(() => {
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
  }, [callback, delay]);
};
