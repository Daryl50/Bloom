import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';

export default function SignUp({ setView, login }) {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nickname || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const user = {
      email,
      name: nickname,
      registered: true,
      role: role,
      doctorId: role === 'provider' ? 'dr-abena-mensah' : null // default profile for newly registered providers
    };

    login(user);
    setView(role === 'provider' ? 'provider-dashboard' : 'home');
  };

  return (
    <div className="auth-wrapper animate-fade-in">
      <div className="auth-header">
        <h1 className="auth-logo" style={{ color: '#ff007f' }}>Bloom</h1>
        <h2 style={{ fontSize: '1.75rem', marginBottom: '4px' }}>Create Account</h2>
        <p className="auth-subtitle">Join Our Supportive Community</p>
      </div>

      <div className="auth-card">
        {error && (
          <div style={{ color: 'var(--danger-red-text)', background: 'var(--danger-red-bg)', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.85rem', fontWeight: 500, border: '1px solid rgba(239, 68, 68, 0.2)' }}>
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          {/* Role Selection Tabs */}
          <div className="form-group">
            <label className="form-label">
              <User size={16} style={{ color: 'var(--primary-pink)' }} />
              I want to sign up as:
            </label>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              <button
                type="button"
                className={`btn ${role === 'student' ? 'btn-primary' : 'btn-outline'}`}
                style={{ flex: 1, padding: '8px 12px', fontSize: '0.85rem', background: role === 'student' ? 'var(--primary-pink)' : 'transparent', color: role === 'student' ? '#fff' : 'var(--text-secondary)' }}
                onClick={() => setRole('student')}
              >
                Student
              </button>
              <button
                type="button"
                className={`btn ${role === 'provider' ? 'btn-primary' : 'btn-outline'}`}
                style={{ flex: 1, padding: '8px 12px', fontSize: '0.85rem', background: role === 'provider' ? 'var(--primary-pink)' : 'transparent', color: role === 'provider' ? '#fff' : 'var(--text-secondary)' }}
                onClick={() => setRole('provider')}
              >
                Health Professional
              </button>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              <User size={16} style={{ color: 'var(--primary-pink)' }} />
              {role === 'provider' ? 'Full Name / Nickname' : 'Name (Nickname)'}
            </label>
            <input
              type="text"
              className="form-control"
              placeholder={role === 'provider' ? 'e.g. Dr. Abena Mensah' : 'e.g. Ama K.'}
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
            />
          </div>

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

          <div className="form-group">
            <label className="form-label">
              <Lock size={16} style={{ color: 'var(--primary-pink)' }} />
              Confirm Password
            </label>
            <div className="password-input-container">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                className="form-control"
                placeholder="••••••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px', background: 'var(--primary-pink)' }}>
            Sign Up
          </button>
        </form>
      </div>

      <div className="auth-footer">
        Already have an account?{' '}
        <span className="auth-link" onClick={() => setView('signin')}>
          Sign In
        </span>
      </div>
    </div>
  );
}
