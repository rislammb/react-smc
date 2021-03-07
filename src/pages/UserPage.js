import React, { useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core';

import StoreContext from '../store/storeContext';

import MedicineTable from '../components/MedicineTable';
import Search from '../components/Search';

const useStyles = makeStyles({});

const UserPage = (props) => {
  const { shopUrl } = props.match.params;
  const classes = useStyles();
  const { fetchUserMedicines } = useContext(StoreContext);

  const handleEdit = () => {
    return props.history.push(`/p/${shopUrl}/edit`);
  };

  useEffect(() => {
    fetchUserMedicines(shopUrl);
  }, [shopUrl]);

  return (
    <div className={classes.root}>
      <Search shopUrl={shopUrl} handleEdit={handleEdit} />
      <MedicineTable />
    </div>
  );
};

export default UserPage;
