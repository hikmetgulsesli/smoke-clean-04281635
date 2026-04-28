import { useState, useCallback } from 'react';
import { AppShell } from './components/AppShell';
import { SettingsPanel } from './components/SettingsPanel';
import { ConfirmDialog } from './components/ConfirmDialog';
import { NotesPanel } from './components/NotesPanel';
import { usePersistentAppState } from './features/app/usePersistentAppState';
import { AnaSayfa } from './screens/AnaSayfa';
import { GecmisModali } from './screens/GecmisModali';
import { BosGecmisDurumu } from './screens/BosGecmisDurumu';
import './App.css';

type View = 'counter' | 'history';

export default function App() {
  const {
    count,
    history,
    theme,
    increment,
    decrement,
    reset,
    clearHistory,
    toggleTheme,
  } = usePersistentAppState();

  const [view, setView] = useState<View>('counter');
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [notes, setNotes] = useState('');

  const handleOpenHistory = useCallback(() => {
    setShowHistoryModal(true);
  }, []);

  const handleCloseHistory = useCallback(() => {
    setShowHistoryModal(false);
  }, []);

  const handleNavigateHistory = useCallback(() => {
    setView('history');
    setShowHistoryModal(false);
  }, []);

  const handleNavigateCounter = useCallback(() => {
    setView('counter');
  }, []);

  const handleClearHistory = useCallback(() => {
    setShowClearConfirm(true);
  }, []);

  const handleConfirmClear = useCallback(() => {
    clearHistory();
    setShowClearConfirm(false);
  }, [clearHistory]);

  const handleOpenSettings = useCallback(() => {
    setShowSettings(true);
  }, []);

  const handleOpenNotes = useCallback(() => {
    setShowNotes(true);
  }, []);

  return (
    <AppShell theme={theme}>
      {view === 'counter' && (
        <AnaSayfa
          count={count}
          onIncrement={increment}
          onDecrement={decrement}
          onReset={reset}
          onOpenHistory={handleOpenHistory}
          onOpenSettings={handleOpenSettings}
          onNavigateCounter={handleNavigateCounter}
          onNavigateHistory={handleNavigateHistory}
          lastUpdateTimestamp={history[0]?.timestamp ?? Date.now()}
        />
      )}

      {view === 'history' && history.length === 0 && (
        <BosGecmisDurumu
          onOpenHistory={handleOpenHistory}
          onOpenSettings={handleOpenSettings}
          onNavigateCounter={handleNavigateCounter}
          onNavigateHistory={handleNavigateHistory}
        />
      )}

      {showHistoryModal && (
        <GecmisModali
          count={count}
          history={history}
          onClose={handleCloseHistory}
          onClearHistory={handleClearHistory}
          onNavigateCounter={handleNavigateCounter}
          onNavigateHistory={handleNavigateHistory}
        />
      )}

      <SettingsPanel
        theme={theme}
        onToggleTheme={toggleTheme}
        onClose={() => setShowSettings(false)}
        open={showSettings}
      />

      <NotesPanel
        notes={notes}
        onNotesChange={setNotes}
        open={showNotes}
        onClose={() => setShowNotes(false)}
      />

      <ConfirmDialog
        open={showClearConfirm}
        title="Geçmişi Temizle"
        message="Tüm işlem geçmişini silmek istediğinize emin misiniz? Bu işlem geri alınamaz."
        confirmLabel="Temizle"
        cancelLabel="İptal"
        onConfirm={handleConfirmClear}
        onCancel={() => setShowClearConfirm(false)}
        variant="danger"
      />
    </AppShell>
  );
}
