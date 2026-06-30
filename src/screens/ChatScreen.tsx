import { useState } from 'react';
import BottomNav from '../components/preloved/BottomNav';
import { chatThreads } from '../data/preloved';

type NavigateExtra = { productId?: number; chatId?: number; from?: number };

interface ChatScreenProps {
  onNavigate: (screen: number, extra?: NavigateExtra) => void;
}

const tabs = ['Semua', 'Belum Dibalas', 'Arsip'];

export default function ChatScreen({ onNavigate }: ChatScreenProps) {
  const [activeTab, setActiveTab] = useState('Semua');

  const filtered = activeTab === 'Belum Dibalas'
    ? chatThreads.filter(c => c.unread > 0)
    : chatThreads;

  return (
    <div className="screen-enter flex flex-col flex-1 min-h-0" style={{ background: '#F7F3EC' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px 12px', background: '#fff', borderBottom: '1px solid #DED5C3', flexShrink: 0 }}>
        <div style={{ width: 32 }} />
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 17, fontWeight: 600, margin: 0, color: '#2C4533', flex: 1, textAlign: 'center' }}>Chat</h2>
        <div style={{ width: 32 }} />
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar" style={{ padding: '14px 18px 18px' }}>
        {/* Search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fff', border: '1px solid #DED5C3', borderRadius: 999, padding: '11px 16px', color: '#8A8475', fontSize: 13.5, fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: 0 }}>
          <svg width="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
            <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>
          </svg>
          Cari percakapan
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 18, margin: '16px 0 6px', borderBottom: '1px solid #DED5C3' }}>
          {tabs.map(tab => (
            <div
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{ fontSize: 13, fontWeight: 700, paddingBottom: 10, cursor: 'pointer', position: 'relative', color: activeTab === tab ? '#2C4533' : '#8A8475', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {tab}
              {activeTab === tab && <div style={{ position: 'absolute', bottom: -1, left: 0, right: 0, height: 2, background: '#2C4533', borderRadius: 2 }} />}
            </div>
          ))}
        </div>

        {/* Chat list */}
        <div>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#8A8475', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13 }}>
              Tidak ada percakapan
            </div>
          ) : filtered.map(chat => (
            <div
              key={chat.id}
              onClick={() => onNavigate(61, { chatId: chat.id })}
              style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 0', borderBottom: '1px solid #DED5C3', cursor: 'pointer' }}
            >
              <div style={{ width: 46, height: 46, borderRadius: '50%', background: '#E7EEE3', color: '#2C4533', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.5-6 8-6s8 2 8 6"/>
                </svg>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 2, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{chat.name}</div>
                <div style={{ fontSize: 12, color: '#8A8475', fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: 2 }}>
                  re: {chat.product}
                </div>
                <div style={{ fontSize: 12.5, color: '#8A8475', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{chat.lastMsg}</div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <span style={{ fontSize: 11, color: '#8A8475', display: 'block', marginBottom: 5, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{chat.time}</span>
                {chat.unread > 0 && (
                  <span style={{ width: 19, height: 19, borderRadius: '50%', background: '#C1543C', color: '#fff', fontSize: 10, fontWeight: 700, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                    {chat.unread}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomNav active={6} onNavigate={onNavigate} />
    </div>
  );
}
