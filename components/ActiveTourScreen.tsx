
import React, { useState } from 'react';
import { ArrowLeft, Clock, MessageCircle, Phone, X, MapPin, Calendar, User as UserIcon } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Guide } from '../utils/mockData';

const ActiveTourScreen: React.FC = () => {
  const { navigate, selectedItem, user, showNotification } = useAppContext();
  const guide = selectedItem as Guide;
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  if (!guide) return null;

  return (
    <div className="w-full h-full bg-white flex flex-col font-sans relative overflow-hidden">
      
      {/* HEADER SECTION */}
      <div className="pt-14 pb-4 px-6 bg-white z-20">
        <h1 className="text-gray-400 font-bold text-lg mb-4">ExplorePro</h1>
        
        {/* User Progress Bar Row */}
        <div className="flex items-center gap-3 mb-2">
            <img 
                src="https://i.pravatar.cc/150?img=11" 
                alt="User" 
                className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
            />
            {/* Custom Progress Bar */}
            <div className="flex-1 h-1.5 bg-sky-100 rounded-full relative">
                <div className="absolute top-0 left-0 h-full w-[95%] bg-brand-primary rounded-full"></div>
                {/* Dot at end */}
                <div className="absolute top-1/2 right-[5%] w-4 h-4 bg-brand-primary rounded-full transform -translate-y-1/2 translate-x-1/2 border-2 border-white shadow-sm"></div>
            </div>
        </div>

        {/* Status Text Row */}
        <div className="flex justify-between items-center text-sm">
            <div>
                <p className="text-gray-400 font-medium text-xs mb-1">Your tour has started!</p>
                <div className="flex items-center bg-brand-primary rounded-full pl-0 pr-3 py-0.5 w-fit">
                    <span className="bg-white text-brand-primary text-[10px] font-bold px-2 py-0.5 rounded-full mx-0.5">Guide</span>
                    <span className="text-white text-xs font-medium ml-1">{guide.name}</span>
                </div>
            </div>
            <div className="text-gray-400 font-medium text-xs self-start mt-1">
                Ends in 19:00
            </div>
        </div>
      </div>

      {/* MAP SECTION */}
      <div className="relative w-full flex-1 bg-gray-100 overflow-hidden">
         {/* Simulated Map Background with Iframe */}
         <iframe 
            width="100%" 
            height="120%" 
            style={{ border: 0, opacity: 0.6, filter: 'grayscale(0.2) contrast(1.1)', marginTop: '-10%' }}
            loading="lazy" 
            src={`https://maps.google.com/maps?q=Cambridge,UK&t=m&z=15&ie=UTF8&iwloc=&output=embed`}
            title="Active Tour Map"
            className="pointer-events-none"
        ></iframe>

        {/* Floating Back Button */}
        <button 
            onClick={() => navigate('home')}
            className="absolute top-6 left-6 bg-white text-brand-dark font-bold text-xs py-2 px-4 rounded-full shadow-lg flex items-center gap-2 hover:bg-gray-50 transition-colors z-30"
        >
            <ArrowLeft className="w-4 h-4" />
            HOME
        </button>

        {/* Map Overlays Container (Absolute positioning on top of map) */}
        <div className="absolute inset-0 z-10 pointer-events-none">
            
            {/* SVG Path for Route */}
            <svg className="w-full h-full absolute top-0 left-0" style={{ filter: 'drop-shadow(0px 4px 4px rgba(0,0,0,0.1))' }}>
                <defs>
                    <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3B82F6" />
                        <stop offset="100%" stopColor="#60A5FA" />
                    </linearGradient>
                </defs>
                {/* This path is drawn to visually match the screenshot's zigzag route */}
                <path 
                    d="M100,280 L120,250 L180,260 L200,220 L240,220 L240,180 L280,150" 
                    fill="none" 
                    stroke="#3B82F6" 
                    strokeWidth="6" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                />
            </svg>

            {/* User Location Marker (Start of path) */}
            <div className="absolute top-[280px] left-[100px] transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-4 h-4 bg-brand-primary rounded-full border-2 border-white shadow-md relative z-20"></div>
                <div className="w-12 h-12 bg-brand-primary/20 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-ping"></div>
                <div className="w-12 h-12 bg-brand-primary/20 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>

            {/* Guide Marker (End of path) */}
            <div className="absolute top-[150px] left-[280px] transform -translate-x-1/2 -translate-y-full">
                
                {/* Tooltip Bubble */}
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white text-brand-dark text-xs font-bold py-2 px-4 rounded-lg shadow-lg whitespace-nowrap mb-2">
                    Guide is 2 min away
                    {/* Triangle pointer */}
                    <div className="absolute bottom-[-6px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-white"></div>
                </div>

                {/* Pin with Avatar */}
                <div className="relative w-14 h-16 drop-shadow-2xl">
                    <svg viewBox="0 0 100 120" className="w-full h-full text-brand-primary fill-current">
                        <path d="M50,0 C22.4,0 0,22.4 0,50 C0,77.6 50,120 50,120 C50,120 100,77.6 100,50 C100,22.4 77.6,0 50,0 Z" />
                        <circle cx="50" cy="50" r="44" fill="white" />
                    </svg>
                    <div className="absolute top-1.5 left-1.5 w-[3.2rem] h-[3.2rem] rounded-full overflow-hidden">
                        <img src={guide.image} alt="Guide" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>

        </div>
      </div>

      {/* BOTTOM ACTION PANEL */}
      <div className="bg-white px-6 pt-8 pb-8 rounded-t-[2rem] shadow-[0_-5px_30px_rgba(0,0,0,0.05)] -mt-6 relative z-40">
        <div className="flex flex-col items-center">
            
            <h2 className="text-gray-400 font-medium text-lg mb-4">Your tour has started!</h2>
            
            <button onClick={() => setShowDetailsModal(true)} className="border border-gray-300 text-gray-500 font-bold text-xs py-3 px-8 rounded-xl hover:bg-gray-50 transition-colors uppercase tracking-wider mb-4 cursor-pointer">
                View Booking Details
            </button>
            
            <div className="flex items-center gap-2 text-gray-400 mb-8">
                <span className="text-xl font-bold">120 min</span>
                <Clock className="w-5 h-5" />
            </div>

            <div className="w-full flex gap-4">
                <button onClick={() => navigate('chat')} className="flex-1 border-2 border-gray-400 text-gray-500 font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors uppercase text-sm cursor-pointer">
                    <MessageCircle className="w-5 h-5 fill-gray-500" />
                    Message
                </button>
                <button onClick={() => showNotification(`Calling ${guide.name}...`)} className="flex-1 bg-brand-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-300/50 flex items-center justify-center gap-2 hover:bg-brand-primaryHover transition-colors uppercase text-sm cursor-pointer active:scale-95">
                    <Phone className="w-5 h-5 fill-white" />
                    Call
                </button>
            </div>

        </div>
      </div>

      {/* Booking Details Modal */}
      {showDetailsModal && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-[200] animate-[fadeIn_0.2s_ease-out]"
            onClick={() => setShowDetailsModal(false)}
          />

          {/* Modal */}
          <div className="fixed bottom-0 left-0 right-0 z-[201] animate-[slideUp_0.3s_ease-out]">
            <div className="bg-white rounded-t-[24px] max-h-[80vh] flex flex-col">

              {/* Header */}
              <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-gray-100">
                <h2 className="text-[20px] font-bold text-black">Booking Details</h2>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer active:bg-gray-200 transition-colors"
                >
                  <X size={20} className="text-gray-600" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto px-5 py-6 scrollbar-hide">
                <div className="space-y-6">
                  {/* Guide Info */}
                  <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
                    <img src={guide.image} className="w-16 h-16 rounded-full object-cover" />
                    <div>
                      <h3 className="text-[17px] font-semibold text-black">{guide.name}</h3>
                      <p className="text-sm text-gray-500">{guide.title}</p>
                    </div>
                  </div>

                  {/* Booking Info */}
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-ios-blue mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-black">Date & Time</p>
                        <p className="text-sm text-gray-500">Today, {new Date().toLocaleDateString()} at 2:00 PM</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-ios-blue mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-black">Meeting Point</p>
                        <p className="text-sm text-gray-500">Oxford Visitor Centre, Broad Street</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-ios-blue mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-black">Duration</p>
                        <p className="text-sm text-gray-500">2 hours</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <UserIcon className="w-5 h-5 text-ios-blue mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-black">Participants</p>
                        <p className="text-sm text-gray-500">{user.name}</p>
                      </div>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="bg-ios-bg rounded-[16px] p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tour Price</span>
                      <span className="font-semibold text-black">£{guide.price}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Service Fee</span>
                      <span className="font-semibold text-black">£{(guide.price * 0.1).toFixed(2)}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-2 flex justify-between">
                      <span className="font-semibold text-black">Total</span>
                      <span className="font-bold text-ios-blue text-lg">£{(guide.price * 1.1).toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Booking ID */}
                  <div className="text-center py-4">
                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Booking ID</p>
                    <p className="text-sm font-mono font-semibold text-gray-600">#TOUR-{Date.now().toString().slice(-6)}</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes slideUp {
              from { transform: translateY(100%); }
              to { transform: translateY(0); }
            }
          `}</style>
        </>
      )}

    </div>
  );
};

export default ActiveTourScreen;
