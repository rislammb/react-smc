import { BrowserRouter as Router } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, CssBaseline } from '@material-ui/core';
import './App.css';

import Navbar from './components/Navbar';
import Content from './components/Content';

const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
    backgroundImage:
      theme.palette.type === 'light'
        ? 'linear-gradient(to right, #fff1da, #f9ffdc, #eafffe)'
        : '',
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
    // extra
    [theme.breakpoints.up('sm')]: {
      marginRight: drawerWidth,
    },
  },
}));

function App() {
  const classes = useStyles();

  return (
    <Router>
      <Paper className={classes.root}>
        <CssBaseline />
        <Navbar />
        <main direction='column' className={classes.content}>
          <div className={classes.toolbar}></div>
          <Content />
        </main>
      </Paper>
    </Router>
  );
}

export default App;
