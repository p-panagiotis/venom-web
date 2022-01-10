import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSession } from '../contexts/Session';
import { useToast } from '../contexts/Toast';
import Form from './ui/Form';
import AppLogo from './ui/AppLogo';

const Auth = () => {

  const { session } = useSession();
  const { toast } = useToast();

  useEffect(() => document.body.classList.add('public-route'), []);

  const handleOnSubmit = async data => {
    let { username, password } = data;
    await session.auth(username, password).catch(error => toast.error(error.detail));
  }

  return (
    <div id='auth-container'>
      <AppLogo />
      <div className='auth-wrapper'>
        <section>
          <Form onsubmit={handleOnSubmit} width={350}>
            <Form.Input property='username' placeholder='Username' required={true} />
            <Form.Input type='password' property='password' placeholder='Password' required={true} />
            <Form.Submit>Sign In</Form.Submit>
          </Form>
          <div className='reset-password'>
            <Link to='/resetpassword'>Forgot password?</Link>
          </div>
          <div className='line' />
          <div className='create-account'>
            <Link to='/signup'>Create account</Link>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Auth;
