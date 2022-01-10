import { useEffect, useState } from 'react'
import { useHistory, Link } from 'react-router-dom' 
import { useToast } from '../contexts/Toast'
import API from '../services/API'
import Header from './ui/Header'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Grid from './ui/Grid'

const Groups = () => {

  const URL = '/core/api/users/groups'
  const [groups, setGroups] = useState([])
  const history = useHistory()
  const { toast } = useToast()
 
  // useEffect(() => fetchGroups(), [])

  const handelOnDelete = data => {
    toast.success(`User group '${data.name}' successfully deleted`)
    fetchGroups()
  }

  const fetchGroups = () => API.get(URL).then(data => setGroups(data))
  
  return (
    <div id='groups-container'>
      <Header text='Administrator user groups available'>
        <Button onclick={() => history.push('/admin/groups/new')}>Add group</Button>
      </Header>
      <p>A user group provides access to predefined APIs so that depending on the assigned role a user can have access to what he needs.</p>

      <Grid 
        url={URL}
        pageSize={10}
        defaultSort={{ field: 'id', dir: 'asc'}}
        cols={
          [
            {
              title: 'ID',
              property: 'id',
              type: 'number',
              sortable: false
            },
            {
              title: 'Name',
              property: 'name'
            },
            {
              title: 'Description',
              property: 'description'
            }
            
          ]
        }
      /> 
      {/* <div className='groups'>
        {
          groups.map((group, key) => 
            <Card 
              key={key}
              title={group.name}
              content={group.description} 
              avatar={<i className='fas fa-user-friends' />} 
              tags={[`${group.roles_count} ROLES`, `${group.users_count} ACCOUNTS`]}
              linkTo={`/admin/groups/${group.id}`} 
              linkLabel='Manage group'
              deleteURL={`${URL}/${group.id}`}
              ondelete={handelOnDelete}
            />
          )
        }
      </div> */}
    </div>
  )
}

export default Groups
