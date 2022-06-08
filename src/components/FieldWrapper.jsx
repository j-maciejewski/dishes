const FieldWrapper = ({ label, children }) => {
  return (
    <fieldset>
      <legend>{label}</legend>
      {children}
    </fieldset>
  )
}

export default FieldWrapper
