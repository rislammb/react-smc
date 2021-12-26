import React, { useContext, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Button,
  LinearProgress,
} from '@material-ui/core';
import EmailField from '../components/EmailField';

import StoreContext from '../store/storeContext';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    margin: '0px auto',
    padding: '50px 12px',
    width: '180px',
  },
  card: {
    width: 330,
    maxWidth: '90%',
    backgroundColor:
      theme.palette.type === 'light' ? 'rgba(255,255,255,0.3)' : '',
  },
  header: {
    textAlign: 'center',
    color:
      theme.palette.type === 'light'
        ? theme.palette.primary.dark
        : theme.palette.primary.light,
  },
  link: {
    textDecoration: 'none',
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
    textAlign: 'center',
  },
  recoverText: {
    marginTop: theme.spacing(2),
  },
}));

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
});

const Recover = () => {
  const classes = useStyles();
  const {
    authLoading,
    user,
    userError,
    setUserError,
    recoverAccount,
    isSendEmail,
    setIsSendEmail,
  } = useContext(StoreContext);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setUserError({});
      await recoverAccount(values.email);
      setSubmitting(false);
    },
  });

  useEffect(() => {
    setUserError({});
    setIsSendEmail(false);
  }, []);

  if (authLoading)
    return (
      <div className={classes.center}>
        <LinearProgress variant='indeterminate' />
      </div>
    );

  if (user) return <Redirect to={user.shopUrl ? `/p/${user.shopUrl}` : '/'} />;
  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardHeader className={classes.header} title='Account Recovery' />
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <EmailField
              label='Enater Email for recovery link'
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              className={classes.input}
            />
            {userError?.recover ? (
              <Typography color='error'>{userError?.recover}</Typography>
            ) : (
              isSendEmail && (
                <Typography color='primary'>
                  Password reset Email has send. Please check your Email
                </Typography>
              )
            )}

            <div className={classes.cardActions}>
              <Button
                disabled={formik.isSubmitting}
                color='primary'
                variant='contained'
                type='submit'
              >
                Send Email
              </Button>
              <Typography variant='body2' className={classes.recoverText}>
                Remember Password?{' '}
                <Link className={classes.link} to='/login'>
                  Login
                </Link>
              </Typography>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Recover;
