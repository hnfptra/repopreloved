import BottomNav from '../components/preloved/BottomNav';

type NavigateExtra = { productId?: number; chatId?: number; from?: number };

interface AkunScreenProps {
  onNavigate: (screen: number, extra?: NavigateExtra) => void;
}

const menuItems = [
  { label: 'Pesanan Saya', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="17" rx="2"/><path d="M8 9h8M8 13h8M8 17h5"/></svg> },
  { label: 'Favorit', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 21s-7-4.5-9.5-9C.7 8.4 2.4 5 6 5c2 0 3.3 1 4 2.2C10.7 6 12 5 14 5c3.6 0 5.3 3.4 3.5 7-2.5 4.5-9.5 9-9.5 9z"/></svg> },
  { label: 'Alamat', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 21s7-7.5 7-12a7 7 0 10-14 0c0 4.5 7 12 7 12z"/><circle cx="12" cy="9" r="2.3"/></svg> },
  { label: 'Metode Pembayaran', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2.5" y="6" width="19" height="13" rx="2"/><path d="M2.5 10h19"/></svg> },
  { label: 'Pengaturan', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 13a7.7 7.7 0 000-2l2-1.6-2-3.4-2.3.9a7.6 7.6 0 00-1.7-1l-.4-2.4h-4l-.4 2.4a7.6 7.6 0 00-1.7 1l-2.3-.9-2 3.4L6.6 11a7.7 7.7 0 000 2l-2 1.6 2 3.4 2.3-.9c.5.4 1.1.8 1.7 1l.4 2.4h4l.4-2.4c.6-.2 1.2-.6 1.7-1l2.3.9 2-3.4z"/></svg> },
  { label: 'Bantuan', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 015 .3c0 1.7-2.5 2-2.5 3.7"/><circle cx="12" cy="16.3" r=".4" fill="currentColor"/></svg>, last: true },
];

export default function AkunScreen({ onNavigate }: AkunScreenProps) {
  return (
    <div className="screen-enter flex flex-col flex-1 min-h-0" style={{ background: '#F7F3EC' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px 12px', background: '#fff', borderBottom: '1px solid #DED5C3', flexShrink: 0 }}>
        <div style={{ width: 32, flexShrink: 0 }} />
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 17, fontWeight: 600, margin: 0, color: '#2C4533', flex: 1, textAlign: 'center' }}>Akun / Profil</h2>
        <button style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', color: '#2C4533', cursor: 'pointer', flexShrink: 0 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3"/><path d="M19.4 13a7.7 7.7 0 000-2l2-1.6-2-3.4-2.3.9a7.6 7.6 0 00-1.7-1l-.4-2.4h-4l-.4 2.4a7.6 7.6 0 00-1.7 1l-2.3-.9-2 3.4L6.6 11a7.7 7.7 0 000 2l-2 1.6 2 3.4 2.3-.9c.5.4 1.1.8 1.7 1l.4 2.4h4l.4-2.4c.6-.2 1.2-.6 1.7-1l2.3.9 2-3.4z"/>
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar" style={{ padding: '18px 18px 18px' }}>
        {/* Profile card */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 13, marginBottom: 18 }}>
          <div style={{ width: 54, height: 54, borderRadius: '50%', background: '#E7EEE3', color: '#2C4533', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.5-6 8-6s8 2 8 6"/>
            </svg>
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 2, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Halo, User!</div>
            <a style={{ fontSize: 12.5, color: '#C68B59', fontWeight: 700, textDecoration: 'none', cursor: 'pointer', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Lihat profil ›</a>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', background: '#fff', border: '1px solid #DED5C3', borderRadius: 14, padding: '14px 0', marginBottom: 18 }}>
          {[{ n: '12', l: 'Dijual' }, { n: '5', l: 'Dibeli' }, { n: '3', l: 'Favorit' }].map((stat, i, arr) => (
            <div key={stat.l} style={{ flex: 1, textAlign: 'center', borderRight: i < arr.length - 1 ? '1px solid #DED5C3' : 'none' }}>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 19, fontWeight: 600, color: '#2C4533' }}>{stat.n}</div>
              <div style={{ fontSize: 11, color: '#8A8475', marginTop: 2, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{stat.l}</div>
            </div>
          ))}
        </div>

        {/* Menu */}
        <div>
          {menuItems.map((item) => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 13, padding: '13px 2px', borderBottom: item.last ? 'none' : '1px solid #DED5C3', cursor: 'pointer' }}>
              <div style={{ color: '#2C4533', width: 20, display: 'flex' }}>
                <div style={{ width: 19 }}>{item.icon}</div>
              </div>
              <span style={{ flex: 1, fontSize: 13.5, fontWeight: 600, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{item.label}</span>
              <span style={{ color: '#8A8475', fontSize: 18 }}>›</span>
            </div>
          ))}
        </div>
      </div>
      <BottomNav active={8} onNavigate={onNavigate} />
    </div>
  );
}
