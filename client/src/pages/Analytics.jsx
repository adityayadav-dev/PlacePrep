import { useState, useEffect } from 'react';
import { getDashboard } from '../services/api';
import {
  HiOutlineChartBar,
  HiOutlineSparkles,
  HiOutlineDocumentReport,
  HiOutlineDownload
} from 'react-icons/hi';

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


      {/* Interactive Analytics Visualizations with Slicers & Filters */}
      <InteractiveAnalyticsDashboard analytics={stats?.analytics} />
    </div>
  );
};

export default Analytics;
