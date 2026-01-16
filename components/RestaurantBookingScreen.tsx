
import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, MapPin, Users, Ticket, Check } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { getNextDays } from '../utils/helpers';

const RestaurantBookingScreen: React.FC = () => {
  const { navigate, goBack, showNotification } = useAppContext();
  
  const nextDays = getNextDays(5);
  const [selectedDate, setSelectedDate] = useState<number>(nextDays[0].date);
  const [selectedTime, setSelectedTime] = useState<string>('07:00 PM');
  const [guests, setGuests] = useState<number>(2);
  const [selectedOffer, setSelectedOffer] = useState<number>(1); // Default to first offer

  const times = ['06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM', '08:00 PM'];

  const offers = [
    { id: 1, title: "50% Off Food Bill", desc: "Valid for slots 2PM-5PM", color: "from-orange-400 to-pink-500" },
    { id: 2, title: "Free Dessert", desc: "One per main course ordered", color: "from-blue-500 to-brand-primary" },
    { id: 3, title: "Standard Booking", desc: "No special offer applied", color: "from-gray-400 to-gray-600" }
  ];

  const handleConfirm = () => {
      showNotification('Table Reserved!');
      navigate('active-restaurant-booking');
  }

  return (
    <div className="w-full h-full bg-gray-50 flex flex-col font-sans relative overflow-hidden">
      
      {/* HEADER */}
      <div className="pt-12 pb-4 px-6 bg-white shadow-sm z-20 flex items-center justify-between">
        <button onClick={goBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
          <ArrowLeft className="w-6 h-6 text-brand-dark" />
        </button>
        <h2 className="text-brand-dark text-lg font-bold">Table Reservation</h2>
        <div className="w-6"></div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24 scrollbar-hide">
        
        {/* Restaurant Summary */}
        <div className="m-6 p-4 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
           <img src="https://picsum.photos/seed/ramen_bowl/200/200" alt="Rest" className="w-16 h-16 rounded-xl object-cover" />
           <div className="flex-1">
              <h3 className="text-brand-dark font-bold text-lg leading-tight">Liceria & Co.</h3>
              <p className="text-gray-400 text-sm">Indonesian • Rice Dish</p>
           </div>
        </div>

        {/* 1. SELECT OFFER */}
        <div className="px-6 mb-8">
            <h3 className="text-brand-dark font-bold text-base mb-4 flex items-center gap-2">
                <Ticket className="w-4 h-4 text-brand-primary" /> Select Offer
            </h3>
            <div className="space-y-3">
                {offers.map((offer) => (
                    <div 
                        key={offer.id}
                        onClick={() => setSelectedOffer(offer.id)}
                        className={`relative rounded-xl p-4 cursor-pointer transition-transform active:scale-95 overflow-hidden ${selectedOffer === offer.id ? 'ring-2 ring-brand-primary shadow-md' : 'opacity-80 grayscale-[0.5]'}`}
                    >
                        {/* Background Gradient */}
                        <div className={`absolute inset-0 bg-gradient-to-r ${offer.color} opacity-90`}></div>
                        
                        <div className="relative z-10 flex justify-between items-center text-white">
                            <div>
                                <h4 className="font-bold text-lg">{offer.title}</h4>
                                <p className="text-xs opacity-90">{offer.desc}</p>
                            </div>
                            {selectedOffer === offer.id && (
                                <div className="bg-white text-brand-primary rounded-full p-1">
                                    <Check className="w-4 h-4" />
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* 2. SELECT GUESTS */}
        <div className="px-6 mb-8">
             <h3 className="text-brand-dark font-bold text-base mb-4 flex items-center gap-2">
                <Users className="w-4 h-4 text-brand-primary" /> Guests
            </h3>
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-hide">
                {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                    <button
                        key={num}
                        onClick={() => setGuests(num)}
                        className={`w-12 h-12 rounded-full font-bold text-sm flex items-center justify-center shrink-0 transition-colors ${guests === num ? 'bg-brand-primary text-white shadow-lg shadow-blue-300/50' : 'bg-white text-gray-400 border border-gray-100'}`}
                    >
                        {num}
                    </button>
                ))}
            </div>
        </div>

        {/* 3. SELECT DATE */}
        <div className="px-6 mb-8">
            <h3 className="text-brand-dark font-bold text-base mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-brand-primary" /> Date
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

        {/* 4. SELECT TIME */}
        <div className="px-6 mb-8">
            <h3 className="text-brand-dark font-bold text-base mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand-primary" /> Time
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

      </div>

      {/* BOTTOM ACTION BAR */}
      <div className="absolute bottom-0 left-0 w-full bg-white shadow-[0_-5px_30px_rgba(0,0,0,0.05)] rounded-t-[2rem] p-6 z-30">
          <div className="mb-4 text-center">
             <p className="text-xs text-gray-400 mb-1">Reservation for {guests} people</p>
             <p className="text-brand-primary font-bold text-sm">{offers.find(o => o.id === selectedOffer)?.title}</p>
          </div>
          <button 
            onClick={handleConfirm}
            className="w-full bg-brand-dark text-white font-bold py-4 rounded-xl shadow-lg hover:bg-opacity-90 transition-transform active:scale-95 uppercase tracking-wide text-sm"
          >
             Confirm Reservation
          </button>
      </div>

    </div>
  );
};

export default RestaurantBookingScreen;
