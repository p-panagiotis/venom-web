import { useSession } from '../contexts/Session'
import { useToast } from '../contexts/Toast'
import useRole from '../hooks/useRole'
import API from '../services/API'
import Button from './ui/Button'
import Header from './ui/Header'

const Account = () => {

  const { session } = useSession()
  const { toast } = useToast()
  const { Role } = useRole()

  const handleOnClick = () => {
    API.delete(`/core/api/users/${session.user.id}`).then(() => {
      toast.success('Account successfully deleted')

      // delay 2 seconds before saying goodbye
      setTimeout(session.invalidate, 2000)
    }).catch(error => toast.error(error.detail))
  }

  return (
    <div id='user-account-container' className='setting-container'>
      <Header text='Delete account' color='#ed5152' />
      <p>Once you delete your account, there is no going back. Please be certain.</p>
      <Button onclick={handleOnClick} disabled={Role.SUPER_ADMIN}>Delete account</Button>
    </div>
  )
}

export default Account
