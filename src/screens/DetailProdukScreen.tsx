import { useState } from 'react';
import ScreenHeader from '../components/preloved/ScreenHeader';
import { products, formatRupiah } from '../data/preloved';

type NavigateExtra = { productId?: number; chatId?: number; from?: number };

interface DetailProdukScreenProps {
  onNavigate: (screen: number, extra?: NavigateExtra) => void;
  productId: number;
}

const productIcons: Record<string, React.ReactNode> = {
  Pakaian: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 5l3-2 3 2"/><path d="M5 9l4-4 3 3 3-3 4 4-3 3v9H8v-9z"/></svg>,
  Tas: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 8V6a4 4 0 018 0v2"/><rect x="4" y="8" width="16" height="12" rx="2"/></svg>,
  Sepatu: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 16l4-9 3 5 3-7 3 7 3-5 2 9z"/></svg>,
  Aksesoris: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/></svg>,
};

export default function DetailProdukScreen({ onNavigate, productId }: DetailProdukScreenProps) {
  const product = products.find(p => p.id === productId) ?? products[0];
  const [liked, setLiked] = useState(false);

  return (
    <div className="screen-enter flex flex-col flex-1 min-h-0" style={{ background: '#F7F3EC' }}>
      <ScreenHeader
        title="Detail Produk"
        onBack={() => onNavigate(2)}
        rightAction={
          <button
            onClick={() => setLiked(v => !v)}
            style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', color: liked ? '#C1543C' : '#2C4533', cursor: 'pointer', flexShrink: 0 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
              <path d="M12 21s-7-4.5-9.5-9C.7 8.4 2.4 5 6 5c2 0 3.3 1 4 2.2C10.7 6 12 5 14 5c3.6 0 5.3 3.4 3.5 7-2.5 4.5-9.5 9-9.5 9z"/>
            </svg>
          </button>
        }
      />
      <div className="flex-1 overflow-y-auto no-scrollbar" style={{ padding: '16px 18px 18px' }}>
        {/* Product image */}
        <div style={{ aspectRatio: '1/0.88', background: product.bg, borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', color: product.iconColor, marginBottom: 10, position: 'relative' }}>
          <div style={{ width: '32%' }}>{productIcons[product.category] ?? productIcons['Pakaian']}</div>
        </div>
        {/* Dots */}
        <div style={{ display: 'flex', gap: 5, justifyContent: 'center', marginBottom: 16 }}>
          <span style={{ width: 16, height: 5, borderRadius: 4, background: '#2C4533', display: 'block' }}></span>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#DED5C3', display: 'block' }}></span>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#DED5C3', display: 'block' }}></span>
        </div>

        <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 18, fontWeight: 700, margin: '0 0 2px', color: '#232A22' }}>
          {product.name}
        </h3>
        <div style={{ fontFamily: "'Fraunces', serif", fontSize: 24, fontWeight: 600, color: '#C1543C', margin: '2px 0 10px' }}>
          {formatRupiah(product.price)}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16, fontFamily: "'Plus Jakarta Sans', sans-serif", flexWrap: 'wrap' }}>
          <svg width="13" viewBox="0 0 24 24" fill="none" stroke="#8A8475" strokeWidth="2"><path d="M12 21s7-7.5 7-12a7 7 0 10-14 0c0 4.5 7 12 7 12z"/><circle cx="12" cy="9" r="2.3"/></svg>
          <span style={{ fontSize: 12.5, color: '#8A8475' }}>{product.location}</span>
          <span style={{ width: 3, height: 3, borderRadius: '50%', background: '#DED5C3', display: 'block' }}></span>
          <span style={{ fontSize: 12.5, color: '#8A8475' }}>{product.timeAgo}</span>
        </div>

        {/* Seller */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#fff', border: '1px solid #DED5C3', borderRadius: 12, padding: '11px 14px', marginBottom: 14 }}>
          <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#E7EEE3', color: '#2C4533', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.5-6 8-6s8 2 8 6"/></svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 13, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{product.seller}</div>
            <div style={{ fontSize: 11.5, color: '#8A8475', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Penjual · {product.location}</div>
          </div>
          <span style={{ fontSize: 12, color: '#C68B59', fontWeight: 700, fontFamily: "'Plus Jakarta Sans', sans-serif", cursor: 'pointer' }}>Lihat profil</span>
        </div>

        {/* Description */}
        <div style={{ background: '#fff', border: '1px solid #DED5C3', borderRadius: 14, padding: 14, marginBottom: 14 }}>
          <div style={{ fontWeight: 700, fontSize: 13, color: '#2C4533', marginBottom: 7, fontFamily: "'Fraunces', serif" }}>Deskripsi</div>
          <p style={{ margin: '0 0 12px', fontSize: 13.5, color: '#232A22', lineHeight: 1.6, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {product.description}
          </p>
          <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: '#E7EEE3', color: '#2C4533', fontWeight: 700, fontSize: 11.5, padding: '4px 10px', borderRadius: 999, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Kondisi {product.condition}
            </span>
            {product.tags.map(tag => (
              <span key={tag} style={{ display: 'inline-flex', alignItems: 'center', background: '#F1E2CC', color: '#8A5C36', fontWeight: 700, fontSize: 11.5, padding: '4px 10px', borderRadius: 999, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div style={{ padding: '12px 18px 20px', background: '#F7F3EC', flexShrink: 0, borderTop: '1px solid #DED5C3' }}>
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={() => onNavigate(6)}
            style={{ flex: 1, background: '#fff', color: '#2C4533', border: '1.5px solid #2C4533', borderRadius: 999, padding: '14px 0', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 14.5, cursor: 'pointer' }}
          >
            Chat Penjual
          </button>
          <button
            onClick={() => onNavigate(7, { productId: product.id })}
            style={{ flex: 1, background: '#2C4533', color: '#fff', border: 'none', borderRadius: 999, padding: '15px 0', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 14.5, cursor: 'pointer' }}
          >
            Beli Sekarang
          </button>
        </div>
      </div>
    </div>
  );
}
