import React, { useState, useEffect } from 'react';
import { Shield, Plus, MessageSquare, Trash2, ArrowRight, Info } from 'lucide-react';
import ConsultationWizard from '../components/ConsultationWizard';
import ConsultationDetails from './ConsultationDetails';

export default function Consultations({ currentUser, setView }) {
  const [consultations, setConsultations] = useState([]);
  const [activeWizard, setActiveWizard] = useState(false);
  const [selectedConsultationId, setSelectedConsultationId] = useState(null);

  useEffect(() => {
    const savedConsultations = localStorage.getItem('bloom_consultations');
    if (savedConsultations) {
      setConsultations(JSON.parse(savedConsultations));
    } else {
      // Default consultation matching Consultations.png & Consultation details.png
      const defaultConsultations = [
        {
          id: 'bloom-c-982173',
          concern: 'Unusual discharge and mild lower abdominal pain',
          doctorName: 'Dr. Abena Mensah',
          doctorTitle: 'Sexual Health Nurse Practitioner',
          date: 'May 15, 2026',
          status: 'Response Ready',
          severity: 'Moderate',
          contraceptionCheck: 'No',
          pregnancyHistory: 'No',
          symptoms: ['Unusual vaginal discharge', 'Lower abdominal pain'],
          helps: ['Understand what my symptoms might relate to', 'Knowing which specialist of department to visit'],
          historyNotes: {
            otherSymptoms: 'None',
            medications: 'None',
            allergies: 'None'
          },
          messages: [
            {
              sender: 'doctor',
              text: "Hello! I have reviewed your concern about the spotting and mild abdominal pain. Given it has been occurring for 3 days, it might be due to minor hormonal fluctuations, or a local irritation. However, to be safe, I recommend taking the pre-visit summary from here to the campus health services clinic for a quick examination. I have prepared it for you.",
              time: '09:12 AM'
            }
          ]
        }
      ];
      setConsultations(defaultConsultations);
      localStorage.setItem('bloom_consultations', JSON.stringify(defaultConsultations));
    }
  }, []);

  const handleWizardSubmit = (newCons) => {
    const updated = [newCons, ...consultations];
    setConsultations(updated);
    localStorage.setItem('bloom_consultations', JSON.stringify(updated));
  };

  const handleAddMessage = (consId, newMessage) => {
    const updated = consultations.map((cons) => {
      if (cons.id === consId) {
        return {
          ...cons,
          status: newMessage.sender === 'user' ? 'Response Ready' : 'Response Ready', // update or keep status
          messages: [...cons.messages, newMessage]
        };
      }
      return cons;
    });
    setConsultations(updated);
    localStorage.setItem('bloom_consultations', JSON.stringify(updated));
  };

  const handleDeleteConsultation = (id, e) => {
    e.stopPropagation();
    if (window.confirm("Permanently delete this consultation and all its messages? This action cannot be undone.")) {
      const filtered = consultations.filter(c => c.id !== id);
      setConsultations(filtered);
      localStorage.setItem('bloom_consultations', JSON.stringify(filtered));
      if (selectedConsultationId === id) {
        setSelectedConsultationId(null);
      }
    }
  };

  // If not logged in, show auth prompt
  if (!currentUser) {
    return (
      <div className="container animate-fade-in" style={{ padding: '60px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '480px', margin: '0 auto' }} className="card">
          <Shield size={48} style={{ color: 'var(--primary-pink)', marginBottom: '16px', marginInline: 'auto' }} />
          <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Log In Required</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '24px' }}>
            To protect your privacy and retrieve your active consultations, please log in with a nickname. No real name required.
          </p>
          <button className="btn btn-primary" onClick={() => setView('signin')} style={{ background: 'var(--primary-pink)' }}>
            Go to Log In
          </button>
        </div>
      </div>
    );
  }

  // If detailed consultation selected, view it
  if (selectedConsultationId) {
    const selectedCons = consultations.find(c => c.id === selectedConsultationId);
    if (selectedCons) {
      return (
        <ConsultationDetails
          consultation={selectedCons}
          onBack={() => setSelectedConsultationId(null)}
          onAddMessage={handleAddMessage}
        />
      );
    }
  }

  // If wizard is active, show the step intake flow
  if (activeWizard) {
    return (
      <div className="container">
        <ConsultationWizard
          onCancel={() => setActiveWizard(false)}
          onSubmitSuccess={handleWizardSubmit}
        />
      </div>
    );
  }

  return (
    <div className="container animate-fade-in">
      {/* Privacy Notice Info Banner */}
      <div className="info-banner">
        <Info className="info-icon" size={24} />
        <p>
          🔒 All consultation details and messages are stored locally on your device for absolute privacy. You can permanently delete consultation logs at any time.
        </p>
      </div>

      <div className="view-header" style={{ display: 'flex', justifySpace: 'between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', justifyContent: 'space-between' }}>
        <div>
          <h1 className="view-title">Consultations</h1>
          <p className="view-subtitle">Ask questions and seek guidance anonymously from specialists</p>
        </div>
        <button 
          className="btn btn-primary" 
          onClick={() => setActiveWizard(true)}
          style={{ background: 'var(--primary-pink)' }}
        >
          <Plus size={18} />
          File New Consultation
        </button>
      </div>

      {consultations.length > 0 ? (
        <div style={{ overflowX: 'auto', marginTop: '24px' }}>
          <table className="consultations-table">
            <thead>
              <tr>
                <th>Reference ID</th>
                <th>Specialist</th>
                <th>Concern Topic</th>
                <th>Filed Date</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {consultations.map((cons) => (
                <tr 
                  key={cons.id} 
                  onClick={() => setSelectedConsultationId(cons.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <td style={{ fontFamily: 'monospace', fontWeight: 600, color: 'var(--primary-pink)' }}>
                    {cons.id}
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--dark-navy)' }}>{cons.doctorName}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{cons.doctorTitle}</div>
                  </td>
                  <td>
                    <div style={{ maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {cons.concern}
                    </div>
                  </td>
                  <td style={{ fontSize: '0.9rem' }}>{cons.date}</td>
                  <td>
                    <span className={`status-badge ${cons.status === 'Response Ready' ? 'status-ready' : 'status-submitted'}`}>
                      {cons.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', alignItems: 'center' }}>
                      <button 
                        className="icon-btn" 
                        style={{ color: 'var(--primary-pink)' }}
                        onClick={() => setSelectedConsultationId(cons.id)}
                        title="View Conversation"
                      >
                        <ArrowRight size={18} />
                      </button>
                      <button 
                        className="icon-btn" 
                        style={{ color: 'var(--danger-red)' }}
                        onClick={(e) => handleDeleteConsultation(cons.id, e)}
                        title="Delete Consultation"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="card" style={{ padding: '60px', textAlign: 'center', color: 'var(--text-secondary)', marginTop: '24px' }}>
          <MessageSquare size={48} style={{ color: 'var(--text-muted)', marginBottom: '16px', marginInline: 'auto' }} />
          <p style={{ fontSize: '1.1rem', marginBottom: '8px' }}>No consultations filed yet.</p>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '24px' }}>Get professional, secure, and completely anonymous guidance from specialists.</p>
          <button className="btn btn-primary" onClick={() => setActiveWizard(true)} style={{ background: 'var(--primary-pink)' }}>
            Start Consultation Wizard
          </button>
        </div>
      )}
    </div>
  );
}
