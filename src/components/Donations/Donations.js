import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles , useTheme} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import img from "../../Assets/images/outfit.jpg"
import Steps from './Steps';
import donation from '../../Assets/images/donate1.png'
import alertBG from '../../Assets/images/alertBG.png'
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/NotInterested';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import HomeIcon from '@material-ui/icons/Home';
import GrainIcon from '@material-ui/icons/Grain';
import Skeleton from '@material-ui/lab/Skeleton';
import Swal from 'sweetalert2'
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FolderIcon from '@material-ui/icons/Folder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DonationList from './DonationList';
import ListIcon from '@material-ui/icons/FormatListBulleted';
import {useLocation} from "react-router-dom";
import SingleItem from './SingleItem';
import {uri} from "../../UrlBase";

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,

    },
    cardRoot: {
        display: 'flex',

      },
      link: {
        display: 'flex',
        marginLeft:theme.spacing(5),
      },
      icon: {
        marginRight: theme.spacing(0.5),
      
        width: 20,
        height: 20,
      },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    }, details: {
        display: 'flex',
        flexDirection: 'column',
        width:"80%"
      },
      content: {
        flex: '1 0 auto',
      },
      cover: {
        width: "100%"
      },
      controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(5),
        paddingBottom: theme.spacing(1),
      },
      playIcon: {
        height: 38,
        width: 38,
      },
      botNav:{
        marginTop:"2%",
        width:"100%",
        backgroundColor:"transparent"
      }
  }));

  
