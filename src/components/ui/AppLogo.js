import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const AppLogo = ({ src='logo.svg', width=450, style }) => {

  useEffect(() => {

    document.documentElement.style.setProperty('--app-logo-width', width + 'px');
  }, [width]);

  return (
    <div className='app-logo' style={style}>
      <Link to='/'>
        <img src={`./${src}`} alt='logo' />
      </Link>
    </div>
  )
}

export default AppLogo;
