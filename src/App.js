import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// import global app scss
import './App.scss';

// import contexts
import { SessionProvider, UnauthenticatedRoute, AuthenticatedRoute } from './contexts/Session';
import { ToastProvider } from './contexts/Toast';

// import ui components
import NavBar from './components/ui/NavBar';
import SideBar from './components/ui/SideBar';

// import routable components
import Route404 from './components/404';
import Route500 from './components/500';
import Auth from './components/Auth';
import SignUp from './components/SignUp';
import ResetPassword from './components/ResetPassword';
import Index from './components/Index';
import Profile from './components/Profile';
import Account from './components/Account';
import Security from './components/Security';
import ContactUs from './components/ContactUs';
import Roles from './components/Roles';
import Groups from './components/Groups';
import Group from './components/Group';

const App = () => {
  return (
    <Router>
      <SessionProvider>
        <ToastProvider>
          <SideBar />
          <div id='app'>
            <NavBar />
            <main>
              <Switch>
                {/* Unprotected routes */}
                <UnauthenticatedRoute exact path='/signin' component={Auth} />
                <UnauthenticatedRoute exact path='/signup' component={SignUp} />
                <UnauthenticatedRoute exact path='/resetpassword' component={ResetPassword} />

                {/* Protected routes */}
                <AuthenticatedRoute exact path='/' component={Index} />
                <AuthenticatedRoute exact path='/contactus' component={ContactUs} />
                <AuthenticatedRoute path='/settings/profile' component={Profile} />
                <AuthenticatedRoute path='/settings/account' component={Account} />
                <AuthenticatedRoute path='/settings/security' component={Security} />
                <AuthenticatedRoute exact path='/admin/roles' component={Roles} />
                <AuthenticatedRoute exact path='/admin/groups' component={Groups} />
                <AuthenticatedRoute exact path='/admin/groups/:id' component={Group} />

                {/* Error routes */}
                <Route path='/500' component={Route500} />
                <Route path='*' component={Route404} />
              </Switch>
            </main>
          </div>
        </ToastProvider>
      </SessionProvider>
    </Router>
  );
}

export default App;
