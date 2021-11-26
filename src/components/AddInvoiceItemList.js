import 'date-fns';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
  inputGroup: {
    display: 'flex',
  },
}));

const AddInvoiceItemList = ({
  item: { id, dogesForm, name, size, amount, price, expireDate },
  onChangeItem,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.inputGroup}>
      <TextField
        name='dogesForm'
        placeholder='e.g. Tablet'
        label='Form'
        value={dogesForm}
        onChange={(e) => onChangeItem(id, e)}
        style={{ marginRight: 8, flex: 1 }}
      />
      <TextField
        name='name'
        placeholder='e.g. Napa'
        label='Name'
        value={name}
        onChange={(e) => onChangeItem(id, e)}
        style={{ marginRight: 8, flex: 2 }}
      />
      <TextField
        name='size'
        placeholder='e.g. 500mg'
        label='Size'
        value={size}
        onChange={(e) => onChangeItem(id, e)}
        style={{ marginRight: 8, flex: 1 }}
      />
      <TextField
        name='amount'
        placeholder='e.g. 510'
        label='Amount'
        value={amount}
        onChange={(e) => onChangeItem(id, e)}
        style={{ marginRight: 8, flex: 1 }}
      />
      <TextField
        name='price'
        placeholder='e.g. 360'
        label='Price'
        value={price}
        onChange={(e) => onChangeItem(id, e)}
        style={{ marginRight: 8, flex: 1 }}
      />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          style={{ width: '115px' }}
          label='Expire Date'
          format='MM/yyyy'
          value={expireDate}
          onChange={(e) => onChangeItem(id, e, 'date')}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </MuiPickersUtilsProvider>
    </div>
  );
};

export default AddInvoiceItemList;
