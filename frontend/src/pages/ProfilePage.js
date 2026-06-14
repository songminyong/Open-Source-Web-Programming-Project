import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, Mail, LogOut } from 'lucide-react';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="container" style={{ maxWidth: '600px', padding: '60px 20px' }}>
      <div className="card animate-up" style={{ padding: '40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: 'rgba(46, 125, 50, 0.1)',
            color: 'var(--primary)',
            fontSize: '2rem',
            fontWeight: 'bold',
            marginBottom: '16px'
          }}>
            {user.username ? user.username.charAt(0).toUpperCase() : 'U'}
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', margin: '0 0 8px 0', color: 'var(--text)' }}>My Profile</h2>
          <p className="text-muted" style={{ fontSize: '0.9rem', margin: 0 }}>Manage your KoMong travel account</p>
        </div>

        <div style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '24px 0', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <User style={{ width: '20px', height: '20px', color: 'var(--text-muted)' }} />
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Username</div>
              <div style={{ fontWeight: '500', color: 'var(--text)' }}>{user.username}</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Mail style={{ width: '20px', height: '20px', color: 'var(--text-muted)' }} />
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Email Address</div>
              <div style={{ fontWeight: '500', color: 'var(--text)' }}>{user.email}</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
          <button
            onClick={() => navigate('/community')}
            className="btn btn-outline"
            style={{ flex: 1 }}
          >
            My Reviews & Community
          </button>
          
          <button
            onClick={handleLogout}
            className="btn btn-primary"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', flex: 1, backgroundColor: '#d32f2f', borderColor: '#d32f2f' }}
          >
            <LogOut style={{ width: '16px', height: '16px' }} />
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
