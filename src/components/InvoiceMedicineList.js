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
    minWidth: '570px',
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
    fontSize: '0.9rem',
    color:
      theme.palette.type === 'light'
        ? theme.palette.primary.dark
        : theme.palette.primary.light,
  },
  name: {
    fontSize: '0.9rem',
    color:
      theme.palette.type === 'light'
        ? theme.palette.primary.dark
        : theme.palette.primary.light,
  },
}));

const SmTableCell = (props) => (
  <TableCell style={{ padding: '3px 6px' }} {...props}>
    {props.children}
  </TableCell>
);

const InvoiceMedicineList = ({ shopUrl, rederableMedicines, searchTerm }) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.paper}>
      <Table className={classes.root}>
        <TableHead>
          <TableRow className={classes.tableHead}>
            <SmTableCell>Date</SmTableCell>
            <SmTableCell>Medicine Details</SmTableCell>
            <SmTableCell align='center'>Amount</SmTableCell>
            <SmTableCell align='right'>Price</SmTableCell>
            <SmTableCell align='right'>Expire Date</SmTableCell>
            <SmTableCell>Buy From</SmTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {searchTerm.trim().length > 1 ? (
            rederableMedicines.length > 0 ? (
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
                      <Typography className={classes.name}>{name}</Typography>
                      <Typography variant='caption'>
                        {size && size}
                        {dogesForm && ` - ${dogesForm}`}
                      </Typography>
                    </SmTableCell>
                    <SmTableCell align='center'>{amount}</SmTableCell>
                    <SmTableCell align='right'>{price}</SmTableCell>
                    <SmTableCell align='right'>{expireDate}</SmTableCell>
                    <SmTableCell>{buyFrom}</SmTableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan='6' className={classes.center}>
                  There are nothing to match.
                </TableCell>
              </TableRow>
            )
          ) : (
            <TableRow>
              <TableCell colSpan='6' className={classes.center}>
                Type at least two characters.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InvoiceMedicineList;
