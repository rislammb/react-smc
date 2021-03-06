import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from '@material-ui/core';
import DoseField from '../components/DoseField';
import NameField from '../components/NameField';
import SizeField from '../components/SizeField';
import SingleField from '../components/SingleField';
import BlisterField from '../components/BlisterField';

import StoreContext from '../store/storeContext';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    textAlign: 'center',
    padding: '50px 12px',
  },
  card: {
    width: 330,
    maxWidth: '90%',
    backgroundImage:
      theme.palette.type === 'light'
        ? 'linear-gradient(to right, #fff4e3, #f9ffdc, #fff2ff)'
        : '',
  },
  header: {
    textAlign: 'center',
    padding: theme.spacing(1),
    color: theme.palette.primary.main,
  },
  content: {
    padding: '8px 18px',
  },
  input: {
    marginBottom: '3px',
  },
  cardActions: {
    marginTop: theme.spacing(1),
    textAlign: 'center',
  },
  createError: {
    marginTop: theme.spacing(1),
  },
}));

const validationSchema = yup.object({
  shopName: yup
    .string('Enter Your Shop Name')
    .min(3, 'Page Name should be of minimum 3 characters length')
    .required('Shop Name is required'),
  shopUrl: yup
    .string('Enter Your Shop Url')
    .min(2, 'Shop Url should be of minimum 2 characters length')
    .required('Shop Url is required'),
  dForm: yup
    .string('Enter Medicine Doges Form')
    .required('Doges Form is Required'),
  name: yup.string('Enter Medicine Name').required('Name is required'),
});

const initialValues = {
  shopName: '',
  shopUrl: '',
  dForm: '',
  name: '',
  size: '',
  one: '',
  blister: '',
};

const CreatePage = () => {
  const classes = useStyles();
  const {
    authLoading,
    user,
    createCollection,
    createError,
    setCreateError,
  } = useContext(StoreContext);
  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setCreateError('');
      await createCollection(values);
      setSubmitting(false);
    },
  });

  useEffect(() => {
    setCreateError('');
  }, []);

  if (authLoading) {
    return (
      <div className={classes.center}>
        <CircularProgress />
      </div>
    );
  } else {
    if (user?.shopUrl) return <Redirect to={`/p/${user.shopUrl}`} />;
    if (user)
      return (
        <div className={classes.root}>
          <Card className={classes.card}>
            <CardHeader className={classes.header} title='Create Your Page' />
            <CardContent className={classes.content}>
              <form onSubmit={formik.handleSubmit}>
                <TextField
                  fullWidth
                  autoFocus
                  id='shopName'
                  name='shopName'
                  label='Shop Name'
                  placeholder='Sara Medicine Corner'
                  value={formik.values.shopName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.shopName && Boolean(formik.errors.shopName)
                  }
                  helperText={formik.touched.shopName && formik.errors.shopName}
                  className={classes.input}
                />
                <TextField
                  fullWidth
                  id='shopUrl'
                  name='shopUrl'
                  label='Shop Url'
                  placeholder='smc'
                  value={formik.values.shopUrl}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.shopUrl && Boolean(formik.errors.shopUrl)
                  }
                  helperText={formik.touched.shopUrl && formik.errors.shopUrl}
                  className={classes.input}
                />
                {createError && (
                  <Typography color='error'>{createError}</Typography>
                )}
                <Typography
                  variant='h6'
                  style={{ margin: '3px 0px' }}
                  color='primary'
                >
                  Add First Medicine
                </Typography>
                <DoseField
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
                    color='primary'
                    disabled={formik.isSubmitting}
                    variant='contained'
                    type='submit'
                  >
                    Create Page
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      );
    return <Redirect to='/login' />;
  }
};

export default CreatePage;
