// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Boş Geçmiş Durumu
// 
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Add onClick/onChange handlers to interactive elements
// 4. Replace placeholder data with props/state

interface BosGecmisDurumuProps {
  highlight?: boolean;
  onOpenHistory: () => void;
  onOpenSettings: () => void;
  onNavigateCounter: () => void;
  onNavigateHistory: () => void;
}

export function BosGecmisDurumu(props: BosGecmisDurumuProps) {
  const { onOpenHistory, onOpenSettings, onNavigateCounter, onNavigateHistory, highlight } = props;

  return (
    <>
      {/* TopAppBar */}
      <header className="w-full sticky top-0 z-50 bg-[#0b1326] flex justify-between items-center px-6 py-4 max-w-full">
      <button onClick={onNavigateCounter} className="text-xl font-bold tracking-tighter text-[#adc6ff] uppercase font-['Inter'] cursor-pointer bg-transparent border-none p-0" aria-label="Ana Sayfa">MONOLITH</button>
      <div className="flex items-center gap-4 text-[#adc6ff]">
      <button aria-label="Geçmiş" onClick={onOpenHistory} className="hover:bg-[#171f33] transition-colors p-2 rounded-full active:scale-95 transition-transform flex items-center justify-center cursor-pointer">
      <span className="material-symbols-outlined" data-icon="history">history</span>
      </button>
      <button aria-label="Tema Değiştir" onClick={onOpenSettings} className="hover:bg-[#171f33] transition-colors p-2 rounded-full active:scale-95 transition-transform flex items-center justify-center cursor-pointer">
      <span className="material-symbols-outlined" data-icon="contrast">contrast</span>
      </button>
      </div>
      </header>
      {/* Main Canvas: Empty History State */}
      <main className="flex-1 flex flex-col items-center justify-center px-8 pb-24 relative">
      {/* Ambient background glow to add depth without lines */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
      <div className="w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
      </div>
      {/* Empty State Content Container (No Lines, Tonal Layering) */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-sm">
      {/* Icon Container: Deep space aesthetic */}
      <div className="w-32 h-32 mb-8 relative flex items-center justify-center">
      {/* Outer subtle ring */}
      <div className="absolute inset-0 rounded-full bg-surface-container-low scale-100 opacity-50"></div>
      {/* Inner core container */}
      <div className="relative w-24 h-24 rounded-full bg-surface-container flex items-center justify-center shadow-[0_0_40px_rgba(173,198,255,0.05)]">
      <span className="material-symbols-outlined text-5xl text-primary/40" data-icon="history_toggle_off" style={{fontVariationSettings: "'wght' 200"}}>history_toggle_off</span>
      </div>
      </div>
      {/* Typography Hierarchy: High Contrast */}
      <h2 className="font-headline font-semibold text-2xl text-on-surface tracking-tight mb-4">
                      Henüz işlem kaydı yok
                  </h2>
      <p className="font-body text-base text-on-surface-variant leading-relaxed opacity-80">
                      Sayaç değerini değiştirerek ilk kaydınızı oluşturabilirsiniz.
                  </p>
      {/* Optional: Ghost CTA to guide back to counter */}
      <button onClick={onNavigateCounter} className="mt-10 px-6 py-3 rounded-full bg-surface-container-low text-primary font-label font-semibold tracking-wide hover:bg-surface-container transition-colors active:scale-95 cursor-pointer">
                      Sayaca Dön
                  </button>
      </div>
      </main>
      {/* BottomNavBar */}
      <nav className="fixed bottom-0 w-full rounded-t-[24px] border-t border-[#adc6ff]/15 shadow-[0_-8px_40px_rgba(173,198,255,0.08)] bg-[#171f33]/60 backdrop-blur-3xl fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-8 pt-4 md:hidden">
      {/* Inactive Tab: Sayaç */}
      <button aria-label="Sayaç" className={"flex flex-col items-center justify-center text-[#adc6ff]/40 px-6 py-2 hover:text-[#adc6ff] transition-all group" + (highlight ? " animate-pulse-ring" : "")} onClick={onNavigateCounter}>
      <span className="material-symbols-outlined mb-1 group-active:scale-95 duration-200" data-icon="add_circle">add_circle</span>
      <span className="font-['Inter'] text-[10px] font-semibold uppercase tracking-widest">Sayaç</span>
      </button>
      {/* Active Tab: Geçmiş */}
      <button aria-label="Geçmiş" disabled className="flex flex-col items-center justify-center text-[#adc6ff] bg-[#adc6ff]/10 rounded-xl px-6 py-2 active:scale-95 duration-200">
      <span className="material-symbols-outlined mb-1" data-icon="history" data-weight="fill" style={{fontVariationSettings: "'FILL' 1"}}>history</span>
      <span className="font-['Inter'] text-[10px] font-semibold uppercase tracking-widest">Geçmiş</span>
      </button>
      </nav>
    </>
  );
}
