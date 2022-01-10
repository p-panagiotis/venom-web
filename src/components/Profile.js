import { useState, useEffect } from 'react'
import { useSession } from '../contexts/Session'
import { useToast } from '../contexts/Toast'
import API from '../services/API'
import Form from './ui/Form'
import Header from './ui/Header'

const Profile = () => {

  const [state, setState] = useState()
  const { session } = useSession()
  const { toast } = useToast()

  useEffect(() => { 
    API.get(`/core/api/users/${session.user.id}`)
      .then(response => setState(response))
      .catch(error => toast.error(error.detail))
    // eslint-disable-next-line
  }, [])

  const handleOnSuccess = () => toast.success('Personal info successfully updated')

  return (
    <div className='setting-container'>
      <Header text='Personal info' />
      <Form url={`/core/api/users/${session.user.id}`} method='PUT' onsuccess={handleOnSuccess} state={state} width={385}>
        <Form.Input property='first_name' label='First name' />
        <Form.Input property='last_name' label='Last name' />
        <Form.Input property='username' label='Username' disabled={true} />
        <Form.Input type='email' property='email' label='Email address' required={true} />
        <Form.Submit>Update profile</Form.Submit>
      </Form>
    </div>
  )
}

export default Profile
