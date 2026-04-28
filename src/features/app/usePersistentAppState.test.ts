import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { usePersistentAppState } from './usePersistentAppState';

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('usePersistentAppState', () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  it('başlangıç değerleri doğrudur', () => {
    const { result } = renderHook(() => usePersistentAppState());
    expect(result.current.count).toBe(0);
    expect(result.current.history).toEqual([]);
    expect(result.current.theme).toBe('dark');
  });

  it('increment sayacı artırır ve geçmişe ekler', () => {
    const { result } = renderHook(() => usePersistentAppState());
    act(() => result.current.increment());
    expect(result.current.count).toBe(1);
    expect(result.current.history).toHaveLength(1);
    expect(result.current.history[0].type).toBe('increment');
  });

  it('decrement sayacı azaltır ve geçmişe ekler', () => {
    const { result } = renderHook(() => usePersistentAppState());
    act(() => result.current.increment());
    act(() => result.current.increment());
    act(() => result.current.decrement());
    expect(result.current.count).toBe(1);
    expect(result.current.history).toHaveLength(3);
    expect(result.current.history[0].type).toBe('decrement');
  });

  it('decrement sayacı 0 altına düşmez', () => {
    const { result } = renderHook(() => usePersistentAppState());
    act(() => result.current.decrement());
    expect(result.current.count).toBe(0);
    expect(result.current.history).toHaveLength(0);
  });

  it('reset sayacı sıfırlar ve geçmişe ekler', () => {
    const { result } = renderHook(() => usePersistentAppState());
    act(() => result.current.increment());
    act(() => result.current.increment());
    act(() => result.current.reset());
    expect(result.current.count).toBe(0);
    expect(result.current.history[0].type).toBe('reset');
  });

  it('clearHistory geçmişi temizler', () => {
    const { result } = renderHook(() => usePersistentAppState());
    act(() => result.current.increment());
    act(() => result.current.clearHistory());
    expect(result.current.history).toEqual([]);
    expect(result.current.count).toBe(1);
  });

  it('toggleTheme temayı değiştirir', () => {
    const { result } = renderHook(() => usePersistentAppState());
    expect(result.current.theme).toBe('dark');
    act(() => result.current.toggleTheme());
    expect(result.current.theme).toBe('light');
    act(() => result.current.toggleTheme());
    expect(result.current.theme).toBe('dark');
  });

  it('localStorage state persist eder', () => {
    const { result } = renderHook(() => usePersistentAppState());
    act(() => result.current.increment());
    act(() => result.current.increment());
    const stored = localStorageMock.getItem('monolith-app-state');
    expect(stored).toBeTruthy();
    const parsed = JSON.parse(stored!);
    expect(parsed.count).toBe(2);
    expect(parsed.history).toHaveLength(2);
  });

  it('localStoragetan state geri yükler', () => {
    localStorageMock.setItem('monolith-app-state', JSON.stringify({
      count: 42,
      history: [{ id: '1', type: 'increment', value: 42, previousValue: 41, timestamp: Date.now() }],
      theme: 'light',
    }));
    const { result } = renderHook(() => usePersistentAppState());
    expect(result.current.count).toBe(42);
    expect(result.current.theme).toBe('light');
    expect(result.current.history).toHaveLength(1);
  });
});
