import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from "axios";

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));
function AddStore() {
    const [newStore,setNewStore] = React.useState({name:"",location:"",email:"",telephone:"",startDate:"",endDate:"",itemsCombinations:[],items:[]})
    const [dataFromDB,setNewDataFromDB] = React.useState([]);

    const addStore =()=>{
        newStore.joinDate=new Date();
        axios.post("addStoreURI",newStore)
            .then(res=>{
                console.log(res)
            })
            .catch(err=>{
                console.log(err)
            })

    }



   

    const classes = useStyles();
    return (
        <div>
            <h4>Store Form</h4>
            <form className={classes.root} noValidate autoComplete="off" onSubmit={addStore}>
                <TextField id="standard-basic" label="Association name" onChange={(e)=>newStore.name=e.target.value} defaultValue={newStore.name}/>
                <TextField id="standard-basic" label="Location" onChange={(e)=>newStore.location=e.target.value} defaultValue={newStore.location}/>
                <TextField id="standard-basic" label="Email" onChange={(e)=>newStore.email=e.target.value} defaultValue={newStore.email} />
                <TextField id="standard-basic" label="Phone number" onChange={(e)=>newStore.telephone=e.target.value} defaultValue={newStore.telephone} />
                <TextField id="standard-basic" label="StartDate"  onChange={(e)=>newStore.startDate=e.target.value} defaultValue={newStore.startDate}/>
                <TextField id="standard-basic" label="EndDate"  onChange={(e)=>newStore.endDate=e.target.value} defaultValue={newStore.endDate}/>
                <TextField id="standard-basic" label="EndDate"  onChange={(e)=>newStore.endDate=e.target.value} defaultValue={newStore.endDate}/>

                <Button type="submit" variant="outlined" style={{float:"right"}}>Add it</Button>
            </form>
        </div>
    )
}

export default AddStore
