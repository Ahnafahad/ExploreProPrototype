
import React, { useState } from 'react';
import { Search, SlidersHorizontal, Star, Coffee, ArrowLeft } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { COFFEE_HOSTS } from '../utils/mockData';
import { TabBar } from './shared/TabBar';

const CoffeeChatsScreen: React.FC = () => {
  const { navigate, goBack } = useAppContext();
  const [activeTab, setActiveTab] = useState<'hosts' | 'meetups'>('hosts');
  const [searchQuery, setSearchQuery] = useState('');

  const meetups = [
    {
      id: 1,
      title: "Central London: Startup Networking",
      desc: "Connect with founders and professionals over coffee to exchange ideas and opportunities.",
      price: 108.99,
      rating: 4.8,
      image: "https://picsum.photos/seed/coffee_startup/300/200"
    },
    {
      id: 2,
      title: "Manchester: Creative Minds Meetup",
      desc: "Meet local designers, artists, and innovators to share inspiration and projects.",
      price: 8.99,
      rating: 4.9,
      image: "https://picsum.photos/seed/coffee_art/300/200"
    }
  ];

  const filteredHosts = COFFEE_HOSTS.filter(host => 
    host.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    host.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    host.bio.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMeetups = meetups.filter(meetup => 
    meetup.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    meetup.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative w-full h-full bg-gray-50 flex flex-col font-sans overflow-hidden">
      
      {/* MAP SECTION */}
      <div className="h-[45%] w-full relative">
        {/* Header Overlay */}
        <div className="absolute top-12 left-6 right-6 z-20 flex items-center gap-3 pt-2">
           {/* Back Button */}
           <button onClick={goBack} className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center flex-shrink-0">
               <ArrowLeft size={20} className="text-black" />
           </button>
           {/* Search Bar with Blue Filter Icon (Combined Design) */}
           <div className="flex-1 flex gap-3">
              <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center shadow-lg shadow-blue-300">
                  <SlidersHorizontal className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 relative shadow-lg rounded-full">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={activeTab === 'hosts' ? "Search coffee hosts..." : "Search coffee chats..."}
                    className="w-full bg-white/95 backdrop-blur-sm text-gray-700 rounded-full py-3.5 pl-12 pr-4 focus:outline-none text-sm placeholder:font-light"
                />
              </div>
           </div>
        </div>

        {/* Embedded Google Map */}
        <div className="w-full h-full relative overflow-hidden">
             {/* Gradient Overlay for top fade */}
             <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-sky-400/30 to-transparent z-10 pointer-events-none"></div>

             <iframe
                width="100%"
                height="120%"
                style={{ border: 0, filter: 'saturate(1.2) hue-rotate(-10deg)', marginTop: '-10%' }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.openstreetmap.org/export/embed.html?bbox=0.0618%2C52.1653%2C0.1818%2C52.2453&layer=mapnik"
                title="Coffee Chats Map"
            ></iframe>
            
            {/* Conditional Map Pins */}
            {activeTab === 'hosts' ? (
                <>
                    <div className="absolute top-[40%] left-[30%] transform -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-auto">
                        <CoffeeHostMarker index={1} />
                    </div>
                    <div className="absolute top-[55%] left-[60%] transform -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-auto">
                        <CoffeeHostMarker index={2} />
                    </div>
                    <div className="absolute top-[35%] left-[70%] transform -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-auto">
                        <CoffeeHostMarker index={3} />
                    </div>
                </>
            ) : (
                <>
                    <div className="absolute top-[40%] left-[30%] transform -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-auto">
                        <CoffeeMeetupMarker index={1} />
                    </div>
                    <div className="absolute top-[50%] left-[65%] transform -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-auto">
                        <CoffeeMeetupMarker index={2} />
                    </div>
                </>
            )}

        </div>
      </div>

      {/* CONTENT SHEET */}
      <div className="flex-1 bg-gray-50 rounded-t-[2.5rem] -mt-8 z-30 relative overflow-hidden flex flex-col shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
        
        {/* Toggle / Header */}
        <div className="px-6 pt-6 pb-2">
            <div className="bg-gray-200 p-1 rounded-xl flex mb-4">
                <button 
                  className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'hosts' ? 'bg-white text-brand-primary shadow-sm' : 'text-gray-500'}`}
                  onClick={() => setActiveTab('hosts')}
                >
                    Hosts
                </button>
                <button 
                  className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'meetups' ? 'bg-white text-brand-primary shadow-sm' : 'text-gray-500'}`}
                  onClick={() => setActiveTab('meetups')}
                >
                    Meetups
                </button>
            </div>
        </div>

        {/* Scrollable List */}
        <div className="flex-1 overflow-y-auto px-6 pb-28 space-y-4 scrollbar-hide">
            
            {activeTab === 'hosts' ? (
                // --- HOSTS LIST ---
                filteredHosts.length > 0 ? (
                    filteredHosts.map((host) => (
                        <div 
                          key={host.id} 
                          className="bg-white rounded-[2rem] p-5 shadow-sm border border-gray-100/50 flex flex-col gap-3 cursor-pointer active:scale-95 transition-transform"
                          onClick={() => navigate('coffee-host-details', host)}
                        >
                            <div className="flex items-start gap-4">
                                <img src={host.image} alt={host.name} className="w-16 h-16 rounded-full object-cover border-2 border-gray-50" />
                                <div className="flex-1">
                                    <h3 className="text-brand-dark font-bold text-lg">{host.name}</h3>
                                    <p className="text-brand-dark font-medium text-xs mb-1">Role: <span className="text-gray-500 font-normal">{host.role}</span></p>
                                    <p className="text-brand-dark font-medium text-xs mb-2 leading-relaxed">Bio: <span className="text-gray-500 font-normal">{host.bio}</span></p>
                                    <p className="text-brand-dark font-medium text-xs">Languages: <span className="text-gray-500 font-normal">{host.languages}</span></p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between mt-1 pt-3 border-t border-gray-50">
                                <p className="text-brand-dark font-bold text-lg">£{host.price}<span className="text-brand-primary text-sm font-normal">/hr</span></p>
                                <button className="bg-brand-primary hover:bg-brand-primaryHover text-white text-xs font-bold py-2.5 px-6 rounded-full shadow-md shadow-blue-300 transition-colors">
                                    Book Chat
                                </button>
                            </div>
                        </div>
                    ))
                ) : <div className="text-center text-gray-400">No hosts found.</div>
            ) : (
                // --- MEETUPS LIST ---
                filteredMeetups.length > 0 ? (
                    filteredMeetups.map((event) => (
                        <div key={event.id} className="bg-white rounded-3xl p-3 shadow-sm border border-gray-100 flex gap-4">
                             <div className="relative shrink-0">
                                 <img src={event.image} alt={event.title} className="w-28 h-28 object-cover rounded-2xl" />
                                 <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-1.5 py-0.5 rounded-md flex items-center gap-0.5 shadow-sm">
                                     <Star className="w-2.5 h-2.5 text-brand-primary fill-brand-primary" />
                                     <span className="text-[10px] font-bold text-brand-dark">{event.rating}</span>
                                 </div>
                             </div>
                             <div className="flex-1 flex flex-col justify-between py-1 pr-1">
                                 <div>
                                     <h3 className="text-brand-dark font-bold text-sm leading-tight mb-2 line-clamp-2">{event.title}</h3>
                                     <p className="text-gray-500 text-[10px] leading-relaxed line-clamp-2">{event.desc}</p>
                                 </div>
                                 <div className="flex items-center justify-between mt-2">
                                     <span className="text-brand-primary font-bold text-base">£{event.price}</span>
                                     <button className="bg-brand-primary hover:bg-brand-primaryHover text-white text-[10px] font-bold py-2 px-6 rounded-lg shadow-md transition-colors">
                                         Join
                                     </button>
                                 </div>
                             </div>
                        </div>
                    ))
                ) : <div className="text-center text-gray-400">No meetups found.</div>
            )}

            {/* See More Link */}
            {(activeTab === 'hosts' ? filteredHosts.length > 0 : filteredMeetups.length > 0) && (
                <div className="flex justify-end pt-2">
                    <span className="text-brand-primary text-sm font-semibold cursor-pointer hover:underline flex items-center gap-1">
                        See more <span className="text-lg">›</span>
                    </span>
                </div>
            )}

        </div>

      </div>

      {/* Tab Bar */}
      <TabBar activeTab="map" onNavigate={navigate} />

    </div>
  );
};

