import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, Hidden } from '@material-ui/core';

import DrawerList from './DrawerList';

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: 220,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: 220,
    backgroundImage:
      theme.palette.type === 'light'
        ? 'linear-gradient(to right, #fff6e8, #effffe)'
        : '',
    [theme.breakpoints.up('sm')]: {
      background: 'transparent',
    },
  },
}));

const DrawerComp = (props) => {
  const { window, mobileOpen, toggleDrawer, closeDrawer } = props;
  const classes = useStyles();

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <nav className={classes.drawer} aria-label='mailbox folders'>
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden smUp implementation='css'>
        <Drawer
          container={container}
          variant='temporary'
          anchor='right'
          open={mobileOpen}
          onClose={toggleDrawer}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <DrawerList closeDrawer={closeDrawer} />
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation='css'>
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant='permanent'
          open
          anchor='right'
        >
          <DrawerList closeDrawer={closeDrawer} />
        </Drawer>
      </Hidden>
    </nav>
  );
};

export default DrawerComp;
