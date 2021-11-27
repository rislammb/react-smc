import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Card, LinearProgress } from '@material-ui/core';
import SearchInvoice from '../components/SearchInvoice';
import InvoiceTableList from '../components/InvoiceDateList';
import InvoiceMedicineList from '../components/InvoiceMedicineList';

import StoreContext from '../store/storeContext';

const useStyles = makeStyles((theme) => ({
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
  progress: {
    width: '130px',
    margin: 'auto',
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
  const [rederableMedicines, setRederableMedicines] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateView, setDateView] = useState(false);

  useEffect(() => {
    if (dateView) {
      const tempInvoices = invoices.filter((invoice) =>
        invoice.date.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setRenderableInvoices(tempInvoices);
    } else {
      let tempMedicines = [];
      invoices.map((invoice) => {
        return invoice.medicines.map((medicine) => {
          if (medicine.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            const { id, date, isoString, buyFrom, invoiceNumber } = invoice;
            return tempMedicines.push({
              invoiceId: id,
              date,
              isoString,
              buyFrom,
              invoiceNumber,
              ...medicine,
            });
          } else return;
        });
      });
      setRederableMedicines(tempMedicines);
    }
  }, [invoices, searchTerm, dateView]);

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
          dateView={dateView}
          setDateView={setDateView}
        />
        {dataLoading ? (
          <Card className={classes.center}>
            <LinearProgress className={classes.progress} />
          </Card>
        ) : dateView ? (
          <InvoiceTableList
            shopUrl={shopUrl}
            renderableInvoices={renderableInvoices}
          />
        ) : (
          <InvoiceMedicineList
            shopUrl={shopUrl}
            rederableMedicines={rederableMedicines}
            searchTerm={searchTerm}
          />
        )}
      </div>
    );
};

export default InvoiceList;
