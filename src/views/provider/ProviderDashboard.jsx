import React, { useState, useEffect } from 'react';
import { Activity, Clock, Calendar, Users, CheckCircle, MessageSquare, ArrowRight, Clipboard } from 'lucide-react';

export default function ProviderDashboard({ currentUser, setView }) {
  const [consultations, setConsultations] = useState([]);
  
  useEffect(() => {
    const savedConsultations = localStorage.getItem('bloom_consultations');
    if (savedConsultations) {
      setConsultations(JSON.parse(savedConsultations));
    } else {
      // Default list of consultations for rich dashboard representation
      const defaultConsultations = [
        {
          id: 'bloom-c-982173',
          concern: 'Unusual discharge and mild lower abdominal pain',
          doctorName: 'Dr. Abena Mensah',
          doctorTitle: 'Sexual Health Nurse Practitioner',
          date: 'Jun 10, 2026',
          status: 'Under Review',
          severity: 'Moderate',
          studentName: 'Anonymous Tulip',
          contraceptionCheck: 'No',
          pregnancyHistory: 'No',
          symptoms: ['Unusual vaginal discharge', 'Lower abdominal pain'],
          helps: ['Understand what my symptoms might relate to'],
          historyNotes: { otherSymptoms: 'None', medications: 'None', allergies: 'None' },
          messages: [
            { sender: 'user', text: "Hello doctor, I've had unusual discharge for 3 days and minor lower stomach pain. Should I be worried?", time: '10:15 AM' }
          ]
        },
        {
          id: 'bloom-c-102947',
          concern: 'Severe cramps preventing lecture attendance',
          doctorName: 'Dr. Abena Mensah',
          doctorTitle: 'Sexual Health Nurse Practitioner',
          date: 'Jun 12, 2026',
          status: 'Submitted',
          severity: 'High',
          studentName: 'Anonymous Rose',
          contraceptionCheck: 'No',
          pregnancyHistory: 'No',
          symptoms: ['Severe menstrual pain', 'Nausea'],
          helps: ['Get prescription relief', 'Know if I need an in-person visit'],
          historyNotes: { otherSymptoms: 'Nausea on day 1', medications: 'Ibuprofen (ineffective)', allergies: 'None' },
          messages: [
            { sender: 'user', text: "The cramps are so bad I can barely walk. Over-the-counter ibuprofen isn't helping at all.", time: '08:30 AM' }
          ]
        },
        {
          id: 'bloom-c-572910',
          concern: 'Missed cycle tracking help',
          doctorName: 'Dr. Abena Mensah',
          doctorTitle: 'Sexual Health Nurse Practitioner',
          date: 'Jun 11, 2026',
          status: 'Response Ready',
          severity: 'Mild',
          studentName: 'Anonymous Orchid',
          contraceptionCheck: 'Yes',
          pregnancyHistory: 'No',
          symptoms: ['Late period'],
          helps: ['Understand cycle irregularities'],
          historyNotes: { otherSymptoms: 'Stress due to exams', medications: 'None', allergies: 'None' },
          messages: [
            { sender: 'user', text: "Hi, my period is 6 days late. I did a pregnancy test and it was negative, but I'm stressed.", time: '11:00 AM' },
            { sender: 'doctor', text: "Hello! Exam stress can definitely delay ovulation. Keep tracking and let's check in if it reaches 14 days late.", time: '11:45 AM' }
          ]
        },
        {
          id: 'bloom-c-890214',
          concern: 'Contraceptive patch side effects query',
          doctorName: 'Dr. Abena Mensah',
          doctorTitle: 'Sexual Health Nurse Practitioner',
          date: 'May 28, 2026',
          status: 'Resolved',
          severity: 'Mild',
          studentName: 'Anonymous Lily',
          contraceptionCheck: 'Yes',
          pregnancyHistory: 'No',
          symptoms: ['Skin irritation under patch'],
          helps: ['Switch contraceptive method'],
          historyNotes: { otherSymptoms: 'Itching', medications: 'Evra Patch', allergies: 'None' },
          messages: [
            { sender: 'user', text: "I have red itchy skin right under where I apply the patch. Is that normal?", time: '02:15 PM' },
            { sender: 'doctor', text: "Some skin irritation is common. Try changing application sites. If it persists, we can switch to oral contraceptives.", time: '04:00 PM' }
          ]
        }
      ];
      setConsultations(defaultConsultations);
      localStorage.setItem('bloom_consultations', JSON.stringify(defaultConsultations));
    }
  }, []);

  // Calculate statistics
  const activeCases = consultations.filter(c => c.status !== 'Resolved');
  const pendingResponses = consultations.filter(c => c.status === 'Submitted' || c.status === 'Under Review');
  const resolvedCount = consultations.filter(c => c.status === 'Resolved').length;

  const mockAppointments = [
    { id: 1, time: '09:30 AM', patient: 'Anonymous Case #982173', type: 'Chat Consult', status: 'Confirmed' },
    { id: 2, time: '11:15 AM', patient: 'Anonymous Case #102947', type: 'Chat Consult', status: 'Pending Intake' },
    { id: 3, time: '02:00 PM', patient: 'Anonymous Case #572910', type: 'Follow Up', status: 'Confirmed' }
  ];

  const getSeverityBadge = (sev) => {
    switch (sev) {
      case 'High':
        return <span className="badge" style={{ background: 'var(--danger-red-bg)', color: 'var(--danger-red-text)' }}>High</span>;
      case 'Moderate':
        return <span className="badge" style={{ background: 'var(--warning-amber-bg)', color: 'var(--warning-amber-text)' }}>Moderate</span>;
      default:
        return <span className="badge" style={{ background: 'var(--green-success-bg)', color: 'var(--green-success-text)' }}>Mild</span>;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Resolved':
        return <span className="status-badge status-ready" style={{ background: 'var(--green-success-bg)', color: 'var(--green-success-text)' }}>Resolved</span>;
      case 'Response Ready':
        return <span className="status-badge status-ready">Replied</span>;
      case 'Under Review':
        return <span className="status-badge status-submitted" style={{ background: 'rgba(124, 58, 237, 0.1)', color: 'var(--secondary-purple)' }}>Under Review</span>;
      default:
        return <span className="status-badge status-submitted">New Request</span>;
    }
  };

  return (
    <div className="container animate-fade-in" style={{ paddingBottom: '60px' }}>
      <div className="view-header">
        <h1 className="view-title">Welcome back, {currentUser?.name || 'Practitioner'}</h1>
        <p className="view-subtitle">Bloom Health Professional Portal — Manage cases and student wellness securely</p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ background: 'rgba(236, 72, 153, 0.1)', color: 'var(--primary-pink)', padding: '12px', borderRadius: '12px' }}>
            <Clipboard size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Active Cases</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--dark-navy)' }}>{activeCases.length}</div>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ background: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning-amber)', padding: '12px', borderRadius: '12px' }}>
            <Clock size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Pending Action</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--dark-navy)' }}>{pendingResponses.length}</div>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--green-success)', padding: '12px', borderRadius: '12px' }}>
            <CheckCircle size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Resolved Cases</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--dark-navy)' }}>{resolvedCount}</div>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ background: 'rgba(124, 58, 237, 0.1)', color: 'var(--secondary-purple)', padding: '12px', borderRadius: '12px' }}>
            <Activity size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Avg. Response</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--dark-navy)' }}>1.8 hrs</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px', alignItems: 'start' }}>
        {/* Recent Cases */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '1.4rem' }}>Recent Incoming Cases</h2>
            <button className="btn btn-outline" onClick={() => setView('provider-inbox')} style={{ padding: '6px 12px', fontSize: '0.85rem' }}>
              View Case Inbox
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="card" style={{ padding: '0px', overflow: 'hidden' }}>
            <table className="consultations-table" style={{ margin: 0 }}>
              <thead>
                <tr>
                  <th>Case ID</th>
                  <th>Severity</th>
                  <th>Topic Concern</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {consultations.slice(0, 3).map((cons) => (
                  <tr key={cons.id} onClick={() => setView('provider-inbox')} style={{ cursor: 'pointer' }}>
                    <td style={{ fontFamily: 'monospace', fontWeight: 600, color: 'var(--primary-pink)' }}>
                      {cons.id}
                    </td>
                    <td>{getSeverityBadge(cons.severity)}</td>
                    <td>
                      <div style={{ maxWidth: '240px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 500 }}>
                        {cons.concern}
                      </div>
                    </td>
                    <td>{getStatusBadge(cons.status)}</td>
                    <td style={{ textAlign: 'right' }}>
                      <button className="icon-btn" style={{ color: 'var(--primary-pink)' }}>
                        <ArrowRight size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Schedule & Appointments */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '1.4rem' }}>Today's Sessions</h2>
            <button className="btn btn-outline" onClick={() => setView('provider-schedule')} style={{ padding: '6px 12px', fontSize: '0.85rem' }}>
              <Calendar size={14} />
            </button>
          </div>

          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {mockAppointments.map((app) => (
              <div key={app.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'var(--bg-soft)', borderRadius: '8px', borderLeft: '3px solid var(--primary-pink)' }}>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--dark-navy)' }}>{app.time}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{app.patient}</div>
                </div>
                <span className="badge" style={{ fontSize: '0.7rem', padding: '2px 8px', background: app.status === 'Confirmed' ? 'var(--green-success-bg)' : 'var(--border-light)', color: app.status === 'Confirmed' ? 'var(--green-success-text)' : 'var(--text-secondary)' }}>
                  {app.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
