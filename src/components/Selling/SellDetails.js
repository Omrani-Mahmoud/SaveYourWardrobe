import React, { useState } from 'react';

import {useParams} from 'react-router-dom'
import './Selling.css';
import axios from "axios";

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import exchange from '../../Assets/images/outfit.jpg'

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import userlogo from '../../Assets/images/userLogo.png';

import Fab from '@material-ui/core/Fab';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';


import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import PhoneEnabledRoundedIcon from '@material-ui/icons/PhoneEnabledRounded';
import ContactMailRoundedIcon from '@material-ui/icons/ContactMailRounded';
import PersonPinCircleRoundedIcon from '@material-ui/icons/PersonPinCircleRounded';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

import {uri} from "../../UrlBase";



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));




export default function SingleSell() {

  const classes = useStyles();


    const itemId= useParams().itemId;


    const [sells,setsells] = useState([]);



    const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  const [show, setshow] = React.useState(false);

    const buy=(obj)=>{

      obj.seller=window.localStorage.getItem("connectedUserID");
      obj.notif=1;
      obj.state="Pending";

     axios.patch(`${uri.link}sell/${obj._id}`,obj)
        .then(res =>{
            console.log(res)
        })
    
         .catch(err=>{
        console.log(err)
    })


    handleClick();
    setshow(true);


     




    }






    const fetchIt1 =async ()=>{

        axios.get(uri.link+"sell/"+itemId)
        .then(res => {
       
          setsells(res.data)
         
          if (res.data.seller==window.localStorage.getItem("connectedUserID")){
            setshow(true);
          }
        })

      
      }

      const [users,setusers] = useState([]);

      const fetchIt2 =async ()=>{

        

        axios.get(uri.link+"user")
        .then(res => {
       
          setusers(res.data)
        
        })
      }
      
      React.useEffect(() => {
        fetchIt1()
        fetchIt2()

      
    
       
      
      
    },[])




 


    return (

        <React.Fragment>

     


              


              <div className={classes.root}>
      <Grid container spacing={3}>

      <Grid item xs={6}>
          <Paper className={classes.paper}>


          <Card className={classes.root}>
            
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="260"
          image={exchange}
          title="Contemplative Reptile"
        />
        <CardContent>
        {sells.items && sells.items.length>0?sells.items.map(x=>(
    <React.Fragment> 
    <Typography gutterBottom variant="h5" component="h2"> 
         {x.name} 
    </Typography>
      <Typography variant="subtitle1" color="textPrimary" component="p">
      {x.description}
     </Typography>
     <Typography variant="subtitle2" color="textSecondary" component="p" align="justify">
     <strong>  Brand: </strong> {x.brand}
    </Typography>
     <Typography variant="subtitle2" color="textSecondary" component="p" align="justify">
     <strong>  Size:</strong> {x.size}
    </Typography>
    <Typography variant="subtitle2" color="textSecondary" component="p" align="justify">
    <strong>  Color:</strong> {x.color}
    </Typography>
    <Typography variant="subtitle2" color="textSecondary" component="p" align="justify">
     <s> <strong> Original-Price: </strong>{x.price} DT</s>
    </Typography>

    
    </React.Fragment>
   ) ):null}

<Typography variant="subtitle2" color="error" component="p" align="right">
     <strong> Sell price: {sells.price} DT</strong>
    </Typography>
        </CardContent>
      </CardActionArea>
    
    </Card>







          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper className={classes.paper}>

            <img src={userlogo} width="150px" />


          {users.map(u=>{
            if (u._id==sells.buyer){


              return (

                <React.Fragment> 
                  <fieldset> 

                  <legend align="left"> Seller Informations </legend>

            <Typography variant="subtitle2" color="textSecondary" component="p" align="justify">
                <AccountCircleRoundedIcon /> Name: {u.login}
           </Typography>
                  
           <Typography variant="subtitle2" color="textSecondary" component="p" align="justify">
               <ContactMailRoundedIcon/>  Email: {u.email}
           </Typography>
           <Typography variant="subtitle2" color="textSecondary" component="p" align="justify">
              <PersonPinCircleRoundedIcon/>   Address: {u.address}
           </Typography>

           <Typography variant="subtitle2" color="textSecondary" component="p" align="justify">
               <PhoneEnabledRoundedIcon/>  Phone number: {u.phoneNumber}
           </Typography>



                {!show?(
               
           <Fab variant="extended" onClick={()=>buy(sells)} disabled={show} >
        <AddShoppingCartIcon className={classes.extendedIcon} />
        Buy now
      </Fab>
                 ):
                 
                 
                 <Fab variant="extended" onClick={()=>buy(sells)} disabled={show} >
                 <AccessTimeIcon className={classes.extendedIcon} />
                  {sells.state}...
               </Fab>
                 
                 
                 }
     
                  </fieldset>
                






                </React.Fragment>
              )
              



              
            }
          })}

        

        









          </Paper>
        </Grid>

        
  
      </Grid>
    </div>
         
          

    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
        success,your request was sent! you will receive a notification when it's confirmed
        </Alert>
      </Snackbar>

       

        
        </React.Fragment>

    )











}