import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ShieldCheck, Check, Heart, Sparkles, CheckSquare, Square, Info } from 'lucide-react';
import { mockDoctors } from '../mockData';

export default function ConsultationWizard({ onCancel, onSubmitSuccess }) {
  const [step, setStep] = useState(1);
  const totalSteps = 7;

  // Consultation form state variables
  const [disclaimerAgreed, setDisclaimerAgreed] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState(mockDoctors[0].id);
  const [concernText, setConcernText] = useState('');
  const [severity, setSeverity] = useState('Moderate');

  // Step 4 (History)
  const [contraceptionCheck, setContraceptionCheck] = useState('No');
  const [pregnancyHistory, setPregnancyHistory] = useState('No');

  // Step 5 (Symptoms)
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [otherSymptoms, setOtherSymptoms] = useState('None');
  const [medications, setMedications] = useState('None');
  const [allergies, setAllergies] = useState('None');

  // Step 6 (Help needed)
  const [selectedHelps, setSelectedHelps] = useState([]);
  const [extraProfessionalInfo, setExtraProfessionalInfo] = useState('None');

  // Step 7 (Privacy confirm)
  const [privacyAgreed, setPrivacyAgreed] = useState(false);

  const toggleSymptom = (symptom) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const toggleHelp = (help) => {
    if (selectedHelps.includes(help)) {
      setSelectedHelps(selectedHelps.filter(h => h !== help));
    } else {
      setSelectedHelps([...selectedHelps, help]);
    }
  };

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!privacyAgreed) return;

    const doctor = mockDoctors.find(doc => doc.id === selectedDoctorId);

    const submission = {
      id: `bloom-c-${Date.now().toString().slice(-6)}`,
      concern: concernText || "Unspecified concern",
      doctorName: doctor ? doctor.name : "Healthcare Professional",
      doctorTitle: doctor ? doctor.title : "Specialist",
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      status: 'Submitted',
      severity,
      contraceptionCheck,
      pregnancyHistory,
      symptoms: selectedSymptoms,
      helps: selectedHelps,
      historyNotes: {
        otherSymptoms,
        medications,
        allergies
      },
      messages: [
        {
          sender: 'doctor',
          text: `Hello! I have received your consultation details regarding "${concernText}". I am currently reviewing your health profile and will provide advice within 24-48 hours. Let me know if you have any other details to share.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]
    };

    onSubmitSuccess(submission);
    setStep(8); // success screen
  };

  const progressPercentage = (step / totalSteps) * 100;

  // STEP 8: SUCCESS SCREEN
  if (step === 8) {
    return (
      <div className="success-screen-container animate-fade-in">
        <div className="success-check-circle">
          <Check size={48} strokeWidth={3} />
        </div>
        <h1 className="success-title">Your consultation has been submitted</h1>
        <p className="success-desc">
          Your selected professional will review your information and respond within 24–48 hours. You will receive a notification when your response is ready.
        </p>

        <div className="flow-steps-timeline">
          <div className="timeline-step-item active">
            <div className="timeline-step-number">1</div>
            <span className="timeline-step-label">Your info is reviewed</span>
          </div>
          <div className="timeline-step-item">
            <div className="timeline-step-number">2</div>
            <span className="timeline-step-label">You receive guidance</span>
          </div>
          <div className="timeline-step-item">
            <div className="timeline-step-number">3</div>
            <span className="timeline-step-label">You visit prepared</span>
          </div>
        </div>

        <button 
          className="btn btn-coral" 
          style={{ width: '280px', marginTop: '16px', background: 'var(--coral-button)' }}
          onClick={onCancel} // Exits the wizard back to the dashboard
        >
          Back to Consultations
        </button>
      </div>
    );
  }

  return (
    <div className="wizard-container animate-fade-in">
      <div className="wizard-header">
        <h2 style={{ fontSize: '1.4rem' }}>New Consultation</h2>
        <span className="wizard-step-info">Step {step} of {totalSteps}</span>
      </div>

      <div className="wizard-progress-bar-container">
        <div className="wizard-progress-bar" style={{ width: `${progressPercentage}%` }}></div>
      </div>

      {/* STEP 1: Medical Disclaimer */}
      {step === 1 && (
        <div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>Step 1 — Medical Disclaimer & Consent</h3>
          <div className="info-banner" style={{ background: 'var(--danger-red-bg)', borderColor: 'rgba(239, 68, 68, 0.2)', marginBottom: '24px' }}>
            <Info size={24} style={{ color: 'var(--danger-red)' }} />
            <div>
              <h4 style={{ color: 'var(--danger-red-text)', marginBottom: '4px' }}>Important Notice</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--danger-red-text)' }}>
                This is an asynchronous, educational guidance platform. It is NOT for emergencies. If you are experiencing severe pain, heavy bleeding, or a medical crisis, please go to the nearest emergency clinic immediately.
              </p>
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
              By submitting this consultation, you acknowledge that the feedback received is guidance, not a formal diagnosis or prescription. Your files are treated under strict confidentiality according to the Ghana Data Protection Act.
            </p>
            <label className="symptom-checkbox-label" style={{ padding: '14px' }}>
              <input 
                type="checkbox" 
                checked={disclaimerAgreed} 
                onChange={(e) => setDisclaimerAgreed(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: 'var(--primary-pink)' }}
              />
              <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                I understand that this is not for emergency care and agree to the terms.
              </span>
            </label>
          </div>

          <div className="wizard-actions">
            <button className="btn btn-outline" onClick={onCancel}>Cancel</button>
            <button 
              className="btn btn-primary" 
              onClick={nextStep} 
              disabled={!disclaimerAgreed}
              style={{ background: 'var(--primary-pink)', opacity: disclaimerAgreed ? 1 : 0.5 }}
            >
              Continue
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Choose Specialist */}
      {step === 2 && (
        <div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>Step 2 — Select Healthcare Practitioner</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px' }}>
            Select the professional you would like to review your inquiry:
          </p>

          <div style={{ marginBottom: '24px' }}>
            {mockDoctors.map((doc) => (
              <div 
                key={doc.id}
                className={`doctor-select-card ${selectedDoctorId === doc.id ? 'selected' : ''}`}
                onClick={() => setSelectedDoctorId(doc.id)}
              >
                <div className="doctor-info-left">
                  <span className="doctor-name-card">{doc.name}</span>
                  <span className="doctor-title-card">{doc.title}</span>
                  <span className="doctor-bio-card">{doc.bio}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    🏢 {doc.hospital} • 🏆 {doc.experience}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {selectedDoctorId === doc.id ? (
                    <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'var(--primary-pink)', display: 'flex', alignItems: 'center', justifySpace: 'center', color: 'white' }}>
                      <Check size={14} style={{ marginInline: 'auto' }} />
                    </div>
                  ) : (
                    <div style={{ width: '22px', height: '22px', borderRadius: '50%', border: '2px solid var(--border-light)' }}></div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="wizard-actions">
            <button className="btn btn-outline" onClick={prevStep}>Go Back</button>
            <button className="btn btn-primary" onClick={nextStep} style={{ background: 'var(--primary-pink)' }}>
              Continue
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Describe Concern */}
      {step === 3 && (
        <div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>Step 3 — Describe Your Concern</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px' }}>
            Briefly describe what you are experiencing, how long it has been going on, and any worries you have.
          </p>

          <div className="form-group">
            <label className="form-label">Tell us about your concern</label>
            <textarea
              className="form-control"
              rows="6"
              placeholder="e.g. I have been having mild abdominal pain and unexpected spotting for the last 3 days..."
              value={concernText}
              onChange={(e) => setConcernText(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label className="form-label">How urgent is this concern to you?</label>
            <div className="severity-select">
              <button
                type="button"
                className={`severity-btn severity-btn-low ${severity === 'Low' ? 'selected' : ''}`}
                onClick={() => setSeverity('Low')}
              >
                Low urgency
              </button>
              <button
                type="button"
                className={`severity-btn severity-btn-moderate ${severity === 'Moderate' ? 'selected' : ''}`}
                onClick={() => setSeverity('Moderate')}
              >
                Moderate urgency
              </button>
              <button
                type="button"
                className={`severity-btn severity-btn-severe ${severity === 'Severe' ? 'selected' : ''}`}
                onClick={() => setSeverity('Severe')}
              >
                High urgency
              </button>
            </div>
          </div>

          <div className="wizard-actions">
            <button className="btn btn-outline" onClick={prevStep}>Go Back</button>
            <button 
              className="btn btn-primary" 
              onClick={nextStep}
              disabled={!concernText.trim()}
              style={{ background: 'var(--primary-pink)', opacity: concernText.trim() ? 1 : 0.5 }}
            >
              Continue
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Health History */}
      {step === 4 && (
        <div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>Step 4 — Basic Health History</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px' }}>
            Answer these brief history questions to give the practitioner context.
          </p>

          <div className="form-group">
            <label className="form-label">Are you currently using any contraception?</label>
            <select
              className="form-control"
              value={contraceptionCheck}
              onChange={(e) => setContraceptionCheck(e.target.value)}
            >
              <option value="No">No</option>
              <option value="Daily Pill">Daily Oral Pill</option>
              <option value="IUD">Intrauterine Device (IUD)</option>
              <option value="Implant">Implants</option>
              <option value="Condoms">Condoms primarily</option>
              <option value="Other">Other method</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Is there any chance you might be pregnant?</label>
            <select
              className="form-control"
              value={pregnancyHistory}
              onChange={(e) => setPregnancyHistory(e.target.value)}
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
              <option value="Unsure">Unsure</option>
            </select>
          </div>

          <div className="wizard-actions">
            <button className="btn btn-outline" onClick={prevStep}>Go Back</button>
            <button className="btn btn-primary" onClick={nextStep} style={{ background: 'var(--primary-pink)' }}>
              Continue
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: Symptoms Checklist */}
      {step === 5 && (
        <div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>Step 5 — Select Current Symptoms</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px' }}>
            Select all symptoms you are currently experiencing:
          </p>

          <div className="symptoms-checkbox-grid" style={{ marginBottom: '24px' }}>
            {[
              'Unusual vaginal discharge',
              'Nausea or Vomiting',
              'Unusual bleeding',
              'Sores or Bumps',
              'Pain during sex',
              'Skin changes',
              'Chills or Fever',
              'Lower abdominal pain',
              'Fatigue',
              'No symptoms-seeking info'
            ].map((sym) => {
              const isSelected = selectedSymptoms.includes(sym);
              return (
                <div 
                  key={sym} 
                  className={`symptom-checkbox-label ${isSelected ? 'selected' : ''}`}
                  onClick={() => toggleSymptom(sym)}
                >
                  <div style={{ width: '18px', height: '18px', borderRadius: '4px', border: '2px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: isSelected ? 'var(--green-success)' : 'white', borderColor: isSelected ? 'var(--green-success)' : 'var(--border-light)' }}>
                    {isSelected && <Check size={12} style={{ color: 'white' }} />}
                  </div>
                  <span>{sym}</span>
                </div>
              );
            })}
          </div>

          <div className="form-group">
            <label className="form-label">Any other symptoms? (optional)</label>
            <input
              type="text"
              className="form-control"
              value={otherSymptoms}
              onChange={(e) => setOtherSymptoms(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Current medications</label>
            <input
              type="text"
              className="form-control"
              value={medications}
              onChange={(e) => setMedications(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Known allergies</label>
            <input
              type="text"
              className="form-control"
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
            />
          </div>

          <div className="wizard-actions">
            <button className="btn btn-outline" onClick={prevStep}>Go Back</button>
            <button className="btn btn-primary" onClick={nextStep} style={{ background: 'var(--primary-pink)' }}>
              Continue
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 6: Help Needed */}
      {step === 6 && (
        <div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>Step 6 — What Do You Need Help With?</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px' }}>
            Check what guidance you want from the professional:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
            {[
              'Understand what my symptoms might relate to',
              'Finding out how urgently i need to go',
              'Knowing which specialist of department to visit',
              'General information about my concern',
              'Understanding my contraception options'
            ].map((helpItem) => {
              const isSelected = selectedHelps.includes(helpItem);
              return (
                <div 
                  key={helpItem} 
                  className={`symptom-checkbox-label ${isSelected ? 'selected' : ''}`}
                  onClick={() => toggleHelp(helpItem)}
                >
                  <div style={{ width: '18px', height: '18px', borderRadius: '4px', border: '2px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: isSelected ? 'var(--green-success)' : 'white', borderColor: isSelected ? 'var(--green-success)' : 'var(--border-light)' }}>
                    {isSelected && <Check size={12} style={{ color: 'white' }} />}
                  </div>
                  <span>{helpItem}</span>
                </div>
              );
            })}
          </div>

          <div className="form-group">
            <label className="form-label">Anything else you want the professional to know? (optional)</label>
            <textarea
              className="form-control"
              rows="3"
              value={extraProfessionalInfo}
              onChange={(e) => setExtraProfessionalInfo(e.target.value)}
            ></textarea>
          </div>

          <div className="wizard-actions">
            <button className="btn btn-outline" onClick={prevStep}>Go Back</button>
            <button className="btn btn-primary" onClick={nextStep} style={{ background: 'var(--primary-pink)' }}>
              Continue
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 7: Confirm & Submit */}
      {step === 7 && (
        <div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>Step 7 — Privacy Confirmation & Submit</h3>
          
          <div style={{ background: 'rgba(236, 72, 153, 0.05)', border: '1px solid rgba(236, 72, 153, 0.2)', padding: '24px', borderRadius: '12px', marginBottom: '24px' }}>
            <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600 }}>Your consultation will be sent to</span>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--coral-button)', marginTop: '4px' }}>
              {mockDoctors.find(d => d.id === selectedDoctorId)?.name || 'Healthcare Practitioner'}
            </div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
              {mockDoctors.find(d => d.id === selectedDoctorId)?.title || 'Specialist'}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <span style={{ color: 'var(--green-success)', fontWeight: 'bold' }}>✓</span>
              Your display name (not real name) is used
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <span style={{ color: 'var(--green-success)', fontWeight: 'bold' }}>✓</span>
              Your university is visible to the professional
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <span style={{ color: 'var(--green-success)', fontWeight: 'bold' }}>✓</span>
              Your submission is encrypted
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <span style={{ color: 'var(--green-success)', fontWeight: 'bold' }}>✓</span>
              You can delete this consultation at any time
            </div>

            <label className="symptom-checkbox-label" style={{ padding: '14px', marginTop: '16px' }}>
              <input 
                type="checkbox" 
                checked={privacyAgreed} 
                onChange={(e) => setPrivacyAgreed(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: 'var(--primary-pink)' }}
              />
              <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                I confirm I understand this is not a medical diagnosis and I will seek in-person care as directed.
              </span>
            </label>
          </div>

          <div className="wizard-actions">
            <button className="btn btn-outline" onClick={prevStep}>Go Back</button>
            <button 
              className="btn btn-coral" 
              onClick={handleSubmit} 
              disabled={!privacyAgreed}
              style={{ background: 'var(--coral-button)', opacity: privacyAgreed ? 1 : 0.5 }}
            >
              Submit Consultation
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
