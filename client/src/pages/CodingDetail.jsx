import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCodingProblem, markProblemSolved } from '../services/api';
import { HiOutlineExternalLink, HiOutlineCheckCircle, HiOutlineArrowLeft } from 'react-icons/hi';

const CodingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const { data } = await getCodingProblem(id);
        setProblem(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProblem();
  }, [id]);

  const handleMarkSolved = async () => {
    try {
      await markProblemSolved(id);
      setProblem({ ...problem, solved: true });
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="loading"><div className="spinner" /></div>;

  if (!problem) {
    return (
      <div className="empty-state">
        <h3>Problem not found</h3>
        <button className="btn btn-primary" onClick={() => navigate('/coding')}>Go Back</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 800 }}>
      <button className="btn btn-outline btn-sm" onClick={() => navigate('/coding')} style={{ marginBottom: '1.5rem' }}>
        <HiOutlineArrowLeft /> Back to Problems
      </button>

      <div className="card">
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>{problem.title}</h1>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span className={`badge badge-${problem.difficulty.toLowerCase()}`}>{problem.difficulty}</span>
              <span className="badge badge-primary">{problem.topic}</span>
              {problem.solved && <span className="badge badge-easy">✓ Solved</span>}
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Description</h3>
          <p style={{ lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{problem.description}</p>
        </div>

        {problem.example && (
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Example</h3>
            <pre style={{ background: 'var(--bg-primary)', padding: '1rem', borderRadius: 'var(--radius)', fontSize: '0.85rem', overflow: 'auto', whiteSpace: 'pre-wrap', border: '1px solid var(--border)' }}>
              {problem.example}
            </pre>
          </div>
        )}

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          {problem.externalUrl && (
            <a href={problem.externalUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <HiOutlineExternalLink /> Solve on LeetCode
            </a>
          )}
          {!problem.solved && (
            <button className="btn btn-success" onClick={handleMarkSolved}>
              <HiOutlineCheckCircle /> Mark as Solved
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodingDetail;
