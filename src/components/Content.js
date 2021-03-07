import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import CreatePage from '../pages/CreatePage';
import UserPage from '../pages/UserPage';
import EditPage from '../pages/EditPage';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Register from '../pages/Register';
import Login from '../pages/Login';

const Content = () => {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/about' component={About} />
      <Route exact path='/contact' component={Contact} />
      <Route exact path='/register' component={Register} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/create' component={CreatePage} />
      <Route exact path='/p/:shopUrl' component={UserPage} />
      <Route path='/p/:shopUrl/edit' component={EditPage} />
    </Switch>
  );
};

export default Content;
