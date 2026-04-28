export interface HistoryEntry {
  id: string;
  type: 'increment' | 'decrement' | 'reset';
  value: number;
  previousValue: number;
  timestamp: number;
}

export interface AppState {
  count: number;
  history: HistoryEntry[];
  theme: 'light' | 'dark';
}

export type Theme = 'light' | 'dark';
export type View = 'counter' | 'history';
