import { createContext, useContext, useState, useEffect } from 'react';
import { generateUID, noob, isBlank, isValidEmail, isCallback, isEmpty } from '../../utils/helpers';
import API from '../../services/API';
import { useToast } from '../../contexts/Toast';

import Input from './Input';
import TextArea from './TextArea';
import Checkbox from './Checkbox';
import Button from './Button';

const FormContext = createContext();

const Form = props => {

  let { 
    url,
    method='POST',
    responseType='json',
    formData,
    width,
    onsubmit,
    onsuccess=noob,
    onerror=noob 
  } = props;

  const { toast } = useToast();
  const [state, setState] = useState({});
  const [submitting, setSubmittingState] = useState(false);
  const uid = generateUID();

  // eslint-disable-next-line
  useEffect(() => setFocus(), []);

  useEffect(() => {
    let newState = props.state;

    if (isEmpty(newState)) {
      return;
    }

    for (let property in state) {
      if (state.hasOwnProperty(property)) {
        updateState({ property: property, value: newState[property] }, false);
      }
    }

    // eslint-disable-next-line
  }, [props.state]);

  const setFocus = () => document.querySelector(`form#${uid} input:not([name='hidden'])`).focus();

  const registerState = ({property, args}) => setState(state => ({...state, [property]: args }));

  const updateState = ({ property, value }, validateState) => {
    let errors = [];

    if (validateState !== false) {
      // validate property current value
      errors = validateProperty(property, value);
    }

    setState(state => ({...state, [property]: { ...state[property], value: value, errors: errors }}));
  }

  const handleSubmit = () => {
    // validate form data
    let isValid = validate();

    if (!isValid) {
      setFocus();
      return;
    }

    // extract property-value pairs
    let data = {};
    if (!isEmpty(formData)) {
      data = { ...formData };
    }

    for (let property in state) {
      if (state.hasOwnProperty(property)) {
        let value = state[property].value;
        data[property] = typeof value === 'string' && isBlank(value) ? null : value;
      }
    }

    if (isCallback(onsubmit)) {
      onsubmit(data);
      return;
    }

    // enable form submission state
    setSubmittingState(true);

    API.request(url, { method: method, data: data, responseType: responseType }).then(response => {
      // disable form submission state
      setSubmittingState(false);

      // call props onsuccess callback
      onsuccess(response);
    }).catch(error => {
      // disable form submission state
      setSubmittingState(false);
      
      // show toast error detail
      toast.error(error.detail);

      // call props onerror callback
      onerror(error);
    });
  }

  const validate = () => {
    let isValid = true;
    
    for (let property in state) {
      if (state.hasOwnProperty(property)) {
        let errors = validateProperty(property, state[property].value);
        setState(state => ({...state, [property]: { ...state[property], errors: errors }}));
        
        if (errors.length > 0) {
          isValid = false;
        }
      }
    }
    return isValid;
  }

  const validateProperty = (property, value) => {
    let { required, type, validateWithProperty, validateWithPropertyMessage } = state[property];
    let errors = [];
    
    if (required && !value) {
      errors = ['Field is required'];
    }

    // validation between properties
    if (!errors.length) {
      let validateAgainst = null;
      Object.keys(state).forEach(prop => state[prop].validateWithProperty === property ? validateAgainst = state[prop] : null);

      let errorMessage = (validateAgainst && validateAgainst.validateWithPropertyMessage) || validateWithPropertyMessage;

      if (validateAgainst) {
        validateAgainst.errors = validateAgainst.value && validateAgainst.value !== value ? [errorMessage] : [];
        return [];
      }

      if (validateWithProperty) {
        return state[validateWithProperty].value !== value ? [errorMessage] : [];
      }
    }

    if (type === 'email' && value && !isValidEmail(value)) {
      return ['Invalid email address \'' + value + '\''];
    }
    
    return errors;
  }

  return (
    <form id={uid} className='ui-form' autoComplete='off' style={{ width: width }} noValidate>
      <input autoComplete='off' name='hidden' type='text' style={{display: 'none'}} />
      
      <FormContext.Provider value={{state, registerState, updateState, handleSubmit, submitting}}>
        {props.children}
      </FormContext.Provider>
    </form>
  )
};

export const useForm = () => {
  const context = useContext(FormContext);

  if (!context) return {
    ownerState: {},
    registerOwner: noob,
    updateOwner: noob,
    submitOwner: noob,
    submitting: false
  }

  return {
    ownerState: context.state,
    registerOwner: context.registerState,
    updateOwner: context.updateState,
    submitOwner: context.handleSubmit,
    submittingOwner: context.submitting
  }
}

Form.Input = Input;
Form.TextArea = TextArea;
Form.Checkbox = Checkbox;
Form.Submit = Button;

export default Form;
