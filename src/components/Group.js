import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Form from './ui/Form'
import { useToast } from '../contexts/Toast'
import API from '../services/API'

const Group = props => {

  const URL = '/core/api/users/groups'
  const id = props.match.params.id
  const isNewGroup = isNaN(id)
  const history = useHistory()
  const { toast } = useToast()
  const [state, setState] = useState()
  const [endpoint, setEndpoint] = useState()

  useEffect(() => {
    setEndpoint(isNewGroup ? { url: URL, method: 'POST' } : { url: `${URL}/${id}`, method: 'PUT' })

    if (!isNewGroup) {
      API.get(`${URL}/${id}`).then(data => setState(data))
    }
  }, [isNewGroup, id])

  const handleOnSuccess = data => {

    if (isNewGroup) {
      toast.success(`User group '${data.name}' successfully added`)
      history.push('/admin/groups')
      return
    }

    toast.success(`User group '${data.name}' successfully updated`)
  }

  return (
    <div id='group-container'>
      <header className='header'>
        <i className='fas fa-times' title='Cancel' onClick={() => history.goBack()} />
      </header>

      <div className='group-info'>
        <header className='header-info'> 
          <h2>User group info</h2>
          <i className='fas fa-user-friends' />
        </header>
        <Form {...endpoint} state={state} width={400} onsuccess={handleOnSuccess}>
          <Form.Input property='name' label='Name' required={true} />
          <Form.TextArea property='description' label='Description' />
          <Form.Submit>{ isNewGroup ? 'Add user group' : 'Update user group'}</Form.Submit>
        </Form>
      </div>
    </div>
  )
}

export default Group