import React, { useState, useEffect } from 'react';
import { Search, Send, CheckCircle, ShieldAlert, User, Clipboard, Calendar, FileText, ArrowLeft, MessageSquare } from 'lucide-react';

export default function ProviderInbox({ currentUser, setView }) {
  const [consultations, setConsultations] = useState([]);
  const [selectedCaseId, setSelectedCaseId] = useState(null);
  const [activeTab, setActiveTab] = useState('active'); // 'active' or 'history'
  const [searchQuery, setSearchQuery] = useState('');
  
  // Chat input
  const [chatInput, setChatInput] = useState('');
  
  // Clinical notes editor states
  const [clinicDirections, setClinicDirections] = useState('');
  const [prescriptions, setPrescriptions] = useState('');

  useEffect(() => {
    const savedConsultations = localStorage.getItem('bloom_consultations');
    if (savedConsultations) {
      setConsultations(JSON.parse(savedConsultations));
    }
  }, []);

  const saveConsultationsList = (updatedList) => {
    setConsultations(updatedList);
    localStorage.setItem('bloom_consultations', JSON.stringify(updatedList));
  };

  const selectedCase = consultations.find(c => c.id === selectedCaseId);

  // Initialize clinical notes editor when case is selected
  useEffect(() => {
    if (selectedCase) {
      setClinicDirections(selectedCase.historyNotes?.clinicDirections || '');
      setPrescriptions(selectedCase.historyNotes?.prescriptions || '');
    }
  }, [selectedCaseId]);

  // Filter consultations
  const filteredCases = consultations.filter((c) => {
    const isHistory = c.status === 'Resolved';
    const matchesTab = activeTab === 'history' ? isHistory : !isHistory;
    const matchesSearch = c.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.concern.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (c.symptoms && c.symptoms.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesTab && matchesSearch;
  });

  // Handle send chat message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim() || !selectedCaseId) return;

    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMessage = {
      sender: 'doctor',
      text: chatInput,
      time: timeString
    };

    const updated = consultations.map((c) => {
      if (c.id === selectedCaseId) {
        return {
          ...c,
          status: 'Response Ready',
          messages: [...(c.messages || []), newMessage]
        };
      }
      return c;
    });

    saveConsultationsList(updated);
    setChatInput('');
  };

  // Handle save clinical notes & pre-visit details
  const handleSaveClinicalNotes = () => {
    if (!selectedCaseId) return;

    const updated = consultations.map((c) => {
      if (c.id === selectedCaseId) {
        return {
          ...c,
          historyNotes: {
            ...(c.historyNotes || {}),
            clinicDirections: clinicDirections,
            prescriptions: prescriptions
          }
        };
      }
      return c;
    });

    saveConsultationsList(updated);
    alert('Clinical notes and recommendations successfully saved and synced!');
  };

  // Handle resolve case
  const handleResolveCase = () => {
    if (!selectedCaseId) return;
    if (window.confirm('Are you sure you want to mark this consultation case as resolved?')) {
      const updated = consultations.map((c) => {
        if (c.id === selectedCaseId) {
          return { ...c, status: 'Resolved' };
        }
        return c;
      });
      saveConsultationsList(updated);
      setSelectedCaseId(null);
    }
  };

  const getSeverityBadge = (sev) => {
    switch (sev) {
      case 'High':
        return <span className="badge" style={{ background: 'var(--danger-red-bg)', color: 'var(--danger-red-text)', fontSize: '0.75rem' }}>High</span>;
      case 'Moderate':
        return <span className="badge" style={{ background: 'var(--warning-amber-bg)', color: 'var(--warning-amber-text)', fontSize: '0.75rem' }}>Moderate</span>;
      default:
        return <span className="badge" style={{ background: 'var(--green-success-bg)', color: 'var(--green-success-text)', fontSize: '0.75rem' }}>Mild</span>;
    }
  };

  return (
    <div className="container animate-fade-in" style={{ paddingBottom: '60px' }}>
      <div className="view-header">
        <h1 className="view-title">Case Inbox</h1>
        <p className="view-subtitle">Review anonymous student files, diagnose issues, and prepare treatment sheets</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '24px', height: 'calc(100vh - 240px)', minHeight: '600px', alignItems: 'stretch' }}>
        {/* Sidebar */}
        <div className="card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid var(--border-light)', marginBottom: '16px' }}>
            <button
              onClick={() => { setActiveTab('active'); setSelectedCaseId(null); }}
              style={{ flex: 1, padding: '10px', background: 'none', border: 'none', borderBottom: activeTab === 'active' ? '2px solid var(--primary-pink)' : 'none', fontWeight: activeTab === 'active' ? 600 : 500, color: activeTab === 'active' ? 'var(--primary-pink)' : 'var(--text-secondary)', cursor: 'pointer' }}
            >
              Active
            </button>
            <button
              onClick={() => { setActiveTab('history'); setSelectedCaseId(null); }}
              style={{ flex: 1, padding: '10px', background: 'none', border: 'none', borderBottom: activeTab === 'history' ? '2px solid var(--primary-pink)' : 'none', fontWeight: activeTab === 'history' ? 600 : 500, color: activeTab === 'history' ? 'var(--primary-pink)' : 'var(--text-secondary)', cursor: 'pointer' }}
            >
              Resolved History
            </button>
          </div>

          {/* Search bar */}
          <div style={{ position: 'relative', marginBottom: '16px' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search by ID or concern..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-control"
              style={{ paddingLeft: '36px', fontSize: '0.85rem', height: '38px' }}
            />
          </div>

          {/* Case list scroll container */}
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {filteredCases.length > 0 ? (
              filteredCases.map((cons) => (
                <div
                  key={cons.id}
                  onClick={() => setSelectedCaseId(cons.id)}
                  style={{
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-light)',
                    background: selectedCaseId === cons.id ? 'rgba(236, 72, 153, 0.04)' : 'var(--bg-card)',
                    borderColor: selectedCaseId === cons.id ? 'var(--primary-pink)' : 'var(--border-light)',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontFamily: 'monospace', fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-pink)' }}>
                      {cons.id}
                    </span>
                    {getSeverityBadge(cons.severity)}
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--dark-navy)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: '4px' }}>
                    {cons.concern}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    <span>{cons.date}</span>
                    <span style={{
                      fontWeight: 600,
                      color: cons.status === 'Submitted' ? 'var(--primary-pink)' : cons.status === 'Under Review' ? 'var(--secondary-purple)' : 'var(--green-success)'
                    }}>
                      {cons.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem', padding: '24px 0' }}>
                No consultations found.
              </div>
            )}
          </div>
        </div>

        {/* Details and Actions Panel */}
        <div style={{ height: '100%' }}>
          {selectedCase ? (
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.3fr', gap: '20px', height: '100%', alignItems: 'stretch' }}>
              
              {/* Left Column: Intake & Chat */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: '100%' }}>
                
                {/* Case Details Intake */}
                <div className="card" style={{ flex: '1', overflowY: 'auto', padding: '16px' }}>
                  <div style={{ display: 'flex', justifySpace: 'between', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: '12px', marginBottom: '12px' }}>
                    <h3 style={{ fontSize: '1.1rem', color: 'var(--dark-navy)' }}>Case Intake File</h3>
                    {getSeverityBadge(selectedCase.severity)}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.9rem' }}>
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Reason / Concern</div>
                      <p style={{ color: 'var(--dark-navy)', fontWeight: 500, marginTop: '2px' }}>{selectedCase.concern}</p>
                    </div>

                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Symptoms Logged</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
                        {selectedCase.symptoms && selectedCase.symptoms.map((s, idx) => (
                          <span key={idx} style={{ background: '#f1f5f9', color: '#475569', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 500 }}>
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Contraception Check</div>
                        <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{selectedCase.contraceptionCheck || 'No'}</span>
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Pregnancy History</div>
                        <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{selectedCase.pregnancyHistory || 'No'}</span>
                      </div>
                    </div>

                    <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '12px' }}>
                      <div style={{ fontWeight: 600, color: 'var(--dark-navy)', fontSize: '0.85rem', marginBottom: '6px' }}>Medical History Details</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: 'var(--text-secondary)' }}>Other Symptoms:</span>
                          <span style={{ fontWeight: 500 }}>{selectedCase.historyNotes?.otherSymptoms || 'None'}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: 'var(--text-secondary)' }}>Medications:</span>
                          <span style={{ fontWeight: 500 }}>{selectedCase.historyNotes?.medications || 'None'}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: 'var(--text-secondary)' }}>Allergies:</span>
                          <span style={{ fontWeight: 500 }}>{selectedCase.historyNotes?.allergies || 'None'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chat Section */}
                <div className="card" style={{ flex: '1.2', display: 'flex', flexDirection: 'column', padding: '16px', overflow: 'hidden' }}>
                  <h3 style={{ fontSize: '1rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '8px', marginBottom: '8px' }}>Chat Thread</h3>
                  
                  {/* Message Bubble Feed */}
                  <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', paddingRight: '4px', marginBottom: '12px' }}>
                    {selectedCase.messages && selectedCase.messages.map((msg, idx) => {
                      const isDoc = msg.sender === 'doctor';
                      return (
                        <div
                          key={idx}
                          style={{
                            alignSelf: isDoc ? 'flex-end' : 'flex-start',
                            maxWidth: '85%',
                            padding: '8px 12px',
                            borderRadius: '12px',
                            borderBottomRightRadius: isDoc ? '2px' : '12px',
                            borderBottomLeftRadius: isDoc ? '12px' : '2px',
                            background: isDoc ? 'var(--primary-pink)' : 'var(--bg-soft)',
                            color: isDoc ? '#fff' : 'var(--text-primary)',
                            fontSize: '0.85rem'
                          }}
                        >
                          <div>{msg.text}</div>
                          <div style={{ fontSize: '0.65rem', color: isDoc ? 'rgba(255,255,255,0.7)' : 'var(--text-muted)', textAlign: 'right', marginTop: '2px' }}>
                            {msg.time}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Send chat form */}
                  {selectedCase.status !== 'Resolved' && (
                    <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '8px' }}>
                      <input
                        type="text"
                        placeholder="Type reply to student..."
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        className="form-control"
                        style={{ height: '38px', fontSize: '0.85rem' }}
                      />
                      <button type="submit" className="btn btn-primary" style={{ height: '38px', width: '38px', padding: 0, background: 'var(--primary-pink)' }}>
                        <Send size={16} />
                      </button>
                    </form>
                  )}
                </div>

              </div>

              {/* Right Column: Recommendations & Action Sheets */}
              <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '16px', overflowY: 'auto' }}>
                <h3 style={{ fontSize: '1.1rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '12px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FileText size={18} style={{ color: 'var(--primary-pink)' }} />
                  Clinical Actions & Treatment Sheet
                </h3>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  
                  {/* Recommended Specialists / Directions */}
                  <div>
                    <label className="form-label" style={{ fontSize: '0.85rem', marginBottom: '4px' }}>
                      1. Specialist Referral / Clinic Directions
                    </label>
                    <textarea
                      value={clinicDirections}
                      onChange={(e) => setClinicDirections(e.target.value)}
                      placeholder="e.g. Please take this pre-visit summary to the Legon Student Health Services clinic on Wednesday for a follow-up screening."
                      className="form-control"
                      style={{ fontSize: '0.85rem', minHeight: '80px', resize: 'vertical', fontFamily: 'var(--font-body)' }}
                      disabled={selectedCase.status === 'Resolved'}
                    />
                  </div>

                  {/* Prescriptions / Clinical Notes */}
                  <div>
                    <label className="form-label" style={{ fontSize: '0.85rem', marginBottom: '4px' }}>
                      2. Prescriptions / Notes
                    </label>
                    <textarea
                      value={prescriptions}
                      onChange={(e) => setPrescriptions(e.target.value)}
                      placeholder="e.g. No active prescriptions needed. Recommendation for topical calamine if skin itchiness persists."
                      className="form-control"
                      style={{ fontSize: '0.85rem', minHeight: '80px', resize: 'vertical', fontFamily: 'var(--font-body)' }}
                      disabled={selectedCase.status === 'Resolved'}
                    />
                  </div>

                  {/* Diagnostic Summary display */}
                  <div style={{ background: 'var(--bg-soft)', padding: '12px', borderRadius: '8px', fontSize: '0.8rem', borderLeft: '3px solid var(--secondary-purple)' }}>
                    <strong>🔒 Safe & Anonymous Intake</strong>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>
                      Saving these notes compiles them into the patient's Pre-Visit Summary Card. No identifying student details are recorded.
                    </p>
                  </div>
                </div>

                {/* Save and Actions Footer */}
                {selectedCase.status !== 'Resolved' ? (
                  <div style={{ display: 'flex', gap: '10px', marginTop: '20px', borderTop: '1px solid var(--border-light)', paddingTop: '16px' }}>
                    <button
                      className="btn btn-outline"
                      style={{ flex: 1, padding: '10px', fontSize: '0.85rem' }}
                      onClick={handleSaveClinicalNotes}
                    >
                      Save Treatment Sheet
                    </button>
                    <button
                      className="btn btn-primary"
                      style={{ flex: 1, padding: '10px', fontSize: '0.85rem', background: 'var(--green-success)' }}
                      onClick={handleResolveCase}
                    >
                      <CheckCircle size={16} />
                      Resolve Case
                    </button>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', color: 'var(--green-success)', fontWeight: 600, fontSize: '0.9rem', padding: '12px', background: 'var(--green-success-bg)', borderRadius: '8px', marginTop: '20px' }}>
                    ✓ Case Resolved & Archived
                  </div>
                )}
              </div>

            </div>
          ) : (
            <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'var(--text-muted)', textAlign: 'center', padding: '40px' }}>
              <MessageSquare size={48} style={{ color: 'var(--border-light)', marginBottom: '16px' }} />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>No Case Selected</h3>
              <p style={{ fontSize: '0.9rem', maxWidth: '300px', marginTop: '4px' }}>
                Select a consultation case from the sidebar to review intake data and chat.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
