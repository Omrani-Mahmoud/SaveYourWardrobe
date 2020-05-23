import React from 'react';
import clsx from 'clsx';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Deposits from './Deposits.js';
import Orders from './Orders';
import Button from '@material-ui/core/Button';
import {Route,BrowserRouter as Router,Switch,Link,useHistory} from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import {uri} from "../../UrlBase";

import Emails from '@material-ui/icons/Drafts';
import Froms from '@material-ui/icons/Description';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import img from "../../Assets/images/f2.jpeg"

import img1 from "../../Assets/images/f1.jpeg"

import img2 from "../../Assets/images/f3.jpeg"

import img3 from "../../Assets/images/f4.jpeg"
import Fashion from './Fashion.js';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    marginTop:"-5%"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  rootBtnAdd: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    color: 'white',



  },
  gridList: {
    width: 500,
    height: 450,
  },
}));

export default function MainPage(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);




const data = [
  {title:"Show skin strategically ",
    img:img1,
    text:`Looking truly sexy involves knowing what to bare-and what to keep under wraps. Otherwise, where's the mystery? Choose one-only one-body part and show it off, advises Jen Rade, stylist to ${<a href="https://www.instyle.com/celebrity/angelina-jolie">Angelina Jolie</a>} If it's cleavage, don't show your legs. If it's your legs, stay covered on top . `   
},
  {title:"Show skin strategically ",
    img:img1,
    text:`Looking truly sexy involves knowing what to bare-and what to keep under wraps. Otherwise, where's the mystery? Choose one-only one-body part and show it off, advises Jen Rade, stylist to Angelina Jolie . If it's cleavage, don't show your legs. If it's your legs, stay covered on top . `   
},
{title:"Round up White Button-Down ",
img:img,
text:`Take a classic cue fromMarilyn Monroe! They elevate jeans and keep ball skirts from drifting into fantasy-land. But all that mileage comes at a cost: a short shelf life. So buy three, don't overbleach (which can cause yellowing), and refresh regularly.

`   
},
{title:"Go Hands-Free for Evening",
img:img2,
text:`A dressy bag with a chain helps you hold crudités and a cocktail-plus, it lends a cool edge to evening wear, says stylist Cher Coulter. Wear the chain diagonally across your body for the best effect`   
},
{title:"Throw on a scraf",
img:img3,
text:`It's the ultimate accessory according to a host of the best-dressed women we interviewed. Stash one in your purse or carry-on to transform simple Ts in the time it takes to make a knot.`   
}
]


const [tips, settips] = React.useState({});

const [timer, settimer] = React.useState(false)

const [index, setindex] = React.useState(0)

const next = ()=>{
  if(index<4)
  setindex(index+1)
  else
  setindex(0);
}


setTimeout(()=>{
  settimer(!timer)
},8000)

React.useEffect(() => {
 next()
}, [timer])

  return (
    <div className={classes.root} style={{marginTop:'5%'}}>
      <main className={classes.content}>

  <span className="wlc">Welcome , {props.user.login}</span>
        <div className={classes.appBarSpacer} />
          
        <Container maxWidth="lg" className={classes.container}>
    
          <Grid container spacing={3}>
          
  
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper} style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
              <Card style={{width:"30%", paddingRight:"20px"}}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Your wardrobe
        </Typography>
        <Typography variant="h5" component="h2">
            {props.item.length-1}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          items
        </Typography>
      </CardContent>
      <CardActions >
       <Link to="/home/mywardrobe"> <Button size="small" >My wardrobe</Button></Link>
      </CardActions>
    </Card>
    <Fashion />
   
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Deposits item={props.item}/>
              </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper className={classes.paper} style={{minHeight:"400px"}}>
              <Typography variant="h4" component="h2" style={{paddingBottom:"50px",paddingTop:'15px'}} className="fashion">
          
              Fashion Tips of All Time

        </Typography>
        <div style={{display:"flex",flexDirection:"row"}}>
          <div  style={{height:"100%",width:"30%"}}>
            <Grid item md={12} xs={12}>
            <img src={data[index].img}width="100%" />
            </Grid>
          </div>
          <div  style={{height:"100%",width:"70%",padding:"25px"}}>
   
          <Typography variant="h5" component="h2" style={{paddingBottom:"10px"}}>
        {data[index].title}

        </Typography>
  
        <Typography className={classes.pos} color="textSecondary">
        {data[index].text}
        </Typography>
          </div>
        </div>
     
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
      
          </Box>
        </Container>
      </main>
    </div>
  );
}