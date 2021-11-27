import React, { useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Card, LinearProgress, Typography } from '@material-ui/core';

import SearchInvoice from '../components/SearchInvoice';
import InvoiceTableDetails from '../components/InvoiceTableDetails';

import StoreContext from '../store/storeContext';

const useStyles = makeStyles((theme) => ({
  date: {
    fontSize: '1.1rem',
    color:
      theme.palette.type === 'light'
        ? theme.palette.primary.dark
        : theme.palette.primary.light,
  },
  progress: {
    width: '130px',
    margin: 'auto',
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
}));

const InvoiceDetails = ({ match }) => {
  const { shopUrl, invoiceId } = match.params;
  const classes = useStyles();
  const {
    state: {
      user,
      dataLoading,
      singleInvoice: { id, date, buyFrom, invoiceNumber, medicines },
    },
    fetchSingleInvoice,
  } = useContext(StoreContext);

  const getTotal = (medicines) => {
    let totalPrice = 0;
    medicines.map((medicine) => (totalPrice += medicine.price));
    return totalPrice;
  };

  useEffect(() => {
    fetchSingleInvoice(shopUrl, invoiceId);
  }, [shopUrl, invoiceId]);

  if (shopUrl !== user?.shopUrl) return <Redirect to={`/p/${shopUrl}`} />;
  else
    return (
      <div>
        <SearchInvoice shopUrl={shopUrl} details />
        {dataLoading ? (
          <Card className={classes.center}>
            <LinearProgress className={classes.progress} />
          </Card>
        ) : id ? (
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 5,
              }}
            >
              <div>
                <Typography className={classes.date} component='h6'>
                  Date: {date}
                </Typography>
                <Typography>From: {buyFrom}</Typography>
              </div>
              <div>
                <Typography>
                  Invoice: {invoiceNumber && invoiceNumber}
                </Typography>
                <Typography>Total Items: {medicines.length}</Typography>
                <Typography style={{ marginTop: 5 }}>
                  Total Price: {getTotal(medicines)}
                </Typography>
              </div>
            </div>
            {medicines?.length > 0 ? (
              <InvoiceTableDetails invoiceId={id} medicines={medicines} />
            ) : (
              <Typography style={{ padding: '25px 8px', textAlign: 'center' }}>
                Medicines not found!
              </Typography>
            )}
          </div>
        ) : (
          <Card className={classes.center}>
            <Typography color='secondary' variant='h6'>
              Invoice not found!
            </Typography>
          </Card>
        )}
      </div>
    );
};

export default InvoiceDetails;
