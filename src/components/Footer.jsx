import React from 'react';
import { Heart } from 'lucide-react';

export default function Footer({ setView }) {
  return (
    <footer className="app-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <h3 className="footer-brand-title">
              <Heart size={20} fill="white" style={{ color: 'var(--primary-pink)' }} />
              Bloom
            </h3>
            <p className="footer-brand-desc">
              Empowering female students with trusted sexual health information, community connection, and professional support.
            </p>
          </div>

          <div className="footer-links-grid">
            <div>
              <h4 className="footer-col-title">Quick Links</h4>
              <ul className="footer-link-list">
                <li><a href="#learn" onClick={() => setView('learn')}>Learn</a></li>
                <li><a href="#period" onClick={() => setView('period-tracker')}>Period Tracker</a></li>
                <li><a href="#consult" onClick={() => setView('consultations')}>Consult</a></li>
                <li><a href="#community" onClick={() => setView('community')}>Community</a></li>
              </ul>
            </div>

            <div>
              <h4 className="footer-col-title">Support</h4>
              <ul className="footer-link-list">
                <li><a href="#emergency" onClick={(e) => { e.preventDefault(); alert('Emergency helpline: Call 112 or local campus clinic security'); }}>Emergency Help</a></li>
                <li><a href="#faq" onClick={(e) => { e.preventDefault(); alert('FAQ: Bloom uses secure cookies & localStorage to preserve privacy.'); }}>FAQ</a></li>
                <li><a href="#contact" onClick={(e) => { e.preventDefault(); alert('Support team: support@bloomhealth.org'); }}>Contact Us</a></li>
              </ul>
            </div>

            <div>
              <h4 className="footer-col-title">Legal</h4>
              <ul className="footer-link-list">
                <li><a href="#privacy" onClick={(e) => { e.preventDefault(); alert('Privacy policy: Ghana Data Protection Act (Act 843) Compliant. No third-party sharing.'); }}>Privacy Policy</a></li>
                <li><a href="#terms" onClick={(e) => { e.preventDefault(); alert('Terms of Use: For educational use only.'); }}>Terms Of Use</a></li>
                <li><a href="#disclaimer" onClick={(e) => { e.preventDefault(); alert('Disclaimer: This platform does not provide medical prescriptions.'); }}>Medical Disclaimer</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Bloom. All rights reserved. • Ghana Data Protection Compliant</p>
          <p style={{ opacity: 0.7, fontSize: '0.75rem', maxWidth: '800px', margin: '0 auto' }}>
            This platform does not provide medical diagnosis or prescriptions. Always consult a healthcare professional.
          </p>
        </div>
      </div>
    </footer>
  );
}
