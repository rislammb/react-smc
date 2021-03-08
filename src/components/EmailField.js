import React from 'react';
import TextField from '@material-ui/core/TextField';

const EmailField = (props) => {
  const { label, value, onChange, error, helperText, className } = props;
  return (
    <TextField
      fullWidth
      id='email'
      name='email'
      label={label ? label : 'Email'}
      type='email'
      placeholder='arahman@email.com'
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
      className={className}
    />
  );
};

export default EmailField;
