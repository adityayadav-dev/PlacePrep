import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCodingProblems } from '../services/api';
import { HiOutlineSearch, HiOutlineCheckCircle } from 'react-icons/hi';

const topics = ['Arrays', 'Strings', 'Binary Search', 'Linked List', 'Stack', 'Queue', 'Trees', 'Graphs', 'Dynamic Programming'];
const difficulties = ['Easy', 'Medium', 'Hard'];

const CodingList = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ topic: '', difficulty: '', search: '' });

  const fetchProblems = async () => {
    setLoading(true);
    try {
      const params = {};
      if (filters.topic) params.topic = filters.topic;
      if (filters.difficulty) params.difficulty = filters.difficulty;
      if (filters.search) params.search = filters.search;
      const { data } = await getCodingProblems(params);
      setProblems(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProblems(); }, [filters.topic, filters.difficulty]);

  const handleSearch = (e) => { e.preventDefault(); fetchProblems(); };
  const solvedCount = problems.filter(p => p.solved).length;

  return (
    <div>
      <div className="page-header">
        <h1>Coding Problems</h1>
        <p>Practice DSA problems — {solvedCount}/{problems.length} solved</p>
      </div>

      {problems.length > 0 && (
        <div className="progress-bar" style={{ marginBottom: '1.5rem', maxWidth: '400px' }}>
          <div className="progress-bar-fill" style={{ width: `${(solvedCount / problems.length) * 100}%` }} />
        </div>
      )}

      <form className="filter-bar" onSubmit={handleSearch}>
        <div className="search-input">
          <input type="text" className="form-control" placeholder="Search problems..." value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value })} />
        </div>
        <select className="form-control" value={filters.topic} onChange={(e) => setFilters({ ...filters, topic: e.target.value })}>
          <option value="">All Topics</option>
          {topics.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <select className="form-control" value={filters.difficulty} onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}>
          <option value="">All Difficulties</option>
          {difficulties.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
        <button type="submit" className="btn btn-primary btn-sm"><HiOutlineSearch /> Search</button>
      </form>

      {loading ? (
        <div className="loading"><div className="spinner" /></div>
      ) : problems.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">💻</div>
          <h3>No problems found</h3>
          <p>Try changing your filters.</p>
        </div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th style={{ width: 40 }}>Status</th>
                <th>Title</th>
                <th>Topic</th>
                <th>Difficulty</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {problems.map(p => (
                <tr key={p._id}>
                  <td>{p.solved && <HiOutlineCheckCircle style={{ color: 'var(--success)', fontSize: '1.2rem' }} />}</td>
                  <td>
                    <Link to={`/coding/${p._id}`} style={{ color: 'var(--primary-light)', fontWeight: 500 }}>{p.title}</Link>
                  </td>
                  <td><span className="badge badge-primary">{p.topic}</span></td>
                  <td><span className={`badge badge-${p.difficulty.toLowerCase()}`}>{p.difficulty}</span></td>
                  <td><Link to={`/coding/${p._id}`} className="btn btn-sm btn-outline">View</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CodingList;
