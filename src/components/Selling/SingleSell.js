import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import exchange from '../../Assets/images/outfit.jpg'
import './Selling.css';
import axios from "axios";

import CancelIcon from '@material-ui/icons/Cancel';
import BorderColorRoundedIcon from '@material-ui/icons/BorderColorRounded';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import {uri} from "../../UrlBase";



const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    }, 
     media: {
       height: 140,
     
     },
     paper: {
       padding: theme.spacing(1),
       textAlign: 'center',
       color: theme.palette.text.secondary,
     },
     modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper1: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));


export default function SingleSell({i,refresh}) {

    const classes = useStyles();
 

    const [open, setOpen] = React.useState(false);

    const deletee =  (idd) =>{


        axios.delete(`${uri.link}sell/${idd}`)
         .then(res=>{
             console.log(res)
             refresh(true);
         })
         .catch(err=>{
             console.log(err)
         })
     
         setOpen(false);
     }
     
     
     var prix=1;
     

       
     const ChangeHandler=event=>{
       
     prix=event.target.value;

     if (prix<p){
       setshow(false);
     }else{
       setshow(true);
     }

     if (prix==""||prix<0){
      setshow(true);
     }
     
     }
     
     const SellUpdate = (id_sel,val)=>{
       val.price=prix;
       
     axios.patch(`${uri.link}sell/${id_sel}`,val)
         .then(res =>{
             console.log(res)
            
         })
     
          .catch(err=>{
         console.log(err)
     })
     
     setOpen1(false);
     }
     
     const handleClickOpen = () => {
       setOpen(true);
     };
     
     const handleClose = () => {
       setOpen(false);
     };
       
       
     
     const [open1, setOpen1] = React.useState(false);

     const [show, setshow] = React.useState(true);
     
     const [p, setp] = React.useState();
     const handleOpen  = (ob) => {

      ob.items.map(c=>{
        setp(c.price);
      })

    

       setOpen1(true);

     };
     
     const handleClosee  = () => {
       setOpen1(false);
     };

     var dd=i.datePost+"";
     var dateee=dd.substr(0,10);

return(

    <Grid item xs={3}>
    <Paper className={classes.paper}>
   
    <Card className={classes.root}>
   
    <div  className="link">
     
     
      <Typography variant="subtitle1" color="initial" component="p" align="right">
       Date posted :{dateee}
   
   
       {i.state.toUpperCase()=="FORSELL"||i.state.toUpperCase()=="CANCELED"?(   

         <React.Fragment>
   <Button size="small" color="inherit" onClick={handleClickOpen}>
   <CancelIcon color="error" />
   </Button>
   <Dialog
   open={open}
   onClose={handleClose}
   aria-labelledby="alert-dialog-title"
   aria-describedby="alert-dialog-description"
   >
   <DialogTitle id="alert-dialog-title">Delete </DialogTitle>
   <DialogContent>
   
    <DialogContentText id="alert-dialog-description">
    <ReportProblemIcon color="error" />  Are you sure you want to delete this sell!  
    </DialogContentText>
   </DialogContent>
   <DialogActions>
   <Button onClick={()=>deletee(i._id)} color="primary" autoFocus>
   Delete  <CheckIcon/> 
    </Button>
    <Button onClick={handleClose} color="primary">
      No <ClearIcon/>
    </Button>
   
   </DialogActions>
   </Dialog>
   </React.Fragment>

       ):
       
       <Button size="small" color="inherit" >
   <ErrorOutlineIcon color="error" />
   </Button>
       
       
       }
   
       
   
     </Typography>
   
   <CardActionArea>
   
   <CardMedia
    className={classes.media}
    image={exchange}
    title={i.name}
   />
   <CardContent>
   {i.items && i.items.length>0?i.items.map(x=>(     
    <React.Fragment> 
    <Typography gutterBottom variant="h5" component="h2"> 
         {x.name} 
    </Typography>
      <Typography variant="subtitle1" color="textPrimary" component="p">
      {x.description}
     </Typography>
     <Typography variant="subtitle2" color="textSecondary" component="p" align="justify">
      Size: {x.size}
    </Typography>
    <Typography variant="subtitle2" color="textSecondary" component="p" align="justify">
      Color: {x.color}
    </Typography>
    
    </React.Fragment>
   ) ):null}
   
   
   
    <Typography variant="subtitle2" color="textSecondary" component="p" align="right">
      Price: {i.price} DT
      
    </Typography>
   
   
   
   
   
   </CardContent>
 
   </CardActionArea>
   <CardActions>
   
   
   
   
   {i.state.toUpperCase()=="FORSELL"||i.state.toUpperCase()=="CANCELED"?(
   <div>
   
   <Button size="small" color="inherit" align="right" onClick={()=>handleOpen(i)}>
   Update <BorderColorRoundedIcon fontSize="small"/>
   </Button>
   <Dialog open={open1} onClose={handleClosee} aria-labelledby="form-dialog-title">
     <DialogTitle id="form-dialog-title">Update</DialogTitle>
     <DialogContent>
       <DialogContentText>
         Please Set the New price , you want to change

      <div className="marga">

      </div>
       

       </DialogContentText>
       <TextField
         
         margin="dense"
         id="name"
         label="New Price"
         type="number"
         fullWidth
         onChange={ChangeHandler}
       />
          <h2 className="MyError" hidden={!show}> The price is required! and must be less than the old price! </h2>
         <p align="right"> Old price:<strong> {p}  DT </strong> </p>
     </DialogContent>
     <DialogActions>
       <Button onClick={handleClosee} color="primary">
         Cancel <ClearIcon/>
       </Button>
       <Button onClick={()=>SellUpdate(i._id,i)} color="primary" disabled={show}>
         Validate <CheckIcon/> 
       </Button>
     </DialogActions>
   </Dialog>
   
   </div>

   ):(
   <Button size="small" color="inherit" align="right" >
   {i.state} 
   </Button>)
   }
   
   
   
   
   </CardActions>
   
   </div>
   
   </Card>
   
   
    </Paper>
   
   
   </Grid>



)












}