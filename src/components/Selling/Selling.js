
import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import exchange from '../../Assets/images/outfit.jpg'
import './Selling.css';
import axios from "axios";
import {Link} from 'react-router-dom';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import Badge from '@material-ui/core/Badge';
import SingleSell from './SingleSell';
import SellList from './SellList';
import AppsIcon from '@material-ui/icons/Apps';
import Chip from '@material-ui/core/Chip';
import AccessTimeIcon from '@material-ui/icons/AccessTime';











function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
  
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  }, 
  root33: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
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
  coli:{
    
    backgroundColor:'rgba(255, 0, 0, 0.4)',
    
  },
  coli1:{
    
    backgroundColor:' rgba(0,255,0,0.4)',
   
  },
  container: {
    maxHeight: 440,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function ScrollableTabsButtonForce() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [sells,setsells] = useState([]);

  
  const [refresh,setRefresh] = useState(false);

  const [open, setOpen] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fetchIt1 =async ()=>{

 
    axios.get(`http://code-beast.herokuapp.com/sell`)
      .then(res => {
     
        setsells(res.data)

        res.data.map(c=>{

          if (c.notif==1&&c.buyer==window.localStorage.getItem("connectedUserID")){
            setInvisible(false);
          } 
        })

      })
  
  }
  
   

 
  
  const [invisible, setInvisible] = React.useState(true);

 

    
    
    
    React.useEffect(() => {
   
      fetchIt1();
   
    
  
  },[refresh])


  const onhandle=()=>{
    setInvisible(true);
    sells.map(s=>{

      if (s.buyer==window.localStorage.getItem("connectedUserID")){
        
        s.notif=0;

        axios.patch(`http://code-beast.herokuapp.com/sell/${s._id}`,s)
        .then(res =>{
            console.log(res)
        })
    
         .catch(err=>{
        console.log(err)
    })
        

      }
     
    })
  }

 




  function FormRow1() {

    

    var ladate=new Date()

    if (ladate.getMonth()+1<10){
      if (ladate.getDate()<10){
        var cc=ladate.getFullYear()+"-0"+(ladate.getMonth()+1)+"-0"+ladate.getDate();
      }else{
        var cc=ladate.getFullYear()+"-0"+(ladate.getMonth()+1)+"-"+ladate.getDate();
      }
      
    }else{
      if (ladate.getDate()<10){
        var cc=ladate.getFullYear()+"-"+(ladate.getMonth()+1)+"-0"+ladate.getDate();
      }else{
        var cc=ladate.getFullYear()+"-"+(ladate.getMonth()+1)+"-"+ladate.getDate();
      }
     
    }
    
  

  

    
    return (
     
      <React.Fragment>

       

     {sells.map(i=>{

        if (i.buyer!=window.localStorage.getItem("connectedUserID")&&(i.state.toUpperCase()=="FORSELL"||i.state.toUpperCase()=="CANCELED"||i.state.toUpperCase()=="PENDING")){
          
          var dd=i.datePost+"";
          var dateee=dd.substr(0,10);
     
        
        return(
          <Grid item xs={3}>
          <Paper className={classes.paper}>

    {i.state.toUpperCase()=="FORSELL"||i.state.toUpperCase()=="CANCELED"?(

    
          <Card className={classes.root}>

            <Link to={'/home/selling/sellDetails/'+i._id} className="link">
           
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
          <Typography variant="subtitle2" color="textSecondary" component="p" align="center"> 
               {x.description} 
          </Typography>
      
          </React.Fragment>
         ) ):null}
        
        
         



          <Typography variant="subtitle2" color="textSecondary" component="p" align="center">
            Price: {i.price} DT
            
          </Typography>

          <div className="newic">  

         {dateee==cc?(
           <FiberNewIcon />
         ):null}
           </div>

          
        

        </CardContent>
      </CardActionArea>
      </Link>
  
    </Card>

        ):i.state.toUpperCase()=="PENDING"?(
<React.Fragment>
          {i.seller==window.localStorage.getItem("connectedUserID")?(

<Card className={classes.root}>
<Link to={'/home/selling/sellDetails/'+i._id} className="link">
<div className="forsell1" >

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
<Typography variant="subtitle2" color="textSecondary" component="p" align="center"> 
    {x.description} 
</Typography>

</React.Fragment>
) ):null}






<Typography variant="subtitle2" color="textSecondary" component="p" align="center">
 Price: {i.price} DT
 
</Typography>

<div className="newic">  



<Chip
           size="small"
           label="Pending to sell"
           icon={<AccessTimeIcon/>}
           className={classes.coli1}
               />
</div>




</CardContent>
</CardActionArea>

</div>
</Link>
</Card>




          ):(
            <Card className={classes.root}>

            <div className="forsell" >
            
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
           <Typography variant="subtitle2" color="textSecondary" component="p" align="center"> 
                {x.description} 
           </Typography>
       
           </React.Fragment>
          ) ):null}
         
         
          
   
   
   
           <Typography variant="subtitle2" color="textSecondary" component="p" align="center">
             Price: {i.price} DT
             
           </Typography>
   
           <div className="newic">  
   
        
   
   <Chip
                       size="small"
                       label="Pending to sell"
                       icon={<AccessTimeIcon/>}
                       className={classes.coli}
                           />
            </div>
   
           
         
   
         </CardContent>
       </CardActionArea>
     
       </div>
     </Card>
          )}
         
  </React.Fragment>


        ):null}


          </Paper>

        
        </Grid>
        

        );

        }

      })}

       
        
     
      </React.Fragment>
    );
  
  }



 
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          <Tab label="My Posts" icon={<FavoriteIcon />} {...a11yProps(0)} />
          <Tab label="Items For Sells" icon={<ShoppingBasket  />} {...a11yProps(1)} />
          <Tab label="List of sells" icon={<Badge color="secondary" variant="dot" invisible={invisible}>
          <AppsIcon  />
        </Badge>} {...a11yProps(2)} onClick={onhandle} />
    
         
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
      <div className="title">
      <h1> My Posts </h1>
      
       </div>

      <Grid container spacing={1}>
        
        
     
        <Grid container item xs={12} spacing={3}>
          

        {sells.map(i=>


i.buyer===window.localStorage.getItem("connectedUserID")&&(i.state.toUpperCase()=="FORSELL"||i.state.toUpperCase()=="PENDING"||i.state.toUpperCase()=="CANCELED")?
( 
            <SingleSell  i={i} refresh={setRefresh}/>  
):null

        )}

         
         
        </Grid>


     
      </Grid>

      </TabPanel>





      <TabPanel value={value} index={1}>
         <div className="title">
      <h1> Items for sell </h1>
      <h5> Please choose an item , you want to buy! </h5>
       </div>

      <Grid container spacing={1}>
        
        
     
        <Grid container item xs={12} spacing={3}>
          
         
        <FormRow1 /> 

   
        </Grid>


     
      </Grid>
      </TabPanel>




      <TabPanel value={value} index={2}>

     
          <SellList sells={sells} />
    

        </TabPanel>
  
    
    </div>
  );
}
