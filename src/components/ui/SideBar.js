import { NavLink } from 'react-router-dom';
import { useSession } from '../../contexts/Session';
import useRole from '../../hooks/useRole';
import AppLogo from './AppLogo';

const SideBar = () => {

  const { session } = useSession();
  const { Role } = useRole();

  if (!session.isAuthenticated) {
    return false;
  }

  const handleOnClickDropdown = e => {
    e.preventDefault()

    let dropdown = e.target.closest('[data-dropdown]')
    dropdown.classList.toggle('active')
    
    document.querySelectorAll('[data-dropdown].active').forEach(d => d !== dropdown && d.classList.remove('active'))
  }

  const handleOnClick = () => document.querySelectorAll('[data-dropdown].active').forEach(d => d.classList.remove('active'))
  
  return (
    <aside id='nav-sidebar'>
       <div className='nav-header'>
        <AppLogo src='logo.svg' width={180} style={{ margin: '7px 10px' }} />
      </div>
   
      <ul className='nav-links'>

        <NavLink exact id='dashboard' to='/' className='nav-link' onClick={handleOnClick}>
          <i className='fas fa-th-large' />
          <span className='nav-label'>Dashboard</span>
          <span className='nav-tooltip'>Dashboard</span>
        </NavLink>

        {
          Role.SUPER_ADMIN && (
            <div className='nav-dropdown' data-dropdown>
              <NavLink id='admin' to='/admin' className='nav-link' onClick={handleOnClickDropdown}>
                <i className='fas fa-user-cog' />
                <span className='nav-label'>Admin</span>
                <span className='nav-tooltip'>Admin</span>
              </NavLink>

              <div className='nav-dropdown-menu' data-dropdown-menu>
                <NavLink exact id='admin-roles' to='/admin/roles' className='nav-link' onClick={handleOnClick}>
                  <i className='far fa-id-badge' />
                  <span className='nav-label'>Roles</span>
                </NavLink>

                <NavLink exact id='admin-groups' to='/admin/groups' className='nav-link' onClick={handleOnClick}>
                  <i className='fas fa-user-friends' />
                  <span className='nav-label'>Groups</span>
                </NavLink>

                <NavLink exact id='admin-users' to='/admin/users' className='nav-link' onClick={handleOnClick}>
                  <i className='fas fa-users' />
                  <span className='nav-label'>Users</span>
                </NavLink>
              </div>
            </div>
          )
        }
        
        <div className='nav-dropdown' data-dropdown>
          <NavLink id='settings' to='/settings' className='nav-link' onClick={handleOnClickDropdown}>
            <i className='fas fa-cog' />
            <span className='nav-label'>Settings</span>
            <span className='nav-tooltip'>Settings</span>
          </NavLink>

          <div className='nav-dropdown-menu' data-dropdown-menu>
            <NavLink exact id='settings-profile ' to='/settings/profile' className='nav-link' onClick={handleOnClick}>
              <i className='fas fa-user' />
              <span className='nav-label'>Profile</span>
            </NavLink>

            <NavLink exact id='settings-account ' to='/settings/account' className='nav-link' onClick={handleOnClick}>
              <i className='fas fa-user-circle' />
              <span className='nav-label'>Account</span>
            </NavLink>

            <NavLink exact id='settings-security ' to='/settings/security' className='nav-link' onClick={handleOnClick}>
              <i className='fas fa-shield-alt' />
              <span>Security</span>
            </NavLink>
          </div>
        </div>
      </ul> 
    </aside>
  );
};

export default SideBar;
