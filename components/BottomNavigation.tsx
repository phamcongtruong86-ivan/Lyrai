interface BottomNavigationProps {
  activeTab: 'home' | 'map' | 'saved';
  onTabChange: (tab: 'home' | 'map' | 'saved') => void;
  userAvatar?: string;
  onOpenProfile?: () => void;
  credits?: number;
}

interface NavItem {
  id: 'home' | 'map' | 'saved';
  icon: string;
  label: string;
  badge?: boolean;
}

export function BottomNavigation({ activeTab, onTabChange, userAvatar, onOpenProfile, credits }: BottomNavigationProps) {
  const navItems: NavItem[] = [
    { id: 'home', icon: 'chat_bubble', label: 'Trợ lý', badge: true },
    { id: 'map', icon: 'map', label: 'Bản đồ' },
    { id: 'saved', icon: 'bookmark', label: 'Đã lưu' }
  ];

  return (
    <>
      {/* Mobile Bottom Navigation - Fixed */}
      <nav 
        className="md:hidden fixed bottom-0 left-0 right-0 h-[80px] z-50"
        style={{
          background: 'rgba(15, 30, 50, 0.85)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderTop: '1px solid rgba(148, 163, 184, 0.1)',
          boxShadow: '0 -10px 25px -5px rgba(0, 0, 0, 0.5)'
        }}
      >
        <div className="h-full flex items-center justify-around px-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`
                flex flex-col items-center gap-1 transition-colors relative
                ${activeTab === item.id ? 'text-primary' : 'text-slate-500'}
              `}
            >
              <div className="relative">
                <span className="material-symbols-outlined text-2xl">
                  {item.icon}
                </span>
                {/* Active indicator dot */}
                {activeTab === item.id && (
                  <div 
                    className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-primary"
                    style={{
                      boxShadow: '0 0 8px rgba(139, 92, 246, 0.6)'
                    }}
                  />
                )}
                {/* "Trợ lý" luôn có dot, các icon khác KHÔNG có dot khi inactive */}
                {item.id === 'home' && activeTab !== 'home' && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
                )}
              </div>
              <span className="text-[10px] font-semibold">
                {item.label}
              </span>
            </button>
          ))}

          {/* Profile Avatar */}
          <button
            onClick={onOpenProfile}
            className="w-8 h-8 rounded-full overflow-hidden border border-slate-700 shrink-0"
          >
            <img 
              alt="User" 
              className="w-full h-full object-cover" 
              src={userAvatar || 'https://via.placeholder.com/32'}
            />
          </button>
        </div>
      </nav>

      {/* Desktop Sidebar - Fixed */}
      <aside 
        className="hidden md:flex w-[80px] fixed left-0 top-0 bottom-0 z-50 flex-col items-center py-6"
        style={{
          background: 'rgba(15, 30, 50, 0.6)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderRight: '1px solid rgba(148, 163, 184, 0.1)'
        }}
      >
        {/* Logo */}
        <div className="mb-10 w-10 h-10 flex items-center justify-center">
          <img 
            alt="Lyrai Logo" 
            className="w-6 h-6 object-contain" 
            src="https://i.ibb.co/7dp2jNqC/logo.png"
          />
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 flex flex-col gap-8 w-full items-center">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className="group flex flex-col items-center gap-1 w-full hover:opacity-80 transition-opacity relative"
            >
              <div 
                className={`
                  p-3 rounded-xl transition-colors relative
                  ${activeTab === item.id
                    ? 'text-primary bg-primary/10' 
                    : 'text-slate-500'
                  }
                `}
              >
                <span className="material-symbols-outlined text-2xl">
                  {item.icon}
                </span>
                {/* Active indicator dot - Hiện khi icon đang active (có glow) */}
                {activeTab === item.id && (
                  <div 
                    className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full"
                    style={{ boxShadow: '0 0 8px rgba(139, 92, 246, 0.6)' }}
                  />
                )}
                {/* "Trợ lý" luôn có dot, các icon khác KHÔNG có dot khi inactive */}
                {item.id === 'home' && activeTab !== 'home' && (
                  <div className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
                )}
              </div>
              <span 
                className={`
                  text-[10px] font-semibold
                  ${activeTab === item.id ? 'text-primary' : 'text-slate-500'}
                `}
              >
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        {/* Credits Display */}
        {credits !== undefined && (
          <div className="mb-4 px-2 py-1.5 bg-slate-900/60 border border-slate-700/50 rounded-lg">
            <div className="flex items-center gap-1">
              <span className="text-amber-400 text-xs">⚡</span>
              <span className="text-white text-xs font-bold">{credits}</span>
            </div>
          </div>
        )}

        {/* Profile Avatar */}
        <div className="mt-auto">
          <button
            onClick={onOpenProfile}
            className="w-10 h-10 rounded-full bg-slate-800 p-[2px] border border-slate-700 overflow-hidden hover:border-primary/50 transition-colors"
          >
            <img 
              alt="User Profile" 
              className="w-full h-full rounded-full object-cover" 
              src={userAvatar || 'https://via.placeholder.com/40'}
            />
          </button>
        </div>
      </aside>
    </>
  );
}