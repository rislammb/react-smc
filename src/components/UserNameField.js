import React from 'react';
import TextField from '@material-ui/core/TextField';

const UserNameField = (props) => {
  return (
    <TextField
      fullWidth
      id='name'
      name='name'
      label='Name'
      placeholder='Abdur Rahman'
      {...props}
    />
  );
};

export default UserNameField;
