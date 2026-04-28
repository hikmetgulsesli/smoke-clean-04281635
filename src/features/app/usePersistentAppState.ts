import { useState, useCallback, useEffect } from 'react';
import type { AppState, HistoryEntry, Theme } from '../../types';

const STORAGE_KEY = 'monolith-app-state';

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function getInitialState(): AppState {
  if (typeof window !== 'undefined') {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as AppState;
        if (
          typeof parsed.count === 'number' &&
          Array.isArray(parsed.history) &&
          (parsed.theme === 'light' || parsed.theme === 'dark')
        ) {
          return parsed;
        }
      }
    } catch {
      // ignore parse errors
    }
  }
  return { count: 0, history: [], theme: 'dark' };
}

export function usePersistentAppState() {
  const [state, setState] = useState<AppState>(getInitialState);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore storage errors
    }
  }, [state]);

  const increment = useCallback(() => {
    setState((prev) => {
      const entry: HistoryEntry = {
        id: generateId(),
        type: 'increment',
        value: prev.count + 1,
        previousValue: prev.count,
        timestamp: Date.now(),
      };
      return {
        ...prev,
        count: prev.count + 1,
        history: [entry, ...prev.history].slice(0, 100),
      };
    });
  }, []);

  const decrement = useCallback(() => {
    setState((prev) => {
      if (prev.count <= 0) return prev;
      const entry: HistoryEntry = {
        id: generateId(),
        type: 'decrement',
        value: prev.count - 1,
        previousValue: prev.count,
        timestamp: Date.now(),
      };
      return {
        ...prev,
        count: prev.count - 1,
        history: [entry, ...prev.history].slice(0, 100),
      };
    });
  }, []);

  const reset = useCallback(() => {
    setState((prev) => {
      const entry: HistoryEntry = {
        id: generateId(),
        type: 'reset',
        value: 0,
        previousValue: prev.count,
        timestamp: Date.now(),
      };
      return {
        ...prev,
        count: 0,
        history: [entry, ...prev.history].slice(0, 100),
      };
    });
  }, []);

  const clearHistory = useCallback(() => {
    setState((prev) => ({ ...prev, history: [] }));
  }, []);

  const toggleTheme = useCallback(() => {
    setState((prev) => ({
      ...prev,
      theme: prev.theme === 'dark' ? 'light' : 'dark',
    }));
  }, []);

  const setTheme = useCallback((theme: Theme) => {
    setState((prev) => ({ ...prev, theme }));
  }, []);

  return {
    count: state.count,
    history: state.history,
    theme: state.theme,
    increment,
    decrement,
    reset,
    clearHistory,
    toggleTheme,
    setTheme,
  };
}
// test comment
