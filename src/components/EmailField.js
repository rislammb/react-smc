import React from 'react';
import TextField from '@material-ui/core/TextField';

const EmailField = (props) => {
  return (
    <TextField
      fullWidth
      id='email'
      name='email'
      label={props.label ? props.label : 'Email'}
      type='email'
      placeholder='arahman@email.com'
      {...props}
    />
  );
};

export default EmailField;
