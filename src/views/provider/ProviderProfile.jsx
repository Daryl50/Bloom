import React, { useState, useEffect } from 'react';
import { User, Clipboard, Calendar, Building, Award, Clock, Save, Check } from 'lucide-react';

export default function ProviderProfile({ currentUser }) {
  const [profile, setProfile] = useState({
    name: 'Dr. Abena Mensah',
    title: 'Sexual Health Nurse Practitioner',
    specialty: 'Contraception & Routine Care',
    experience: '8 years experience',
    bio: 'Specializes in supportive, non-judgmental sexual health consultations, birth control advice, and STI counseling for tertiary students.',
    hospital: 'Legon Health Services',
    rating: '4.9 (124 consultations)'
  });

  const [hours, setHours] = useState([
    { day: 'Monday', active: true, start: '09:00 AM', end: '04:00 PM' },
    { day: 'Tuesday', active: true, start: '09:00 AM', end: '04:00 PM' },
    { day: 'Wednesday', active: true, start: '09:00 AM', end: '12:00 PM' },
    { day: 'Thursday', active: true, start: '09:00 AM', end: '04:00 PM' },
    { day: 'Friday', active: true, start: '09:00 AM', end: '04:00 PM' },
    { day: 'Saturday', active: false, start: '10:00 AM', end: '02:00 PM' },
    { day: 'Sunday', active: false, start: '10:00 AM', end: '02:00 PM' }
  ]);

  const [savedSuccess, setSavedSuccess] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('bloom_provider_profile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    } else if (currentUser) {
      // Default to matching active logged in provider details
      setProfile(prev => ({
        ...prev,
        name: currentUser.name || prev.name
      }));
    }

    const savedHours = localStorage.getItem('bloom_provider_hours');
    if (savedHours) {
      setHours(JSON.parse(savedHours));
    }
  }, [currentUser]);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    localStorage.setItem('bloom_provider_profile', JSON.stringify(profile));
    localStorage.setItem('bloom_provider_hours', JSON.stringify(hours));
    
    // Update active session name if changed
    const savedUser = localStorage.getItem('bloom_user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      parsedUser.name = profile.name;
      localStorage.setItem('bloom_user', JSON.stringify(parsedUser));
    }

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleToggleDay = (idx) => {
    setHours(hours.map((h, i) => i === idx ? { ...h, active: !h.active } : h));
  };

  const handleTimeChange = (idx, field, value) => {
    setHours(hours.map((h, i) => i === idx ? { ...h, [field]: value } : h));
  };

  return (
    <div className="container animate-fade-in" style={{ paddingBottom: '60px' }}>
      <div className="view-header">
        <h1 className="view-title">Clinical Profile</h1>
        <p className="view-subtitle">Configure your public practitioner credentials, specialty listings, and consulting hours</p>
      </div>

      <form onSubmit={handleSaveProfile} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px', alignItems: 'start' }}>
        
        {/* Profile Details */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center', borderBottom: '1px solid var(--border-light)', paddingBottom: '20px' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary-pink), var(--secondary-purple))', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff', fontSize: '2rem', fontWeight: 700 }}>
              {profile.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h2 style={{ fontSize: '1.5rem', color: 'var(--dark-navy)' }}>{profile.name}</h2>
              <p style={{ color: 'var(--primary-pink)', fontWeight: 600, fontSize: '0.9rem' }}>{profile.title}</p>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px', display: 'flex', gap: '10px' }}>
                <span>★ {profile.rating}</span>
                <span>• {profile.experience}</span>
              </div>
            </div>
          </div>

          <h3 style={{ fontSize: '1.10rem', color: 'var(--dark-navy)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Award size={18} style={{ color: 'var(--primary-pink)' }} />
            Practitioner Credentials
          </h3>

          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label" style={{ fontSize: '0.85rem' }}>Full Name</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="form-control"
              style={{ fontSize: '0.9rem', padding: '10px' }}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label" style={{ fontSize: '0.85rem' }}>Title Role</label>
              <input
                type="text"
                value={profile.title}
                onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                className="form-control"
                style={{ fontSize: '0.9rem', padding: '10px' }}
                required
              />
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label" style={{ fontSize: '0.85rem' }}>Specialty Area</label>
              <input
                type="text"
                value={profile.specialty}
                onChange={(e) => setProfile({ ...profile, specialty: e.target.value })}
                className="form-control"
                style={{ fontSize: '0.9rem', padding: '10px' }}
                required
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label" style={{ fontSize: '0.85rem' }}>Experience Years</label>
              <input
                type="text"
                value={profile.experience}
                onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
                className="form-control"
                style={{ fontSize: '0.9rem', padding: '10px' }}
                required
              />
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label" style={{ fontSize: '0.85rem' }}>Hospital / Clinic Affiliation</label>
              <input
                type="text"
                value={profile.hospital}
                onChange={(e) => setProfile({ ...profile, hospital: e.target.value })}
                className="form-control"
                style={{ fontSize: '0.9rem', padding: '10px' }}
                required
              />
            </div>
          </div>

          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label" style={{ fontSize: '0.85rem' }}>Short Biography</label>
            <textarea
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              className="form-control"
              style={{ fontSize: '0.9rem', minHeight: '80px', resize: 'vertical', fontFamily: 'var(--font-body)' }}
              required
            />
          </div>
        </div>

        {/* Consulting Hours Availability */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="card">
            <h2 style={{ fontSize: '1.25rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={20} style={{ color: 'var(--primary-pink)' }} />
              Weekly Consultation Hours
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {hours.map((h, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px', borderRadius: '8px', background: h.active ? 'rgba(236, 72, 153, 0.02)' : 'var(--bg-soft)', border: '1px solid var(--border-light)' }}>
                  
                  {/* Active day checkbox switcher */}
                  <input
                    type="checkbox"
                    checked={h.active}
                    onChange={() => handleToggleDay(idx)}
                    style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--primary-pink)' }}
                  />

                  {/* Day label */}
                  <span style={{ flex: 1, fontWeight: 600, fontSize: '0.85rem', color: h.active ? 'var(--dark-navy)' : 'var(--text-muted)' }}>
                    {h.day}
                  </span>

                  {/* Start / End times selection (conditionally styled based on active state) */}
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    <input
                      type="text"
                      value={h.start}
                      onChange={(e) => handleTimeChange(idx, 'start', e.target.value)}
                      disabled={!h.active}
                      style={{ width: '85px', height: '30px', padding: '4px', fontSize: '0.75rem', textAlign: 'center' }}
                      className="form-control"
                    />
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>to</span>
                    <input
                      type="text"
                      value={h.end}
                      onChange={(e) => handleTimeChange(idx, 'end', e.target.value)}
                      disabled={!h.active}
                      style={{ width: '85px', height: '30px', padding: '4px', fontSize: '0.75rem', textAlign: 'center' }}
                      className="form-control"
                    />
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* Action Trigger Buttons */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', alignItems: 'center' }}>
            {savedSuccess && (
              <span style={{ color: 'var(--green-success)', fontSize: '0.9rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Check size={16} />
                Profile changes saved!
              </span>
            )}
            <button
              type="submit"
              className="btn btn-primary"
              style={{ background: 'var(--primary-pink)', padding: '12px 28px', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <Save size={18} />
              Save Profile Settings
            </button>
          </div>
        </div>

      </form>
    </div>
  );
}
