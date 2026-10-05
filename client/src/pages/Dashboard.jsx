import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDashboard } from '../services/api';
import { useAuth } from '../hooks/useAuth';
import {
  HiOutlineLightBulb,
  HiOutlineCode,
  HiOutlineChatAlt2,
  HiOutlineBookOpen,
  HiOutlineTrendingUp
} from 'react-icons/hi';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const { data } = await getDashboard();
        setStats(data);
      } catch (err) {
        console.error('Dashboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return <div className="loading"><div className="spinner" /></div>;
  }

  return (
    <div>
      <div className="page-header">
        <h1>Welcome back, {user?.name}! 👋</h1>
        <p>Track your placement preparation progress</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#6366f1' }}>
            <HiOutlineLightBulb />
          </div>
          <div className="stat-value">{stats?.aptitude?.quizzesCompleted || 0}</div>
          <div className="stat-label">Quizzes Completed</div>
          {stats?.aptitude?.averageScore > 0 && (
            <div style={{ fontSize: '0.8rem', color: 'var(--success)', marginTop: '0.25rem' }}>
              Avg Score: {stats.aptitude.averageScore}%
            </div>
          )}
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(14, 165, 233, 0.15)', color: '#0ea5e9' }}>
            <HiOutlineCode />
          </div>
          <div className="stat-value">{stats?.coding?.solved || 0}/{stats?.coding?.total || 0}</div>
          <div className="stat-label">Coding Problems Solved</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
            <HiOutlineChatAlt2 />
          </div>
          <div className="stat-value">{stats?.interview?.completed || 0}/{stats?.interview?.total || 0}</div>
          <div className="stat-label">Interview Questions Done</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' }}>
            <HiOutlineTrendingUp />
          </div>
          <div className="stat-value">{stats?.overallProgress || 0}%</div>
          <div className="stat-label">Overall Progress</div>
          <div className="progress-bar" style={{ marginTop: '0.5rem' }}>
            <div className="progress-bar-fill" style={{ width: `${stats?.overallProgress || 0}%` }} />
          </div>
        </div>
      </div>

      <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem' }}>Quick Actions</h2>
      <div className="grid-3" style={{ marginBottom: '2rem' }}>
        <Link to="/aptitude" className="card card-clickable" style={{ textDecoration: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div className="stat-icon" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#6366f1', margin: 0 }}>
              <HiOutlineLightBulb />
            </div>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.15rem' }}>Aptitude</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Practice quantitative, logical & verbal</p>
            </div>
          </div>
        </Link>
        <Link to="/coding" className="card card-clickable" style={{ textDecoration: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div className="stat-icon" style={{ background: 'rgba(14, 165, 233, 0.15)', color: '#0ea5e9', margin: 0 }}>
              <HiOutlineCode />
            </div>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.15rem' }}>Coding</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Solve DSA problems by topic</p>
            </div>
          </div>
        </Link>
        <Link to="/interview" className="card card-clickable" style={{ textDecoration: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', margin: 0 }}>
              <HiOutlineChatAlt2 />
            </div>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.15rem' }}>Interview Prep</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>HR, technical & CS fundamentals</p>
            </div>
          </div>
        </Link>
        <Link to="/resources" className="card card-clickable" style={{ textDecoration: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', margin: 0 }}>
              <HiOutlineBookOpen />
            </div>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.15rem' }}>Resources</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Articles, videos & learning material</p>
            </div>
          </div>
        </Link>
      </div>

      {stats?.recentAttempts?.length > 0 && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Recent Quiz Attempts</h2>
            <Link to="/aptitude/history" className="btn btn-sm btn-outline">View All</Link>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Score</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentAttempts.map((attempt, i) => (
                  <tr key={i}>
                    <td>{attempt.category}</td>
                    <td>
                      <span style={{ fontWeight: 600, color: attempt.score / attempt.total >= 0.7 ? 'var(--success)' : attempt.score / attempt.total >= 0.4 ? 'var(--warning)' : 'var(--danger)' }}>
                        {attempt.score}/{attempt.total}
                      </span>
                    </td>
                    <td style={{ color: 'var(--text-secondary)' }}>
                      {new Date(attempt.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
