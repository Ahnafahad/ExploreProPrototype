
import React, { useState } from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import LandingScreen from './components/LandingScreen';
import LoginScreen from './components/LoginScreen';
import HomeScreen from './components/HomeScreen';
import GuidesScreen from './components/GuidesScreen';
import GuideDetailsScreen from './components/GuideDetailsScreen';
import BookingScreen from './components/BookingScreen';
import ActiveTourScreen from './components/ActiveTourScreen';
import AudioToursScreen from './components/AudioToursScreen';
import AudioTourDetailsScreen from './components/AudioTourDetailsScreen';
import AudioBookingScreen from './components/AudioBookingScreen';
import ActiveAudioTourScreen from './components/ActiveAudioTourScreen';
import CoffeeChatsScreen from './components/CoffeeChatsScreen';
import CoffeeHostDetailsScreen from './components/CoffeeHostDetailsScreen';
import CoffeeBookingScreen from './components/CoffeeBookingScreen';
import ActiveCoffeeChatScreen from './components/ActiveCoffeeChatScreen';
import RestaurantsScreen from './components/RestaurantsScreen';
import RestaurantMenuScreen from './components/RestaurantMenuScreen';
import RestaurantBookingScreen from './components/RestaurantBookingScreen';
import ActiveRestaurantBookingScreen from './components/ActiveRestaurantBookingScreen';
import { Wifi, Battery, Signal, CheckCircle } from 'lucide-react';

const MainApp: React.FC = () => {
  const { currentScreen, notification } = useAppContext();
  const [language, setLanguage] = useState<'en' | 'zh'>('en');

  // Determine status bar text color (White for dark BGs/Maps, Black for light BGs)
  const isDarkStatus = ['landing', 'login', 'guide-details', 'audio-details', 'active-tour', 'active-audio-tour'].includes(currentScreen);

  return (
    <div className="w-full h-screen bg-[#1c1c1e] flex justify-center items-center font-sans">
      {/* iPhone Frame Simulation */}
      <div className="w-full h-full sm:max-w-[393px] sm:max-h-[852px] sm:rounded-[50px] sm:shadow-[0_0_0_12px_#333,0_0_0_14px_#000,0_20px_50px_rgba(0,0,0,0.5)] bg-white relative flex flex-col overflow-hidden ring-1 ring-black/10">
        
        {/* Dynamic Island / Notch Area */}
        <div className="absolute top-0 left-0 w-full z-[100] px-7 py-3 flex justify-between items-end h-[54px] pointer-events-none">
            <div className={`text-[15px] font-semibold tracking-tight ${isDarkStatus ? 'text-white' : 'text-black'} w-[54px] text-center`}>
              9:41
            </div>
            
            {/* Desktop only notch visual */}
            <div className="hidden sm:block absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[35px] bg-black rounded-b-[24px] z-[101]"></div>

            <div className={`flex items-center gap-1.5 ${isDarkStatus ? 'text-white' : 'text-black'}`}>
                <Signal size={16} fill="currentColor" />
                <Wifi size={16} />
                <div className="relative">
                   <Battery size={24} className="opacity-40" />
                   <div className="absolute inset-0 flex items-center justify-center">
                     <div className="w-[18px] h-[8px] bg-current rounded-[1px] ml-[-2px]"></div>
                   </div>
                </div>
            </div>
        </div>

        {/* In-App Notifications (Dynamic Island style pop-down could be cool, but sticking to prompt) */}
        {notification && (
          <div className="absolute top-14 left-4 right-4 z-[110] animate-[slideDown_0.3s_ease-out]">
             <div className="bg-white/90 ios-blur text-black px-4 py-3 rounded-[20px] shadow-ios-lg flex items-center gap-3 border border-black/5">
                <div className="w-8 h-8 rounded-full bg-ios-green flex items-center justify-center text-white">
                  <CheckCircle size={18} fill="currentColor" className="text-white" />
                </div>
                <span className="font-semibold text-sm">{notification}</span>
             </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 w-full h-full overflow-hidden bg-ios-bg">
          {currentScreen === 'landing' && <LandingScreen />}
          {currentScreen === 'login' && <LoginScreen />}
          {currentScreen === 'home' && <HomeScreen language={language} setLanguage={setLanguage} />}
          {currentScreen === 'guides' && <GuidesScreen />}
          {currentScreen === 'guide-details' && <GuideDetailsScreen />}
          {currentScreen === 'booking' && <BookingScreen />}
          {currentScreen === 'active-tour' && <ActiveTourScreen />}
          
          {currentScreen === 'audio-tours' && <AudioToursScreen />}
          {currentScreen === 'audio-details' && <AudioTourDetailsScreen />}
          {currentScreen === 'audio-booking' && <AudioBookingScreen />}
          {currentScreen === 'active-audio-tour' && <ActiveAudioTourScreen />}
          
          {currentScreen === 'coffee-chats' && <CoffeeChatsScreen />}
          {currentScreen === 'coffee-host-details' && <CoffeeHostDetailsScreen />}
          {currentScreen === 'coffee-booking' && <CoffeeBookingScreen />}
          {currentScreen === 'active-coffee-chat' && <ActiveCoffeeChatScreen />}
          
          {currentScreen === 'restaurants' && <RestaurantsScreen />}
          {currentScreen === 'restaurant-menu' && <RestaurantMenuScreen />}
          {currentScreen === 'restaurant-booking' && <RestaurantBookingScreen />}
          {currentScreen === 'active-restaurant-booking' && <ActiveRestaurantBookingScreen />}
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-1 left-0 w-full h-[20px] z-[100] flex justify-center items-end pointer-events-none">
           <div className="w-[130px] h-[5px] bg-black/20 rounded-full mb-2"></div>
        </div>

      </div>
    </div>
  );
};

const App: React.FC = () => (
  <AppProvider>
    <MainApp />
  </AppProvider>
);

export default App;
