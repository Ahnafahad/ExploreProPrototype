
import React from 'react';
import { ArrowLeft, CreditCard, Lock, CheckCircle, Smartphone } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const AudioBookingScreen: React.FC = () => {
  const { navigate, goBack, selectedItem, showNotification } = useAppContext();
  const tour = selectedItem;
  
  const handleConfirm = () => {
      showNotification('Audio Tour Unlocked!');
      navigate('active-audio-tour', tour);
  }

  return (
    <div className="w-full h-full bg-gray-50 flex flex-col font-sans relative overflow-hidden">
      
      {/* Header */}
      <div className="pt-12 pb-4 px-6 bg-white shadow-sm z-20 flex items-center justify-between">
        <button onClick={goBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
          <ArrowLeft className="w-6 h-6 text-brand-dark" />
        </button>
        <h2 className="text-brand-dark text-lg font-bold">Checkout</h2>
        <div className="w-6"></div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24 px-6 pt-6">
        
        {/* Item Card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex gap-4 mb-6">
           <img src={tour?.image || "https://picsum.photos/seed/kings_college/200/200"} alt="Cover" className="w-20 h-20 rounded-xl object-cover" />
           <div className="flex-1 flex flex-col justify-center">
              <h3 className="text-brand-dark font-bold text-sm leading-tight mb-1">{tour?.title}</h3>
              <p className="text-gray-500 text-xs mb-2">Audio Tour • {tour?.time}</p>
              <p className="text-brand-primary font-bold text-base">£{tour?.price}</p>
           </div>
        </div>

        {/* Benefits */}
        <div className="mb-8 space-y-3">
             <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                <div>
                    <h4 className="text-brand-dark text-sm font-bold">Instant Access</h4>
                    <p className="text-xs text-gray-500">Start listening immediately after purchase.</p>
                </div>
             </div>
             <div className="flex items-start gap-3">
                <Smartphone className="w-5 h-5 text-brand-primary shrink-0" />
                <div>
                    <h4 className="text-brand-dark text-sm font-bold">Offline Mode</h4>
                    <p className="text-xs text-gray-500">Download to your phone and save data.</p>
                </div>
             </div>
        </div>

        {/* Payment Method */}
        <h3 className="text-brand-dark font-bold text-base mb-3">Payment Method</h3>
        <div className="flex items-center gap-3 bg-white p-4 rounded-xl border border-gray-200 cursor-pointer hover:border-brand-primary/50 transition-colors shadow-sm mb-6">
            <div className="bg-blue-900 text-white p-2 rounded-lg">
                <CreditCard className="w-5 h-5" />
            </div>
            <div className="flex-1">
                <p className="text-brand-dark font-bold text-sm">Visa **** 4242</p>
                <p className="text-gray-400 text-xs">Expires 12/25</p>
            </div>
            <div className="w-5 h-5 rounded-full border-2 border-brand-primary flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-brand-primary rounded-full"></div>
            </div>
        </div>

        {/* Apple Pay / Google Pay Button Simulators */}
        <button className="w-full bg-black text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 mb-3">
             <span className="text-lg"></span> Pay
        </button>

      </div>

      {/* Bottom Bar */}
      <div className="absolute bottom-0 left-0 w-full bg-white shadow-[0_-5px_30px_rgba(0,0,0,0.05)] rounded-t-[2rem] p-6 z-30">
          <div className="flex justify-between items-center mb-4 text-sm">
             <span className="text-gray-500">Total</span>
             <span className="text-brand-dark text-xl font-bold">£{tour?.price}</span>
          </div>
          <button 
            onClick={handleConfirm}
            className="w-full bg-brand-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-300/50 hover:bg-brand-primaryHover transition-transform active:scale-95 uppercase tracking-wide text-sm flex items-center justify-center gap-2"
          >
             <Lock className="w-4 h-4" />
             Pay Securely
          </button>
      </div>

    </div>
  );
};

export default AudioBookingScreen;
