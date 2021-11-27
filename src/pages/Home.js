import React, { useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MedicineTable from '../components/MedicineTable';
import Search from '../components/Search';

import StoreContext from '../store/storeContext';

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
  const classes = useStyles();
  const { fetchMedicines } = useContext(StoreContext);

  useEffect(() => {
    fetchMedicines();
  }, []);

  return (
    <div>
      <div className={classes.topContainer}>
        <Search />
      </div>
      <MedicineTable />
    </div>
  );
};

export default Home;
