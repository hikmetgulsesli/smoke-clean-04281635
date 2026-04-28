// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Geçmiş Modalı
// 
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Add onClick/onChange handlers to interactive elements
// 4. Replace placeholder data with props/state

import { useState } from "react";

interface GecmisModaliProps {}

export function GecmisModali(props: GecmisModaliProps) {
  return (
    <>
      {/* UNDERLAY: Mock Home Page Canvas */}
      <div className="relative z-0 h-screen flex flex-col">
      {/* TopAppBar */}
      <header className="bg-[#0b1326] w-full sticky top-0 z-50 flex justify-between items-center px-6 py-4 max-w-full shadow-none border-none">
      <div className="text-xl font-bold tracking-tighter text-[#adc6ff] uppercase">MONOLITH</div>
      <div className="flex items-center gap-4 hidden">
      <span className="material-symbols-outlined text-[#adc6ff] hover:bg-[#171f33] transition-colors p-2 rounded-full cursor-pointer active:scale-95 transition-transform" data-icon="history">history</span>
      <span className="material-symbols-outlined text-[#adc6ff] hover:bg-[#171f33] transition-colors p-2 rounded-full cursor-pointer active:scale-95 transition-transform" data-icon="contrast">contrast</span>
      </div>
      </header>
      {/* Main Content Area (Blurred/Faded out for context) */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 opacity-30 blur-[2px] pointer-events-none">
      <div className="text-[8rem] font-display font-bold text-primary leading-none tracking-tighter">42</div>
      <div className="mt-8 text-on-surface-variant font-body text-lg">Aktif Sayaç Değeri</div>
      </main>
      {/* BottomNavBar */}
      <nav className="bg-[#171f33]/60 backdrop-blur-3xl fixed bottom-0 w-full rounded-t-[24px] border-t border-[#adc6ff]/15 shadow-[0_-8px_40px_rgba(173,198,255,0.08)] fixed bottom-0 left-0 w-full z-10 flex justify-around items-center px-4 pb-8 pt-4 md:hidden">
      <button className="flex flex-col items-center justify-center text-[#adc6ff]/40 px-6 py-2 hover:text-[#adc6ff] transition-all">
      <span className="material-symbols-outlined mb-1 text-2xl" data-icon="add_circle">add_circle</span>
      <span className="font-['Inter'] text-[10px] font-semibold uppercase tracking-widest">Sayaç</span>
      </button>
      <button className="flex flex-col items-center justify-center text-[#adc6ff] bg-[#adc6ff]/10 rounded-xl px-6 py-2 active:scale-95 duration-200">
      <span className="material-symbols-outlined mb-1 text-2xl" data-icon="history" style={{fontVariationSettings: "'FILL' 1"}}>history</span>
      <span className="font-['Inter'] text-[10px] font-semibold uppercase tracking-widest">Geçmiş</span>
      </button>
      </nav>
      </div>
      {/* OVERLAY: Modal Backdrop & Dialog */}
      <div aria-labelledby="modal-title" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" role="dialog">
      {/* Backdrop */}
      <div aria-hidden={true} className="fixed inset-0 bg-background/80 backdrop-blur-md transition-opacity"></div>
      {/* Modal Dialog (Glassmorphism, No-Line, Monolithic Pulse) */}
      <div className="relative w-full max-w-lg transform overflow-hidden rounded-xl bg-surface-bright/60 backdrop-blur-3xl text-left shadow-[0_8px_40px_rgba(173,198,255,0.08)] transition-all flex flex-col max-h-[870px]">
      {/* Modal Header */}
      <div className="px-6 py-5 flex items-center justify-between">
      <h3 className="text-2xl font-headline font-semibold text-on-surface tracking-tight" id="modal-title">İşlem Geçmişi</h3>
      <button className="text-on-surface-variant hover:text-primary transition-colors p-2 rounded-full hover:bg-surface-container-low focus:outline-none" type="button">
      <span className="material-symbols-outlined text-2xl" data-icon="close">close</span>
      </button>
      </div>
      {/* Modal Content (Transaction List) */}
      <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-3">
      {/* Transaction Item: Increased */}
      <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-lg transition-transform hover:scale-[1.01]">
      <div className="flex items-center gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary">
      <span className="material-symbols-outlined" data-icon="add">add</span>
      </div>
      <div>
      <p className="text-base font-body font-medium text-on-surface">Artırıldı <span className="text-secondary ml-1">(+1)</span></p>
      <p className="text-sm font-label text-on-surface-variant mt-0.5">14:30</p>
      </div>
      </div>
      <div className="text-right">
      <p className="text-sm text-on-surface-variant mb-0.5">Yeni Değer</p>
      <p className="text-xl font-display font-bold text-on-surface">42</p>
      </div>
      </div>
      {/* Transaction Item: Decreased */}
      <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-lg transition-transform hover:scale-[1.01]">
      <div className="flex items-center gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-outline-variant/30 text-on-surface-variant">
      <span className="material-symbols-outlined" data-icon="remove">remove</span>
      </div>
      <div>
      <p className="text-base font-body font-medium text-on-surface">Azaltıldı <span className="text-on-surface-variant ml-1">(-1)</span></p>
      <p className="text-sm font-label text-on-surface-variant mt-0.5">12:15</p>
      </div>
      </div>
      <div className="text-right">
      <p className="text-sm text-on-surface-variant mb-0.5">Yeni Değer</p>
      <p className="text-xl font-display font-bold text-on-surface">41</p>
      </div>
      </div>
      {/* Transaction Item: Reset */}
      <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-lg transition-transform hover:scale-[1.01]">
      <div className="flex items-center gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-tertiary-container/20 text-tertiary-fixed-dim">
      <span className="material-symbols-outlined" data-icon="refresh">refresh</span>
      </div>
      <div>
      <p className="text-base font-body font-medium text-on-surface">Sıfırlandı</p>
      <p className="text-sm font-label text-on-surface-variant mt-0.5">Dün, 09:00</p>
      </div>
      </div>
      <div className="text-right">
      <p className="text-sm text-on-surface-variant mb-0.5">Yeni Değer</p>
      <p className="text-xl font-display font-bold text-on-surface">0</p>
      </div>
      </div>
      {/* Transaction Item: Increased */}
      <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-lg transition-transform hover:scale-[1.01]">
      <div className="flex items-center gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary">
      <span className="material-symbols-outlined" data-icon="add">add</span>
      </div>
      <div>
      <p className="text-base font-body font-medium text-on-surface">Artırıldı <span className="text-secondary ml-1">(+1)</span></p>
      <p className="text-sm font-label text-on-surface-variant mt-0.5">14 Haz, 18:45</p>
      </div>
      </div>
      <div className="text-right">
      <p className="text-sm text-on-surface-variant mb-0.5">Yeni Değer</p>
      <p className="text-xl font-display font-bold text-on-surface">15</p>
      </div>
      </div>
      {/* Spacer for scroll visual breathing room */}
      <div className="h-2"></div>
      </div>
      {/* Modal Footer (Action) */}
      <div className="p-6 pt-2 bg-surface-bright/40">
      <button className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded bg-error-container text-on-error-container font-headline font-semibold text-base transition-transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-error focus:ring-offset-2 focus:ring-offset-surface-bright" type="button">
      <span className="material-symbols-outlined" data-icon="delete">delete</span>
                          Geçmişi Temizle
                      </button>
      </div>
      </div>
      </div>
    </>
  );
}
