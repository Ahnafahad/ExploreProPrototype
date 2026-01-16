
import React from 'react';
import { ArrowLeft, MapPin, Calendar, Clock, Users, Phone, Navigation, QrCode } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const ActiveRestaurantBookingScreen: React.FC = () => {
  const { navigate } = useAppContext();

  return (
    <div className="w-full h-full bg-gray-50 flex flex-col font-sans relative overflow-hidden">
      
      {/* HEADER */}
      <div className="pt-12 pb-4 px-6 bg-transparent z-20">
         <button onClick={() => navigate('home')} className="bg-white text-brand-dark py-2 px-4 rounded-full shadow-sm border border-gray-100 flex items-center gap-2 font-bold text-xs hover:bg-gray-50 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Home
         </button>
      </div>

      <div className="flex-1 flex flex-col items-center px-6 pt-4 pb-12 overflow-y-auto scrollbar-hide">
          
          <h1 className="text-brand-dark font-bold text-2xl mb-1 text-center">Booking Confirmed!</h1>
          <p className="text-gray-500 text-sm mb-8 text-center">Your table is reserved. Show this to the host.</p>

          {/* TICKET CARD */}
          <div className="w-full bg-white rounded-3xl shadow-xl overflow-hidden relative">
              {/* Decorative Top Border */}
              <div className="h-2 bg-gradient-to-r from-orange-400 to-pink-500 w-full"></div>
              
              <div className="p-6">
                  {/* Restaurant Info */}
                  <div className="flex items-center gap-4 mb-6 border-b border-gray-100 pb-6">
                      <img src="https://picsum.photos/seed/ramen_bowl/100/100" className="w-16 h-16 rounded-xl object-cover" alt="Rest" />
                      <div>
                          <h2 className="text-brand-dark font-bold text-lg">Liceria & Co.</h2>
                          <div className="flex items-center gap-1 text-gray-500 text-xs mt-1">
                              <MapPin className="w-3 h-3" />
                              <span>123 Anywhere St., Any City</span>
                          </div>
                      </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-6">
                      <div>
                          <p className="text-gray-400 text-xs font-medium mb-1 flex items-center gap-1"><Calendar className="w-3 h-3" /> Date</p>
                          <p className="text-brand-dark font-bold text-base">Wed, 14th</p>
                      </div>
                      <div>
                          <p className="text-gray-400 text-xs font-medium mb-1 flex items-center gap-1"><Clock className="w-3 h-3" /> Time</p>
                          <p className="text-brand-dark font-bold text-base">07:00 PM</p>
                      </div>
                      <div>
                          <p className="text-gray-400 text-xs font-medium mb-1 flex items-center gap-1"><Users className="w-3 h-3" /> Guests</p>
                          <p className="text-brand-dark font-bold text-base">2 People</p>
                      </div>
                      <div>
                          <p className="text-gray-400 text-xs font-medium mb-1">Booking ID</p>
                          <p className="text-brand-dark font-bold text-base font-mono">#EXP-8832</p>
                      </div>
                  </div>

                  {/* Discount Badge */}
                  <div className="bg-orange-50 border border-orange-100 rounded-xl p-3 flex items-center justify-between mb-6">
                      <div>
                          <p className="text-orange-500 font-bold text-sm">50% Off Food Bill</p>
                          <p className="text-orange-400/80 text-[10px]">Applied to final bill</p>
                      </div>
                      <div className="bg-white p-1 rounded-full shadow-sm">
                          <QrCode className="w-6 h-6 text-orange-500" />
                      </div>
                  </div>
              </div>

              {/* Rip Line Visuals */}
              <div className="relative h-6 bg-gray-50 -mx-3">
                  <div className="absolute top-[-10px] left-0 w-6 h-6 bg-gray-50 rounded-full"></div>
                  <div className="absolute top-[-10px] right-0 w-6 h-6 bg-gray-50 rounded-full"></div>
                  <div className="absolute top-[50%] left-4 right-4 border-t-2 border-dashed border-gray-300"></div>
              </div>

              {/* QR Section */}
              <div className="p-6 bg-white flex flex-col items-center justify-center pb-8">
                  <div className="bg-white p-2 rounded-xl shadow-inner border border-gray-100 mb-2">
                       <QrCode className="w-32 h-32 text-brand-dark" />
                  </div>
                  <p className="text-xs text-gray-400">Scan at counter</p>
              </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 w-full mt-8">
              <button className="flex-1 bg-white text-brand-dark border border-gray-200 font-bold py-3.5 rounded-xl shadow-sm hover:bg-gray-50 transition-colors text-sm flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" />
                  Call
              </button>
              <button className="flex-1 bg-brand-primary text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-300/50 hover:bg-brand-primaryHover transition-colors text-sm flex items-center justify-center gap-2">
                  <Navigation className="w-4 h-4 fill-white" />
                  Directions
              </button>
          </div>

      </div>

    </div>
  );
};

export default ActiveRestaurantBookingScreen;
