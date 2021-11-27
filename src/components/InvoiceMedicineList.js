import React from 'react';
import { Link } from 'react-router-dom';
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
} from '@material-ui/core';

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
    fontSize: '1.1rem',
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
  date: {
    fontSize: '1.1rem',
    color:
      theme.palette.type === 'light'
        ? theme.palette.primary.dark
        : theme.palette.primary.light,
  },
}));

const SmTableCell = (props) => (
  <TableCell style={{ padding: '8px' }} {...props}>
    {props.children}
  </TableCell>
);

const InvoiceMedicineList = ({ shopUrl, rederableMedicines }) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.paper}>
      <Table className={classes.root}>
        <TableHead>
          <TableRow className={classes.tableHead}>
            <SmTableCell>Date</SmTableCell>
            <SmTableCell>Medicine Details</SmTableCell>
            <SmTableCell>Amount</SmTableCell>
            <SmTableCell align='center'>Price</SmTableCell>
            <SmTableCell align='right'>Expire Date</SmTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rederableMedicines.length > 0 ? (
            rederableMedicines.map((medicine) => {
              const {
                invoiceId,
                date,
                buyFrom,
                id,
                dogesForm,
                name,
                size,
                amount,
                price,
                expireDate,
              } = medicine;
              return (
                <TableRow key={invoiceId + date + name + id}>
                  <SmTableCell>
                    <Link
                      to={`/i/${shopUrl}/${invoiceId}`}
                      style={{ textDecoration: 'none', zIndex: 3 }}
                    >
                      <Typography className={classes.date}>{date}</Typography>
                    </Link>
                  </SmTableCell>
                  <SmTableCell>
                    <Typography>{name}</Typography>
                    <Typography>{size}</Typography>
                    <Typography>{dogesForm}</Typography>
                  </SmTableCell>
                  <SmTableCell>
                    <Typography>{amount}</Typography>
                  </SmTableCell>
                  <SmTableCell align='center'>
                    <Typography>{price}</Typography>
                  </SmTableCell>
                  <SmTableCell align='right'>
                    <Typography>{expireDate}</Typography>
                  </SmTableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan='5' className={classes.center}>
                There are no matching medicine.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InvoiceMedicineList;
