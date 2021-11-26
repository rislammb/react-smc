import { useContext } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, CssBaseline, CircularProgress } from '@material-ui/core';
import './App.css';

import Navbar from './components/Navbar';
import Content from './components/Content';

import StoreContext from './store/storeContext';

const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
    backgroundImage:
      theme.palette.type === 'light'
        ? 'linear-gradient(to right, #fff4e3, #f9ffdc, #fff2ff)'
        : 'linear-gradient(to right, #333, #373737)',
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  contentContainer: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(1),
    // extra
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(2),
    },
    [theme.breakpoints.up('md')]: {
      marginRight: drawerWidth,
    },
  },
  content: {
    maxWidth: '720px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  center: {
    textAlign: 'center',
    padding: '50px 12px',
    color:
      theme.palette.type === 'light'
        ? theme.palette.primary.dark
        : theme.palette.primary.light,
  },
}));

function App() {
  const classes = useStyles();
  const {
    state: { authLoading },
  } = useContext(StoreContext);
  return (
    <Router>
      <Paper className={classes.root}>
        <CssBaseline />
        <Navbar />
        <main direction='column' className={classes.contentContainer}>
          <div className={classes.toolbar}></div>
          {authLoading ? (
            <div className={classes.center}>
              <CircularProgress />
            </div>
          ) : (
            <div className={classes.content}>
              <Content />
            </div>
          )}
        </main>
      </Paper>
    </Router>
  );
}

export default App;
