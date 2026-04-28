// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Ana Sayfa
// 
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Add onClick/onChange handlers to interactive elements
// 4. Replace placeholder data with props/state

interface AnaSayfaProps {
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onReset: () => void;
  onOpenHistory: () => void;
  onOpenSettings: () => void;
  onNavigateCounter: () => void;
  onNavigateHistory: () => void;
  lastUpdateTimestamp?: number;
}

export function AnaSayfa(props: AnaSayfaProps) {
  const { count, onIncrement, onDecrement, onReset, onOpenHistory, onOpenSettings, onNavigateCounter, onNavigateHistory, lastUpdateTimestamp } = props;
  const timeStr = lastUpdateTimestamp
    ? `${String(new Date(lastUpdateTimestamp).getHours()).padStart(2, '0')}:${String(new Date(lastUpdateTimestamp).getMinutes()).padStart(2, '0')}`
    : '--:--';

  return (
    <>
      {/* TopAppBar */}
      <nav className="w-full sticky top-0 z-50 bg-[#0b1326] flex justify-between items-center px-6 py-4 max-w-full">
      <div className="text-xl font-bold tracking-tighter text-[#adc6ff] uppercase font-headline cursor-pointer" onClick={onNavigateCounter} role="button" tabIndex={0}>MONOLITH</div>
      <div className="flex items-center gap-4">
      <button aria-label="Geçmiş" onClick={onOpenHistory} className="text-[#adc6ff] hover:bg-[#171f33] transition-colors p-2 rounded-full flex items-center justify-center cursor-pointer active:scale-95">
      <span className="material-symbols-outlined">history</span>
      </button>
      <button aria-label="Tema Değiştir" onClick={onOpenSettings} className="text-[#adc6ff] hover:bg-[#171f33] transition-colors p-2 rounded-full flex items-center justify-center cursor-pointer active:scale-95">
      <span className="material-symbols-outlined">contrast</span>
      </button>
      </div>
      </nav>
      {/* Main Canvas */}
      <main className="flex-grow flex flex-col items-center justify-center px-6 pb-32">
      {/* The Monolithic Container */}
      <div className="bg-surface-container-low rounded-lg flex flex-col items-center p-[24px] shadow-[0_8px_40px_rgba(173,198,255,0.03)] w-full max-w-md">
      <h1 className="font-headline font-semibold text-lg text-on-surface-variant tracking-wide">
                      Genel Sayaç
                  </h1>
      {/* The Hero Monolith Value */}
      <div className="font-display font-bold text-8xl md:text-9xl text-primary my-[48px] tracking-tighter drop-shadow-[0_0_20px_rgba(173,198,255,0.1)]">
                      {count}
                  </div>
      {/* Contextual Timestamp */}
      <div className="font-label text-sm text-on-surface-variant/70 bg-surface-dim px-4 py-1.5 rounded-full">
                      Son güncelleme: {timeStr}
                  </div>
      </div>
      {/* Action Controls */}
      <div className="flex items-center gap-6 mt-16">
      {/* Decrease (-) */}
      <button aria-label="Azalt" onClick={onDecrement} className="bg-surface-container-highest text-on-surface w-16 h-16 rounded flex items-center justify-center hover:bg-surface-bright transition-colors active:scale-95 cursor-pointer">
      <span className="material-symbols-outlined text-3xl">remove</span>
      </button>
      {/* Primary Action (+) */}
      <button aria-label="Artır" onClick={onIncrement} className="bg-gradient-to-tr from-primary to-primary-container text-on-primary w-24 h-24 rounded flex items-center justify-center shadow-[0_4px_20px_rgba(173,198,255,0.15)] glow-effect transition-all active:scale-95 duration-200 cursor-pointer">
      <span className="material-symbols-outlined text-5xl" style={{fontVariationSettings: "'FILL' 1"}}>add</span>
      </button>
      {/* Reset (Sıfırla) */}
      <button aria-label="Sıfırla" onClick={onReset} className="bg-surface-container-highest text-on-surface px-8 h-16 rounded flex items-center justify-center hover:bg-surface-bright transition-colors active:scale-95 font-body font-medium tracking-wide cursor-pointer">
                      Sıfırla
                  </button>
      </div>
      </main>
      {/* BottomNavBar */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-8 pt-4 bg-[#171f33]/60 backdrop-blur-3xl rounded-t-[24px] border-t border-[#adc6ff]/15 shadow-[0_-8px_40px_rgba(173,198,255,0.08)]">
      {/* Active Nav Item */}
      <button aria-label="Sayaca Git" onClick={onNavigateCounter} className="flex flex-col items-center justify-center text-[#adc6ff] bg-[#171f33] rounded-xl px-6 py-2 active:scale-95 duration-200 hover:text-[#adc6ff] transition-all group cursor-pointer" type="button">
      <span className="material-symbols-outlined mb-1 group-hover:scale-110 transition-transform" style={{fontVariationSettings: "'FILL' 1"}}>add_circle</span>
      <span className="font-['Inter'] text-[10px] font-semibold uppercase tracking-widest">Sayaç</span>
      </button>
      {/* Inactive Nav Item */}
      <button aria-label="Geçmiş Sayfasına Git" onClick={onNavigateHistory} className="flex flex-col items-center justify-center text-[#adc6ff]/40 px-6 py-2 hover:text-[#adc6ff] transition-all group cursor-pointer" type="button">
      <span className="material-symbols-outlined mb-1 group-hover:scale-110 transition-transform">history</span>
      <span className="font-['Inter'] text-[10px] font-semibold uppercase tracking-widest">Geçmiş</span>
      </button>
      </nav>
    </>
  );
}
