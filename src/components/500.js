import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppLogo from './ui/AppLogo';

const Route500 = () => {

  const routeClass = 'error-route';

  useEffect(() => {
    document.body.classList.add(routeClass);
    
    return () => document.body.classList.remove(routeClass);
  }, []);

  const handleOnClick = () => document.body.classList.remove(routeClass);

  return (
    <>
      <AppLogo width={200} />
      <div id='error-route-container'>
        <div className='wrapper'>
          <div className='title'>500</div>
          <div className='subtitle'>Sorry...It's not you. It's us.</div>
          <div className='desc'>We're experiencing an internal server problem. Please try again later.</div>
          <Link to='/' className='link' onClick={handleOnClick}>Go to home</Link> 
        </div>
      </div>
    </>
  );
}

export default Route500;
