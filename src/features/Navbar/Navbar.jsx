import { useLocation, useNavigate } from 'react-router-dom';
import { UilSetting, UilBackspace } from '@iconscout/react-unicons';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav>
      <h2>{location.pathname === '/' ? 'Home' : <button type="button" aria-label="Save" onClick={() => navigate(-1)}><UilBackspace size="30" /></button> }</h2>
      <h2 className="continent">{location.pathname === '/' ? 'Continent' : 'Country'}</h2>
      <UilSetting />
    </nav>
  );
};

export default Navbar;
