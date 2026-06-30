import { useState } from 'react';
import ScreenHeader from '../components/preloved/ScreenHeader';

type NavigateExtra = { productId?: number; chatId?: number; from?: number };

interface AlamatScreenProps {
  onNavigate: (screen: number, extra?: NavigateExtra) => void;
}

const defaultAddress = {
  label: 'Rumah Utama',
  address: 'Jl. Sudirman No. 45, Jakarta Selatan, DKI Jakarta 12190',
  recipient: 'User Preloved',
  phone: '+62 812-3456-7890',
  note: 'Titip ke satpam jika tidak ada di rumah',
};

const getSavedAddress = () => {
  try {
    const raw = localStorage.getItem('preloved-address');
    return raw ? { ...defaultAddress, ...JSON.parse(raw) } : defaultAddress;
  } catch {
    return defaultAddress;
  }
};

export default function AlamatScreen({ onNavigate }: AlamatScreenProps) {
  const [address, setAddress] = useState(getSavedAddress);
  const [draft, setDraft] = useState(address);
  const [isEditing, setIsEditing] = useState(false);

  const updateDraft = (key: keyof typeof defaultAddress, value: string) => {
    setDraft((current) => ({ ...current, [key]: value }));
  };

  const saveAddress = () => {
    setAddress(draft);
    localStorage.setItem('preloved-address', JSON.stringify(draft));
    setIsEditing(false);
  };

  return (
    <div className="screen-enter flex flex-col flex-1 min-h-0" style={{ background: '#F7F3EC' }}>
      <ScreenHeader title="Alamat" onBack={() => onNavigate(8)} />

      <div className="flex-1 overflow-y-auto no-scrollbar" style={{ padding: '18px' }}>
        <button
          type="button"
          className="address-weather-card"
          onClick={() => {
            setDraft(address);
            setIsEditing(true);
          }}
          style={{
            width: '100%',
            minHeight: 235,
            position: 'relative',
            padding: 24,
            overflow: 'hidden',
            border: '1px solid #DED5C3',
            background:
              'radial-gradient(178.94% 106.41% at 26.42% 106.41%, #E9F2DD 0%, rgba(255,255,255,0) 71.88%), #FFFFFF',
            boxShadow:
              '0px 155px 62px rgba(0, 0, 0, 0.01), 0px 87px 52px rgba(0, 0, 0, 0.05), 0px 39px 39px rgba(0, 0, 0, 0.09), 0px 10px 21px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1)',
            borderRadius: 23,
            cursor: 'pointer',
            textAlign: 'left',
            color: '#2C4533',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}
        >
          <div
            style={{
              width: 250,
              height: 250,
              position: 'absolute',
              right: -70,
              top: -58,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: 'scale(0.62)',
            }}
          >
            <div
              className="address-sunshine"
              style={{
                width: 120,
                height: 120,
                background: 'linear-gradient(to right, #F4B860, #F6DFA1)',
                borderRadius: 60,
                position: 'absolute',
              }}
            />
            <div
              style={{
                width: 120,
                height: 120,
                background: 'linear-gradient(to right, #F4B860, #F6DFA1)',
                borderRadius: 60,
                position: 'absolute',
              }}
            />
            <div className="address-cloud-front" style={{ paddingTop: 45, marginLeft: 25, position: 'absolute', zIndex: 11 }}>
              <span style={{ width: 65, height: 65, borderRadius: '50% 50% 0 50%', backgroundColor: '#AFC7A0', display: 'inline-block' }} />
              <span style={{ width: 45, height: 45, borderRadius: '50% 50% 50% 0', backgroundColor: '#AFC7A0', display: 'inline-block', marginLeft: -25 }} />
            </div>
            <div className="address-cloud-back" style={{ marginTop: -30, marginLeft: 150, position: 'absolute', zIndex: 12 }}>
              <span style={{ width: 30, height: 30, borderRadius: '50% 50% 0 50%', backgroundColor: '#CFE0C4', display: 'inline-block' }} />
              <span style={{ width: 50, height: 50, borderRadius: '50% 50% 50% 0', backgroundColor: '#CFE0C4', display: 'inline-block', marginLeft: -20 }} />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 205, position: 'relative', zIndex: 2 }}>
            <span style={{ wordBreak: 'break-word', fontWeight: 800, fontSize: 15, lineHeight: '135%', color: 'rgba(44, 69, 51, 0.76)' }}>
              {address.label}
            </span>
            <span style={{ fontWeight: 700, fontSize: 13, lineHeight: '150%', color: 'rgba(44, 69, 51, 0.55)' }}>
              {address.address}
            </span>
          </div>

          <div style={{ position: 'absolute', left: 25, bottom: 18, fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: 46, lineHeight: '56px', color: '#2C4533' }}>
            ID
          </div>
          <div
            style={{
              width: 92,
              height: 36,
              position: 'absolute',
              right: 25,
              bottom: 25,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(44, 69, 51, 0.08)',
              borderRadius: 9,
            }}
          >
            <span style={{ fontWeight: 700, fontSize: 12, lineHeight: '134.49%', color: 'rgba(44, 69, 51, 0.66)' }}>
              Utama
            </span>
          </div>
        </button>

        <div style={{ marginTop: 18, background: '#fff', border: '1px solid #DED5C3', borderRadius: 14, padding: 14 }}>
          {[
            ['Penerima', address.recipient],
            ['Telepon', address.phone],
            ['Catatan', address.note],
          ].map(([label, value]) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginBottom: label === 'Catatan' ? 0 : 10, fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12.5 }}>
              <span style={{ color: '#8A8475' }}>{label}</span>
              <span style={{ color: '#232A22', fontWeight: 700, textAlign: 'right' }}>{value}</span>
            </div>
          ))}
        </div>

        {isEditing && (
          <div style={{ marginTop: 14, background: '#fff', border: '1px solid #DED5C3', borderRadius: 16, padding: 14 }}>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 16, fontWeight: 700, color: '#2C4533', marginBottom: 12 }}>
              Ubah Alamat
            </div>
            {[
              ['label', 'Label alamat', 'Contoh: Rumah Utama'],
              ['recipient', 'Penerima', 'Nama penerima'],
              ['phone', 'Telepon', 'Nomor telepon'],
              ['address', 'Alamat lengkap', 'Tulis alamat lengkap'],
              ['note', 'Catatan', 'Catatan pengiriman'],
            ].map(([key, label, placeholder]) => (
              <label key={key} style={{ display: 'block', marginBottom: 10, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                <span style={{ display: 'block', color: '#8A8475', fontSize: 11.5, fontWeight: 700, marginBottom: 5 }}>{label}</span>
                {key === 'address' || key === 'note' ? (
                  <textarea
                    value={draft[key as keyof typeof defaultAddress]}
                    onChange={(event) => updateDraft(key as keyof typeof defaultAddress, event.target.value)}
                    placeholder={placeholder}
                    rows={key === 'address' ? 3 : 2}
                    style={{ width: '100%', border: '1px solid #DED5C3', borderRadius: 10, padding: '10px 11px', resize: 'vertical', color: '#232A22', fontSize: 12.5, fontFamily: "'Plus Jakarta Sans', sans-serif", outlineColor: '#2C4533' }}
                  />
                ) : (
                  <input
                    value={draft[key as keyof typeof defaultAddress]}
                    onChange={(event) => updateDraft(key as keyof typeof defaultAddress, event.target.value)}
                    placeholder={placeholder}
                    style={{ width: '100%', border: '1px solid #DED5C3', borderRadius: 10, padding: '10px 11px', color: '#232A22', fontSize: 12.5, fontFamily: "'Plus Jakarta Sans', sans-serif", outlineColor: '#2C4533' }}
                  />
                )}
              </label>
            ))}
            <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
              <button
                type="button"
                onClick={() => {
                  setDraft(address);
                  setIsEditing(false);
                }}
                style={{ flex: 1, border: '1.5px solid #2C4533', background: '#fff', color: '#2C4533', borderRadius: 999, padding: '11px 0', fontWeight: 800, fontSize: 13, fontFamily: "'Plus Jakarta Sans', sans-serif", cursor: 'pointer' }}
              >
                Batal
              </button>
              <button
                type="button"
                onClick={saveAddress}
                style={{ flex: 1, border: 'none', background: '#2C4533', color: '#fff', borderRadius: 999, padding: '11px 0', fontWeight: 800, fontSize: 13, fontFamily: "'Plus Jakarta Sans', sans-serif", cursor: 'pointer' }}
              >
                Simpan
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
