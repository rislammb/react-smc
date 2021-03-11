import React from 'react';
import { TextField } from '@material-ui/core';

const DoseField = (props) => {
  return (
    <TextField
      fullWidth
      id='dForm'
      name='dForm'
      placeholder='e.g. Tablet'
      label='Doges Form'
      {...props}
    />
  );
};

export default DoseField;
