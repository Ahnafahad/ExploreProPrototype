
import React, { useState, useEffect } from 'react';
import { Search, ChevronLeft, Star, MapPin, SlidersHorizontal, ArrowLeft } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { GUIDES } from '../utils/mockData';

const GuidesScreen: React.FC = () => {
  const { navigate, goBack } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredGuides = GUIDES.filter(guide => 
    guide.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guide.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="w-full h-full bg-ios-bg font-sans relative">
      
      {/* Full Screen Map */}
      <div className="absolute inset-0 z-0">
         <iframe
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            src="https://www.openstreetmap.org/export/embed.html?bbox=0.0818%2C52.1753%2C0.1618%2C52.2353&layer=mapnik"
            title="Map"
            className="grayscale-[0.2]"
        ></iframe>
      </div>

      {/* Floating Header */}
      <div className="absolute top-0 left-0 w-full pt-14 px-5 z-20 flex gap-3 pointer-events-none">
          <div className="pointer-events-auto">
             <button onClick={goBack} className="w-10 h-10 bg-white rounded-full shadow-ios flex items-center justify-center">
                 <ArrowLeft size={20} className="text-black" />
             </button>
          </div>
          <div className="flex-1 pointer-events-auto shadow-ios rounded-full">
              <div className="relative">
                 <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <Search size={18} className="text-gray-400" />
                 </div>
                 <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search guides..." 
                    className="w-full h-10 bg-white rounded-full pl-10 pr-4 text-[15px] focus:outline-none"
                 />
              </div>
          </div>
          <div className="pointer-events-auto">
              <button className="w-10 h-10 bg-white rounded-full shadow-ios flex items-center justify-center">
                 <SlidersHorizontal size={18} className="text-black" />
              </button>
          </div>
      </div>

      {/* iOS Bottom Sheet style list */}
      <div className="absolute bottom-0 left-0 w-full h-[55%] bg-ios-bg rounded-t-[24px] shadow-[0_-8px_30px_rgba(0,0,0,0.12)] z-30 flex flex-col">
          
          {/* Handle */}
          <div className="w-full flex justify-center pt-3 pb-2">
              <div className="w-10 h-1.5 bg-gray-300 rounded-full"></div>
          </div>

          <div className="px-5 pb-3">
              <h2 className="text-[20px] font-bold text-black">{filteredGuides.length} Guides Found</h2>
          </div>

          {/* List Content */}
          <div className="flex-1 overflow-y-auto px-5 pb-8 scrollbar-hide space-y-4">
              {isLoading ? (
                  [1,2,3].map(i => (
                      <div key={i} className="h-24 bg-white rounded-[18px] animate-pulse"></div>
                  ))
              ) : (
                  filteredGuides.length > 0 ? (
                    filteredGuides.map(guide => (
                        <div 
                            key={guide.id}
                            onClick={() => navigate('guide-details', guide)}
                            className="bg-white p-4 rounded-[18px] shadow-sm flex items-center gap-4 active:scale-[0.98] transition-transform cursor-pointer"
                        >
                            <img src={guide.image} className="w-14 h-14 rounded-full object-cover" />
                            <div className="flex-1">
                                <h3 className="text-[17px] font-semibold text-black leading-tight">{guide.name}</h3>
                                <p className="text-[13px] text-gray-500 mb-1">{guide.title}</p>
                                <div className="flex items-center gap-1">
                                    <Star size={12} className="text-orange-400 fill-current" />
                                    <span className="text-xs font-bold text-black">{guide.rating}</span>
                                    <span className="text-xs text-gray-400">({guide.reviews})</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="block text-[17px] font-bold text-ios-blue">£{guide.price}</span>
                                <span className="text-[11px] text-gray-400">/hr</span>
                            </div>
                        </div>
                    ))
                  ) : (
                    <div className="text-center text-gray-400 mt-10">
                        <p>No guides match your search.</p>
                    </div>
                  )
              )}
          </div>
      </div>

    </div>
  );
};

export default GuidesScreen;
