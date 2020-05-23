import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles , useTheme} from '@material-ui/core/styles';
import clsx from 'clsx';
import img from "../Assets/images/stan.jpg"
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Collapse from '@material-ui/core/Collapse';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import axios from'axios';
import DeveloperModeIcon from '@material-ui/icons/DeveloperMode';
import SaveIcon from '@material-ui/icons/Save';
import DoneIcon from '@material-ui/icons/Done';

import {uri} from "../UrlBase";

function SingleItem({elem,index}) {

  function hasNumber(myString) {
    return /\d/.test(myString);
  }
  if(elem.Price) {
    var item_price_tmp = elem.Price.split(" ");
    var item_price = 0;
    var item_currency = "";
    if(hasNumber(item_price_tmp[0])) {
      item_price = item_price_tmp[0];
      item_currency = item_price_tmp[1];
    }else {
      item_price = item_price_tmp[1];
      item_currency = item_price_tmp[0];
    }
  }
  
    const theme = useTheme();

    const [selectedItemIndex,setSelectedItemIndex] = React.useState(0)
    const [disabled,setDisabled] = React.useState(false)
    const [newItem,setNewItem] = React.useState({name:elem.Name,description:"",size:elem.Size,color:elem.Color,price:elem.Price?item_price:0,brand:"",add_date:"",image:elem.images[selectedItemIndex]})

    const nextImage = (images)=>{
        setSelectedItemIndex(selectedItemIndex===images.length-1?0:selectedItemIndex+1) 
      }
      const previousImage = ()=>{
      setSelectedItemIndex(selectedItemIndex<=0 ?0:selectedItemIndex-1) 
      }

      const addItem =()=>{
        newItem.add_date=new Date()
        axios.post(uri.link+"item",{item:newItem,user:window.localStorage.getItem("connectedUserID")})
            .then(res=>{
                console.log(res)
                setDisabled(true)
            })
            .catch(err=>{
                console.log(err)
            })

    }

    return (
        <Paper style={{marginBottom:"2%"}}>
                             <div style={{display:"flex",width:"100%",}}>
                              <div style={{width:"40%",display:"flex",alignItems:"center",justifyContent:"center"}}>
                              <IconButton aria-label="previous" disabled={disabled||selectedItemIndex===0?true:false} onClick={()=>previousImage()} size="small">
                            {theme.direction === 'rtl' ? <ArrowRightIcon fontSize="large" /> : <ArrowLeftIcon fontSize="large"/>}
                          </IconButton>
                          <img src={elem.images[selectedItemIndex]} width="100" height="auto" />

                          <IconButton aria-label="next"  disabled={disabled} onClick={()=>nextImage(elem.images)} size="small">
                            {theme.direction === 'rtl' ? <ArrowLeftIcon fontSize="large"/> : <ArrowRightIcon fontSize="large" />}
                          </IconButton>
                    
                               
                              </div>
                              <div  style={{width:"60%"}}>
                                  <h4>Item {index+1} </h4>
                                <h5 style={{color:"grey"}}><b>Category</b> : {elem.Category} </h5>
                                  <h5 style={{color:"grey"}}><b>Item Name </b>: {elem.Name} </h5>
                                  <h5 style={{color:"grey"}}><b>Item Size </b>: {elem.Size} </h5>
                                  <h5 style={{color:"grey"}}><b>Item Color </b>: {elem.Color} </h5>
                                  <h5 style={{color:"grey"}}><b>Item Price </b>: {elem.Price} </h5>
                              </div>
                             </div>
                             {
                                 !disabled?
                                 <div   style={{display:"flex",justifyContent:"center",alignItems:"center", cursor:"pointer"}}onClick={()=>{addItem()}}>
                               <div style={{display:"flex",backgroundColor:"rgb(64,185,127)",justifyContent:"center",alignItems:"center",border:"none",borderRadius:"4px" ,width:"40%",float:'right', marginRight:'5%',marginBottom:'5%'}}>
                                   <div style={{backgroundColor:"rgb(28,35,41)" ,width:"15%",borderTopLeftRadius:'4px',borderBottomLeftRadius:'4px'}}>
                                       <DoneIcon style={{color:"rgb(137,196,74)"}} fontSize="small" />
                                    </div>
                                   <div style={{width:"87%",height:"100%"}}>
                                   <span style={{color:"white"}} >Confirms</span>
                                   </div>
                             </div>
                             </div>:
                             <CheckCircleOutlineIcon style={{color:'rgb(62, 189, 96)'}}/>
                             }
                             
                          
                           
                          </Paper>
    )
}

export default SingleItem
