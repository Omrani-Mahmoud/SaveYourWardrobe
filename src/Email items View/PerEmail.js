import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles , useTheme} from '@material-ui/core/styles';
import clsx from 'clsx';
import img from "../Assets/images/stan.jpg"
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

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
import SingleItem from './SingleItem';
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));



function PerEmail() {

    const classes = useStyles();
    const [selectedEmail, setSelectedEmail] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [showBtn, setShowBtn] = React.useState(false);
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(false)
    const [beforeloading, setBeforeLoading] = React.useState(false);
    const [loadingJson, setLoadingJson] = React.useState(true);
    const [selectedFile, setSelectedFile] = React.useState({selectedFile:null});
    const [selectedFileT, setSelectedFileT] = React.useState({selectedFile:null});

    const [openUpload, setOpenUpload] = React.useState(false);
    const [searchMode, setSearchMode] = React.useState("");

    const theme = useTheme();



    const charityList = [
      {name:"First-email", value:2},
      {name:"Second-email", value:3},
      {name:"Third-email", value:4},
      {name:"Forth-email", value:6}
    ];

   

  const onChangeHandler=event=>{

    setSelectedFile({selectedFile:event.target.files[0]})

}

const onChangeHandlerT=event=>{

  setSelectedFileT({selectedFile:event.target.files[0]})

}


const fetchIt = ()=>{
  setLoading(true)
  setBeforeLoading(true)
  axios.post(`http://localhost:4000/extractProductsFromMailTest`,{
   filePathText:`./uploads/mails/${selectedFile.selectedFile.name}`,
   filePathHTML:`./uploads/mails/${selectedFileT.selectedFile.name}`,
   searchMode: searchMode
  })
  .then(res=>{
      setData(res.data)
      setLoading(false)
      setLoadingJson(false)
     
  })
  .catch(err=>{
      console.log(err)
  })

}

const onClickHandler = () => {
  const data = new FormData() 
  data.append('file', selectedFile.selectedFile)
  axios.post("http://localhost:4000/upload", data)
      .then(res => { 
        console.log(res.status)
        if(res.status===200){
        //setOpenUpload(true)
        //setShowBtn(true)
        console.log(res)
      }
      })
}

const onClickHandlerT = () => {
  const data = new FormData() 
  data.append('file', selectedFileT.selectedFile)
  axios.post("http://localhost:4000/upload", data)
      .then(res => { 
        console.log(res.status)
        if(res.status===200){
        setOpenUpload(true)
        setShowBtn(true)
      }
      })
}

const handleChange = (event) => {
  setSearchMode(event.target.value)
};

    return (
        <Grid container spacing={3} >
          
        <Container maxWidth="lg">
                   <FormControl style={{width:'220px', marginBottom:"1%"}} >
                   <InputLabel htmlFor="search">Search methode</InputLabel>
        <Select

            style={{marginBottom:"10%"}}
          native
          value={searchMode}
          onChange={handleChange}
          inputProps={{
            name: 'search',
            id: 'search',
          }}
        >
          <option aria-label="None" value="" />
          <option value="">-</option>
          <option value="image">image</option>
          <option value="text">text</option>
        </Select>
        <Input type="file" onChange={onChangeHandler} />
        <Input type="file" onChange={onChangeHandlerT} />
      </FormControl>
      <Grid item xs={3} >
      <div hidden={!showBtn}>
        <Button variant="contained" color="primary" href="#contained-buttons" disabled={!showBtn} onClick={()=>fetchIt()}>
                    Show results
        </Button>
      </div>
        <div hidden={showBtn}>
        <Button variant="contained" color="primary" href="#contained-buttons" disabled={selectedFile.selectedFile===null?true:false}onClick={()=>{onClickHandler();onClickHandlerT()}}>
                    Upload
        </Button>
        </div>
        </Grid>
      <Collapse in={open} style={{width:"30%"}}>
     
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
               setOpen(false); 
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          Your choice has been saved , Click on the appeared button
        </Alert>
      </Collapse>
      <Collapse in={openUpload} style={{width:"30%"}}>
     
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
               setOpen(false); 
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          Your file has been uploaded
        </Alert>
      </Collapse>
      <Grid item xs={12} direction="row">
      
        </Grid>
      
        </Container>
        <Grid item xs={6} style={{marginTop:"2%"}}>
          <Paper className={classes.paper}>
            <Container maxWidth="sm" >
              <div hidden={beforeloading}>
              {
                   !showBtn?<h2>Nothing is displayed</h2>:
                    <div style={{display:'flex' , justifyContent:"center", alignItems:"center"}}>
                       
                        <h3> something good will happen </h3>

                        <EmojiEmotionsIcon color='inherit'/>
                    </div>
             
                   
                   }
                  </div>
                  <div hidden={!loading}>
                  <CircularProgress color="inherit" />
                  </div>
            </Container>
            <div style={{display:"flex", flexDirection:"column" ,backgroundColor: '#f9f9f9', justifyContent:"flex-start", alignContent:"flex-start"}} hidden={loading}>
            <h2 hidden={ data.length>0?false:true}>Purchased Items</h2>
                    
            {            
                         data.map((elem,index)=>(
                          
                        <SingleItem elem={elem} index={index}/>
                         
                     )
                       )
                       }
   
      
        </div>
          </Paper>
        </Grid>
        <Grid item xs={6} style={{marginTop:"2%"}}>
          <Paper className={classes.paper}>
            <Container maxWidth="sm" style={{ backgroundColor: '#fffaee'}}>
              <div hidden={loading} style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                   <h3>JSON OUTPUT </h3><DeveloperModeIcon />
              </div>
              <div hidden={!loading}>
                  <CircularProgress color="inherit" />
                  </div>
              <div hidden={loadingJson} style={{display:"flex", justifyContent:"flex-start", alignItems:"flex-start",flexDirection:"column"}}>
                      <span style={{fontWeight:"bolder",color:"black"}}hidden={loadingJson}>{' { ['}</span>
                      {            
                         data.map((elem,index)=>(
                           <React.Fragment>
                               
                              <span style={{marginLeft:"2%"}}> <span style={{fontWeight:"bolder", color:"black"}}>{' { '}</span><span style={{color:"black"}}>"Category" : </span><span style={{color:"rgb(8, 143, 0)"}}>"{elem.Category}"</span></span>
                              <span style={{marginLeft:"4%"}}><span style={{color:"black"}}>"Name" : </span><span style={{color:"rgb(8, 143, 0)"}}>"{elem.Name}"</span></span>
                              <span style={{marginLeft:"4%"}}><span style={{color:"black"}}>"Size" : </span><span style={{color:"rgb(8, 143, 0)"}}>"{elem.Size}"</span></span>
                              <span style={{marginLeft:"4%"}}><span style={{color:"black"}}>"Color" : </span><span style={{color:"rgb(8, 143, 0)"}}>"{elem.Color}"</span></span>
                              <span style={{marginLeft:"4%"}}><span style={{color:"black"}}>"Price" : </span><span style={{color:"rgb(8, 143, 0)"}}>"{elem.Price}"</span></span>

                              <span style={{fontWeight:"bolder",color:"black",marginLeft:"2%"}}>{' }, '}</span>
                         </React.Fragment>
                         )
                       )
                       }
                        <span style={{fontWeight:"bolder",color:"black"}}hidden={loadingJson}>{' } ]'}</span>
              </div>
            </Container>
          </Paper>
        </Grid>
        </Grid>
        
    )
}

export default PerEmail
