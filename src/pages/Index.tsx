// src/pages/Index.tsx
import { useState, useEffect } from 'react';
import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import KategoriScreen from '../screens/KategoriScreen';
import DetailProdukScreen from '../screens/DetailProdukScreen';
import JualBarangScreen from '../screens/JualBarangScreen';
import ChatScreen from '../screens/ChatScreen';
import ChatConversationScreen from '../screens/ChatConversationScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import AkunScreen from '../screens/AkunScreen';
import OrderSuccessScreen from '../screens/OrderSuccessScreen';
import SearchScreen from '../screens/SearchScreen';
import NotificationScreen from '../screens/NotificationScreen';
import React from 'react';

type NavigateExtra = { productId?: number; chatId?: number; from?: number; searchQuery?: string; category?: string };

export default function Index() {
  const [currentScreen, setCurrentScreen] = useState(1);
  const [selectedProductId, setSelectedProductId] = useState(1);
  const [selectedChatId, setSelectedChatId] = useState(1);
  const [prevScreen, setPrevScreen] = useState(2);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isFromCategory, setIsFromCategory] = useState(false);
  
  // State untuk melacak level kategori
  const [categoryLevel, setCategoryLevel] = useState<'main' | 'products' | 'detail'>('main');
  const [lastCategoryScreen, setLastCategoryScreen] = useState<number>(3);

  // Reset kategori hanya jika user benar-benar keluar dari flow kategori
  useEffect(() => {
    // Jika pindah ke screen selain Kategori (3) dan Detail Produk (4)
    // Simpan screen terakhir untuk kategori
    if (currentScreen !== 3 && currentScreen !== 4) {
      // Jika sedang di kategori atau detail produk, simpan screen terakhir
      if (currentScreen === 3 || currentScreen === 4) {
        setLastCategoryScreen(currentScreen);
      }
    }
  }, [currentScreen]);

  const navigate = (screen: number, extra?: NavigateExtra) => {
    setPrevScreen(currentScreen);
    if (extra?.productId !== undefined) setSelectedProductId(extra.productId);
    if (extra?.chatId !== undefined) setSelectedChatId(extra.chatId);
    if (extra?.searchQuery !== undefined) setSearchQuery(extra.searchQuery);
    
    // Jika navigasi ke kategori dengan category, berarti masuk ke halaman produk kategori
    if (screen === 3 && extra?.category !== undefined) {
      setSelectedCategory(extra.category);
      setIsFromCategory(true);
      setCategoryLevel('products');
      setLastCategoryScreen(3);
    }
    
    // Jika navigasi ke kategori tanpa category (dari bottom nav)
    if (screen === 3 && extra?.category === undefined) {
      // Cek level sebelumnya
      if (categoryLevel === 'detail' && selectedCategory) {
        // Tetap di detail produk
        setLastCategoryScreen(4);
        setCurrentScreen(4);
        return;
      } else if (categoryLevel === 'products' && selectedCategory) {
        // Tetap di halaman produk kategori
        setLastCategoryScreen(3);
        setCurrentScreen(3);
        return;
      } else {
        // Reset ke halaman utama kategori
        setSelectedCategory(null);
        setIsFromCategory(false);
        setCategoryLevel('main');
        setLastCategoryScreen(3);
      }
    }
    
    // Jika navigasi ke detail produk
    if (screen === 4) {
      if (extra?.category) {
        setSelectedCategory(extra.category);
        setIsFromCategory(true);
        setCategoryLevel('detail');
        setLastCategoryScreen(4);
      } else if (selectedCategory) {
        // Jika tidak ada category tapi ada selectedCategory, tetap gunakan
        setCategoryLevel('detail');
        setLastCategoryScreen(4);
      }
    }
    
    // Jika pindah ke screen lain (bukan kategori), simpan state
    if (screen !== 3 && screen !== 4) {
      // State tetap dipertahankan
    }
    
    setCurrentScreen(screen);
  };

  // Fungsi untuk kembali dari detail produk
  const handleBackFromDetail = () => {
    if (selectedCategory) {
      // Kembali ke halaman produk kategori
      setCategoryLevel('products');
      setCurrentScreen(3);
    } else {
      setCurrentScreen(prevScreen);
    }
  };

  // Fungsi untuk kembali dari halaman produk kategori
  const handleBackFromCategoryProduct = () => {
    // Kembali ke halaman kategori utama
    setCategoryLevel('main');
    setSelectedCategory(null);
    setIsFromCategory(false);
    // Tetap di screen 3
  };

  // Fungsi untuk navigasi ke kategori dari bottom nav
  const handleNavigateToCategory = () => {
    // Berdasarkan level saat ini, tetap di posisi yang sama
    if (categoryLevel === 'detail' && selectedCategory) {
      setCurrentScreen(4);
      return;
    }
    
    if (categoryLevel === 'products' && selectedCategory) {
      setCurrentScreen(3);
      return;
    }
    
    // Default ke halaman utama kategori
    setCategoryLevel('main');
    setSelectedCategory(null);
    setIsFromCategory(false);
    setCurrentScreen(3);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 1:
        return <SplashScreen onNavigate={navigate} />;
      case 2:
        return <HomeScreen onNavigate={navigate} />;
      case 3:
        return <KategoriScreen 
          onNavigate={navigate} 
          selectedCategory={selectedCategory}
          isInCategoryDetail={categoryLevel === 'products' || categoryLevel === 'detail'}
          onBackFromCategoryProduct={handleBackFromCategoryProduct}
          onLeaveCategory={() => {
            // Saat keluar dari kategori, reset hanya jika di level main
            if (categoryLevel === 'main') {
              setSelectedCategory(null);
              setIsFromCategory(false);
            }
          }}
        />;
      case 4:
        return <DetailProdukScreen 
          onNavigate={navigate} 
          productId={selectedProductId} 
          prevScreen={prevScreen}
          onBack={handleBackFromDetail}
        />;
      case 5:
        return <JualBarangScreen onNavigate={navigate} />;
      case 6:
        return <ChatScreen onNavigate={navigate} />;
      case 61:
        return <ChatConversationScreen onNavigate={navigate} chatId={selectedChatId} />;
      case 7:
        return <CheckoutScreen onNavigate={navigate} productId={selectedProductId} />;
      case 8:
        return <AkunScreen onNavigate={navigate} />;
      case 10:
        return <OrderSuccessScreen onNavigate={navigate} productId={selectedProductId} />;
      case 11:
        return <SearchScreen onNavigate={navigate} searchQuery={searchQuery} />;
      case 12:
        return <NotificationScreen onNavigate={navigate} />;
      default:
        return <SplashScreen onNavigate={navigate} />;
    }
  };

  return (
    <div className="preloved-bg" style={{ 
      width: '100%', 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      background: '#F7F3EC'
    }}>
      <div style={{ 
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        background: '#F7F3EC',
        overflow: 'hidden'
      }}>
        {renderScreen()}
      </div>
    </div>
  );
}