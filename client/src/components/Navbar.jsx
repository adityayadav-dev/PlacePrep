import { useAuth } from '../hooks/useAuth';
import { HiOutlineMenu } from 'react-icons/hi';

const Navbar = ({ toggleSidebar }) => {
  const { user } = useAuth();

  return (
    <header className="navbar">
      <button className="menu-toggle" onClick={toggleSidebar}>
        <HiOutlineMenu />
      </button>

      <div className="navbar-right">
        <div className="user-info">
          <div className="user-details" style={{ textAlign: 'right' }}>
            <span className="user-name">{user?.name}</span>
            <span className="user-role">{user?.role}</span>
          </div>
          <div className="user-avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
