import React from 'react'
import { TextField } from '@mui/material' 
import { FieldConfig,useField } from 'formik'


const InputField = (props) => {
  const [field ,meta]=useField(props)
  return (
    <TextField>InputField</TextField>
  )
}

export default InputField