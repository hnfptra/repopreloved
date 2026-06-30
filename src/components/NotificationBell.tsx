// src/components/NotificationBell.tsx
import React, { useState, useEffect, useRef } from 'react';
import { notifications, getUnreadCount, Notification } from '../data/notifications';

interface NotificationBellProps {
  onNavigate?: (screen: number) => void;
}

const NotificationBell: React.FC<NotificationBellProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(getUnreadCount());
  const [notifList, setNotifList] = useState(notifications);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setUnreadCount(notifList.filter(n => !n.isRead).length);
  }, [notifList]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleNotificationClick = (notification: Notification) => {
    const updatedList = notifList.map(n => 
      n.id === notification.id ? { ...n, isRead: true } : n
    );
    setNotifList(updatedList);
    setUnreadCount(updatedList.filter(n => !n.isRead).length);
    setIsOpen(false);
    
    // Navigasi ke halaman notifikasi
    if (onNavigate) {
      onNavigate(12);
    }
  };

  const markAllAsRead = () => {
    const updatedList = notifList.map(n => ({ ...n, isRead: true }));
    setNotifList(updatedList);
    setUnreadCount(0);
  };

  const handleViewAll = () => {
    setIsOpen(false);
    if (onNavigate) {
      onNavigate(12);
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'order': return '#2C4533';
      case 'message': return '#3F6048';
      case 'promo': return '#C68B59';
      case 'system': return '#8A8475';
      default: return '#2C4533';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'order': return '🛍️ Pesanan';
      case 'message': return '💬 Pesan';
      case 'promo': return '🎉 Promo';
      case 'system': return '⚙️ Sistem';
      default: return '';
    }
  };

  // Ambil 3 notifikasi terbaru untuk dropdown
  const recentNotifs = notifList.slice(0, 3);

  return (
    <div style={{ position: 'relative' }} ref={dropdownRef}>
      {/* Tombol Bell */}
      <button
        onClick={toggleDropdown}
        style={{
          width: 34,
          height: 34,
          borderRadius: '50%',
          background: '#fff',
          border: '1px solid #DED5C3',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          color: '#2C4533',
          cursor: 'pointer',
          position: 'relative',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#F0EDE6';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = '#fff';
        }}
      >
        {/* Icon Bel */}
        <svg width="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 8a6 6 0 0112 0c0 4 1.5 5.5 1.5 6.5H4.5C4.5 13.5 6 12 6 8z"/>
          <path d="M9.5 18a2.5 2.5 0 005 0"/>
        </svg>

        {/* Badge Merah */}
        {unreadCount > 0 && (
          <div
            style={{
              position: 'absolute',
              top: -2,
              right: -2,
              width: 18,
              height: 18,
              borderRadius: '50%',
              background: '#E74C3C',
              color: '#fff',
              fontSize: 9,
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid #fff',
            }}
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </div>
        )}
      </button>

      {/* Dropdown Notifikasi */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            right: 0,
            width: 320,
            maxHeight: 380,
            background: '#fff',
            borderRadius: 12,
            border: '1px solid #DED5C3',
            boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
            zIndex: 100,
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 16px',
            borderBottom: '1px solid #F0EDE6',
          }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#232A22' }}>
              Notifikasi
            </span>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                style={{
                  fontSize: 11,
                  color: '#C68B59',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Tandai semua
              </button>
            )}
          </div>

          {/* Daftar Notifikasi */}
          <div style={{ maxHeight: 280, overflowY: 'auto' }}>
            {recentNotifs.length === 0 ? (
              <div style={{ padding: '30px 16px', textAlign: 'center' }}>
                <span style={{ fontSize: 32, display: 'block', marginBottom: 8 }}>🔔</span>
                <p style={{ fontSize: 13, color: '#8A8475' }}>Tidak ada notifikasi</p>
              </div>
            ) : (
              recentNotifs.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => handleNotificationClick(notif)}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 10,
                    padding: '10px 16px',
                    borderBottom: '1px solid #F5F2EB',
                    cursor: 'pointer',
                    background: notif.isRead ? 'transparent' : '#F5F9F0',
                    transition: 'background 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#F0EDE6';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = notif.isRead ? 'transparent' : '#F5F9F0';
                  }}
                >
                  {!notif.isRead && (
                    <div
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: '#E74C3C',
                        flexShrink: 0,
                        marginTop: 5,
                      }}
                    />
                  )}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 1 }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: '#232A22' }}>
                        {notif.title}
                      </span>
                      <span style={{ 
                        fontSize: 8, 
                        color: getIconColor(notif.type),
                        background: `${getIconColor(notif.type)}15`,
                        padding: '1px 6px',
                        borderRadius: 999,
                      }}>
                        {getTypeLabel(notif.type)}
                      </span>
                    </div>
                    <p style={{ fontSize: 11, color: '#6B6B6B', margin: 0, lineHeight: 1.3 }}>
                      {notif.message.length > 50 ? notif.message.substring(0, 50) + '...' : notif.message}
                    </p>
                    <span style={{ fontSize: 9, color: '#B0A99A', display: 'block', marginTop: 2 }}>
                      {notif.time}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer - Lihat Semua */}
          <div style={{
            padding: '10px 16px',
            borderTop: '1px solid #F0EDE6',
            textAlign: 'center',
          }}>
            <button
              onClick={handleViewAll}
              style={{
                fontSize: 12,
                color: '#2C4533',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 500,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                width: '100%',
              }}
            >
              Lihat semua notifikasi →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;