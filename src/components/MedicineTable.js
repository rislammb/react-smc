import { useContext, useState, useEffect } from 'react';
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
} from '@material-ui/core';
import Spinner from './spinner/Spinner';
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

const MedicineTable = ({ shopUrl }) => {
  const classes = useStyles();
  const {
    state: { user, dataLoading, medicines, userMedicines, searchTerm },
    error,
  } = useContext(StoreContext);
  const [renderableMedicines, setRenderableMedicines] = useState([]);

  useEffect(() => {
    if (searchTerm.trim().length > 1) {
      if (shopUrl) {
        const tempMedicines = userMedicines.filter((medicine) =>
          medicine.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setRenderableMedicines(tempMedicines);
      } else {
        const tempMedicines = medicines.filter((medicine) =>
          medicine.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setRenderableMedicines(tempMedicines);
      }
    } else setRenderableMedicines([]);
  }, [medicines, shopUrl, userMedicines, searchTerm]);

  if (dataLoading)
    return (
      <Card className={classes.center}>
        <Spinner />
      </Card>
    );
  else if (error)
    <Card className={classes.center}>
      <Typography color='secondary' variant='h6'>
        Something went wrong
      </Typography>
    </Card>;
  else
    return renderableMedicines.length > 0 ? (
      <TableContainer component={Paper} className={classes.paper}>
        <Table className={classes.root}>
          <TableHead>
            <TableRow className={classes.tableHead}>
              <SlimTableCell></SlimTableCell>
              <SlimTableCell>Medicine Details</SlimTableCell>
              <SlimTableCell align='center'>1 Pcs</SlimTableCell>
              <SlimTableCell align='center'>Blister</SlimTableCell>
              {user?.shopUrl === shopUrl && (
                <TableCell
                  align='center'
                  className={classes.buttonCellRoot}
                ></TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {renderableMedicines?.map((medicine) => {
              const { id, dForm, name, size, one, blister } = medicine;
              return (
                <TableRow key={id}>
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
                  {user?.shopUrl === shopUrl && (
                    <DeleteMedicine id={id} name={name} />
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    ) : (
      <Card className={classes.center}>
        <Typography variant='h6'>
          {searchTerm.trim().length < 2
            ? 'Type at least two characters.'
            : 'There are nothing to match.'}
        </Typography>
      </Card>
    );
};

export default MedicineTable;
