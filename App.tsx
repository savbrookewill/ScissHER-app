
import React, { useState } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import DiscoveryView from './components/DiscoveryView';
import SparksView from './components/SparksView';
import CalendarView from './components/CalendarView';
import EventsView from './components/EventsView';
import ProfileView from './components/ProfileView';
import VaultView from './components/VaultView';
import LiveView from './components/LiveView';
import AgeVerification from './components/AgeVerification';
import IdentityVerification from './components/IdentityVerification';
import AuthView from './components/AuthView';
import PhotoOnboarding from './components/PhotoOnboarding';
import DailyHypeModal from './components/DailyHypeModal';
import PremiumUpgradeModal from './components/PremiumUpgradeModal';
import { AppView, User, AuthState } from './types';
import { MOCK_USERS } from './constants';

const App: React.FC = () => {
  const [authState, setAuthState] = useState<AuthState>('landing');
  const [currentView, setCurrentView] = useState<AppView>('discovery');
  const [currentUser, setCurrentUser] = useState<User | null>(MOCK_USERS[0]);
  const [showHype, setShowHype] = useState<boolean>(false);
  const [showPremium, setShowPremium] = useState<boolean>(false);
  const [likedUsers, setLikedUsers] = useState<string[]>([]);
  const [privateAccessList, setPrivateAccessList] = useState<string[]>([]);

  const handleAuthorized = () => {
    setAuthState('authorized');
    setShowHype(true);
  };

  const handleVerifySuccess = () => {
    setAuthState('identity');
  };

  const handleIdentityComplete = () => {
    setAuthState('onboarding');
  };

  const handleOnboardingComplete = (publicPhotos: string[], privatePhotos: string[]) => {
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        mainPhoto: publicPhotos[0] || currentUser.mainPhoto,
        publicPhotos: publicPhotos.slice(1),
        privatePhotos: privatePhotos,
        isVerified: true
      });
    }
    handleAuthorized();
  };

  if (authState === 'landing') {
    return <AuthView onLogin={handleAuthorized} onCreateAccount={() => setAuthState('verifying')} />;
  }

  if (authState === 'verifying') {
    return <AgeVerification onVerify={handleVerifySuccess} />;
  }

  if (authState === 'identity') {
    return <IdentityVerification onComplete={handleIdentityComplete} />;
  }

  if (authState === 'onboarding') {
    return <PhotoOnboarding onComplete={handleOnboardingComplete} />;
  }

  const handleUpdateTickets = (count: number) => {
    if (currentUser) {
      setCurrentUser({ ...currentUser, speedDatingTickets: count });
    }
  };

  const renderView = () => {
    switch (currentView) {
      case 'discovery':
        return <DiscoveryView onLike={(id) => setLikedUsers(prev => [...prev, id])} />;
      case 'spark':
        return <SparksView likedUsers={likedUsers} onUpgrade={() => setShowPremium(true)} />;
      case 'calendar':
        return <CalendarView />;
      case 'events':
        return <EventsView user={currentUser} onUpdateTickets={handleUpdateTickets} />;
      case 'live':
        return <LiveView />;
      case 'profile':
        return <ProfileView user={currentUser} onReset={() => setAuthState('landing')} />;
      case 'vault':
        return <VaultView user={currentUser} onGrantAccess={(id) => setPrivateAccessList(prev => [...prev, id])} />;
      default:
        return <DiscoveryView onLike={(id) => setLikedUsers(prev => [...prev, id])} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-emerald-500/30 overflow-x-hidden pb-40">
      <Header />
      <main className="max-w-md mx-auto px-4 pt-4">
        {renderView()}
      </main>
      <Navigation currentView={currentView} setView={(v) => setCurrentView(v as AppView)} />
      {showHype && <DailyHypeModal onClose={() => setShowHype(false)} />}
      {showPremium && <PremiumUpgradeModal onClose={() => setShowPremium(false)} />}
    </div>
  );
};

export default App;
