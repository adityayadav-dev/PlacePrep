import { useState, useEffect } from 'react';
import { getResources, createResource, updateResource, deleteResource } from '../../services/api';
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi';

const categoryList = ['Aptitude', 'Coding', 'Interview', 'General'];
const typeList = ['Article', 'Video', 'PDF', 'Website'];
const emptyForm = { title: '', description: '', category: 'General', type: 'Article', url: '' };

const AdminResources = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    try { const { data } = await getResources(); setResources(data); } catch (err) { console.error(err); } finally { setLoading(false); }
  };
  useEffect(() => { fetchData(); }, []);

  const openAdd = () => { setEditing(null); setForm({ ...emptyForm }); setShowModal(true); };
  const openEdit = (r) => {
    setEditing(r._id);
    setForm({ title: r.title, description: r.description || '', category: r.category, type: r.type, url: r.url });
    setShowModal(true);
  };
  const handleSave = async (e) => {
    e.preventDefault(); setSaving(true);
    try {
      if (editing) { await updateResource(editing, form); } else { await createResource(form); }
      setShowModal(false); fetchData();
    } catch (err) { alert(err.response?.data?.message || 'Error saving'); } finally { setSaving(false); }
  };
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this resource?')) return;
    try { await deleteResource(id); fetchData(); } catch (err) { alert('Error deleting'); }
  };

  if (loading) return <div className="loading"><div className="spinner" /></div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div className="page-header" style={{ marginBottom: 0 }}><h1>Manage Resources</h1><p>{resources.length} resources</p></div>
        <button className="btn btn-primary" onClick={openAdd}><HiOutlinePlus /> Add Resource</button>
      </div>
      <div className="table-container">
        <table>
          <thead><tr><th>#</th><th>Title</th><th>Category</th><th>Type</th><th>Actions</th></tr></thead>
          <tbody>
            {resources.map((r, i) => (
              <tr key={r._id}>
                <td>{i + 1}</td>
                <td>{r.title}</td>
                <td><span className="badge badge-primary">{r.category}</span></td>
                <td><span className="badge" style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--text-secondary)' }}>{r.type}</span></td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn btn-sm btn-secondary" onClick={() => openEdit(r)}><HiOutlinePencil /></button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(r._id)}><HiOutlineTrash /></button>
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
            <div className="modal-header"><h2>{editing ? 'Edit Resource' : 'Add Resource'}</h2><button className="modal-close" onClick={() => setShowModal(false)}>×</button></div>
            <form onSubmit={handleSave}>
              <div className="form-group"><label>Title</label><input className="form-control" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required /></div>
              <div className="form-group"><label>Description</label><textarea className="form-control" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} /></div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <div className="form-group" style={{ flex: 1 }}><label>Category</label><select className="form-control" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>{categoryList.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
                <div className="form-group" style={{ flex: 1 }}><label>Type</label><select className="form-control" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>{typeList.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
              </div>
              <div className="form-group"><label>URL</label><input className="form-control" value={form.url} onChange={e => setForm({ ...form, url: e.target.value })} required /></div>
              <div className="modal-footer"><button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button><button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : editing ? 'Update' : 'Create'}</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default AdminResources;
