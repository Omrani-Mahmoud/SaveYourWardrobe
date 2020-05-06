import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from "axios";
import Swal from 'sweetalert2';
import EventList from './EventList';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  rootBtnAdd: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    color: 'white',



  },
}));

    
function AddEvent() {
    const [newEvent,setNewEvent] = React.useState({name:"",startDate:"",endDate:"",association:"",description:"",type:""})

    const addEvent=()=>{
        newEvent.association = window.localStorage.getItem("connectedUserID")
        axios.post("http://code-beast.herokuapp.com/event",newEvent)
            .then(res=>{
                if(res.status===200)
                Swal.fire({
                    icon: 'success',
                    title: 'Done...',
                    text: 'Event has been created!',
                  })
            })
            .catch(err=>{
                console.log(err)
            })

    }





    const classes = useStyles();
    return (
        <div >
            <h4>New Event ?</h4>
            <form  style={{display:"flex", flexDirection:"column"}} className={classes.root} noValidate autoComplete="off" onSubmit={addEvent}>
                <TextField id="standard-basic" label="event name" onChange={(e)=>newEvent.name=e.target.value} defaultValue={newEvent.name}/>

                <TextField id="standard-basic" type='date'onChange={(e)=>newEvent.startDate=e.target.value} defaultValue={newEvent.startDate}/>
                
                <TextField id="standard-basic" type='date'  onChange={(e)=>newEvent.endDate=e.target.value} defaultValue={newEvent.endDate} />
                
                <TextField id="standard-basic" label=" event description" onChange={(e)=>newEvent.description=e.target.value} defaultValue={newEvent.description} />
                
                <TextField id="standard-basic" label="type"  onChange={(e)=>newEvent.type=e.target.value} defaultValue={newEvent.type}/>
                
                <Button type="submit" className={classes.rootBtnAdd} variant="contained" style={{float:"right"}}>Add event</Button>
            </form>
          <div style={{marginTop:"3%"}}>
            <EventList />
            </div>
        </div>
    )
}

export default AddEvent
