import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { HiOutlineLightBulb, HiOutlineCode, HiOutlineChatAlt2, HiOutlineBookOpen } from 'react-icons/hi';

const AdminDashboard = () => {
  const { user } = useAuth();

  const modules = [
    { to: '/admin/aptitude', icon: <HiOutlineLightBulb />, label: 'Aptitude Questions', desc: 'Add, edit, or delete aptitude questions', color: '#6366f1', bg: 'rgba(99, 102, 241, 0.15)' },
    { to: '/admin/coding', icon: <HiOutlineCode />, label: 'Coding Problems', desc: 'Manage coding problem library', color: '#0ea5e9', bg: 'rgba(14, 165, 233, 0.15)' },
    { to: '/admin/interview', icon: <HiOutlineChatAlt2 />, label: 'Interview Questions', desc: 'Manage interview question bank', color: '#10b981', bg: 'rgba(16, 185, 129, 0.15)' },
    { to: '/admin/resources', icon: <HiOutlineBookOpen />, label: 'Resources', desc: 'Manage learning resources library', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.15)' }
  ];

  return (
    <div>
      <div className="page-header">
        <h1>Admin Dashboard</h1>
        <p>Manage all PlacePrep content</p>
      </div>
      <div className="grid-2">
        {modules.map(mod => (
          <Link key={mod.to} to={mod.to} className="card card-clickable" style={{ textDecoration: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div className="stat-icon" style={{ background: mod.bg, color: mod.color, margin: 0 }}>{mod.icon}</div>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.15rem' }}>{mod.label}</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{mod.desc}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
