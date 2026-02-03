import { motion } from 'motion/react';

interface BottomNavProps {
  activeTab: 'home' | 'map' | 'saved';
  onTabChange: (tab: 'home' | 'map' | 'saved') => void;
  isVisible?: boolean;
}

export function BottomNav({ activeTab, onTabChange, isVisible = true }: BottomNavProps) {
  const navItems = [
    { id: 'map' as const, label: 'Bản đồ', icon: 'map' },
    { id: 'saved' as const, label: 'Đã lưu', icon: 'bookmark' },
    { id: 'home' as const, label: 'Trợ lý', icon: 'chat_bubble' },
  ];

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : 120 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className="md:hidden fixed bottom-0 left-0 right-0 h-[80px] bg-slate-900/90 backdrop-blur-2xl border-t border-slate-800/50 flex items-center justify-around px-4 z-50 bottom-nav-shadow"
    >
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onTabChange(item.id)}
          className={`flex flex-col items-center gap-1 ${
            activeTab === item.id ? 'text-primary' : 'text-slate-500'
          }`}
        >
          <div className="relative">
            <span className="material-symbols-outlined text-2xl">{item.icon}</span>
            {activeTab === item.id && (
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></div>
            )}
          </div>
          <span className="text-[10px] font-semibold">{item.label}</span>
        </button>
      ))}
      
      <button className="w-8 h-8 rounded-full overflow-hidden border border-slate-700">
        <img 
          alt="User" 
          className="w-full h-full object-cover" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJIyE4PMH73ylWhr2273h9wVt0mFObPBpyVXln7wo1ScMataNrcc0WS45KtzKaBzlLHK_KpU3xxcVn-Uzm4uwsvZcwqs1MirQAeyvHmkEECha89vodsvnr4fhsL1VfNIzsK95lCWlXPqa6HEPN8xg66BuESs-9h2jWJsJBe65U0Drm718zFVQ5Vo8wNP27aaOuNOZ3p1vNDceNEU1apnZLMRsPZ2bYFmgFCyVYCMtrLJR18Q2unCYjpJQigmZ-a2zsq6CsRRQUw8I"
        />
      </button>
    </motion.nav>
  );
}