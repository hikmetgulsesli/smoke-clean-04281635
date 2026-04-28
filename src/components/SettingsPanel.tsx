interface SettingsPanelProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onClose: () => void;
  open: boolean;
}

export function SettingsPanel({ theme, onToggleTheme, onClose, open }: SettingsPanelProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="settings-title">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative w-full max-w-sm rounded-xl p-6"
        style={{
          backgroundColor: 'var(--color-surface-container)',
          border: '1px solid var(--color-outline-variant)',
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 id="settings-title" className="text-xl font-headline font-semibold" style={{ color: 'var(--color-on-surface)' }}>
            Ayarlar
          </h3>
          <button
            aria-label="Kapat"
            onClick={onClose}
            className="p-2 rounded-full cursor-pointer transition-colors"
            style={{ color: 'var(--color-on-surface-variant)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--color-primary)';
              e.currentTarget.style.backgroundColor = 'var(--color-surface-container-low)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--color-on-surface-variant)';
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-body" style={{ color: 'var(--color-on-surface)' }}>Tema</span>
            <button
              onClick={onToggleTheme}
              className="px-4 py-2 rounded-lg font-label font-medium cursor-pointer transition-colors active:scale-95"
              style={{
                backgroundColor: 'var(--color-primary-container)',
                color: 'var(--color-on-primary-container)',
              }}
            >
              {theme === 'dark' ? 'Açık Mod' : 'Koyu Mod'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
