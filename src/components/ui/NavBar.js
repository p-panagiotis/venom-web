import { NavLink } from 'react-router-dom';
import { useSession } from '../../contexts/Session';

const NavBar = () => {

  const { session } = useSession();

  if (!session.isAuthenticated) {
    return false;
  }

  const toggleSideBar = () => document.querySelector('#nav-sidebar').classList.toggle('active');

  return (
    <nav id='navbar'>
      <div className='nav-btn' onClick={toggleSideBar}>
        <i className='fas fa-bars' />
      </div>
      <div className='nav-wrapper'>
        <ul className='nav-links'></ul>
        <ul className='nav-links-extended'>
          <NavLink to='/settings/profile' className='nav-link' title={session.user.username}>
            <i className='fas fa-user nav-icon' />
          </NavLink>

          <NavLink to='/contactus' className='nav-link' title='Contact us'>
            <i className='fas fa-address-card nav-icon' />
          </NavLink>

          <div className='nav-link' title='Sign out' onClick={session.invalidate}>
            <i className='fas fa-sign-out-alt nav-icon' />
          </div>
        </ul>  
      </div>
    </nav>
  );
};

export default NavBar;
