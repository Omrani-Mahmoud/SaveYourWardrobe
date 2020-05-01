import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import EuroIcon from '@material-ui/icons/Euro';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import AmpStoriesIcon from '@material-ui/icons/AmpStories';
import logo from '../../src/Assets/images/logoBlack.png';
import LoginPage from '../components/Login/LoginPage'
import {Route,BrowserRouter as Router,Switch,Link,useHistory} from 'react-router-dom'
import GradeIcon from '@material-ui/icons/Grade';

import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';

import axios from "axios";
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import AssociationMain from './InsideHome/AssociationMain';
import AddEvent from './AddEvent';
const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
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
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function HomeAssociation(props) {
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [verif, setVerif] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    axios.post("http://localhost:4000/verify",{token:window.localStorage.getItem("tokenWardrobe")})
    .then(res=>{
      console.log(res)
        if(res){
            window.localStorage.setItem("connectedUserID",res.data.user.user._id)
            setVerif(true);
            setUser(res.data.user.user);
        }
        else {
          window.localStorage.removeItem("connectedUser");
          window.localStorage.removeItem("tokenWardrobe");
          window.location.replace(window.location.pathname)
          setVerif(false)

            }
    })
    .catch(err=>{
        console.log(err)
    })
  }, [])

  if (user && user.role==="Association"  && window.localStorage.getItem("tokenWardrobe")){
  //var user = jwt.decode(window.localStorage.getItem("token"));
  
  return (
    
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        color="inherit"
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
            
          </IconButton>
         <Link to={`/`}  ><img src={logo} width="200px" /> </Link>
          
                
        </Toolbar>
      
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
        <Link to={`/home`}  > <ListItem button>
             <ListItemIcon><BubbleChartIcon /></ListItemIcon>
              <ListItemText primary={"Associations"} />
            </ListItem></Link>
            <Link to={`/home/events`}  > <ListItem button>
             <ListItemIcon><GradeIcon /></ListItemIcon>
              <ListItemText primary={"Events"} />
            </ListItem></Link>
           
        </List>
       {/* <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
          </List> */}
      </Drawer>
      
      <main className={classes.content}>
        <div className={classes.toolbar} />
 
                <Switch>
                    <Route path={`/home`} exact component={AssociationMain} />
                    <Route path={`/home/events`} exact component={AddEvent} />
                   
                </Switch>
      </main>

    </div>
  );
}
else{

  return(
    (<LoginPage />)
  )
}

}