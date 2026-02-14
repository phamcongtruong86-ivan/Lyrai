import { motion, AnimatePresence } from 'motion/react';
import { LogOut, CreditCard } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useTheme } from './ThemeProvider';

interface ProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    email: string;
    name: string;
    picture: string;
  };
  credits: number;
  onLogout: () => void;
}

export function ProfileDropdown({ isOpen, onClose, user, credits, onLogout }: ProfileDropdownProps) {
  const { isDark } = useTheme();
  
  const handleLogout = () => {
    localStorage.removeItem('lyraiUser');
    onLogout();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          />
          
          {/* Dropdown */}
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className={`fixed bottom-20 left-4 w-72 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden z-50 ${
              isDark
                ? 'bg-slate-900/90 border border-slate-700/50'
                : 'bg-white/90 border border-gray-200/50'
            }`}
          >
            {/* User Info */}
            <div className={`p-4 ${
              isDark
                ? 'bg-gradient-to-r from-[#FF6F4C]/10 to-[#2DD4BF]/10'
                : 'bg-gradient-to-r from-[#FF6F4C]/5 to-[#2DD4BF]/5'
            }`}>
              <div className="flex items-center gap-3 mb-3">
                <img 
                  src={user.picture} 
                  alt={user.name} 
                  className={`w-12 h-12 rounded-full border-2 ${isDark ? 'border-slate-700' : 'border-white'}`}
                />
                <div className="flex-1">
                  <h3 className={`text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>{user.name}</h3>
                  <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>{user.email}</p>
                </div>
              </div>
              
              {/* Credits */}
              <div className={`flex items-center justify-between rounded-xl px-3 py-2 ${
                isDark ? 'bg-slate-800/50' : 'bg-white/50'
              }`}>
                <div className="flex items-center gap-2">
                  <CreditCard className={`w-4 h-4 ${isDark ? 'text-[#FF6F4C]' : 'text-[#FF6F4C]'}`} />
                  <span className={`text-sm ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>Credits</span>
                </div>
                <span className="text-sm bg-[#FF6F4C] text-white px-3 py-1 rounded-full">
                  ⚡ {credits}
                </span>
              </div>
            </div>

            {/* Theme Toggle */}
            <div className={`px-4 py-3 flex items-center justify-between border-t ${
              isDark ? 'border-slate-700/50' : 'border-gray-100'
            }`}>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-lg" style={{ color: isDark ? '#FFE66D' : '#FF6F4C' }}>
                  {isDark ? 'dark_mode' : 'light_mode'}
                </span>
                <span className={`text-sm ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                  {isDark ? 'Chế độ tối' : 'Chế độ sáng'}
                </span>
              </div>
              <ThemeToggle size="sm" />
            </div>
            
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className={`w-full p-4 flex items-center gap-3 transition-colors border-t ${
                isDark
                  ? 'text-red-400 hover:bg-red-500/10 border-slate-700/50'
                  : 'text-red-600 hover:bg-red-50 border-gray-100'
              }`}
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm">Đăng xuất</span>
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
