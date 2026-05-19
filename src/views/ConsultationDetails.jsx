import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, CheckCircle, Download, Send, Check } from 'lucide-react';

export default function ConsultationDetails({ consultation, onBack, onAddMessage }) {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [consultation.messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage = {
      sender: 'user',
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    onAddMessage(consultation.id, userMessage);
    setInputText('');

    // Simulate doctor typing and replying after 2 seconds!
    setTimeout(() => {
      const doctorReplies = [
        "Thank you for sharing that. Have you noticed if the symptoms worsen at specific times of the day?",
        "I understand. Based on your health history, I would suggest booking a physical examination at the campus health clinic just to be sure. I've compiled this in your pre-visit summary.",
        "That is helpful context. Keep tracking your cycle on the Bloom calendar so we can see if there is any hormonal correlation.",
        "I recommend avoiding any heavily scented soaps or body washes for now, as they can cause irritation. Let me know if you experience chills or fever."
      ];
      
      const randomReply = doctorReplies[Math.floor(Math.random() * doctorReplies.length)];
      
      const docMessage = {
        sender: 'doctor',
        text: randomReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      onAddMessage(consultation.id, docMessage);
    }, 2000);
  };

  const downloadSummary = () => {
    const summaryText = `
BLOOM CONSULTATION PRE-VISIT SUMMARY
-------------------------------------
Reference ID: ${consultation.id}
Submitted: ${consultation.date}
Specialist: ${consultation.doctorName} (${consultation.doctorTitle})
Urgency Level: ${consultation.severity}

Patient Concern:
"${consultation.concern}"

History & Context:
- Contraception: ${consultation.contraceptionCheck}
- Possible Pregnancy: ${consultation.pregnancyHistory}

Logged Symptoms:
${consultation.symptoms.length > 0 ? consultation.symptoms.map(s => `- ${s}`).join('\n') : '- None reported'}

Medicines & Allergies:
- Medications: ${consultation.historyNotes?.medications || 'None'}
- Allergies: ${consultation.historyNotes?.allergies || 'None'}
- Other symptoms: ${consultation.historyNotes?.otherSymptoms || 'None'}

Help Intents Requested:
${consultation.helps.length > 0 ? consultation.helps.map(h => `- ${h}`).join('\n') : '- None selected'}

-------------------------------------
Disclaimer: This is educational guidance compiled on Bloom. Please present this file to your clinic nurse or physician.
`;
    
    const element = document.createElement("a");
    const file = new Blob([summaryText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `Bloom-Summary-${consultation.id}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="container animate-fade-in">
      <button className="breadcrumb-back" onClick={onBack}>
        <ArrowLeft size={16} />
        Back to Consultations List
      </button>

      {/* Response Status Card Banner */}
      <div className="medically-reviewed-box" style={{ background: '#ecfdf5', borderColor: '#10b981', color: '#065f46', marginBottom: '28px', marginTop: 0 }}>
        <CheckCircle size={24} style={{ color: '#10b981' }} />
        <div>
          <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>Response Ready</span>
          <p style={{ fontSize: '0.85rem', opacity: 0.9 }}>This consultation has a response from your doctor. Review details below.</p>
        </div>
      </div>

      <div className="consultation-details-grid">
        {/* Left Column: Details Summary */}
        <div className="card cons-summary-card">
          <h3 style={{ fontSize: '1.25rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '12px', color: 'var(--dark-navy)' }}>
            Consultation Details
          </h3>

          <div className="summary-detail-item">
            <span className="summary-detail-label">Reference ID</span>
            <div className="summary-detail-value" style={{ fontFamily: 'monospace', fontSize: '1rem', color: 'var(--primary-pink)' }}>
              {consultation.id}
            </div>
          </div>

          <div className="summary-detail-item">
            <span className="summary-detail-label">Your Concern</span>
            <div className="summary-detail-value" style={{ fontWeight: 'normal', lineHeight: '1.5' }}>
              "{consultation.concern}"
            </div>
          </div>

          <div className="summary-detail-item">
            <span className="summary-detail-label">Assigned Specialist</span>
            <div className="summary-detail-value">
              {consultation.doctorName}
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 'normal' }}>
                {consultation.doctorTitle}
              </div>
            </div>
          </div>

          <div className="summary-detail-item">
            <span className="summary-detail-label">Urgency & Date</span>
            <div className="summary-detail-value" style={{ display: 'flex', gap: '8px', alignItems: 'center', fontWeight: 'normal' }}>
              <span className={`status-badge ${
                consultation.severity === 'Severe' ? 'status-ready' : 
                consultation.severity === 'Moderate' ? 'status-review' : 'status-submitted'
              }`} style={{ padding: '2px 8px', fontSize: '0.7rem' }}>
                {consultation.severity} Urgency
              </span>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                • Filed {consultation.date}
              </span>
            </div>
          </div>

          <button 
            className="btn btn-primary" 
            style={{ width: '100%', marginTop: '8px', background: 'var(--primary-pink)' }}
            onClick={downloadSummary}
          >
            <Download size={18} />
            Download pre-visit summary
          </button>
        </div>

        {/* Right Column: Interactive Chat Box */}
        <div className="chat-container">
          <div className="chat-header">
            <div className="chat-doctor-avatar">
              {consultation.doctorName.split(' ').pop().charAt(0)}
            </div>
            <div className="chat-doctor-info">
              <span className="chat-doctor-name">{consultation.doctorName}</span>
              <span className="chat-doctor-status">
                <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--green-success)' }}></span>
                Online Guidance
              </span>
            </div>
          </div>

          <div className="chat-messages">
            {consultation.messages.map((msg, index) => (
              <div 
                key={index} 
                className={`chat-message-bubble ${msg.sender === 'doctor' ? 'msg-doctor' : 'msg-user'}`}
              >
                <div>{msg.text}</div>
                <span className="msg-meta">{msg.time}</span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className="chat-input-bar">
            <input
              type="text"
              className="chat-input"
              placeholder="Ask a follow-up question..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              required
            />
            <button type="submit" className="chat-send-btn">
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
