import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';

export default function SignIn({ setView, login }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    
    // Simulate login
    // Extract nickname from email to make it friendly
    const nickname = email.split('@')[0];
    const formattedNickname = nickname.charAt(0).toUpperCase() + nickname.slice(1) + ' K.';
    
    const user = {
      email,
      name: formattedNickname,
      registered: true
    };
    
    login(user);
    setView('home');
  };

  return (
    <div className="auth-wrapper animate-fade-in">
      <div className="auth-header">
        <h1 className="auth-logo">Bloom</h1>
        <h2 style={{ fontSize: '1.75rem', marginBottom: '4px' }}>Welcome Back!</h2>
        <p className="auth-subtitle">Log in to manage your health securely</p>
      </div>

      <div className="auth-card">
        {error && (
          <div style={{ color: 'var(--danger-red-text)', background: 'var(--danger-red-bg)', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.85rem', fontWeight: 500, border: '1px solid rgba(239, 68, 68, 0.2)' }}>
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">
              <Mail size={16} style={{ color: 'var(--primary-pink)' }} />
              Email
            </label>
            <input
              type="email"
              className="form-control"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <Lock size={16} style={{ color: 'var(--primary-pink)' }} />
              Password
            </label>
            <div className="password-input-container">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px', background: 'var(--primary-pink)' }}>
            Sign In
          </button>
        </form>
      </div>

      <div className="auth-footer">
        Don't have an account?{' '}
        <span className="auth-link" onClick={() => setView('signup')}>
          Sign Up
        </span>
      </div>
    </div>
  );
}
