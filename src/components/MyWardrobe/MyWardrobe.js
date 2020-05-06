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
import {Link} from 'react-router-dom';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Emails from '@material-ui/icons/Drafts';
import Froms from '@material-ui/icons/Description';


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
    rootBtnAdd: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      color: 'white',
  
  
  
    },
  }));


  export default function StickyHeadTable() {

  const [items,setItems] = useState([{}]);
  const classes = useStyles();


  const fetchIt =async ()=>{
    const datatFromDataBase = await fetch(`https://code-beast.herokuapp.com/userbyId/${window.localStorage.getItem("connectedUserID")}`);
    const data = await datatFromDataBase.json();
    setItems(data.wardrobe.items)
}

React.useEffect(() => {
    fetchIt();
  

},[])




  function FormRow() {
    return (
     
      <React.Fragment>


      {items.map(i=>{

        return(
          <Grid item xs={3}>
          <Paper className={classes.paper}>

          <Card className={classes.root}>

            
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={i.image?i.image:exchange}
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
    
      <CardActions>
    
        <Button size="small" color="primary">
          Learn More
        </Button>
        <Link to={'/home/selling/itemSell/'+i._id} className="link"><Button size="small" color="primary">
          <AddShoppingCartIcon/> Sell
        </Button></Link>
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
     
       </div>

       <div style={{display:'flex',float:'right',flexDirection:"row",marginBottom:"2%"}}>
        <Link to="/home/perEmails" style={{marginRight:"20px"}}> 
        <Tooltip title="Import items from emails">
        <IconButton  aria-label="upload picture" component="span" className={classes.rootBtnAdd}>
          <Emails /> 
        </IconButton>
        </Tooltip>
        </Link>
          <Link to="/home/items" style={{marginRight:"30px"}}>
          <Tooltip title="Add items manually">
            <IconButton aria-label="upload picture" component="span" className={classes.rootBtnAdd}>
              <Froms />
            </IconButton>
            </Tooltip>
          </Link>

          
        </div>

      <Grid container spacing={1}>
        
     
        <Grid container item xs={12} spacing={3}>
          
          <FormRow />
         
        </Grid>


     
      </Grid>
    </div>

  
  );

}