
import React, { useState } from 'react';
import {
  Search, SlidersHorizontal, MapPin, Navigation, Minus, Plus, Layers,
  UserCheck, Volume2, Coffee, Utensils, ArrowLeft
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { TabBar } from './shared/TabBar';

const MapScreen: React.FC = () => {
  const { navigate, goBack } = useAppContext();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [zoomLevel, setZoomLevel] = useState(15);

  const categories = [
    { id: 'all', label: 'All', icon: <MapPin size={18} />, color: 'bg-ios-blue' },
    { id: 'guides', label: 'Guides', icon: <UserCheck size={18} />, color: 'bg-green-500' },
    { id: 'audio', label: 'Audio', icon: <Volume2 size={18} />, color: 'bg-purple-500' },
    { id: 'coffee', label: 'Meetups', icon: <Coffee size={18} />, color: 'bg-orange-500' },
    { id: 'dining', label: 'Dining', icon: <Utensils size={18} />, color: 'bg-red-500' }
  ];

  const locations = [
    { id: 1, name: 'Cambridge Historic Tour', type: 'guides', lat: 52.2053, lng: 0.1218, color: 'bg-green-500' },
    { id: 2, name: 'Kings College Chapel Audio', type: 'audio', lat: 52.2045, lng: 0.1165, color: 'bg-purple-500' },
    { id: 3, name: 'Student Coffee Meetup', type: 'coffee', lat: 52.2038, lng: 0.1190, color: 'bg-orange-500' },
    { id: 4, name: 'The Eagle Pub & Restaurant', type: 'dining', lat: 52.2042, lng: 0.1185, color: 'bg-red-500' },
    { id: 5, name: 'Punting Tour Guide', type: 'guides', lat: 52.2028, lng: 0.1155, color: 'bg-green-500' },
    { id: 6, name: 'Trinity College Meetup', type: 'coffee', lat: 52.2070, lng: 0.1200, color: 'bg-orange-500' }
  ];

  const filteredLocations = selectedCategory === 'all'
    ? locations
    : locations.filter(loc => loc.type === selectedCategory);

  const handleZoomIn = () => setZoomLevel(Math.min(20, zoomLevel + 1));
  const handleZoomOut = () => setZoomLevel(Math.max(10, zoomLevel - 1));

  return (
    <div className="w-full h-full flex flex-col bg-ios-bg font-sans relative">

      {/* Map Container - Cambridge OpenStreetMap */}
      <div className="absolute inset-0 bg-gray-100">
        {/* Embedded OpenStreetMap centered on Cambridge */}
        <iframe
          src="https://www.openstreetmap.org/export/embed.html?bbox=0.0850%2C52.1850%2C0.1650%2C52.2250&layer=mapnik&marker=52.2053%2C0.1218"
          className="w-full h-full border-0"
          title="Cambridge Map"
          style={{ pointerEvents: 'auto' }}
        />
        <div className="absolute inset-0 pointer-events-none">
          <div className="w-full h-full relative overflow-hidden">

          {/* Location Markers - Enhanced Badges */}
          {filteredLocations.map((location, idx) => {
            const getIcon = () => {
              switch(location.type) {
                case 'guides': return <UserCheck size={22} />;
                case 'audio': return <Volume2 size={22} />;
                case 'coffee': return <Coffee size={22} />;
                case 'dining': return <Utensils size={22} />;
                default: return <MapPin size={22} />;
              }
            };

            return (
              <div
                key={location.id}
                className="absolute transform -translate-x-1/2 -translate-y-full cursor-pointer pointer-events-auto"
                style={{
                  top: `${45 + idx * 8}%`,
                  left: `${40 + idx * 10}%`,
                }}
                onClick={() => {
                  if (location.type === 'guides') navigate('guides');
                  else if (location.type === 'audio') navigate('audio-tours');
                  else if (location.type === 'coffee') navigate('coffee-chats');
                  else if (location.type === 'dining') navigate('restaurants');
                }}
              >
                {/* Pin Stem */}
                <div className="absolute top-12 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-gray-800/30"></div>

                {/* Badge Container with pulse animation */}
                <div className="relative animate-[bounce_2s_ease-in-out_infinite]" style={{ animationDelay: `${idx * 0.1}s` }}>
                  {/* Pulse Ring */}
                  <div className={`absolute inset-0 ${location.color} rounded-full animate-ping opacity-75`}></div>

                  {/* Main Badge */}
                  <div className={`relative w-12 h-12 ${location.color} rounded-full shadow-lg border-3 border-white flex items-center justify-center text-white group hover:scale-110 transition-transform`}>
                    {getIcon()}

                    {/* Enhanced Tooltip */}
                    <div className="absolute bottom-full mb-3 hidden group-hover:block bg-white rounded-xl shadow-2xl px-4 py-3 whitespace-nowrap z-50 min-w-max">
                      <p className="text-sm font-bold text-black mb-1">{location.name}</p>
                      <p className="text-xs text-gray-500 capitalize">{location.type}</p>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-2 border-[6px] border-transparent border-t-white"></div>
                    </div>

                    {/* Small counter badge */}
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full shadow-md flex items-center justify-center">
                      <span className="text-[10px] font-bold text-gray-800">{idx + 1}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Center Crosshair */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="w-8 h-8 rounded-full border-2 border-ios-blue bg-ios-blue/20"></div>
          </div>
          </div>
        </div>
      </div>

      {/* Top Bar - Search & Filters */}
      <div className="absolute top-0 left-0 w-full z-50 pt-12 px-5">
        <div className="bg-white/90 ios-blur rounded-[16px] shadow-ios-lg p-3">
          <div className="flex items-center gap-2 mb-3">
            <button onClick={goBack} className="w-10 h-10 bg-white rounded-full shadow-ios flex items-center justify-center flex-shrink-0">
              <ArrowLeft size={20} className="text-black" />
            </button>
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search locations..."
                className="w-full bg-ios-search text-black rounded-[10px] py-2.5 pl-10 pr-4 focus:outline-none placeholder:text-gray-500 text-[15px]"
              />
            </div>
            <button className="w-10 h-10 bg-ios-blue rounded-[10px] flex items-center justify-center text-white cursor-pointer active:scale-95 transition-transform">
              <SlidersHorizontal size={20} />
            </button>
          </div>

          {/* Category Filters */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-[10px] whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? `${cat.color} text-white shadow-md`
                    : 'bg-ios-search text-gray-600'
                }`}
              >
                {cat.icon}
                <span className="text-sm font-semibold">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Zoom Controls */}
      <div className="absolute right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">
        <button
          onClick={handleZoomIn}
          className="w-11 h-11 bg-white/90 ios-blur rounded-[12px] shadow-ios flex items-center justify-center text-black cursor-pointer active:scale-95 transition-transform"
        >
          <Plus size={20} strokeWidth={3} />
        </button>
        <button
          onClick={handleZoomOut}
          className="w-11 h-11 bg-white/90 ios-blur rounded-[12px] shadow-ios flex items-center justify-center text-black cursor-pointer active:scale-95 transition-transform"
        >
          <Minus size={20} strokeWidth={3} />
        </button>
        <button className="w-11 h-11 bg-white/90 ios-blur rounded-[12px] shadow-ios flex items-center justify-center text-black cursor-pointer active:scale-95 transition-transform">
          <Layers size={20} />
        </button>
      </div>

      {/* Current Location Button */}
      <div className="absolute bottom-28 right-5 z-50">
        <button className="w-12 h-12 bg-ios-blue rounded-full shadow-ios-lg flex items-center justify-center text-white cursor-pointer active:scale-95 transition-transform">
          <Navigation size={20} fill="white" />
        </button>
      </div>

      {/* Bottom Info Card - Shows count of locations */}
      <div className="absolute bottom-24 left-5 right-5 z-50">
        <div className="bg-white/90 ios-blur rounded-[16px] shadow-ios-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Locations Found</p>
              <p className="text-2xl font-bold text-black">{filteredLocations.length}</p>
            </div>
            <button
              onClick={() => navigate('guides')}
              className="bg-ios-blue text-white px-5 py-2.5 rounded-[10px] font-semibold text-sm cursor-pointer active:scale-95 transition-transform"
            >
              View List
            </button>
          </div>
        </div>
      </div>

      {/* Tab Bar */}
      <TabBar activeTab="map" onNavigate={navigate} />

    </div>
  );
};

export default MapScreen;
