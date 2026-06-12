import React from 'react';
import { Shield, Bell, Users, LogOut, LogIn, Heart, RefreshCw } from 'lucide-react';

export default function Header({ currentView, setView, currentUser, logout, toggleRole }) {
  const getNavLinkClass = (view) => {
    return `nav-link ${currentView === view ? 'active' : ''}`;
  };

  const isProvider = currentUser && currentUser.role === 'provider';

  return (
    <header className="app-header">
      <div className="container header-container">
        <a href={isProvider ? "#provider-dashboard" : "#home"} className="logo-link" onClick={() => setView(isProvider ? 'provider-dashboard' : 'home')}>
          <div className="logo-icon">
            <Heart size={22} fill="white" />
          </div>
          <span className="logo-text">Bloom {isProvider && <span style={{ fontSize: '0.75rem', verticalAlign: 'middle', background: 'rgba(255,255,255,0.2)', padding: '2px 6px', borderRadius: '4px', marginLeft: '6px' }}>Pro</span>}</span>
        </a>

        <nav className="nav-links">
          {isProvider ? (
            <>
              <a
                href="#provider-dashboard"
                className={getNavLinkClass('provider-dashboard')}
                onClick={() => setView('provider-dashboard')}
              >
                Dashboard
              </a>
              <a
                href="#provider-inbox"
                className={getNavLinkClass('provider-inbox')}
                onClick={() => setView('provider-inbox')}
              >
                Case Inbox
              </a>
              <a
                href="#provider-schedule"
                className={getNavLinkClass('provider-schedule')}
                onClick={() => setView('provider-schedule')}
              >
                Schedule
              </a>
              <a
                href="#provider-analytics"
                className={getNavLinkClass('provider-analytics')}
                onClick={() => setView('provider-analytics')}
              >
                Analytics
              </a>
              <a
                href="#provider-profile"
                className={getNavLinkClass('provider-profile')}
                onClick={() => setView('provider-profile')}
              >
                Profile
              </a>
            </>
          ) : (
            <>
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
            </>
          )}
        </nav>

        <div className="header-actions">
          {currentUser ? (
            <>
              {/* Quick Portal Switcher Button */}
              <button
                className="btn btn-secondary"
                style={{ padding: '6px 12px', fontSize: '0.8rem', gap: '4px', borderColor: 'var(--secondary-purple)', color: 'var(--secondary-purple)' }}
                onClick={toggleRole}
                title={`Switch to ${isProvider ? 'Student' : 'Health Professional'} Portal`}
              >
                <RefreshCw size={14} />
                <span>Switch to {isProvider ? 'Student' : 'Pro'}</span>
              </button>

              {!isProvider && (
                <button 
                  className="icon-btn" 
                  title="Community Groups"
                  onClick={() => setView('community')}
                >
                  <Users size={20} />
                </button>
              )}
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
