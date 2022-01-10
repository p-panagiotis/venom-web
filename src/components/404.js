import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppLogo from './ui/AppLogo';

const Route404 = () => {

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
          <div className='title'>404</div>
          <div className='subtitle'>Hmmm...</div>
          <div className='desc'>It looks like one of the developers fell asleep</div>
          <Link to='/' className='link' onClick={handleOnClick}>Go to home</Link> 
        </div>
      </div>
    </>
  );
}

export default Route404;
