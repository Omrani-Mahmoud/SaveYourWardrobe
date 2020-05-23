import React from 'react'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import List from './Donation List Components/List';

import {uri} from "../../../UrlBase";

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));
  



function DonationList(props) {
    const classes = useStyles();
    return (
        <div>
            <Grid item xs={12}>
          <Paper className={classes.paper}>
                <List reload={props.reload}/>
          </Paper>
      
        </Grid>
             
        </div>
    )
}

export default DonationList
