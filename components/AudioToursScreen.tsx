
import React, { useState } from 'react';
import { Search, Star, Clock, Headphones, Home, Compass, MessageCircle, User } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { AUDIO_TOURS } from '../utils/mockData';

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
        <div className="absolute top-12 left-6 right-6 z-20 pt-2">
           {/* Search Bar */}
           <div className="relative shadow-lg rounded-full">
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
                src={`https://maps.google.com/maps?q=Cambridge,UK&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                title="Cambridge Audio Map"
            ></iframe>
            
            {/* Custom Headphone Pins */}
            <div className="absolute top-[40%] left-[30%] transform -translate-x-1/2 -translate-y-1/2 z-10">
                 <AudioMapMarker />
            </div>
             <div className="absolute top-[35%] left-[55%] transform -translate-x-1/2 -translate-y-1/2 z-10">
                 <AudioMapMarker />
            </div>
             <div className="absolute top-[50%] left-[70%] transform -translate-x-1/2 -translate-y-1/2 z-10">
                 <AudioMapMarker />
            </div>
             <div className="absolute top-[60%] left-[40%] transform -translate-x-1/2 -translate-y-1/2 z-10">
                 <AudioMapMarker />
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

      {/* Bottom Navigation */}
      <div className="absolute bottom-6 left-6 right-6 bg-white rounded-full shadow-2xl shadow-blue-900/10 px-8 py-4 flex justify-between items-center z-50">
          <div className="cursor-pointer hover:text-brand-primary transition-colors text-gray-300" onClick={() => navigate('home')}>
             <Home className="w-6 h-6 hover:fill-current" />
          </div>

          <div className="flex flex-col items-center gap-1 cursor-pointer text-brand-primary" onClick={() => navigate('map')}>
             <div className="bg-brand-primary rounded-full p-1 -mt-6 shadow-lg shadow-blue-300 ring-4 ring-white">
                 <Compass className="text-white w-6 h-6" />
             </div>
          </div>

          <div className="relative cursor-pointer" onClick={() => navigate('chat')}>
             <MessageCircle className="text-gray-300 w-6 h-6 hover:text-brand-primary transition-colors" />
             <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></div>
          </div>
          <User className="text-gray-300 w-6 h-6 hover:text-brand-primary transition-colors cursor-pointer" onClick={() => navigate('profile')} />
      </div>

    </div>
  );
};

// Custom SVG for Audio Pin
const AudioMapMarker: React.FC = () => (
    <div className="relative w-10 h-12 drop-shadow-xl transform hover:-translate-y-1 transition-transform duration-300">
        <svg viewBox="0 0 100 120" className="w-full h-full text-brand-primary fill-current">
            <path d="M50,0 C22.4,0 0,22.4 0,50 C0,77.6 50,120 50,120 C50,120 100,77.6 100,50 C100,22.4 77.6,0 50,0 Z" />
            <circle cx="50" cy="50" r="45" fill="#3B82F6" />
        </svg>
        <div className="absolute top-[9px] left-[9px]">
             <Headphones className="w-[22px] h-[22px] text-white" />
        </div>
    </div>
);

export default AudioToursScreen;
