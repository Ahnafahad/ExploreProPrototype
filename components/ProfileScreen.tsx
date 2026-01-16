
import React from 'react';
import {
  ArrowLeft, ChevronRight, User, Heart, Bell, CreditCard,
  Globe, Shield, HelpCircle, LogOut, Star, MapPin, Calendar
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const ProfileScreen: React.FC = () => {
  const { goBack, user, bookings } = useAppContext();

  const stats = [
    { label: 'Tours Taken', value: bookings.length, icon: <MapPin size={20} /> },
    { label: 'Reviews', value: '12', icon: <Star size={20} /> },
    { label: 'Member Since', value: '2024', icon: <Calendar size={20} /> }
  ];

  const menuSections = [
    {
      title: 'Account',
      items: [
        { icon: <User size={22} />, label: 'Edit Profile', badge: null },
        { icon: <Heart size={22} />, label: 'Favorites', badge: '8' },
        { icon: <Calendar size={22} />, label: 'My Bookings', badge: bookings.length.toString() }
      ]
    },
    {
      title: 'Preferences',
      items: [
        { icon: <Bell size={22} />, label: 'Notifications', badge: null },
        { icon: <Globe size={22} />, label: 'Language', badge: 'English' },
        { icon: <CreditCard size={22} />, label: 'Payment Methods', badge: null }
      ]
    },
    {
      title: 'Support',
      items: [
        { icon: <Shield size={22} />, label: 'Privacy & Safety', badge: null },
        { icon: <HelpCircle size={22} />, label: 'Help Center', badge: null }
      ]
    }
  ];

  return (
    <div className="w-full h-full flex flex-col bg-ios-bg font-sans">

      {/* Header */}
      <div className="sticky top-0 z-50 bg-ios-bg/80 ios-blur border-b border-black/5 pt-12 pb-4 px-5">
        <div className="flex items-center justify-between">
          <button
            onClick={goBack}
            className="text-ios-blue cursor-pointer active:opacity-50"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-[17px] font-semibold text-black">Profile</h1>
          <div className="w-6"></div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24 scrollbar-hide">

        {/* Profile Header */}
        <div className="px-5 pt-6 pb-8 bg-white border-b border-gray-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <img
                src="https://i.pravatar.cc/150?img=11"
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover"
              />
              <div className="absolute bottom-0 right-0 w-7 h-7 bg-ios-green rounded-full border-4 border-white"></div>
            </div>
            <div className="flex-1">
              <h2 className="text-[24px] font-bold text-black mb-1">{user.name || 'Guest User'}</h2>
              <p className="text-sm text-gray-500 mb-2">{user.email || 'guest@explorerpro.com'}</p>
              <button className="bg-ios-bg text-black text-sm font-semibold px-4 py-2 rounded-[10px] cursor-pointer active:bg-gray-200 transition-colors">
                Edit Profile
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-ios-bg rounded-[16px] p-4 text-center">
                <div className="flex justify-center mb-2 text-ios-blue">
                  {stat.icon}
                </div>
                <p className="text-[20px] font-bold text-black mb-1">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Menu Sections */}
        <div className="px-5 pt-6">
          {menuSections.map((section, sectionIdx) => (
            <div key={sectionIdx} className="mb-8">
              <h3 className="text-[13px] font-semibold text-gray-500 uppercase tracking-wide mb-3 px-2">
                {section.title}
              </h3>
              <div className="bg-white rounded-[16px] overflow-hidden shadow-ios">
                {section.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    className="flex items-center justify-between px-4 py-4 cursor-pointer active:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-gray-600">
                        {item.icon}
                      </div>
                      <span className="text-[17px] text-black">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.badge && (
                        <span className="bg-ios-bg text-gray-600 text-sm font-semibold px-2.5 py-1 rounded-full">
                          {item.badge}
                        </span>
                      )}
                      <ChevronRight size={20} className="text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Logout Button */}
          <div className="bg-white rounded-[16px] overflow-hidden shadow-ios mb-6">
            <button className="w-full flex items-center justify-center gap-3 px-4 py-4 cursor-pointer active:bg-gray-50 transition-colors">
              <LogOut size={22} className="text-red-500" />
              <span className="text-[17px] text-red-500 font-semibold">Log Out</span>
            </button>
          </div>

          {/* App Version */}
          <div className="text-center text-xs text-gray-400 pb-8">
            <p>Explorer Pro v1.0.0</p>
            <p className="mt-1">Made with ❤️ for travelers</p>
          </div>
        </div>

      </div>

    </div>
  );
};

export default ProfileScreen;
