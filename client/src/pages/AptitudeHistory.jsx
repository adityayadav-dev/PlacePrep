import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getQuizHistory } from '../services/api';

const AptitudeHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const { data } = await getQuizHistory();
        setHistory(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (loading) return <div className="loading"><div className="spinner" /></div>;

  return (
    <div>
      <div className="page-header">
        <h1>Quiz History</h1>
        <p>Review your past quiz attempts</p>
      </div>

      <button className="btn btn-primary" style={{ marginBottom: '1.5rem' }} onClick={() => navigate('/aptitude')}>
        Take New Quiz
      </button>

      {history.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📋</div>
          <h3>No attempts yet</h3>
          <p>Take your first quiz to see your history here.</p>
        </div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Category</th>
                <th>Score</th>
                <th>Percentage</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {history.map((attempt, i) => {
                const pct = Math.round((attempt.score / attempt.total) * 100);
                return (
                  <tr key={attempt._id}>
                    <td>{i + 1}</td>
                    <td>{attempt.category}</td>
                    <td style={{ fontWeight: 600 }}>{attempt.score}/{attempt.total}</td>
                    <td>
                      <span className={`badge ${pct >= 70 ? 'badge-easy' : pct >= 40 ? 'badge-medium' : 'badge-hard'}`}>
                        {pct}%
                      </span>
                    </td>
                    <td style={{ color: 'var(--text-secondary)' }}>
                      {new Date(attempt.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                      })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AptitudeHistory;
