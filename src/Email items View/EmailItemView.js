import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import img from "../Assets/images/stan.jpg"
import ShowedItem from './ShowedItem';
import Button from '@material-ui/core/Button';
import BackupIcon from '@material-ui/icons/Backup';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

import {uri} from "../UrlBase";

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

export default function EmailItemView() {
  const classes = useStyles();
  const [show,setShow] = React.useState(true)
  const [open, setOpen] = React.useState(false);
  const [items, setItems] = React.useState([1,2,3,4]);
  
  const [selectedItemIndex,setSelectedItemIndex] = React.useState(0)



  const fetchIt =async ()=>{
    //const datatFromDataBase = await fetch('${uri.link}searchProductByNameAndImage');
    //const data = await datatFromDataBase.json();
    console.log("hello email items")
   // console.log(data)
    //setItems(data)
}
  const nextItem = ()=>{
    setSelectedItemIndex(selectedItemIndex===items.length-1?0:selectedItemIndex+1) 
}
const previousItem = ()=>{
  setSelectedItemIndex(selectedItemIndex<=0 ?0:selectedItemIndex-1) 
}


React.useEffect(() => {
    fetchIt()
   
})
  return (

    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
            <div style={{ padding:"2%", display:"flex", justifyContent:"flex-end", alignItems:"flexEnd"}}>
            <div style={{display:"flex",justifyContent:"center", alignItems:"center"}}>
                <Button size="small" variant="outlined" onClick={()=>previousItem()} color="primary" startIcon={<ArrowLeftIcon />}>previous</Button>
            </div>
            <ShowedItem  showIt={setShow} item={items[selectedItemIndex]} showAlert={setOpen} nexItem={nextItem}/> 
            <div style={{display:"flex",justifyContent:"center", alignItems:"center"}}>
                    <Button size="small"onClick={()=>nextItem()} variant="outlined" color="primary" endIcon={<ArrowRightIcon />}>next</Button>
            </div>
            <div style={{ display:"flex",justifyContent:"flex-end",alignItems:"flexEnd", flexDirection:"column"}}>
            <div style={{width:"100%", float:'right' , marginLeft:"300%"}}>
            <Button variant="outlined" color="primary" startIcon={<BackupIcon />}>Import</Button>
            </div>
            </div>
            <Collapse in={open}>
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
          Item image has been saved successfully
        </Alert>
      </Collapse>
        </div>
        <div hidden={show}>
          <Paper className={classes.paper}>
          <Grid container justify="center" spacing={3}>
          {[0, 1, 2,3,4].map((value) => (
            <Grid key={value} item>
                <div>
                    <img src={img}  width="250px"/>
                    <Card className={classes.root}>

      <CardActions>
        <Button startIcon={<CheckCircleOutlineIcon />} size="small" onClick={()=>{setShow(true);setOpen(true); setSelectedItemIndex(selectedItemIndex===items.length-1?0:selectedItemIndex+1) }}>This one</Button>
      </CardActions>
    </Card>
                </div>
            </Grid>
          ))}
        </Grid>

          </Paper>
         
          </div>
        </Grid>
       
      </Grid>
    </div>
  );
}