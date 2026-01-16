
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type ScreenName = 
  | 'landing' | 'login' | 'home' 
  | 'guides' | 'guide-details' | 'booking' | 'active-tour' 
  | 'audio-tours' | 'audio-details' | 'audio-booking' | 'active-audio-tour' 
  | 'coffee-chats' | 'coffee-host-details' | 'coffee-booking' | 'active-coffee-chat' 
  | 'restaurants' | 'restaurant-menu' | 'restaurant-booking' | 'active-restaurant-booking';

interface User {
  name: string;
  email: string;
  isLoggedIn: boolean;
}

interface AppContextType {
  currentScreen: ScreenName;
  navigate: (screen: ScreenName, data?: any) => void;
  goBack: () => void;
  user: User;
  login: (email: string) => void;
  selectedItem: any; // Holds the currently selected guide, tour, etc.
  bookings: any[];
  addBooking: (booking: any) => void;
  notification: string | null;
  showNotification: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [screenStack, setScreenStack] = useState<ScreenName[]>(['landing']);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [user, setUser] = useState<User>({ name: '', email: '', isLoggedIn: false });
  const [bookings, setBookings] = useState<any[]>([]);
  const [notification, setNotification] = useState<string | null>(null);

  const currentScreen = screenStack[screenStack.length - 1];

  const navigate = (screen: ScreenName, data?: any) => {
    if (data) setSelectedItem(data);
    setScreenStack((prev) => [...prev, screen]);
  };

  const goBack = () => {
    if (screenStack.length > 1) {
      setScreenStack((prev) => prev.slice(0, -1));
    }
  };

  const login = (email: string) => {
    setUser({ name: 'Nielson Wats', email, isLoggedIn: true });
    navigate('home');
  };

  const addBooking = (booking: any) => {
    setBookings((prev) => [...prev, booking]);
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <AppContext.Provider value={{ 
      currentScreen, 
      navigate, 
      goBack, 
      user, 
      login, 
      selectedItem, 
      bookings, 
      addBooking,
      notification,
      showNotification
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within an AppProvider');
  return context;
};
