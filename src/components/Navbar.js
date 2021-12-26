import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Switch,
  IconButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import DrawerComp from './DrawerComp';
import SearchPage from './SearchPage';

import StoreContext from '../store/storeContext';

const useStyles = makeStyles((theme) => ({
  appBar: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - 220px)`,
      marginRight: 220,
    },
  },
  toolbar: {
    [theme.breakpoints.down('xs')]: {
      paddingRight: 0,
    },
  },
  logo: {
    flex: 1,
  },
  logoLink: {
    color: 'inherit',
    textDecoration: 'none',
  },
  menuButton: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

const Navbar = (props) => {
  const {
    state: { darkMode },
    toggleDarkMode,
  } = useContext(StoreContext);
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleDrawer = () => setMobileOpen(!mobileOpen);
  const closeDrawer = () => setMobileOpen(false);
  return (
    <AppBar position='fixed' className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Typography variant='h4' noWrap className={classes.logo}>
          <NavLink to='/' className={classes.logoLink}>
            SMc
          </NavLink>
        </Typography>
        <SearchPage props={props} />
        <Switch checked={darkMode} color='default' onChange={toggleDarkMode} />
        <IconButton
          color='inherit'
          onClick={toggleDrawer}
          className={classes.menuButton}
        >
          <MenuIcon fontSize='large' />
        </IconButton>
      </Toolbar>
      <DrawerComp
        mobileOpen={mobileOpen}
        toggleDrawer={toggleDrawer}
        closeDrawer={closeDrawer}
      />
    </AppBar>
  );
};

export default Navbar;
