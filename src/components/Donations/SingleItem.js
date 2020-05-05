import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles , useTheme} from '@material-ui/core/styles';
import clsx from 'clsx';
import img from "../../Assets/images/outfit.jpg"
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
import DeleteIcon from '@material-ui/icons/Delete';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';


function SingleItem({elem,index,addToList,list,removedList,clearItem}) {
    const theme = useTheme();

    const [selectedItemIndex,setSelectedItemIndex] = React.useState(0)
    const [disabled,setDisabled] = React.useState(false)

    const nextImage = (images)=>{
        setSelectedItemIndex(selectedItemIndex===images.length-1?0:selectedItemIndex+1) 
      }
      const previousImage = ()=>{
      setSelectedItemIndex(selectedItemIndex<=0 ?0:selectedItemIndex-1) 
      }
      const removeItem = (id)=>{
        for( var i = 0; i < removedList.length; i++){ 
          if ( removedList[i]._id ===id) {
            removedList.splice(i, 1); 
            i--;
          }
       }
      }

      const verif = ()=>{
        if(removedList.indexOf(elem)===-1){
          return false;
        }
          else{
            removeItem(elem._id)
          
          clearItem(removedList)
          setDisabled(false)
          return true;}
      }

    return (
        <Paper style={{marginBottom:"2%", width:"40%",marginTop:'0.5%',marginLeft:'1%'}}>
                             <div style={{display:"flex",width:"100%",}}>
                              <div style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}>
                      
                          <img src={elem.image?elem.image:img} width="100" height="auto" />

                          
                    
                               
                              </div>
                              <div  style={{width:"100%",display:"flex",flexDirection:"column",marginBottom:"2%"}}>
                                  <h4>{elem.name}</h4>
                                  
                                  <span style={{color:"grey"}}><b>Item Brand </b>: {elem.brand} </span>
                                  <span style={{color:"grey"}}><b>Item Color </b>: {elem.color} </span>
                                {disabled && !verif()?
                                <div style={{display:"flex",marginTop:"1%",justifyContent:"center",alignItems:"center"}}><CheckCircleIcon style={{color:"#09eb7a"}} fontSize='small'/><span><b>Done !</b></span></div>
                                :
                                <Button
                                  variant="text"
                                  color="primary"
                                  size="small"
                                onClick={()=>{addToList([...list,elem]);setDisabled(true)}}
                                  startIcon={<DeleteIcon />}
                                >
                                  Add to don list
                                </Button>
                                }
                                  
  

  
                              </div>
                             </div>
                          
                             
                          
                           
                          </Paper>
    )
}

export default SingleItem
