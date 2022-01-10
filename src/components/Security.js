import { useSession } from '../contexts/Session'
import { useToast } from '../contexts/Toast'
import Form from './ui/Form'
import Header from './ui/Header'

const Security = () => {

  const { session } = useSession()
  const { toast } = useToast()

  const handleOnSuccess = () => {
    toast.info('Please sign in again to verify password change. You will be shortly redirected to Sign In page...', { dismissTimeout: 5000 })

    // delay 5 seconds before invalidating session
    setTimeout(session.invalidate, 5000)
  }

  return (
    <div className='setting-container'>
      <Header text='Change password' />
      <Form url={`/core/api/users/${session.user.id}/changepassword`} method='PUT' width={385} onsuccess={handleOnSuccess}>
        <Form.Input type='password' property='old_password' label='Old password' required={true} />
        <Form.Input type='password' property='new_password' label='New password' required={true} />
        <Form.Input 
          type='password' 
          property='confirm_password' 
          label='Confirm password' 
          validateWithProperty='new_password'
          validateWithPropertyMessage='Passwords do not match'
          required={true}
        />
        <Form.Submit>Update password</Form.Submit>
      </Form>
    </div>
  )
}

export default Security
