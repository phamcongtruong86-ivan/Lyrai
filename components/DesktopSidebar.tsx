import logoImage from 'figma:asset/d10dac4378c8030eb921c82fde9252a169ca91a1.png';

interface DesktopSidebarProps {
  activeTab: 'home' | 'map' | 'saved';
  onTabChange: (tab: 'home' | 'map' | 'saved') => void;
  userAvatar: string;
  onOpenProfile: () => void;
  credits: number;
}

export function DesktopSidebar({ activeTab, onTabChange, userAvatar, onOpenProfile }: DesktopSidebarProps) {
  const navItems = [
    { id: 'map' as const, label: 'Bản đồ', icon: 'map' },
    { id: 'saved' as const, label: 'Đã lưu', icon: 'bookmark' },
    { id: 'home' as const, label: 'Trợ lý', icon: 'chat_bubble' },
  ];

  return (
    <aside className="hidden md:flex w-[80px] bg-slate-900/60 backdrop-blur-xl border-r border-slate-800/50 flex-col items-center py-6 z-50 shrink-0 h-screen">
      {/* Logo Section */}
      <div className="mb-10 w-10 h-10 flex items-center justify-center bg-emerald-950/30 rounded-lg">
        <img 
          alt="Lyrai Logo" 
          className="w-6 h-6 object-contain" 
          src={logoImage}
        />
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 flex flex-col gap-8 w-full items-center">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`group flex flex-col items-center gap-1 w-full ${
              activeTab === item.id ? '' : 'hover:opacity-80 transition-opacity'
            }`}
          >
            <div className={`p-3 rounded-xl transition-colors ${
              activeTab === item.id
                ? 'bg-primary/20 text-primary'
                : 'text-slate-500 hover:bg-slate-800/50'
            }`}>
              <span className="material-symbols-outlined text-2xl">{item.icon}</span>
            </div>
            <span className={`text-[10px] font-semibold ${
              activeTab === item.id ? 'text-slate-300' : 'text-slate-500'
            }`}>
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      {/* User Avatar */}
      <div className="mt-auto">
        <button 
          onClick={onOpenProfile}
          className="w-10 h-10 rounded-full bg-slate-800 p-[2px] border border-slate-700 overflow-hidden hover:border-primary transition-colors"
        >
          <img 
            alt="User Profile" 
            className="w-full h-full rounded-full object-cover" 
            src={userAvatar}
          />
        </button>
      </div>
    </aside>
  );
}