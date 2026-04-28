interface NotesPanelProps {
  notes: string;
  onNotesChange: (notes: string) => void;
  open: boolean;
  onClose: () => void;
}

export function NotesPanel({ notes, onNotesChange, open, onClose }: NotesPanelProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="notes-title">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative w-full max-w-lg rounded-xl p-6"
        style={{
          backgroundColor: 'var(--color-surface-container)',
          border: '1px solid var(--color-outline-variant)',
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 id="notes-title" className="text-xl font-headline font-semibold" style={{ color: 'var(--color-on-surface)' }}>
            Notlar
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
        <textarea
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          placeholder="Notlarınızı buraya yazın..."
          className="w-full h-48 rounded-lg p-4 font-body text-sm resize-none outline-none focus:ring-2"
          style={{
            backgroundColor: 'var(--color-surface-container-low)',
            color: 'var(--color-on-surface)',
            border: '1px solid var(--color-outline-variant)',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-primary)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-outline-variant)';
          }}
        />
      </div>
    </div>
  );
}
