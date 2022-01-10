import { useEffect } from 'react';
import { generateUID, noob, isEmpty } from '../../utils/helpers'; 
import { useForm } from './Form';
import FormErrors from './FormErrors';

const TextArea = props => {

  const { ownerState, registerOwner, updateOwner } = useForm();
  const uid = generateUID();

  let {
    property,
    label,
    placeholder,
    value,
    rows=5,
    required,
    disabled,
    spellCheck=false,
    onchange=noob
  } = props;

  useEffect(() => {
    // register component properties to owner state
    registerOwner({ 
      property: property, 
      args: {
        type: 'text',
        property: property,
        value: value || null,
        required: required,
        errors: []
      } 
    });

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isEmpty(ownerState)) {
      return;
    }
    
    // set input value from owner state
    document.getElementById(`${uid}`).value = ownerState[property].value;
    // eslint-disable-next-line
  }, [ownerState]);

  const handleOnChange = event => {
    let value = event.target.value || null;

    // update owner state
    updateOwner({ property: property, value: value })

    // call props onchange callback
    onchange(property, value, event);
  }

  return (
    <div className='ui-textarea'>
      <label htmlFor={uid}>{label} {label && required && '*'}</label>
      <textarea 
        id={uid}
        name={property} 
        rows={rows} 
        placeholder={placeholder}
        defaultValue={value}
        spellCheck={spellCheck}
        disabled={disabled}
        required={required}
        onChange={handleOnChange}
      />
      <FormErrors errors={!isEmpty(ownerState) ? ownerState[property].errors : []} />
    </div>
  )
}

export default TextArea;
