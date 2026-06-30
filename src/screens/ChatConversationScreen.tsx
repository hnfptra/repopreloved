import { useState } from 'react';
import { chatThreads } from '../data/preloved';

type NavigateExtra = { productId?: number; chatId?: number; from?: number };

interface ChatConversationScreenProps {
  onNavigate: (screen: number, extra?: NavigateExtra) => void;
  chatId: number;
}

export default function ChatConversationScreen({ onNavigate, chatId }: ChatConversationScreenProps) {
  const thread = chatThreads.find(c => c.id === chatId) ?? chatThreads[0];
  const [messages, setMessages] = useState(thread.messages);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, '0')}.${now.getMinutes().toString().padStart(2, '0')}`;
    setMessages(prev => [...prev, { from: 'me', text, time }]);
    setInput('');
  };

  return (
    <div className="screen-enter flex flex-col flex-1 min-h-0" style={{ background: '#F7F3EC' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '12px 14px', background: '#fff', borderBottom: '1px solid #DED5C3', flexShrink: 0 }}>
        <button
          onClick={() => onNavigate(6)}
          style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', color: '#2C4533', cursor: 'pointer', flexShrink: 0 }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M15 19l-7-7 7-7"/>
          </svg>
        </button>
        <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#E7EEE3', color: '#2C4533', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.5-6 8-6s8 2 8 6"/>
          </svg>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 14, fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#232A22' }}>{thread.name}</div>
          <div style={{ fontSize: 11.5, color: '#8A8475', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>re: {thread.product}</div>
        </div>
        <button style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', color: '#2C4533', cursor: 'pointer' }}>
          <svg width="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="6" cy="12" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="18" cy="12" r="1.4"/>
          </svg>
        </button>
      </div>

      {/* Product info bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#E7EEE3', padding: '8px 16px', fontSize: 12, fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#2C4533', flexShrink: 0 }}>
        <svg width="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 5l3-2 3 2"/><path d="M5 9l4-4 3 3 3-3 4 4-3 3v9H8v-9z"/>
        </svg>
        <span style={{ fontWeight: 600 }}>{thread.product}</span>
        <span style={{ color: '#8A8475' }}>· Barang ini</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto no-scrollbar" style={{ padding: '16px 16px 12px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{ display: 'flex', justifyContent: msg.from === 'me' ? 'flex-end' : 'flex-start' }}
          >
            {msg.from === 'them' && (
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#E7EEE3', color: '#2C4533', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginRight: 8, alignSelf: 'flex-end' }}>
                <svg width="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.5-6 8-6s8 2 8 6"/>
                </svg>
              </div>
            )}
            <div style={{ maxWidth: '72%' }}>
              <div
                style={{
                  padding: '10px 13px',
                  borderRadius: msg.from === 'me' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  background: msg.from === 'me' ? '#2C4533' : '#fff',
                  color: msg.from === 'me' ? '#fff' : '#232A22',
                  fontSize: 13.5,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  lineHeight: 1.5,
                  border: msg.from === 'me' ? 'none' : '1px solid #DED5C3',
                }}
              >
                {msg.text}
              </div>
              <div style={{ fontSize: 10.5, color: '#8A8475', marginTop: 4, textAlign: msg.from === 'me' ? 'right' : 'left', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {msg.time}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px 16px', background: '#fff', borderTop: '1px solid #DED5C3', flexShrink: 0 }}>
        <input
          type="text"
          placeholder="Ketik pesan..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          style={{ flex: 1, border: '1px solid #DED5C3', borderRadius: 999, padding: '11px 16px', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13.5, color: '#232A22', outline: 'none', background: '#F7F3EC' }}
        />
        <button
          onClick={sendMessage}
          style={{ width: 40, height: 40, borderRadius: '50%', background: '#2C4533', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}
        >
          <svg width="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2">
            <path d="M5 12h14M13 6l6 6-6 6"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
