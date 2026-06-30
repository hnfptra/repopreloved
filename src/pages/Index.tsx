// src/pages/Index.tsx
import { useState } from 'react';
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

type NavigateExtra = { productId?: number; chatId?: number; from?: number; searchQuery?: string };

export default function Index() {
  const [currentScreen, setCurrentScreen] = useState(1);
  const [selectedProductId, setSelectedProductId] = useState(1);
  const [selectedChatId, setSelectedChatId] = useState(1);
  const [prevScreen, setPrevScreen] = useState(2);
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = (screen: number, extra?: NavigateExtra) => {
    setPrevScreen(currentScreen);
    if (extra?.productId !== undefined) setSelectedProductId(extra.productId);
    if (extra?.chatId !== undefined) setSelectedChatId(extra.chatId);
    if (extra?.searchQuery !== undefined) setSearchQuery(extra.searchQuery);
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 1:
        return <SplashScreen onNavigate={navigate} />;
      case 2:
        return <HomeScreen onNavigate={navigate} />;
      case 3:
        return <KategoriScreen onNavigate={navigate} />;
      case 4:
        return <DetailProdukScreen onNavigate={navigate} productId={selectedProductId} prevScreen={prevScreen} />;
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
      case 12: // Screen Notifikasi
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