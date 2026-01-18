
import React, { useState } from 'react';
import { Search, Star, Utensils, ArrowLeft } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { RESTAURANTS } from '../utils/mockData';
import { TabBar } from './shared/TabBar';

const RestaurantsScreen: React.FC = () => {
  const { navigate, goBack } = useAppContext();
  const [activeTab, setActiveTab] = useState<'places' | 'dishes'>('places');
  const [searchQuery, setSearchQuery] = useState('');

  const dishes = [
    { id: 1, name: "Spicy Ramen", desc: "Hot broth with noodles", price: 12 },
    { id: 2, name: "Sushi Platter", desc: "Fresh fish assortment", price: 24 },
    { id: 3, name: "Fried Rice", desc: "Wok tossed rice", price: 8 },
  ];

  const filteredRestaurants = RESTAURANTS.filter(place => 
    place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    place.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredDishes = dishes.filter(dish =>
    dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dish.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full h-full bg-ios-bg font-sans flex flex-col">
       
       {/* Simple Header */}
       <div className="pt-12 pb-4 px-5 bg-ios-bg sticky top-0 z-10">
           <div className="flex items-center gap-3 mb-4">
               <button onClick={goBack} className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                   <ArrowLeft size={18} />
               </button>
               <h1 className="text-[28px] font-bold text-black">Dining</h1>
           </div>
           
           {/* Segmented Control */}
           <div className="bg-[#E3E3E8] p-[2px] rounded-[9px] flex mb-4">
               <button 
                 onClick={() => setActiveTab('places')}
                 className={`flex-1 py-1.5 text-[13px] font-semibold rounded-[7px] transition-all ${activeTab === 'places' ? 'bg-white shadow-sm text-black' : 'text-gray-500'}`}
               >
                   Restaurants
               </button>
               <button 
                 onClick={() => setActiveTab('dishes')}
                 className={`flex-1 py-1.5 text-[13px] font-semibold rounded-[7px] transition-all ${activeTab === 'dishes' ? 'bg-white shadow-sm text-black' : 'text-gray-500'}`}
               >
                   Dishes
               </button>
           </div>

           {/* Search Input */}
           <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={activeTab === 'places' ? "Search restaurants..." : "Search dishes..."}
                className="w-full bg-white rounded-xl py-2 pl-9 pr-4 text-sm focus:outline-none"
              />
           </div>
       </div>

       <div className="flex-1 overflow-y-auto px-5 pb-24 space-y-4">
           {activeTab === 'places' ? (
                filteredRestaurants.length > 0 ? (
                    filteredRestaurants.map((place) => (
                        <div 
                        key={place.id}
                        onClick={() => navigate('restaurant-menu', place)}
                        className="bg-white rounded-[20px] p-4 flex gap-4 shadow-sm active:scale-[0.98] transition-transform cursor-pointer"
                        >
                            <img src={place.image} className="w-24 h-24 rounded-[16px] object-cover bg-gray-100" />
                            <div className="flex-1 flex flex-col justify-center">
                                <h3 className="text-[17px] font-bold text-black mb-1">{place.name}</h3>
                                <div className="flex items-center gap-1 mb-2">
                                    <Star size={14} className="text-orange-400 fill-current" />
                                    <span className="text-[13px] font-semibold">{place.rating}</span>
                                    <span className="text-[13px] text-gray-400">({place.reviews})</span>
                                </div>
                                <div className="flex gap-2">
                                    {place.tags.map((tag, i) => (
                                        <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-500 text-[11px] font-medium rounded-md">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))
                ) : <div className="text-center text-gray-400 mt-4">No restaurants found.</div>
           ) : (
                filteredDishes.length > 0 ? (
                    filteredDishes.map(dish => (
                        <div key={dish.id} className="bg-white rounded-[20px] p-4 flex gap-4 shadow-sm">
                                <div className="w-20 h-20 bg-gray-100 rounded-[16px] flex items-center justify-center">
                                    <Utensils className="text-gray-400" />
                                </div>
                                <div className="flex-1 py-1">
                                    <h3 className="text-[15px] font-bold text-black mb-1">{dish.name}</h3>
                                    <p className="text-[12px] text-gray-500 mb-2">{dish.desc}</p>
                                    <p className="text-[13px] font-bold text-brand-primary">£{dish.price}</p>
                                </div>
                        </div>
                    ))
                ) : <div className="text-center text-gray-400 mt-4">No dishes found.</div>
           )}
       </div>

       {/* Tab Bar */}
       <TabBar activeTab="map" onNavigate={navigate} />

    </div>
  );
};

export default RestaurantsScreen;
