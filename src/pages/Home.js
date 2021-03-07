import React, { useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import StoreContext from '../store/storeContext';

import MedicineTable from '../components/MedicineTable';
import Search from '../components/Search';

const useStyles = makeStyles((theme) => ({
  topContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      marginTop: 7,
    },
  },
}));

const Home = () => {
  const { fetchMedicines } = useContext(StoreContext);
  const classes = useStyles();

  useEffect(() => {
    fetchMedicines();
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.topContainer}>
        <Search />
      </div>
      <MedicineTable />
    </div>
  );
};

export default Home;
