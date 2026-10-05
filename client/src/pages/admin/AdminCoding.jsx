import { useState, useEffect } from 'react';
import { getCodingProblems, createCoding, updateCoding, deleteCoding } from '../../services/api';
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi';

const topicList = ['Arrays', 'Strings', 'Binary Search', 'Linked List', 'Stack', 'Queue', 'Trees', 'Graphs', 'Dynamic Programming'];
const difficultyList = ['Easy', 'Medium', 'Hard'];
const emptyForm = { title: '', description: '', difficulty: 'Easy', topic: 'Arrays', example: '', externalUrl: '' };

const AdminCoding = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    try { const { data } = await getCodingProblems(); setProblems(data); } catch (err) { console.error(err); } finally { setLoading(false); }
  };
  useEffect(() => { fetchData(); }, []);

  const openAdd = () => { setEditing(null); setForm({ ...emptyForm }); setShowModal(true); };
  const openEdit = (p) => {
    setEditing(p._id);
    setForm({ title: p.title, description: p.description, difficulty: p.difficulty, topic: p.topic, example: p.example || '', externalUrl: p.externalUrl || '' });
    setShowModal(true);
  };
  const handleSave = async (e) => {
    e.preventDefault(); setSaving(true);
    try {
      if (editing) { await updateCoding(editing, form); } else { await createCoding(form); }
      setShowModal(false); fetchData();
    } catch (err) { alert(err.response?.data?.message || 'Error saving'); } finally { setSaving(false); }
  };
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this problem?')) return;
    try { await deleteCoding(id); fetchData(); } catch (err) { alert('Error deleting'); }
  };

  if (loading) return <div className="loading"><div className="spinner" /></div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div className="page-header" style={{ marginBottom: 0 }}><h1>Manage Coding</h1><p>{problems.length} problems</p></div>
        <button className="btn btn-primary" onClick={openAdd}><HiOutlinePlus /> Add Problem</button>
      </div>
      <div className="table-container">
        <table>
          <thead><tr><th>#</th><th>Title</th><th>Topic</th><th>Difficulty</th><th>Actions</th></tr></thead>
          <tbody>
            {problems.map((p, i) => (
              <tr key={p._id}>
                <td>{i + 1}</td>
                <td>{p.title}</td>
                <td><span className="badge badge-primary">{p.topic}</span></td>
                <td><span className={`badge badge-${p.difficulty.toLowerCase()}`}>{p.difficulty}</span></td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn btn-sm btn-secondary" onClick={() => openEdit(p)}><HiOutlinePencil /></button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(p._id)}><HiOutlineTrash /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header"><h2>{editing ? 'Edit Problem' : 'Add Problem'}</h2><button className="modal-close" onClick={() => setShowModal(false)}>×</button></div>
            <form onSubmit={handleSave}>
              <div className="form-group"><label>Title</label><input className="form-control" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required /></div>
              <div className="form-group"><label>Description</label><textarea className="form-control" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required style={{ minHeight: 120 }} /></div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <div className="form-group" style={{ flex: 1 }}><label>Topic</label><select className="form-control" value={form.topic} onChange={e => setForm({ ...form, topic: e.target.value })}>{topicList.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
                <div className="form-group" style={{ flex: 1 }}><label>Difficulty</label><select className="form-control" value={form.difficulty} onChange={e => setForm({ ...form, difficulty: e.target.value })}>{difficultyList.map(d => <option key={d} value={d}>{d}</option>)}</select></div>
              </div>
              <div className="form-group"><label>Example</label><textarea className="form-control" value={form.example} onChange={e => setForm({ ...form, example: e.target.value })} /></div>
              <div className="form-group"><label>External URL (e.g., LeetCode link)</label><input className="form-control" value={form.externalUrl} onChange={e => setForm({ ...form, externalUrl: e.target.value })} /></div>
              <div className="modal-footer"><button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button><button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : editing ? 'Update' : 'Create'}</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default AdminCoding;
