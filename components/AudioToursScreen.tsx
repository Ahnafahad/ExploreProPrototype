
import React, { useState } from 'react';
import { Search, Star, Clock, Headphones, ArrowLeft } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { AUDIO_TOURS } from '../utils/mockData';
import { TabBar } from './shared/TabBar';

const AudioToursScreen: React.FC = () => {
  const { navigate, goBack } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTours = AUDIO_TOURS.filter(tour => 
    tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tour.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative w-full h-full bg-gray-50 flex flex-col font-sans overflow-hidden">
      
      {/* MAP SECTION */}
      <div className="h-[45%] w-full relative">
        {/* Header Overlay */}
        <div className="absolute top-12 left-6 right-6 z-20 pt-2 flex gap-3">
           {/* Back Button */}
           <button onClick={goBack} className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center flex-shrink-0">
               <ArrowLeft size={20} className="text-black" />
           </button>
           {/* Search Bar */}
           <div className="relative shadow-lg rounded-full flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search audio tours..."
                className="w-full bg-white/95 backdrop-blur-sm text-gray-700 rounded-full py-3.5 pl-12 pr-4 focus:outline-none text-sm placeholder:font-light"
              />
           </div>
        </div>

        {/* Embedded Google Map */}
        <div className="w-full h-full relative overflow-hidden">
             {/* Gradient Overlay for top fade */}
             <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-sky-400/30 to-transparent z-10 pointer-events-none"></div>

             <iframe
                width="100%"
                height="120%"
                style={{ border: 0, filter: 'saturate(1.2) hue-rotate(-10deg)', marginTop: '-10%' }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.openstreetmap.org/export/embed.html?bbox=0.0818%2C52.1753%2C0.1618%2C52.2353&layer=mapnik"
                title="Cambridge Audio Map"
            ></iframe>
            
            {/* Custom Headphone Pins */}
            <div className="absolute top-[40%] left-[30%] transform -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-auto">
                 <AudioMapMarker index={1} />
            </div>
             <div className="absolute top-[35%] left-[55%] transform -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-auto">
                 <AudioMapMarker index={2} />
            </div>
             <div className="absolute top-[50%] left-[70%] transform -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-auto">
                 <AudioMapMarker index={3} />
            </div>
             <div className="absolute top-[60%] left-[40%] transform -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-auto">
                 <AudioMapMarker index={4} />
            </div>
        </div>
      </div>

      {/* LIST SECTION */}
      <div className="flex-1 bg-gray-50 rounded-t-[2.5rem] -mt-8 z-30 relative overflow-hidden flex flex-col shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
        
        {/* List Header */}
        <div className="px-6 pt-6 pb-4">
            <h2 className="text-brand-dark text-xl font-bold">Nearby Audio Tours</h2>
            <div className="flex items-center gap-1.5 mt-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-500 font-medium text-sm">{filteredTours.length} Found</span>
            </div>
        </div>

        {/* Scrollable Card List */}
        <div className="flex-1 overflow-y-auto px-6 pb-28 space-y-4 scrollbar-hide">
            {filteredTours.length > 0 ? (
                filteredTours.map((tour) => (
                    <div 
                      key={tour.id} 
                      className="bg-white rounded-3xl p-3 shadow-sm border border-gray-100 flex gap-4 cursor-pointer active:scale-95 transition-transform"
                      onClick={() => navigate('audio-details', tour)}
                    >
                        {/* Left: Image */}
                        <img 
                          src={tour.image} 
                          alt={tour.title} 
                          className="w-28 h-auto object-cover rounded-2xl" 
                        />

                        {/* Right: Content */}
                        <div className="flex-1 py-1 pr-1 flex flex-col justify-between">
                            <div>
                              <h3 className="text-brand-dark font-bold text-sm leading-tight mb-2 line-clamp-2">{tour.title}</h3>
                              <p className="text-gray-500 text-[10px] leading-relaxed line-clamp-2 mb-2">{tour.desc}</p>
                              
                              {/* Stats Row */}
                              <div className="flex items-center gap-3 text-xs text-gray-500 font-medium mb-2">
                                <div className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    <span>{tour.time}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Star className="w-3 h-3 text-orange-400 fill-orange-400" />
                                    <span className="text-gray-700 font-bold">{tour.rating}</span>
                                    <span className="text-gray-400 text-[10px]">({tour.reviews})</span>
                                </div>
                              </div>
                              
                              {/* Tags Row */}
                              <div className="flex flex-wrap gap-1 mb-3">
                                {tour.languages.map(lang => (
                                  <span key={lang} className="text-[9px] border border-gray-200 text-gray-500 px-1.5 py-0.5 rounded-md">
                                    {lang}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Bottom Row: Price & Button */}
                            <div className="flex items-center justify-between">
                              <span className="text-brand-dark font-bold text-base">£{tour.price.toFixed(2)}</span>
                              <button className="bg-brand-primary text-white text-[10px] font-bold py-2 px-4 rounded-lg shadow-md hover:bg-brand-primaryHover transition-colors">
                                  Preview Tour
                              </button>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center text-gray-500 mt-8">No tours found.</div>
            )}
        </div>

      </div>

      {/* Tab Bar */}
      <TabBar activeTab="map" onNavigate={navigate} />

    </div>
  );
};

// Custom SVG for Audio Pin - Enhanced Badge
const AudioMapMarker: React.FC<{ index: number }> = ({ index }) => (
    <div className="relative cursor-pointer group">
        {/* Pin Stem */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-gray-800/30 z-0"></div>

        {/* Badge with Animation */}
        <div className="relative animate-[bounce_2s_ease-in-out_infinite]" style={{ animationDelay: `${index * 0.15}s` }}>
            {/* Pulse Ring */}
            <div className="absolute inset-0 bg-purple-500 rounded-full animate-ping opacity-75"></div>

            {/* Main Badge */}
            <div className="relative w-12 h-12 bg-purple-500 rounded-full shadow-lg border-3 border-white flex items-center justify-center text-white hover:scale-110 transition-transform">
                <Headphones className="w-6 h-6" />

                {/* Counter Badge */}
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full shadow-md flex items-center justify-center">
                    <span className="text-[10px] font-bold text-gray-800">{index}</span>
                </div>
            </div>
        </div>
    </div>
);

export default AudioToursScreen;
