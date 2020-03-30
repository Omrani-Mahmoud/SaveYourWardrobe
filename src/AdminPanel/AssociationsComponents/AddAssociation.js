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
function AddAssociation() {
    const [newAsso,setNewAsso] = React.useState({name:"",location:"",email:"",telephone:"",category:"",joinDate:"",donations:[]})
    const [dataFromDB,setNewDataFromDB] = React.useState([]);

    const addAssociation =()=>{
        newAsso.joinDate=new Date();
        axios.post("http://localhost:4000/association",newAsso)
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
            <h4>Association Form</h4>
            <form className={classes.root} noValidate autoComplete="off" onSubmit={addAssociation}>
                <TextField id="standard-basic" label="Association name" onChange={(e)=>newAsso.name=e.target.value} defaultValue={newAsso.name}/>
                <TextField id="standard-basic" label="Location" onChange={(e)=>newAsso.location=e.target.value} defaultValue={newAsso.location}/>
                <TextField id="standard-basic" label="Email" onChange={(e)=>newAsso.email=e.target.value} defaultValue={newAsso.email} />
                <TextField id="standard-basic" label="Phone number" onChange={(e)=>newAsso.telephone=e.target.value} defaultValue={newAsso.telephone} />
                <TextField id="standard-basic" label="Category"  onChange={(e)=>newAsso.category=e.target.value} defaultValue={newAsso.category}/>
                <Button type="submit" variant="outlined" style={{float:"right"}}>Add it</Button>
            </form>
        </div>
    )
}

export default AddAssociation
