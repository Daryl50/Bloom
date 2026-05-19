import React from 'react';
import { Shield, Bell, Users, LogOut, LogIn, Heart } from 'lucide-react';

export default function Header({ currentView, setView, currentUser, logout }) {
  const getNavLinkClass = (view) => {
    return `nav-link ${currentView === view ? 'active' : ''}`;
  };

  return (
    <header className="app-header">
      <div className="container header-container">
        <a href="#home" className="logo-link" onClick={() => setView('home')}>
          <div className="logo-icon">
            <Heart size={22} fill="white" />
          </div>
          <span className="logo-text">Bloom</span>
        </a>

        <nav className="nav-links">
          <a
            href="#learn"
            className={getNavLinkClass('learn')}
            onClick={() => setView('learn')}
          >
            Learn
          </a>
          <a
            href="#consultations"
            className={getNavLinkClass('consultations')}
            onClick={() => setView('consultations')}
          >
            Consult
          </a>
          <a
            href="#period-tracker"
            className={getNavLinkClass('period-tracker')}
            onClick={() => setView('period-tracker')}
          >
            Period Tracker
          </a>
          <a
            href="#community"
            className={getNavLinkClass('community')}
            onClick={() => setView('community')}
          >
            Community
          </a>
        </nav>

        <div className="header-actions">
          {currentUser ? (
            <>
              <button 
                className="icon-btn" 
                title="Community Groups"
                onClick={() => setView('community')}
              >
                <Users size={20} />
              </button>
              <button 
                className="icon-btn" 
                title="Notifications"
                onClick={() => alert('No new notifications')}
              >
                <Bell size={20} />
              </button>
              <div className="user-badge">
                <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--green-success)' }}></span>
                {currentUser.name}
              </div>
              <button
                className="icon-btn"
                title="Sign Out"
                onClick={logout}
              >
                <LogOut size={20} />
              </button>
            </>
          ) : (
            <button
              className="btn btn-secondary"
              style={{ padding: '8px 18px', fontSize: '0.9rem' }}
              onClick={() => setView('signin')}
            >
              <LogIn size={16} />
              Log In
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
