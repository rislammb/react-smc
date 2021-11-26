import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Link,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
  divider: {
    margin: '21px 0',
  },
  fontSize: {
    fontSize: 17,
  },
}));

const Contact = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardHeader className={classes.header} title='Contact SMC' />
        <CardContent>
          <Typography className={classes.fontSize}>
            Mail to:{' '}
            <Link className={classes.link} href='mailto:rislammb@gmail.com'>
              rislammb@gmail.com
            </Link>
          </Typography>
          <Typography className={classes.fontSize}>
            Facebook:{' '}
            <Link
              className={classes.link}
              href='https://www.facebook.com/rislammb'
            >
              facebook/rislammb
            </Link>
          </Typography>
          <Divider className={classes.divider} />
          <Typography variant='h5'>Find Us at:</Typography>
          <Typography style={{ marginTop: 9 }}>
            Puran Polli Biddut More,
          </Typography>
          <Typography className={classes.fontSize}>
            Bhowanigonj Bazar,
          </Typography>
          <Typography className={classes.fontSize}>
            Bagmara, Rajshahi, Bangladesh
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Contact;
