import React, { useState } from 'react';
import {
  HiOutlineFilter,
  HiOutlineSparkles,
  HiOutlineUserGroup,
  HiOutlineAcademicCap,
  HiOutlineArrowSmDown,
  HiOutlineInformationCircle,
  HiOutlineCheckCircle
} from 'react-icons/hi';

const PlacementFunnelChart = ({ funnel }) => {
  const [funnelMode, setFunnelMode] = useState('batch'); // 'batch' or 'personal'

  const { batchFunnel = [], personalFunnel = [] } = funnel || {};
  const currentStages = funnelMode === 'batch' ? batchFunnel : personalFunnel;

  // Identify highest drop-off stage for actionable BI insights
  const maxDropoffStage = currentStages.slice(1).reduce((max, stage) => {
    return stage.dropoff > (max?.dropoff || 0) ? stage : max;
  }, null);

  const finalStage = currentStages[currentStages.length - 1];
  const overallConversion = finalStage?.conversion || 12.8;

  return (
    <div className="bi-section">
      <div className="bi-section-header">
        <div className="bi-badge-pill">
          <HiOutlineSparkles className="bi-badge-icon" />
          <span>Pipeline & Conversion Funnel Analysis</span>
        </div>
        <h2 className="bi-section-title">Campus Placement & Preparation Pipeline Funnel</h2>
        <p className="bi-section-subtitle">
          Visualizing candidate progression, conversion rates, and stage-by-stage drop-off analytics across placement rounds
        </p>
      </div>

      <div className="funnel-container-card">
        {/* Funnel Mode Toggle & Header */}
        <div className="funnel-control-bar">
          <div className="funnel-toggle-group">
            <button
              className={`funnel-mode-btn ${funnelMode === 'batch' ? 'active' : ''}`}
              onClick={() => setFunnelMode('batch')}
            >
              <HiOutlineUserGroup className="btn-icon" />
              Campus Drive Funnel (Batch Analytics)
            </button>
            <button
              className={`funnel-mode-btn ${funnelMode === 'personal' ? 'active' : ''}`}
              onClick={() => setFunnelMode('personal')}
            >
              <HiOutlineAcademicCap className="btn-icon" />
              My Preparation Funnel (Personal Milestone)
            </button>
          </div>

          <div className="funnel-summary-badge">
            <span className="summary-label">End-to-End Conversion:</span>
            <span className="summary-value">{overallConversion}%</span>
          </div>
        </div>

        {/* Funnel Visual Bars */}
        <div className="funnel-visual-wrap">
          {currentStages.map((stage, index) => {
            const isFirst = index === 0;
            const widthPct = Math.max(stage.conversion, 22);

            return (
              <div key={stage.id} className="funnel-stage-row">
                {/* Connecting dropoff indicator */}
                {!isFirst && (
                  <div className="funnel-connector-row">
                    <div className="connector-line"></div>
                    <div className="dropoff-pill">
                      <HiOutlineArrowSmDown className="drop-icon" />
                      <span>{stage.dropoff}% stage drop-off</span>
                    </div>
                  </div>
                )}

                {/* Main Funnel Bar */}
                <div
                  className="funnel-bar"
                  style={{
                    width: `${widthPct}%`,
                    borderLeftColor: stage.color || '#10b981'
                  }}
                >
                  <div className="funnel-bar-inner">
                    <div className="funnel-stage-left">
                      <span className="stage-index-badge" style={{ backgroundColor: stage.color }}>
                        {stage.id}
                      </span>
                      <div className="stage-meta-text">
                        <span className="stage-name">{stage.stage}</span>
                        <span className="stage-desc">{stage.description}</span>
                      </div>
                    </div>

                    <div className="funnel-stage-right">
                      <div className="stage-count-box">
                        <span className="stage-count">{stage.count}</span>
                        <span className="stage-count-label">
                          {funnelMode === 'batch' ? 'Candidates' : 'Mastered'}
                        </span>
                      </div>
                      <div className="stage-conversion-box">
                        <span className="stage-conversion-rate">{stage.conversion}%</span>
                        <span className="stage-conversion-label">Retention</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* BI Actionable Insight Box */}
        <div className="funnel-insights-banner">
          <div className="insight-icon-col">
            <HiOutlineInformationCircle />
          </div>
          <div className="insight-text-col">
            <h4 className="insight-title">Business Intelligence Insight & Recommendation</h4>
            <p className="insight-body">
              {funnelMode === 'batch' ? (
                <>
                  The critical bottleneck in the recruitment pipeline occurs at{' '}
                  <strong>{maxDropoffStage?.stage || 'Technical Round'}</strong> with a{' '}
                  <strong>{maxDropoffStage?.dropoff || 42.8}% drop-off rate</strong>. Increasing practice in live timed coding challenges and data structure problems will significantly widen the final offer conversion pool.
                </>
              ) : (
                <>
                  Your personal preparation conversion from <strong>Aptitude to DSA Coding</strong> shows your strongest progression. Focus next on mock HR and Technical interviews to maximize your final placement readiness index above 85%.
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlacementFunnelChart;
