
import React, { useState } from 'react';
import { ArrowLeft, Calendar, Zap, CreditCard, Minus, Plus, ChevronRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Guide } from '../utils/mockData';
import { getNextDays } from '../utils/helpers';

const BookingScreen: React.FC = () => {
  const { goBack, navigate, selectedItem, addBooking, showNotification } = useAppContext();
  const guide = selectedItem as Guide;
  const [bookingType, setBookingType] = useState<'schedule' | 'instant'>('schedule');
  const [selectedDate, setSelectedDate] = useState<number>(new Date().getDate());
  const [guests, setGuests] = useState<number>(2);

  if (!guide) return null;

  const total = guide.price * guests;

  const handleConfirm = () => {
    addBooking({ id: Date.now(), guideId: guide.id, total, guests, type: bookingType });
    showNotification("Booking Confirmed");
    navigate('active-tour', guide);
  };

  return (
    <div className="w-full h-full bg-ios-bg font-sans flex flex-col">
      
      {/* Navigation Bar */}
      <div className="pt-12 pb-3 px-4 bg-ios-bg flex items-center justify-between sticky top-0 z-10">
          <button onClick={goBack} className="flex items-center gap-1 text-ios-blue text-[17px]">
              <ArrowLeft size={22} />
              <span>Back</span>
          </button>
          <span className="font-semibold text-[17px] text-black">Booking</span>
          <div className="w-16"></div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pt-4 pb-32">
          
          {/* Segmented Control */}
          <div className="bg-[#E3E3E8] p-[2px] rounded-[9px] flex mb-8">
              <button 
                onClick={() => setBookingType('schedule')}
                className={`flex-1 py-1.5 text-[13px] font-semibold rounded-[7px] transition-all ${bookingType === 'schedule' ? 'bg-white shadow-sm text-black' : 'text-gray-500'}`}
              >
                  Schedule
              </button>
              <button 
                onClick={() => setBookingType('instant')}
                className={`flex-1 py-1.5 text-[13px] font-semibold rounded-[7px] transition-all ${bookingType === 'instant' ? 'bg-white shadow-sm text-black' : 'text-gray-500'}`}
              >
                  Instant
              </button>
          </div>

          <h3 className="text-[13px] font-medium text-gray-500 uppercase ml-4 mb-2">DETAILS</h3>
          <div className="bg-white rounded-[12px] overflow-hidden mb-8">
              <div className="p-4 flex justify-between items-center border-b border-gray-100 cursor-pointer active:bg-gray-50">
                  <span className="text-[17px] text-black">Date</span>
                  <div className="flex items-center gap-2 text-gray-400">
                      <span className="text-ios-blue text-[17px]">Today</span>
                      <ChevronRight size={16} />
                  </div>
              </div>
              <div className="p-4 flex justify-between items-center border-b border-gray-100 cursor-pointer active:bg-gray-50">
                  <span className="text-[17px] text-black">Time</span>
                  <div className="flex items-center gap-2 text-gray-400">
                      <span className="text-black text-[17px]">10:00 AM</span>
                      <ChevronRight size={16} />
                  </div>
              </div>
              <div className="p-4 flex justify-between items-center">
                  <span className="text-[17px] text-black">Guests</span>
                  <div className="flex items-center gap-4">
                       <button onClick={() => setGuests(Math.max(1, guests-1))} className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 active:bg-gray-100">
                           <Minus size={16} />
                       </button>
                       <span className="text-[17px] font-semibold w-4 text-center">{guests}</span>
                       <button onClick={() => setGuests(guests+1)} className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 active:bg-gray-100">
                           <Plus size={16} />
                       </button>
                  </div>
              </div>
          </div>

          <h3 className="text-[13px] font-medium text-gray-500 uppercase ml-4 mb-2">PAYMENT</h3>
          <div className="bg-white rounded-[12px] p-4 flex items-center gap-4 mb-8">
              <div className="w-10 h-7 bg-black rounded flex items-center justify-center">
                  <span className="text-white font-bold text-[8px] uppercase">Apple Pay</span>
              </div>
              <div className="flex-1">
                  <p className="text-[17px] text-black">Apple Pay</p>
              </div>
              <div className="w-5 h-5 rounded-full bg-ios-blue flex items-center justify-center">
                   <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
          </div>

          <div className="px-2">
             <div className="flex justify-between mb-2">
                 <span className="text-gray-500">Subtotal</span>
                 <span className="text-black font-medium">£{total}</span>
             </div>
             <div className="flex justify-between mb-4">
                 <span className="text-gray-500">Service Fee</span>
                 <span className="text-black font-medium">£5</span>
             </div>
             <div className="flex justify-between border-t border-gray-200 pt-4">
                 <span className="text-black font-bold text-lg">Total</span>
                 <span className="text-black font-bold text-lg">£{total + 5}</span>
             </div>
          </div>

      </div>

      <div className="absolute bottom-0 left-0 w-full bg-white border-t border-gray-100 p-5 pb-8 z-50">
          <button 
             onClick={handleConfirm}
             className="w-full bg-ios-blue text-white font-bold text-[17px] py-4 rounded-[14px] shadow-lg active:opacity-90"
          >
              Pay & Confirm
          </button>
      </div>

    </div>
  );
};

export default BookingScreen;
