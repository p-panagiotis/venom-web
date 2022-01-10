import { useEffect, useState } from 'react';
import { useToast } from '../../contexts/Toast';
import Timer from '../../utils/timer';

const Toast = props => {
  const { id, content, appearance, autoDismiss, dismissTimeout } = props;
  const { removeToast } = useToast();

  const [dismiss, setDismiss] = useState('in');
  const [playState, setPlaystate] = useState('running');
  const [timer, setTimer] = useState();

  useEffect(() => {
    if (!autoDismiss) return;

    let timer = new Timer(onDismiss, dismissTimeout);
    setTimer(timer);

    return () => timer.clear();
    // eslint-disable-next-line
  }, []);
  
  const handleToastIcon = () => {
    if (appearance === 'success') return 'fas fa-check'; 
    if (appearance === 'info') return 'fas fa-exclamation-circle'; 
    if (appearance === 'warning') return 'fas fa-exclamation-triangle'; 
    if (appearance === 'error') return 'fas fa-exclamation-circle'; 

    return '';
  }

  const onDismiss = () => {
    setDismiss('out');
    removeToast(id);
  }

  const onMouseEnter = () => {
    if (!autoDismiss) return;

    setPlaystate('paused');
    timer.pause();
  }

  const onMouseLeave = () => {
    if (!autoDismiss) return;

    setPlaystate('running');
    timer.resume();
  }

  return (
    <div className={`toast toast-${appearance} toast-${dismiss}`} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className='toast-icon'>
        <i className={handleToastIcon()} />
      </div>
      <div className='toast-content-wrapper'>
        <section>{content}</section>
        {
          !autoDismiss &&
          <div className='toast-remove' onClick={onDismiss}>
            <i className='fas fa-times' />
          </div>
        }
      </div>
      { 
        autoDismiss && 
        <div 
          className='toast-countdown' 
          style={
            {
              animationDuration: `${dismissTimeout}ms`, 
              WebkitAnimationDuration: `${dismissTimeout}ms`, 
              animationPlayState: `${playState}`, 
              WebkitAnimationPlayState: `${playState}`
            }
          } 
        />
      }
    </div>
  );
}

export default Toast;
