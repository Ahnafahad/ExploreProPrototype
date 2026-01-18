import React from 'react';
import { Home, Compass, MessageCircle, User } from 'lucide-react';
import { ScreenName } from '../../context/AppContext';

interface TabBarProps {
  activeTab: 'home' | 'map' | 'chat' | 'profile';
  onNavigate: (screen: ScreenName) => void;
}

export const TabBar: React.FC<TabBarProps> = ({ activeTab, onNavigate }) => {
  return (
    <div className="absolute bottom-0 left-0 w-full bg-white/80 ios-blur border-t border-black/5 pt-3 pb-6 px-6 flex justify-between items-center z-[100]">
      {/* Home */}
      <div
        className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${
          activeTab === 'home' ? 'text-ios-blue' : 'text-gray-400 hover:text-ios-blue'
        }`}
        onClick={() => onNavigate('home')}
      >
        <Home size={24} strokeWidth={2.5} />
        <span className="text-[10px] font-medium">Explore</span>
      </div>

      {/* Map */}
      <div
        className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${
          activeTab === 'map' ? 'text-ios-blue' : 'text-gray-400 hover:text-ios-blue'
        }`}
        onClick={() => onNavigate('map')}
      >
        <Compass size={24} strokeWidth={2.5} />
        <span className="text-[10px] font-medium">Map</span>
      </div>

      {/* Chat */}
      <div
        className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${
          activeTab === 'chat' ? 'text-ios-blue' : 'text-gray-400 hover:text-ios-blue'
        }`}
        onClick={() => onNavigate('chat')}
      >
        <MessageCircle size={24} strokeWidth={2.5} />
        <span className="text-[10px] font-medium">Chat</span>
      </div>

      {/* Profile */}
      <div
        className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${
          activeTab === 'profile' ? 'text-ios-blue' : 'text-gray-400 hover:text-ios-blue'
        }`}
        onClick={() => onNavigate('profile')}
      >
        <User size={24} strokeWidth={2.5} />
        <span className="text-[10px] font-medium">Profile</span>
      </div>
    </div>
  );
};
