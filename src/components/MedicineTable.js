import { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Card,
  CircularProgress,
} from '@material-ui/core';
import SlimTableCell from './SlimTableCell';
import DeleteMedicine from './DeleteMedicine';
import { getIcon } from '../getIcon';

import StoreContext from '../store/storeContext';

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor:
      theme.palette.type === 'light' ? 'rgba(255,255,255,0.3)' : '',
  },
  root: {
    minWidth: '200px',
    overflowX: 'visible',
  },
  center: {
    textAlign: 'center',
    padding: '50px 12px',
    color:
      theme.palette.type === 'light'
        ? theme.palette.primary.dark
        : theme.palette.primary.light,
    backgroundColor:
      theme.palette.type === 'light' ? 'rgba(255,255,255,0.3)' : '',
  },
  tableHead: {
    background: theme.palette.type === 'dark' ? '#333' : '#eee',
  },
  buttonCellRoot: {
    padding: '2px 5px',
    [theme.breakpoints.up('sm')]: {
      padding: '7px 10px',
    },
    [theme.breakpoints.up('md')]: {
      padding: '16px',
    },
  },
  buttonRoot: {
    padding: 7,
    [theme.breakpoints.up('md')]: {
      padding: '12px',
    },
  },
  name: {
    color:
      theme.palette.type === 'light'
        ? theme.palette.primary.dark
        : theme.palette.primary.light,
  },
  super: {
    backgroundColor: theme.palette.type === 'dark' ? '#555' : '#ded',
    padding: '0px 9px 4px 9px',
    borderRadius: '7px 23px',
  },
}));

const MedicineTable = ({ edit }) => {
  const classes = useStyles();
  const { searchTerm, medicines, loading, error } = useContext(StoreContext);

  if (loading)
    return (
      <div className={classes.center}>
        <CircularProgress />
      </div>
    );
  if (error)
    <Card className={classes.center}>
      <Typography color='secondary' variant='h6'>
        Something went wrong
      </Typography>
    </Card>;
  return medicines.length > 0 ? (
    <TableContainer component={Paper} className={classes.paper}>
      <Table className={classes.root}>
        <TableHead>
          <TableRow className={classes.tableHead}>
            <SlimTableCell></SlimTableCell>
            <SlimTableCell>Medicine Details</SlimTableCell>
            <SlimTableCell align='center'>1 Pcs</SlimTableCell>
            <SlimTableCell align='center'>Blister</SlimTableCell>
            {edit && (
              <TableCell
                align='center'
                className={classes.buttonCellRoot}
              ></TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {medicines?.map((medicine) => {
            const { id, dForm, name, size, one, blister } = medicine;
            return (
              <TableRow hover key={id}>
                <SlimTableCell align='center'>{getIcon(dForm)}</SlimTableCell>
                <SlimTableCell>
                  <Typography variant='h6' className={classes.name}>
                    {name}
                    {size && (
                      <sup className={classes.super}>
                        <Typography
                          variant='caption'
                          component='small'
                          color='textPrimary'
                        >
                          {size}
                        </Typography>
                      </sup>
                    )}
                  </Typography>
                  <Typography variant='caption'>{dForm}</Typography>
                </SlimTableCell>
                <SlimTableCell align='center'>
                  <Typography>{one && one}</Typography>
                </SlimTableCell>
                <SlimTableCell align='center'>
                  <Typography>{blister && blister}</Typography>
                </SlimTableCell>
                {edit && <DeleteMedicine id={id} name={name} />}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <Card className={classes.center}>
      <Typography variant='h6'>
        {searchTerm.length < 1
          ? 'Type at least one character'
          : 'There are nothing to match'}
      </Typography>
    </Card>
  );
};

export default MedicineTable;
