import { createContext, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import API from '../services/API';

const SessionContext = createContext();

const authenticated = () => {
  const cookie = Cookies.get('Authorization');

  if (!cookie) {
    localStorage.setItem('user', JSON.stringify({ isAuthenticated: false, data: null }));
  }

  let user = JSON.parse(localStorage.getItem('user'));
  if (!user && cookie) {
    Cookies.remove('Authorization');
  }
  
  return user && user.isAuthenticated;
}

export const SessionProvider = (props) => {

  const handleAuth = async (username, password) => {
    try {
      await API.post('/core/api/oauth2/token', {
        data: {
          username: username,
          password: password
        }
      }).then(response => {
        localStorage.setItem('user', JSON.stringify({ isAuthenticated: true, data: response }));
        window.location = '/';
        return response;
      });
    } catch (error) {
      localStorage.setItem('user', JSON.stringify({ isAuthenticated: false, data: null }));
      throw error;
    }
  }

  const isAuthenticated = (() => authenticated())()

  const authenticatedUser = (() => {
    let user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.isAuthenticated) {
      return null;
    }
    return user.data;
  })()

  return (
    <SessionContext.Provider value={{handleAuth, invalidateSession, isAuthenticated, authenticatedUser}}>
      {props.children}
    </SessionContext.Provider>
  )
}

export const invalidateSession = async () => {
  if (!authenticated()) {
    return;
  }

  try {
    await API.post('/core/api/oauth2/logout').then(() => {
      localStorage.setItem('user', JSON.stringify({ isAuthenticated: false, data: null }));
      window.location = '/';
    });
  } catch (error) {
    localStorage.setItem('user', JSON.stringify({ isAuthenticated: false, data: null }));
  }
}

export const useSession = () => {
  const context = useContext(SessionContext);

  if (!context) {
    throw Error('The `useSession` hook must be called from a descendent of the `SessionProvider`');
  }

  return {
    session: {
      auth: context.handleAuth,
      invalidate: context.invalidateSession,
      isAuthenticated: context.isAuthenticated,
      user: context.authenticatedUser
    }
  }
}

export const AuthenticatedRoute = ({component: Component, ...rest}) => {
  const context = useContext(SessionContext);

  return (
    <Route 
      {...rest}
      render={ props => (
        context.isAuthenticated ? <Component {...props} /> : <Redirect to='/signin' />
      )}
    />
  )
}

export const UnauthenticatedRoute = ({component: Component, ...rest}) => {
  const context = useContext(SessionContext);

  return (
    <Route 
      {...rest}
      render={ props => (
        !context.isAuthenticated ? <Component {...props} /> : <Redirect to='/' />
      )}
    />
  )
};
