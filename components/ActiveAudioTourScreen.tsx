
import React from 'react';
import { ArrowLeft, Play, Pause, SkipBack, SkipForward, ChevronDown, Compass, MessageCircle, User, Home } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const ActiveAudioTourScreen: React.FC = () => {
  const { navigate } = useAppContext();

  return (
    <div className="w-full h-full bg-white flex flex-col font-sans relative overflow-hidden">
      
      {/* HEADER */}
      <div className="pt-12 pb-4 px-6 bg-white z-20 flex items-center gap-4">
        <button onClick={() => navigate('home')} className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
          <ArrowLeft className="w-6 h-6 text-black" />
        </button>
        <h1 className="text-black font-bold text-lg">Audio Tour in Progress</h1>
      </div>

      {/* MAP SECTION */}
      <div className="relative w-full flex-1 bg-gray-100 overflow-hidden">
         {/* Simulated Map */}
         <iframe
            width="100%"
            height="100%"
            style={{ border: 0, opacity: 0.8, filter: 'grayscale(0.1)' }}
            loading="lazy"
            src="https://www.openstreetmap.org/export/embed.html?bbox=0.0918%2C52.1853%2C0.1518%2C52.2253&layer=mapnik"
            title="Audio Tour Map"
            className="pointer-events-none"
        ></iframe>

        {/* MARKERS & OVERLAYS */}
        <div className="absolute inset-0 z-10 pointer-events-none">
            
            {/* User Location */}
            <div className="absolute top-[40%] left-[25%] transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-4 h-4 bg-brand-primary rounded-full border-2 border-white shadow-md relative z-20"></div>
                <div className="w-16 h-16 bg-brand-primary/20 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                <div className="w-32 h-32 bg-brand-primary/10 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-brand-primary/20"></div>
            </div>

            {/* Marker 1: King's College (Active) */}
            <div className="absolute top-[35%] left-[65%] transform -translate-x-1/2 -translate-y-full">
                 <div className="relative flex flex-col items-center">
                    {/* Tooltip */}
                    <div className="bg-white rounded-lg shadow-lg px-3 py-2 mb-2 flex items-center gap-2 whitespace-nowrap">
                         <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center">
                             <Play className="w-3 h-3 text-white fill-white ml-0.5" />
                         </div>
                         <span className="text-brand-dark font-bold text-xs">King's College<br/>Chapel</span>
                    </div>
                    {/* Triangle */}
                    <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-white -mt-2 mb-1"></div>
                    
                    {/* Pin */}
                    <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center">
                        <div className="w-4 h-4 bg-orange-500 rounded-full border-2 border-white shadow-sm"></div>
                    </div>
                 </div>
            </div>

            {/* Marker 2: Bridge of Sighs */}
            <div className="absolute top-[55%] left-[55%] transform -translate-x-1/2 -translate-y-full">
                 <div className="relative flex flex-col items-center">
                    {/* Tooltip */}
                    <div className="bg-white rounded-lg shadow-lg px-3 py-2 mb-2 flex items-center gap-2 whitespace-nowrap">
                         <span className="text-brand-dark font-bold text-xs">Bridge of Sighs</span>
                         <div className="w-6 h-6 rounded-full bg-orange-400 flex items-center justify-center">
                             <div className="w-2 h-2 bg-white rounded-full"></div>
                         </div>
                    </div>
                    {/* Triangle */}
                    <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-white -mt-2 mb-1"></div>
                     {/* Pin */}
                     <div className="w-3 h-3 bg-orange-400 rounded-full border border-white shadow-sm"></div>
                 </div>
            </div>

            {/* Active Card Overlay (Simulated Info Window) */}
            <div className="absolute bottom-6 left-6 right-6 pointer-events-auto">
                 <div className="bg-white rounded-2xl p-3 shadow-xl flex items-center gap-3 animate-fadeIn">
                     <img src="https://picsum.photos/seed/kings_college/100/100" className="w-12 h-12 rounded-lg object-cover" alt="Thumb" />
                     <div className="flex-1 min-w-0">
                         <h3 className="text-brand-dark font-bold text-sm truncate">King's College Chapel</h3>
                         <div className="flex items-center gap-2 mt-1">
                             <div className="w-5 h-5 bg-brand-primary rounded-full flex items-center justify-center">
                                 <Play className="w-2.5 h-2.5 text-white fill-white ml-0.5" />
                             </div>
                             {/* Mini Progress Bar */}
                             <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                                 <div className="w-[30%] h-full bg-brand-primary rounded-full"></div>
                             </div>
                             <span className="text-[10px] text-gray-500 font-medium">04:30</span>
                         </div>
                     </div>
                     <div className="flex gap-1">
                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                     </div>
                 </div>
            </div>

        </div>
      </div>

      {/* PLAYER CONTROLS (Bottom Sheet) */}
      <div className="bg-white rounded-t-[2.5rem] shadow-[0_-5px_30px_rgba(0,0,0,0.05)] pt-2 pb-6 relative z-30 -mt-4">
          
          {/* Handle */}
          <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mt-3 mb-6"></div>

          <div className="px-8 flex flex-col items-center">
             <h2 className="text-brand-dark font-bold text-xl mb-6">King's College Chapel</h2>
             
             {/* Controls */}
             <div className="flex items-center justify-center gap-10 mb-8 w-full">
                 <button className="text-black hover:text-brand-primary transition-colors">
                     <SkipBack className="w-8 h-8 fill-black" />
                 </button>
                 
                 <button className="w-20 h-20 bg-brand-primary rounded-full flex items-center justify-center shadow-lg shadow-blue-300 hover:scale-105 transition-transform active:scale-95">
                     <Pause className="w-8 h-8 text-white fill-white" />
                 </button>
                 
                 <button className="text-black hover:text-brand-primary transition-colors">
                     <SkipForward className="w-8 h-8 fill-black" />
                 </button>
             </div>

             {/* Progress Bar */}
             <div className="w-full mb-2 relative group cursor-pointer">
                 <div className="h-1.5 bg-gray-100 rounded-full w-full">
                     <div className="h-full bg-brand-primary w-[35%] rounded-full relative">
                         <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 w-4 h-4 bg-brand-primary border-2 border-white rounded-full shadow-sm"></div>
                     </div>
                 </div>
             </div>
             
             {/* Timestamps */}
             <div className="w-full flex justify-between text-xs font-medium text-gray-400 mb-6">
                 <span>01:45</span>
                 <span>04:30</span>
             </div>

             {/* Language Selector */}
             <div className="border border-gray-200 rounded-full px-4 py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors">
                 <span className="text-sm text-gray-600">Language: <span className="text-brand-dark font-semibold">English</span></span>
                 <ChevronDown className="w-4 h-4 text-gray-400" />
             </div>
          </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white px-8 py-4 flex justify-between items-center border-t border-gray-50 pb-8">
          <div className="cursor-pointer hover:text-brand-primary transition-colors text-gray-300" onClick={() => navigate('home')}>
             <Home className="w-6 h-6 hover:fill-current" />
          </div>

          <div className="flex flex-col items-center gap-1 cursor-pointer text-brand-primary" onClick={() => navigate('map')}>
             <div className="bg-brand-primary rounded-full p-1 -mt-10 shadow-lg shadow-blue-300 ring-4 ring-white">
                 <Compass className="text-white w-6 h-6" />
             </div>
          </div>

          <div className="relative cursor-pointer" onClick={() => navigate('chat')}>
             <MessageCircle className="text-gray-300 w-6 h-6 hover:text-brand-primary transition-colors" />
          </div>
          <User className="text-gray-300 w-6 h-6 hover:text-brand-primary transition-colors cursor-pointer" onClick={() => navigate('profile')} />
      </div>

    </div>
  );
};

export default ActiveAudioTourScreen;
