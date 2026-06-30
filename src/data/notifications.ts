// src/data/notifications.ts
export interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  type: 'order' | 'message' | 'system' | 'promo';
}

export const notifications: Notification[] = [
  {
    id: 1,
    title: 'Pesanan Baru',
    message: 'Pesanan untuk Kemeja Flanel Kotak telah dikonfirmasi oleh pembeli.',
    time: '5 menit lalu',
    isRead: false,
    type: 'order',
  },
  {
    id: 2,
    title: 'Pesan Masuk',
    message: 'Nina R. mengirim pesan tentang produk Sneakers Putih.',
    time: '15 menit lalu',
    isRead: false,
    type: 'message',
  },
  {
    id: 3,
    title: 'Produk Terjual',
    message: 'Selamat! Tas Selempang Kulit telah berhasil terjual.',
    time: '1 jam lalu',
    isRead: false,
    type: 'order',
  },
  {
    id: 4,
    title: 'Promo Spesial',
    message: 'Diskon 20% untuk semua produk preloved! Kode: PRELOVED20',
    time: '3 jam lalu',
    isRead: true,
    type: 'promo',
  },
  {
    id: 5,
    title: 'System Update',
    message: 'Fitur pencarian baru telah ditambahkan. Coba cari barang favoritmu!',
    time: '5 jam lalu',
    isRead: true,
    type: 'system',
  },
];

export const getUnreadCount = (): number => {
  return notifications.filter(n => !n.isRead).length;
};