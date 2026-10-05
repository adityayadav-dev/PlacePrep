import { useState, useEffect } from 'react';
import { getResources } from '../services/api';
import { HiOutlineSearch, HiOutlineExternalLink } from 'react-icons/hi';

const categories = ['Aptitude', 'Coding', 'Interview', 'General'];
const types = ['Article', 'Video', 'PDF', 'Website'];

const typeIcons = { Article: '📄', Video: '🎬', PDF: '📑', Website: '🌐' };

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ category: '', type: '', search: '' });

  const fetchResources = async () => {
    setLoading(true);
    try {
      const params = {};
      if (filters.category) params.category = filters.category;
      if (filters.type) params.type = filters.type;
      if (filters.search) params.search = filters.search;
      const { data } = await getResources(params);
      setResources(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchResources(); }, [filters.category, filters.type]);

  const handleSearch = (e) => { e.preventDefault(); fetchResources(); };

  return (
    <div>
      <div className="page-header">
        <h1>Resource Library</h1>
        <p>Curated articles, videos, and learning resources for placement prep</p>
      </div>

      <form className="filter-bar" onSubmit={handleSearch}>
        <div className="search-input">
          <input type="text" className="form-control" placeholder="Search resources..." value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value })} />
        </div>
        <select className="form-control" value={filters.category} onChange={(e) => setFilters({ ...filters, category: e.target.value })}>
          <option value="">All Categories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select className="form-control" value={filters.type} onChange={(e) => setFilters({ ...filters, type: e.target.value })}>
          <option value="">All Types</option>
          {types.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <button type="submit" className="btn btn-primary btn-sm"><HiOutlineSearch /> Search</button>
      </form>

      {loading ? (
        <div className="loading"><div className="spinner" /></div>
      ) : resources.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📚</div>
          <h3>No resources found</h3>
          <p>Try changing your filters.</p>
        </div>
      ) : (
        <div className="grid-3">
          {resources.map(r => (
            <div key={r._id} className="card">
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '1.5rem' }}>{typeIcons[r.type]}</span>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 600, lineHeight: 1.4, marginBottom: '0.25rem' }}>{r.title}</h3>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <span className="badge badge-primary">{r.category}</span>
                    <span className="badge" style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--text-secondary)' }}>{r.type}</span>
                  </div>
                </div>
              </div>
              {r.description && <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1rem' }}>{r.description}</p>}
              <a href={r.url} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-primary">
                <HiOutlineExternalLink /> Open Resource
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Resources;
