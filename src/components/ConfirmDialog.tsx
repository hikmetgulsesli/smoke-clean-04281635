interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: 'danger' | 'default';
}

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
  variant = 'default',
}: ConfirmDialogProps) {
  if (!open) return null;

  const confirmBg = variant === 'danger'
    ? 'var(--color-error-container)'
    : 'var(--color-primary-container)';
  const confirmColor = variant === 'danger'
    ? 'var(--color-on-error-container)'
    : 'var(--color-on-primary-container)';

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onCancel} />
      <div
        className="relative w-full max-w-sm rounded-xl p-6"
        style={{
          backgroundColor: 'var(--color-surface-container)',
          border: '1px solid var(--color-outline-variant)',
        }}
      >
        <h3 id="confirm-title" className="text-lg font-headline font-semibold mb-2" style={{ color: 'var(--color-on-surface)' }}>
          {title}
        </h3>
        <p className="font-body text-sm mb-6" style={{ color: 'var(--color-on-surface-variant)' }}>
          {message}
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg font-label font-medium cursor-pointer transition-colors active:scale-95"
            style={{
              backgroundColor: 'var(--color-surface-container-high)',
              color: 'var(--color-on-surface)',
            }}
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg font-label font-medium cursor-pointer transition-colors active:scale-95"
            style={{
              backgroundColor: confirmBg,
              color: confirmColor,
            }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
