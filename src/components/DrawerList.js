import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
import AccountCircle from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import PageIcon from '@material-ui/icons/Pages';
import InfoIcon from '@material-ui/icons/Info';

import StoreContext from '../store/storeContext';

const useStyles = makeStyles((theme) => ({
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  link: {
    textDecoration: 'none',
    color: theme.palette.type === 'dark' ? '#eee' : theme.palette.primary.main,
  },
}));

const DrawerList = ({ closeDrawer }) => {
  const classes = useStyles();
  const theme = useTheme();
  const { user, logoutUser } = useContext(StoreContext);

  const logoutHandler = () => {
    if (user) {
      closeDrawer();
      return logoutUser();
    } else {
      closeDrawer();
    }
  };

  return (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <NavLink
          exact
          to='/'
          onClick={closeDrawer}
          activeStyle={{
            color: theme.palette.type === 'dark' ? 'lightgreen' : 'green',
          }}
          className={classes.link}
        >
          <ListItem button>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary='Home' />
          </ListItem>
        </NavLink>
        <NavLink
          to={
            user ? (user.shopUrl ? `/p/${user.shopUrl}` : '/create') : '/login'
          }
          onClick={closeDrawer}
          activeStyle={{
            color: theme.palette.type === 'dark' ? 'lightgreen' : 'green',
          }}
          className={classes.link}
        >
          <ListItem button>
            <ListItemIcon>
              <PageIcon />
            </ListItemIcon>
            <ListItemText
              primary={
                user
                  ? user.shopUrl
                    ? 'Your Page'
                    : 'Create Your Page'
                  : 'Login For Page'
              }
            />
          </ListItem>
        </NavLink>
        <NavLink
          to='/about'
          onClick={closeDrawer}
          activeStyle={{
            color: theme.palette.type === 'dark' ? 'lightgreen' : 'green',
          }}
          className={classes.link}
        >
          <ListItem button>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary='About SMC' />
          </ListItem>
        </NavLink>
        <NavLink
          to='/contact'
          onClick={closeDrawer}
          activeStyle={{
            color: theme.palette.type === 'dark' ? 'lightgreen' : 'green',
          }}
          className={classes.link}
        >
          <ListItem button>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary='Contact' />
          </ListItem>
        </NavLink>
      </List>
      <Divider />
      <List>
        <NavLink
          exact
          to={user ? '/' : '/login'}
          onClick={logoutHandler}
          activeStyle={
            user
              ? {}
              : {
                  color: theme.palette.type === 'dark' ? 'lightgreen' : 'green',
                }
          }
          className={classes.link}
        >
          <ListItem button>
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary={user ? 'Logout' : 'Login'} />
          </ListItem>
        </NavLink>
      </List>
    </div>
  );
};

export default DrawerList;
