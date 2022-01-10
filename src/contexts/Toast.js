import { createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { isBlank } from '../utils/helpers';
import Toast from '../components/ui/Toast';

const ToastContext = createContext();

export const ToastProvider = props => {

  const { position='bottom right' } = props;

  const [toasts, setToast] = useState([]);
  
  const addToast = (content, options) => {
    if (isBlank(content)) {
      return;
    }

    const id = `toast-${Date.now()}`;
    const newToast = { id, content, ...options };

    setToast(toasts => [...toasts, newToast]);
  }

  // delay removal from DOM for dismissal animation
  const removeToast = id => setTimeout(setToast(toasts => toasts.filter(t => t.id !== id), 500));
    
  const success = (content, options) => addToast(
    content, { 
      ...{ 
        appearance: 'success', 
        autoDismiss: true, 
        dismissTimeout: 2000
      }, 
      ...options
    }
  );
  
  const error = (content, options) => addToast(
    content, { 
      ...{ 
        appearance: 'error', 
        autoDismiss: true, 
        dismissTimeout: 5000 
      }, 
      ...options 
    }
  );
  
  const info = (content, options) => addToast(
    content, { 
      ...{ 
        appearance: 'info', 
        autoDismiss: true, 
        dismissTimeout: 2000
      }, 
      ...options 
    }
  );
  
  const warning = (content, options) => addToast(
    content, { 
      ...{ 
        appearance: 'warning', 
        autoDismiss: true, 
        dismissTimeout: 2000 
      }, 
      ...options 
    }
  );

  return (
    <ToastContext.Provider value={{addToast, removeToast, success, error, info, warning, toasts}}>
      { props.children }
      {
        createPortal(
          <div id='toasts-container' className={position}>
            { toasts.map(toast => <Toast key={toast.id} {...toast} />) }
          </div>,
          document.body
        )
      }
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw Error('The `useToast` hook must be called from a descendent of the `ToastProvider`');
  }

  return { 
    toast: {
      success: context.success,
      error: context.error,
      info: context.info,
      warning: context.warning
    },
    addToast: context.addToast,
    removeToast: context.removeToast,
    toasts: context.toasts
  }
}
