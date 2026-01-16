
import React from 'react';
import { MapPin } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const LandingScreen: React.FC = () => {
  const { navigate } = useAppContext();

  return (
    <div className="relative w-full h-full flex flex-col justify-between bg-gradient-to-b from-sky-300 via-sky-100 to-white overflow-hidden font-sans">
      
      {/* Decorative Clouds */}
      <div className="absolute top-12 left-[-20px] opacity-40 animate-pulse" style={{ animationDuration: '8s' }}>
        <CloudIcon size={60} />
      </div>
      <div className="absolute top-24 right-[-10px] opacity-40 animate-pulse" style={{ animationDuration: '10s', animationDelay: '1s' }}>
        <CloudIcon size={40} />
      </div>
      <div className="absolute top-8 right-1/3 opacity-20">
        <CloudIcon size={30} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center pt-24 px-6 z-10">
        <h2 className="text-white text-xl font-light tracking-wide drop-shadow-sm">
          Welcome to
        </h2>
        <h1 className="text-white text-5xl font-bold mt-1 tracking-tight drop-shadow-md text-center">
          ExplorePro
        </h1>

        <div className="mt-8 w-full flex flex-col items-center">
          <h3 className="text-brand-dark text-3xl font-semibold text-center leading-tight max-w-[85%]">
            Your Uber for Tour Guides
          </h3>
          
          <p className="text-brand-muted text-center mt-4 px-4 leading-relaxed text-sm font-medium max-w-[300px]">
            Take tours around Oxford, Cambridge without any hassle.
          </p>

          <button 
            onClick={() => navigate('login')}
            className="mt-8 bg-brand-primary hover:bg-brand-primaryHover transition-transform hover:scale-105 active:scale-95 text-white text-sm font-bold py-4 px-10 rounded-full shadow-lg shadow-blue-300/50 tracking-wider uppercase cursor-pointer"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Bottom Illustration Area */}
      <div className="relative w-full mt-auto z-0">
        
        {/* Animated Floating Pins */}
        <div className="absolute bottom-28 left-8 z-20 animate-bounce" style={{ animationDuration: '3.5s' }}>
            <div className="bg-white p-2 rounded-full shadow-lg transform -rotate-6 ring-1 ring-black/5">
                 <MapPin className="text-brand-primary w-6 h-6 fill-current" />
            </div>
        </div>
        
        <div className="absolute bottom-48 right-12 z-20 animate-bounce" style={{ animationDuration: '4.2s', animationDelay: '1.2s' }}>
            <div className="bg-white p-2 rounded-full shadow-lg transform rotate-12 ring-1 ring-black/5">
                 <MapPin className="text-brand-primary w-6 h-6 fill-current" />
            </div>
        </div>
        
        <div className="absolute bottom-64 left-1/2 ml-[-12px] z-20 animate-bounce" style={{ animationDuration: '5s', animationDelay: '0.5s' }}>
             <div className="bg-white p-1.5 rounded-full shadow-lg ring-1 ring-black/5">
                 <MapPin className="text-sky-400 w-4 h-4 fill-current" />
            </div>
        </div>

        {/* Custom Vector Illustration */}
        <CityIllustration />
      </div>
    </div>
  );
};

