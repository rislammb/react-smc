import React from 'react';
import { Card, CardContent, CardHeader, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
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
  strong: {
    letterSpacing: 1.1,
  },
}));

const About = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardHeader className={classes.header} title='Sara Medicine Corner' />
        <CardContent>
          <Typography>
            <strong className={classes.strong}>Sara Medicine Corner</strong> is
            a small medicine retail shop in Bagmara, Rajshahi, Bangladesh.
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default About;
