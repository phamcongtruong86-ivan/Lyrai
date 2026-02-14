import { useState } from 'react';
import { motion } from 'motion/react';
import { Sun, Moon } from 'lucide-react';
import logoImage from 'figma:asset/d10dac4378c8030eb921c82fde9252a169ca91a1.png';
import { useTheme } from './ThemeProvider';

interface LoginScreenProps {
  onLogin: (user: { email: string; name: string; picture: string }) => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const handleGoogleLogin = async () => {
    if (!acceptedTerms) return;
    
    setIsLoading(true);
    
    setTimeout(() => {
      const mockUser = {
        email: 'user@gmail.com',
        name: 'Người dùng',
        picture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user'
      };
      
      localStorage.setItem('lyraiUser', JSON.stringify(mockUser));
      onLogin(mockUser);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className={`h-screen w-full flex items-center justify-center relative overflow-hidden transition-colors duration-300 ${isDark ? 'bg-[#0F172A]' : 'bg-slate-50'}`}>
      {/* Theme Toggle - Top Right */}
      <div className="absolute top-5 right-5 z-50">
        <button
          onClick={toggleTheme}
          className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border backdrop-blur-sm group ${
            isDark 
              ? 'bg-white/10 border-white/20 hover:border-white/40 hover:bg-white/15' 
              : 'bg-slate-900/10 border-slate-300 hover:border-slate-400 hover:bg-slate-900/15'
          }`}
          aria-label={isDark ? 'Chuyển sang chế độ sáng' : 'Chuyển sang chế độ tối'}
        >
          <motion.div
            key={isDark ? 'dark' : 'light'}
            initial={{ scale: 0, rotate: -90, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            {isDark ? (
              <Moon className="w-[18px] h-[18px] text-[#00D2FF] group-hover:text-white transition-colors" />
            ) : (
              <Sun className="w-[18px] h-[18px] text-amber-500 group-hover:text-slate-900 transition-colors" />
            )}
          </motion.div>
        </button>
      </div>

      {/* Background Pattern */}
      <div className={`absolute inset-0 ${isDark ? 'opacity-30' : 'opacity-10'}`}>
        <svg className="w-full h-full">
          <pattern id="map-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="30" cy="30" r="2" fill="#7C3AED" opacity="0.3"/>
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#7C3AED" strokeWidth="0.5" opacity="0.2"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#map-pattern)" />
        </svg>
      </div>

      {/* Light Streaks */}
      <motion.div
        className={`absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-transparent to-transparent ${isDark ? 'via-[#7C3AED]' : 'via-[#7C3AED]/40'}`}
        animate={{ opacity: [0.2, 0.6, 0.2], x: [0, 50, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className={`absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-transparent to-transparent ${isDark ? 'via-cyan-400' : 'via-cyan-400/40'}`}
        animate={{ opacity: [0.3, 0.7, 0.3], x: [0, -30, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Ambient Glows */}
      <div className={`absolute top-20 left-1/4 w-96 h-96 rounded-full blur-[150px] animate-pulse ${isDark ? 'bg-[#7C3AED]/30' : 'bg-[#7C3AED]/10'}`} />
      <div className={`absolute bottom-20 right-1/4 w-96 h-96 rounded-full blur-[150px] animate-pulse ${isDark ? 'bg-cyan-500/20' : 'bg-cyan-500/8'}`} style={{ animationDelay: '1s' }} />

      {/* Central Glass Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        {/* Glow Behind Card */}
        <div className={`absolute inset-0 rounded-3xl blur-2xl ${isDark ? 'bg-gradient-to-r from-[#7C3AED]/40 to-cyan-500/40' : 'bg-gradient-to-r from-[#7C3AED]/15 to-cyan-500/15'}`} />
        
        {/* Glass Card */}
        <div className={`relative backdrop-blur-xl border rounded-3xl p-10 shadow-2xl transition-colors duration-300 ${
          isDark 
            ? 'bg-white/10 border-white/20' 
            : 'bg-white/80 border-slate-200'
        }`}>
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <motion.img
              src={logoImage}
              alt="Lyrai Logo"
              className="w-20 h-20"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {/* Headline */}
          <h1 className={`text-3xl font-bold text-center mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Welcome back to Lyrai.
          </h1>

          {/* Subtext */}
          <p className={`text-center mb-10 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
            Your AI food compass is ready.
          </p>

          {/* Login Buttons */}
          <div className="space-y-4">
            {/* Legal Checkbox */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative mt-0.5">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className={`w-5 h-5 rounded border-2 checked:bg-[#7C3AED] checked:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/50 transition-all cursor-pointer appearance-none ${
                    isDark ? 'border-white/30 bg-white/10' : 'border-slate-300 bg-white'
                  }`}
                />
                {acceptedTerms && (
                  <svg
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white pointer-events-none"
                    viewBox="0 0 12 12"
                    fill="none"
                  >
                    <path
                      d="M10 3L4.5 8.5L2 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
              <span className={`text-xs leading-relaxed ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                T&#244;i &#273;&#7891;ng &#253; v&#7899;i{' '}
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="text-[#7C3AED] hover:text-[#6D28D9] underline"
                >
                  &#272;i&#7873;u kho&#7843;n d&#7883;ch v&#7909;
                </a>
                {' '}v&#224;{' '}
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="text-[#7C3AED] hover:text-[#6D28D9] underline"
                >
                  Ch&#237;nh s&#225;ch quy&#7873;n ri&#234;ng t&#432;
                </a>
                .
              </span>
            </label>

            {/* Google Login */}
            <button
              onClick={handleGoogleLogin}
              disabled={isLoading || !acceptedTerms}
              className={`w-full border py-4 px-6 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 shadow-lg disabled:cursor-not-allowed group ${
                acceptedTerms && !isLoading
                  ? isDark
                    ? 'bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] hover:from-[#6D28D9] hover:to-[#5B21B6] border-white/20 text-white shadow-[#7C3AED]/50 hover:shadow-[#7C3AED]/70'
                    : 'bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] hover:from-[#6D28D9] hover:to-[#5B21B6] border-[#7C3AED]/30 text-white shadow-[#7C3AED]/30 hover:shadow-[#7C3AED]/50'
                  : isDark
                    ? 'bg-white/10 border-white/20 text-white opacity-50'
                    : 'bg-slate-100 border-slate-200 text-slate-400 opacity-50'
              }`}
            >
              {isLoading ? (
                <>
                  <motion.div
                    className={`w-5 h-5 border-2 border-t-[#7C3AED] rounded-full ${isDark ? 'border-gray-400' : 'border-slate-300'}`}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <span className="font-semibold">&#272;ang &#273;&#259;ng nh&#7853;p...</span>
                </>
              ) : (
                <>
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  <span className="font-semibold">Continue with Google</span>
                </>
              )}
            </button>
          </div>

          {/* Footer Text */}
          <p className={`text-center text-xs mt-8 ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>
            Mi&#7877;n ph&#237; m&#227;i m&#227;i &#8226; 3 l&#432;&#7907;t AI m&#7895;i ng&#224;y &#9889;
          </p>
        </div>
      </motion.div>

      {/* Bottom Decoration */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className={`absolute bottom-6 text-center text-xs ${isDark ? 'text-gray-500' : 'text-slate-400'}`}
      >
        Powered by AI &#10024;
      </motion.div>
    </div>
  );
}
