import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import CreatePage from '../pages/CreatePage';
import UserPage from '../pages/UserPage';
import About from '../pages/About';
import Contact from '../pages/Contact';
import CreateAccount from '../pages/CreateAccount';
import Login from '../pages/Login';
import Recover from '../pages/Recover';
import InvoiceList from '../pages/InvoiceList';
import AddInvoice from '../pages/AddInvoice';
import InvoiceDetails from '../pages/InvoiceDetails';

import DatePickersComp from './DatePickersComp';

const Content = () => {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/about' component={About} />
      <Route exact path='/contact' component={Contact} />
      <Route exact path='/create' component={CreateAccount} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/recover' component={Recover} />
      <Route exact path='/create-page' component={CreatePage} />
      <Route exact path='/p/:shopUrl' component={UserPage} />
      <Route exact path='/i/:shopUrl' component={InvoiceList} />
      <Route exact path='/i/:shopUrl/add' component={AddInvoice} />
      <Route exact path='/i/:shopUrl/:invoiceId' component={InvoiceDetails} />
      <Route exact path='/date' component={DatePickersComp} />
    </Switch>
  );
};

export default Content;
