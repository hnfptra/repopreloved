import BottomNav from '../components/preloved/BottomNav';
import ScreenHeader from '../components/preloved/ScreenHeader';

type NavigateExtra = { productId?: number; chatId?: number; from?: number };

interface KategoriScreenProps {
  onNavigate: (screen: number, extra?: NavigateExtra) => void;
}

const cats = [
  { label: 'Pakaian', count: 3, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 5l3-2 3 2"/><path d="M5 9l4-4 3 3 3-3 4 4-3 3v9H8v-9z"/></svg>, bg: '#F1E2CC', color: '#C68B59' },
  { label: 'Tas', count: 1, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 8V6a4 4 0 018 0v2"/><rect x="4" y="8" width="16" height="12" rx="2"/></svg>, bg: '#E7EEE3', color: '#3F6048' },
  { label: 'Sepatu', count: 1, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 16l4-9 3 5 3-7 3 7 3-5 2 9z"/></svg>, bg: '#EDE8F5', color: '#7B5EA7' },
  { label: 'Aksesoris', count: 1, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/></svg>, bg: '#F5EDDE', color: '#A0522D' },
  { label: 'Elektronik', count: 0, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/></svg>, bg: '#DDEAF5', color: '#4A6FA5' },
  { label: 'Lainnya', count: 0, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="6" cy="12" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="18" cy="12" r="1.4"/></svg>, bg: '#F0EEE8', color: '#8A8475' },
];

export default function KategoriScreen({ onNavigate }: KategoriScreenProps) {
  return (
    <div className="screen-enter flex flex-col flex-1 min-h-0" style={{ background: '#F7F3EC' }}>
      <ScreenHeader title="Kategori" onBack={() => onNavigate(2)} />
      <div className="flex-1 overflow-y-auto no-scrollbar" style={{ padding: '16px 18px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fff', border: '1px solid #DED5C3', borderRadius: 999, padding: '11px 16px', color: '#8A8475', fontSize: 13.5, fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: 16 }}>
          <svg width="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
            <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>
          </svg>
          Cari kategori
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {cats.map(cat => (
            <div
              key={cat.label}
              onClick={() => onNavigate(2)}
              style={{ display: 'flex', alignItems: 'center', gap: 13, background: '#fff', border: '1px solid #DED5C3', borderRadius: 14, padding: '13px 14px', cursor: 'pointer' }}
            >
              <div style={{ width: 42, height: 42, borderRadius: 12, background: cat.bg, color: cat.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <div style={{ width: 20 }}>{cat.icon}</div>
              </div>
              <span style={{ flex: 1, fontWeight: 600, fontSize: 14, fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#232A22' }}>{cat.label}</span>
              <span style={{ fontSize: 12, color: '#8A8475', fontWeight: 600, fontFamily: "'Plus Jakarta Sans', sans-serif", marginRight: 6 }}>
                {cat.count > 0 ? `${cat.count} item` : 'Segera'}
              </span>
              <span style={{ color: '#8A8475', fontSize: 18 }}>›</span>
            </div>
          ))}
        </div>
      </div>
      <BottomNav active={3} onNavigate={onNavigate} />
    </div>
  );
}
