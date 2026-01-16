
import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { validateEmail } from '../utils/helpers';

const LoginScreen: React.FC = () => {
  const { login } = useAppContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Simply login with provided email or a default one
    login(email || 'user@example.com');
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-gradient-to-b from-sky-300 via-sky-50 to-white overflow-hidden font-sans">
      
      {/* Decorative Clouds */}
      <div className="absolute top-12 left-[-20px] opacity-40 animate-pulse" style={{ animationDuration: '8s' }}>
        <CloudIcon size={60} />
      </div>
      <div className="absolute top-24 right-[-10px] opacity-40 animate-pulse" style={{ animationDuration: '10s', animationDelay: '1s' }}>
        <CloudIcon size={40} />
      </div>
      
      {/* Header Section */}
      <div className="pt-16 pb-24 px-6 flex flex-col items-center z-10">
        <h2 className="text-white text-xl font-light tracking-wide drop-shadow-sm">
          Welcome back to
        </h2>
        <h1 className="text-white text-5xl font-bold mt-1 tracking-tight drop-shadow-md text-center">
          ExplorePro
        </h1>
        <p className="text-brand-dark mt-3 font-medium text-lg">
          Sign in to continue your journey
        </p>
      </div>

      {/* Login Card */}
      <div className="bg-white rounded-[2rem] shadow-2xl mx-6 -mt-12 p-8 z-20 relative">
        <form className="flex flex-col gap-6" onSubmit={handleSignIn}>
          
          {error && (
            <div className="bg-red-50 text-red-500 text-sm p-3 rounded-lg text-center font-medium animate-pulse">
              {error}
            </div>
          )}

          {/* Email Input */}
          <div className="space-y-2">
            <label className="text-gray-700 text-base font-medium ml-1">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" strokeWidth={1.5} />
              </div>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@example.com"
                className="w-full bg-gray-100/80 text-gray-700 rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all placeholder:text-gray-400 font-normal"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label className="text-gray-700 text-base font-medium ml-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" strokeWidth={1.5} />
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Any password works"
                className="w-full bg-gray-100/80 text-gray-700 rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all placeholder:text-gray-400 font-normal"
              />
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between mt-1">
             <label className="flex items-center gap-2 cursor-pointer">
               <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-brand-primary focus:ring-brand-primary/30" />
               <span className="text-xs text-gray-400 font-medium">Remember me</span>
             </label>
             <a href="#" className="text-xs text-brand-primary font-medium hover:underline">
               Forgot password?
             </a>
          </div>

          {/* Sign In Button */}
          <button 
            type="submit"
            className="w-full bg-brand-primary hover:bg-brand-primaryHover text-white text-base font-bold py-4 rounded-full shadow-lg shadow-blue-300/50 tracking-wider uppercase transition-transform hover:scale-[1.02] active:scale-95 mt-4"
          >
            Sign In
          </button>
        </form>
      </div>

      {/* Footer & Illustration */}
      <div className="flex-1 flex flex-col justify-end mt-4 relative">
        <p className="text-center text-brand-dark text-sm font-medium mb-4 z-20">
          Don't have an account? <span className="text-brand-primary font-bold cursor-pointer hover:underline">Sign up for free</span>
        </p>
        
        {/* Custom Cafe Illustration */}
        <CafeCityIllustration />
      </div>

    </div>
  );
};

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

