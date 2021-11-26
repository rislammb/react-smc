import React, { useState, useEffect, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  LinearProgress,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from '@material-ui/core';
import SearchInvoice from '../components/SearchInvoice';
import SlimTableCell from '../components/SlimTableCell';

import StoreContext from '../store/storeContext';

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor:
      theme.palette.type === 'light' ? 'rgba(255,255,255,0.3)' : '',
  },
  root: {
    minWidth: '490px',
  },
  progress: {
    width: '130px',
    margin: 'auto',
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

const InvoiceList = ({ match }) => {
  const { shopUrl } = match.params;
  const {
    state: { user, invoices, dataLoading },
    fetchUserInvoices,
  } = useContext(StoreContext);
  const classes = useStyles();
  const [renderableInvoices, setRenderableInvoices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const tempInvoices = invoices.filter((invoice) =>
      invoice.date
        .includes(searchTerm)
    );
    setRenderableInvoices(tempInvoices);
  }, [invoices, searchTerm]);

  useEffect(() => {
    if (user?.shopUrl === shopUrl) fetchUserInvoices(shopUrl);
  }, [shopUrl, user]);

  if (shopUrl !== user?.shopUrl) return <Redirect to={`/p/${shopUrl}`} />;
  else
    return (
      <div>
        <SearchInvoice
          shopUrl={shopUrl}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        {dataLoading ? (
          <Card className={classes.center}>
            <LinearProgress className={classes.progress} />
          </Card>
        ) : (
          <TableContainer component={Paper} className={classes.paper}>
            <Table className={classes.root}>
              <TableHead>
                <TableRow className={classes.tableHead}>
                  <SlimTableCell>Date</SlimTableCell>
                  <SlimTableCell>Buy From</SlimTableCell>
                  <SlimTableCell>Invoice Number</SlimTableCell>
                  <SlimTableCell align='center'>Total Items</SlimTableCell>
                  <SlimTableCell align='right'>Price</SlimTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {renderableInvoices.length > 0 ? (
                  renderableInvoices.map((invoice) => {
                    const { id, date, buyFrom, invoiceNumber, medicines } =
                      invoice;
                    let price = 0;
                    medicines.map((medicine) => (price += medicine.price));
                    return (
                      <TableRow key={id}>
                        <SlimTableCell>
                          <Link
                            to={`/i/${shopUrl}/${id}`}
                            style={{ textDecoration: 'none', zIndex: 3 }}
                          >
                            <Typography className={classes.date}>
                              {date}
                            </Typography>
                          </Link>
                        </SlimTableCell>
                        <SlimTableCell>
                          <Typography>{buyFrom}</Typography>
                        </SlimTableCell>
                        <SlimTableCell>
                          <Typography>{invoiceNumber}</Typography>
                        </SlimTableCell>
                        <SlimTableCell align='center'>
                          <Typography>{medicines.length}</Typography>
                        </SlimTableCell>
                        <SlimTableCell align='right'>
                          <Typography>{price}</Typography>
                        </SlimTableCell>
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
        )}
      </div>
    );
};

export default InvoiceList;
