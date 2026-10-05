import { useAuth } from '../hooks/useAuth';
import { HiOutlineMail, HiOutlineUser, HiOutlineShieldCheck, HiOutlineCalendar } from 'react-icons/hi';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div style={{ maxWidth: 600 }}>
      <div className="page-header">
        <h1>Profile</h1>
        <p>Your account information</p>
      </div>

      <div className="card">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 700, color: 'white', margin: '0 auto 1rem'
          }}>
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700 }}>{user?.name}</h2>
          <p style={{ color: 'var(--text-secondary)', textTransform: 'capitalize' }}>{user?.role}</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.85rem', background: 'var(--bg-primary)', borderRadius: 'var(--radius)' }}>
            <HiOutlineUser style={{ color: 'var(--primary-light)', fontSize: '1.2rem' }} />
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Full Name</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>{user?.name}</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.85rem', background: 'var(--bg-primary)', borderRadius: 'var(--radius)' }}>
            <HiOutlineMail style={{ color: 'var(--primary-light)', fontSize: '1.2rem' }} />
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Email Address</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>{user?.email}</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.85rem', background: 'var(--bg-primary)', borderRadius: 'var(--radius)' }}>
            <HiOutlineShieldCheck style={{ color: 'var(--primary-light)', fontSize: '1.2rem' }} />
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Role</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 500, textTransform: 'capitalize' }}>{user?.role}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
