import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core';

import StoreContext from '../store/storeContext';

import MedicineTable from '../components/MedicineTable';
import Search from '../components/Search';
import AddMedicine from '../components/AddMedicine';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles({});

const EditPage = ({ match }) => {
  const { shopUrl } = match.params;
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);
  const { user, fetchUserMedicines } = useContext(StoreContext);

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  useEffect(() => {
    fetchUserMedicines(shopUrl);
  }, [shopUrl]);

  if (shopUrl !== user?.shopUrl) return <Redirect to={`/p/${shopUrl}`} />;
  return (
    <div className={classes.root}>
      <Search edit toggleModal={toggleModal} />
      <MedicineTable edit />
      <AddMedicine open={openModal} toggleModal={toggleModal} />
    </div>
  );
};

export default EditPage;
