interface CounterPanelProps {
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onReset: () => void;
}

export function CounterPanel({ count, onIncrement, onDecrement, onReset }: CounterPanelProps) {
  const now = new Date();
  const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  return (
    <main className="flex-grow flex flex-col items-center justify-center px-6 pb-32">
      <div
        className="rounded-lg flex flex-col items-center p-[24px] w-full max-w-md"
        style={{
          backgroundColor: 'var(--color-surface-container-low)',
          boxShadow: '0 8px 40px rgba(173,198,255,0.03)',
        }}
      >
        <h2 className="font-headline font-semibold text-lg tracking-wide" style={{ color: 'var(--color-on-surface-variant)' }}>
          Genel Sayaç
        </h2>
        <div
          className="font-display font-bold text-8xl md:text-9xl my-[48px] tracking-tighter"
          style={{
            color: 'var(--color-primary)',
            textShadow: '0 0 20px rgba(173,198,255,0.1)',
          }}
        >
          {count}
        </div>
        <div
          className="font-label text-sm px-4 py-1.5 rounded-full"
          style={{
            color: 'var(--color-on-surface-variant)',
            backgroundColor: 'var(--color-surface-dim)',
            opacity: 0.7,
          }}
        >
          Son güncelleme: {timeStr}
        </div>
      </div>
      <div className="flex items-center gap-6 mt-16">
        <button
          aria-label="Azalt"
          onClick={onDecrement}
          className="w-16 h-16 rounded flex items-center justify-center active:scale-95 transition-transform duration-200 cursor-pointer"
          style={{
            backgroundColor: 'var(--color-surface-container-highest)',
            color: 'var(--color-on-surface)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-surface-bright)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-surface-container-highest)';
          }}
        >
          <span className="material-symbols-outlined text-3xl">remove</span>
        </button>
        <button
          aria-label="Artır"
          onClick={onIncrement}
          className="w-24 h-24 rounded flex items-center justify-center glow-effect active:scale-95 transition-all duration-200 cursor-pointer"
          style={{
            background: 'linear-gradient(to top right, var(--color-primary), var(--color-primary-container))',
            color: 'var(--color-on-primary)',
          }}
        >
          <span className="material-symbols-outlined text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>add</span>
        </button>
        <button
          aria-label="Sıfırla"
          onClick={onReset}
          className="px-8 h-16 rounded flex items-center justify-center active:scale-95 transition-transform duration-200 cursor-pointer font-body font-medium tracking-wide"
          style={{
            backgroundColor: 'var(--color-surface-container-highest)',
            color: 'var(--color-on-surface)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-surface-bright)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-surface-container-highest)';
          }}
        >
          Sıfırla
        </button>
      </div>
    </main>
  );
}
