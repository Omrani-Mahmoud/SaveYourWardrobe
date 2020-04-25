
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
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
import {Link} from 'react-router-dom';



const useStyles = makeStyles(theme => ({
  root: {
   flexGrow: 1,
   
    
  },
  media: {
    height: 140,
  
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));
export default function StickyHeadTable() {

  

  const [sells,setsells] = useState([{}]);

  const [users,setusers] = useState([{}]);

  const classes = useStyles();

 





const fetchIt1 =async ()=>{
  const datatFromDataBase = await fetch(`http://localhost:4000/sell`);
  const data = await datatFromDataBase.json();
  setsells(data)

}

 
const fetchIt2 =async ()=>{
  const datatFromDataBase = await fetch(`http://localhost:4000/user`);
  const data = await datatFromDataBase.json();
  setusers(data)
}


  
  
  
  React.useEffect(() => {
 
    fetchIt1();
    fetchIt2();

},[])




  function FormRow1() {
    return (
     
      <React.Fragment>

       

      {sells.map(i=>{


        var datee=""+i.datePost;
        var dateee=datee.substr(0,10);
        
        return(
          <Grid item xs={3}>
          <Paper className={classes.paper}>

          <Card className={classes.root}>

            <Link to={'/home/selling/itemSell/'+i._id} className="link">
            <Typography variant="subtitle1" color="secondary" component="p" align="justify">
             Date posted :{dateee}
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
        
        
         

        <Typography variant="subtitle2" color="textPrimary" component="h2"  align="justify"> 
               Seller Informations :
          </Typography>

          <Typography variant="subtitle2" color="textSecondary" component="p" align="justify">
            Address: {i.location} 
          </Typography>

         
          {users.map(m=>{

            if (m._id==i.buyer){

              return (
                <React.Fragment> 
                <Typography variant="subtitle2" color="textSecondary" component="p" align="justify">
                Seller-Name: {m.login}
                </Typography>

                <Typography variant="subtitle2" color="textSecondary" component="p" align="justify">
                Phone_Number: {m.phoneNumber}
                </Typography>
                </React.Fragment>
              )
             

            }


          })}

         
         

          <Typography variant="subtitle2" color="textSecondary" component="p" align="right">
            Price: {i.price} DT
            
          </Typography>
        

        </CardContent>
      </CardActionArea>
      </Link>
      <CardActions>
        <Button size="small" color="primary">
          More Info
        </Button>
        <Button size="small" color="primary">
          Sell
        </Button>
      </CardActions>
    </Card>


          </Paper>

        
        </Grid>
        

        );



      })}

       
        
     
      </React.Fragment>
    );
  }

  return (
    <div className={classes.root}>

      

      <div className="title">
      <h1> Items for sell </h1>
      <h5> Please choose an item , you want to buy! </h5>
       </div>

      <Grid container spacing={1}>
        
        
     
        <Grid container item xs={12} spacing={3}>
          
         
          <FormRow1 />
        </Grid>


     
      </Grid>
     
    </div>
  );

}