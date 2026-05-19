import React, { useState, useEffect } from 'react';
import { Search, Plus, Heart, MessageSquare, ArrowLeft, Send, CheckCircle, Info } from 'lucide-react';
import { mockForumPosts } from '../mockData';

export default function Community() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // New Post Form State
  const [newCategory, setNewCategory] = useState('Wellness');
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [postAnonymously, setPostAnonymously] = useState(true);

  // New Reply State
  const [replyText, setReplyText] = useState('');

  const categories = ['All', 'Contraception', 'Pregnancy', 'STIs', 'Menstruation', 'Wellness', 'Consent'];

  useEffect(() => {
    const savedPosts = localStorage.getItem('bloom_forum_posts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      setPosts(mockForumPosts);
      localStorage.setItem('bloom_forum_posts', JSON.stringify(mockForumPosts));
    }
  }, []);

  const handleLike = (postId, e) => {
    e.stopPropagation();
    const updated = posts.map((post) => {
      if (post.id === postId) {
        return { ...post, likes: post.likes + 1 };
      }
      return post;
    });
    setPosts(updated);
    localStorage.setItem('bloom_forum_posts', JSON.stringify(updated));
    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost({ ...selectedPost, likes: selectedPost.likes + 1 });
    }
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newTitle || !newContent) return;

    const newPost = {
      id: `post-${Date.now()}`,
      category: newCategory,
      title: newTitle,
      content: newContent,
      author: postAnonymously ? 'Anonymous Flower' : 'Student K.',
      date: 'Just now',
      likes: 0,
      replies: []
    };

    const updated = [newPost, ...posts];
    setPosts(updated);
    localStorage.setItem('bloom_forum_posts', JSON.stringify(updated));
    setShowCreateForm(false);
    
    // Reset Form
    setNewTitle('');
    setNewContent('');
    setNewCategory('Wellness');
  };

  const handleCreateReply = (e) => {
    e.preventDefault();
    if (!replyText || !selectedPost) return;

    const newReply = {
      id: `reply-${Date.now()}`,
      content: replyText,
      author: 'Anonymous Responder',
      date: 'Just now'
    };

    const updatedPost = {
      ...selectedPost,
      replies: [...selectedPost.replies, newReply]
    };

    const updatedPosts = posts.map((post) => {
      if (post.id === selectedPost.id) {
        return updatedPost;
      }
      return post;
    });

    setPosts(updatedPosts);
    localStorage.setItem('bloom_forum_posts', JSON.stringify(updatedPosts));
    setSelectedPost(updatedPost);
    setReplyText('');
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (selectedPost) {
    // Post Detail / Discussion View
    return (
      <div className="container animate-fade-in">
        <button className="breadcrumb-back" onClick={() => setSelectedPost(null)}>
          <ArrowLeft size={16} />
          Back to Discussions
        </button>

        <div className="forum-detail-card">
          <div className="forum-detail-meta">
            <span className="badge badge-pink">{selectedPost.category}</span>
            <span>{selectedPost.author} • {selectedPost.date}</span>
          </div>
          <h2 className="forum-detail-title">{selectedPost.title}</h2>
          <p className="forum-detail-content">{selectedPost.content}</p>

          <div style={{ display: 'flex', gap: '20px', borderTop: '1px solid var(--border-light)', paddingTop: '16px' }}>
            <button className="forum-action-btn" onClick={(e) => handleLike(selectedPost.id, e)}>
              <Heart size={18} style={{ color: 'var(--primary-pink)' }} />
              {selectedPost.likes} Likes
            </button>
            <span className="forum-action-btn">
              <MessageSquare size={18} />
              {selectedPost.replies.length} Replies
            </span>
          </div>
        </div>

        {/* Replies Section */}
        <div className="comments-section">
          <h3 className="comments-title">Discussion ({selectedPost.replies.length})</h3>
          
          {selectedPost.replies.length > 0 ? (
            <div className="comment-list">
              {selectedPost.replies.map((reply) => (
                <div key={reply.id} className="comment-item">
                  <div className="comment-meta">
                    <span style={{ fontWeight: 600, color: 'var(--dark-navy)' }}>{reply.author}</span>
                    <span>{reply.date}</span>
                  </div>
                  <p className="comment-content">{reply.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px', fontStyle: 'italic' }}>
              No responses yet. Be the first to share your support!
            </p>
          )}

          {/* Add Reply Form */}
          <div className="card" style={{ padding: '20px', background: '#ffffff' }}>
            <form onSubmit={handleCreateReply} style={{ display: 'flex', gap: '12px' }}>
              <input
                type="text"
                className="form-control"
                style={{ borderRadius: 'var(--radius-md)' }}
                placeholder="Share your experience or offer support anonymously..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '10px 20px', background: 'var(--primary-pink)' }}>
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  if (showCreateForm) {
    // Create Post View matching Create post.png
    return (
      <div className="container animate-fade-in" style={{ maxWidth: '640px' }}>
        <button className="breadcrumb-back" onClick={() => setShowCreateForm(false)}>
          <ArrowLeft size={16} />
          Cancel
        </button>

        <div className="view-header">
          <h1 className="view-title">New Post</h1>
          <p className="view-subtitle">Share information and support each other anonymously</p>
        </div>

        {/* Note Banner */}
        <div className="medically-reviewed-box" style={{ background: '#ecfdf5', borderColor: '#10b981', color: '#065f46', marginBottom: '28px', marginTop: 0 }}>
          <CheckCircle size={20} style={{ color: '#10b981' }} />
          <div>
            <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>Note</span>
            <p style={{ fontSize: '0.85rem', opacity: 0.9 }}>Be kind and supportive. Do not share personal medical advice.</p>
          </div>
        </div>

        <div className="card" style={{ textAlign: 'left' }}>
          <form onSubmit={handleCreatePost}>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                className="form-control"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              >
                {categories.slice(1).map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                placeholder="What is on your mind?"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea
                className="form-control"
                rows="6"
                placeholder="Share your experience, ask a question or offer support..."
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                id="anonymous-checkbox"
                checked={postAnonymously}
                onChange={(e) => setPostAnonymously(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: 'var(--primary-pink)' }}
              />
              <label htmlFor="anonymous-checkbox" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', cursor: 'pointer', fontWeight: 500 }}>
                Post anonymously
              </label>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ width: '100%', marginTop: '20px', background: 'var(--primary-pink)' }}
            >
              Post Anonymously
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Forum Feed List View
  return (
    <div className="container animate-fade-in">
      <div className="view-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 className="view-title">Community Forum</h1>
          <p className="view-subtitle">A safe, anonymous space to ask questions, share stories, and seek support.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowCreateForm(true)} style={{ background: 'var(--primary-pink)' }}>
          <Plus size={18} />
          New Post
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="filter-bar">
        <div className="search-input-wrapper">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            className="form-control search-input"
            placeholder="Search discussions..."
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

      {/* Discussion List */}
      {filteredPosts.length > 0 ? (
        <div className="forum-card-grid">
          {filteredPosts.map((post) => (
            <div key={post.id} className="card forum-card" onClick={() => handleSelectArticle(post)} style={{ cursor: 'pointer' }}>
              <div className="forum-card-header">
                <span className="badge badge-pink" style={{ fontSize: '0.65rem' }}>{post.category}</span>
                <span>{post.date}</span>
              </div>
              <div className="forum-card-body">
                <h3 className="forum-card-title">{post.title}</h3>
                <p className="forum-card-text">{post.content}</p>
              </div>
              <div className="forum-card-footer">
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Posted by: {post.author}</span>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button className="forum-action-btn" onClick={(e) => handleLike(post.id, e)}>
                    <Heart size={16} style={{ color: 'var(--primary-pink)' }} />
                    {post.likes}
                  </button>
                  <span className="forum-action-btn">
                    <MessageSquare size={16} />
                    {post.replies.length}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card" style={{ padding: '60px', textAlign: 'center', color: 'var(--text-secondary)' }}>
          <p style={{ fontSize: '1.1rem', marginBottom: '8px' }}>No discussions matching your criteria were found.</p>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Be the first to create a discussion in this category!</p>
        </div>
      )}
    </div>
  );
}
