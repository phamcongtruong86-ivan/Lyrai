import { useState } from 'react';
import { motion } from 'motion/react';
import logoImage from 'figma:asset/d10dac4378c8030eb921c82fde9252a169ca91a1.png';

interface LoginScreenProps {
  onLogin: (user: { email: string; name: string; picture: string }) => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

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
    <div className="h-screen w-full flex items-center justify-center bg-[#0F172A] relative overflow-hidden">
      {/* Blurred Map Pattern Background */}
      <div className="absolute inset-0 opacity-30">
        <svg className="w-full h-full">
          <pattern id="map-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="30" cy="30" r="2" fill="#7C3AED" opacity="0.3"/>
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#7C3AED" strokeWidth="0.5" opacity="0.2"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#map-pattern)" />
        </svg>
      </div>

      {/* Neon Violet Light Streaks */}
      <motion.div
        className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-transparent via-[#7C3AED] to-transparent"
        animate={{
          opacity: [0.2, 0.6, 0.2],
          x: [0, 50, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
        animate={{
          opacity: [0.3, 0.7, 0.3],
          x: [0, -30, 0]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      {/* Ambient Glows */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#7C3AED]/30 rounded-full blur-[150px] animate-pulse" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Central Glass Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        {/* Glow Behind Card */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#7C3AED]/40 to-cyan-500/40 rounded-3xl blur-2xl" />
        
        {/* Glass Card */}
        <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-10 shadow-2xl">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <motion.img
              src={logoImage}
              alt="Lyrai Logo"
              className="w-20 h-20"
              animate={{
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>

          {/* Headline */}
          <h1 className="text-3xl font-bold text-center text-white mb-3">
            Welcome back to Lyrai.
          </h1>

          {/* Subtext */}
          <p className="text-center text-gray-400 mb-10">
            Your AI food compass is ready.
          </p>

          {/* Login Buttons */}
          <div className="space-y-4">
            {/* Legal Checkbox - Required by Vietnamese Law (Nghị định 13) */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative mt-0.5">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="w-5 h-5 rounded border-2 border-white/30 bg-white/10 checked:bg-[#7C3AED] checked:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/50 transition-all cursor-pointer appearance-none flex items-center justify-center"
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
              <span className="text-xs text-gray-300 leading-relaxed">
                Tôi đồng ý với{' '}
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="text-[#7C3AED] hover:text-[#6D28D9] underline"
                >
                  Điều khoản dịch vụ
                </a>
                {' '}và{' '}
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="text-[#7C3AED] hover:text-[#6D28D9] underline"
                >
                  Chính sách quyền riêng tư
                </a>
                .
              </span>
            </label>

            {/* Google Login */}
            <button
              onClick={handleGoogleLogin}
              disabled={isLoading || !acceptedTerms}
              className={`w-full backdrop-blur-xl border border-white/20 text-white py-4 px-6 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 shadow-lg disabled:cursor-not-allowed group ${
                acceptedTerms && !isLoading
                  ? 'bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] hover:from-[#6D28D9] hover:to-[#5B21B6] shadow-[#7C3AED]/50 hover:shadow-[#7C3AED]/70'
                  : 'bg-white/10 opacity-50'
              }`}
            >
              {isLoading ? (
                <>
                  <motion.div
                    className="w-5 h-5 border-2 border-gray-400 border-t-[#7C3AED] rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <span className="font-semibold">Đang đăng nhập...</span>
                </>
              ) : (
                <>
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span className="font-semibold">Continue with Google</span>
                </>
              )}
            </button>
          </div>

          {/* Footer Text */}
          <p className="text-center text-xs text-gray-500 mt-8">
            Miễn phí mãi mãi • 3 lượt AI mỗi ngày ⚡
          </p>
        </div>
      </motion.div>

      {/* Bottom Decoration */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-6 text-center text-gray-500 text-xs"
      >
        Powered by AI ✨
      </motion.div>
    </div>
  );
}