function Donations() {

    const [selectedItemIndex,setSelectedItemIndex] = useState(0)
    const [items,setItems] = useState([])
    const [value, setValue] = React.useState('interface');
    const [disableItems,setDisableItems] = useState(false);
    const [reload,setReload] = useState(false);
    const [donItems,setDonItems] = useState([]);
    const [removedItems,setRemovedItems] = useState([]);

    const [hide,setHide] = useState({interface:false,donList:true});
    const classes = useStyles();
    const location = useLocation();
    const theme = useTheme();

    const nextItem = ()=>{
        setSelectedItemIndex(selectedItemIndex===items.length-1?0:selectedItemIndex+1) 
    }
    const previousItem = ()=>{
      setSelectedItemIndex(selectedItemIndex<=0 ?0:selectedItemIndex-1) 
  }


  const fetchIt =async ()=>{
    const filtredItems = [];
    const datatFromDataBase = await fetch(`${uri.link}userbyId/${window.localStorage.getItem("connectedUserID")}`);
    const data = await datatFromDataBase.json();
    data.wardrobe.items.map(elem=>{
      if(!elem.state)
      filtredItems.push(elem)
    })
    setItems(filtredItems)

}
  const removeItem = (id)=>{
    for( var i = 0; i < donItems.length; i++){ 
      if ( donItems[i]._id ===id) {
        setRemovedItems([...removedItems,donItems[i]])
        donItems.splice(i, 1); 
        i--;
      }
   }
  }


  const handleChangeBottomNav = (event, newValue) => {
    console.log(newValue)
    setValue(newValue);
    setReload(!reload)


  };

  React.useEffect(() => {
    fetchIt()
    Swal.fire({
      title: 'Giving is not just about making a donations, It is about making a difference',
      width: 600,
      showCancelButton: false,
      showConfirmButton: false,
      imageUrl: alertBG,
      imageWidth: 250,
      imageHeight: 250,
      backdrop: `
        rgba(231,171,247,0.4)
      `
    })
},[])


console.log("from link", location.items)
    return (
    
        <div className="aa" style={{ minHeight:"100vh"}}>
  
            <Breadcrumbs aria-label="breadcrumb" style={{marginBottom:"2%"}}>
                  <Link color="inherit" href="/" className={classes.link}>
                    <HomeIcon className={classes.icon} />
                      Home
                  </Link>
                  <Typography color="textPrimary" className={classes.link}>
                    <GrainIcon className={classes.icon} />
                    Donations
                  </Typography>
              </Breadcrumbs>
              <BottomNavigation value={value} onChange={handleChangeBottomNav} className={classes.botNav}>
                <BottomNavigationAction label="Donation Interface" value="interface" icon={<FavoriteIcon />}/>
                <BottomNavigationAction label="Don List" value="listDon" icon={<ListIcon />} />
                
              </BottomNavigation>
        <div className={classes.root} style={{marginTop:"5%"}} hidden={value==="interface"?false:true}>
        
        <img src={donation} width="300px" style={{position:"absolute",zIndex:"-99999",marginLeft:"-24px"}} />
        <h2 style={{textAlign:"center"}}hidden={ location && location.items && location.items.length>0?false:true}>Suggested Items</h2>

               <div style={{display:"flex",marginBottom:'3%', flexDirection:"row" , justifyContent:"center",flexWrap:"wrap",maxHeight:"140px",overflowY:"scroll"}}>
           
                    
            {            
                         location && location.items && location.items.length>0?
                         location.items.map((elem,index)=>(
                 
                        <SingleItem elem={elem} index={index} addToList={setDonItems} list={donItems} removedList={removedItems} clearItem={setRemovedItems}/>
           
                     )
                       )
                       : null
                       }
   
      

        </div>
             <Grid container spacing={0} direction="column" justify="center" alignItems="center" >
               
               <Grid item xs={12} sm={6} container>
              {items.length?
              
                <Card className={classes.cardRoot} style={{width:"100%"}}>       
                      <div className={classes.details} >
                        <CardContent className={classes.content}>
                          <Typography component="h5" variant="h5">
                            {items[selectedItemIndex].name}
                          </Typography>
                          <Typography variant="subtitle1" color="textSecondary">
                            Brand : {items[selectedItemIndex].brand}
                          </Typography>
                          <Typography variant="subtitle1" color="textSecondary">
                            Color : {items[selectedItemIndex].color}
                          </Typography>
                          <Typography variant="subtitle1" color="textSecondary">
                            Size : {items[selectedItemIndex].size}
                          </Typography>
                        </CardContent>

                        <div className={classes.controls}>
                          <IconButton aria-label="previous" disabled={disableItems} onClick={()=>previousItem()}>
                            {theme.direction === 'rtl' ? <ArrowRightIcon fontSize="large" /> : <ArrowLeftIcon fontSize="large"/>}
                          </IconButton>
                          <IconButton aria-label="add"  disabled={disableItems} onClick={()=>setDonItems([...donItems,items[selectedItemIndex]])}>
                            <AddCircleIcon className={classes.playIcon} />
                          </IconButton>
                          <IconButton aria-label="next"  disabled={disableItems} onClick={()=>nextItem()}>
                            {theme.direction === 'rtl' ? <ArrowLeftIcon fontSize="large"/> : <ArrowRightIcon fontSize="large" />}
                          </IconButton>
                        </div>
                      </div>
                      <CardMedia
                        
                        className={classes.cover}
                        image={items[selectedItemIndex].image?items[selectedItemIndex].image:img}
                        title={items[selectedItemIndex].name}
                      />
                 
                  
    </Card>:
     <div className={classes.root}>
     <Skeleton />
     <Skeleton animation={false} />
     <Skeleton animation="wave" />
   </div>}
  

          <div hidden={!disableItems} >
              <Chip
                      icon={<FaceIcon />}
                      label="you cant choose an item now"
                      color="secondary"
                      variant="outlined"
                      style={{textAlign:"center", marginTop:"2%",marginLeft: "100%"}}
                    />
                    </div>
                </Grid>

                <Grid container item xs={12} sm={6} >
                <Paper className={classes.paper} style={{width:"100%",marginTop:"7%"}} >
                  <Steps data={donItems} disableItems={setDisableItems} removeItem={removeItem} resetDonItems={setDonItems}/>
                </Paper>
                </Grid>
            </Grid>
      
        </div>
        <div hidden={value==="listDon"?false:true}>
 
        <DonationList  reload={reload}/>

        </div>
        </div>
    )

}

export default Donations
