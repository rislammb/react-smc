import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';

import StoreContext from '../store/storeContext';

const useStyles = makeStyles((theme) => ({
  buttonCellRoot: {
    padding: '2px 5px',
    [theme.breakpoints.up('sm')]: {
      padding: '7px 10px',
    },
    [theme.breakpoints.up('md')]: {
      padding: '16px',
    },
  },
  buttonRoot: {
    padding: 7,
    [theme.breakpoints.up('md')]: {
      padding: '12px',
    },
  },
}));

const DeleteMedicine = ({ id, name }) => {
  const classes = useStyles();
  const { deleteMedicine } = useContext(StoreContext);

  const deleteMedicineFn = () => {
    if (window.confirm(`Are You Sure you want to delete "${name}"`)) {
      deleteMedicine(id);
    }
  };

  return (
    <TableCell align='center' className={classes.buttonCellRoot}>
      <IconButton
        onClick={deleteMedicineFn}
        classes={{ root: classes.buttonRoot }}
      >
        <Delete color='secondary' fontSize='small' />
      </IconButton>
    </TableCell>
  );
};

export default DeleteMedicine;
