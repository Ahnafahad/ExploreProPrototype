
import React, { useState, useEffect } from 'react';
import { 
  Search, SlidersHorizontal, Bell, Globe, ChevronDown, MapPin, Star, Heart,
  Home, Compass, MessageCircle, User, UserCheck, Volume2, Coffee, Utensils
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { GUIDES } from '../utils/mockData';

interface HomeScreenProps {
  language: 'en' | 'zh';
  setLanguage: (lang: 'en' | 'zh') => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ language, setLanguage }) => {
  const { navigate, user } = useAppContext();
  const [activeCategory, setActiveCategory] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const content = {
    hello: language === 'en' ? "Good Morning" : "早上好",
    name: user.name || (language === 'en' ? 'Guest' : '客人'),
    date: new Date().toLocaleDateString(language === 'en' ? 'en-US' : 'zh-CN', { weekday: 'long', day: 'numeric', month: 'long' }),
    featured: language === 'en' ? "Featured" : "精选",
    guides: language === 'en' ? "Top Guides" : "热门向导",
  };

  const categories = [
    { icon: <UserCheck size={22} />, label: "Guides", route: 'guides' },
    { icon: <Volume2 size={22} />, label: "Audio", route: 'audio-tours' },
    { icon: <Coffee size={22} />, label: "Meetups", route: 'coffee-chats' },
    { icon: <Utensils size={22} />, label: "Dining", route: 'restaurants' }
  ];

  const handleNav = (screen: any) => navigate(screen);

  // Filter Logic
  const filteredGuides = GUIDES.filter(guide => 
    guide.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guide.title.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 5); // Limit to 5 for home screen

  const showFeatured = "Historic Oxford".toLowerCase().includes(searchQuery.toLowerCase()) || searchQuery === '';

  return (
    <div className="w-full h-full flex flex-col bg-ios-bg font-sans">
      
      {/* Sticky Blurred Header */}
      <div className="sticky top-0 z-50 bg-ios-bg/80 ios-blur border-b border-black/5 pt-12 pb-2 px-5">
        <div className="flex justify-between items-center mb-1">
           <span className="text-xs font-semibold text-ios-gray uppercase tracking-wide">{content.date}</span>
           <div 
             onClick={() => setLanguage(l => l === 'en' ? 'zh' : 'en')}
             className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center cursor-pointer active:bg-black/10"
           >
              <Globe size={16} className="text-black" />
           </div>
        </div>
        <div className="flex justify-between items-end">
          <h1 className="text-[34px] font-bold text-black tracking-tight leading-tight">
            {content.hello}
          </h1>
          <div className="w-9 h-9 rounded-full bg-gray-200 overflow-hidden mb-1">
             <img src="https://i.pravatar.cc/150?img=11" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24 scrollbar-hide pt-4">
        
        {/* Search Bar */}
        <div className="px-5 mb-6">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tours, guides, food..."
              className="w-full bg-ios-search text-black rounded-[10px] py-2.5 pl-10 pr-4 focus:outline-none placeholder:text-gray-500 text-[17px]"
            />
          </div>
        </div>

        {/* Categories (iOS Grid) - Hide if searching to reduce clutter, or keep? Keeping for access. */}
        <div className="px-5 mb-8">
            <div className="grid grid-cols-4 gap-4">
               {categories.map((cat, idx) => (
                 <div key={idx} className="flex flex-col items-center gap-2 cursor-pointer group" onClick={() => handleNav(cat.route)}>
                    <div className="w-[72px] h-[72px] bg-white rounded-[20px] shadow-ios flex items-center justify-center text-ios-blue group-active:scale-95 transition-transform">
                       {cat.icon}
                    </div>
                    <span className="text-[11px] font-medium text-black">{cat.label}</span>
                 </div>
               ))}
            </div>
        </div>

        {/* Featured Card (Big Hero) */}
        {showFeatured && (
          <div className="px-5 mb-8">
            <div className="flex justify-between items-end mb-3 px-1">
                <h2 className="text-[22px] font-bold text-black tracking-tight">{content.featured}</h2>
                <span className="text-ios-blue text-[15px] cursor-pointer active:opacity-50">See All</span>
            </div>
            
            {isLoading ? (
              <div className="w-full h-[320px] bg-gray-200 rounded-[24px] animate-pulse"></div>
            ) : (
              <div className="relative w-full h-[320px] rounded-[24px] overflow-hidden shadow-ios-lg cursor-pointer active:scale-[0.98] transition-transform" onClick={() => navigate('guides')}>
                  <img src="https://picsum.photos/seed/oxford_arch/600/800" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6">
                    <p className="text-white/70 text-xs font-bold uppercase mb-1">Editor's Choice</p>
                    <h3 className="text-white text-[28px] font-bold leading-tight mb-2">Historic Oxford</h3>
                    <p className="text-white/90 text-[15px] line-clamp-2 mb-3">Dive deep into the academic history of the world's most prestigious university.</p>
                    <div className="flex items-center gap-2">
                        <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold">2 hr</span>
                        <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold">£150</span>
                    </div>
                  </div>
              </div>
            )}
          </div>
        )}

        {/* Horizontal Scroll List */}
        <div className="mb-4">
           <div className="px-5 mb-3">
              <h2 className="text-[22px] font-bold text-black tracking-tight">{content.guides}</h2>
           </div>
           
           {filteredGuides.length > 0 ? (
             <div className="flex gap-4 overflow-x-auto px-5 pb-8 scrollbar-hide">
                {filteredGuides.map((guide) => (
                    <div key={guide.id} className="min-w-[160px] bg-white rounded-[20px] p-3 shadow-ios cursor-pointer active:scale-95 transition-transform" onClick={() => navigate('guide-details', guide)}>
                        <img src={guide.image} className="w-full h-[120px] object-cover rounded-[16px] mb-3" />
                        <h4 className="font-semibold text-[15px] text-black mb-0.5">{guide.name}</h4>
                        <p className="text-xs text-gray-500 mb-2 truncate">{guide.title}</p>
                        <div className="flex items-center text-xs font-medium text-orange-500">
                            <Star size={12} fill="currentColor" className="mr-1" />
                            {guide.rating} ({guide.reviews})
                        </div>
                    </div>
                ))}
             </div>
           ) : (
             <div className="px-5 text-gray-500 text-sm">No guides found matching "{searchQuery}"</div>
           )}
        </div>

      </div>

      {/* iOS Blur Tab Bar */}
      <div className="absolute bottom-0 left-0 w-full bg-white/80 ios-blur border-t border-black/5 pt-3 pb-6 px-6 flex justify-between items-center z-[100]">
          <div className="flex flex-col items-center gap-1 text-ios-blue cursor-pointer">
             <Home size={24} strokeWidth={2.5} />
             <span className="text-[10px] font-medium">Explore</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-gray-400 cursor-pointer hover:text-ios-blue transition-colors" onClick={() => navigate('guides')}>
             <Compass size={24} strokeWidth={2.5} />
             <span className="text-[10px] font-medium">Map</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-gray-400 cursor-pointer hover:text-ios-blue transition-colors">
             <MessageCircle size={24} strokeWidth={2.5} />
             <span className="text-[10px] font-medium">Chat</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-gray-400 cursor-pointer hover:text-ios-blue transition-colors">
             <User size={24} strokeWidth={2.5} />
             <span className="text-[10px] font-medium">Profile</span>
          </div>
      </div>

    </div>
  );
};

export default HomeScreen;
