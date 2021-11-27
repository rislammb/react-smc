import React, { useContext } from 'react';
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  makeStyles,
  IconButton,
} from '@material-ui/core';
import { Add, Clear } from '@material-ui/icons';

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

const Search = ({ shopUrl, toggleModal }) => {
  const classes = useStyles();
  const {
    state: { user, medicines, userMedicines, searchTerm },
    setSearchTerm,
  } = useContext(StoreContext);

  return (
    <div className={classes.topContainer}>
      {shopUrl && user?.shopUrl === shopUrl && (
        <IconButton size='small' onClick={toggleModal} className={classes.btn}>
          <Add fontSize='large' />
        </IconButton>
      )}
      <FormControl variant='outlined'>
        <InputLabel>{shopUrl ? shopUrl : 'Search Medicine'}</InputLabel>
        <OutlinedInput
          value={searchTerm}
          autoFocus
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={`Search from ${
            shopUrl ? userMedicines.length : medicines.length
          } Items`}
          endAdornment={
            <InputAdornment position='end'>
              <Clear
                className={classes.clear}
                fontSize='small'
                onClick={() => setSearchTerm('')}
              />
            </InputAdornment>
          }
          labelWidth={shopUrl ? shopUrl.length * 9 : 111}
        />
      </FormControl>
    </div>
  );
};

export default Search;
