import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

import img from "../../Assets/images/outfit.jpg"
import { Grid } from '@material-ui/core';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits(props) {
  const classes = useStyles();
  console.log(props.item[props.item.length-1])

  return (
    <React.Fragment>
      <Title > 
      Recent item
      <span style={{color:"grey",fontSize:"16px"}}> ( wardrobe ) :</span>
      </Title>
    
      <Typography component="p" variant="h4">
      <span style={{fontSize:"16px"}}>{ props.item[props.item.length-1] && props.item[props.item.length-1].name}</span>
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext} style={{paddingBottom:'10px',paddingTop:"10px"}}>
       Brand : { props.item[props.item.length-1] && props.item[props.item.length-1].brand?props.item[props.item.length-1].brand:'-'}
      </Typography>
    
      <img src={ props.item[props.item.length-1] && props.item[props.item.length-1].image?props.item[props.item.length-1].image:img} height="50%" ></img>
     
      <div>
      </div>
    </React.Fragment>
  );
}