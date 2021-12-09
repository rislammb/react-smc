import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Card } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';

import Spinner from '../components/spinner/Spinner';
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
}));

const InvoiceList = ({ match }) => {
  const { shopUrl } = match.params;
  const {
    state: { user, invoices, dataLoading },
    fetchUserInvoices,
  } = useContext(StoreContext);
  const classes = useStyles();
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [renderableInvoices, setRenderableInvoices] = useState([]);
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [renderableMedicines, setRenderableMedicines] = useState([]);
  const [renderablePage, setRenderablePage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateView, setDateView] = useState(false);

  const itemPerPage = 15;

  useEffect(() => {
    const tempInvoices = [...filteredInvoices];
    setRenderableInvoices(
      tempInvoices.splice((renderablePage - 1) * itemPerPage, itemPerPage)
    );
  }, [filteredInvoices, renderablePage]);

  useEffect(() => {
    const tempMedicines = [...filteredMedicines];
    setRenderableMedicines(
      tempMedicines.splice((renderablePage - 1) * itemPerPage, itemPerPage)
    );
  }, [filteredMedicines, renderablePage]);

  useEffect(() => {
    setRenderablePage(1);
    if (dateView) {
      const tempInvoices = invoices.filter((invoice) =>
        invoice.date.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return setFilteredInvoices(tempInvoices);
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
      return setFilteredMedicines(tempMedicines);
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
            <Spinner />
          </Card>
        ) : dateView ? (
          <InvoiceTableList
            shopUrl={shopUrl}
            renderableInvoices={renderableInvoices}
          />
        ) : (
          <InvoiceMedicineList
            shopUrl={shopUrl}
            rederableMedicines={renderableMedicines}
            searchTerm={searchTerm}
          />
        )}
        <div
          style={{
            display: 'flex',
            marginTop: '8px',
            justifyContent: 'center',
          }}
        >
          {dateView ? (
            filteredInvoices.length > itemPerPage ? (
              <Pagination
                onChange={(e, value) => setRenderablePage(value)}
                count={Math.ceil(filteredInvoices.length / itemPerPage)}
                color='primary'
              />
            ) : (
              ''
            )
          ) : searchTerm.trim().length > 1 &&
            filteredMedicines.length > itemPerPage ? (
            <Pagination
              onChange={(e, value) => setRenderablePage(value)}
              count={Math.ceil(filteredMedicines.length / itemPerPage)}
              color='primary'
            />
          ) : (
            ''
          )}
        </div>
      </div>
    );
};

export default InvoiceList;
