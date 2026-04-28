import type { ReactNode } from 'react';

interface AppShellProps {
  children: ReactNode;
  theme: 'light' | 'dark';
}

export function AppShell({ children, theme }: AppShellProps) {
  return (
    <div
      data-theme={theme}
      className="min-h-screen flex flex-col transition-colors duration-200"
      style={{
        backgroundColor: 'var(--color-background)',
        color: 'var(--color-on-surface)',
      }}
    >
      {children}
    </div>
  );
}
