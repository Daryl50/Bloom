import React from 'react';
import { BarChart2, PieChart, TrendingUp, Clock, ThumbsUp, CheckSquare } from 'lucide-react';

export default function ProviderAnalytics({ currentUser }) {
  
  // Mock data for charts
  const topicsData = [
    { label: 'Contraception', count: 48, percentage: 40, color: 'var(--primary-pink)' },
    { label: 'Menstruation', count: 36, percentage: 30, color: 'var(--secondary-purple)' },
    { label: 'STIs / Prevention', count: 18, percentage: 15, color: '#f59e0b' },
    { label: 'Mental Wellness', count: 12, percentage: 10, color: '#10b981' },
    { label: 'General / Other', count: 6, percentage: 5, color: '#64748b' }
  ];

  const monthlyTrend = [
    { month: 'Jan', count: 15 },
    { month: 'Feb', count: 24 },
    { month: 'Mar', count: 35 },
    { month: 'Apr', count: 28 },
    { month: 'May', count: 42 },
    { month: 'Jun', count: 57 }
  ];

  const ageGroups = [
    { label: '18 - 20 years', percentage: 55, color: 'var(--primary-pink)' },
    { label: '21 - 23 years', percentage: 35, color: 'var(--secondary-purple)' },
    { label: '24+ years', percentage: 10, color: '#94a3b8' }
  ];

  // SVG Chart Dimensions
  const lineChartWidth = 500;
  const lineChartHeight = 200;
  const padding = 30;

  // Generate points for SVG line chart
  const points = monthlyTrend.map((t, idx) => {
    const x = padding + (idx * (lineChartWidth - padding * 2)) / (monthlyTrend.length - 1);
    const y = lineChartHeight - padding - (t.count * (lineChartHeight - padding * 2)) / 60;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="container animate-fade-in" style={{ paddingBottom: '60px' }}>
      <div className="view-header">
        <h1 className="view-title">Analytics & Reports</h1>
        <p className="view-subtitle">Monitor clinical consulting statistics, student concern trends, and service performance metrics</p>
      </div>

      {/* Overview Cards */}
      <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Avg. Response Speed</span>
            <Clock size={20} style={{ color: 'var(--primary-pink)' }} />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--dark-navy)' }}>1.8 Hours</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--green-success)', fontWeight: 500 }}>
            ↑ 12% faster response than last month
          </div>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Student Satisfaction</span>
            <ThumbsUp size={20} style={{ color: 'var(--secondary-purple)' }} />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--dark-navy)' }}>94.8%</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--green-success)', fontWeight: 500 }}>
            ★ Based on anonymous student reviews
          </div>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Resolution Rate</span>
            <CheckSquare size={20} style={{ color: '#10b981' }} />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--dark-navy)' }}>91.2%</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
            112 out of 120 total cases resolved
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px', marginBottom: '32px' }}>
        
        {/* consultations by Topic Bar Chart */}
        <div className="card">
          <h2 style={{ fontSize: '1.2rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BarChart2 size={20} style={{ color: 'var(--primary-pink)' }} />
            Case distribution by Topic Area
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {topicsData.map((data, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 500, marginBottom: '6px' }}>
                  <span style={{ color: 'var(--dark-navy)' }}>{data.label}</span>
                  <span style={{ color: 'var(--text-secondary)' }}>
                    <strong>{data.count} cases</strong> ({data.percentage}%)
                  </span>
                </div>
                <div style={{ width: '100%', height: '10px', background: 'var(--bg-soft)', borderRadius: '999px', overflow: 'hidden' }}>
                  <div
                    style={{
                      width: `${data.percentage}%`,
                      height: '100%',
                      background: data.color,
                      borderRadius: '999px',
                      transition: 'width 1s ease-in-out'
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Patient Demographics */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <PieChart size={20} style={{ color: 'var(--secondary-purple)' }} />
            Age Demographic Distribution
          </h2>

          <div style={{ display: 'flex', alignItems: 'center', gap: '32px', flex: 1 }}>
            {/* Native SVG Donut Chart */}
            <div style={{ position: 'relative', width: '150px', height: '150px' }}>
              <svg width="150" height="150" viewBox="0 0 42 42" className="donut">
                <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="var(--border-light)" strokeWidth="4"></circle>
                
                {/* 18-20: 55% */}
                <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="var(--primary-pink)" strokeWidth="4"
                        strokeDasharray="55 45" strokeDashoffset="25"></circle>
                
                {/* 21-23: 35% */}
                <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="var(--secondary-purple)" strokeWidth="4"
                        strokeDasharray="35 65" strokeDashoffset="-30"></circle>

                {/* 24+: 10% */}
                <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#94a3b8" strokeWidth="4"
                        strokeDasharray="10 90" strokeDashoffset="-65"></circle>
              </svg>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--dark-navy)' }}>120</span>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Students</div>
              </div>
            </div>

            {/* Legend */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
              {ageGroups.map((group, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem' }}>
                  <span style={{ width: '12px', height: '12px', background: group.color, borderRadius: '4px', display: 'inline-block' }}></span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, color: 'var(--dark-navy)' }}>{group.label}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{group.percentage}% of patients</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Monthly Case Trend Line Chart */}
      <div className="card">
        <h2 style={{ fontSize: '1.2rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <TrendingUp size={20} style={{ color: '#10b981' }} />
          Monthly Consultation Volume Trend
        </h2>

        <div style={{ overflowX: 'auto' }}>
          <svg width={lineChartWidth} height={lineChartHeight} style={{ overflow: 'visible', marginInline: 'auto', display: 'block' }}>
            {/* Grid Lines */}
            <line x1={padding} y1={padding} x2={lineChartWidth - padding} y2={padding} stroke="var(--border-light)" strokeDasharray="4 4" />
            <line x1={padding} y1={lineChartHeight / 2} x2={lineChartWidth - padding} y2={lineChartHeight / 2} stroke="var(--border-light)" strokeDasharray="4 4" />
            <line x1={padding} y1={lineChartHeight - padding} x2={lineChartWidth - padding} y2={lineChartHeight - padding} stroke="var(--border-light)" />

            {/* Line path */}
            <polyline
              fill="none"
              stroke="var(--primary-pink)"
              strokeWidth="4"
              points={points}
            />

            {/* Data Dots and Text */}
            {monthlyTrend.map((t, idx) => {
              const x = padding + (idx * (lineChartWidth - padding * 2)) / (monthlyTrend.length - 1);
              const y = lineChartHeight - padding - (t.count * (lineChartHeight - padding * 2)) / 60;
              return (
                <g key={idx}>
                  <circle cx={x} cy={y} r="5" fill="#fff" stroke="var(--primary-pink)" strokeWidth="3" />
                  <text x={x} y={y - 10} textAnchor="middle" fontSize="0.75rem" fontWeight="600" fill="var(--dark-navy)">{t.count}</text>
                  <text x={x} y={lineChartHeight - 10} textAnchor="middle" fontSize="0.75rem" fill="var(--text-secondary)">{t.month}</text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
}
