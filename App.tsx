import { useState, useEffect } from 'react';
import { HomeScreen } from './components/HomeScreen';
import { MapView } from './components/MapView';
import { DesktopMapView } from './components/DesktopMapView';
import { SavedCollections } from './components/SavedCollections';
import { BottomNavigation } from './components/BottomNavigation';
import { LoginScreen } from './components/LoginScreen';
import { LandingPage } from './components/LandingPage';
import { ProfileDropdown } from './components/ProfileDropdown';
import { Onboarding } from './components/Onboarding';
import { ThemeProvider } from './components/ThemeProvider';
import { Toaster } from 'sonner@2.0.3';

type Tab = 'home' | 'map' | 'saved';

interface User {
  email: string;
  name: string;
  picture: string;
}

export default function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('home'); // Start with home (Trợ lý) view
  const [savedLocations, setSavedLocations] = useState<any[]>([]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [credits, setCredits] = useState(50);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('lyraiUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(() => {
    return localStorage.getItem('lyraiOnboardingComplete') === 'true';
  });

  // Fix iOS zoom issue on input focus
  useEffect(() => {
    // Ensure viewport is set correctly to prevent zoom on input focus
    let viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
      viewport = document.createElement('meta');
      viewport.setAttribute('name', 'viewport');
      document.head.appendChild(viewport);
    }
    viewport.setAttribute(
      'content',
      'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover'
    );
  }, []);

  // Detect desktop/mobile
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleGetStarted = () => {
    setShowLanding(false);
  };

  const handleLogin = (userData: User) => {
    setUser(userData);
    setIsProfileOpen(false); // Ensure profile dropdown is closed after login
  };

  const handleLogout = () => {
    setUser(null);
    setShowLanding(true);
    localStorage.removeItem('lyraiUser');
    localStorage.removeItem('lyraiOnboardingComplete'); // Reset onboarding on logout
    setHasSeenOnboarding(false);
  };

  const handleSaveLocation = (location: any) => {
    setSavedLocations([...savedLocations, location]);
    console.log('Location saved:', location);
  };

  const handleSheetOpenChange = (isOpen: boolean) => {
    setIsSheetOpen(isOpen);
  };

  const handleOnboardingComplete = () => {
    setHasSeenOnboarding(true);
    localStorage.setItem('lyraiOnboardingComplete', 'true');
    // Award +3 credits for completing onboarding
    setCredits(credits + 3);
  };

  // Show landing page first
  if (showLanding && !user) {
    return <ThemeProvider><LandingPage onGetStarted={handleGetStarted} /></ThemeProvider>;
  }

  // Show login screen if not authenticated
  if (!user) {
    return <ThemeProvider><LoginScreen onLogin={handleLogin} /></ThemeProvider>;
  }

  // Show onboarding after login if user hasn't seen it yet
  if (user && !hasSeenOnboarding) {
    return <ThemeProvider><Onboarding onComplete={handleOnboardingComplete} /></ThemeProvider>;
  }

  // Determine if current tab needs centered content layout
  const needsCenteredLayout = activeTab === 'home' || activeTab === 'saved';

  // DESKTOP: Show special DesktopMapView (Navigation Rail + Floating Panel)
  if (isDesktop && activeTab === 'map') {
    return (
      <ThemeProvider>
        <div className="h-[100dvh] w-full flex bg-background overflow-hidden">
          {/* Unified Navigation */}
          <BottomNavigation 
            activeTab={activeTab}
            onTabChange={setActiveTab}
            userAvatar={user.picture}
            onOpenProfile={() => setIsProfileOpen(true)}
            credits={credits}
          />

          {/* Map Content */}
          <div className="flex-1 md:ml-[80px]">
            <DesktopMapView 
              userAvatar={user.picture}
              onNavigate={setActiveTab}
              currentTab={activeTab}
              credits={credits}
              setCredits={setCredits}
            />
          </div>
        </div>
        
        {/* Profile Dropdown */}
        <ProfileDropdown
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          user={user}
          credits={credits}
          onLogout={handleLogout}
        />

        {/* Toast Notifications */}
        <Toaster position="top-center" />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <div className="h-[100dvh] w-full flex bg-background overflow-hidden" style={{
        paddingTop: 'env(safe-area-inset-top)',
        paddingBottom: 'env(safe-area-inset-bottom)'
      }}>
        {/* DESKTOP: Left Sidebar + Mobile Bottom Nav */}
        <BottomNavigation 
          activeTab={activeTab}
          onTabChange={setActiveTab}
          userAvatar={user.picture}
          onOpenProfile={() => setIsProfileOpen(true)}
          credits={credits}
        />

        {/* MAIN CONTENT AREA */}
        <div className="flex-1 md:ml-[80px] flex flex-col relative overflow-hidden">
          {/* Map View: Full Width (No Container) */}
          {activeTab === 'map' && (
            <MapView credits={credits} setCredits={setCredits} />
          )}

          {/* Content Pages: Centered Container (Max 900px) */}
          {needsCenteredLayout && (
            <div className="flex-1 flex items-start justify-center overflow-hidden bg-background">
              {/* Centered Content Container */}
              <div className="relative z-10 w-full max-w-6xl h-full overflow-hidden">
                {activeTab === 'home' && (
                  <HomeScreen
                    onSaveLocation={handleSaveLocation}
                    onSheetOpenChange={handleSheetOpenChange}
                    userAvatar={user.picture}
                    onOpenProfile={() => setIsProfileOpen(true)}
                    credits={credits}
                  />
                )}
                {activeTab === 'saved' && <SavedCollections />}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Profile Dropdown */}
      <ProfileDropdown
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={user}
        credits={credits}
        onLogout={handleLogout}
      />

      {/* Toast Notifications */}
      <Toaster position="top-center" />
    </ThemeProvider>
  );
}