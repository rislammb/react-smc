import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  makeStyles,
  IconButton,
} from '@material-ui/core';
import { Add, Clear, ArrowBack } from '@material-ui/icons';

import StoreContext from '../store/storeContext';

const useStyles = makeStyles((theme) => ({
  topContainer: {
    display: 'flex',
    marginTop: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 13,
  },
  btn: {
    background: theme.palette.primary.main,
    color: '#fafafa',
    transition: 'all .4s ease',
    margin: '0px 15px',
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

const SearchInvoice = ({ shopUrl, searchTerm, setSearchTerm, details }) => {
  const classes = useStyles();
  const {
    state: { invoices },
  } = useContext(StoreContext);

  return (
    <div className={classes.topContainer}>
      {details ? (
        <Link to={`/i/${shopUrl}`} style={{ color: '#fff' }}>
          <IconButton size='small' className={classes.btn}>
            <ArrowBack fontSize='large' />
          </IconButton>
        </Link>
      ) : (
        <Link to={`/i/${shopUrl}/add`} style={{ color: '#fff' }}>
          <IconButton size='small' className={classes.btn}>
            <Add fontSize='large' />
          </IconButton>
        </Link>
      )}

      {!details && (
        <FormControl variant='outlined'>
          <InputLabel>Search Invoice</InputLabel>
          <OutlinedInput
            value={searchTerm}
            autoFocus
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={`Search from ${invoices.length} Invoices`}
            endAdornment={
              <InputAdornment position='end'>
                <Clear
                  className={classes.clear}
                  fontSize='small'
                  onClick={() => setSearchTerm('')}
                />
              </InputAdornment>
            }
            labelWidth={97}
          />
        </FormControl>
      )}
    </div>
  );
};

export default SearchInvoice;
