import { useState, useEffect } from 'react';
import { getDashboard } from '../services/api';
import {
  HiOutlineChartBar,
  HiOutlineSparkles,
  HiOutlineDocumentReport,
  HiOutlineDownload
} from 'react-icons/hi';

import PlacementKpiCards from '../components/analytics/PlacementKpiCards';
import InteractiveAnalyticsDashboard from '../components/analytics/InteractiveAnalyticsDashboard';

const Analytics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const { data } = await getDashboard();
        setStats(data);
      } catch (err) {
        console.error('Analytics fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) {
    return <div className="loading"><div className="spinner" /></div>;
  }

  return (
    <div className="analytics-page">
      {/* Header */}
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div className="bi-badge-pill" style={{ marginBottom: '0.4rem' }}>
            <HiOutlineDocumentReport className="bi-badge-icon" />
            <span>Placement Intelligence & BI Lab Suite</span>
          </div>
          <h1>Placement Analytics & BI Lab Suite 📊</h1>
          <p>
            Curated Business Intelligence reports covering Interactive Visualizations and Placement KPI Metrics
          </p>
        </div>
      </div>

      {/* Experiment 8: KPIs */}
      <PlacementKpiCards kpis={stats?.kpis} />

      {/* Experiment 3: Interactive Dashboard with Filters */}
      <InteractiveAnalyticsDashboard analytics={stats?.analytics} />
    </div>
  );
};

export default Analytics;
