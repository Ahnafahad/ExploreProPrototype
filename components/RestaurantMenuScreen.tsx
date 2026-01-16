
import React, { useState } from 'react';
import { Search, Home, Compass, MessageCircle, User, Star, MapPin, ChevronDown, SlidersHorizontal, Globe, Tag, ArrowRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const RestaurantMenuScreen: React.FC = () => {
  const { navigate, goBack } = useAppContext();
  const [language, setLanguage] = useState<'en' | 'zh'>('en');
  const [searchQuery, setSearchQuery] = useState('');

  const menuItems = [
    {
      id: 1,
      name: "Rolled Sushi",
      nameZh: "寿司卷",
      desc: "Rolled sushi, or maki, is sushi where ingredients like fish, vegetables, and rice are wrapped in a sheet of seaweed (nori) and then sliced into bite-sized pieces.",
      descZh: "寿司卷，即卷寿司，是用海苔包裹鱼、蔬菜和米饭等食材，然后切成一口大小的寿司。",
      price: 7.99,
      rating: 4.8,
      image: "https://picsum.photos/seed/sushi_roll/300/200"
    },
    {
      id: 2,
      name: "Spicy Ramen",
      nameZh: "香辣拉面",
      desc: "Spicy ramen features a flavorful broth with a kick of heat, often made with soy sauce or miso and spiced up with chili paste or oil.",
      descZh: "香辣拉面特色在于风味浓郁的汤底，通常由酱油或味噌制成，并加入辣椒酱或辣椒油提味。",
      price: 8.99,
      rating: 4.9,
      image: "https://picsum.photos/seed/spicy_ramen/300/200"
    },
    {
      id: 3,
      name: "Japanese Fried Chicken",
      nameZh: "日式炸鸡",
      desc: "Popular dish featuring bite-sized pieces of chicken that are marinated in a mixture of soy sauce, sake, and garlic, then coated in flour or starch and deep-fried until crispy.",
      descZh: "这是一道受欢迎的菜肴，将一口大小的鸡肉块在酱油、清酒和大蒜的混合物中腌制，然后裹上面粉或淀粉，炸至酥脆。",
      price: 6.99,
      rating: 4.9,
      image: "https://picsum.photos/seed/karaage/300/200"
    }
  ];

  const filteredItems = menuItems.filter(item => {
    const name = language === 'en' ? item.name : item.nameZh;
    const desc = language === 'en' ? item.desc : item.descZh;
    const query = searchQuery.toLowerCase();
    return name.toLowerCase().includes(query) || desc.toLowerCase().includes(query);
  });

  return (
    <div className="relative w-full h-full bg-gray-50 flex flex-col font-sans overflow-hidden">
      
      {/* HEADER SECTION */}
      <div className="pt-12 pb-4 px-6 bg-white z-20 flex items-center justify-between">
        <div className="flex items-center gap-1 cursor-pointer" onClick={goBack}>
             <MapPin className="w-5 h-5 text-brand-primary fill-current" />
             <span className="text-gray-700 font-medium text-sm">123 Anywhere St., Any City</span>
             <ChevronDown className="w-4 h-4 text-gray-500" />
        </div>
        <img src="https://i.pravatar.cc/150?img=11" alt="User" className="w-8 h-8 rounded-full" />
      </div>

      {/* SCROLLABLE CONTENT */}
      <div className="flex-1 overflow-y-auto scrollbar-hide pb-32">
        
        {/* HERO BANNER */}
        <div className="mx-6 mb-6 relative rounded-3xl overflow-hidden h-48 shadow-lg">
             <img 
               src="https://picsum.photos/seed/ramen_bowl/400/300" 
               alt="Hero Food" 
               className="w-full h-full object-cover" 
             />
             <div className="absolute inset-0 bg-gradient-to-r from-sky-500/80 to-transparent flex flex-col justify-center px-6">
                 <h2 className="text-white text-3xl font-serif">Warm Bowls</h2>
                 <h2 className="text-white text-3xl font-bold mb-2">Bold Flavors!</h2>
                 <p className="text-white/90 text-xs mb-4 max-w-[180px]">Come in and discover your new favorite comfort food—made just for you!</p>
                 <button 
                    onClick={() => navigate('restaurant-booking')}
                    className="bg-brand-primary hover:bg-sky-400 text-white text-xs font-bold py-2 px-6 rounded-full w-fit shadow-md transition-colors"
                 >
                     BOOK NOW
                 </button>
             </div>
             
             {/* Side Icons */}
             <div className="absolute top-4 right-4 flex flex-col gap-2">
                 <div className="bg-white/90 p-1.5 rounded-full shadow-sm cursor-pointer hover:bg-white">
                     <MessageCircle className="w-4 h-4 text-brand-primary" />
                 </div>
                 <div className="bg-white/90 p-1.5 rounded-full shadow-sm cursor-pointer hover:bg-white">
                     <User className="w-4 h-4 text-brand-primary" />
                 </div>
             </div>
        </div>

        {/* OFFERS SECTION (NEW) */}
        <div className="px-6 mb-6">
             <div className="flex items-center justify-between mb-3">
                 <h3 className="text-brand-dark font-bold text-base flex items-center gap-2">
                     <Tag className="w-4 h-4 text-brand-primary" />
                     Available Offers
                 </h3>
                 <span className="text-xs text-brand-primary font-bold">See all</span>
             </div>
             <div className="flex gap-3 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-hide">
                 {/* Offer Card 1 */}
                 <div className="min-w-[200px] bg-gradient-to-br from-orange-400 to-pink-500 rounded-xl p-3 text-white shadow-md">
                     <div className="flex justify-between items-start">
                         <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] font-bold backdrop-blur-sm">PROMO</span>
                         <span className="text-xs font-bold opacity-80">50% OFF</span>
                     </div>
                     <p className="font-bold text-lg mt-2 leading-tight">Eat & Drink</p>
                     <p className="text-[10px] opacity-90 mt-1">Book between 2PM - 5PM</p>
                 </div>
                 {/* Offer Card 2 */}
                 <div className="min-w-[200px] bg-gradient-to-br from-blue-500 to-brand-primary rounded-xl p-3 text-white shadow-md">
                     <div className="flex justify-between items-start">
                         <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] font-bold backdrop-blur-sm">MEMBER</span>
                         <span className="text-xs font-bold opacity-80">FREE ITEM</span>
                     </div>
                     <p className="font-bold text-lg mt-2 leading-tight">Free Dessert</p>
                     <p className="text-[10px] opacity-90 mt-1">With any main course</p>
                 </div>
             </div>
        </div>

        {/* CONTROLS ROW */}
        <div className="px-6 flex items-center gap-3 mb-6">
             {/* Filter Button */}
             <div className="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center shadow-md shadow-blue-200 shrink-0">
                 <SlidersHorizontal className="w-5 h-5 text-white" />
             </div>
             
             {/* Search Input */}
             <div className="flex-1 relative">
                 <input 
                   type="text" 
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   placeholder="Search menu items..."
                   className="w-full bg-white text-gray-700 rounded-full py-2.5 pl-4 pr-10 shadow-sm border border-gray-100 focus:outline-none text-xs placeholder:text-gray-400"
                 />
                 <Search className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
             </div>

             {/* Translate Toggle */}
             <div 
               className="flex items-center gap-1 cursor-pointer hover:bg-gray-100 rounded-full py-1 px-2 transition-colors shrink-0"
               onClick={() => setLanguage(prev => prev === 'en' ? 'zh' : 'en')}
             >
                 <Globe className="w-4 h-4 text-brand-dark" />
                 <span className="text-brand-dark text-xs font-bold">
                    {language === 'en' ? 'Translate' : 'Original'}
                 </span>
             </div>
        </div>

        {/* MENU LIST (PREVIEW MODE) */}
        <div className="px-6 space-y-4">
             {filteredItems.length > 0 ? (
                 filteredItems.map(item => (
                     <div key={item.id} className="bg-white rounded-3xl p-3 shadow-sm border border-gray-100 flex gap-4">
                         {/* Image */}
                         <div className="relative shrink-0">
                             <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-2xl" />
                             <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-1.5 py-0.5 rounded-md flex items-center gap-0.5 shadow-sm">
                                 <Star className="w-2.5 h-2.5 text-brand-primary fill-brand-primary" />
                                 <span className="text-[10px] font-bold text-brand-dark">{item.rating}</span>
                             </div>
                         </div>
                         
                         {/* Content */}
                         <div className="flex-1 flex flex-col justify-between py-1">
                             <div>
                                 <h3 className="text-brand-dark font-bold text-sm leading-tight mb-1">
                                    {language === 'en' ? item.name : item.nameZh}
                                 </h3>
                                 <p className="text-gray-500 text-[10px] leading-relaxed line-clamp-2">
                                    {language === 'en' ? item.desc : item.descZh}
                                 </p>
                             </div>
                             
                             <div className="flex items-center justify-between mt-2">
                                 <span className="text-brand-primary font-bold text-base">$ {item.price}</span>
                                 <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-1 rounded-full">Menu Preview</span>
                             </div>
                         </div>
                     </div>
                 ))
             ) : (
                <div className="text-center text-gray-400 text-sm py-4">No items match your search.</div>
             )}
        </div>

      </div>

      {/* Floating Action Button (Book Table) */}
      <div className="absolute bottom-24 left-0 w-full px-6 flex justify-center z-40 pointer-events-none">
          <button 
            onClick={() => navigate('restaurant-booking')}
            className="w-full max-w-sm bg-brand-dark text-white font-bold py-4 rounded-xl shadow-xl hover:bg-opacity-90 transition-transform active:scale-95 uppercase tracking-wide text-sm flex items-center justify-center gap-2 pointer-events-auto"
          >
             Book a Table & Save
             <ArrowRight className="w-4 h-4" />
          </button>
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-6 left-6 right-6 bg-white rounded-full shadow-2xl shadow-blue-900/10 px-8 py-4 flex justify-between items-center z-50">
          <div className="cursor-pointer hover:text-brand-primary transition-colors text-gray-300" onClick={() => navigate('home')}>
             <Home className="w-6 h-6 hover:fill-current" />
          </div>
          
          <div className="flex flex-col items-center gap-1 cursor-pointer text-brand-primary">
             <div className="bg-brand-primary rounded-full p-1 -mt-6 shadow-lg shadow-blue-300 ring-4 ring-white">
                 <Compass className="text-white w-6 h-6" />
             </div>
          </div>
          
          <div className="relative cursor-pointer">
             <MessageCircle className="text-gray-300 w-6 h-6 hover:text-brand-primary transition-colors" />
             <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></div>
          </div>
          <User className="text-gray-300 w-6 h-6 hover:text-brand-primary transition-colors cursor-pointer" />
      </div>

    </div>
  );
};

export default RestaurantMenuScreen;
