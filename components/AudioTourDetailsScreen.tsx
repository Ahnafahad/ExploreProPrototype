
import React from 'react';
import { ArrowLeft, Play, Pause, Star, Clock, Globe, MapPin, Share2, Headphones, Lock } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const AudioTourDetailsScreen: React.FC = () => {
  const { navigate, goBack, selectedItem } = useAppContext();
  const tour = selectedItem;

  if (!tour) return null;

  return (
    <div className="relative w-full h-full bg-gray-50 flex flex-col font-sans overflow-hidden">
      
      {/* Header Overlay Actions */}
      <div className="absolute top-0 left-0 w-full z-40 pt-12 pb-2 px-6 bg-gradient-to-b from-black/50 to-transparent flex items-center justify-between">
        <button onClick={goBack} className="p-2 -ml-2 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition-colors text-white">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex gap-3">
             <button className="p-2 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition-colors text-white">
                <Share2 className="w-5 h-5" />
             </button>
        </div>
      </div>

      {/* Hero Image */}
      <div className="h-[45%] w-full relative">
        <img 
            src={tour.image} 
            alt={tour.title} 
            className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/80 to-transparent"></div>
        
        {/* Play Preview Button */}
        <div className="absolute bottom-8 right-6">
            <button className="w-14 h-14 bg-brand-primary rounded-full flex items-center justify-center shadow-lg shadow-blue-500/40 hover:scale-110 transition-transform">
                <Play className="w-6 h-6 text-white ml-1 fill-white" />
            </button>
        </div>

        <div className="absolute bottom-8 left-6 right-20">
             <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider mb-2 inline-block">Best Seller</span>
             <h1 className="text-white font-bold text-2xl leading-tight drop-shadow-md">{tour.title}</h1>
        </div>
      </div>

      {/* Content Sheet */}
      <div className="flex-1 bg-white rounded-t-[2rem] -mt-6 z-30 relative overflow-y-auto pb-24">
         
         <div className="px-6 pt-8">
            {/* Meta Stats */}
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100">
                <div className="flex flex-col items-center gap-1">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <span className="text-xs font-bold text-gray-700">{tour.time}</span>
                </div>
                <div className="w-px h-8 bg-gray-100"></div>
                <div className="flex flex-col items-center gap-1">
                    <Star className="w-5 h-5 text-orange-400 fill-orange-400" />
                    <span className="text-xs font-bold text-gray-700">{tour.rating} ({tour.reviews})</span>
                </div>
                <div className="w-px h-8 bg-gray-100"></div>
                <div className="flex flex-col items-center gap-1">
                    <Headphones className="w-5 h-5 text-gray-400" />
                    <span className="text-xs font-bold text-gray-700">Audio</span>
                </div>
                 <div className="w-px h-8 bg-gray-100"></div>
                <div className="flex flex-col items-center gap-1">
                    <Globe className="w-5 h-5 text-gray-400" />
                    <span className="text-xs font-bold text-gray-700">{tour.languages.length} Langs</span>
                </div>
            </div>

            {/* Description */}
            <div className="mb-6">
                <h3 className="text-brand-dark font-bold text-base mb-2">About this tour</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                    {tour.desc}
                </p>
            </div>

            {/* Stops List */}
            <div>
                <h3 className="text-brand-dark font-bold text-base mb-4">12 Audio Stops</h3>
                <div className="space-y-4 relative">
                    {/* Connecting Line */}
                    <div className="absolute left-[15px] top-2 bottom-4 w-0.5 bg-gray-100"></div>

                    {[
                        { title: "Great St Mary's Church", time: "4:20" },
                        { title: "Market Square History", time: "3:15" },
                        { title: "King's College Entrance", time: "5:45", locked: true },
                        { title: "Corpus Clock", time: "2:30", locked: true },
                        { title: "The Eagle Pub", time: "4:10", locked: true },
                    ].map((stop, i) => (
                        <div key={i} className="flex items-center gap-4 relative z-10 bg-white">
                             <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${i === 0 ? 'bg-brand-primary border-brand-primary text-white' : 'bg-white border-gray-200 text-gray-400'}`}>
                                 {i === 0 ? <Play className="w-3 h-3 fill-current ml-0.5" /> : <span className="text-xs font-bold">{i + 1}</span>}
                             </div>
                             <div className="flex-1">
                                 <h4 className={`text-sm font-bold ${i === 0 ? 'text-brand-dark' : 'text-gray-500'}`}>{stop.title}</h4>
                                 <span className="text-xs text-gray-400">{stop.time}</span>
                             </div>
                             {stop.locked && <Lock className="w-4 h-4 text-gray-300" />}
                        </div>
                    ))}
                </div>
            </div>
         </div>

      </div>

      {/* Bottom Action Bar */}
      <div className="absolute bottom-0 left-0 w-full bg-white shadow-[0_-5px_30px_rgba(0,0,0,0.05)] rounded-t-[2rem] p-6 z-50 flex items-center justify-between">
         <div className="flex flex-col">
             <span className="text-gray-400 text-xs font-medium decoration-slice line-through">£{(tour.price * 1.5).toFixed(2)}</span>
             <span className="text-brand-dark font-bold text-2xl">£{tour.price}</span>
         </div>
         <button 
           onClick={() => navigate('audio-booking', tour)}
           className="bg-brand-primary text-white font-bold py-3.5 px-8 rounded-xl shadow-lg shadow-blue-300/50 hover:bg-brand-primaryHover transition-transform active:scale-95 uppercase tracking-wide text-sm flex items-center gap-2"
         >
             Unlock Tour
         </button>
      </div>

    </div>
  );
};

export default AudioTourDetailsScreen;
