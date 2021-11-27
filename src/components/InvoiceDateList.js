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

const InvoiceDateList = ({ shopUrl, renderableInvoices }) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.paper}>
      <Table className={classes.root}>
        <TableHead>
          <TableRow className={classes.tableHead}>
            <SmTableCell>Date</SmTableCell>
            <SmTableCell>Buy From</SmTableCell>
            <SmTableCell>Invoice Number</SmTableCell>
            <SmTableCell align='center'>Total Items</SmTableCell>
            <SmTableCell align='right'>Price</SmTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {renderableInvoices.length > 0 ? (
            renderableInvoices.map((invoice) => {
              const { id, date, buyFrom, invoiceNumber, medicines } = invoice;
              let price = 0;
              medicines.map((medicine) => (price += medicine.price));
              return (
                <TableRow key={id}>
                  <SmTableCell>
                    <Link
                      to={`/i/${shopUrl}/${id}`}
                      style={{ textDecoration: 'none', zIndex: 3 }}
                    >
                      <Typography className={classes.date}>{date}</Typography>
                    </Link>
                  </SmTableCell>
                  <SmTableCell>
                    <Typography>{buyFrom}</Typography>
                  </SmTableCell>
                  <SmTableCell>
                    <Typography>{invoiceNumber}</Typography>
                  </SmTableCell>
                  <SmTableCell align='center'>
                    <Typography>{medicines.length}</Typography>
                  </SmTableCell>
                  <SmTableCell align='right'>
                    <Typography>{price}</Typography>
                  </SmTableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan='5' className={classes.center}>
                There are no saved invoices.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InvoiceDateList;
