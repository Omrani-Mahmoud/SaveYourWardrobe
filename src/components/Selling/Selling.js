
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

  const [items,setItems] = useState([{}]);

  const classes = useStyles();

 



  const fetchIt =async ()=>{
    const datatFromDataBase = await fetch("http://localhost:4000/item");
    const data = await datatFromDataBase.json();
   
  
    setItems(data);

   


  
  }

 
  if (sessionStorage.getItem("test")){
    if (sessionStorage.getItem("test")==1){

      sessionStorage.setItem("test",1);
    }
    

  }else{
    sessionStorage.setItem("test",0);
  }


  
  
  
  React.useEffect(() => {
    fetchIt()
   
},[])





 

  

  function FormRow() {
    return (
     
      <React.Fragment>

       

      {items.map(i=>{

        return(
          <Grid item xs={3}>
          <Paper className={classes.paper}>

          <Card className={classes.root}>

            <Link to={'/home/selling/itemSell/'+i._id} className="link">
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={exchange}
          title={i.name}
        />
        <CardContent>
       
          <Typography gutterBottom variant="h5" component="h2">
            {i.name}
          </Typography>
          <Typography variant="subtitle1" color="textPrimary" component="p">
            {i.description}
           
          </Typography>
          <Typography variant="subtitle2" color="textSecondary" component="p" align="justify">
            Size: {i.size}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary" component="p" align="justify">
            Color: {i.color}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary" component="p" align="justify">
            Price: {i.price} DT
          </Typography>

        </CardContent>
      </CardActionArea>
      </Link>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
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
      <h1> My Wardrobe</h1>
      <h5> Please choose an item , you want to sell! </h5>
       </div>

       
      <Grid container spacing={1}>
     
        <Grid container item xs={12} spacing={3}>
          <FormRow />
        </Grid>
    
     
      </Grid>
    </div>
  );

}