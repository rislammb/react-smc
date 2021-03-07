import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

import { db } from '../store/storeProvider';

const useStyles = makeStyles({
  root: {
    width: '105px',
    marginTop: -31,
    '& label.Mui-focused': {
      color: 'inherit',
      marginTop: 11,
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'inherit',
      },
      '&:hover fieldset': {
        borderColor: 'yellow',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'inherit',
      },
    },
  },
  input: {
    color: 'inherit',
    fontSize: 'inherit',
    height: 29,
    transform: 'translate(0px, 13px) scale(1)',
  },
  label: {
    marginTop: 9,
    fontSize: 'inherit',
    color: 'inherit',
  },
});
const SearchPage = () => {
  const [search, setSearch] = useState('');
  const [shopList, setShopList] = useState([]);
  const classes = useStyles();
  let history = useHistory();

  const searchShopPage = () => {
    db.collection('users')
      .orderBy('shopUrl')
      .onSnapshot(async (snapshot) => {
        let urlUsers = snapshot?.docs.filter((doc) => doc.data().shopUrl);
        let urlList = [];
        await urlUsers.map((doc) => {
          return urlList.push({
            shopUrl: doc.data().shopUrl,
          });
        });
        setShopList(urlList);
      });
  };

  useEffect(() => {
    searchShopPage();
  }, []);

  useEffect(() => {
    setSearch('');
  }, []);

  return (
    <div>
      <Autocomplete
        freeSolo
        id='free-solo-2-demo'
        disableClearable
        style={{ fontSize: 13 }}
        classes={{ root: classes.root }}
        options={shopList?.map((option) => option.shopUrl)}
        onClose={(e) => {
          if (e.currentTarget.innerText.length > 0) {
            history.push(`/p/${e.currentTarget.innerText}`);
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label='Search Shop'
            variant='outlined'
            margin='normal'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputLabelProps={{ className: classes.label }}
            InputProps={{
              ...params.InputProps,
              type: 'search',
              className: classes.input,
            }}
          />
        )}
      />
    </div>
  );
};

export default SearchPage;
