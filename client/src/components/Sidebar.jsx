import { NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import {
  HiOutlineHome, HiOutlineLightBulb, HiOutlineCode, HiOutlineChatAlt2,
  HiOutlineBookOpen, HiOutlineUser, HiOutlineLogout, HiOutlineViewGrid
} from 'react-icons/hi';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { user, logout } = useAuth();

  const handleLogout = () => { logout(); };
  const closeSidebar = () => { if (window.innerWidth <= 768) setIsOpen(false); };

  const studentLinks = [
    { to: '/dashboard', icon: <HiOutlineHome />, label: 'Dashboard' },
    { to: '/aptitude', icon: <HiOutlineLightBulb />, label: 'Aptitude' },
    { to: '/coding', icon: <HiOutlineCode />, label: 'Coding' },
    { to: '/interview', icon: <HiOutlineChatAlt2 />, label: 'Interview' },
    { to: '/resources', icon: <HiOutlineBookOpen />, label: 'Resources' }
  ];

  const adminLinks = [
    { to: '/admin', icon: <HiOutlineViewGrid />, label: 'Admin Dashboard' },
    { to: '/admin/aptitude', icon: <HiOutlineLightBulb />, label: 'Manage Aptitude' },
    { to: '/admin/coding', icon: <HiOutlineCode />, label: 'Manage Coding' },
    { to: '/admin/interview', icon: <HiOutlineChatAlt2 />, label: 'Manage Interview' },
    { to: '/admin/resources', icon: <HiOutlineBookOpen />, label: 'Manage Resources' }
  ];

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-logo">
        <h1>PlacePrep</h1>
      </div>
      <nav className="sidebar-nav">
        {user?.role !== 'admin' && (
          <div className="nav-section">
            <span className="nav-section-title">Main Menu</span>
            {studentLinks.map(link => (
              <NavLink key={link.to} to={link.to} end={link.to === '/dashboard' || link.to === '/admin'} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeSidebar}>
                <span className="nav-icon">{link.icon}</span> {link.label}
              </NavLink>
            ))}
          </div>
        )}
        {user?.role === 'admin' && (
          <div className="nav-section" style={{ marginTop: '1rem' }}>
            <span className="nav-section-title">Admin Controls</span>
            {adminLinks.map(link => (
              <NavLink key={link.to} to={link.to} end={link.to === '/admin'} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeSidebar}>
                <span className="nav-icon">{link.icon}</span> {link.label}
              </NavLink>
            ))}
          </div>
        )}
        <div className="nav-section" style={{ marginTop: '1rem' }}>
          <span className="nav-section-title">Account</span>
          <NavLink to="/profile" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeSidebar}>
            <span className="nav-icon"><HiOutlineUser /></span> Profile
          </NavLink>
        </div>
      </nav>
      <div className="sidebar-footer">
        <button onClick={handleLogout} className="logout-btn">
          <span className="nav-icon"><HiOutlineLogout /></span> Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
