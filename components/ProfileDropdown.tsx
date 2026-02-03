import { motion, AnimatePresence } from 'motion/react';
import { LogOut, CreditCard } from 'lucide-react';

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
            className="fixed bottom-20 left-4 w-72 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden z-50"
          >
            {/* User Info */}
            <div className="p-4 bg-gradient-to-r from-[#8B5CF6]/10 to-[#2DD4BF]/10">
              <div className="flex items-center gap-3 mb-3">
                <img 
                  src={user.picture} 
                  alt={user.name} 
                  className="w-12 h-12 rounded-full border-2 border-white"
                />
                <div className="flex-1">
                  <h3 className="text-sm">{user.name}</h3>
                  <p className="text-xs text-gray-600">{user.email}</p>
                </div>
              </div>
              
              {/* Credits */}
              <div className="flex items-center justify-between bg-white/50 rounded-xl px-3 py-2">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[#8B5CF6]" />
                  <span className="text-sm text-gray-700">Credits</span>
                </div>
                <span className="text-sm bg-[#8B5CF6] text-white px-3 py-1 rounded-full">
                  ⚡ {credits}
                </span>
              </div>
            </div>
            
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full p-4 flex items-center gap-3 text-red-600 hover:bg-red-50 transition-colors"
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