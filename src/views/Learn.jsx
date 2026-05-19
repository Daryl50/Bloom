import React, { useState } from 'react';
import { Search, ChevronLeft, CheckCircle } from 'lucide-react';
import { mockArticles } from '../mockData';

export default function Learn() {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Contraception', 'Pregnancy', 'STIs', 'Menstruation', 'Wellness', 'Consent'];

  const filteredArticles = mockArticles.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          article.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSelectArticle = (article) => {
    setSelectedArticle(article);
    window.scrollTo(0, 0);
  };

  const handleBackToLibrary = () => {
    setSelectedArticle(null);
  };

  if (selectedArticle) {
    // Article Detail View
    return (
      <div className="container animate-fade-in">
        <button className="breadcrumb-back" onClick={handleBackToLibrary}>
          <ChevronLeft size={16} />
          Back to Articles
        </button>

        <div className="article-detail-container">
          <div className="view-header" style={{ marginBottom: '16px' }}>
            <span className="badge badge-pink" style={{ marginBottom: '12px' }}>{selectedArticle.category}</span>
            <h1 className="view-title" style={{ fontSize: '2.5rem', marginBottom: '12px' }}>{selectedArticle.title}</h1>
            
            <div className="article-tags" style={{ marginBottom: '24px' }}>
              {selectedArticle.tags.map((tag, idx) => (
                <span key={idx} className="badge badge-grey">{tag}</span>
              ))}
            </div>
          </div>

          <div className="article-content-body">
            {selectedArticle.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                // Section Title
                return <h3 key={index} style={{ fontSize: '1.4rem', marginTop: '28px', color: 'var(--dark-navy)' }}>{paragraph.replace(/\*\*/g, '')}</h3>;
              } else if (paragraph.includes('\n- ')) {
                // List of items
                const listItems = paragraph.split('\n- ');
                const headerText = listItems[0];
                return (
                  <div key={index}>
                    {headerText && <p>{headerText}</p>}
                    <ul style={{ paddingLeft: '20px', listStyleType: 'disc', margin: '12px 0' }}>
                      {listItems.slice(1).map((item, idx) => (
                        <li key={idx} style={{ marginBottom: '6px' }}>{item}</li>
                      ))}
                    </ul>
                  </div>
                );
              } else if (paragraph.includes('\n1. ')) {
                // Numbered list
                const listItems = paragraph.split(/\n\d+\.\s/);
                const headerText = listItems[0];
                return (
                  <div key={index}>
                    {headerText && <p>{headerText}</p>}
                    <ol style={{ paddingLeft: '20px', margin: '12px 0' }}>
                      {listItems.slice(1).map((item, idx) => (
                        <li key={idx} style={{ marginBottom: '6px' }}>{item}</li>
                      ))}
                    </ol>
                  </div>
                );
              }
              return <p key={index}>{paragraph}</p>;
            })}
          </div>

          {selectedArticle.medicallyReviewed && (
            <div className="medically-reviewed-box">
              <CheckCircle className="reviewed-icon" size={24} />
              <div>
                <h4 className="reviewed-title">✓ Medically Reviewed</h4>
                <p className="reviewed-desc">This article has been reviewed and approved by healthcare professionals.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Articles List View
  return (
    <div className="container animate-fade-in">
      <div className="view-header">
        <h1 className="view-title">Education Library</h1>
        <p className="view-subtitle">Verified, trustworthy information on sexual health and wellness</p>
      </div>

      {/* Filter and Search Bar */}
      <div className="filter-bar">
        <div className="search-input-wrapper">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            className="form-control search-input"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-tags">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-tag ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length > 0 ? (
        <div className="library-grid">
          {filteredArticles.map((article) => (
            <div key={article.id} className="card article-card">
              <div className="article-header">
                <span className="badge badge-pink">{article.category}</span>
                {article.medicallyReviewed && (
                  <span className="badge badge-purple" style={{ fontSize: '0.65rem' }}>✓ Reviewed</span>
                )}
              </div>
              <h3 className="article-title">{article.title}</h3>
              <p className="article-desc">{article.summary}</p>
              
              <div className="article-tags" style={{ marginBottom: '20px' }}>
                {article.tags.map((tag, idx) => (
                  <span key={idx} className="badge badge-grey" style={{ fontSize: '0.65rem' }}>{tag}</span>
                ))}
              </div>

              <button
                className="btn btn-outline"
                style={{ width: '100%', marginTop: 'auto' }}
                onClick={() => handleSelectArticle(article)}
              >
                Read Article
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-secondary)' }}>
          <p style={{ fontSize: '1.1rem', marginBottom: '8px' }}>No articles match your search.</p>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Try checking for spelling errors or removing filters.</p>
        </div>
      )}
    </div>
  );
}
