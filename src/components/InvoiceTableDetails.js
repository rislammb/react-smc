import { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  IconButton,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';

import SlimTableCell from './SlimTableCell';
import { getIcon } from '../getIcon';

import StoreContext from '../store/storeContext';

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor:
      theme.palette.type === 'light' ? 'rgba(255,255,255,0.3)' : '',
  },
  root: {
    minWidth: '490px',
  },
  center: {
    textAlign: 'center',
    padding: '50px 12px',
    color:
      theme.palette.type === 'light'
        ? theme.palette.primary.dark
        : theme.palette.primary.light,
    backgroundColor:
      theme.palette.type === 'light' ? 'rgba(255,255,255,0.3)' : '',
  },
  tableHead: {
    background: theme.palette.type === 'dark' ? '#333' : '#eee',
  },
  buttonCellRoot: {
    padding: '2px 5px',
    [theme.breakpoints.up('sm')]: {
      padding: '7px 10px',
    },
  },
  buttonRoot: {
    padding: 7,
    [theme.breakpoints.up('md')]: {
      padding: '12px',
    },
  },
  name: {
    color:
      theme.palette.type === 'light'
        ? theme.palette.primary.dark
        : theme.palette.primary.light,
  },
  super: {
    backgroundColor: theme.palette.type === 'dark' ? '#555' : '#ded',
    padding: '0px 9px 4px 9px',
    borderRadius: '7px 23px',
  },
}));

const InvoiceTableDetails = ({ invoiceId, medicines }) => {
  const classes = useStyles();
  const { deleteMedicineFromInvoice } = useContext(StoreContext);

  const deleteFn = (medicineId, name, size) => {
    if (
      window.confirm(`Are you want to delete '${name}${size && `, ${size}`}'?`)
    )
      deleteMedicineFromInvoice(invoiceId, medicineId);
  };

  return (
    <TableContainer component={Paper} className={classes.paper}>
      <Table className={classes.root}>
        <TableHead>
          <TableRow className={classes.tableHead}>
            <SlimTableCell></SlimTableCell>
            <SlimTableCell>Medicine Details</SlimTableCell>
            <SlimTableCell align='center'>Amount</SlimTableCell>
            <SlimTableCell align='right'>Price</SlimTableCell>
            <SlimTableCell align='right'>Expire Date</SlimTableCell>
            <TableCell align='center'></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {medicines?.map((medicine) => {
            const { id, dogesForm, name, size, amount, price, expireDate } =
              medicine;
            return (
              <TableRow key={id}>
                <SlimTableCell align='center'>
                  {getIcon(dogesForm)}
                </SlimTableCell>
                <SlimTableCell>
                  <Typography className={classes.name}>
                    {name}
                    {size && (
                      <sup className={classes.super}>
                        <Typography
                          variant='caption'
                          component='small'
                          color='textPrimary'
                        >
                          {size}
                        </Typography>
                      </sup>
                    )}
                  </Typography>
                  <Typography variant='caption'>{dogesForm}</Typography>
                </SlimTableCell>
                <SlimTableCell align='center'>
                  <Typography>{amount}</Typography>
                </SlimTableCell>
                <SlimTableCell align='right'>
                  <Typography>{price}</Typography>
                </SlimTableCell>
                <SlimTableCell align='right'>
                  <Typography>{expireDate}</Typography>
                </SlimTableCell>
                <SlimTableCell align='center'>
                  <IconButton
                    style={{ padding: 7 }}
                    onClick={() => deleteFn(id, name, size)}
                  >
                    <Delete color='secondary' fontSize='small' />
                  </IconButton>
                </SlimTableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InvoiceTableDetails;
