import React from 'react';
import TextField from '@material-ui/core/TextField';

const PasswordField = (props) => {
  return (
    <TextField
      fullWidth
      id='password'
      name='password'
      label='Password'
      type='password'
      placeholder='********'
      {...props}
    />
  );
};

export default PasswordField;
