import { useEffect, useState } from 'react'
import API from '../services/API'
import Header from './ui/Header'
import Card from '../components/ui/Card'

const Roles = () => {

  const [roles, setRoles] = useState([])
 
  useEffect(() => API.get('/core/api/users/roles').then(data => setRoles(data)), [])
  
  return (
    <div id='roles-container'>
      <Header text='Administrator roles available' />

      <p>A role provides access to predefined APIs so that depending on the assigned role an administrator can have access to what he needs.</p>
      <div className='roles'>
        {
          roles.map((role, key) => 
            <Card 
              title={role.name} 
              content={role.description} 
              avatar={<i className='far fa-id-badge' />} 
              tags={[`${role.users_count} ACCOUNTS`]}
              key={key} 
            />
          )
        }
      </div>
    </div>
  )
}

export default Roles
