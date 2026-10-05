import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getInterviewQuestions } from '../services/api';
import { HiOutlineSearch, HiOutlineCheckCircle } from 'react-icons/hi';

const categories = ['HR', 'OOP', 'DBMS', 'Operating Systems', 'Computer Networks', 'JavaScript', 'React', 'Node.js', 'DSA'];
const difficulties = ['Easy', 'Medium', 'Hard'];

const InterviewList = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ category: '', difficulty: '', search: '' });

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const params = {};
      if (filters.category) params.category = filters.category;
      if (filters.difficulty) params.difficulty = filters.difficulty;
      if (filters.search) params.search = filters.search;
      const { data } = await getInterviewQuestions(params);
      setQuestions(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchQuestions(); }, [filters.category, filters.difficulty]);

  const handleSearch = (e) => { e.preventDefault(); fetchQuestions(); };
  const completedCount = questions.filter(q => q.completed).length;

  return (
    <div>
      <div className="page-header">
        <h1>Interview Preparation</h1>
        <p>Practice interview questions — {completedCount}/{questions.length} completed</p>
      </div>

      {questions.length > 0 && (
        <div className="progress-bar" style={{ marginBottom: '1.5rem', maxWidth: '400px' }}>
          <div className="progress-bar-fill" style={{ width: `${(completedCount / questions.length) * 100}%` }} />
        </div>
      )}

      <form className="filter-bar" onSubmit={handleSearch}>
        <div className="search-input">
          <input type="text" className="form-control" placeholder="Search questions..." value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value })} />
        </div>
        <select className="form-control" value={filters.category} onChange={(e) => setFilters({ ...filters, category: e.target.value })}>
          <option value="">All Categories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select className="form-control" value={filters.difficulty} onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}>
          <option value="">All Difficulties</option>
          {difficulties.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
        <button type="submit" className="btn btn-primary btn-sm"><HiOutlineSearch /> Search</button>
      </form>

      {loading ? (
        <div className="loading"><div className="spinner" /></div>
      ) : questions.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">💬</div>
          <h3>No questions found</h3>
          <p>Try changing your filters.</p>
        </div>
      ) : (
        <div className="grid-2">
          {questions.map(q => (
            <Link key={q._id} to={`/interview/${q._id}`} className="card card-clickable" style={{ textDecoration: 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 500, lineHeight: 1.5, flex: 1 }}>{q.question}</h3>
                {q.completed && <HiOutlineCheckCircle style={{ color: 'var(--success)', fontSize: '1.2rem', flexShrink: 0 }} />}
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
                <span className="badge badge-primary">{q.category}</span>
                <span className={`badge badge-${q.difficulty.toLowerCase()}`}>{q.difficulty}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default InterviewList;
