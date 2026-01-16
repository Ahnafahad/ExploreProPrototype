
import React, { useState } from 'react';
import { Search, SlidersHorizontal, Home, Compass, MessageCircle, User, Star } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { COFFEE_HOSTS } from '../utils/mockData';

const CoffeeChatsScreen: React.FC = () => {
  const { navigate } = useAppContext();
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
        <div className="absolute top-12 left-6 right-6 z-20 flex items-center gap-4 pt-2">
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
                    <div className="absolute top-[40%] left-[30%] transform -translate-x-1/2 -translate-y-1/2 z-10">
                        <MapMarker image={COFFEE_HOSTS[0].image} active />
                    </div>
                    <div className="absolute top-[55%] left-[60%] transform -translate-x-1/2 -translate-y-1/2 z-10">
                        <MapMarker image={COFFEE_HOSTS[1].image} />
                    </div>
                </>
            ) : (
                <>
                    <div className="absolute top-[40%] left-[30%] transform -translate-x-1/2 -translate-y-1/2 z-10">
                        <EventPin />
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

      {/* Bottom Navigation */}
      <div className="absolute bottom-6 left-6 right-6 bg-white rounded-full shadow-2xl shadow-blue-900/10 px-8 py-4 flex justify-between items-center z-50">
          <div className="cursor-pointer hover:text-brand-primary transition-colors text-gray-300" onClick={() => navigate('home')}>
             <Home className="w-6 h-6 hover:fill-current" />
          </div>

          <div className="flex flex-col items-center gap-1 cursor-pointer text-brand-primary" onClick={() => navigate('map')}>
             <div className="bg-brand-primary rounded-full p-1 -mt-6 shadow-lg shadow-blue-300 ring-4 ring-white">
                 <Compass className="text-white w-6 h-6" />
             </div>
          </div>

          <div className="relative cursor-pointer" onClick={() => navigate('chat')}>
             <MessageCircle className="text-gray-300 w-6 h-6 hover:text-brand-primary transition-colors" />
             <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></div>
          </div>
          <User className="text-gray-300 w-6 h-6 hover:text-brand-primary transition-colors cursor-pointer" onClick={() => navigate('profile')} />
      </div>

    </div>
  );
};

// Custom SVG Component for Map Marker with Avatar (Reused)
const MapMarker: React.FC<{ image: string; active?: boolean }> = ({ image, active }) => (
    <div className={`relative w-12 h-14 drop-shadow-xl transform hover:-translate-y-1 transition-transform duration-300 ${active ? 'scale-110 z-20' : 'z-10'}`}>
        <svg viewBox="0 0 100 120" className={`w-full h-full fill-current ${active ? 'text-brand-primary' : 'text-gray-400'}`}>
            <path d="M50,0 C22.4,0 0,22.4 0,50 C0,77.6 50,120 50,120 C50,120 100,77.6 100,50 C100,22.4 77.6,0 50,0 Z" />
            <circle cx="50" cy="50" r="45" fill="white" />
        </svg>
        <div className="absolute top-1.5 left-1.5 w-9 h-9 rounded-full overflow-hidden">
             <img src={image} alt="Marker" className="w-full h-full object-cover" />
        </div>
    </div>
);

// Custom SVG Component for Event Pin
const EventPin: React.FC = () => (
    <div className="relative w-10 h-10 drop-shadow-lg bg-white rounded-full flex items-center justify-center border-2 border-brand-primary transform hover:scale-110 transition-transform">
        <Star className="w-5 h-5 text-brand-primary fill-brand-primary" />
        <div className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-brand-primary rotate-45 -z-10"></div>
    </div>
);

export default CoffeeChatsScreen;
