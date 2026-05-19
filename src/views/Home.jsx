import React from 'react';
import { ArrowRight, BookOpen, ShieldCheck, Calendar, MessageSquare, Award, Lock, Sparkles, Heart } from 'lucide-react';

export default function Home({ setView, currentUser }) {
  return (
    <div className="container animate-fade-in">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-subtitle">Your Safe, Private Space</span>
          <h1 className="hero-title">
            Take Control of Your <span>Sexual Health</span>
          </h1>
          <p className="hero-desc">
            Bloom is a secure and private platform designed for female tertiary students. Connect anonymously with specialists, track cycles locally, and explore verified health resources.
          </p>
          <div className="hero-buttons">
            <button
              className="btn btn-primary"
              onClick={() => setView(currentUser ? 'consultations' : 'signin')}
            >
              Consult a Professional
              <ArrowRight size={18} />
            </button>
            <button
              className="btn btn-outline"
              onClick={() => setView('learn')}
            >
              Browse Articles
            </button>
          </div>
        </div>

        <div className="hero-illustration">
          <div className="spiral-bg">
            <div className="spiral-graphic">
              <Sparkles size={160} style={{ color: 'var(--primary-pink)', opacity: 0.8 }} />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section style={{ marginBottom: '80px' }}>
        <h2 className="home-section-title">Support Tailored for You</h2>
        <div className="services-grid">
          <div className="card service-card">
            <div className="service-icon-box">
              <BookOpen size={24} />
            </div>
            <h3 className="service-title">Education Library</h3>
            <p className="service-desc">
              Browse verified information on contraception, STIs, menstruation, and wellness. Reviewed by medical experts.
            </p>
            <a href="#learn" className="service-link" onClick={() => setView('learn')}>
              Explore Library <ArrowRight size={16} />
            </a>
          </div>

          <div className="card service-card">
            <div className="service-icon-box">
              <ShieldCheck size={24} />
            </div>
            <h3 className="service-title">Asynchronous Consultations</h3>
            <p className="service-desc">
              Submit your symptoms and concerns safely and anonymously. Receive professional advice from certified nurses and gynecologists.
            </p>
            <a href="#consultations" className="service-link" onClick={() => setView('consultations')}>
              Start Consultation <ArrowRight size={16} />
            </a>
          </div>

          <div className="card service-card">
            <div className="service-icon-box">
              <Calendar size={24} />
            </div>
            <h3 className="service-title">Period Tracker</h3>
            <p className="service-desc">
              Track your cycles, calculate lengths, and monitor symptoms. All your data is saved locally on your device for absolute privacy.
            </p>
            <a href="#period" className="service-link" onClick={() => setView('period-tracker')}>
              Open Tracker <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Privacy Matters Section */}
      <section className="privacy-banner">
        <div>
          <h2>Privacy & Data Security</h2>
          <p>
            We take your privacy seriously. Bloom does not link your health logs or consultation files to your real name.
          </p>
          <ul className="privacy-check-list">
            <li>
              <Lock size={18} />
              All data is locally stored or securely encrypted
            </li>
            <li>
              <Lock size={18} />
              Consultations use random display nicknames
            </li>
            <li>
              <Lock size={18} />
              Ghana Data Protection Compliant (Act 843)
            </li>
          </ul>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ padding: '32px', background: 'rgba(255,255,255,0.06)', borderRadius: '18px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <Award size={48} style={{ color: 'var(--green-success)', marginBottom: '16px' }} />
            <h4 style={{ color: 'white', marginBottom: '8px', fontSize: '1.2rem' }}>Safe & Non-Judgmental</h4>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', maxWidth: '300px' }}>
              Feel secure knowing you are accessing certified medical practitioners in a confidential environment.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
