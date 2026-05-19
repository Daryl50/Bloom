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

import './App.css';

function App() {
  const [currentView, setView] = useState('home');
  const [currentUser, setCurrentUser] = useState(null);

  // Load user session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('bloom_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
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
      />
      
      <main className="main-content">
        {renderView()}
      </main>

      <Footer setView={setView} />
    </div>
  );
}

export default App;
