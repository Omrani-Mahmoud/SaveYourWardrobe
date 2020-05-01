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
import logo from '../src/Assets/images/logoBlack.png';
import LoginPage from './components/Login/LoginPage'
import {Route,BrowserRouter as Router,Switch,Link,useHistory} from 'react-router-dom'
import Donations from './components/Donations/Donations';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

import DonationEvent from '../src/components/Events/Donations/Donations';
import MyWardrobe from './components/MyWardrobe/MyWardrobe';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import SpeedDialC from './components/SpeedDial';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import Trades from './components/Trades/Trades';
import TClothes from './components/TClothes/TClothes';
import MainPage from './components/InsideHome/MainPage';
import axios from "axios";
import HomeAdmin from "./AdminPanel/HomeAdmin";
import AddNewItem from './components/Items/AddNewItem';
import EmailItemView from './Email items View/EmailItemView';
import Selling from './components/Selling/Selling'
import ItemSell from './components/Selling/ItemSell'
import PerEmail from './Email items View/PerEmail';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FiberManualRecordRoundedIcon from '@material-ui/icons/FiberManualRecordRounded';
import { green } from '@material-ui/core/colors';
import HomeAssociation from './AssociationPanel/HomeAssociation';
import HomeStore from './StorePanel/HomeStore';
import Swal from 'sweetalert2'
import img from '../src/Assets/images/volunteer.png'
import Paper from '@material-ui/core/Paper';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { DialogContent } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import EventIcon from '@material-ui/icons/Event';
import StarIcon from '@material-ui/icons/Star';


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
export const UserData = React.createContext();
export default function HomeAfterLogin(props) {
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [verif, setVerif] = React.useState(false);
  const [user, setUser] = React.useState(null);

  const [events, setEvents] = React.useState([]);
  const [openD, setOpenD] = React.useState(false);


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  React.useEffect(async () => {
   await axios.post("http://localhost:4000/verify",{token:window.localStorage.getItem("tokenWardrobe")})
    .then(res=>{
      console.log(res)
        if(res){
            window.localStorage.setItem("connectedUserID",res.data.user.user._id);
            //window.localStorage.setItem("connectedUserItems",res.data.user.user.items);
            window.localStorage.setItem("connectedUserEmail",res.data.user.user.email);
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

  const  fetchIt =async ()=>{
    const datatFromDataBase = await fetch(`http://localhost:4000/eventByDate`);
    const data = await datatFromDataBase.json();
    setEvents((data));

}
const handleClose = () => {
  setOpenD(false)
};

const handleOpen = (value) => {
  setOpenD(true);
};

React.useEffect(() => {
  fetchIt()
}, [])

  if (user && user.role==="user" && window.localStorage.getItem("tokenWardrobe")){
  
  
  return (
    <UserData.Provider value={user}> 
    
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={openD}>
      <DialogTitle id="simple-dialog-title">Current events : </DialogTitle>
      <DialogContent >
        <div style={{display:"flex", justifyContent:"center",alignItems:"flex-start", flexDirection:"column"}}>
          {events.map(x=>(
            <Link to={x.type==='Donation'?{pathname:"/home/donationEvent",id:x.association}:"/home"} style={{textDecoration:"none", color:"black"}} onClick={()=>setOpenD(false)}>
              <div style={{display:"flex", justifyContent:"center",alignItems:"center", marginBottom:"10%"}}>
             
              <StarIcon style={{color:"orange"}}/>
             

          <span ><b>{x.name}</b></span>
          {~~((new Date(x.endDate).getTime()-new Date().getTime())/ (1000 * 3600 * 24))<=2?
          <Tooltip title={`event will ends in ${~~((new Date(x.endDate).getTime()-new Date().getTime())/ (1000 * 3600 * 24))} days ..`}>
          <ErrorOutlineIcon color="error" style={{marginLeft:"10px"}} />
          </Tooltip>:null}
   

          
            </div>
            </Link>
          ))}
          </div>
      </DialogContent>
      </Dialog>
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
         <Link to="/home" ><img src={logo} width="200px" /> </Link>
            <div style={{marginLeft:"50%"}}>
                <Tooltip title="brief description oabout our story" TransitionComponent={Zoom} classes={{ tooltip: classes.customWidth }}>
                        <Button>Home</Button>
                    </Tooltip>
                    <Tooltip title="brief description oabout our story" TransitionComponent={Zoom} classes={{ tooltip: classes.customWidth }}>
                        <Button >Our story</Button>
                    </Tooltip>
                    <Tooltip TransitionComponent={Zoom} title="FAQ description">
                        <Button >FAQ</Button>
                    </Tooltip>
                    <Tooltip TransitionComponent={Zoom} title="My Profile">
                        <Button ><AccountCircleIcon/>  {user.login} <FiberManualRecordRoundedIcon style={{ color: green[500] ,fontSize: 13}} /> </Button>
                    </Tooltip>
                    <Tooltip TransitionComponent={Zoom} title="Current events">
                        <Button onClick={()=>handleOpen()}>
                        <Badge badgeContent={events.length} color="secondary">
                          <EventIcon/> Events  </Badge></Button>
                    </Tooltip>
            </div>
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

        <Link to="/home/mywardrobe" >
        <ListItem button>
              <ListItemIcon><AmpStoriesIcon /></ListItemIcon>
              <ListItemText primary={"Your wardrobe"} />
            </ListItem>
            </Link>

            <Link to="/home/donation" ><ListItem button>
              <ListItemIcon> <FavoriteBorderIcon /></ListItemIcon>
              <ListItemText primary={"Donation"} />
            </ListItem>
            </Link>

            
            <Link to="/home/trades" ><ListItem button>
              <ListItemIcon> <EuroIcon /></ListItemIcon>
              <ListItemText primary={"Trades"} />
            </ListItem>
            </Link>


               <Link to="/home/selling" ><ListItem button>
              <ListItemIcon> <EuroIcon  /></ListItemIcon>
              <ListItemText primary={"Selling"} />
            </ListItem>
            </Link>


            <Link to="/home/tclothes" ><ListItem button>
              <ListItemIcon> <FavoriteBorderIcon /></ListItemIcon>
              <ListItemText primary={"TClothes"} />
            </ListItem>
            </Link>
          

            <ListItem button >
              <ListItemIcon> <ContactSupportIcon /></ListItemIcon>
              <ListItemText primary={"OutFit Suggetion"} />
            </ListItem>
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
                    <Route path={`${props.match.path}/`} exact component={MainPage} />
                    <Route path={`${props.match.path}/mywardrobe`} exact component={MyWardrobe} />
                    <Route path={`${props.match.path}/donation`} exact component={Donations} />
                    <Route path={`${props.match.path}/trades`} exact component={Trades} />
                    <Route path={`${props.match.path}/tclothes`} exact component={TClothes} />
                    <Route path={`${props.match.path}/items`} exact component={AddNewItem} />
                    <Route path={`${props.match.path}/viewEmailItems`} exact component={EmailItemView} />
                    <Route path={`${props.match.path}/perEmails`} exact component={PerEmail} />
                    <Route path={`${props.match.path}/donationEvent`} exact component={DonationEvent} />

                 
                    <Route path={`${props.match.path}/v`} exact component={EmailItemView} />
                    <Route path={`/home/selling`} exact component={Selling} />
                    <Route path="/home/selling/itemSell/:itemId" exact  component={ItemSell}    />
                </Switch>
      </main>

    </div>
    </UserData.Provider>
  );
}
else{
if(user && user.role==="admin" && window.localStorage.getItem("tokenWardrobe"))
  return (<HomeAdmin />)
  if(user && user.role==="Association" && window.localStorage.getItem("tokenWardrobe"))
  return (<HomeAssociation />)  
  if(user && user.role==="Store" && window.localStorage.getItem("tokenWardrobe"))
  return (<HomeStore />)  
  return(
    (<LoginPage />)
  )
}

}