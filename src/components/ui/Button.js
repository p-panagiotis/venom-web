import { noob } from '../../utils/helpers';
import { useForm } from './Form';

const Button = props => {

  let { disabled, onclick=noob } = props;

  const { submitOwner, submittingOwner } = useForm();

  const handleOnClick = event => {
    // call owner submit callback
    submitOwner(event);
    
    // call props onclick callback 
    onclick(event);
  }

  return (
    <button type='button' className='ui-button' disabled={disabled || submittingOwner} onClick={handleOnClick}>
      {props.children}
      { submittingOwner && <i className='fas fa-circle-notch fa-lg fa-spin' /> }
    </button>
  )
};

export default Button;
