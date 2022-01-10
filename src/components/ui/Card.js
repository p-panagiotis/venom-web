import { Link } from 'react-router-dom'
import API from '../../services/API'
import { useToast } from '../../contexts/Toast'
import { isBlank, isNull, noob } from '../../utils/helpers'

const Card = props => {

  let { 
    title, 
    content, 
    tags, 
    avatar, 
    linkTo, 
    linkLabel, 
    deleteURL, 
    ondelete=noob
  } = props
  
  const { toast } = useToast()

  const handleOnDelete = () => {  
    // in case no deleteURL provided deletion will be aborted
    if (isBlank(deleteURL)) return

    // API request for card entity deletion
    API.delete(deleteURL).then(data => ondelete(data), error => toast.error(error.detail))
  }

  return (
    <div className='ui-card'>
      <header>{avatar}</header>
      <section>
        <div>{title}</div>
        <div className='tags'>
          { !isNull(tags) && tags.map((tag, key) => <div className='tag' key={key}>{tag}</div>) }
        </div> 
        <div>{content}</div>
      </section>
      {
        (!isBlank(linkTo) || !isBlank(deleteURL)) &&
        <footer>
          { !isBlank(linkTo) && <Link to={linkTo}>{linkLabel}</Link> }
          {
            !isBlank(deleteURL) && (
              <div className='delete-card' onClick={handleOnDelete}>
                <i className='fas fa-trash' />
              </div>  
            )
          }
        </footer>
      }
    </div>
  )
}

export default Card
