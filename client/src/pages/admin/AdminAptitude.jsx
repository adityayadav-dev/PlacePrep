import { useState, useEffect } from 'react';
import { getAptitudeQuestions, createAptitude, updateAptitude, deleteAptitude } from '../../services/api';
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi';

const categoriesList = ['Quantitative Aptitude', 'Logical Reasoning', 'Verbal Ability'];
const difficultyList = ['Easy', 'Medium', 'Hard'];
const emptyForm = { question: '', options: ['', '', '', ''], correctAnswer: 0, explanation: '', category: 'Quantitative Aptitude', difficulty: 'Easy' };

const AdminAptitude = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    try {
      const { data } = await getAptitudeQuestions();
      setQuestions(data);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };
  useEffect(() => { fetchData(); }, []);

  const openAdd = () => { setEditing(null); setForm({ ...emptyForm }); setShowModal(true); };
  const openEdit = (q) => {
    setEditing(q._id);
    setForm({ question: q.question, options: [...q.options], correctAnswer: q.correctAnswer, explanation: q.explanation || '', category: q.category, difficulty: q.difficulty });
    setShowModal(true);
  };
  const handleSave = async (e) => {
    e.preventDefault(); setSaving(true);
    try {
      if (editing) { await updateAptitude(editing, form); } else { await createAptitude(form); }
      setShowModal(false); fetchData();
    } catch (err) { alert(err.response?.data?.message || 'Error saving'); } finally { setSaving(false); }
  };
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this question?')) return;
    try { await deleteAptitude(id); fetchData(); } catch (err) { alert('Error deleting'); }
  };
  const updateOption = (index, value) => {
    const newOpts = [...form.options]; newOpts[index] = value; setForm({ ...form, options: newOpts });
  };

  if (loading) return <div className="loading"><div className="spinner" /></div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div className="page-header" style={{ marginBottom: 0 }}><h1>Manage Aptitude</h1><p>{questions.length} questions</p></div>
        <button className="btn btn-primary" onClick={openAdd}><HiOutlinePlus /> Add Question</button>
      </div>
      <div className="table-container">
        <table>
          <thead><tr><th>#</th><th>Question</th><th>Category</th><th>Difficulty</th><th>Actions</th></tr></thead>
          <tbody>
            {questions.map((q, i) => (
              <tr key={q._id}>
                <td>{i + 1}</td>
                <td style={{ maxWidth: 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{q.question}</td>
                <td><span className="badge badge-primary">{q.category}</span></td>
                <td><span className={`badge badge-${q.difficulty.toLowerCase()}`}>{q.difficulty}</span></td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn btn-sm btn-secondary" onClick={() => openEdit(q)}><HiOutlinePencil /></button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(q._id)}><HiOutlineTrash /></button>
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
            <div className="modal-header"><h2>{editing ? 'Edit Question' : 'Add Question'}</h2><button className="modal-close" onClick={() => setShowModal(false)}>×</button></div>
            <form onSubmit={handleSave}>
              <div className="form-group"><label>Question</label><textarea className="form-control" value={form.question} onChange={e => setForm({ ...form, question: e.target.value })} required /></div>
              {form.options.map((opt, i) => (
                <div className="form-group" key={i}><label>Option {String.fromCharCode(65 + i)} {i === form.correctAnswer ? '(Correct)' : ''}</label><input className="form-control" value={opt} onChange={e => updateOption(i, e.target.value)} required /></div>
              ))}
              <div className="form-group"><label>Correct Answer</label><select className="form-control" value={form.correctAnswer} onChange={e => setForm({ ...form, correctAnswer: parseInt(e.target.value) })}>{[0,1,2,3].map(i => <option key={i} value={i}>Option {String.fromCharCode(65 + i)}</option>)}</select></div>
              <div className="form-group"><label>Explanation</label><textarea className="form-control" value={form.explanation} onChange={e => setForm({ ...form, explanation: e.target.value })} /></div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <div className="form-group" style={{ flex: 1 }}><label>Category</label><select className="form-control" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>{categoriesList.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
                <div className="form-group" style={{ flex: 1 }}><label>Difficulty</label><select className="form-control" value={form.difficulty} onChange={e => setForm({ ...form, difficulty: e.target.value })}>{difficultyList.map(d => <option key={d} value={d}>{d}</option>)}</select></div>
              </div>
              <div className="modal-footer"><button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button><button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : editing ? 'Update' : 'Create'}</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default AdminAptitude;
