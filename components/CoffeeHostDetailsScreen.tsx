
import React from 'react';
import { Home, Compass, MessageCircle, User, ArrowLeft } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const CoffeeHostDetailsScreen: React.FC = () => {
  const { navigate, goBack, selectedItem } = useAppContext();
  const host = selectedItem;

  if (!host) return null;

  return (
    <div className="w-full h-full bg-gradient-to-b from-sky-300 via-sky-100 to-white flex flex-col font-sans relative overflow-hidden">
      
      {/* HEADER: Transparent with Back Button */}
      <div className="pt-12 pb-4 px-6 flex items-center justify-between z-20">
        <button onClick={goBack} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors">
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h2 className="text-white text-lg font-bold">Host Details</h2>
        <div className="w-6"></div> {/* Spacer */}
      </div>

      <div className="flex-1 overflow-y-auto pb-28 px-6 scrollbar-hide">
        
        {/* Profile Section */}
        <div className="flex flex-col items-center mt-2 mb-6">
            <div className="w-40 h-40 rounded-[2.5rem] overflow-hidden shadow-xl mb-4 relative bg-white">
                <img 
                    src={host.image} 
                    alt={host.name} 
                    className="w-full h-full object-cover"
                />
            </div>
            <h1 className="text-brand-dark text-3xl font-bold mb-1">{host.name}</h1>
            <p className="text-brand-dark text-sm font-medium opacity-80">{host.role}</p>
        </div>

        {/* Details Card */}
        <div className="bg-white rounded-[2rem] p-6 shadow-sm mb-4">
            <h3 className="text-brand-dark font-bold text-lg mb-3">About {host.name.split(' ')[0]}</h3>
            <p className="text-gray-700 text-sm leading-relaxed mb-6 font-medium">
                {host.bio}
            </p>

            {/* Interests */}
            <h4 className="text-brand-dark font-bold text-sm mb-3">Interests:</h4>
            <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-100">
                    <span className="text-base">🚀</span>
                    <span className="text-brand-dark text-sm font-medium">Startups</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-100">
                    <span className="text-base">🕒</span>
                    <span className="text-brand-dark text-sm font-medium">History</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-100">
                    <span className="text-base">📚</span>
                    <span className="text-brand-dark text-sm font-medium">Reading</span>
                </div>
            </div>

            {/* Languages */}
            <h4 className="text-brand-dark font-bold text-sm mb-3">Languages:</h4>
            <div className="flex items-center gap-3">
                 <div className="flex items-center gap-1.5">
                    <span className="text-xl">🇬🇧</span>
                    <span className="text-brand-dark text-sm font-medium">English</span>
                 </div>
                 <div className="flex items-center gap-1.5">
                    <span className="text-xl">🇪🇸</span>
                    <span className="text-brand-dark text-sm font-medium">Spanish</span>
                 </div>
            </div>
        </div>

        {/* Price Card */}
        <div className="bg-white rounded-[2rem] p-6 shadow-sm">
             <h3 className="text-brand-dark font-bold text-base mb-1">Price per Session</h3>
             <p className="text-brand-dark text-2xl font-bold">£{host.price}<span className="text-gray-400 font-normal text-base">/session</span></p>
        </div>

      </div>

      {/* Floating Action Button */}
      <div className="absolute bottom-24 left-6 right-6 z-30">
          <button 
            onClick={() => navigate('coffee-booking', host)}
            className="w-full bg-brand-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-300/50 hover:bg-brand-primaryHover transition-transform active:scale-95 uppercase tracking-wide text-sm"
          >
              Book Coffee Chat
          </button>
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-6 left-6 right-6 bg-white rounded-full shadow-2xl shadow-blue-900/10 px-8 py-4 flex justify-between items-center z-50">
          <div className="cursor-pointer hover:text-brand-primary transition-colors text-gray-300" onClick={() => navigate('home')}>
             <Home className="w-6 h-6 hover:fill-current" />
          </div>
          
          <div className="flex flex-col items-center gap-1 cursor-pointer text-brand-primary">
             <div className="bg-brand-primary rounded-full p-1 -mt-6 shadow-lg shadow-blue-300 ring-4 ring-white">
                 <Compass className="text-white w-6 h-6" />
             </div>
          </div>
          
          <div className="relative cursor-pointer">
             <MessageCircle className="text-gray-300 w-6 h-6 hover:text-brand-primary transition-colors" />
             <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></div>
          </div>
          <User className="text-gray-300 w-6 h-6 hover:text-brand-primary transition-colors cursor-pointer" />
      </div>

    </div>
  );
};

export default CoffeeHostDetailsScreen;
