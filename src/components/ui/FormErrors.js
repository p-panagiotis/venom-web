
const FormErrors = ({ errors }) => {
  
  return (
    <>
      {
        errors && errors.length > 0 && (
          <div className='ui-errors'>
            <ul>
              { errors.map((error, index) => <li key={index}>{error}</li>) }
            </ul>
          </div>
        )
      }
    </>
  )
}

export default FormErrors;
