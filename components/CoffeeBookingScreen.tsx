
import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Calendar, Clock, MapPin } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { getNextDays } from '../utils/helpers';

const CoffeeBookingScreen: React.FC = () => {
  const { navigate, goBack, selectedItem, showNotification } = useAppContext();
  const host = selectedItem;
  
  const nextDays = getNextDays(5);
  const [selectedDate, setSelectedDate] = useState<number>(nextDays[0].date);
  const [selectedTime, setSelectedTime] = useState<string>('02:00 PM');

  const times = ['10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'];

  const handleConfirm = () => {
      showNotification('Coffee Chat Confirmed!');
      navigate('active-coffee-chat', host);
  };

  if (!host) return null;

  return (
    <div className="w-full h-full bg-gray-50 flex flex-col font-sans relative overflow-hidden">
      
      {/* Header */}
      <div className="pt-12 pb-4 px-6 bg-white shadow-sm z-20 flex items-center justify-between">
        <button onClick={goBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
          <ArrowLeft className="w-6 h-6 text-brand-dark" />
        </button>
        <h2 className="text-brand-dark text-lg font-bold">Schedule Chat</h2>
        <div className="w-6"></div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24 px-6 pt-6 scrollbar-hide">
        
        {/* Host Summary */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-4 mb-6">
           <img src={host.image} alt={host.name} className="w-16 h-16 rounded-full object-cover" />
           <div className="flex-1">
              <h3 className="text-brand-dark font-bold text-lg leading-tight">{host.name}</h3>
              <p className="text-gray-400 text-sm">£{host.price} per session</p>
           </div>
        </div>

        {/* Date Selection */}
        <div className="mb-8">
           <h3 className="text-brand-dark font-bold text-base mb-4 flex items-center gap-2">
               <Calendar className="w-4 h-4 text-brand-primary" /> Select Date
           </h3>
           <div className="flex justify-between items-center overflow-x-auto pb-2 -mx-2 px-2">
              {nextDays.map((d, i) => (
                <div 
                  key={i}
                  onClick={() => setSelectedDate(d.date)}
                  className={`flex flex-col items-center justify-center w-14 h-20 rounded-2xl cursor-pointer transition-all border ${selectedDate === d.date ? 'bg-brand-primary text-white border-brand-primary shadow-lg shadow-blue-200' : 'bg-white text-gray-400 border-gray-100 hover:border-brand-primary/30'}`}
                >
                   <span className="text-xs font-medium mb-1">{d.day}</span>
                   <span className="text-xl font-bold">{d.date}</span>
                </div>
              ))}
           </div>
        </div>

        {/* Time Selection */}
        <div className="mb-8">
           <h3 className="text-brand-dark font-bold text-base mb-4 flex items-center gap-2">
               <Clock className="w-4 h-4 text-brand-primary" /> Select Time
           </h3>
           <div className="grid grid-cols-3 gap-3">
              {times.map((t, i) => (
                <button 
                  key={i}
                  onClick={() => setSelectedTime(t)}
                  className={`py-3 rounded-xl text-xs font-bold border transition-all ${selectedTime === t ? 'bg-brand-primary/10 text-brand-primary border-brand-primary' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'}`}
                >
                  {t}
                </button>
              ))}
           </div>
        </div>

        {/* Location Preview */}
        <div className="mb-6">
            <h3 className="text-brand-dark font-bold text-base mb-3 flex items-center gap-2">
               <MapPin className="w-4 h-4 text-brand-primary" /> Meeting Point
            </h3>
            <div className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center gap-3">
                <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center text-2xl">☕</div>
                <div>
                    <h4 className="font-bold text-brand-dark text-sm">Cafe Nero</h4>
                    <p className="text-gray-500 text-xs">15 Market St, Cambridge</p>
                </div>
            </div>
        </div>

        {/* Payment Method */}
        <div className="mb-6">
           <h3 className="text-brand-dark font-bold text-base mb-3">Payment</h3>
           <div className="flex items-center gap-3 bg-white p-4 rounded-xl border border-gray-200 cursor-pointer shadow-sm">
               <div className="bg-blue-900 text-white p-2 rounded-lg">
                  <CreditCard className="w-5 h-5" />
               </div>
               <div className="flex-1">
                  <p className="text-brand-dark font-bold text-sm">Visa **** 4242</p>
               </div>
               <div className="w-5 h-5 rounded-full border-2 border-brand-primary flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-brand-primary rounded-full"></div>
               </div>
           </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="absolute bottom-0 left-0 w-full bg-white shadow-[0_-5px_30px_rgba(0,0,0,0.05)] rounded-t-[2rem] p-6 z-30">
          <div className="flex justify-between items-center mb-4 text-sm">
             <span className="text-gray-500">Total Price</span>
             <span className="text-brand-dark text-xl font-bold">£{host.price}.00</span>
          </div>
          <button 
            onClick={handleConfirm}
            className="w-full bg-brand-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-300/50 hover:bg-brand-primaryHover transition-transform active:scale-95 uppercase tracking-wide text-sm"
          >
             Confirm Booking
          </button>
      </div>

    </div>
  );
};

export default CoffeeBookingScreen;
