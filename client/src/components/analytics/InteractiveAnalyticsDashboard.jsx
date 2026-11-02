import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine
} from 'recharts';
import {
  HiOutlineFilter,
  HiOutlineChartBar,
  HiOutlineChartPie,
  HiOutlineTrendingUp,
  HiOutlineAdjustments,
  HiOutlineRefresh,
  HiOutlineSparkles,
  HiOutlineCheckCircle
} from 'react-icons/hi';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="custom-chart-tooltip">
        <p className="tooltip-title">{data.title || label}</p>
        <p className="tooltip-date">{data.date}</p>
        <div className="tooltip-metric">
          <span className="tooltip-dot" style={{ backgroundColor: payload[0].color || '#10b981' }}></span>
          <span className="tooltip-label">Score:</span>
          <span className="tooltip-val">
            <strong>{payload[0].value}%</strong>
            {data.rawFraction && (
              <span style={{ marginLeft: '6px', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                ({data.rawFraction})
              </span>
            )}
          </span>
        </div>
        {payload[1] && (
          <div className="tooltip-metric">
            <span className="tooltip-dot" style={{ backgroundColor: payload[1].color || '#0ea5e9' }}></span>
            <span className="tooltip-label">{payload[1].name}:</span>
            <span className="tooltip-val"><strong>{payload[1].value}%</strong></span>
          </div>
        )}
        {(data.category || data.subCategory) && (
          <div className="tooltip-meta">
            <span className="meta-badge">{data.subCategory || data.category}</span>
            <span className={`meta-badge badge-${(data.difficulty || 'medium').toLowerCase()}`}>
              {data.difficulty}
            </span>
          </div>
        )}
      </div>
    );
  }
  return null;
};

