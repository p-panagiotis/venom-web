import { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Form from './ui/Form'
import Header from './ui/Header'
import AppLogo from './ui/AppLogo'

const SignUp = () => {

  useEffect(() => document.body.classList.add('public-route'), [])

  const history = useHistory()

  const handleOnSuccess = () => history.push('/')

  return (
    <>
      <AppLogo width={200} />
      <div id='signup-container'>
        <div className='signup-wrapper'>
          <div className='signup-content'>
            <Header text='Sign Up' fontSize={28} align='center' line={false} />

            <Form url='/core/api/users' onsuccess={handleOnSuccess} width={350}>
              <Form.Input property='username' label='Username' required={true} />
              <Form.Input type='email' property='email' label='Email address' required={true} />
              <Form.Input type='password' property='password' label='Password' required={true} />
              <Form.Submit>Create account</Form.Submit>
            </Form>
            
            <div className='auth-link'>
              <span>Already have an account? <Link to='/signin'>Sign in</Link></span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp
