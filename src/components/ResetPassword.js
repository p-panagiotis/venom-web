import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import API from '../services/API'
import Form from './ui/Form'
import Button from './ui/Button'
import Header from './ui/Header'
import AppLogo from './ui/AppLogo'

const ResetPassword = props => {

  const [token, setToken] = useState()
  const [requestToken, setRequestToken] = useState()
  const [tokenExpired, setTokenExpired] = useState()
  const [user, setUser] = useState()

  useEffect(() => {
    document.body.classList.add('public-route')
    
    // verify given token
    verifyToken()

    // eslint-disable-next-line
  }, [])

  const verifyToken = () => {
    // get token from url
    const token = new URLSearchParams(props.location.search).get('token')
    
    setToken(token)

    if (token) {
      API.post('/core/api/users/resetpassword/token/verify', { data: { token: token }}).then(response => {
        setTokenExpired(response.expired)
        setUser(response.user)
      }).catch(() => setTokenExpired(true))
    }

    return
  }

  return (
    <>
      <AppLogo width={200} />
      <div id='reset-password-container'>
        <div className='reset-password-wrapper'>
          <div className='reset-password-content'>
            {
              !token || tokenExpired ?
              <>
                <Header text='Reset your password' fontSize={28} line={false} />
                {
                  requestToken ?
                  <>
                    <p>Check your email for a link to reset your password. If it doesn't appear within a few minutes, check your spam folder.</p>
                    <div><Link to='/signin'><Button>Return to sign in</Button></Link></div>
                  </>
                  :
                  <>
                    {
                      tokenExpired && <p className='token-expired'><b>It looks like you clicked on an invalid password reset link. Please try again.</b></p>
                    }
                    <p><em>Enter your user account's verified email address and we will send you a password reset link</em></p>
                    <Form url='/core/api/users/resetpassword/token' onsuccess={() => setRequestToken(true)}>
                      <Form.Input type='email' property='email' placeholder='Enter your email address' required={true} />
                      <Form.Submit>Send password reset email</Form.Submit>
                    </Form>
                  </>
                }
              </> :
              user &&
              <>
                <Header text={`Change password for @${user.username}`} fontSize={28} line={false} />
                <Form url={`/core/api/users/${user.id}/resetpassword`} formData={{token: token}} method='PUT' onsuccess={() => window.location = '/signin'}>
                  <Form.Input type='password' property='new_password' label='New password' required={true} />
                  <Form.Input 
                    type='password' 
                    property='confirm_password' 
                    label='Confirm password' 
                    required={true} 
                    validateWithProperty='new_password' 
                    validateWithPropertyMessage='Passwords do not match' />
                  <Form.Submit>Change password</Form.Submit>
                </Form>
              </> 
            } 
            { !requestToken && <div className='auth-link'><Link to='/signin'>Return to sign in</Link></div> }
          </div>
        </div>
      </div>
    </>
  )
}

export default ResetPassword
