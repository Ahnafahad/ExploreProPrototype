
import React from 'react';
import { ArrowLeft, Star, ShieldCheck, Globe, Clock, Share } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Guide } from '../utils/mockData';

const GuideDetailsScreen: React.FC = () => {
  const { goBack, navigate, selectedItem } = useAppContext();
  const guide = selectedItem as Guide;

  if (!guide) return null;

  return (
    <div className="w-full h-full bg-white font-sans flex flex-col relative">
      
      {/* Top Image Area */}
      <div className="relative h-[40%] w-full">
         <img src={guide.image} className="w-full h-full object-cover" />
         <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent"></div>
         
         {/* Navigation Bar */}
         <div className="absolute top-12 left-0 w-full px-5 flex justify-between items-center z-10">
             <button onClick={goBack} className="w-9 h-9 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition">
                 <ArrowLeft size={20} className="text-white" />
             </button>
             <button className="w-9 h-9 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition">
                 <Share size={18} className="text-white" />
             </button>
         </div>
      </div>

      {/* Content Sheet - Overlaps image slightly */}
      <div className="flex-1 bg-white -mt-6 rounded-t-[24px] relative z-0 px-6 pt-8 pb-32 overflow-y-auto">
          
          <div className="flex justify-between items-start mb-2">
              <h1 className="text-[28px] font-bold text-black leading-tight">{guide.name}</h1>
              <div className="flex flex-col items-end">
                  <span className="text-[20px] font-bold text-ios-blue">£{guide.price}</span>
                  <span className="text-xs text-gray-400">/ hour</span>
              </div>
          </div>
          
          <p className="text-gray-500 font-medium mb-6">{guide.title}</p>

          {/* Stats Row */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-6 mb-6">
              <div className="flex items-center gap-2">
                 <div className="p-2 bg-orange-50 rounded-full">
                    <Star size={18} className="text-orange-500 fill-current" />
                 </div>
                 <div>
                    <p className="text-[15px] font-bold text-black">{guide.rating}</p>
                    <p className="text-[11px] text-gray-400">Rating</p>
                 </div>
              </div>
              <div className="flex items-center gap-2">
                 <div className="p-2 bg-green-50 rounded-full">
                    <ShieldCheck size={18} className="text-green-500" />
                 </div>
                 <div>
                    <p className="text-[15px] font-bold text-black">Verified</p>
                    <p className="text-[11px] text-gray-400">Identity</p>
                 </div>
              </div>
              <div className="flex items-center gap-2">
                 <div className="p-2 bg-blue-50 rounded-full">
                    <Globe size={18} className="text-blue-500" />
                 </div>
                 <div>
                    <p className="text-[15px] font-bold text-black">3 Langs</p>
                    <p className="text-[11px] text-gray-400">Fluent</p>
                 </div>
              </div>
          </div>

          <h3 className="text-[17px] font-bold text-black mb-3">About</h3>
          <p className="text-[15px] text-gray-600 leading-relaxed mb-6">
              {guide.bio}
          </p>

          <h3 className="text-[17px] font-bold text-black mb-3">Interests</h3>
          <div className="flex flex-wrap gap-2">
              {guide.tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1.5 bg-gray-100 rounded-lg text-[13px] font-medium text-gray-600">
                      {tag}
                  </span>
              ))}
          </div>

      </div>

      {/* Sticky Bottom Button */}
      <div className="absolute bottom-0 left-0 w-full bg-white border-t border-gray-100 p-5 pb-8 z-50">
          <button 
             onClick={() => navigate('booking', guide)}
             className="w-full bg-ios-blue text-white font-bold text-[17px] py-4 rounded-[16px] shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-transform"
          >
              Book Now
          </button>
      </div>

    </div>
  );
};

export default GuideDetailsScreen;
