import React, { useState, useEffect } from 'react';
import { Plus, Trash2, ArrowLeft, AlarmClock } from 'lucide-react';

export default function Reminders({ setView }) {
  const [reminders, setReminders] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  
  // Form fields
  const [type, setType] = useState('Medication');
  const [time, setTime] = useState('09:00');
  const [frequency, setFrequency] = useState('Daily');

  useEffect(() => {
    const savedReminders = localStorage.getItem('bloom_reminders');
    if (savedReminders) {
      setReminders(JSON.parse(savedReminders));
    } else {
      // Default dummy reminders matching Reminders.png
      const defaultReminders = [
        { id: 1, type: 'Mental Health', time: '09:00', frequency: 'Daily', active: true },
        { id: 2, type: 'Contraception', time: '21:00', frequency: 'Daily', active: true },
        { id: 3, type: 'Check-up', time: '14:30', frequency: 'Weekly', active: false },
      ];
      setReminders(defaultReminders);
      localStorage.setItem('bloom_reminders', JSON.stringify(defaultReminders));
    }
  }, []);

  const handleToggle = (id) => {
    const updated = reminders.map((rem) => {
      if (rem.id === id) {
        return { ...rem, active: !rem.active };
      }
      return rem;
    });
    setReminders(updated);
    localStorage.setItem('bloom_reminders', JSON.stringify(updated));
  };

  const handleDelete = (id) => {
    const filtered = reminders.filter((rem) => rem.id !== id);
    setReminders(filtered);
    localStorage.setItem('bloom_reminders', JSON.stringify(filtered));
  };

  const handleCreate = (e) => {
    e.preventDefault();
    const newReminder = {
      id: Date.now(),
      type,
      time,
      frequency,
      active: true
    };
    const updated = [...reminders, newReminder];
    setReminders(updated);
    localStorage.setItem('bloom_reminders', JSON.stringify(updated));
    setShowCreateForm(false);
    
    // Reset form
    setType('Medication');
    setTime('09:00');
    setFrequency('Daily');
  };

  return (
    <div className="container animate-fade-in">
      {/* View Header */}
      <div className="view-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <button className="breadcrumb-back" onClick={() => setView('period-tracker')}>
            <ArrowLeft size={16} />
            Back to Tracker
          </button>
          <h1 className="view-title">Reminders</h1>
          <p className="view-subtitle">Never miss medications or appointments</p>
        </div>
        {!showCreateForm && (
          <button 
            className="btn btn-primary" 
            style={{ background: 'var(--primary-pink)' }}
            onClick={() => setShowCreateForm(true)}
          >
            <Plus size={18} />
            New Reminder
          </button>
        )}
      </div>

      {showCreateForm ? (
        // Create Reminder view matching Set reminder.png structure
        <div className="card" style={{ maxWidth: '560px', margin: '0 auto', textAlign: 'left' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '24px', borderBottom: '1px solid var(--border-light)', paddingBottom: '12px' }}>
            Create Reminder
          </h3>
          <form onSubmit={handleCreate}>
            <div className="form-group">
              <label className="form-label">Type</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Medication, Pill, Check-up"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Time</label>
              <input
                type="time"
                className="form-control"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Frequency</label>
              <select
                className="form-control"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
              >
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Once">Once</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
              <button 
                type="button" 
                className="btn btn-secondary" 
                style={{ flex: 1, color: 'var(--primary-pink)', border: '1px solid var(--primary-pink)' }} 
                onClick={() => setShowCreateForm(false)}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ flex: 1, background: 'var(--primary-pink)' }}
              >
                Create Reminder
              </button>
            </div>
          </form>
        </div>
      ) : (
        // Reminders List view matching Reminders.png
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          {reminders.length > 0 ? (
            <div className="reminders-list">
              <h3 style={{ fontSize: '1.1rem', color: 'var(--dark-navy)', fontWeight: 600, marginBottom: '8px' }}>
                Your Reminders
              </h3>
              {reminders.map((reminder) => (
                <div key={reminder.id} className="reminder-item">
                  <div className="reminder-info">
                    <span className="reminder-pill">{reminder.type}</span>
                    <span className="reminder-time">
                      {reminder.time} ({reminder.frequency.toLowerCase()})
                    </span>
                  </div>
                  <div className="reminder-actions">
                    <label className="switch">
                      <input 
                        type="checkbox" 
                        checked={reminder.active} 
                        onChange={() => handleToggle(reminder.id)}
                      />
                      <span className="slider"></span>
                    </label>
                    <button 
                      className="icon-btn" 
                      style={{ color: 'var(--danger-red)' }}
                      onClick={() => handleDelete(reminder.id)}
                      title="Delete Reminder"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card" style={{ padding: '48px', textAlign: 'center', color: 'var(--text-secondary)' }}>
              <AlarmClock size={48} style={{ color: 'var(--text-muted)', marginBottom: '16px', marginInline: 'auto' }} />
              <p style={{ fontSize: '1.1rem', marginBottom: '8px' }}>No reminders scheduled.</p>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '24px' }}>Set up reminders for contraceptive pills, health vitamins, or doctor checkups.</p>
              <button 
                className="btn btn-primary" 
                onClick={() => setShowCreateForm(true)}
              >
                Create Your First Reminder
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
