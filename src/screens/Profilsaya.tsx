import {
  ChevronRight,
  Edit3,
  Heart,
  LogOut,
  MapPin,
  Package,
  ShieldCheck,
  ShoppingBag,
  Star,
} from 'lucide-react';
import BottomNav from '../components/preloved/BottomNav';
import ScreenHeader from '../components/preloved/ScreenHeader';

type NavigateExtra = { productId?: number; chatId?: number; from?: number };

interface ProfilsayaProps {
  onNavigate: (screen: number, extra?: NavigateExtra) => void;
}

const quickStats = [
  { label: 'Dijual', value: '12', icon: Package },
  { label: 'Dibeli', value: '5', icon: ShoppingBag },
  { label: 'Favorit', value: '3', icon: Heart },
];

const profileDetails = [
  { icon: MapPin, label: 'Domisili', value: 'Jakarta, Indonesia' },
  { icon: Star, label: 'Rating', value: '4.9 dari 32 ulasan' },
  { icon: ShieldCheck, label: 'Status', value: 'Member aktif sejak 2026' },
];

export default function Profilsaya({ onNavigate }: ProfilsayaProps) {
  return (
    <div className="screen-enter flex flex-col flex-1 min-h-0" style={{ background: '#F7F3EC' }}>
      <ScreenHeader title="Profil Saya" onBack={() => onNavigate(8)} />

      <div className="flex-1 overflow-y-auto no-scrollbar" style={{ padding: '16px 18px 18px' }}>
        <section
          style={{
            background: '#fff',
            border: '1px solid #DED5C3',
            borderRadius: 16,
            overflow: 'hidden',
            boxShadow: '0 12px 28px rgba(44, 69, 51, 0.08)',
            marginBottom: 14,
          }}
        >
          <div
            style={{
              padding: '18px 16px',
              background: 'linear-gradient(135deg, #2C4533 0%, #496B4B 62%, #C68B59 100%)',
              color: '#fff',
            }}
          >
            <p
              style={{
                margin: '0 0 9px',
                color: '#EFE6D2',
                fontSize: 10.5,
                fontWeight: 800,
                letterSpacing: 0,
                textTransform: 'uppercase',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              Masuk sebagai
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: '50%',
                  background: '#F7F3EC',
                  color: '#2C4533',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                  fontSize: 15,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  boxShadow: '0 8px 18px rgba(0, 0, 0, 0.12)',
                  flexShrink: 0,
                }}
              >
                AP
              </div>
              <div style={{ minWidth: 0 }}>
                <h1
                  style={{
                    margin: 0,
                    color: '#fff',
                    fontSize: 18,
                    lineHeight: 1.2,
                    fontWeight: 700,
                    fontFamily: "'Fraunces', serif",
                  }}
                >
                  Anam Programmer Handal
                </h1>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 5,
                    marginTop: 5,
                    color: '#F7E7D6',
                    fontSize: 11.5,
                    fontWeight: 700,
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                >
                  <ShieldCheck size={14} strokeWidth={2.2} />
                  Akun terverifikasi
                </div>
              </div>
            </div>
          </div>

          <div style={{ padding: '8px 0' }}>
            <button
              type="button"
              onClick={() => onNavigate(1)}
              style={{
                width: '100%',
                border: 'none',
                background: 'transparent',
                display: 'flex',
                alignItems: 'center',
                gap: 11,
                padding: '11px 14px',
                cursor: 'pointer',
                textAlign: 'left',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              <span
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 10,
                  background: '#FBE1DA',
                  color: '#C1543C',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <LogOut size={18} strokeWidth={2.2} />
              </span>
              <span style={{ flex: 1, minWidth: 0 }}>
                <span style={{ display: 'block', color: '#232A22', fontSize: 13.5, fontWeight: 800 }}>
                  Logout
                </span>
                <span style={{ display: 'block', color: '#8A8475', fontSize: 11.5, marginTop: 2, lineHeight: 1.35 }}>
                  Keluar dari akun Preloved
                </span>
              </span>
              <ChevronRight size={16} color="#C1543C" strokeWidth={2.3} />
            </button>
          </div>
        </section>

        <section
          style={{
            background: '#fff',
            border: '1px solid #DED5C3',
            borderRadius: 14,
            padding: '13px 0',
            display: 'flex',
            marginBottom: 14,
          }}
        >
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                style={{
                  flex: 1,
                  textAlign: 'center',
                  borderRight: index < quickStats.length - 1 ? '1px solid #DED5C3' : 'none',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                <Icon size={16} color="#C68B59" strokeWidth={2.2} />
                <div style={{ fontFamily: "'Fraunces', serif", fontSize: 19, fontWeight: 700, color: '#2C4533', marginTop: 3 }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: 11, color: '#8A8475', marginTop: 1 }}>{stat.label}</div>
              </div>
            );
          })}
        </section>

        <section
          style={{
            background: '#fff',
            border: '1px solid #DED5C3',
            borderRadius: 16,
            padding: 15,
            marginBottom: 14,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginBottom: 10 }}>
            <h2 style={{ margin: 0, color: '#2C4533', fontSize: 16, fontWeight: 700, fontFamily: "'Fraunces', serif" }}>
              Tentang Mas Anam
            </h2>
            <button
              type="button"
              style={{
                width: 30,
                height: 30,
                border: '1px solid #DED5C3',
                borderRadius: 10,
                background: '#F7F3EC',
                color: '#2C4533',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                flexShrink: 0,
              }}
            >
              <Edit3 size={15} strokeWidth={2.2} />
            </button>
          </div>
          <p style={{ margin: '0 0 12px', color: '#5F665C', fontSize: 12.7, lineHeight: 1.6, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Penggemar barang preloved berkualitas, suka berburu fashion rapi, dan teliti menjaga detail setiap transaksi.
          </p>
          <div style={{ display: 'grid', gap: 8, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {profileDetails.map((info) => {
              const Icon = info.icon;
              return (
                <div key={info.label} style={{ display: 'flex', alignItems: 'center', gap: 9, color: '#232A22', fontSize: 12.3 }}>
                  <span
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 9,
                      background: '#E7EEE3',
                      color: '#2C4533',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={15} strokeWidth={2.2} />
                  </span>
                  <span style={{ color: '#8A8475', flex: 1 }}>{info.label}</span>
                  <strong style={{ color: '#232A22', fontSize: 12, textAlign: 'right' }}>{info.value}</strong>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <BottomNav active={8} onNavigate={onNavigate} />
    </div>
  );
}