// Coffee Host Map Marker Component
const CoffeeHostMarker: React.FC<{ index: number }> = ({ index }) => (
  <div className="relative cursor-pointer group">
    {/* Pin Stem */}
    <div className="absolute top-12 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-gray-800/30 z-0"></div>

    {/* Badge with Animation */}
    <div className="relative animate-[bounce_2s_ease-in-out_infinite]" style={{ animationDelay: `${index * 0.15}s` }}>
      {/* Pulse Ring */}
      <div className="absolute inset-0 bg-orange-500 rounded-full animate-ping opacity-75"></div>

      {/* Main Badge */}
      <div className="relative w-12 h-12 bg-orange-500 rounded-full shadow-lg border-3 border-white flex items-center justify-center text-white hover:scale-110 transition-transform">
        <Coffee className="w-6 h-6" />

        {/* Counter Badge */}
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full shadow-md flex items-center justify-center">
          <span className="text-[10px] font-bold text-gray-800">{index}</span>
        </div>
      </div>
    </div>
  </div>
);

// Coffee Meetup Map Marker Component
const CoffeeMeetupMarker: React.FC<{ index: number }> = ({ index }) => (
  <div className="relative cursor-pointer group">
    {/* Pin Stem */}
    <div className="absolute top-12 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-gray-800/30 z-0"></div>

    {/* Badge with Animation */}
    <div className="relative animate-[bounce_2s_ease-in-out_infinite]" style={{ animationDelay: `${index * 0.15}s` }}>
      {/* Pulse Ring */}
      <div className="absolute inset-0 bg-orange-400 rounded-full animate-ping opacity-75"></div>

      {/* Main Badge */}
      <div className="relative w-12 h-12 bg-orange-400 rounded-full shadow-lg border-3 border-white flex items-center justify-center text-white hover:scale-110 transition-transform">
        <Coffee className="w-6 h-6" />

        {/* Counter Badge */}
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full shadow-md flex items-center justify-center">
          <span className="text-[10px] font-bold text-gray-800">{index}</span>
        </div>
      </div>
    </div>
  </div>
);

export default CoffeeChatsScreen;
