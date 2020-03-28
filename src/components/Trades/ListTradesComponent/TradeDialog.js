import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import axios from 'axios'
import PropTypes from 'prop-types';
import Swal from 'sweetalert2'


const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

export default function TradeDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open,trade } = props;


  const handleClose = () => {
    onClose(selectedValue);
  };



  const UpdateTrade=(e) =>{
    trade.TradeTo=window.localStorage.getItem("connectedUserID");
    trade.status="Confirmed";
    trade.items.push(e);
    axios.patch(`http://localhost:4000/trade/${trade._id}`,trade)
    .then(res=>{

        console.log(res)
        onClose(true);
        
    })
    .catch(err=>{
        console.log(err)
    })

}



  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Choose item to trade with </DialogTitle>
      <List>
        { props.data.data ? props.data.data.wardrobe.items.map(e => (
          
          <ListItem button onClick={() => UpdateTrade(e)} key={e.name}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={e.name} />
          </ListItem>
        )):null
      }

    
      </List>
    </Dialog>
  );
}

