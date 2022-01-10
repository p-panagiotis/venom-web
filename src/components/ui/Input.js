import { useEffect, useState } from 'react';
import { generateUID, noob, isEmpty, isBlank } from '../../utils/helpers';
import { useForm } from './Form';
import FormErrors from './FormErrors';

const Input = props => {

  let { 
    type='text', 
    property,
    value, 
    label, 
    placeholder, 
    required=false, 
    disabled, 
    maxLength,
    spellCheck=false,
    validateWithProperty,
    validateWithPropertyMessage,
    onchange=noob
  } = props;

  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const [isPasswordField] = useState(type === 'password');
  const { ownerState, registerOwner, updateOwner } = useForm();
  const uid = generateUID();

  useEffect(() => {
    // register component properties to owner state
    registerOwner({ 
      property: property, 
      args: { 
        type: type,
        required: required, 
        value: value || null,
        validateWithProperty: validateWithProperty,
        validateWithPropertyMessage: validateWithPropertyMessage,
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
    <div className='ui-input'>
      <label htmlFor={uid}>{label} {label && required && '*'}</label>
      <input 
        id={uid} 
        type={isPasswordField ? isPasswordVisible ? 'text' : 'password' : type}
        name={property}
        defaultValue={value}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        maxLength={maxLength}
        spellCheck={spellCheck}
        style={isPasswordField ? {paddingRight: 40} : {}}
        onChange={handleOnChange}
      />
      { 
        !isEmpty(ownerState) && !isBlank(ownerState[property].value) && isPasswordField && (
          <i 
            className={`fas ${isPasswordVisible ? 'fa-eye' : 'fa-eye-slash'} password-icon`} 
            title={isPasswordVisible ? 'Hide password' : 'Show password'} 
            style={!isBlank(label) ? {top: 35} : {}}
            onClick={() => setPasswordVisibility(!isPasswordVisible)} 
          />
        ) 
      }
      <FormErrors errors={!isEmpty(ownerState) ? ownerState[property].errors : []} />
    </div>
  )
};

export default Input;
