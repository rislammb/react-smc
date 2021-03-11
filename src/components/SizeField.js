import React from 'react';
import { TextField } from '@material-ui/core';

const SizeField = (props) => {
  return (
    <TextField
      fullWidth
      id='size'
      name='size'
      placeholder='e.g. 500mg'
      label='Size'
      {...props}
    />
  );
};

export default SizeField;
