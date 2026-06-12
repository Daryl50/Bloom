import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Plus, Trash2, Check, Lock } from 'lucide-react';

export default function ProviderSchedule({ currentUser }) {
  const [selectedDate, setSelectedDate] = useState(12); // Jun 12
  const [slots, setSlots] = useState([
    { id: 1, time: '09:00 AM', label: 'Anonymous Chat Consult', type: 'booked', date: 12 },
    { id: 2, time: '10:00 AM', label: 'Available Slot', type: 'free', date: 12 },
    { id: 3, time: '11:00 AM', label: 'Anonymous Chat Consult', type: 'booked', date: 12 },
    { id: 4, time: '01:00 PM', label: 'Blocked: Clinic Duty', type: 'blocked', date: 12 },
    { id: 5, time: '02:00 PM', label: 'Anonymous Follow Up', type: 'booked', date: 12 },
    { id: 6, time: '03:00 PM', label: 'Available Slot', type: 'free', date: 12 },
    { id: 7, time: '09:30 AM', label: 'Anonymous Consultation', type: 'booked', date: 15 },
    { id: 8, time: '10:30 AM', label: 'Available Slot', type: 'free', date: 15 }
  ]);

  // Form states to add custom slots
  const [newTime, setNewTime] = useState('12:00 PM');
  const [newLabel, setNewLabel] = useState('Available Slot');
  const [newType, setNewType] = useState('free');

  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1); // 30 days of June
  const startOffset = 1; // June 2026 starts on a Monday (offset = 1)

  const activeDateSlots = slots.filter(s => s.date === selectedDate);

  const handleAddSlot = (e) => {
    e.preventDefault();
    const newSlot = {
      id: slots.length + 1,
      time: newTime,
      label: newLabel,
      type: newType,
      date: selectedDate
    };
    setSlots([...slots, newSlot]);
    setNewLabel('Available Slot');
    setNewType('free');
  };

  const handleDeleteSlot = (id) => {
    setSlots(slots.filter(s => s.id !== id));
  };

  const handleToggleBlock = (id) => {
    setSlots(slots.map(s => {
      if (s.id === id) {
        const nextType = s.type === 'free' ? 'blocked' : 'free';
        return {
          ...s,
          type: nextType,
          label: nextType === 'blocked' ? 'Blocked Time Slot' : 'Available Slot'
        };
      }
      return s;
    }));
  };

  const getDayStatusStyle = (day) => {
    const daySlots = slots.filter(s => s.date === day);
    if (daySlots.length === 0) return {};
    const hasBooked = daySlots.some(s => s.type === 'booked');
    const hasFree = daySlots.some(s => s.type === 'free');
    
    if (hasBooked && hasFree) return { borderBottom: '3px solid var(--primary-pink)' };
    if (hasBooked) return { borderBottom: '3px solid var(--secondary-purple)' };
    return { borderBottom: '3px dotted var(--text-muted)' };
  };

  return (
    <div className="container animate-fade-in" style={{ paddingBottom: '60px' }}>
      <div className="view-header">
        <h1 className="view-title">Schedule</h1>
        <p className="view-subtitle">Manage your consultation availability, block clinical slots, and review bookings</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px', alignItems: 'start' }}>
        
        {/* Calendar Card */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '1.25rem', color: 'var(--dark-navy)' }}>June 2026</h2>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
              {activeDateSlots.length} Slots on June {selectedDate}
            </span>
          </div>

          {/* Calendar Grid Header */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', fontWeight: 600, fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
            <div>Sun</div>
          </div>

          {/* Calendar Grid Body */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px' }}>
            {/* Empty grid blocks for offset */}
            {Array.from({ length: startOffset }).map((_, idx) => (
              <div key={`offset-${idx}`} style={{ minHeight: '60px' }}></div>
            ))}

            {/* Calendar Days */}
            {daysInMonth.map((day) => {
              const isSelected = selectedDate === day;
              return (
                <button
                  key={day}
                  onClick={() => setSelectedDate(day)}
                  style={{
                    minHeight: '60px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    padding: '6px',
                    borderRadius: '8px',
                    border: isSelected ? '2px solid var(--primary-pink)' : '1px solid var(--border-light)',
                    background: isSelected ? 'rgba(236, 72, 153, 0.04)' : '#fff',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)',
                    ...getDayStatusStyle(day)
                  }}
                >
                  <span style={{ fontWeight: isSelected ? 700 : 500, fontSize: '0.85rem', color: isSelected ? 'var(--primary-pink)' : 'var(--dark-navy)' }}>
                    {day}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div style={{ display: 'flex', gap: '16px', marginTop: '20px', fontSize: '0.75rem', color: 'var(--text-secondary)', borderTop: '1px solid var(--border-light)', paddingTop: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '8px', height: '8px', background: 'var(--secondary-purple)', borderRadius: '50%' }}></span>
              Booked Sessions
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '8px', height: '8px', background: 'var(--primary-pink)', borderRadius: '50%' }}></span>
              Mixed Availability
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '8px', height: '8px', background: 'var(--text-muted)', borderStyle: 'dotted', border: '1px solid', borderRadius: '50%' }}></span>
              Free Slots Only
            </div>
          </div>
        </div>

        {/* Selected Day Slots & Manager */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Slots List Card */}
          <div className="card">
            <h2 style={{ fontSize: '1.25rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={20} style={{ color: 'var(--primary-pink)' }} />
              Slots for June {selectedDate}, 2026
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {activeDateSlots.length > 0 ? (
                activeDateSlots.map((slot) => (
                  <div
                    key={slot.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '12px',
                      borderRadius: '8px',
                      background: slot.type === 'booked' ? 'var(--bg-soft)' : slot.type === 'blocked' ? 'rgba(239, 68, 68, 0.05)' : 'rgba(16, 185, 129, 0.05)',
                      borderLeft: `4px solid ${slot.type === 'booked' ? 'var(--secondary-purple)' : slot.type === 'blocked' ? 'var(--danger-red)' : 'var(--green-success)'}`
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--dark-navy)' }}>{slot.time}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{slot.label}</div>
                    </div>

                    <div style={{ display: 'flex', gap: '6px' }}>
                      {slot.type !== 'booked' && (
                        <button
                          onClick={() => handleToggleBlock(slot.id)}
                          className="icon-btn"
                          title={slot.type === 'free' ? 'Block Slot' : 'Make Available'}
                          style={{ color: slot.type === 'free' ? 'var(--warning-amber)' : 'var(--green-success)' }}
                        >
                          {slot.type === 'free' ? <Lock size={16} /> : <Check size={16} />}
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteSlot(slot.id)}
                        className="icon-btn"
                        style={{ color: 'var(--danger-red)' }}
                        title="Delete Slot"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem', padding: '24px 0' }}>
                  No slots configured for this day.
                </div>
              )}
            </div>
          </div>

          {/* Add Slot Card */}
          <div className="card">
            <h3 style={{ fontSize: '1.1rem', marginBottom: '12px' }}>Create Availability / Block</h3>
            <form onSubmit={handleAddSlot} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.8rem' }}>Time</label>
                  <input
                    type="text"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    placeholder="e.g. 04:00 PM"
                    className="form-control"
                    style={{ height: '36px', fontSize: '0.85rem' }}
                    required
                  />
                </div>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.8rem' }}>Type</label>
                  <select
                    value={newType}
                    onChange={(e) => {
                      setNewType(e.target.value);
                      setNewLabel(e.target.value === 'free' ? 'Available Slot' : 'Blocked: Break');
                    }}
                    className="form-control"
                    style={{ height: '36px', fontSize: '0.85rem', appearance: 'auto' }}
                  >
                    <option value="free">Available Slot</option>
                    <option value="blocked">Blocked/Break</option>
                  </select>
                </div>
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label" style={{ fontSize: '0.8rem' }}>Label / Description</label>
                <input
                  type="text"
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                  placeholder="e.g. Available Slot"
                  className="form-control"
                  style={{ height: '36px', fontSize: '0.85rem' }}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ background: 'var(--primary-pink)', fontSize: '0.85rem', padding: '8px 16px', alignSelf: 'flex-end', marginTop: '4px' }}>
                <Plus size={16} />
                Add Day Slot
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
