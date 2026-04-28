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

  it('geçersiz localStorage verisini yok sayar ve başlangıç değerlerini kullanır', () => {
    localStorageMock.setItem('monolith-app-state', 'not-valid-json');
    const { result } = renderHook(() => usePersistentAppState());
    expect(result.current.count).toBe(0);
    expect(result.current.history).toEqual([]);
    expect(result.current.theme).toBe('dark');
  });

  it('negatif count içeren localStorage verisini sıfırlar', () => {
    localStorageMock.setItem('monolith-app-state', JSON.stringify({
      count: -5,
      history: [],
      theme: 'dark',
    }));
    const { result } = renderHook(() => usePersistentAppState());
    expect(result.current.count).toBe(0);
  });

  it('bozuk geçmiş kayıtlarını filtreleyerek yükler', () => {
    localStorageMock.setItem('monolith-app-state', JSON.stringify({
      count: 3,
      history: [
        { id: '1', type: 'increment', value: 1, previousValue: 0, timestamp: Date.now() },
        { id: '2', type: 'invalid', value: 2, previousValue: 1, timestamp: Date.now() },
        { id: '3', type: 'decrement', value: 1, previousValue: 2, timestamp: Date.now() },
      ],
      theme: 'dark',
    }));
    const { result } = renderHook(() => usePersistentAppState());
    expect(result.current.count).toBe(3);
    expect(result.current.history).toHaveLength(2);
    expect(result.current.history[0].type).toBe('increment');
    expect(result.current.history[1].type).toBe('decrement');
  });

  it('fazla geçmiş kaydını 100 ile sınırlandırır', () => {
    const manyHistory = Array.from({ length: 150 }, (_, i) => ({
      id: String(i),
      type: 'increment' as const,
      value: i + 1,
      previousValue: i,
      timestamp: Date.now(),
    }));
    localStorageMock.setItem('monolith-app-state', JSON.stringify({
      count: 150,
      history: manyHistory,
      theme: 'dark',
    }));
    const { result } = renderHook(() => usePersistentAppState());
    expect(result.current.count).toBe(150);
    expect(result.current.history).toHaveLength(100);
  });
});
