import { useEffect, useState } from 'react';

export const usePersistedValue = <T>(key: string, initial: T | (() => T)) => {
  const storageKey = `stored:${key}`;

  const [value, setValue] = useState<T>(() => {
    const rawItem = localStorage.getItem(storageKey);
    return rawItem !== null
      ? JSON.parse(rawItem)
      : typeof initial !== 'function'
      ? initial
      : (initial as Function)();
  });

  useEffect(() => {
    const stringValue = JSON.stringify(value);
    localStorage.setItem(storageKey, stringValue);
  }, [value]);

  return [value, setValue] as const;
};
