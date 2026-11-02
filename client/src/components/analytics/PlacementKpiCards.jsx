import React from 'react';
import {
  HiOutlineTrendingUp,
  HiOutlineLightningBolt,
  HiOutlineCheckCircle,
  HiOutlineUserGroup,
  HiOutlineArrowSmUp,
  HiOutlineSparkles,
  HiOutlineBadgeCheck
} from 'react-icons/hi';

const PlacementKpiCards = ({ kpis }) => {
  if (!kpis) return null;

  const {
    placementReadinessScore = 76,
    accuracyRate = 76,
    accuracyTrend = '+6.4%',
    weeklyVelocity = { current: 14, target: 20, percentage: 70 },
    currentStreak = 5,
    readinessTier = 'Tier 1 - Placement Ready 🚀',
    peerBenchmark = { studentScore: 76, peerAverage: 62, percentile: 88 }
  } = kpis;

  // Calculate radial circle stroke
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (placementReadinessScore / 100) * circumference;

  return (
    <div className="bi-section">
      <div className="bi-section-header">

        <h2 className="bi-section-title">Placement Readiness KPIs & Benchmark Attainment</h2>
        <p className="bi-section-subtitle">
          Real-time performance indicators measuring student readiness for Tier-1 campus placement drives
        </p>
      </div>

      <div className="kpi-grid">
        {/* KPI 1: Placement Readiness Index (PRS) */}
        <div className="kpi-card kpi-card-featured">
          <div className="kpi-card-top">
            <span className="kpi-title">Placement Readiness Index (PRS)</span>
            <span className="kpi-tag kpi-tag-emerald">Primary KPI</span>
          </div>

          <div className="kpi-radial-container">
            <div className="radial-chart-wrapper">
              <svg className="radial-svg" width="100" height="100" viewBox="0 0 100 100">
                <circle
                  className="radial-bg"
                  cx="50"
                  cy="50"
                  r={radius}
                  strokeWidth="8"
                />
                <circle
                  className="radial-progress"
                  cx="50"
                  cy="50"
                  r={radius}
                  strokeWidth="8"
                  style={{
                    strokeDasharray: circumference,
                    strokeDashoffset: strokeDashoffset
                  }}
                />
              </svg>
              <div className="radial-value-center">
                <span className="radial-number">{placementReadinessScore}</span>
                <span className="radial-unit">/100</span>
              </div>
            </div>

            <div className="kpi-radial-details">
              <div className="kpi-tier-badge">{readinessTier}</div>
              <div className="kpi-subtext">
                Calculated weighted composite: <strong>35% Aptitude + 45% Coding + 20% Interview</strong>
              </div>
            </div>
          </div>

          <div className="kpi-footer-note">
            <HiOutlineArrowSmUp className="trend-icon-up" />
            <span><strong>+{Math.max(0, placementReadinessScore - peerBenchmark.peerAverage)}%</strong> above batch peer average ({peerBenchmark.peerAverage}%)</span>
          </div>
        </div>

        {/* KPI 2: Accuracy & Consistency */}
        <div className="kpi-card">
          <div className="kpi-card-top">
            <span className="kpi-title">Quiz Accuracy Rate</span>
            <div className="stat-icon-mini" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
              <HiOutlineCheckCircle />
            </div>
          </div>

          <div className="kpi-number-row">
            <span className="kpi-big-number">{accuracyRate}%</span>
            <span className="kpi-trend-pill kpi-trend-positive">
              <HiOutlineArrowSmUp /> {accuracyTrend}
            </span>
          </div>

          <div className="kpi-meter-bar">
            <div className="kpi-meter-fill" style={{ width: `${accuracyRate}%` }}></div>
          </div>

          <div className="kpi-metric-chips">
            <span className="chip-badge">
              🔥 <strong>{currentStreak} Days</strong> Streak
            </span>
            <span className="chip-badge chip-muted">
              Benchmark: &gt;70%
            </span>
          </div>
        </div>

        {/* KPI 3: Problem Solving Velocity */}
        <div className="kpi-card">
          <div className="kpi-card-top">
            <span className="kpi-title">Weekly Solving Velocity</span>
            <div className="stat-icon-mini" style={{ background: 'rgba(14, 165, 233, 0.15)', color: '#0ea5e9' }}>
              <HiOutlineLightningBolt />
            </div>
          </div>

          <div className="kpi-number-row">
            <span className="kpi-big-number">{weeklyVelocity.current}</span>
            <span className="kpi-sub-target">/ {weeklyVelocity.target} Target</span>
          </div>

          <div className="kpi-meter-bar">
            <div
              className="kpi-meter-fill velocity-fill"
              style={{ width: `${weeklyVelocity.percentage}%` }}
            ></div>
          </div>

          <div className="kpi-metric-chips">
            <span className="chip-badge chip-blue">
              🎯 <strong>{weeklyVelocity.percentage}%</strong> Weekly Goal
            </span>
            <span className="chip-badge chip-muted">
              Target: 20 Items/Wk
            </span>
          </div>
        </div>

        {/* KPI 4: Batch Percentile Rank */}
        <div className="kpi-card">
          <div className="kpi-card-top">
            <span className="kpi-title">Peer Benchmark Standing</span>
            <div className="stat-icon-mini" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' }}>
              <HiOutlineUserGroup />
            </div>
          </div>

          <div className="kpi-number-row">
            <span className="kpi-big-number">{peerBenchmark.percentile}th</span>
            <span className="kpi-percentile-label">Percentile</span>
          </div>

          <div className="kpi-meter-bar">
            <div
              className="kpi-meter-fill amber-fill"
              style={{ width: `${peerBenchmark.percentile}%` }}
            ></div>
          </div>

          <div className="kpi-metric-chips">
            <span className="chip-badge chip-amber">
              🏆 Top <strong>{100 - peerBenchmark.percentile}%</strong> of Batch
            </span>
            <span className="chip-badge chip-muted">
              Peer Avg: {peerBenchmark.peerAverage}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlacementKpiCards;
