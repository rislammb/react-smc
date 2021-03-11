import React from 'react';
import { TextField } from '@material-ui/core';

const NameField = (props) => {
  return (
    <TextField
      fullWidth
      id='name'
      name='name'
      placeholder='e.g. Napa'
      label='Name'
      {...props}
    />
  );
};

export default NameField;
