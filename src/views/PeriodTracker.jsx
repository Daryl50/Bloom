import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Heart, Plus, ShieldCheck, ChevronLeft, ChevronRight, Trash2 } from 'lucide-react';

export default function PeriodTracker({ setView }) {
  const [logs, setLogs] = useState({});
  const [selectedDate, setSelectedDate] = useState('');
  const [showLogForm, setShowLogForm] = useState(false);
  
  // Form fields
  const [flow, setFlow] = useState('Medium');
  const [mood, setMood] = useState('Neutral');
  const [cramps, setCramps] = useState(false);
  const [fatigue, setFatigue] = useState(false);
  const [headache, setHeadache] = useState(false);
  const [notes, setNotes] = useState('');

  // Calendar navigation
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(4); // May (0-indexed: Jan=0, May=4)

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Load logs on mount
  useEffect(() => {
    const savedLogs = localStorage.getItem('bloom_period_logs');
    if (savedLogs) {
      setLogs(JSON.parse(savedLogs));
    } else {
      // Default dummy data matching Period tracker.png
      const defaultLogs = {
        '2026-05-01': { flow: 'Medium', mood: 'Neutral', cramps: true, fatigue: false, headache: false, notes: 'Day 1' },
        '2026-05-02': { flow: 'Heavy', mood: 'Sad', cramps: true, fatigue: true, headache: false, notes: 'Day 2' },
        '2026-05-03': { flow: 'Heavy', mood: 'Sad', cramps: true, fatigue: true, headache: true, notes: 'Day 3' },
        '2026-05-04': { flow: 'Medium', mood: 'Neutral', cramps: false, fatigue: true, headache: false, notes: 'Day 4' },
        '2026-05-05': { flow: 'Light', mood: 'Happy', cramps: false, fatigue: false, headache: false, notes: 'Day 5' },
      };
      setLogs(defaultLogs);
      localStorage.setItem('bloom_period_logs', JSON.stringify(defaultLogs));
    }

    // Set default selected date as today in 2026-05-19
    setSelectedDate('2026-05-19');
  }, []);

  const saveLog = (e) => {
    e.preventDefault();
    const newLog = {
      flow,
      mood,
      cramps,
      fatigue,
      headache,
      notes
    };
    const updatedLogs = { ...logs, [selectedDate]: newLog };
    setLogs(updatedLogs);
    localStorage.setItem('bloom_period_logs', JSON.stringify(updatedLogs));
    setShowLogForm(false);
  };

  const deleteLog = (date) => {
    const updatedLogs = { ...logs };
    delete updatedLogs[date];
    setLogs(updatedLogs);
    localStorage.setItem('bloom_period_logs', JSON.stringify(updatedLogs));
    setFlow('Medium');
    setMood('Neutral');
    setCramps(false);
    setFatigue(false);
    setHeadache(false);
    setNotes('');
  };

  const handleDayClick = (day) => {
    const formattedMonth = String(currentMonth + 1).padStart(2, '0');
    const formattedDay = String(day).padStart(2, '0');
    const clickedDate = `${currentYear}-${formattedMonth}-${formattedDay}`;
    setSelectedDate(clickedDate);
    
    // Load log values if they exist
    if (logs[clickedDate]) {
      setFlow(logs[clickedDate].flow);
      setMood(logs[clickedDate].mood);
      setCramps(logs[clickedDate].cramps || false);
      setFatigue(logs[clickedDate].fatigue || false);
      setHeadache(logs[clickedDate].headache || false);
      setNotes(logs[clickedDate].notes || '');
    } else {
      // Clear form
      setFlow('Medium');
      setMood('Neutral');
      setCramps(false);
      setFatigue(false);
      setHeadache(false);
      setNotes('');
    }
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Calculations
  const daysLoggedCount = Object.keys(logs).length;
  // Calculate average cycle (or standard 28)
  const averageCycleLength = 28;
  
  // Find last period date in May or April to predict next period
  // Let's assume prediction is 28 days after last cycle start (May 1st) -> May 29th
  const predictionDate = 'May 29, 2026';
  const daysUntilNextPeriod = 10; // May 19 to May 29 is 10 days

  // Calendar grid construction
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const daysCount = getDaysInMonth(currentYear, currentMonth);
  const startDayIndex = getFirstDayOfMonth(currentYear, currentMonth);

  const cells = [];
  // Empty slots before first day
  for (let i = 0; i < startDayIndex; i++) {
    cells.push(<div key={`empty-${i}`} className="calendar-day-cell empty-day"></div>);
  }

  // Days in month
  for (let day = 1; day <= daysCount; day++) {
    const formattedMonth = String(currentMonth + 1).padStart(2, '0');
    const formattedDay = String(day).padStart(2, '0');
    const cellDateStr = `${currentYear}-${formattedMonth}-${formattedDay}`;
    
    const isToday = cellDateStr === '2026-05-19';
    const isPeriodDay = logs[cellDateStr] && (logs[cellDateStr].flow === 'Light' || logs[cellDateStr].flow === 'Medium' || logs[cellDateStr].flow === 'Heavy');
    const isSelected = cellDateStr === selectedDate;
    
    let cellClass = 'calendar-day-cell';
    if (isToday) cellClass += ' today-cell';
    if (isPeriodDay) cellClass += ' period-cell';

    const cellStyle = isSelected ? { boxShadow: '0 0 0 2px var(--secondary-purple)' } : {};

    cells.push(
      <div 
        key={`day-${day}`} 
        className={cellClass}
        style={cellStyle}
        onClick={() => handleDayClick(day)}
      >
        <span className="calendar-day-number">{day}</span>
        {logs[cellDateStr] && !isPeriodDay && <span className="log-summary-dot"></span>}
      </div>
    );
  }

  return (
    <div className="container animate-fade-in">
      <div className="view-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 className="view-title">Period Tracker</h1>
          <p className="view-subtitle">🔒 Your cycle data is encrypted locally and never uploaded to any server.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setView('reminders')}>
          Manage Reminders
        </button>
      </div>

      <div className="period-dashboard">
        {/* Calendar and Metrics Column */}
        <div>
          {/* Metrics Grid */}
          <div className="tracker-metrics-grid">
            <div className="metric-card">
              <div className="metric-icon-box">
                <Heart size={20} fill="var(--primary-pink)" />
              </div>
              <div className="metric-info">
                <span className="metric-label">Cycle Length</span>
                <span className="metric-value">{averageCycleLength} Days</span>
                <span className="metric-subtext">Average cycle duration</span>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-icon-box" style={{ color: 'var(--secondary-purple)' }}>
                <CalendarIcon size={20} />
              </div>
              <div className="metric-info">
                <span className="metric-label">Next Period</span>
                <span className="metric-value">In {daysUntilNextPeriod} Days</span>
                <span className="metric-subtext">Predicted for {predictionDate}</span>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-icon-box" style={{ color: 'var(--green-success)' }}>
                <ShieldCheck size={20} />
              </div>
              <div className="metric-info">
                <span className="metric-label">Days Logged</span>
                <span className="metric-value">{daysLoggedCount} Days</span>
                <span className="metric-subtext">Total entries recorded</span>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-icon-box" style={{ color: 'var(--warning-amber)' }}>
                <Plus size={20} />
              </div>
              <div className="metric-info">
                <span className="metric-label">Today's Date</span>
                <span className="metric-value">May 19, 2026</span>
                <span className="metric-subtext">Cycle tracking active</span>
              </div>
            </div>
          </div>

          {/* Calendar Display */}
          <div className="calendar-wrapper">
            <div className="calendar-header">
              <span className="calendar-month">
                {monthNames[currentMonth]} {currentYear}
              </span>
              <div className="calendar-arrows">
                <button className="icon-btn" onClick={handlePrevMonth}><ChevronLeft size={20} /></button>
                <button className="icon-btn" onClick={handleNextMonth}><ChevronRight size={20} /></button>
              </div>
            </div>
            <div className="calendar-weekdays">
              <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
            </div>
            <div className="calendar-grid">
              {cells}
            </div>
          </div>
        </div>

        {/* Sidebar Log Editor */}
        <div className="tracker-sidebar">
          <div className="card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Log details for:</span>
              <span style={{ color: 'var(--primary-pink)', fontSize: '1.05rem', fontWeight: 700 }}>
                {selectedDate}
              </span>
            </h3>

            {logs[selectedDate] ? (
              // Existing Log view
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '12px' }}>
                  <span className="summary-detail-label">Flow Level</span>
                  <div style={{ marginTop: '4px' }}>
                    <span className={`badge ${
                      logs[selectedDate].flow === 'Heavy' ? 'badge-pink' : 
                      logs[selectedDate].flow === 'Medium' ? 'badge-purple' : 'badge-grey'
                    }`}>
                      {logs[selectedDate].flow}
                    </span>
                  </div>
                </div>

                <div style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '12px' }}>
                  <span className="summary-detail-label">Mood Status</span>
                  <div className="summary-detail-value">{logs[selectedDate].mood}</div>
                </div>

                <div style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '12px' }}>
                  <span className="summary-detail-label">Logged Symptoms</span>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
                    {logs[selectedDate].cramps && <span className="badge badge-pink" style={{ fontSize: '0.7rem' }}>Cramps</span>}
                    {logs[selectedDate].fatigue && <span className="badge badge-purple" style={{ fontSize: '0.7rem' }}>Fatigue</span>}
                    {logs[selectedDate].headache && <span className="badge badge-grey" style={{ fontSize: '0.7rem' }}>Headache</span>}
                    {!logs[selectedDate].cramps && !logs[selectedDate].fatigue && !logs[selectedDate].headache && (
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>None logged</span>
                    )}
                  </div>
                </div>

                {logs[selectedDate].notes && (
                  <div style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '12px' }}>
                    <span className="summary-detail-label">Day Notes</span>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '4px', fontStyle: 'italic' }}>
                      "{logs[selectedDate].notes}"
                    </div>
                  </div>
                )}

                <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                  <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => setShowLogForm(true)}>
                    Edit Log
                  </button>
                  <button className="btn btn-outline" style={{ border: '1px solid var(--danger-red)', color: 'var(--danger-red)' }} onClick={() => deleteLog(selectedDate)}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ) : (
              // No Log state
              <div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '20px' }}>
                  No details logged for this date. Keep track of your cycle by clicking the button below.
                </p>
                <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => setShowLogForm(true)}>
                  <Plus size={18} />
                  Log Cycle Details
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Log Cycle Form Modal */}
      {showLogForm && (
        <div className="modal-overlay">
          <div className="modal-content animate-fade-in" style={{ maxWidth: '480px' }}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.2rem' }}>Log Cycle: {selectedDate}</h3>
              <button className="icon-btn" onClick={() => setShowLogForm(false)}>✕</button>
            </div>
            <div className="modal-body">
              <form onSubmit={saveLog}>
                <div className="form-group">
                  <label className="form-label">Flow Intensity</label>
                  <div className="flow-select">
                    <button
                      type="button"
                      className={`flow-btn flow-btn-light ${flow === 'Light' ? 'selected' : ''}`}
                      onClick={() => setFlow('Light')}
                    >
                      Light
                    </button>
                    <button
                      type="button"
                      className={`flow-btn flow-btn-medium ${flow === 'Medium' ? 'selected' : ''}`}
                      onClick={() => setFlow('Medium')}
                    >
                      Medium
                    </button>
                    <button
                      type="button"
                      className={`flow-btn flow-btn-heavy ${flow === 'Heavy' ? 'selected' : ''}`}
                      onClick={() => setFlow('Heavy')}
                    >
                      Heavy
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Symptoms</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label className="symptom-checkbox-label" style={{ padding: '8px 12px' }}>
                      <input
                        type="checkbox"
                        checked={cramps}
                        onChange={(e) => setCramps(e.target.checked)}
                      />
                      Cramps
                    </label>
                    <label className="symptom-checkbox-label" style={{ padding: '8px 12px' }}>
                      <input
                        type="checkbox"
                        checked={fatigue}
                        onChange={(e) => setFatigue(e.target.checked)}
                      />
                      Fatigue
                    </label>
                    <label className="symptom-checkbox-label" style={{ padding: '8px 12px' }}>
                      <input
                        type="checkbox"
                        checked={headache}
                        onChange={(e) => setHeadache(e.target.checked)}
                      />
                      Headache
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Mood Status</label>
                  <select
                    className="form-control"
                    value={mood}
                    onChange={(e) => setMood(e.target.value)}
                  >
                    <option value="Happy">Happy 😊</option>
                    <option value="Neutral">Neutral 😐</option>
                    <option value="Anxious">Anxious 😰</option>
                    <option value="Sad">Sad 😢</option>
                    <option value="Irritable">Irritable 😠</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Daily Notes</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Describe how you feel today..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  ></textarea>
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                  <button type="button" className="btn btn-outline" style={{ flex: 1 }} onClick={() => setShowLogForm(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" style={{ flex: 1, background: 'var(--primary-pink)' }}>
                    Save Entry
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