const InteractiveAnalyticsDashboard = ({ analytics }) => {
  // Filters state
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [timeRange, setTimeRange] = useState('all');

  const {
    scoreTimeline = [],
    categoryMastery = [],
    difficultyDistribution = []
  } = analytics || {};

  // Filter score timeline dynamically
  const filteredTimeline = useMemo(() => {
    let result = [...scoreTimeline];

    // Filter by Category
    if (selectedCategory !== 'All') {
      result = result.filter(item => {
        const cat = (item.category || '').toLowerCase();
        const type = (item.type || '').toLowerCase();
        const sub = (item.subCategory || '').toLowerCase();

        if (selectedCategory === 'Quantitative') {
          return cat.includes('quant') || sub.includes('quant');
        }
        if (selectedCategory === 'Logical') {
          return cat.includes('logic') || sub.includes('logic');
        }
        if (selectedCategory === 'Verbal') {
          return cat.includes('verb') || sub.includes('verb');
        }
        if (selectedCategory === 'DSA') {
          return (
            cat.includes('dsa') ||
            cat.includes('coding') ||
            type === 'coding' ||
            sub.includes('dsa') ||
            sub.includes('array') ||
            sub.includes('string') ||
            sub.includes('tree') ||
            sub.includes('graph') ||
            sub.includes('binary') ||
            sub.includes('dp') ||
            sub.includes('dynamic')
          );
        }
        return cat === selectedCategory.toLowerCase();
      });
    }

    // Filter by Difficulty
    if (selectedDifficulty !== 'All') {
      result = result.filter(item => item.difficulty === selectedDifficulty);
    }

    // Filter by TimeRange
    if (timeRange === '7d') {
      result = result.slice(-4);
    } else if (timeRange === '15d') {
      result = result.slice(-6);
    }

    return result;
  }, [scoreTimeline, selectedCategory, selectedDifficulty, timeRange]);

  // Difficulty colors
  const DIFFICULTY_COLORS = ['#10b981', '#f59e0b', '#ef4444'];

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedDifficulty('All');
    setTimeRange('all');
  };

  const hasActiveFilters = selectedCategory !== 'All' || selectedDifficulty !== 'All' || timeRange !== 'all';

  // Ensure chart has at least 2 points to render gradient area smoothly
  const chartData = useMemo(() => {
    if (filteredTimeline.length === 1) {
      const single = filteredTimeline[0];
      return [
        { ...single, id: `${single.id}-start`, date: 'Start', score: Math.max(0, single.score - 10) },
        single
      ];
    }
    return filteredTimeline;
  }, [filteredTimeline]);

  return (
    <div className="bi-section">
      <div className="bi-section-header">
        <h2 className="bi-section-title">Interactive Placement Analytics & Performance Visualizer</h2>
        <p className="bi-section-subtitle">
          Slice, filter, and inspect preparation trends, category mastery, and difficulty distributions in real time
        </p>
      </div>

      {/* Interactive Filter Control Bar */}
      <div className="analytics-filter-card">
        <div className="filter-header-row">
          <div className="filter-title-wrap">
            <HiOutlineFilter className="filter-icon" />
            <span className="filter-title">Interactive BI Data Filters</span>
            <span className="filter-count-badge">
              Showing {filteredTimeline.length} {selectedCategory === 'DSA' ? 'DSA Problems' : 'records'}
            </span>
          </div>

          {hasActiveFilters && (
            <button className="reset-filters-btn" onClick={resetFilters}>
              <HiOutlineRefresh /> Reset Filters
            </button>
          )}
        </div>

        <div className="filters-control-grid">
          {/* Category Filter */}
          <div className="filter-control-item">
            <label className="filter-label">Filter by Topic / Category</label>
            <div className="filter-pills-row">
              {['All', 'Quantitative', 'Logical', 'Verbal', 'DSA'].map(cat => (
                <button
                  key={cat}
                  className={`filter-pill ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Timeframe Filter */}
          <div className="filter-control-item">
            <label className="filter-label">Timeframe Window</label>
            <div className="filter-pills-row">
              {[
                { id: 'all', label: 'All History' },
                { id: '15d', label: 'Last 15 Days' },
                { id: '7d', label: 'Last 7 Days' }
              ].map(t => (
                <button
                  key={t.id}
                  className={`filter-pill ${timeRange === t.id ? 'active' : ''}`}
                  onClick={() => setTimeRange(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Filter */}
          <div className="filter-control-item">
            <label className="filter-label">Difficulty Level</label>
            <div className="filter-pills-row">
              {['All', 'Easy', 'Medium', 'Hard'].map(diff => (
                <button
                  key={diff}
                  className={`filter-pill ${selectedDifficulty === diff ? 'active' : ''} ${diff !== 'All' ? `diff-${diff.toLowerCase()}` : ''}`}
                  onClick={() => setSelectedDifficulty(diff)}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Chart: Timeline Score Trend (AreaChart) */}
      <div className="analytics-chart-card main-chart-card">
        <div className="chart-card-header">
          <div>
            <h3 className="chart-title">
              <HiOutlineTrendingUp className="chart-header-icon" />
              {selectedCategory === 'DSA'
                ? 'DSA Coding Performance & Cutoff Progression'
                : 'Score Progression & Placement Cutoff Threshold'}
            </h3>
            <p className="chart-desc">
              {selectedCategory === 'DSA'
                ? 'Tracking your algorithmic problem-solving milestones vs. Tier-1 coding screening cutoff (70%)'
                : 'Tracking your assessment scores vs. the 70% Tier-1 placement drive screening cutoff'}
            </p>
          </div>
          <div className="chart-legend-badge">
            <span className="legend-indicator emerald-glow"></span>
            <span>Your Score %</span>
            <span className="legend-indicator dash-indicator"></span>
            <span>70% Cutoff</span>
          </div>
        </div>

        <div className="chart-container" style={{ width: '100%', height: 320 }}>
          {filteredTimeline.length === 0 ? (
            <div className="empty-state" style={{ padding: '3.5rem 1rem' }}>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                No records matching category: <strong>{selectedCategory}</strong> with difficulty: <strong>{selectedDifficulty}</strong>.
              </p>
              <button className="btn btn-sm btn-outline" onClick={resetFilters}>
                <HiOutlineRefresh /> Reset Filters
              </button>
            </div>
          ) : (
            <ResponsiveContainer>
              <AreaChart data={chartData} margin={{ top: 15, right: 25, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.45} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis
                  dataKey="date"
                  stroke="#71717a"
                  fontSize={11}
                  tickLine={false}
                  tickFormatter={(val) => {
                    if (!val) return '';
                    if (val.includes(',')) {
                      return val.split(',')[1].trim();
                    }
                    return val;
                  }}
                />
                <YAxis domain={[0, 100]} stroke="#71717a" fontSize={12} tickLine={false} unit="%" />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine
                  y={70}
                  stroke="#f59e0b"
                  strokeDasharray="4 4"
                  label={{ value: 'Cutoff 70%', fill: '#f59e0b', fontSize: 11, position: 'right' }}
                />
                <Area
                  type="monotone"
                  dataKey="score"
                  name="Score"
                  stroke="#10b981"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#scoreGradient)"
                  dot={{ r: 5, fill: '#10b981', stroke: '#18181b', strokeWidth: 2 }}
                  activeDot={{ r: 7, fill: '#34d399', stroke: '#09090b', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Filtered Solved Problem Chips */}
        {filteredTimeline.length > 0 && (
          <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                {selectedCategory === 'DSA' ? 'Recorded DSA Problem Milestones' : `${selectedCategory} Recorded Milestones`} ({filteredTimeline.length}):
              </span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {filteredTimeline.map((item, idx) => (
                <div
                  key={`${item.id}-${idx}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border)',
                    borderRadius: '6px',
                    padding: '0.35rem 0.65rem',
                    fontSize: '0.8rem'
                  }}
                >
                  <HiOutlineCheckCircle style={{ color: '#10b981' }} />
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{item.title}</span>
                  <span
                    className={`badge badge-${(item.difficulty || 'medium').toLowerCase()}`}
                    style={{ fontSize: '0.68rem', padding: '0.1rem 0.45rem' }}
                  >
                    {item.difficulty}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--primary-light)', fontWeight: 600 }}>
                    {item.score}% {item.rawFraction ? `(${item.rawFraction})` : ''}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    ({item.date})
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Two Column Grid for Category Mastery and Difficulty Breakdown */}
      <div className="analytics-charts-grid">
        {/* Category Mastery vs Peer Benchmark (Bar Chart) */}
        <div className="analytics-chart-card">
          <div className="chart-card-header">
            <div>
              <h3 className="chart-title">
                <HiOutlineChartBar className="chart-header-icon" />
                Category Mastery vs Peer Benchmark
              </h3>
              <p className="chart-desc">
                Comparing your topic proficiency against the college batch average
              </p>
            </div>
          </div>

          <div className="chart-container" style={{ width: '100%', height: 280 }}>
            <ResponsiveContainer>
              <BarChart data={categoryMastery} margin={{ top: 15, right: 15, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="category" stroke="#71717a" fontSize={11} tickLine={false} />
                <YAxis domain={[0, 100]} stroke="#71717a" fontSize={11} tickLine={false} unit="%" />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  verticalAlign="top"
                  align="right"
                  iconType="circle"
                  wrapperStyle={{ fontSize: '12px', paddingBottom: '10px' }}
                />
                <Bar dataKey="score" name="Your Mastery" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="peerBenchmark" name="Batch Average" fill="#3f3f46" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Difficulty Distribution (Donut Chart) */}
        <div className="analytics-chart-card">
          <div className="chart-card-header">
            <div>
              <h3 className="chart-title">
                <HiOutlineChartPie className="chart-header-icon" />
                Problem Difficulty Breakdown
              </h3>
              <p className="chart-desc">
                Distribution of practiced questions by cognitive complexity
              </p>
            </div>
          </div>

          <div className="chart-container donut-layout" style={{ width: '100%', height: 280 }}>
            <ResponsiveContainer width="60%" height="100%">
              <PieChart>
                <Pie
                  data={difficultyDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="count"
                  nameKey="difficulty"
                >
                  {difficultyDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill || DIFFICULTY_COLORS[index % DIFFICULTY_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name, item) => [`${value} Problems Solved`, item.payload.label || name]}
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px', color: '#f4f4f5' }}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="donut-legend-col">
              {difficultyDistribution.map((item, idx) => (
                <div key={item.difficulty} className="donut-legend-item">
                  <span className="donut-legend-dot" style={{ backgroundColor: item.fill || DIFFICULTY_COLORS[idx] }}></span>
                  <div className="donut-legend-text">
                    <span className="donut-legend-name">{item.difficulty}</span>
                    <span className="donut-legend-count">{item.count} solved</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveAnalyticsDashboard;
