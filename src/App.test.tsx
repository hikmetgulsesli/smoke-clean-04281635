import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import App from './App';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('Sayaç Uygulaması', () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  it('sayaç başlangıç değeri 0 olarak gösterilir', () => {
    render(<App />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('artır butonu sayacı 1 artırır', () => {
    render(<App />);
    const artirBtn = screen.getByLabelText('Artır');
    fireEvent.click(artirBtn);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('azalt butonu sayacı 1 azaltır', () => {
    render(<App />);
    const artirBtn = screen.getByLabelText('Artır');
    fireEvent.click(artirBtn);
    fireEvent.click(artirBtn);
    const azaltBtn = screen.getByLabelText('Azalt');
    fireEvent.click(azaltBtn);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('sıfırla butonu sayacı 0 yapar', () => {
    render(<App />);
    const artirBtn = screen.getByLabelText('Artır');
    fireEvent.click(artirBtn);
    fireEvent.click(artirBtn);
    fireEvent.click(artirBtn);
    const sifirlaBtn = screen.getByLabelText('Sıfırla');
    fireEvent.click(sifirlaBtn);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('geçmiş butonu geçmiş modalını açar', () => {
    render(<App />);
    // Use the top bar history button (first one with this label)
    const gecmisBtn = screen.getAllByLabelText('Geçmiş')[0];
    fireEvent.click(gecmisBtn);
    expect(screen.getByText('İşlem Geçmişi')).toBeInTheDocument();
  });

  it('geçmiş modalı kapat butonu ile kapanır', async () => {
    render(<App />);
    fireEvent.click(screen.getAllByLabelText('Geçmiş')[0]);
    expect(screen.getByText('İşlem Geçmişi')).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Kapat'));
    await waitFor(() => {
      expect(screen.queryByText('İşlem Geçmişi')).not.toBeInTheDocument();
    });
  });

  it('ayarlar butonu ayarlar panelini açar', () => {
    render(<App />);
    const temaBtn = screen.getByLabelText('Tema Değiştir');
    fireEvent.click(temaBtn);
    expect(screen.getByText('Ayarlar')).toBeInTheDocument();
  });

  it('tema değiştirme butonu çalışır', () => {
    render(<App />);
    fireEvent.click(screen.getByLabelText('Tema Değiştir'));
    const temaToggleBtn = screen.getByText('Açık Mod');
    expect(temaToggleBtn).toBeInTheDocument();
    fireEvent.click(temaToggleBtn);
    // After toggling to light, the button should now say "Koyu Mod"
    expect(screen.getByText('Koyu Mod')).toBeInTheDocument();
  });

  it('işlemler geçmişe kaydedilir', () => {
    render(<App />);
    fireEvent.click(screen.getByLabelText('Artır'));
    fireEvent.click(screen.getByLabelText('Artır'));
    fireEvent.click(screen.getAllByLabelText('Geçmiş')[0]);
    expect(screen.getAllByText('Artırıldı').length).toBeGreaterThan(0);
  });

  it('geçmiş temizleme onay dialogu açılır', () => {
    render(<App />);
    fireEvent.click(screen.getByLabelText('Artır'));
    fireEvent.click(screen.getAllByLabelText('Geçmiş')[0]);
    fireEvent.click(screen.getByLabelText('Geçmişi Temizle'));
    expect(screen.getByText((content) => content.includes('Tüm işlem geçmişini silmek istediğinize emin misiniz?'))).toBeInTheDocument();
  });

  it('geçmişi temizle butonu geçmişi siler', async () => {
    render(<App />);
    fireEvent.click(screen.getByLabelText('Artır'));
    fireEvent.click(screen.getAllByLabelText('Geçmiş')[0]);
    fireEvent.click(screen.getByLabelText('Geçmişi Temizle'));
    fireEvent.click(screen.getByText('Temizle'));
    await waitFor(() => {
      expect(screen.queryByText('Artırıldı')).not.toBeInTheDocument();
    });
  });

  it('navigasyon sayaç sayfasına döner', async () => {
    render(<App />);
    fireEvent.click(screen.getAllByLabelText('Geçmiş')[0]);
    fireEvent.click(screen.getByLabelText('Kapat'));
    await waitFor(() => {
      expect(screen.getByText('Genel Sayaç')).toBeInTheDocument();
    });
  });

  it('azalt butonu sayacı 0 altına düşürmez', () => {
    render(<App />);
    const azaltBtn = screen.getByLabelText('Azalt');
    fireEvent.click(azaltBtn);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('azalt butonu count 0 iken disabled durumdadır', () => {
    render(<App />);
    const azaltBtn = screen.getByLabelText('Azalt') as HTMLButtonElement;
    expect(azaltBtn.disabled).toBe(true);
  });

  it('azalt butonu count 0dan büyükken aktiftir', () => {
    render(<App />);
    fireEvent.click(screen.getByLabelText('Artır'));
    const azaltBtn = screen.getByLabelText('Azalt') as HTMLButtonElement;
    expect(azaltBtn.disabled).toBe(false);
  });

  it('alt navigasyon geçmiş sayfasına gider', () => {
    render(<App />);
    const bottomNav = screen.getAllByRole('navigation')[1];
    fireEvent.click(within(bottomNav).getByLabelText('Geçmiş'));
    expect(screen.getByText('Henüz işlem kaydı yok')).toBeInTheDocument();
  });

  it('alt navigasyon sayaç sayfasına döner', async () => {
    render(<App />);
    const bottomNav2 = screen.getAllByRole('navigation')[1];
    fireEvent.click(within(bottomNav2).getByLabelText('Geçmiş'));
    expect(screen.getByText('Henüz işlem kaydı yok')).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Sayaç'));
    await waitFor(() => {
      expect(screen.getByText('Genel Sayaç')).toBeInTheDocument();
    });
  });

  it('monolith başlık tıklaması sayaç sayfasına döner', async () => {
    render(<App />);
    const bottomNav3 = screen.getAllByRole('navigation')[1];
    fireEvent.click(within(bottomNav3).getByLabelText('Geçmiş'));
    expect(screen.getByText('Henüz işlem kaydı yok')).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Ana Sayfa'));
    await waitFor(() => {
      expect(screen.getByText('Genel Sayaç')).toBeInTheDocument();
    });
  });

  it('geçmişi olan sayfada alt navigasyon geçmiş modalını açar', () => {
    render(<App />);
    fireEvent.click(screen.getByLabelText('Artır'));
    const bottomNav = screen.getAllByRole('navigation')[1];
    fireEvent.click(within(bottomNav).getByLabelText('Geçmiş'));
    expect(screen.getByText('İşlem Geçmişi')).toBeInTheDocument();
  });
});
