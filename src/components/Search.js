import React, { useState, useContext, useEffect } from 'react';
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  makeStyles,
  IconButton,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import { Clear } from '@material-ui/icons';

import StoreContext from '../store/storeContext';

const useStyles = makeStyles((theme) => ({
  topContainer: {
    display: 'flex',
    marginTop: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  btn: {
    background: theme.palette.primary.main,
    color: '#fafafa',
    transition: 'all .4s ease',
    marginRight: 15,
    '&:hover': {
      background: theme.palette.primary.main,
      color: '#cacaca',
    },
  },
  clear: {
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.secondary.main,
    },
  },
}));

const Search = ({ shopUrl, handleEdit, edit, toggleModal }) => {
  const classes = useStyles();
  const {
    user,
    setSearchTerm,
    setMedicines,
    dbMedicines,
    filterMedicines,
    userDbMedicines,
    filterUserMedicines,
  } = useContext(StoreContext);
  const [search, setSearch] = useState('');

  const handleKeyUp = () => {
    if (search.trim().length > 0) {
      if (shopUrl || edit) {
        filterUserMedicines(search.trim().toLowerCase());
      } else {
        filterMedicines(search.trim().toLowerCase());
      }
    } else {
      setMedicines([]);
    }
  };

  const handleClear = () => {
    setSearch('');
    setMedicines([]);
  };

  useEffect(() => {
    setSearchTerm(search.trim().toLowerCase());
  }, [search]);

  useEffect(() => {
    setMedicines([]);
    if (search.trim().length > 0) {
      if (shopUrl || edit) {
        filterUserMedicines(search.trim().toLowerCase());
      } else {
        filterMedicines(search.trim().toLowerCase());
      }
    } else {
      setMedicines([]);
    }
  }, [dbMedicines, userDbMedicines]);

  return (
    <div className={classes.topContainer}>
      {shopUrl && user?.shopUrl === shopUrl && (
        <IconButton size='medium' className={classes.btn} onClick={handleEdit}>
          <EditIcon />
        </IconButton>
      )}
      {edit && (
        <IconButton size='small' onClick={toggleModal} className={classes.btn}>
          <AddIcon fontSize='large' />
        </IconButton>
      )}
      <FormControl variant='outlined'>
        <InputLabel>
          {shopUrl || edit
            ? shopUrl
              ? shopUrl
              : user.shopUrl
            : 'Search Medicine'}
        </InputLabel>
        <OutlinedInput
          value={search}
          autoFocus
          onChange={(e) => setSearch(e.target.value)}
          onKeyUp={handleKeyUp}
          placeholder={`Search from ${
            shopUrl || edit ? userDbMedicines.length : dbMedicines.length
          } Items`}
          endAdornment={
            <InputAdornment position='end'>
              <Clear
                className={classes.clear}
                fontSize='small'
                onClick={handleClear}
              />
            </InputAdornment>
          }
          labelWidth={
            shopUrl ? shopUrl.length * 9 : edit ? user?.shopUrl.length * 9 : 111
          }
        />
      </FormControl>
    </div>
  );
};

export default Search;
