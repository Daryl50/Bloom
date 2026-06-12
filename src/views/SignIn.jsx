import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User, ShieldAlert } from 'lucide-react';

export default function SignIn({ setView, login }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('student');
  const [selectedDoctorId, setSelectedDoctorId] = useState('dr-abena-mensah');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    
    // Simulate login
    const nickname = email.split('@')[0];
    const formattedNickname = nickname.charAt(0).toUpperCase() + nickname.slice(1) + ' K.';
    
    let doctorName = 'Dr. Abena Mensah';
    if (selectedDoctorId === 'dr-kofi-boateng') doctorName = 'Dr. Kofi Boateng';
    if (selectedDoctorId === 'dr-sarah-osei') doctorName = 'Dr. Sarah Osei';

    const user = {
      email,
      name: role === 'provider' ? doctorName : formattedNickname,
      registered: true,
      role: role,
      doctorId: role === 'provider' ? selectedDoctorId : null
    };
    
    login(user);
    setView(role === 'provider' ? 'provider-dashboard' : 'home');
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
          {/* Role Selection Tabs */}
          <div className="form-group">
            <label className="form-label">
              <User size={16} style={{ color: 'var(--primary-pink)' }} />
              I am logging in as:
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

          {/* Doctor Selector Dropdown (only visible for provider role) */}
          {role === 'provider' && (
            <div className="form-group animate-fade-in">
              <label className="form-label">
                <ShieldAlert size={16} style={{ color: 'var(--primary-pink)' }} />
                Select Professional Profile:
              </label>
              <select
                className="form-control"
                value={selectedDoctorId}
                onChange={(e) => setSelectedDoctorId(e.target.value)}
                style={{ appearance: 'auto' }}
              >
                <option value="dr-abena-mensah">Dr. Abena Mensah (Nurse Practitioner)</option>
                <option value="dr-kofi-boateng">Dr. Kofi Boateng (Gynecologist)</option>
                <option value="dr-sarah-osei">Dr. Sarah Osei (General Practitioner)</option>
              </select>
            </div>
          )}

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
