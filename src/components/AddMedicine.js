import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Card,
  CardContent,
  CardHeader,
  Button,
  Modal,
  Backdrop,
  Fade,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DoseField from './DoseField';
import NameField from './NameField';
import SizeField from './SizeField';
import SingleField from './SingleField';
import BlisterField from './BlisterField';

import StoreContext from '../store/storeContext';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: 330,
    maxWidth: '90%',
    backgroundImage:
      theme.palette.type === 'light'
        ? 'linear-gradient(to right,  #fff4e3, #f9ffdc, #fff2ff)'
        : '',
    '&:focus': {
      outline: 'none',
    },
  },
  header: {
    textAlign: 'center',
    color:
      theme.palette.type === 'light'
        ? theme.palette.primary.dark
        : theme.palette.primary.light,
  },
  input: {
    marginBottom: theme.spacing(1),
  },
  cardActions: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
  },
  cancelBtn: {
    marginRight: theme.spacing(2),
  },
}));

const validationSchema = yup.object({
  dForm: yup
    .string('Enter Medicine Doges Form')
    .required('Doges Form is Required'),
  name: yup.string('Enter Medicine Name').required('Name is required'),
});

const initialValues = {
  dForm: '',
  name: '',
  size: '',
  one: '',
  blister: '',
};

const AddMedicine = ({ open, toggleModal }) => {
  const classes = useStyles();
  const { addMedicine } = useContext(StoreContext);

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      addMedicine(values);
      resetForm(initialValues);
    },
  });
  return (
    <Modal
      className={classes.root}
      open={open}
      onClose={toggleModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Card className={classes.card}>
          <CardHeader className={classes.header} title='Add Medicine' />
          <CardContent>
            <form onSubmit={formik.handleSubmit}>
              <DoseField
                autoFocus
                value={formik.values.dForm}
                onChange={formik.handleChange}
                error={formik.touched.dForm && Boolean(formik.errors.dForm)}
                helperText={formik.touched.dForm && formik.errors.dForm}
                className={classes.input}
              />
              <NameField
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                className={classes.input}
              />
              <SizeField
                value={formik.values.size}
                onChange={formik.handleChange}
                className={classes.input}
              />
              <SingleField
                value={formik.values.one}
                onChange={formik.handleChange}
                className={classes.input}
              />
              <BlisterField
                value={formik.values.blister}
                onChange={formik.handleChange}
                className={classes.input}
              />
              <div className={classes.cardActions}>
                <Button
                  color='secondary'
                  className={classes.cancelBtn}
                  onClick={toggleModal}
                  variant='contained'
                >
                  Close
                </Button>
                <Button color='primary' variant='contained' type='submit'>
                  Add
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </Fade>
    </Modal>
  );
};

export default AddMedicine;
