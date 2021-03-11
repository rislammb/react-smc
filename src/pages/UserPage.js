import React, { useEffect, useContext } from 'react';
import MedicineTable from '../components/MedicineTable';
import Search from '../components/Search';

import StoreContext from '../store/storeContext';

const UserPage = (props) => {
  const { shopUrl } = props.match.params;
  const { fetchUserMedicines } = useContext(StoreContext);

  const handleEdit = () => {
    return props.history.push(`/p/${shopUrl}/edit`);
  };

  useEffect(() => {
    fetchUserMedicines(shopUrl);
  }, [shopUrl]);

  return (
    <div>
      <Search shopUrl={shopUrl} handleEdit={handleEdit} />
      <MedicineTable />
    </div>
  );
};

export default UserPage;
