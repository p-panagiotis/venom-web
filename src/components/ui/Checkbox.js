import { useEffect } from 'react';
import { generateUID, noob, isEmpty } from '../../utils/helpers';
import { useForm } from './Form';

const Checkbox = props => {

  let { property, label, disabled, checked=false, onchange = noob } = props;

  const { ownerState, registerOwner, updateOwner } = useForm();
  const uid = generateUID();

  useEffect(() => {
    // register component properties to owner state
    registerOwner({ 
      property: property, 
      args: {
        type: 'checkbox',
        property: property,
        value: checked,
        errors: []
      } 
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isEmpty(ownerState)) {
      return;
    }
    
    // set checkbox value from owner state
    document.getElementById(`${uid}`).checked = ownerState[property].value;
    // eslint-disable-next-line
  }, [ownerState]);

  const handleOnChange = event => {
    let value = event.target.checked;

    // update owner state
    updateOwner({ property: property, value: value })

    // call props onchange callback
    onchange(property, value, event);
  }
  
  return (
    <div className='ui-checkbox'>
      <label>{label}</label>
      <input type='checkbox' id={uid} name={property} disabled={disabled} defaultChecked={checked} onChange={handleOnChange} />
    </div>
  );
}

export default Checkbox;
