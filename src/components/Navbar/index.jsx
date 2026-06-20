import { useNavigate, useLocation } from 'react-router-dom';
import BengaluruUpdates from '../BengaluruUpdates';
import './styles.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.includes(path)) return true;
    return false;
  };

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => navigate('/')}>TRAFFIC HIVE</div>
      <div className="nav-links">
        <a
          onClick={() => navigate('/')}
          className={isActive('/') ? 'active' : ''}
        >HOME</a>
        <a
          onClick={() => navigate('/detection')}
          className={isActive('/detection') ? 'active' : ''}
        >DETECTION</a>
        <a
          onClick={() => navigate('/analytics')}
          className={isActive('/analytics') ? 'active' : ''}
        >ANALYTICS</a>
        <BengaluruUpdates />
      </div>
    </nav>
  );
};

export default Navbar;
