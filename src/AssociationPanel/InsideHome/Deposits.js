import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

import img from "../../Assets/images/stan.jpg"

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Recent Item</Title>
      <Typography component="p" variant="h4">
        Item name
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
       Brand : 
      </Typography>
      <img src={img} width="70%" height="100" ></img>
      <div>
      </div>
    </React.Fragment>
  );
}