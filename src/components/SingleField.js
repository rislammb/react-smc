import React from 'react';
import { TextField } from '@material-ui/core';

const SingleField = (props) => {
  return (
    <TextField
      fullWidth
      id='one'
      name='one'
      placeholder='e.g. 1'
      label='Single Price'
      {...props}
    />
  );
};

export default SingleField;