const CafeCityIllustration: React.FC = () => (
    <svg 
      viewBox="0 0 400 180" 
      className="w-full h-auto block align-bottom" 
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYBottom slice"
    >
        <defs>
             {/* Gradients */}
             <linearGradient id="sky-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0"/>
                <stop offset="100%" stopColor="#E0F2FE" stopOpacity="1"/>
             </linearGradient>
        </defs>

        {/* --- Background Cityscape --- */}
        <g transform="translate(40, 50)">
            <rect x="0" y="40" width="25" height="100" fill="#7DD3FC" />
            <path d="M-5,40 L12.5,10 L30,40 Z" fill="#7DD3FC" />
            <circle cx="12.5" cy="55" r="8" fill="white" fillOpacity="0.8" />
            <line x1="12.5" y1="55" x2="16" y2="52" stroke="#0284C7" strokeWidth="1" />
            <line x1="12.5" y1="55" x2="9" y2="58" stroke="#0284C7" strokeWidth="1" />
            <rect x="5" y="70" width="4" height="60" fill="white" fillOpacity="0.3" rx="1"/>
            <rect x="16" y="70" width="4" height="60" fill="white" fillOpacity="0.3" rx="1"/>
        </g>
        <g transform="translate(120, 60)">
             <path d="M10,60 L10,30 Q30,-10 50,30 L50,60 Z" fill="#38BDF8" opacity="0.9" />
             <rect x="0" y="60" width="60" height="70" fill="#7DD3FC" />
             <rect x="20" y="80" width="20" height="30" fill="white" fillOpacity="0.3" rx="2" />
             <path d="M30,30 L30,10" stroke="#0284C7" strokeWidth="2" />
        </g>
         <path d="M280,100 Q320,80 360,100" fill="none" stroke="#7DD3FC" strokeWidth="2" />
         <path d="M300,100 L300,140" stroke="#7DD3FC" strokeWidth="2" />
         <path d="M340,100 L340,140" stroke="#7DD3FC" strokeWidth="2" />

        {/* --- Foreground: Cafe Scene --- */}
        <ellipse cx="200" cy="180" rx="120" ry="30" fill="#FFE4C4" /> 
        <g transform="translate(60, 110)">
            <path d="M10,10 Q25,-5 40,10 C45,20 40,35 25,35 C10,35 5,20 10,10" fill="#034563" />
            <ellipse cx="28" cy="22" rx="10" ry="12" fill="#FFDBAC" />
            <path d="M5,40 Q28,35 50,40 L55,90 L0,90 Z" fill="#FF7F50" />
            <path d="M40,50 Q60,60 55,70" stroke="#FF7F50" strokeWidth="10" strokeLinecap="round" />
            <rect x="50" y="65" width="12" height="15" fill="white" rx="2" />
        </g>
        <g transform="translate(160, 105)">
            <path d="M10,10 Q25,-5 40,10 C45,25 35,35 25,35 C15,35 5,25 10,10" fill="#E5E7EB" />
            <ellipse cx="25" cy="22" rx="10" ry="12" fill="#FACC15" fillOpacity="0.4" />
            <path d="M0,40 Q25,35 50,40 L50,90 L0,90 Z" fill="#007AFF" />
             <path d="M10,50 Q-10,60 15,70" stroke="#007AFF" strokeWidth="10" strokeLinecap="round" />
             <rect x="10" y="65" width="12" height="15" fill="white" rx="2" />
        </g>
        <g transform="translate(250, 100)">
             <path d="M15,5 Q30,-10 45,5 C50,15 50,30 40,35 L35,40 L25,40 L20,35 C10,30 10,15 15,5" fill="#0F172A" />
             <circle cx="30" cy="22" r="11" fill="#DFA975" />
             <path d="M20,25 Q30,40 40,25" fill="none" stroke="#0F172A" strokeWidth="3" />
            <path d="M5,45 Q30,40 55,45 L60,100 L-5,100 Z" fill="white" />
            <path d="M45,50 Q65,60 70,80" stroke="white" strokeWidth="12" strokeLinecap="round" />
            <rect x="65" y="55" width="20" height="35" rx="3" fill="#0F172A" transform="rotate(-10 65 55)" />
            <rect x="67" y="58" width="16" height="28" rx="1" fill="#38BDF8" transform="rotate(-10 65 55)" />
            <path d="M72,66 L78,66 L75,74 Z" fill="white" transform="rotate(-10 65 55)" />
        </g>
        <path d="M210,50 Q240,40 280,60" fill="none" stroke="#0284C7" strokeWidth="1" strokeDasharray="3,3" />
        <circle cx="210" cy="50" r="6" fill="#0EA5E9" />
        <circle cx="210" cy="50" r="2" fill="white" />
        <path d="M290,40 Q310,35 320,55" fill="none" stroke="#0284C7" strokeWidth="1" strokeDasharray="3,3" />
        <path d="M320,55 L320,65" stroke="#0284C7" strokeWidth="1" strokeDasharray="3,3" />
        <circle cx="290" cy="40" r="6" fill="#0EA5E9" />
        <circle cx="290" cy="40" r="2" fill="white" />
        <circle cx="320" cy="35" r="8" fill="#0284C7" />
        <circle cx="320" cy="35" r="3" fill="white" />
        <path d="M0,180 L0,150 Q20,130 40,160 L50,180 Z" fill="#0F766E" />
        <path d="M350,180 L360,150 Q380,140 400,160 L400,180 Z" fill="#0F766E" />
        <circle cx="20" cy="170" r="15" fill="#14B8A6" opacity="0.8" />
        <circle cx="380" cy="170" r="15" fill="#14B8A6" opacity="0.8" />
    </svg>
);

export default LoginScreen;
