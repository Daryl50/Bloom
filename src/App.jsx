import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

// Views
import Home from './views/Home';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import Learn from './views/Learn';
import PeriodTracker from './views/PeriodTracker';
import Reminders from './views/Reminders';
import Community from './views/Community';
import Consultations from './views/Consultations';

// Provider Views
import ProviderDashboard from './views/provider/ProviderDashboard';
import ProviderInbox from './views/provider/ProviderInbox';
import ProviderSchedule from './views/provider/ProviderSchedule';
import ProviderAnalytics from './views/provider/ProviderAnalytics';
import ProviderProfile from './views/provider/ProviderProfile';

import './App.css';

function App() {
  const [currentView, setView] = useState('home');
  const [currentUser, setCurrentUser] = useState(null);

  // Load user session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('bloom_user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setCurrentUser(parsedUser);
      if (parsedUser.role === 'provider') {
        setView('provider-dashboard');
      }
    }
  }, []);

  const login = (user) => {
    setCurrentUser(user);
    localStorage.setItem('bloom_user', JSON.stringify(user));
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('bloom_user');
    setView('home');
  };

  const toggleRole = () => {
    if (currentUser) {
      const newRole = currentUser.role === 'provider' ? 'student' : 'provider';
      const updatedUser = {
        ...currentUser,
        role: newRole,
        doctorId: newRole === 'provider' ? (currentUser.doctorId || 'dr-abena-mensah') : null
      };
      setCurrentUser(updatedUser);
      localStorage.setItem('bloom_user', JSON.stringify(updatedUser));
      setView(newRole === 'provider' ? 'provider-dashboard' : 'home');
    }
  };

  // Render view dispatcher
  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <Home setView={setView} currentUser={currentUser} />;
      case 'signin':
        return <SignIn setView={setView} login={login} />;
      case 'signup':
        return <SignUp setView={setView} login={login} />;
      case 'learn':
        return <Learn />;
      case 'period-tracker':
        return <PeriodTracker setView={setView} />;
      case 'reminders':
        return <Reminders setView={setView} />;
      case 'community':
        return <Community />;
      case 'consultations':
        return <Consultations currentUser={currentUser} setView={setView} />;
      
      // Provider routes
      case 'provider-dashboard':
        return <ProviderDashboard currentUser={currentUser} setView={setView} />;
      case 'provider-inbox':
        return <ProviderInbox currentUser={currentUser} setView={setView} />;
      case 'provider-schedule':
        return <ProviderSchedule currentUser={currentUser} setView={setView} />;
      case 'provider-analytics':
        return <ProviderAnalytics currentUser={currentUser} setView={setView} />;
      case 'provider-profile':
        return <ProviderProfile currentUser={currentUser} setView={setView} />;
        
      default:
        return <Home setView={setView} currentUser={currentUser} />;
    }
  };

  return (
    <div className="app-layout">
      <Header
        currentView={currentView}
        setView={setView}
        currentUser={currentUser}
        logout={logout}
        toggleRole={toggleRole}
      />
      
      <main className="main-content">
        {renderView()}
      </main>

      <Footer setView={setView} />
    </div>
  );
}

export default App;
