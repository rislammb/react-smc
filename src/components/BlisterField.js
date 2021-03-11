import React from 'react';
import { TextField } from '@material-ui/core';

const BlisterField = (props) => {
  return (
    <TextField
      fullWidth
      id='blister'
      name='blister'
      placeholder='e.g. 8'
      label='Blister Price'
      {...props}
    />
  );
};

export default BlisterField;
