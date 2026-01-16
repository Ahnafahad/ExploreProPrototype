
import React from 'react';
import { ArrowLeft, MessageCircle, Phone, MapPin } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const ActiveCoffeeChatScreen: React.FC = () => {
  const { navigate, selectedItem } = useAppContext();
  const host = selectedItem;

  return (
    <div className="w-full h-full bg-white flex flex-col font-sans relative overflow-hidden">
      
      {/* MAP BACKGROUND */}
      <div className="absolute inset-0 bg-gray-100">
         <iframe 
            width="100%" 
            height="100%" 
            style={{ border: 0, opacity: 0.8, filter: 'grayscale(0.3)' }}
            loading="lazy" 
            src={`https://maps.google.com/maps?q=Market+St,Cambridge,UK&t=m&z=17&ie=UTF8&iwloc=&output=embed`}
            title="Cafe Map"
            className="pointer-events-none"
        ></iframe>
      </div>

      {/* Top Overlay */}
      <div className="absolute top-0 left-0 w-full pt-12 px-6 z-20">
         <button onClick={() => navigate('home')} className="bg-white text-brand-dark py-2 px-4 rounded-full shadow-lg flex items-center gap-2 font-bold text-xs hover:bg-gray-50 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            HOME
         </button>
      </div>

      {/* Meeting Point Pin */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full z-10 flex flex-col items-center">
          <div className="bg-white rounded-xl shadow-xl p-3 flex items-center gap-3 mb-3 animate-bounce" style={{ animationDuration: '2s' }}>
             <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center text-xl">☕</div>
             <div>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Meeting Point</p>
                <p className="text-brand-dark font-bold text-sm">Cafe Nero</p>
             </div>
          </div>
          <div className="w-4 h-4 bg-brand-primary rounded-full border-4 border-white shadow-md"></div>
      </div>

      {/* Bottom Sheet */}
      <div className="absolute bottom-0 left-0 w-full bg-white rounded-t-[2rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] p-6 z-30">
          
          <div className="flex flex-col items-center -mt-12 mb-4">
              <div className="relative">
                 <img src={host?.image || "https://i.pravatar.cc/150?img=25"} alt="Sophia" className="w-20 h-20 rounded-full border-4 border-white shadow-lg object-cover" />
                 <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
          </div>

          <h2 className="text-center text-brand-dark font-bold text-xl mb-1">Meeting {host?.name}</h2>
          <p className="text-center text-brand-primary font-medium text-sm mb-6">Confirmed • Today at 02:00 PM</p>

          <div className="flex items-center gap-4 mb-8 bg-gray-50 p-4 rounded-xl border border-gray-100">
              <div className="bg-white p-2 rounded-full shadow-sm">
                  <MapPin className="w-5 h-5 text-brand-primary" />
              </div>
              <div className="flex-1">
                  <p className="text-xs text-gray-500">Address</p>
                  <p className="text-sm font-bold text-gray-800">15 Market St, Cambridge CB2 3PA</p>
              </div>
          </div>

          <div className="flex gap-4">
              <button className="flex-1 border-2 border-gray-200 text-gray-600 font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors uppercase text-sm">
                  <MessageCircle className="w-5 h-5" />
                  Message
              </button>
              <button className="flex-1 bg-brand-primary text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-300/50 flex items-center justify-center gap-2 hover:bg-brand-primaryHover transition-colors uppercase text-sm">
                  <Phone className="w-5 h-5 fill-white" />
                  Call Host
              </button>
          </div>

      </div>

    </div>
  );
};

export default ActiveCoffeeChatScreen;
