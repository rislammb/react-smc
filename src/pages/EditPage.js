import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import AddMedicine from '../components/AddMedicine';
import Search from '../components/Search';
import MedicineTable from '../components/MedicineTable';

import StoreContext from '../store/storeContext';

const EditPage = ({ match }) => {
  const { shopUrl } = match.params;
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
    <div>
      <Search edit toggleModal={toggleModal} />
      <MedicineTable edit />
      <AddMedicine open={openModal} toggleModal={toggleModal} />
    </div>
  );
};

export default EditPage;
