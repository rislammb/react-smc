import React, { useState, useEffect, useContext } from 'react';
import AddMedicine from '../components/AddMedicine';
import Search from '../components/Search';
import MedicineTable from '../components/MedicineTable';

import StoreContext from '../store/storeContext';

const UserPage = ({ match }) => {
  const { shopUrl } = match.params;
  const [openModal, setOpenModal] = useState(false);
  const { fetchUserMedicines } = useContext(StoreContext);

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  useEffect(() => {
    fetchUserMedicines(shopUrl);
  }, [shopUrl]);

  return (
    <div>
      <Search shopUrl={shopUrl} toggleModal={toggleModal} />
      <MedicineTable shopUrl={shopUrl} />
      <AddMedicine open={openModal} toggleModal={toggleModal} />
    </div>
  );
};

export default UserPage;