// Simple SVG Cloud Component
const CloudIcon: React.FC<{ size: number; className?: string }> = ({ size, className }) => (
  <svg
    width={size}
    height={size * 0.6}
    viewBox="0 0 24 14"
    fill="currentColor"
    className={`text-white ${className}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.5 13C20.9853 13 23 10.9853 23 8.5C23 6.01472 20.9853 4 18.5 4C18.3686 4 18.239 4.00569 18.1116 4.01693C17.653 1.71615 15.626 0 13.25 0C10.4886 0 8.25 2.23858 8.25 5C8.25 5.09325 8.25265 5.18567 8.25788 5.27717C7.68412 4.78363 6.94086 4.5 6.125 4.5C3.77881 4.5 1.875 6.40381 1.875 8.75C1.875 8.84758 1.87829 8.94406 1.88476 9.03939C0.806282 9.51619 0.0625 10.5985 0.0625 11.8125C0.0625 13.5739 1.48858 15 3.25 15H18.5C20.9853 15 23 12.9853 23 10.5" fill="white"/>
  </svg>
);

// Custom Vector Illustration for Oxford/Cambridge Skyline
const CityIllustration: React.FC = () => (
  <svg 
    viewBox="0 0 500 220" 
    className="w-full h-auto block align-bottom" 
    preserveAspectRatio="xMidYBottom slice"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="grad-bldg-back" x1="0" y1="0" x2="0" y2="1">
         <stop offset="0%" stopColor="#BAE6FD" /> 
         <stop offset="100%" stopColor="#E0F2FE" />
      </linearGradient>
      <linearGradient id="grad-bldg-front" x1="0" y1="0" x2="0" y2="1">
         <stop offset="0%" stopColor="#7DD3FC" /> 
         <stop offset="100%" stopColor="#38BDF8" />
      </linearGradient>
       <linearGradient id="grad-ground" x1="0" y1="0" x2="0" y2="1">
         <stop offset="0%" stopColor="#7DD3FC" /> 
         <stop offset="100%" stopColor="#0EA5E9" />
      </linearGradient>
    </defs>

    {/* BACKGROUND LAYER: Distant Buildings */}
    <path fill="url(#grad-bldg-back)" d="M50,220 L50,120 L70,100 L90,120 L90,220 Z" /> 
    <path fill="url(#grad-bldg-back)" d="M150,220 L150,140 L170,120 L190,140 L190,220 Z" />
    <path fill="url(#grad-bldg-back)" d="M400,220 L400,110 L420,90 L440,110 L440,220 Z" />
    <path fill="#CBE6F9" d="M220,220 L220,160 Q260,130 300,160 L300,220 Z" /> {/* Arch */}

    {/* FOREGROUND LAYER: Main Architecture */}
    
    {/* Left Gothic Building (College style) */}
    <path fill="#7DD3FC" d="M0,220 L0,150 L20,150 L20,130 L40,110 L60,130 L60,150 L100,150 L100,220 Z" />
    <rect x="10" y="160" width="10" height="20" fill="white" opacity="0.4" rx="2" />
    <rect x="30" y="160" width="10" height="20" fill="white" opacity="0.4" rx="2" />
    
    {/* Center Dome (Radcliffe Camera style) */}
    <path fill="#38BDF8" d="M180,220 L180,140 L190,140 L190,120 Q235,80 280,120 L280,140 L290,140 L290,220 Z" />
    <rect x="210" y="150" width="50" height="70" fill="white" opacity="0.2" />
    <path d="M190,140 L280,140" stroke="white" strokeWidth="2" strokeOpacity="0.3" />

    {/* Right Spire (Chapel style) */}
    <path fill="#0EA5E9" d="M350,220 L350,100 L350,80 L360,70 L370,80 L370,100 L400,100 L400,220 Z" />
    <path fill="#0284C7" d="M420,220 L420,130 L440,110 L460,130 L460,220 Z" />
    <path fill="#0369A1" d="M460,220 L460,160 L500,160 L500,220 Z" />

    {/* PEOPLE SILHOUETTES */}
    {/* Person holding phone */}
    <g transform="translate(130, 180) scale(0.9)">
       <circle cx="10" cy="5" r="7" fill="#0369A1" />
       <path d="M10,14 Q25,14 25,40 L-5,40 Q-5,14 10,14" fill="#0369A1" />
       <rect x="18" y="20" width="5" height="9" fill="white" transform="rotate(-15 18 20)"/>
    </g>

    {/* Person taking photo */}
    <g transform="translate(320, 185) scale(0.85)">
        <circle cx="10" cy="5" r="7" fill="#0C4A6E" />
        <path d="M10,14 Q28,14 28,45 L-8,45 Q-8,14 10,14" fill="#0C4A6E" />
        <path d="M20,24 L30,22 L32,30 L22,33 Z" fill="white" />
    </g>
    
    {/* GROUND & DECORATION */}
    <path fill="url(#grad-ground)" d="M0,215 Q100,205 200,218 T400,215 L500,218 L500,220 L0,220 Z" opacity="0.9" />
    
    {/* Bushes/Trees */}
    <circle cx="20" cy="220" r="30" fill="#0EA5E9" opacity="0.8" />
    <circle cx="80" cy="220" r="20" fill="#38BDF8" opacity="0.8" />
    <path d="M450,220 Q480,180 500,210 L500,220 Z" fill="#0369A1" opacity="0.6" />

  </svg>
);

export default LandingScreen;
